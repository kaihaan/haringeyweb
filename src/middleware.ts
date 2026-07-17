/**
 * Members-area gate
 *
 * Runs on every request but only enforces auth for members-only, on-demand
 * routes. Public prerendered pages fall straight through `next()` at build time.
 *
 * Flow for a gated route:
 *   1. Read the access-token cookie and validate it against Directus (/users/me).
 *   2. If the access token is expired but a refresh token exists, silently refresh
 *      and re-set both cookies so the member isn't logged out mid-session.
 *   3. If neither works, clear cookies and redirect to /members/login.
 *   4. On success, attach the member + access token to `context.locals` so pages
 *      fetch content as that member (Directus enforces the role's permissions).
 *
 * NOT gated here (each handles its own credential):
 *   - /members/login            (the login form itself)
 *   - /members/api/login        (verifies email/password)
 *   - /members/accept-invite    (set-password page; authed by the invite token in the URL)
 *   - /members/api/accept-invite (verifies the invite token)
 *   - /members/feed/*.ics        (authenticated by the per-member feed token in the URL)
 */

import { defineMiddleware } from 'astro:middleware';
import {
  COOKIE_ACCESS,
  COOKIE_REFRESH,
  clearSessionCookies,
  directusMe,
  directusRefresh,
  setSessionCookies,
} from './lib/auth';

const LOGIN_PATH = '/members/login';

function isGatedPath(pathname: string): boolean {
  if (!pathname.startsWith('/members')) return false;
  if (pathname.startsWith('/members/login')) return false;
  if (pathname.startsWith('/members/api/login')) return false;
  if (pathname.startsWith('/members/accept-invite')) return false;
  if (pathname.startsWith('/members/api/accept-invite')) return false;
  if (pathname.startsWith('/members/feed')) return false;
  return true;
}

export const onRequest = defineMiddleware(async (context, next) => {
  if (!isGatedPath(context.url.pathname)) {
    return next();
  }

  const { cookies } = context;
  const accessToken = cookies.get(COOKIE_ACCESS)?.value;
  const refreshToken = cookies.get(COOKIE_REFRESH)?.value;

  // 1. Try the current access token.
  if (accessToken) {
    const member = await directusMe(accessToken);
    if (member) {
      context.locals.member = member;
      context.locals.accessToken = accessToken;
      return next();
    }
  }

  // 2. Access token missing/expired — try to refresh.
  if (refreshToken) {
    const tokens = await directusRefresh(refreshToken);
    if (tokens) {
      setSessionCookies(cookies, tokens);
      const member = await directusMe(tokens.access_token);
      if (member) {
        context.locals.member = member;
        context.locals.accessToken = tokens.access_token;
        return next();
      }
    }
  }

  // 3. No valid session — clear stale cookies and send to login.
  clearSessionCookies(cookies);
  const redirectTo = encodeURIComponent(context.url.pathname);
  return context.redirect(`${LOGIN_PATH}?redirect=${redirectTo}`);
});
