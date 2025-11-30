# Haringey Baháʼí Community Website - Sitemap

**Last Updated**: 2025-11-30
**Site Type**: Static Site Generator (Astro v5)
**Build Status**: Phase 3 Complete - Full Directus CMS Migration

---

## Site Structure Overview

The website is organized into five main sections:

1. **Learn & Study** - Educational resources and study materials
2. **Connect & Serve** - Community engagement and activities
3. **Pray & Reflect** - Devotional content and prayers
4. **About** - Information about the Faith
5. **News & Contact** - Updates and communication

## Site Purpose:
Introduce visitors to key aspects of the Bahai Faith
- Learning & Studying - that there is a community ofpeople learning about spirituality
- Community acitvities - and an invitation to connect (spiritual wellbeing)
- Pray / Reflect & Act - how bahai incorporate prayer and action into their lives

---

## Complete Page Directory

### Home
- **Route**: `/`
- **File**: `src/pages/index.astro`
- **Description**: Main landing page with overview of core sections, featured prayer, upcoming events calendar
- **Content**: Links to Learn & Study, Connect & Serve, Pray & Reflect sections

### Learn & Study Section

#### Study Resources
- **Route**: `/study`
- **File**: `src/pages/study.astro`
- **Description**: Main study hub with learning materials and resources
- **Content**: Writings, resources, and educational content from Directus CMS

#### Events
- **Route**: `/events`
- **File**: `src/pages/events.astro`
- **Description**: Calendar of community events with recurring event expansion
- **Content**: Published events from Directus CMS with timezone-aware scheduling (Europe/London)
- **Data Source**: Directus `events` collection
- **Features**:
  - Recurring event expansion (weekly, monthly patterns)
  - Timezone handling (GMT/BST)
  - Dynamic event details with individual event pages

#### Individual Event Details
- **Route**: `/events/[id]`
- **File**: `src/pages/events/[id].astro`
- **Description**: Detailed view of individual event with full information
- **Data Source**: Directus `events` collection

### Connect & Serve Section

#### Community Life
- **Route**: `/community`
- **File**: `src/pages/community.astro`
- **Description**: Information about Baháʼí core activities and community engagement
- **Content**: Core activities overview, service opportunities, community values

### Pray & Reflect Section

#### Devotional Hub
- **Route**: `/devotional`
- **File**: `src/pages/devotional.astro`
- **Description**: Main devotional center with prayers and spiritual resources
- **Content**: Featured content from prayers collection, links to full prayer library

#### Prayers Collection
- **Route**: `/devotional/prayers`
- **File**: `src/pages/devotional/prayers/index.astro`
- **Description**: Complete prayer library with filtering and search
- **Data Source**: Directus `prayers` collection
- **Content Fields**: Title, text, author, category, tags

#### Individual Prayer Details
- **Route**: `/devotional/prayers/[id]`
- **File**: `src/pages/devotional/prayers/[id].astro`
- **Description**: Full view of individual prayer with metadata
- **Data Source**: Directus `prayers` collection

### About Section

#### About the Baháʼí Faith
- **Route**: `/about`
- **File**: `src/pages/about.astro`
- **Description**: Comprehensive overview of Baháʼí Faith teachings and principles
- **Content**:
  - What is the Baháʼí Faith
  - Core principles
  - History and context
  - Belief system

#### History
- **Route**: `/history`
- **File**: `src/pages/history.astro`
- **Description**: Detailed history of the Baháʼí Faith with world context
- **Content**: Timeline of events, historical figures, world context at time of founding

#### For Seekers
- **Route**: `/seekers`
- **File**: `src/pages/seekers.astro`
- **Description**: Introduction to the Baháʼí Faith for new visitors
- **Content**: Beginner-friendly overview, core concepts, questions answered

### Resources Section

#### Resources & Downloads
- **Route**: `/resources`
- **File**: `src/pages/resources.astro`
- **Description**: Downloadable content (PDFs, audio, video) and external resources
- **Data Source**: Content Collections `resources` (local MD files)
- **Resource Types**: PDF, Audio, Video, Links

