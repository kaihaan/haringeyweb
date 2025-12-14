# Wellness daisyUI Theme Implementation Guide

## Overview

This document provides instructions for implementing calming, wellness-focused color themes for yoga, pilates, and meditation content using daisyUI v5. Each theme includes both light and dark variants.

## Theme Palettes

### 1. Zen Garden

Earthy, grounded, and calming — the most versatile wellness palette.

#### Zen Garden Light

| Role | Color Name | Hex | Usage |
|------|------------|-----|-------|
| Primary | Sage Green | `#9CAF88` | Main actions, buttons, links |
| Primary Content | Dark Forest | `#1a1f16` | Text on primary |
| Secondary | Soft Lavender | `#C3B1E1` | Secondary actions, tags |
| Secondary Content | Deep Purple | `#2d2639` | Text on secondary |
| Accent | Terracotta | `#D4A574` | Highlights, CTAs |
| Accent Content | Brown | `#2d2317` | Text on accent |
| Neutral | Warm Gray | `#6B6B6B` | Borders, disabled states |
| Neutral Content | Light Gray | `#f5f5f5` | Text on neutral |
| Base 100 | Warm Cream | `#FAF8F5` | Main background |
| Base 200 | Light Cream | `#F0EDE8` | Cards, elevated surfaces |
| Base 300 | Warm Beige | `#E5E0D8` | Borders, dividers |
| Base Content | Charcoal | `#3D3D3D` | Main text |

#### Zen Garden Dark

| Role | Color Name | Hex | Usage |
|------|------------|-----|-------|
| Primary | Muted Sage | `#7A8F6A` | Main actions, buttons, links |
| Primary Content | Cream | `#F0EDE8` | Text on primary |
| Secondary | Dusty Lavender | `#9A8BB8` | Secondary actions, tags |
| Secondary Content | Light Lavender | `#E8E0F0` | Text on secondary |
| Accent | Warm Terracotta | `#C49464` | Highlights, CTAs |
| Accent Content | Cream | `#FAF8F5` | Text on accent |
| Neutral | Medium Gray | `#4A4A4A` | Borders, disabled states |
| Neutral Content | Light Gray | `#E5E5E5` | Text on neutral |
| Base 100 | Deep Charcoal | `#1E1E1C` | Main background |
| Base 200 | Dark Olive | `#2A2A26` | Cards, elevated surfaces |
| Base 300 | Warm Dark | `#3A3A34` | Borders, dividers |
| Base Content | Warm White | `#F5F3F0` | Main text |

---

### 2. Serene Ocean

Calming, trustworthy, spa-like feel with coastal inspiration.

#### Serene Ocean Light

| Role | Color Name | Hex | Usage |
|------|------------|-----|-------|
| Primary | Soft Teal | `#7EB8B6` | Main actions, buttons, links |
| Primary Content | Deep Teal | `#0f2524` | Text on primary |
| Secondary | Dusty Blue | `#A8C4D9` | Secondary actions, tags |
| Secondary Content | Navy | `#1e2d38` | Text on secondary |
| Accent | Sand | `#D4C5A9` | Highlights, CTAs |
| Accent Content | Brown | `#2d2a1f` | Text on accent |
| Neutral | Cool Gray | `#64748B` | Borders, disabled states |
| Neutral Content | Off White | `#f1f5f9` | Text on neutral |
| Base 100 | Off White | `#F9FAFB` | Main background |
| Base 200 | Cool Gray 50 | `#F1F5F9` | Cards, elevated surfaces |
| Base 300 | Cool Gray 100 | `#E2E8F0` | Borders, dividers |
| Base Content | Slate | `#334155` | Main text |

#### Serene Ocean Dark

| Role | Color Name | Hex | Usage |
|------|------------|-----|-------|
| Primary | Deep Teal | `#5A9896` | Main actions, buttons, links |
| Primary Content | Light Cyan | `#E0F2F1` | Text on primary |
| Secondary | Steel Blue | `#7A9BB8` | Secondary actions, tags |
| Secondary Content | Ice Blue | `#E3EDF5` | Text on secondary |
| Accent | Warm Sand | `#B8A888` | Highlights, CTAs |
| Accent Content | Cream | `#FAF8F5` | Text on accent |
| Neutral | Slate Gray | `#475569` | Borders, disabled states |
| Neutral Content | Light Gray | `#E2E8F0` | Text on neutral |
| Base 100 | Deep Ocean | `#0F1419` | Main background |
| Base 200 | Dark Slate | `#1A2330` | Cards, elevated surfaces |
| Base 300 | Slate | `#293548` | Borders, dividers |
| Base Content | Ice White | `#F1F5F9` | Main text |

