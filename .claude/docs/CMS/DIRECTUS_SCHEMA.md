# Directus Schema Documentation

This document maps the current Astro Content Collections to Directus CMS collections, including field definitions, relationships, and role-based permissions.

---

## Overview

**Purpose**: Define the complete Directus database schema for the Haringey Baháʼí Community website.

**Migration Strategy**: Phase 2 will gradually replace file-based Content Collections with Directus API calls while maintaining backward compatibility.

**Collections Summary**:
- `prayers` - Prayer texts with categorization
- `events` - Community calendar events
- `writings` - Sacred writings and texts
- `resources` - Downloadable materials (PDFs, audio, video)
- `news` - Blog posts and community news
- `pages` - Static page content (About, Community, etc.)
- `people` - Community members and roles
- `devotional_programs` - Devotional gathering programs
- `site_settings` - Global site configuration

---

## Collection Schemas

### 1. Prayers Collection

**Collection Name**: `prayers`

**Description**: Sacred prayers from Baháʼí writings, searchable and categorizable.

**Current Content Collection**: `src/content/prayers/*.md`

**Fields**:

| Field Name | Type | Interface | Required | Notes |
|------------|------|-----------|----------|-------|
| `id` | UUID | Primary Key | Auto | Auto-generated |
| `status` | String | Select Dropdown | Yes | draft, published, archived |
| `sort` | Integer | Input | No | Manual sorting order |
| `date_created` | Timestamp | Datetime | Auto | Auto-populated |
| `date_updated` | Timestamp | Datetime | Auto | Auto-populated |
| `user_created` | UUID | User (M2O) | Auto | References directus_users |
| `user_updated` | UUID | User (M2O) | Auto | References directus_users |
| `title` | String | Input | Yes | Prayer title (e.g., "Prayer for Humanity") |
| `author` | String | Input | Yes | Author name (e.g., "Baháʼu'lláh", "ʻAbdu'l-Bahá") |
| `category` | String | Select Dropdown | Yes | General, Morning, Evening, Healing, Children, Departed, Unity, Assistance |
| `text` | Text | WYSIWYG (Markdown) | Yes | Full prayer text in Markdown format |
| `tags` | JSON | Tags | No | Array of strings for filtering (e.g., ["peace", "unity"]) |
| `language` | String | Language Select | Yes | Default: "en" (English) |
| `translation_of` | UUID | M2O Relation | No | Self-referencing for translations |

**Indexes**:
- `title` (text search)
- `category` (filtering)
- `status` (published queries)

**Migration Notes**:
- Current markdown files have frontmatter + body content
- Body content maps to `text` field
- Frontmatter maps directly to fields

**Example Directus Item**:
```json
{
  "id": "uuid-here",
  "status": "published",
  "title": "Prayer for Humanity",
  "author": "Baháʼu'lláh",
  "category": "General",
  "text": "O Thou kind Lord! Thou hast created all humanity...",
  "tags": ["unity", "peace", "humanity"],
  "language": "en"
}
```

---

### 2. Events Collection

**Collection Name**: `events`

**Description**: Community calendar events with date/time and registration info.

**Current Content Collection**: `src/content/events/*.json`

**Fields**:

| Field Name | Type | Interface | Required | Notes |
|------------|------|-----------|----------|-------|
| `id` | UUID | Primary Key | Auto | Auto-generated |
| `status` | String | Select Dropdown | Yes | draft, published, cancelled, completed |
| `sort` | Integer | Input | No | Manual sorting order |
| `date_created` | Timestamp | Datetime | Auto | Auto-populated |
| `date_updated` | Timestamp | Datetime | Auto | Auto-populated |
| `user_created` | UUID | User (M2O) | Auto | References directus_users |
| `user_updated` | UUID | User (M2O) | Auto | References directus_users |
| `title` | String | Input | Yes | Event title (e.g., "Nineteen-Day Feast — Devotional") |
| `description` | Text | Textarea/Markdown | Yes | Event description (supports Markdown) |
| `start_datetime` | Timestamp | Datetime | Yes | ISO 8601 format with timezone |
| `end_datetime` | Timestamp | Datetime | Yes | ISO 8601 format with timezone |
| `location` | String | Input | Yes | Physical location or "Online" |
| `is_public` | Boolean | Toggle | Yes | Default: true. Public events shown to all visitors |
| `registration_link` | String | Input | No | External registration URL (optional) |
| `calendar_uid` | String | Input | No | iCal UID for calendar exports |
| `image` | UUID | File (M2O) | No | Featured image for event |
| `category` | String | Select Dropdown | No | Devotional, Study, Children, Youth, Social, Interfaith |