### Utility Pages

#### Search
- **Route**: `/search`
- **File**: `src/pages/search.astro`
- **Description**: Client-side search functionality across site content
- **Component**: React `SearchBar.tsx` component
- **Functionality**: Search prayers, events, news, and resources

#### News & Updates
- **Route**: `/news`
- **File**: `src/pages/news.astro`
- **Description**: Community news and announcements
- **Data Source**: Content Collections `news` (local MD files)
- **Content Fields**: Title, date, excerpt, image, category

#### Contact
- **Route**: `/contact`
- **File**: `src/pages/contact.astro`
- **Description**: Contact information and communication methods
- **Content**: Email, phone, location, contact form, social media

---

## Data Sources

### Directus CMS (Remote - Render Hosting)
API Endpoint: `https://haringey-directus.onrender.com`

**Collections**:

1. **events**
   - Published events with recurring patterns
   - Fields: id, title, description, start_date, end_date, location, recurrence_pattern, days_of_week, week_of_month, frequency
   - Dynamic routes: `/events` and `/events/[id]`
   - Timezone: Europe/London (GMT/BST)

2. **prayers**
   - Devotional prayer content
   - Fields: id, title, text, author, category, tags
   - Dynamic routes: `/devotional/prayers` and `/devotional/prayers/[id]`

### All Collections in Directus CMS

3. **writings**
   - Sacred texts and teachings
   - Fields: id, title, short_title, author, category, excerpt, text, tags, external_link

4. **resources**
   - Educational materials (PDF, audio, video, links)
   - Fields: id, title, type, description, file, resource_url, tags, category, author

5. **news**
   - Community announcements and updates
   - Fields: id, title, slug, date, excerpt, content, image, category, author

---

## Navigation Structure

### Primary Navigation
Located in header (all pages):
- Home
- Study
- Events
- Community
- Devotional
- About
- Resources
- Contact
- Search

### Breadcrumb Navigation
Present on detail pages:
- `/events/[id]` → Home > Events > Event Title
- `/devotional/prayers/[id]` → Home > Devotional > Prayers > Prayer Title

### Footer Navigation
- Quick links to main sections
- Copyright and disclaimer
- Social media links

---

## Dynamic Routes

These routes generate multiple pages based on Directus content:

| Route Pattern | Source | Example |
|---|---|---|
| `/events/[id]` | Directus `events` | `/events/1`, `/events/2`, etc. |
| `/devotional/prayers/[id]` | Directus `prayers` | `/devotional/prayers/1`, `/devotional/prayers/2`, etc. |

---

## Page Categorization

### By Function

**Educational Pages**
- `/study` - Study resources
- `/resources` - Downloadable content
- `/history` - Historical information
- `/about` - Faith overview

**Community Pages**
- `/events` - Event calendar
- `/devotional` - Prayer and reflection hub
- `/community` - Core activities

**For Visitors**
- `/` - Landing page
- `/seekers` - Introduction to Faith
- `/contact` - Communication

**Utility Pages**
- `/search` - Content search
- `/news` - Updates and announcements

### By Content Source

**Directus-Powered Pages** (All content fetched from Directus API):
- `/events` - Event listing (Directus events)
- `/events/[id]` - Event details (Directus events)
- `/devotional/prayers` - Prayer listing (Directus prayers)
- `/devotional/prayers/[id]` - Prayer details (Directus prayers)
- `/study` - Study resources (Directus writings & resources)
- `/resources` - Resource listing (Directus resources)
- `/news` - News articles (Directus news)
- `/search` - Search across all Directus content

**Static Pages** (No dynamic content):
- `/` - Home
- `/about` - About Faith
- `/community` - Community Life
- `/contact` - Contact
- `/devotional` - Devotional Hub
- `/history` - History
- `/seekers` - For Seekers

---

## Content Flow & Dependencies

