# Content Structure

This project uses Astro Content Collections to manage all content as markdown and JSON files. This approach makes content easy to edit and prepares the site for CMS integration in Phase 2.

## Directory Structure

```
src/content/
├── config.ts           # Content collection schemas
├── events/             # Event data (JSON)
├── prayers/            # Prayer text (Markdown)
├── writings/           # Sacred writings metadata (JSON)
├── resources/          # Resource files metadata (JSON)
└── news/               # News articles (Markdown)
```

## Content Collections

### Events (`src/content/events/*.json`)

Event data stored as JSON files.

**Schema:**
```typescript
{
  title: string,
  description: string,
  startDateTime: string,  // ISO format
  endDateTime: string,    // ISO format
  location: string,
  isPublic: boolean,
  registrationLink?: string
}
```

**Example:** `src/content/events/nineteen-day-feast.json`

### Prayers (`src/content/prayers/*.md`)

Prayer text stored as markdown files with frontmatter metadata.

**Frontmatter:**
```yaml
---
title: Prayer for Unity
author: "ʻAbdu'l-Bahá"
category: Unity
tags:
  - unity
  - guidance
  - service
---
```

**Body:** The full prayer text in markdown.

**Example:** `src/content/prayers/prayer-for-unity.md`

### Writings (`src/content/writings/*.json`)

Sacred writings metadata stored as JSON files.

**Schema:**
```typescript
{
  title: string,
  shortTitle: string,
  author: string,
  category: string,
  excerpt: string,
  tags: string[]
}
```

**Example:** `src/content/writings/hidden-words.json`

### Resources (`src/content/resources/*.json`)

Downloadable resource metadata stored as JSON files.

**Schema:**
```typescript
{
  title: string,
  type: 'pdf' | 'audio' | 'video' | 'link',
  description: string,
  fileUrl?: string,
  tags: string[],
  category: string
}
```

**Example:** `src/content/resources/ruhi-book-1.json`

### News (`src/content/news/*.md`)

News articles stored as markdown files with frontmatter.

**Frontmatter:**
```yaml
---
title: Community Celebrates Bicentenary
date: "2024-10-28"
excerpt: A brief summary of the article
image: /images/news-1.jpg
category: Celebrations
---
```

**Body:** The full article content in markdown.

## Usage in Pages

Import and use content collections in Astro pages:

```astro
---
import { getCollection } from 'astro:content';

// Get all entries from a collection
const events = await getCollection('events');
const prayers = await getCollection('prayers');

// Access data
events.forEach(event => {
  console.log(event.data.title);    // Access frontmatter/JSON data
  console.log(event.id);            // File name (without extension)
});

prayers.forEach(prayer => {
  console.log(prayer.data.title);   // Frontmatter title
  console.log(prayer.body);         // Markdown content
});
---
```

## Adding New Content

### To add a new prayer:

1. Create a new `.md` file in `src/content/prayers/`
2. Add frontmatter with title, author, category, and tags
3. Write the prayer text in the body
4. The page will automatically include it

### To add a new event:

1. Create a new `.json` file in `src/content/events/`
2. Follow the event schema
3. The event will automatically appear on the events page

### To add a new resource:

1. Create a new `.json` file in `src/content/resources/`
2. Follow the resource schema
3. Upload the actual file to the appropriate location
4. Update `fileUrl` to point to the file

## Migration to CMS (Phase 2)

When migrating to Directus CMS:

1. **Content collections will be replaced** with Directus API calls
2. **File structure will remain** as a reference/backup
3. **Schemas defined in `config.ts`** map directly to Directus collections
4. **Data transformation logic** in pages can be reused with minimal changes

The content collection approach makes this migration straightforward since the data structure is already defined and validated.

## Benefits of This Approach

- **Easy to Edit**: Non-developers can edit markdown and JSON files
- **Version Control**: All content changes are tracked in Git
- **Type Safety**: Zod schemas validate content structure
- **CMS-Ready**: Structure maps directly to CMS collections
- **Fast Builds**: Content is processed at build time
- **No Database**: Everything is file-based for Phase 1
