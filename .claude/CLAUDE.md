# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Haringey Baháʼí Community Website** - a static-first community website built with Astro v5, TypeScript, React, and Tailwind CSS. The site uses **Directus CMS** (hosted on Render) as a headless CMS backed by **Neon PostgreSQL**, with automatic deployments via **Vercel**.

**Current Phase**: Phase 3 complete - Full CMS migration. All content (events, prayers, writings, resources, news) now fetched from Directus API. Local content collections removed.

## Commands

```bash
# Development
npm run dev          # Start dev server at localhost:4321
npm run build        # Build production site to ./dist/
npm run preview      # Preview production build locally

# Testing (manual)
node test-events.mjs       # Test Directus events API connection
node test-recurrence.mjs   # Test recurring event calculations
node debug-build.mjs       # Debug build process with event data
node debug-normalize.mjs   # Debug data normalization
```

## Architecture

### Content Strategy

The site uses **Directus CMS exclusively** for all content management:

- **Directus CMS**: All content types (events, prayers, writings, resources, news) fetched from Directus API
- **No local collections**: Astro Content Collections (`src/content/`) have been removed
- **Single source of truth**: All content managed in Directus, deployed to Vercel

### Key Architectural Components

#### 1. Directus Integration (`src/lib/directus.ts`)

Central module for all Directus API interactions:

```typescript
import { getPublishedItems, expandRecurringEventsSync } from '@/lib/directus';
import { getNextOccurrences, formatEventDate } from '@/lib/recurrence';

// Fetch published items
const events = await getPublishedItems<Event>('events');

// Expand recurring events into individual occurrences
const eventOccurrences = expandRecurringEventsSync(
  events,
  getNextOccurrences,
  formatEventDate,
  5  // number of occurrences per event
);
```

**Type Definitions**: All Directus collection interfaces defined here (Prayer, Event, EventOccurrence, etc.)

#### 2. Recurring Events System (`src/lib/recurrence.ts`)

Complex timezone-aware recurrence calculation system:

**Patterns Supported**:
- **Weekly**: Events on specific days (e.g., "Every Wednesday")
- **Monthly**: Events on specific week + day (e.g., "First Sunday of each month")

**Critical Timezone Handling**:
- All dates calculated and displayed in **Europe/London timezone** (GMT/BST)
- Uses `getTimeInLondon()` to extract hours/minutes in UK time
- Uses `createDateWithLondonTime()` to construct dates correctly
- Ensures consistent display regardless of build server timezone (Vercel uses UTC)

**Key Functions**:
```typescript
getNextOccurrences(event, count, fromDate)  // Calculate next N occurrences
formatRecurrencePattern(event)              // Human-readable pattern text
formatEventDate(date)                       // Format with London timezone
```

**Data Normalization**: `normalizeEventData()` handles Directus field format variations:
- Converts `days_of_week` from string to array and capitalizes
- Converts `week_of_month` from array to string and capitalizes
- Ensures consistent data format regardless of Directus field configuration

#### 3. Page Rendering Pattern

Pages follow this pattern for Directus content:

```typescript
// src/pages/events.astro (example)
const events = await getPublishedItems<Event>('events');
const eventOccurrences = expandRecurringEventsSync(events, getNextOccurrences, formatEventDate, 5);
```

Components receive `EventOccurrence[]` not `Event[]` to display calculated dates.

#### 4. Static Site Generation (SSG)

- **Build-time data fetching**: All Directus API calls happen during `npm run build`
- **Automatic rebuilds**: Directus webhook triggers Vercel rebuild on content publish
- **Environment variables**: Required for builds (see `.env.example`)

### Data Flow

```
Directus CMS (Render)
    ↓ (API fetch during build)
src/lib/directus.ts
    ↓ (getPublishedItems)
src/lib/recurrence.ts
    ↓ (expand recurring events)
Page Components (.astro)
    ↓ (props)
UI Components (Calendar.astro, EventCard.astro)
    ↓ (static HTML)
Vercel (deployed static site)
```