**Indexes**:
- `start_datetime` (chronological sorting)
- `status` + `is_public` (filtering published public events)

**Migration Notes**:
- Current JSON files map directly to fields
- `startDateTime` → `start_datetime`
- `endDateTime` → `end_datetime`
- `isPublic` → `is_public`
- `registrationLink` → `registration_link`

**Example Directus Item**:
```json
{
  "id": "uuid-here",
  "status": "published",
  "title": "Nineteen-Day Feast — Devotional",
  "description": "A community devotional gathering for all ages.",
  "start_datetime": "2025-11-02T19:00:00+00:00",
  "end_datetime": "2025-11-02T20:30:00+00:00",
  "location": "Community Centre, Main St.",
  "is_public": true,
  "category": "Devotional"
}
```

---

### 3. Writings Collection

**Collection Name**: `writings`

**Description**: Sacred writings and texts from Baháʼí literature.

**Current Content Collection**: `src/content/writings/*.json`

**Fields**:

| Field Name | Type | Interface | Required | Notes |
|------------|------|-----------|----------|-------|
| `id` | UUID | Primary Key | Auto | Auto-generated |
| `status` | String | Select Dropdown | Yes | draft, published, archived |
| `sort` | Integer | Input | No | Manual sorting order |
| `date_created` | Timestamp | Datetime | Auto | Auto-populated |
| `date_updated` | Timestamp | Datetime | Auto | Auto-populated |
| `user_created` | UUID | User (M2O) | Auto | References directus_users |
| `user_updated` | UUID | User (M2O) | Auto | References directus_users |
| `title` | String | Input | Yes | Full title (e.g., "The Hidden Words") |
| `short_title` | String | Input | Yes | Abbreviated title (e.g., "Hidden Words") |
| `author` | String | Input | Yes | Author name (e.g., "Baháʼu'lláh") |
| `category` | String | Select Dropdown | Yes | Scripture, Compilation, Commentary, Historical |
| `excerpt` | Text | Textarea | Yes | Brief introduction or summary |
| `text` | Text | WYSIWYG (Markdown) | No | Full text content (optional - may link externally) |
| `tags` | JSON | Tags | No | Array of strings (e.g., ["scripture", "wisdom"]) |
| `language` | String | Language Select | Yes | Default: "en" |
| `translation_of` | UUID | M2O Relation | No | Self-referencing for translations |
| `external_link` | String | Input | No | Link to official Baháʼí reference library |

**Indexes**:
- `title` (text search)
- `category` (filtering)
- `status` (published queries)

**Migration Notes**:
- Current JSON files have metadata only (no full text)
- Map `shortTitle` → `short_title`

**Example Directus Item**:
```json
{
  "id": "uuid-here",
  "status": "published",
  "title": "The Hidden Words",
  "short_title": "Hidden Words",
  "author": "Baháʼu'lláh",
  "category": "Scripture",
  "excerpt": "This is that which hath descended from the realm of glory...",
  "tags": ["scripture", "wisdom", "guidance"],
  "language": "en"
}
```

---

### 4. Resources Collection

**Collection Name**: `resources`

**Description**: Downloadable files (PDFs, audio, video) for study and teaching.

**Current Content Collection**: `src/content/resources/*.json`

**Fields**:

