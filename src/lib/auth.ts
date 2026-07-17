/**
 * Members-area authentication helpers
 *
 * Thin wrappers over the Directus auth REST endpoints plus session-cookie
 * management. Used by `src/middleware.ts` (gate + silent refresh) and the
 * `/members/api/*` routes (login / logout).
 *
 * Design notes:
 * - We call `/auth/*` with `fetch` (mode: 'json') rather than the SDK's
 *   `authentication()` store, because each serverless invocation is stateless.
 * - Tokens live in httpOnly cookies so client JS can never read them.
 * - Directus issues a short-lived access token + longer-lived refresh token;
 *   the middleware refreshes the access token transparently when it expires.
 */

import type { AstroCookies } from 'astro';
import { directusUrl, type MemberUser } from './directus';

export const COOKIE_ACCESS = 'member_at';
export const COOKIE_REFRESH = 'member_rt';

/** Refresh-token cookie lifetime (7 days). Directus refresh tokens default to 7d. */
const REFRESH_MAX_AGE = 60 * 60 * 24 * 7;

export interface DirectusTokens {
  access_token: string;
  refresh_token: string;
  /** Access-token lifetime in ms, as returned by Directus. */
  expires: number;
}

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: import.meta.env.PROD, // omit Secure on http://localhost during dev
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  };
}

/** Persist a fresh set of tokens to the session cookies. */
export function setSessionCookies(cookies: AstroCookies, tokens: DirectusTokens) {
  // Access cookie: expire slightly before the token itself to avoid using a
  // just-expired token. Falls back to 15 min if `expires` is missing.
  const accessMaxAge = Math.max(
    60,
    Math.floor((tokens.expires ?? 15 * 60 * 1000) / 1000) - 30
  );
  cookies.set(COOKIE_ACCESS, tokens.access_token, cookieOptions(accessMaxAge));
  cookies.set(COOKIE_REFRESH, tokens.refresh_token, cookieOptions(REFRESH_MAX_AGE));
}

/** Remove the session cookies (logout / invalid session). */
export function clearSessionCookies(cookies: AstroCookies) {
  cookies.delete(COOKIE_ACCESS, { path: '/' });
  cookies.delete(COOKIE_REFRESH, { path: '/' });
}

/**
 * Decode the email out of a Directus invite token (a JWT: header.payload.signature).
 * We only read the payload (no signature check) so we can log the member in after
 * they accept — Directus itself verifies the token during accept.
 */
export function emailFromInviteToken(token: string): string | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const json = JSON.parse(
      Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8')
    );
    return typeof json?.email === 'string' ? json.email : null;
  } catch {
    return null;
  }
}

/**
 * Accept a Directus invite: sets the member's password and activates the account.
 * Returns { ok } and, on failure, a human-readable message from Directus.
 */
export async function directusAcceptInvite(
  token: string,
  password: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${directusUrl}/users/invite/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    if (res.ok) return { ok: true };
    const json = await res.json().catch(() => null);
    const message = json?.errors?.[0]?.message ?? 'Could not accept the invitation.';
    return { ok: false, error: message };
  } catch (error) {
    console.error('Directus accept-invite failed:', error);
    return { ok: false, error: 'Network error while accepting the invitation.' };
  }
}

/**
 * Exchange email + password for Directus tokens. Returns null on bad credentials.
 */
export async function directusLogin(
  email: string,
  password: string
): Promise<DirectusTokens | null> {
  try {
    const res = await fetch(`${directusUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, mode: 'json' }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data as DirectusTokens) ?? null;
  } catch (error) {
    console.error('Directus login failed:', error);
    return null;
  }
}

/**
 * Exchange a refresh token for a fresh token pair. Returns null if the refresh
 * token is expired/invalid (member must log in again).
 */
export async function directusRefresh(
  refreshToken: string
): Promise<DirectusTokens | null> {
  try {
    const res = await fetch(`${directusUrl}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken, mode: 'json' }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data as DirectusTokens) ?? null;
  } catch (error) {
    console.error('Directus refresh failed:', error);
    return null;
  }
}

/** Invalidate a refresh token server-side. Best-effort; ignores failures. */
export async function directusLogout(refreshToken: string): Promise<void> {
  try {
    await fetch(`${directusUrl}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken, mode: 'json' }),
    });
  } catch (error) {
    console.error('Directus logout failed:', error);
  }
}

/**
 * Fetch the current member using an access token. Returns null if the token is
 * expired/invalid — the middleware uses this as its access-token validity check.
 */
export async function directusMe(accessToken: string): Promise<MemberUser | null> {
  try {
    const res = await fetch(
      `${directusUrl}/users/me?fields=id,email,first_name,last_name,feed_token`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data as MemberUser) ?? null;
  } catch (error) {
    console.error('Directus /users/me failed:', error);
    return null;
  }
}