### Component Organization

**Astro Components** (`src/components/*.astro`):
- `Calendar.astro` - Event sidebar with upcoming dates
- `EventCard.astro` - Individual event display
- `PrayerCard.astro` - Prayer display with author/tags
- `Hero.astro` - Page headers
- `ContentBlock.astro` - Markdown renderer
- `ResourceDownload.astro` - File downloads

**React Components** (`src/components/*.tsx`):
- `SearchBar.tsx` - Client-side search
- `LocaleSwitcher.tsx` - Language selector (prepared for i18n)

### Environment Setup

Required environment variables (copy from `.env.example`):

```env
PUBLIC_DIRECTUS_URL=https://haringey-directus.onrender.com
DIRECTUS_TOKEN=your-static-api-token
```

**Important**:
- `PUBLIC_DIRECTUS_URL` is exposed to client (prefix `PUBLIC_`)
- `DIRECTUS_TOKEN` is server-only (no prefix)
- Vercel environment variables must be configured in dashboard

## Important Implementation Details

### Timezone Handling

**Critical**: All event times must display in UK time (Europe/London) regardless of:
- Build server timezone (Vercel uses UTC)
- User browser timezone
- Daylight Saving Time (GMT ↔ BST transitions)

**Solution**:
1. Extract time from Directus in London timezone: `getTimeInLondon(date)`
2. Create dates in London timezone: `createDateWithLondonTime(year, month, day, hours, minutes)`
3. Format with explicit timezone: `toLocaleString('en-GB', { timeZone: 'Europe/London' })`

**Always** specify `timeZone: 'Europe/London'` when formatting dates for display.

### Directus Data Normalization

Directus may return fields in unexpected formats:
- `days_of_week`: Can be `"sunday"` (string) or `["sunday"]` (array), lowercase or capitalized
- `week_of_month`: Can be `"first"` (string) or `["first"]` (array), lowercase or capitalized

**Always** use `normalizeEventData()` before processing event recurrence to handle these variations.

### Recurring Event Display

When showing recurring events:
1. Fetch events: `getPublishedItems<Event>('events')`
2. Expand occurrences: `expandRecurringEventsSync(events, ...)`
3. Pass `EventOccurrence[]` to components (not `Event[]`)
4. Each occurrence has `occurrence_date` and `display_date` fields

### All Content from Directus

All content types use **Directus CMS** with `getPublishedItems()`:

**Collections**:
- Events (`events` collection)
- Prayers (`prayers` collection)
- Writings (`writings` collection)
- Resources (`resources` collection)
- News (`news` collection)

### Build Troubleshooting

If events don't appear after Directus changes:
1. Check Vercel build logs for API errors
2. Test locally: `TZ=UTC npm run build` (simulates Vercel environment)
3. Run debug scripts: `node test-events.mjs`
4. Verify webhook is triggering rebuilds in Vercel dashboard

## Documentation Files
Documentation is maintained in .claude/docs.

Generated documents should be stored in the est match folder:
/site_map
/guides
    - **EDITOR_GUIDE.md** - Content editor manual
    - **DEPLOYMENT.md** - Deployment procedures
/project_planning
/CMS
    - **DIRECTUS_SCHEMA.md** - Complete Directus collection schemas
    - **DIRECTUS_CONFIGURATION_GUIDE.md** - CMS setup instructions

## code generation
Always use context7 when I need code generation, setup or configuration steps, or
library/API documentation. This means you should automatically use the Context7 MCP
tools to resolve library id and get library docs without me having to explicitly ask.


## Tech Stack

- **Astro** 5.15.1 - Static site generator
- **React** 19.2.0 - Interactive components
- **TypeScript** - Type safety
- **Tailwind CSS** 4.1.16 - Styling
- **Directus SDK** 20.1.0 - CMS client
- **Directus** - Headless CMS (hosted on Render)
- **Neon** - PostgreSQL database
- **Vercel** - Hosting platform
