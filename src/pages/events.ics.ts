/**
 * Static ICS Calendar Feed
 *
 * Generates an ICS file containing all upcoming events.
 * Accessible at /events.ics
 * Can be used as a calendar subscription URL.
 */

import type { APIRoute } from 'astro';
import { getPublishedItems, expandRecurringEventsSync, type Event } from '../lib/directus';
import { getNextOccurrences, formatEventDate } from '../lib/recurrence';
import { generateAllEventsIcs } from '../lib/calendar';

export const GET: APIRoute = async () => {
  // Fetch all published events
  const events = await getPublishedItems<Event>('events');

  // Expand recurring events to show next 10 occurrences each
  const eventOccurrences = expandRecurringEventsSync(
    events,
    getNextOccurrences,
    formatEventDate,
    10
  );

  // Generate ICS content
  const icsContent = generateAllEventsIcs(eventOccurrences);

  return new Response(icsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="haringey-bahai-events.ics"',
    },
  });
};
