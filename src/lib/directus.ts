/**
 * Directus CMS API Client
 *
 * This module provides helper functions to fetch content from Directus CMS.
 *
 * Usage:
 * import { getPublishedItems, getItemBySlug } from '@/lib/directus';
 *
 * const prayers = await getPublishedItems('prayers');
 * const event = await getItemBySlug('events', 'nineteen-day-feast');
 */

import { createDirectus, rest, readItems, readItem, staticToken } from '@directus/sdk';

// Environment variables
const DIRECTUS_URL = import.meta.env.PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = import.meta.env.DIRECTUS_TOKEN;

if (!DIRECTUS_URL) {
  throw new Error('PUBLIC_DIRECTUS_URL environment variable is not set');
}

if (!DIRECTUS_TOKEN) {
  throw new Error('DIRECTUS_TOKEN environment variable is not set');
}

/**
 * Initialize Directus client
 */
export const directus = createDirectus(DIRECTUS_URL)
  .with(rest())
  .with(staticToken(DIRECTUS_TOKEN));

/**
 * Type definitions for Directus collections
 * These match the schema defined in DIRECTUS_SCHEMA.md
 */

export interface Prayer {
  id: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  category: string;
  text: string;
  tags?: string[];
  language: string;
  translation_of?: string;
  date_created: string;
  date_updated: string;
}

export interface Event {
  id: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  title: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
  location: string;
  is_public: boolean;
  registration_link?: string;
  category?: string;
  image?: string;
  is_recurring: boolean;
  recurrence_pattern?: 'weekly' | 'monthly';
  days_of_week?: string[];
  week_of_month?: 'First' | 'Second' | 'Third' | 'Fourth' | 'Last';
  date_created: string;
  date_updated: string;
}

/**
 * Expanded event occurrence with calculated date
 * Used for displaying individual occurrences of recurring events
 */
export interface EventOccurrence {
  event: Event;
  occurrence_date: Date;
  display_date: string;
}

export interface Writing {
  id: string;
  status: 'draft' | 'published' | 'archived';
  title: string;
  short_title: string;
  author: string;
  category: string;
  excerpt: string;
  text?: string;
  tags?: string[];
  language: string;
  translation_of?: string;
  external_link?: string;
  date_created: string;
  date_updated: string;
}

export interface Resource {
  id: number;
  status: 'draft' | 'published' | 'archived';
  title: string;
  type: 'pdf' | 'audio' | 'video' | 'link';
  description: string;
  file?: string;
  resource_url?: string;
  tags?: string[];
  category: string;
  author?: string;
  language: string;
  date_created: string;
  date_updated: string;
}

export interface NewsArticle {
  id: string;
  status: 'draft' | 'published' | 'archived';
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  author?: string;
  date_created: string;
  date_updated: string;
}

export interface Page {
  id: string;
  status: 'draft' | 'published' | 'archived';
  slug: string;
  title: string;
  summary?: string;
  content_markdown: string;
  hero_image?: string;
  seo_title?: string;
  seo_description?: string;
  language: string;
  translation_of?: string;
  date_created: string;
  date_updated: string;
}

/**
 * Generate a snippet from prayer text for use as a display title
 * Takes the first few words (up to maxWords) from the prayer text
 *
 * @param text - The full prayer text
 * @param maxWords - Maximum number of words to include (default: 8)
 * @returns Snippet ending with "..." if truncated
 */
