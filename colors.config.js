/**
 * Color Configuration for Haringey Baháʼí Community Website
 *
 * This file contains all the color definitions used throughout the site.
 * Edit these values to change the entire site's color scheme.
 *
 * After making changes, save this file and the dev server will automatically reload.
 */

export const colors = {
  // ========================================
  // PRIMARY BRAND COLORS
  // ========================================

  // Main cyan/aqua color - used for primary buttons, links, and accents
  primary: '#34cac8',

  // Darker shade of cyan - used for hover states on buttons and links
  'primary-dark': '#2ba8a6',

  // Light backgrounds with primary color tint
  'primary-light': '#e0f7f7',      // Very light cyan for subtle backgrounds
  'primary-lighter': '#f0fbfb',    // Even lighter cyan for gradients


  // ========================================
  // ACCENT COLORS
  // ========================================

  // Accent cyan (same as primary for consistency)
  'accent-cyan': '#34cac8',
  'accent-cyan-dark': '#2ba8a6',


  // ========================================
  // NEUTRAL COLORS
  // ========================================

  // Card backgrounds - light grey used for content cards
  card: '#F7F7F7',

  // Card text color - dark grey/green for good readability
  'card-text': '#37413A',


  // ========================================
  // HERO SECTION COLORS
  // ========================================

  // Hero background - vibrant cyan for hero sections
  'hero-bg': '#34cac8',

  // Hero text - white for strong contrast on cyan background
  'hero-text': '#FFFFFF',


  // ========================================
  // SECONDARY COLORS
  // ========================================

  // Secondary color used in some sections for variety
  // (Currently uses DaisyUI's secondary color from theme)
  // Uncomment and set if you want to override:
  // secondary: '#your-color-here',
};

/**
 * USAGE EXAMPLES:
 *
 * In HTML/Astro components:
 * - bg-primary          → Primary cyan background
 * - text-primary        → Primary cyan text
 * - bg-primary/10       → Primary cyan at 10% opacity
 * - hover:bg-primary-dark → Darker cyan on hover
 * - text-accent-cyan    → Accent cyan text color
 * - bg-card             → Light grey card background
 * - bg-hero-bg          → Hero section background
 *
 * GRADIENT EXAMPLES:
 * - bg-gradient-to-b from-primary/5 to-base-100
 * - bg-gradient-to-br from-primary/5 to-primary/10
 *
 * THEME COLORS (from DaisyUI):
 * These colors automatically adapt to light/dark mode:
 * - base-100      → Page background
 * - base-200      → Slightly darker background
 * - base-300      → Border color
 * - base-content  → Main text color
 * - neutral       → Neutral text/elements
 *
 * OPACITY MODIFIERS:
 * Use /[number] to add transparency:
 * - bg-primary/5   → 5% opacity
 * - bg-primary/10  → 10% opacity
 * - bg-primary/20  → 20% opacity
 * - text-base-content opacity-70 → 70% opacity text
 * - text-base-content opacity-90 → 90% opacity text
 */

/**
 * COLOR PSYCHOLOGY & RECOMMENDATIONS:
 *
 * CYAN/AQUA (#34cac8):
 * - Represents: Peace, tranquility, spirituality, calm, unity
 * - Perfect for: Spiritual/religious organizations, peaceful communities
 * - Pairs well with: White, light greys, soft greens
 *
 * TO CHANGE THE MAIN THEME COLOR:
 * 1. Update 'primary' and 'accent-cyan' to your new color
 * 2. Update 'primary-dark' and 'accent-cyan-dark' to a darker shade (use a tool like coolors.co)
 * 3. Update 'primary-light' and 'primary-lighter' to very light tints of your color
 * 4. Update 'hero-bg' if you want hero sections to use the new color
 * 5. Save and check the site - all buttons, links, and accents will update!
 *
 * SUGGESTED COLOR PALETTES:
 *
 * Purple/Spiritual:
 *   primary: '#8B5CF6'
 *   primary-dark: '#7C3AED'
 *   primary-light: '#EDE9FE'
 *   primary-lighter: '#F5F3FF'
 *
 * Green/Growth:
 *   primary: '#10B981'
 *   primary-dark: '#059669'
 *   primary-light: '#D1FAE5'
 *   primary-lighter: '#ECFDF5'
 *
 * Blue/Trust:
 *   primary: '#3B82F6'
 *   primary-dark: '#2563EB'
 *   primary-light: '#DBEAFE'
 *   primary-lighter: '#EFF6FF'
 */

export default colors;
