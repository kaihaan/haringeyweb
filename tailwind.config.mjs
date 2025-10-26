/**
 * Tailwind & DaisyUI Configuration
 *
 * To change the color theme, edit the colors in the sections below.
 * The main theme color is the cyan/aqua (#34cac8) used throughout the site.
 *
 * TIP: Open colors.config.js for a reference guide with color suggestions.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Note: Removed 'card' - use 'base-200' instead for proper dark mode support
        'hero-bg': '#34cac8',        // Vibrant cyan for hero sections
        'hero-text': '#FFFFFF',      // White text for strong contrast
        'accent-cyan': '#34cac8',    // Vibrant cyan accent
        'accent-cyan-dark': '#2ba8a6', // Darker shade for hover
        'primary-light': '#e0f7f7',  // Very light cyan backgrounds
        'primary-lighter': '#f0fbfb', // Even lighter cyan
        'footer-bg': '#2C3532',      // Dark grey-green for footer (always dark in both modes)
        'footer-text': '#E7ECEA',    // Light text for footer (always light in both modes)
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        tranquil: {
          'primary': '#34cac8',        // Vibrant cyan accent
          'primary-content': '#FFFFFF', // White text on primary
          'secondary': '#E5C8B6',       // Gentle sand-rose
          'secondary-content': '#37413A',
          'accent': '#34cac8',          // Vibrant cyan accent
          'accent-content': '#FFFFFF',
          'neutral': '#37413A',         // Deep sage-grey
          'neutral-content': '#F8FAF9',
          'base-100': '#F8FAF9',        // Misty white base
          'base-200': '#FAFCFB',        // Nearly white with barely visible tint for cards
          'base-300': '#D4DDD9',        // Slightly darker for borders
          'base-content': '#37413A',    // Primary text color
          'info': '#34cac8',            // Vibrant cyan
          'info-content': '#FFFFFF',
          'success': '#34cac8',         // Vibrant cyan
          'success-content': '#FFFFFF',
          'warning': '#E5C8B6',         // Reuse secondary
          'warning-content': '#37413A',
          'error': '#D4D9EE',           // Reuse accent
          'error-content': '#37413A',
        },
        'tranquil-dark': {
          'primary': '#34cac8',         // Vibrant cyan accent (same in dark mode)
          'primary-content': '#FFFFFF', // White text on primary
          'secondary': '#B59382',       // Desert-rose warmth
          'secondary-content': '#E7ECEA',
          'accent': '#34cac8',          // Vibrant cyan accent
          'accent-content': '#FFFFFF',
          'neutral': '#E7ECEA',         // Gentle ivory-white
          'neutral-content': '#1E2322',
          'base-100': '#1E2322',        // Deep forest-charcoal
          'base-200': '#222726',        // Nearly same as base with barely visible lift for cards
          'base-300': '#363C3B',        // Even lighter for borders
          'base-content': '#E7ECEA',    // Primary text color (light)
          'info': '#34cac8',            // Vibrant cyan
          'info-content': '#FFFFFF',
          'success': '#34cac8',         // Vibrant cyan
          'success-content': '#FFFFFF',
          'warning': '#B59382',         // Reuse secondary
          'warning-content': '#E7ECEA',
          'error': '#9BA3C9',           // Reuse accent
          'error-content': '#E7ECEA',
        },
      },
    ],
  },
}