| Field Name | Type | Interface | Required | Notes |
|------------|------|-----------|----------|-------|
| `id` | UUID | Primary Key | Auto | Auto-generated |
| `status` | String | Select Dropdown | Yes | draft, published, archived |
| `sort` | Integer | Input | No | Manual sorting order |
| `date_created` | Timestamp | Datetime | Auto | Auto-populated |
| `date_updated` | Timestamp | Datetime | Auto | Auto-populated |
| `user_created` | UUID | User (M2O) | Auto | References directus_users |
| `user_updated` | UUID | User (M2O) | Auto | References directus_users |
| `title` | String | Input | Yes | Resource title (e.g., "Ruhi Book 1: Reflections on the Life of the Spirit") |
| `type` | String | Select Dropdown | Yes | pdf, audio, video, link |
| `description` | Text | Textarea | Yes | Brief description of the resource |
| `file` | UUID | File (M2O) | No | References directus_files (uploaded file) |
| `file_url` | String | Input | No | External URL if not uploaded to Directus |
| `tags` | JSON | Tags | No | Array of strings (e.g., ["study", "ruhi"]) |
| `category` | String | Select Dropdown | Yes | Study Materials, Audio, Video, Teaching Materials |
| `language` | String | Language Select | Yes | Default: "en" |

**Indexes**:
- `title` (text search)
- `type` + `category` (filtering)
- `status` (published queries)

**Migration Notes**:
- Current JSON files have `fileUrl` pointing to "#" (dummy data)
- Map `fileUrl` → `file_url` for external links
- Use `file` field for uploaded files in Directus

**Example Directus Item**:
```json
{
  "id": "uuid-here",
  "status": "published",
  "title": "Ruhi Book 1: Reflections on the Life of the Spirit",
  "type": "pdf",
  "description": "A training course that explores the spiritual nature...",
  "file": "file-uuid-here",
  "tags": ["study", "ruhi", "spiritual development"],
  "category": "Study Materials",
  "language": "en"
}
```

---

### 5. News Collection

**Collection Name**: `news`

**Description**: Blog posts and community news articles.

**Current Content Collection**: `src/content/news/*.md` (currently empty)

**Fields**:

| Field Name | Type | Interface | Required | Notes |
|------------|------|-----------|----------|-------|
| `id` | UUID | Primary Key | Auto | Auto-generated |
| `status` | String | Select Dropdown | Yes | draft, published, archived |
| `sort` | Integer | Input | No | Manual sorting order |
| `date_created` | Timestamp | Datetime | Auto | Auto-populated |
| `date_updated` | Timestamp | Datetime | Auto | Auto-populated |
| `user_created` | UUID | User (M2O) | Auto | References directus_users |
| `user_updated` | UUID | User (M2O) | Auto | References directus_users |
| `title` | String | Input | Yes | Article title |
| `slug` | String | Input | Yes | URL-friendly slug (auto-generated from title) |
| `date` | Date | Date Picker | Yes | Publication date (display date) |
| `excerpt` | Text | Textarea | Yes | Brief summary for listings |
| `content` | Text | WYSIWYG (Markdown) | Yes | Full article content in Markdown |
| `image` | UUID | File (M2O) | No | Featured image |
| `category` | String | Select Dropdown | Yes | News, Event Recap, Community Update, Announcement |
| `author` | UUID | User (M2O) | No | References people collection or directus_users |

**Indexes**:
- `date` (reverse chronological sorting)
- `status` + `date` (published articles)
- `slug` (unique, URL routing)

**Migration Notes**:
- Schema defined but no current content to migrate

**Example Directus Item**:
```json
{
  "id": "uuid-here",
  "status": "published",
  "title": "Successful Community Gathering",
  "slug": "successful-community-gathering",
  "date": "2025-10-20",
  "excerpt": "Over 50 community members attended...",
  "content": "# Successful Community Gathering\n\nOver 50 community members...",
  "category": "Event Recap"
}
```

---

### 6. Pages Collection

**Collection Name**: `pages`

**Description**: Static page content (About, Community Life, Contact, etc.).

**Current Implementation**: Astro pages in `src/pages/*.astro` with hardcoded content

