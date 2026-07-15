// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
//
// The site is static-first: `output: 'static'` (the default) keeps every public
// page prerendered at build time. The Vercel adapter only comes into play for the
// small set of members-only routes that opt into on-demand rendering with
// `export const prerender = false` (see src/pages/members/*). Those become Vercel
// serverless functions so they can read a session cookie / feed token at request time.
export default defineConfig({
  site: 'https://haringeybahai.org.uk',
  adapter: vercel(),
  integrations: [
    react(),
    tailwind()
  ]
});