export function getPrayerSnippet(text: string, maxWords: number = 8): string {
  if (!text) return '';

  // Remove markdown formatting and extra whitespace
  const cleanText = text
    .replace(/[*_~`#]/g, '')  // Remove markdown chars
    .replace(/\s+/g, ' ')      // Normalize whitespace
    .trim();

  const words = cleanText.split(' ');

  if (words.length <= maxWords) {
    return cleanText;
  }

  return words.slice(0, maxWords).join(' ') + '...';
}

/**
 * Query parameters for filtering and sorting
 */
export interface QueryParams {
  filter?: Record<string, any>;
  sort?: string[];
  limit?: number;
  offset?: number;
  fields?: string[];
}

/**
 * Fetch all items from a collection
 *
 * @param collection - Collection name (e.g., 'prayers', 'events')
 * @param params - Optional query parameters for filtering, sorting, pagination
 * @returns Array of items
 *
 * Example:
 * const prayers = await getItems<Prayer>('prayers', {
 *   filter: { status: { _eq: 'published' } },
 *   sort: ['author']
 * });
 */
export async function getItems<T>(
  collection: string,
  params?: QueryParams
): Promise<T[]> {
  try {
    // Build query object with only defined parameters
    const query: any = {};
    if (params?.filter) query.filter = params.filter;
    if (params?.sort) query.sort = params.sort;
    if (params?.limit !== undefined) query.limit = params.limit;
    if (params?.offset !== undefined) query.offset = params.offset;
    if (params?.fields) query.fields = params.fields;

    const result = await directus.request(readItems(collection, query));
    return result as T[];
  } catch (error) {
    console.error(`Error fetching items from ${collection}:`, error);
    throw error;
  }
}

/**
 * Fetch a single item by ID
 *
 * @param collection - Collection name
 * @param id - Item ID
 * @returns Single item
 *
 * Example:
 * const prayer = await getItem<Prayer>('prayers', 'uuid-here');
 */
export async function getItem<T>(
  collection: string,
  id: string
): Promise<T> {
  try {
    const result = await directus.request(readItem(collection, id));
    return result as T;
  } catch (error) {
    console.error(`Error fetching item ${id} from ${collection}:`, error);
    throw error;
  }
}

/**
 * Fetch a single item by slug
 *
 * @param collection - Collection name
 * @param slug - Item slug
 * @returns Single item
 *
 * Example:
 * const page = await getItemBySlug<Page>('pages', 'about');
 */
export async function getItemBySlug<T>(
  collection: string,
  slug: string
): Promise<T | null> {
  try {
    const items = await directus.request(
      readItems(collection, {
        filter: { slug: { _eq: slug } },
        limit: 1,
      })
    );
    return (items[0] as T) || null;
  } catch (error) {
    console.error(`Error fetching item by slug ${slug} from ${collection}:`, error);
    return null;
  }
}

/**
 * Fetch only published items
 *
 * @param collection - Collection name
 * @param params - Optional additional query parameters
 * @returns Array of published items
 *
 * Example:
 * const events = await getPublishedItems<Event>('events');
 */
export async function getPublishedItems<T>(
  collection: string,
  params?: QueryParams
): Promise<T[]> {
  return await getItems<T>(collection, {
    ...params,
    filter: {
      ...params?.filter,
      status: { _eq: 'published' },
    },
  });
}

/**
 * Fetch items by category
 *
 * @param collection - Collection name
 * @param category - Category value
 * @returns Array of items in that category
 *
 * Example:
 * const generalPrayers = await getItemsByCategory<Prayer>('prayers', 'General');
 */
export async function getItemsByCategory<T>(
  collection: string,
  category: string
): Promise<T[]> {
  return await getItems<T>(collection, {
    filter: {
      status: { _eq: 'published' },
      category: { _eq: category },
    },
  });
}

/**
 * Fetch items by tag
 *
 * @param collection - Collection name
 * @param tag - Tag to filter by
 * @returns Array of items with that tag
 *
 * Example:
 * const unityPrayers = await getItemsByTag<Prayer>('prayers', 'unity');
 */
export async function getItemsByTag<T>(
  collection: string,
  tag: string
): Promise<T[]> {
  return await getItems<T>(collection, {
    filter: {
      status: { _eq: 'published' },
      tags: { _contains: tag },
    },
  });
}

/**
 * Fetch upcoming events (events that haven't ended yet)
 *
 * @returns Array of upcoming events sorted by start time
 *
 * Example:
 * const upcomingEvents = await getUpcomingEvents();
 */
export async function getUpcomingEvents(): Promise<Event[]> {
  const now = new Date().toISOString();
  return await getItems<Event>('events', {
    filter: {
      status: { _eq: 'published' },
      is_public: { _eq: true },
      end_datetime: { _gte: now },
    },
    sort: ['start_datetime'],
  });
}

/**
 * Helper function to get asset URL from Directus
 *
 * @param fileId - File ID from Directus
 * @returns Full URL to the asset
 *
 * Example:
 * const imageUrl = getAssetUrl(event.image);
 */
export function getAssetUrl(fileId: string | undefined): string | undefined {
  if (!fileId) return undefined;
  return `${DIRECTUS_URL}/assets/${fileId}`;
}

/**
 * Helper function to generate display title for prayers
 * Since prayers don't traditionally have titles, we create one for display purposes
 *
 * @param prayer - Prayer object
 * @returns Display title string
 *
 * Example:
 * const title = getPrayerDisplayTitle(prayer); // "Prayer by Baháʼu'lláh"
 */
export function getPrayerDisplayTitle(prayer: Prayer): string {
  return `Prayer by ${prayer.author}`;
}

/**
 * Helper function to get prayer excerpt (first line or first N characters)
 *
 * @param text - Full prayer text
 * @param maxLength - Maximum length of excerpt (default 100)
 * @returns Excerpt string
 *
 * Example:
 * const excerpt = getPrayerExcerpt(prayer.text, 150);
 */
export function getPrayerExcerpt(text: string, maxLength: number = 100): string {
  // Remove HTML tags if any
  const plainText = text.replace(/<[^>]*>/g, '');

  // Get first line or first N characters
  const firstLine = plainText.split('\n')[0];

  if (firstLine.length <= maxLength) {
    return firstLine;
  }

  return plainText.substring(0, maxLength).trim() + '...';
}

/**
 * Expand recurring events into individual occurrences
 *
 * @param events - Array of events from Directus
 * @param occurrenceCount - Number of occurrences per recurring event (default 5)
 * @returns Array of event occurrences, sorted by date
 *
 * Example:
 * const events = await getPublishedItems<Event>('events');
 * const occurrences = expandRecurringEvents(events, 3);
 */
export function expandRecurringEvents(
  events: Event[],
  occurrenceCount: number = 5
): EventOccurrence[] {
  // Import recurrence functions dynamically to avoid circular dependencies
  const occurrences: EventOccurrence[] = [];
  const now = new Date();

  for (const event of events) {
    if (event.is_recurring) {
      // Get next occurrences using recurrence logic
      // Import here to avoid issues
      import('./recurrence').then(({ getNextOccurrences, formatEventDate }) => {
        const dates = getNextOccurrences(event, occurrenceCount, now);

        for (const date of dates) {
          occurrences.push({
            event,
            occurrence_date: date,
            display_date: formatEventDate(date)
          });
        }
      });
    } else {
      // For non-recurring events, just add if it's in the future
      const eventDate = new Date(event.start_datetime);
      if (eventDate > now) {
        occurrences.push({
          event,
          occurrence_date: eventDate,
          display_date: eventDate.toLocaleString('en-GB', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })
        });
      }
    }
  }

  // Sort by occurrence date
  return occurrences.sort((a, b) => a.occurrence_date.getTime() - b.occurrence_date.getTime());
}

/**
 * Synchronous version of expandRecurringEvents that doesn't use dynamic imports
 * Use this in Astro pages where you can import recurrence module at the top
 *
 * @param events - Array of events from Directus
 * @param getNextOccurrences - The getNextOccurrences function from recurrence module
 * @param formatEventDate - The formatEventDate function from recurrence module
 * @param occurrenceCount - Number of occurrences per recurring event (default 5)
 * @returns Array of event occurrences, sorted by date
 */
export function expandRecurringEventsSync(
  events: Event[],
  getNextOccurrences: (event: Event, count: number, fromDate: Date) => Date[],
  formatEventDate: (date: Date) => string,
  occurrenceCount: number = 5
): EventOccurrence[] {
  const occurrences: EventOccurrence[] = [];
  const now = new Date();

  for (const event of events) {
    if (event.is_recurring) {
      const dates = getNextOccurrences(event, occurrenceCount, now);

      for (const date of dates) {
        occurrences.push({
          event,
          occurrence_date: date,
          display_date: formatEventDate(date)
        });
      }
    } else {
      // For non-recurring events, just add if it's in the future
      const eventDate = new Date(event.start_datetime);
      if (eventDate > now) {
        occurrences.push({
          event,
          occurrence_date: eventDate,
          display_date: eventDate.toLocaleString('en-GB', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })
        });
      }
    }
  }

  // Sort by occurrence date
  return occurrences.sort((a, b) => a.occurrence_date.getTime() - b.occurrence_date.getTime());
}