---

### 3. Tranquil Dawn

Soft, spiritual, meditation-focused with gentle warmth.

#### Tranquil Dawn Light

| Role | Color Name | Hex | Usage |
|------|------------|-----|-------|
| Primary | Dusty Rose | `#D4A5A5` | Main actions, buttons, links |
| Primary Content | Deep Rose | `#2d1f1f` | Text on primary |
| Secondary | Soft Lilac | `#B8A9C9` | Secondary actions, tags |
| Secondary Content | Deep Purple | `#2a2533` | Text on secondary |
| Accent | Muted Gold | `#C9B97A` | Highlights, CTAs |
| Accent Content | Dark Gold | `#2d2a17` | Text on accent |
| Neutral | Mauve Gray | `#8B7E8E` | Borders, disabled states |
| Neutral Content | Light Mauve | `#faf8fb` | Text on neutral |
| Base 100 | Blush White | `#FDF9F7` | Main background |
| Base 200 | Soft Pink | `#F8F2EF` | Cards, elevated surfaces |
| Base 300 | Warm Pink | `#EFE6E2` | Borders, dividers |
| Base Content | Deep Plum | `#4A3F55` | Main text |

#### Tranquil Dawn Dark

| Role | Color Name | Hex | Usage |
|------|------------|-----|-------|
| Primary | Deep Rose | `#B88585` | Main actions, buttons, links |
| Primary Content | Blush | `#FDF5F5` | Text on primary |
| Secondary | Dusty Violet | `#9889A8` | Secondary actions, tags |
| Secondary Content | Pale Lilac | `#F0EBF5` | Text on secondary |
| Accent | Antique Gold | `#A89A5A` | Highlights, CTAs |
| Accent Content | Cream | `#FDF9F7` | Text on accent |
| Neutral | Muted Plum | `#5A4D5E` | Borders, disabled states |
| Neutral Content | Light Mauve | `#E8E0EA` | Text on neutral |
| Base 100 | Deep Plum | `#1A1618` | Main background |
| Base 200 | Dark Mauve | `#2A2428` | Cards, elevated surfaces |
| Base 300 | Plum Gray | `#3D343A` | Borders, dividers |
| Base Content | Rose White | `#F8F5F5` | Main text |

---

## Implementation Instructions

### Step 1: Create the Theme CSS File

Create or update your main CSS file (e.g., `src/styles/global.css` or `src/app.css`) with the following content:

```css
@import "tailwindcss";

@plugin "daisyui" {
  themes: zen-garden --default, zen-garden-dark --prefersdark, serene-ocean, serene-ocean-dark, tranquil-dawn, tranquil-dawn-dark;
}

/* ============================================
   ZEN GARDEN - LIGHT
   ============================================ */
@plugin "daisyui/theme" {
  name: "zen-garden";
  default: true;
  
  --color-primary: #9CAF88;
  --color-primary-content: #1a1f16;
  
  --color-secondary: #C3B1E1;
  --color-secondary-content: #2d2639;
  
  --color-accent: #D4A574;
  --color-accent-content: #2d2317;
  
  --color-neutral: #6B6B6B;
  --color-neutral-content: #f5f5f5;
  
  --color-base-100: #FAF8F5;
  --color-base-200: #F0EDE8;
  --color-base-300: #E5E0D8;
  --color-base-content: #3D3D3D;
  
  --color-info: #7EB8B6;
  --color-info-content: #0f2524;
  --color-success: #86EFAC;
  --color-success-content: #14532D;
  --color-warning: #FDE68A;
  --color-warning-content: #78350F;
  --color-error: #FCA5A5;
  --color-error-content: #7F1D1D;
  
  --radius-btn: 0.5rem;
  --radius-box: 0.75rem;
  --radius-field: 0.375rem;
}

/* ============================================
   ZEN GARDEN - DARK
   ============================================ */
@plugin "daisyui/theme" {
  name: "zen-garden-dark";
  prefersdark: true;
  
  --color-primary: #7A8F6A;
  --color-primary-content: #F0EDE8;
  
  --color-secondary: #9A8BB8;
  --color-secondary-content: #E8E0F0;
  
  --color-accent: #C49464;
  --color-accent-content: #FAF8F5;
  
  --color-neutral: #4A4A4A;
  --color-neutral-content: #E5E5E5;
  
  --color-base-100: #1E1E1C;
  --color-base-200: #2A2A26;
  --color-base-300: #3A3A34;
  --color-base-content: #F5F3F0;
  
  --color-info: #5A9896;
  --color-info-content: #E0F2F1;
  --color-success: #4ADE80;
  --color-success-content: #14532D;
  --color-warning: #FACC15;
  --color-warning-content: #78350F;
  --color-error: #F87171;
  --color-error-content: #FEE2E2;
  
  --radius-btn: 0.5rem;
  --radius-box: 0.75rem;
  --radius-field: 0.375rem;
}

/* ============================================
   SERENE OCEAN - LIGHT
   ============================================ */
@plugin "daisyui/theme" {
  name: "serene-ocean";
  
  --color-primary: #7EB8B6;
  --color-primary-content: #0f2524;
  
  --color-secondary: #A8C4D9;
  --color-secondary-content: #1e2d38;
  
  --color-accent: #D4C5A9;
  --color-accent-content: #2d2a1f;
  
  --color-neutral: #64748B;
  --color-neutral-content: #f1f5f9;
  
  --color-base-100: #F9FAFB;
  --color-base-200: #F1F5F9;
  --color-base-300: #E2E8F0;
  --color-base-content: #334155;
  
  --color-info: #7EB8B6;
  --color-info-content: #0f2524;
  --color-success: #86EFAC;
  --color-success-content: #14532D;
  --color-warning: #FDE68A;
  --color-warning-content: #78350F;
  --color-error: #FCA5A5;
  --color-error-content: #7F1D1D;
  
  --radius-btn: 0.75rem;
  --radius-box: 1rem;
  --radius-field: 0.5rem;
}

/* ============================================
   SERENE OCEAN - DARK
   ============================================ */
@plugin "daisyui/theme" {
  name: "serene-ocean-dark";
  
  --color-primary: #5A9896;
  --color-primary-content: #E0F2F1;
  
  --color-secondary: #7A9BB8;
  --color-secondary-content: #E3EDF5;
  
  --color-accent: #B8A888;
  --color-accent-content: #FAF8F5;
  
  --color-neutral: #475569;
  --color-neutral-content: #E2E8F0;
  
  --color-base-100: #0F1419;
  --color-base-200: #1A2330;
  --color-base-300: #293548;
  --color-base-content: #F1F5F9;
  
  --color-info: #5A9896;
  --color-info-content: #E0F2F1;
  --color-success: #4ADE80;
  --color-success-content: #14532D;
  --color-warning: #FACC15;
  --color-warning-content: #78350F;
  --color-error: #F87171;
  --color-error-content: #FEE2E2;
  
  --radius-btn: 0.75rem;
  --radius-box: 1rem;
  --radius-field: 0.5rem;
}

/* ============================================
   TRANQUIL DAWN - LIGHT
   ============================================ */
@plugin "daisyui/theme" {
  name: "tranquil-dawn";
  
  --color-primary: #D4A5A5;
  --color-primary-content: #2d1f1f;
  
  --color-secondary: #B8A9C9;
  --color-secondary-content: #2a2533;
  
  --color-accent: #C9B97A;
  --color-accent-content: #2d2a17;
  
  --color-neutral: #8B7E8E;
  --color-neutral-content: #faf8fb;
  
  --color-base-100: #FDF9F7;
  --color-base-200: #F8F2EF;
  --color-base-300: #EFE6E2;
  --color-base-content: #4A3F55;
  
  --color-info: #A8C4D9;
  --color-info-content: #1e2d38;
  --color-success: #86EFAC;
  --color-success-content: #14532D;
  --color-warning: #FDE68A;
  --color-warning-content: #78350F;
  --color-error: #FCA5A5;
  --color-error-content: #7F1D1D;
  
  --radius-btn: 1rem;
  --radius-box: 1rem;
  --radius-field: 0.5rem;
}

/* ============================================
   TRANQUIL DAWN - DARK
   ============================================ */
@plugin "daisyui/theme" {
  name: "tranquil-dawn-dark";
  
  --color-primary: #B88585;
  --color-primary-content: #FDF5F5;
  
  --color-secondary: #9889A8;
  --color-secondary-content: #F0EBF5;
  
  --color-accent: #A89A5A;
  --color-accent-content: #FDF9F7;
  
  --color-neutral: #5A4D5E;
  --color-neutral-content: #E8E0EA;
  
  --color-base-100: #1A1618;
  --color-base-200: #2A2428;
  --color-base-300: #3D343A;
  --color-base-content: #F8F5F5;
  
  --color-info: #7A9BB8;
  --color-info-content: #E3EDF5;
  --color-success: #4ADE80;
  --color-success-content: #14532D;
  --color-warning: #FACC15;
  --color-warning-content: #78350F;
  --color-error: #F87171;
  --color-error-content: #FEE2E2;
  
  --radius-btn: 1rem;
  --radius-box: 1rem;
  --radius-field: 0.5rem;
}
```

