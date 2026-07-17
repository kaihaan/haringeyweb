/**
 * POST /members/api/accept-invite
 *
 * Completes a member invitation entirely on the website (never the CMS admin):
 *   1. Sets the member's password via Directus accept-invite (activates the account).
 *   2. Logs them straight in and drops them on the members calendar.
 *
 * The invite token comes from the emailed link. On any failure, redirects back to
 * the set-password page with a readable message. On-demand only.
 */

import type { APIRoute } from 'astro';
import {
  directusAcceptInvite,
  directusLogin,
  emailFromInviteToken,
  setSessionCookies,
} from '../../../lib/auth';

export const prerender = false;

function backToForm(token: string, error: string): string {
  return `/members/accept-invite?token=${encodeURIComponent(token)}&error=${encodeURIComponent(error)}`;
}

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const token = String(form.get('token') ?? '');
  const password = String(form.get('password') ?? '');

  if (!token) return redirect('/members/login');
  if (password.length < 8) {
    return redirect(backToForm(token, 'Please choose a password of at least 8 characters.'));
  }

  // 1. Set the password / activate the account.
  const result = await directusAcceptInvite(token, password);
  if (!result.ok) {
    return redirect(backToForm(token, result.error ?? 'Could not accept the invitation.'));
  }

  // 2. Log them in with the password they just set, then send to the calendar.
  const email = emailFromInviteToken(token);
  if (email) {
    const tokens = await directusLogin(email, password);
    if (tokens) {
      setSessionCookies(cookies, tokens);
      return redirect('/members/events?welcome=1');
    }
  }

  // Account is set up, but auto-login didn't happen — send them to sign in.
  return redirect('/members/login?activated=1');
};