**Fields**:

| Field Name | Type | Interface | Required | Notes |
|------------|------|-----------|----------|-------|
| `id` | UUID | Primary Key | Auto | Auto-generated |
| `status` | String | Select Dropdown | Yes | draft, published, archived |
| `sort` | Integer | Input | No | Manual sorting order |
| `date_created` | Timestamp | Datetime | Auto | Auto-populated |
| `date_updated` | Timestamp | Datetime | Auto | Auto-populated |
| `user_created` | UUID | User (M2O) | Auto | References directus_users |
| `user_updated` | UUID | User (M2O) | Auto | References directus_users |
| `slug` | String | Input | Yes | URL slug (e.g., "about", "community") |
| `title` | String | Input | Yes | Page title |
| `summary` | Text | Textarea | No | Brief page summary |
| `content_markdown` | Text | WYSIWYG (Markdown) | Yes | Full page content in Markdown |
| `hero_image` | UUID | File (M2O) | No | Header image |
| `seo_title` | String | Input | No | Override page title for SEO |
| `seo_description` | String | Textarea | No | Meta description for SEO |
| `language` | String | Language Select | Yes | Default: "en" |
| `translation_of` | UUID | M2O Relation | No | Self-referencing for translations |

**Indexes**:
- `slug` (unique, URL routing)
- `status` + `language` (published pages by language)

**Migration Notes**:
- Current pages are static Astro components
- Phase 2 will convert to dynamic routes fetching from Directus
- Start with 1-2 pages (e.g., About, Contact)

**Example Directus Item**:
```json
{
  "id": "uuid-here",
  "status": "published",
  "slug": "about",
  "title": "About the Baháʼí Faith",
  "content_markdown": "# About the Baháʼí Faith\n\nThe Baháʼí Faith is...",
  "seo_title": "About the Baháʼí Faith - Haringey Community",
  "seo_description": "Learn about the Baháʼí Faith and its teachings.",
  "language": "en"
}
```

---

### 7. People Collection

**Collection Name**: `people`

**Description**: Community members, teachers, and administrators (for author attribution).

**Current Implementation**: Not yet implemented

**Fields**:

| Field Name | Type | Interface | Required | Notes |
|------------|------|-----------|----------|-------|
| `id` | UUID | Primary Key | Auto | Auto-generated |
| `status` | String | Select Dropdown | Yes | active, inactive |
| `date_created` | Timestamp | Datetime | Auto | Auto-populated |
| `date_updated` | Timestamp | Datetime | Auto | Auto-populated |
| `name` | String | Input | Yes | Full name |
| `role` | String | Input | No | Role/title (e.g., "Community Teacher") |
| `bio` | Text | Textarea | No | Brief biography |
| `photo` | UUID | File (M2O) | No | Profile photo |
| `email` | String | Input | No | Contact email (not public) |

**Indexes**:
- `name` (alphabetical sorting)

**Migration Notes**:
- New collection for Phase 2
- Can be used for news article authors, event coordinators

---

### 8. Devotional Programs Collection

**Collection Name**: `devotional_programs`

**Description**: Devotional gathering programs with readings and media.

**Current Implementation**: Not yet implemented

**Fields**:

| Field Name | Type | Interface | Required | Notes |
|------------|------|-----------|----------|-------|
| `id` | UUID | Primary Key | Auto | Auto-generated |
| `status` | String | Select Dropdown | Yes | draft, published, archived |
| `date_created` | Timestamp | Datetime | Auto | Auto-populated |
| `date_updated` | Timestamp | Datetime | Auto | Auto-populated |
| `user_created` | UUID | User (M2O) | Auto | References directus_users |
| `user_updated` | UUID | User (M2O) | Auto | References directus_users |
| `title` | String | Input | Yes | Program title |
| `readings` | Text | Textarea (Markdown) | No | Readings text or references |
| `video_link` | String | Input | No | YouTube/Vimeo link |
| `audio_file` | UUID | File (M2O) | No | Uploaded audio file |
| `date` | Date | Date Picker | No | Date this program was/will be used |

