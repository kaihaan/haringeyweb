/**
 * POST /members/api/login
 *
 * Verifies email + password against Directus, and on success stores the returned
 * tokens in httpOnly session cookies and redirects into the members area.
 * On failure, redirects back to the login form with an error flag.
 *
 * On-demand only (reads request body, sets cookies) — never prerendered.
 */

import type { APIRoute } from 'astro';
import { directusLogin, setSessionCookies } from '../../../lib/auth';

export const prerender = false;

/**
 * Only allow redirecting to internal members paths, to prevent open-redirect
 * abuse via a crafted `?redirect=` value.
 */
function safeRedirect(target: string | null): string {
  if (target && target.startsWith('/members/') && !target.startsWith('/members//')) {
    return target;
  }
  return '/members/events';
}

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const email = String(form.get('email') ?? '').trim();
  const password = String(form.get('password') ?? '');
  const redirectTo = safeRedirect(String(form.get('redirect') ?? '') || null);

  if (!email || !password) {
    return redirect(`/members/login?error=1&redirect=${encodeURIComponent(redirectTo)}`);
  }

  const tokens = await directusLogin(email, password);
  if (!tokens) {
    return redirect(`/members/login?error=1&redirect=${encodeURIComponent(redirectTo)}`);
  }

  setSessionCookies(cookies, tokens);
  return redirect(redirectTo);
};
