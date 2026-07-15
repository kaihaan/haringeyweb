/// <reference types="astro/client" />

import type { MemberUser } from './lib/directus';

declare global {
  namespace App {
    interface Locals {
      /** The authenticated Community Member, set by src/middleware.ts on /members/* routes. */
      member?: MemberUser;
      /** The member's current (possibly just-refreshed) Directus access token. */
      accessToken?: string;
    }
  }
}

export {};