**Migration Notes**:
- New collection for Phase 2
- Supports devotional gathering planning

---

### 9. Site Settings Collection

**Collection Name**: `site_settings`

**Description**: Global site configuration (singleton collection).

**Current Implementation**: Hardcoded in BaseLayout.astro

**Fields**:

| Field Name | Type | Interface | Required | Notes |
|------------|------|-----------|----------|-------|
| `id` | Integer | Primary Key | Auto | Always 1 (singleton) |
| `site_name` | String | Input | Yes | "Haringey Baháʼí Community" |
| `site_description` | Text | Textarea | Yes | Default meta description |
| `default_locale` | String | Language Select | Yes | Default: "en" |
| `contact_email` | String | Input | No | General contact email |
| `social_links` | JSON | Repeater | No | Array of {platform, url} objects |
| `analytics_id` | String | Input | No | Plausible/Fathom analytics ID |
| `logo` | UUID | File (M2O) | No | Site logo image |

**Migration Notes**:
- Singleton collection (only one record)
- Replaces hardcoded values in BaseLayout

---

## Role-Based Permissions

Directus has built-in user roles. Configure these three roles:

### 1. Editor Role

**Permissions**:

| Collection | Create | Read | Update | Delete | Notes |
|------------|--------|------|--------|--------|-------|
| `prayers` | ✅ | ✅ | ✅ (own) | ❌ | Can only update own drafts |
| `events` | ✅ | ✅ | ✅ (own) | ❌ | Can only update own drafts |
| `writings` | ✅ | ✅ | ✅ (own) | ❌ | Can only update own drafts |
| `resources` | ✅ | ✅ | ✅ (own) | ❌ | Can only update own drafts |
| `news` | ✅ | ✅ | ✅ (own) | ❌ | Can only update own drafts |
| `pages` | ❌ | ✅ | ✅ (draft only) | ❌ | Can suggest edits, not publish |
| `people` | ❌ | ✅ | ❌ | ❌ | Read-only |
| `devotional_programs` | ✅ | ✅ | ✅ (own) | ❌ | Can only update own drafts |
| `site_settings` | ❌ | ✅ | ❌ | ❌ | Read-only |

**Rules**:
- Can create content but must submit for review (status: draft)
- Cannot change status to "published"
- Cannot delete any content
- Cannot modify user roles

### 2. Reviewer Role

**Permissions**:

| Collection | Create | Read | Update | Delete | Notes |
|------------|--------|------|--------|--------|-------|
| `prayers` | ✅ | ✅ | ✅ | ✅ | Full access |
| `events` | ✅ | ✅ | ✅ | ✅ | Full access |
| `writings` | ✅ | ✅ | ✅ | ✅ | Full access |
| `resources` | ✅ | ✅ | ✅ | ✅ | Full access |
| `news` | ✅ | ✅ | ✅ | ✅ | Full access |
| `pages` | ✅ | ✅ | ✅ | ✅ | Full access |
| `people` | ✅ | ✅ | ✅ | ✅ | Full access |
| `devotional_programs` | ✅ | ✅ | ✅ | ✅ | Full access |
| `site_settings` | ❌ | ✅ | ✅ | ❌ | Can edit but not delete |

**Rules**:
- Can publish content (change status to "published")
- Can review and edit all content
- Can delete content
- Cannot modify user roles or site settings structure

### 3. Administrator Role

**Permissions**:
- Full access to all collections
- User management (create/edit/delete users)
- Role management
- System settings
- Database backup/restore

---

## Relationships & Associations

### Translation Relationships

Many collections support translations via self-referencing `translation_of` field:

```
prayers
├── prayer_id_1 (en)
│   └── translation_of: null
└── prayer_id_2 (es)
    └── translation_of: prayer_id_1
```

**Implementation**:
- `translation_of` field is UUID M2O relation to same collection
- Filter by `language` to get specific language versions
- Use `translation_of IS NULL` to get original versions

### Author Attribution

Use Many-to-One relationships:

