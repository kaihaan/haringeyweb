# Members Area — Directus Setup & Architecture

The members area (`/members/*`) is a login-gated section whose main feature is a
**Baháʼí-only events calendar** that members can subscribe to from their own
Outlook / Google / Apple calendar. This document covers the Directus backend
configuration it depends on, plus how the pieces fit together.

## Architecture at a glance

- The public site stays **static** (`output: 'static'`). Only `/members/*` routes
  and the personal feed opt into on-demand rendering via `export const prerender = false`,
  served as **Vercel serverless functions** (`@astrojs/vercel` adapter).
- **Identity = Directus users + roles.** Each member is a Directus user in the
  **"Community Member"** role. Login exchanges email/password for Directus tokens,
  stored in httpOnly cookies. Content is fetched *as the member*, so Directus itself
  enforces who can read members-only events.
- **Calendar sync = per-member capability URL.** Calendar apps poll a `.ics` URL with
  no login, so the secret lives in the URL: `/members/feed/<feed_token>.ics`. The token
  is stored on the user record and is **revocable** (regenerate = old URL 404s).

Key files: `src/middleware.ts` (gate), `src/lib/auth.ts` (Directus auth + cookies),
`src/lib/directus.ts` (member/service clients, feed-token helpers), `src/lib/calendar.ts`
(iCal generation), `src/pages/members/*`.

## Required Directus configuration

### 1. "Community Member" role
Create a role named **Community Member** with permissions:
- `events`: **read** — all items (do NOT restrict to `is_public = true`). Members see
  both public and members-only events.
- (Optional) read access to their own user record for `/users/me`.

Keep the **public/build read token** (`DIRECTUS_TOKEN`) scoped so its `events` read
permission is filtered to `is_public = true`. This is defence-in-depth: the public
static build only ever receives public events. (The code also filters `is_public = true`
in `events.ics.ts` and `events/[id].astro`.)

### 2. Custom field on `directus_users`: `feed_token`
Add a field to the **Users** system collection:
- **Key:** `feed_token`
- **Type:** String
- **Interface:** Input (or hidden)
- **Options:** nullable; unique recommended; hidden on the user detail form is fine.

This holds each member's personal calendar secret. Rotating it (via the app's
"Regenerate link" button) instantly invalidates the old subscription URL.

### 3. Service account + token (`DIRECTUS_ADMIN_TOKEN`)
Create a dedicated **service account** user (e.g. in an Administrator or a custom
service role) and a static token for it. It must be able to:
- **read** `directus_users` filtered by `feed_token` (to resolve a feed URL → member), and
- **read** all `events` (public + members-only), and
- **update** `directus_users.feed_token` (to issue/rotate tokens).

Set its token as the `DIRECTUS_ADMIN_TOKEN` env var (server-only). It is used only inside
on-demand routes (the feed endpoint and token rotation) and is never sent to the client.

### 4. Inviting members
Members are **invite-only**: create the user in Directus (Community Member role) and use
Directus's invite / set-password flow. There is no self-signup in this build.

### 5. Token lifetimes (optional tuning)
Directus access tokens default to ~15 min and refresh tokens to ~7 days. The middleware
refreshes the access token silently, so members stay signed in up to the refresh-token
lifetime. Adjust in Directus project settings if desired (the refresh cookie maxAge in
`src/lib/auth.ts` is 7 days to match the default).

## Environment variables

| Variable | Scope | Purpose |
|---|---|---|
| `PUBLIC_DIRECTUS_URL` | public | Directus base URL (existing) |
| `DIRECTUS_TOKEN` | server/build | Public content read token, scoped to `is_public = true` events (existing) |
| `DIRECTUS_ADMIN_TOKEN` | server only | Members service account: feed resolution + token rotation (**new, required for /members**) |

Set all three in the Vercel project (Production + Preview). Without `DIRECTUS_ADMIN_TOKEN`,
the public site still builds fine (the token is read lazily), but the members feed and
token rotation will error at request time.

## Security notes
- Session tokens are in **httpOnly, Secure, SameSite=Lax** cookies — unreadable by client JS.
- The feed URL is a **capability URL**: treat it like a password (HTTPS only, don't share).
  Rotation is the revocation mechanism.
- The feed endpoint sets `Cache-Control: private, no-store` so shared caches never retain it.

## How to verify
See the "Verification" section of the implementation plan and
`tests/deployed-smoke` (if present): log in, confirm members-only events appear at
`/members/events` but not on public `/events` or `/events.ics`; open the personal feed and
confirm `Content-Type: text/calendar`; rotate the token and confirm the old URL 404s.
