# Baháʼí Community Website

A modern, static-first community website built with Astro, TypeScript, React, and Tailwind CSS. This is Phase 1 (Fullstack POC) demonstrating the complete site layout with dummy content, ready for backend integration.

## Features

### Current Implementation (Phase 1 - POC)

- **Complete Site Layout**: All main pages with dummy content
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Component Library**: Reusable, well-documented components
- **Dynamic Routing**: Individual pages for events and prayers
- **Search Functionality**: Client-side search across all content
- **TypeScript**: Type-safe codebase throughout
- **Performance Optimized**: Static-first with fast page loads

### Pages Implemented

- **Home**: Welcome page with featured content and upcoming events
- **About**: Information about the Baháʼí Faith and its principles
- **Community Life**: Overview of core activities (study circles, devotionals, etc.)
- **Study & Deepening**: Study materials, Ruhi books, and sacred writings
- **Devotional Resources**: Prayers library with filtering
- **Events**: Event calendar with upcoming community events
- **News**: Blog/news articles
- **Contact**: Contact form and information
- **Search**: Site-wide search functionality

### Components

- `Hero`: Page headers with title, subtitle, and CTA
- `Calendar`: Event calendar with upcoming events list
- `EventCard`: Event display with date, time, location
- `PrayerCard`: Prayer display with author and tags
- `ResourceDownload`: Downloadable resources (PDFs, audio, video)
- `SearchBar`: Search input with results navigation
- `LocaleSwitcher`: Language selector (ready for i18n)
- `ContentBlock`: Markdown content renderer

## Project Structure

```
/
├── Brief/                  # Project brief and requirements
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable Astro and React components
│   │   ├── Calendar.astro
│   │   ├── ContentBlock.astro
│   │   ├── EventCard.astro
│   │   ├── Hero.astro
│   │   ├── LocaleSwitcher.tsx
│   │   ├── PrayerCard.astro
│   │   ├── ResourceDownload.astro
│   │   └── SearchBar.tsx
│   ├── content/           # Content collections (Markdown & JSON)
│   │   ├── config.ts     # Content schemas with Zod validation
│   │   ├── events/       # Event data (JSON)
│   │   ├── prayers/      # Prayer text (Markdown)
│   │   ├── writings/     # Sacred writings metadata (JSON)
│   │   ├── resources/    # Resource files metadata (JSON)
│   │   └── news/         # News articles (Markdown)
│   ├── layouts/           # Page layouts
│   │   └── BaseLayout.astro
│   ├── pages/             # Route pages
│   │   ├── about.astro
│   │   ├── community.astro
│   │   ├── contact.astro
│   │   ├── devotional.astro
│   │   ├── devotional/prayers/
│   │   │   ├── [id].astro      # Dynamic prayer pages
│   │   │   └── index.astro     # Prayer listing
│   │   ├── events.astro
│   │   ├── events/[id].astro   # Dynamic event pages
│   │   ├── index.astro
│   │   ├── news.astro
│   │   ├── search.astro
│   │   └── study.astro
│   └── styles/
│       └── global.css     # Global Tailwind styles
├── astro.config.mjs       # Astro configuration
├── CONTENT_STRUCTURE.md   # Content collections documentation
├── package.json
├── tailwind.config.js     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:4321/`

3. **Build for production**:
   ```bash
   npm run build
   ```

   The static site will be generated in `./dist/`

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro ...` | Run Astro CLI commands |

## Technology Stack

- **Framework**: [Astro](https://astro.build/) - Static-first framework
- **UI Library**: [React](https://react.dev/) - For interactive components
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type safety
- **Version Control**: Git

## Next Steps (Phase 2)

Phase 2 will integrate the backend CMS:

1. **Set up Directus CMS**
   - Configure PostgreSQL database on Neon
   - Deploy Directus on Render
   - Create collections schema (pages, events, prayers, writings, resources)

2. **Replace Dummy Data**
   - Create Directus API client in `src/lib/directus.ts`
   - Replace dummy data imports with API calls
   - Implement build-time data fetching

3. **Configure Deployment**
   - Set up Vercel for hosting
   - Configure environment variables
   - Set up webhook for content publish → rebuild

4. **Implement Remaining Features**
   - Integrate Pagefind for search
   - Add multilingual support (i18n)
   - Configure Formspree for contact form
   - Set up analytics (Plausible/Fathom)

## Environment Variables (For Phase 2)

Create a `.env` file with:

```env
PUBLIC_DIRECTUS_URL=https://your-directus-instance.com
DIRECTUS_TOKEN=your-api-token
```

## Contributing

This project follows the implementation plan outlined in `/Brief/Brief.md`.

## License

Copyright © 2025 Baháʼí Community. All rights reserved.

## Support

For questions or support, please contact: kaihaan@gmail.com