```
news.author → people.id
events.coordinator → people.id
```

**Implementation**:
- Add `coordinator` field to events collection (UUID M2O → people)
- Add `author` field to news collection (UUID M2O → people)

---

## Migration Strategy

### Phase 2 Migration Steps

1. **Create All Collections in Directus**
   - Set up field types, validation, defaults
   - Configure relationships
   - Add sample data for testing

2. **Import Current Content**
   - Write migration scripts to import from content collections
   - Maintain file slugs/IDs for URL compatibility
   - Verify data integrity

3. **Update API Client**
   - Create `src/lib/directus.ts` with helper functions
   - Implement caching strategy
   - Handle errors gracefully

4. **Migrate Pages Gradually**
   - Start with simple content: prayers, events
   - Then news, writings, resources
   - Finally pages (more complex)

5. **Set Up Webhooks**
   - Directus → Vercel rebuild on publish
   - Test rebuild triggers

6. **Testing & Validation**
   - Compare old vs new pages
   - Test search functionality
   - Verify performance

---

## API Client Structure

**File**: `src/lib/directus.ts`

**Functions to implement**:

```typescript
// Initialize Directus client
export const directus = createDirectus(DIRECTUS_URL)
  .with(rest());

// Fetch all items from a collection
export async function getItems<T>(collection: string, params?: QueryParams): Promise<T[]>

// Fetch a single item by ID
export async function getItem<T>(collection: string, id: string): Promise<T>

// Fetch a single item by slug
export async function getItemBySlug<T>(collection: string, slug: string): Promise<T>

// Fetch published items only
export async function getPublishedItems<T>(collection: string): Promise<T[]>

// Fetch items by category/tag
export async function getItemsByCategory<T>(collection: string, category: string): Promise<T[]>
```

---

## Environment Variables

**File**: `.env` (local development)

```env
# Directus Configuration
PUBLIC_DIRECTUS_URL=https://your-directus-instance.render.com
DIRECTUS_TOKEN=your-static-api-token-here

# Optional: Admin token for build-time operations
DIRECTUS_ADMIN_TOKEN=your-admin-token-here
```

**File**: `.env.example` (committed to repo)

```env
# Directus Configuration
PUBLIC_DIRECTUS_URL=https://your-directus-instance.render.com
DIRECTUS_TOKEN=your-static-api-token-here
```

**Vercel Environment Variables**:
- Add same variables in Vercel dashboard
- Mark `PUBLIC_DIRECTUS_URL` as exposed to browser
- Keep `DIRECTUS_TOKEN` server-only

---

## Testing Checklist

After CMS integration:

- [ ] All prayers display correctly with proper formatting
- [ ] Events calendar shows upcoming events chronologically
- [ ] Event detail pages work with dynamic routing
- [ ] Prayer detail pages work with dynamic routing
- [ ] Search finds content across all collections
- [ ] Markdown content renders with proper styling
- [ ] Images load correctly from Directus
- [ ] File downloads work (PDFs, audio)
- [ ] Build completes successfully (no API errors)
- [ ] Content publish in Directus triggers Vercel rebuild
- [ ] Role permissions work as expected (Editor, Reviewer, Admin)
- [ ] Multilingual content structure works (translations)

---

## Next Steps

1. ✅ **This document created** - Schema mapping complete
2. ⏳ **Set up Neon database** (requires user signup)
3. ⏳ **Deploy Directus on Render** (requires user signup)
4. 🔜 **Configure Directus collections** using this schema
5. 🔜 **Create API client** (`src/lib/directus.ts`)
6. 🔜 **Migrate first page** (prayers or events)
7. 🔜 **Test and iterate**

---

## References

- [Directus Documentation](https://docs.directus.io/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Directus REST API](https://docs.directus.io/reference/introduction.html)
- Project Brief: `/Brief/Brief.md`
- Content Structure: `/CONTENT_STRUCTURE.md`
- Deployment Guide: `/DEPLOYMENT.md`

---

**Last Updated**: 2025-10-25 (Phase 2 Start)
