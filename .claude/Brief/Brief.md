# Project Brief — Baháʼí Community Website

Purpose: Build a production-ready, easily-managed Baháʼí community website using Astro (frontend) + Directus (headless CMS). The deliverable will be a working repo, infra-as-code, deployment pipelines, CMS schema, example content, and documentation for community editors.

1. Goals & Success Criteria

## Goals

- Fast, accessible static-first website for visitors and community members.
- Editors (non-devs) can manage content via a friendly CMS (Directus).
- Multilingual support and ability to add translations via the CMS.
- Event calendar, devotional program, prayer and holy writings library, study resources, and news/blog functionality.
- Role-based editing: editors, reviewers, admins.

## Success Criteria / Acceptance Tests

- Editor can create/update a page, then site rebuilds and reflects the change.
- Admin can add an event with date/time and it appears on the public calendar.
- Search returns prayers, holy writings, events, and pages (Pagefind index updated during build).
- Site scores >=90 on Lighthouse performance and accessibility on mobile.
- Automated daily DB backups and nightly site builds; HTTPS enforced.

## Target Users
- Newcomers seeking an introduction to the Faith.
- Local Baháʼí community members (events, resources, devotional gatherings).
- Teachers & youth leaders (downloadable curricula, lesson plans).
- Researchers & interfaith partners (authoritative texts and links).

## Tech Stack (suggested)
- Frontend: Astro (static-first), React components allowed for interactive pieces.
- CMS: Directus (hosted on Render).
- Database: PostgreSQL (hosted on Neon).
- Hosting / CDN: Vercel for easy deploys; Netlify acceptable alternative.
- Search: Pagefind integrated at build time.
- Forms: Formspree or Netlify Forms for contact/volunteer forms.
- Images: Astro <Image /> + optional Cloudinary for heavy media use.
- Analytics: Plausible or Fathom (privacy-first).

### Suggested Architecture (diagram + explanation)

flowchart LR
  A[Editors] -->|edit via| B[Directus CMS]
  B -->|REST/GraphQL| C[CI/CD Webhook]
  C -->|trigger| D[Vercel Build]
  D --> E[Astro Static Site]
  E --> F[Globally served via Vercel CDN]
  E -->|index| G[Pagefind]
  B --> H[PostgreSQL DB]
  I[Users] --> F
  J[Admin Console] --> B

Notes:
- Directus stores content collections (pages, prayers, events, resources, translations).
- On content publish, Directus triggers a webhook to Vercel to rebuild the static site.
- Pagefind indexes built output at build time and the search index is deployed with the site.

## CMS Schema (Directus collections) — Example
Collections (fields abbreviated):
- pages — fields: id, slug, title, summary, content_markdown, hero_image, status, locale, seo_title, seo_description, author_id, published_at
- writings — id, title, text, short_title, category, language, translation_of (rel), tags
- events — id, title, description, start_datetime, end_datetime, location, is_public, registration_link, calendar_uid
- resources — id, title, file, type (pdf/audio/image), description, tags
- people — id, name, role, bio, photo
- settings — site_name, default_locale, social_links, analytics_id
- users (Directus built-in) + role permissions: Editor/Reviewer/Admin
- Devotional Programs - id, title, reading, video_link

Example event JSON (Directus):

{
  "title": "Local Nineteen-Day Feast — Devotional",
  "description": "A community devotional for all ages.",
  "start_datetime": "2025-11-02T19:00:00+00:00",
  "end_datetime": "2025-11-02T20:30:00+00:00",
  "location": "Community Centre, Main St.",
  "is_public": true
}


## Frontend Requirements & Component List

### Pages: 
- Home
- About
- Community Life
- Study & Deepening
- Devotional Resources
- Events
- News
- Contact
- Admin (login hidden)

### Reusable components:
- Hero (image + CTA)
- ContentBlock (Markdown renderer)
- EventCard (list + single)
- PrayerCard (filters + search)
- ResourceDownload (PDF/audio)
- Calendar (month view + upcoming list)
- LocaleSwitcher
- SearchBar (connects to Pagefind)
- Accessibility: keyboard navigation, semantic HTML, ARIA roles for dynamic widgets.

## Example Code Snippets

Astro page fetch from Directus (pseudo):

// src/pages/[slug].astro
import { getItem } from '../lib/directus';
const { content_markdown } = await getItem('pages', { slug: Astro.params.slug });
---
<html>
  <body>
    <article class="prose">
      <Markdown source={content_markdown} />
    </article>
  </body>
</html>


## Vercel webhook: 
Configure Directus hook to POST to https://api.vercel.com/v1/integrations/deploy/<VERCEL_INTEGRATION_ID> when publish events occur.

## CI/CD & Deployment Steps (high level)
- Repo on GitHub with main branch.
- Vercel connected to repo — automatic builds from main.
- Directus configured with webhook to Vercel to rebuild on publish.
- Database (Postgres) credentials stored in Directus and in Vercel environment vars.
- Automated backups: use Supabase/Render backup features or cron job to export DB nightly to S3 bucket.
- Monitoring: Sentry for JS exceptions (optional), uptime check via UptimeRobot.

## Security & Privacy
- All editor/admin access via Directus auth (OAuth recommended with Google/Email).
- HTTPS everywhere (Vercel handles TLS).
- Roles & permissions in Directus: Editors cannot change user roles; Admins only.
- GDPR/privacy: Use Plausible anonymized analytics.

## Operational Handover & Documentation
Deliverables for handover:
- README: local dev, run, build, deploy instructions.
- Directus admin guide: how to add pages, events, prayers, translations.
- Backup & restore guide.
- Troubleshooting section with common errors (build failures, webhook problems).

## Phases & Milestones (suggested)

- Phase 1: Fullstack POC
- Phase 2: Core pages + CMS integration, sample content import
- Phase 3: Events, search, i18n, image handling
- Phase 4: QA, accessibility pass, performance tuning, handover docs

## Acceptance Checklist (for final review)

- Directus schema implemented and roles configured
- Astro site renders all page types and translations
- Webhook triggers site rebuild on publish
- Search returns relevant results and pagination works
- Lighthouse >= 90 for performance & accessibility
- Editor guide

## Notes for Claude Code
- Produce a ready-to-run GitHub repository with clearly named branches.
- Include IaC or deployment config for Vercel + Postgres (use environment var templates).
- Use TypeScript for frontend and small utility functions.
- Keep components small and documented; include unit tests for critical utilities.
- Prioritize accessibility and small bundle size. Use image lazy-loading and server-side rendering where necessary.

## Appendix: 
Quick Example Sitemap

/ Home

/about About the Faith

/community Community Life

/study Study & Deepening

/devotional/prayers/[slug] Prayers

/events Events (list)

/events/[id] Event detail

/news Blog/Articles

/resources PDFs & downloads

/contact