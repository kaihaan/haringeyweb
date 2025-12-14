/**
 * Tailwind & DaisyUI Configuration
 *
 * Uses DaisyUI's built-in light and dark themes for proper theme switching.
 * Footer uses custom fixed colors to remain always dark.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Footer uses fixed colors - always dark regardless of theme
        'footer-bg': '#2C3532',      // Dark grey-green for footer
        'footer-text': '#E7ECEA',    // Light text for footer
        // Semantic text colors - provide proper contrast in both themes
        'text-secondary': 'var(--color-text-secondary)',  // For metadata, times, locations
        'text-muted': 'var(--color-text-muted)',          // For tags, less important info
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
  },
}