```
Directus CMS
    ↓ (API)
┌─────────────────────────────────────────────┐
│ Data Normalization & Processing             │
│ - getPublishedItems()                       │
│ - normalizeEventData()                      │
│ - expandRecurringEventsSync()               │
│ - formatEventDate() (London timezone)       │
└─────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────┐
│ Page Rendering                              │
│ - /events → displays event occurrences      │
│ - /devotional/prayers → prayer list         │
│ - Home → featured content + calendar        │
└─────────────────────────────────────────────┘
    ↓
Static HTML
    ↓
Vercel Deployment
```

---

## Build & Deployment

**Build Process**:
- Static Site Generation (SSG) at build time
- All Directus API calls happen during `npm run build`
- Automatic rebuilds triggered by Directus webhooks

**Deployment**: Vercel
**Environment Variables Required**:
- `PUBLIC_DIRECTUS_URL` - Directus API URL
- `DIRECTUS_TOKEN` - Static API token

---

## Accessibility & SEO

All pages include:
- Semantic HTML structure
- Proper heading hierarchy
- Meta descriptions
- Open Graph tags
- Timezone-aware dates (Europe/London)
- Accessible color contrasts (Tranquil Dawn theme)

---

## Special Features

### Recurring Events System
- Expands recurring events into individual occurrences
- Supports weekly and monthly patterns
- Timezone-aware calculation (Europe/London)
- Displays next N occurrences per event

### Search Functionality
- Client-side search across all indexed content
- Available on `/search`

### Theme System
- **Tranquil Dawn Theme**: Default color scheme
- Light/dark mode support prepared
- Tailwind CSS with DaisyUI components

---

## File Organization

```
src/
├── pages/                       # Route definitions
│   ├── index.astro             # Home page
│   ├── about.astro             # About Faith
│   ├── community.astro         # Community Life
│   ├── contact.astro           # Contact
│   ├── devotional.astro        # Devotional hub
│   ├── devotional/
│   │   └── prayers/
│   │       ├── index.astro     # Prayer listing
│   │       └── [id].astro      # Prayer detail
│   ├── events.astro            # Event listing
│   ├── events/
│   │   └── [id].astro          # Event detail
│   ├── history.astro           # History page
│   ├── news.astro              # News listing
│   ├── resources.astro         # Resources page
│   ├── search.astro            # Search page
│   ├── seekers.astro           # For Seekers
│   └── study.astro             # Study resources
├── components/                  # Reusable components
│   ├── *.astro                 # Astro components
│   └── *.tsx                   # React components
├── layouts/                     # Page layouts
│   └── BaseLayout.astro        # Main layout
├── lib/                        # Utility functions
│   ├── directus.ts             # CMS API client
│   └── recurrence.ts           # Event recurrence logic
└── content/                    # Content collections
    ├── config.ts               # Collection schemas
    ├── writings/               # Sacred texts
    ├── resources/              # Resources
    └── news/                   # News articles
```

---

## Key Integration Points

### Directus Integration
- **Module**: `src/lib/directus.ts`
- **Functions**:
  - `getPublishedItems<T>(collection)` - Fetch published items
  - `expandRecurringEventsSync()` - Expand recurring events
  - `normalizeEventData()` - Handle data format variations

### Recurring Events Logic
- **Module**: `src/lib/recurrence.ts`
- **Functions**:
  - `getNextOccurrences()` - Calculate event occurrences
  - `formatEventDate()` - Format with timezone awareness
  - `formatRecurrencePattern()` - Human-readable patterns

### Data Normalization
- Directus fields may return variations (string vs array, case)
- Always use `normalizeEventData()` before processing
- Ensures consistent handling of `days_of_week` and `week_of_month`

---

## Future Expansion

**Planned Features**:
- Internationalization (i18n) - `LocaleSwitcher.tsx` ready
- Additional themes beyond Tranquil Dawn
- More resource types
- Expanded News categories and filtering
- Advanced search capabilities

---

*For detailed schema information, see DIRECTUS_SCHEMA.md*
*For deployment procedures, see DEPLOYMENT.md*
*For content editing guide, see EDITOR_GUIDE.md*
