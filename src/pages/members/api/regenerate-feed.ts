/**
 * POST /members/api/regenerate-feed
 *
 * Rotates the current member's calendar feed token. The old personal feed URL
 * stops working immediately (its token no longer resolves to any user), and the
 * member is shown the new URL back on the calendar page. This is the revocation
 * mechanism if a feed URL leaks.
 *
 * Gated by src/middleware.ts, so `locals.member` is guaranteed present.
 * On-demand only.
 */

import type { APIRoute } from 'astro';
import { generateFeedToken, setUserFeedToken } from '../../../lib/directus';

export const prerender = false;

export const POST: APIRoute = async ({ locals, redirect }) => {
  const member = locals.member;
  if (!member) {
    return redirect('/members/login');
  }

  const token = generateFeedToken();
  await setUserFeedToken(member.id, token);
  return redirect('/members/events?feed=rotated');
};
