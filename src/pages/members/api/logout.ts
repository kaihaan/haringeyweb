/**
 * POST /members/api/logout
 *
 * Invalidates the refresh token in Directus, clears the session cookies, and
 * returns to the login page. On-demand only.
 */

import type { APIRoute } from 'astro';
import {
  COOKIE_REFRESH,
  clearSessionCookies,
  directusLogout,
} from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ cookies, redirect }) => {
  const refreshToken = cookies.get(COOKIE_REFRESH)?.value;
  if (refreshToken) {
    await directusLogout(refreshToken);
  }
  clearSessionCookies(cookies);
  return redirect('/members/login?loggedout=1');
};
