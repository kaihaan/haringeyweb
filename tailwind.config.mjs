/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        tranquil: {
          'primary': '#A8C7C0',        // Muted aqua-teal
          'primary-content': '#37413A', // Deep sage-grey for text on primary
          'secondary': '#E5C8B6',       // Gentle sand-rose
          'secondary-content': '#37413A',
          'accent': '#D4D9EE',          // Pale periwinkle
          'accent-content': '#37413A',
          'neutral': '#37413A',         // Deep sage-grey
          'neutral-content': '#F8FAF9',
          'base-100': '#F8FAF9',        // Misty white base
          'base-200': '#ECF3F2',        // Soft seafoam for cards
          'base-300': '#D4DDD9',        // Slightly darker for borders
          'base-content': '#37413A',    // Primary text color
          'info': '#B3D4C0',            // Fresh greenish pastel
          'info-content': '#37413A',
          'success': '#A8C7C0',         // Reuse primary
          'success-content': '#37413A',
          'warning': '#E5C8B6',         // Reuse secondary
          'warning-content': '#37413A',
          'error': '#D4D9EE',           // Reuse accent
          'error-content': '#37413A',
        },
        'tranquil-dark': {
          'primary': '#7BB0A7',         // Muted sea-glass green
          'primary-content': '#E7ECEA', // Gentle ivory-white
          'secondary': '#B59382',       // Desert-rose warmth
          'secondary-content': '#E7ECEA',
          'accent': '#9BA3C9',          // Soft lavender-blue
          'accent-content': '#E7ECEA',
          'neutral': '#E7ECEA',         // Gentle ivory-white
          'neutral-content': '#1E2322',
          'base-100': '#1E2322',        // Deep forest-charcoal
          'base-200': '#2A302F',        // Slightly lighter slate
          'base-300': '#363C3B',        // Even lighter for borders
          'base-content': '#E7ECEA',    // Primary text color (light)
          'info': '#8FC5AA',            // Calm jade accent
          'info-content': '#1E2322',
          'success': '#7BB0A7',         // Reuse primary
          'success-content': '#E7ECEA',
          'warning': '#B59382',         // Reuse secondary
          'warning-content': '#E7ECEA',
          'error': '#9BA3C9',           // Reuse accent
          'error-content': '#E7ECEA',
        },
      },
    ],
  },
}
