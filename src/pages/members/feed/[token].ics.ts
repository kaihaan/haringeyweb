/**
 * GET /members/feed/<token>.ics — a member's personal calendar subscription feed.
 *
 * This is the piece that makes "sync to Outlook/Google/Apple" work: calendar apps
 * poll this URL on a schedule with no browser or login, so the secret lives in the
 * URL (`token`) rather than a session cookie. The token resolves to a Directus
 * member via the server-only service account; an unknown/rotated token 404s, which
 * is how revocation works.
 *
 * Returns the members calendar (public AND members-only events). On-demand only —
 * it must run per request so subscribers always get current events.
 */

import type { APIRoute } from 'astro';
import {
  getUserByFeedToken,
  getServiceClient,
  getAllPublishedEvents,
  expandRecurringEventsSync,
} from '../../../lib/directus';
import { getNextOccurrences, formatEventDate } from '../../../lib/recurrence';
import { generateAllEventsIcs } from '../../../lib/calendar';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const token = params.token;

  // Resolve the token to a member. Unknown/rotated token → 404 (don't leak more).
  const member = token ? await getUserByFeedToken(token) : null;
  if (!member) {
    return new Response('Not found', { status: 404 });
  }

  // Fetch all events this member may see (service account bypasses is_public),
  // and expand the next 10 occurrences of each recurring series.
  const events = await getAllPublishedEvents(getServiceClient());
  const occurrences = expandRecurringEventsSync(
    events,
    getNextOccurrences,
    formatEventDate,
    10
  );

  const ics = generateAllEventsIcs(
    occurrences,
    'Haringey Baháʼí Community (Members)'
  );

  return new Response(ics, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      // inline so calendar apps subscribe rather than force a download
      'Content-Disposition': 'inline; filename="haringey-bahai-members.ics"',
      // capability URL: never cache in shared/proxy caches
      'Cache-Control': 'private, no-store',
    },
  });
};