### Step 2: Apply Theme to HTML

Set the default theme on your root HTML element:

```html
<html data-theme="zen-garden">
```

Or for automatic dark mode based on system preference, the `--prefersdark` flag handles this automatically.

### Step 3: Add Theme Switcher (Optional)

Install `theme-change` for persistent theme switching:

```bash
npm install theme-change
```

Create a theme controller component:

```html
<select class="select select-bordered" data-choose-theme>
  <option value="zen-garden">Zen Garden</option>
  <option value="zen-garden-dark">Zen Garden Dark</option>
  <option value="serene-ocean">Serene Ocean</option>
  <option value="serene-ocean-dark">Serene Ocean Dark</option>
  <option value="tranquil-dawn">Tranquil Dawn</option>
  <option value="tranquil-dawn-dark">Tranquil Dawn Dark</option>
</select>
```

Initialize in your JavaScript:

```javascript
import { themeChange } from 'theme-change';

// Call on component mount
themeChange(false); // false = don't use localStorage, true = persist choice
```

---

## Design Guidelines

### Color Usage Ratio

Follow the 60-30-10 rule:
- **60%** — Base colors (background, cards)
- **30%** — Primary/Secondary (buttons, links, headers)
- **10%** — Accent (CTAs, highlights, special elements)

### Accessibility

All theme combinations maintain WCAG AA contrast ratios:
- Base content on base backgrounds: 4.5:1 minimum
- Primary/Secondary content on their backgrounds: 4.5:1 minimum

### Component Styling Examples

```html
<!-- Primary button -->
<button class="btn btn-primary">Book a Class</button>

<!-- Secondary outline button -->
<button class="btn btn-secondary btn-outline">Learn More</button>

<!-- Accent highlight -->
<span class="badge badge-accent">New</span>

<!-- Card with subtle elevation -->
<div class="card bg-base-200 shadow-sm">
  <div class="card-body">
    <h2 class="card-title text-primary">Yoga Session</h2>
    <p>Find your inner peace.</p>
  </div>
</div>

<!-- Neutral divider -->
<div class="divider"></div>

<!-- Info alert -->
<div class="alert alert-info">
  <span>Your session starts in 10 minutes.</span>
</div>
```

### Typography Recommendations

Pair these themes with humanist fonts for consistency:
- **Headings**: Commissioner, Source Sans 3, or Fira Sans
- **Body**: Inter, Source Sans 3, or system-ui

Example Tailwind config addition:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Commissioner', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

---

## File Structure

After implementation, your project should have:

```
src/
├── styles/
│   └── global.css          # Contains all theme definitions
├── components/
│   └── ThemeSwitcher.jsx   # Optional theme controller
└── layouts/
    └── Layout.astro        # Or your root layout with data-theme
```

---

## Testing Checklist

After implementation, verify:

- [ ] Light theme displays correctly
- [ ] Dark theme displays correctly  
- [ ] Theme switcher persists selection (if using theme-change)
- [ ] System preference (`prefers-color-scheme`) triggers correct dark theme
- [ ] All buttons have sufficient contrast
- [ ] Cards and elevated surfaces are distinguishable from background
- [ ] Form inputs are clearly visible
- [ ] Links are identifiable
- [ ] Focus states are visible for accessibility

---

## Customization

To adjust any color, modify the hex value in the corresponding `@plugin "daisyui/theme"` block and rebuild.

To use only one theme pair (e.g., just Zen Garden):

```css
@plugin "daisyui" {
  themes: zen-garden --default, zen-garden-dark --prefersdark;
}
```

Then remove the unused theme blocks from your CSS.