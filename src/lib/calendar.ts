/**
 * Calendar Export Utilities
 *
 * Functions to generate calendar URLs and ICS content for events.
 * Supports Google Calendar, Outlook, and universal ICS format.
 */

import type { Event, EventOccurrence } from './directus';

/**
 * Format date for Google Calendar URL (YYYYMMDDTHHmmssZ)
 */
function formatGoogleDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Format date for ICS file (YYYYMMDDTHHmmss)
 * Uses local time without Z suffix for floating time
 */
function formatIcsDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

/**
 * Escape text for ICS format
 * ICS requires escaping commas, semicolons, and newlines
 */
function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\n/g, '\\n');
}

/**
 * Calculate end date from occurrence start and event template duration
 */
function calculateEndDate(occurrence: EventOccurrence): Date {
  const { event, occurrence_date } = occurrence;
  const templateStart = new Date(event.start_datetime);
  const templateEnd = new Date(event.end_datetime);
  const durationMs = templateEnd.getTime() - templateStart.getTime();
  return new Date(occurrence_date.getTime() + durationMs);
}

/**
 * Generate Google Calendar URL for an event occurrence
 *
 * @param occurrence - Event occurrence with calculated date
 * @returns URL to add event to Google Calendar
 */
export function generateGoogleCalendarUrl(occurrence: EventOccurrence): string {
  const { event, occurrence_date } = occurrence;
  const endDate = calculateEndDate(occurrence);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatGoogleDate(occurrence_date)}/${formatGoogleDate(endDate)}`,
    location: event.location || '',
    details: event.description || '',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate Outlook.com calendar URL for an event occurrence
 *
 * @param occurrence - Event occurrence with calculated date
 * @returns URL to add event to Outlook calendar
 */
export function generateOutlookUrl(occurrence: EventOccurrence): string {
  const { event, occurrence_date } = occurrence;
  const endDate = calculateEndDate(occurrence);

  const params = new URLSearchParams({
    subject: event.title,
    startdt: occurrence_date.toISOString(),
    enddt: endDate.toISOString(),
    location: event.location || '',
    body: event.description || '',
    path: '/calendar/action/compose',
    rru: 'addevent',
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/**
 * Generate ICS content for a single event occurrence
 *
 * @param occurrence - Event occurrence with calculated date
 * @returns ICS file content string
 */
export function generateIcsContent(occurrence: EventOccurrence): string {
  const { event, occurrence_date } = occurrence;
  const endDate = calculateEndDate(occurrence);
  const uid = `${event.id}-${occurrence_date.getTime()}@haringeybahai.org.uk`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Haringey Bahai Community//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(occurrence_date)}`,
    `DTEND:${formatIcsDate(endDate)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.description || '')}`,
    `LOCATION:${escapeIcsText(event.location || '')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

/**
 * Generate ICS content for multiple event occurrences
 *
 * @param occurrences - Array of event occurrences
 * @returns ICS file content string with all events
 */
export function generateAllEventsIcs(occurrences: EventOccurrence[]): string {
  const events = occurrences.map((occurrence) => {
    const { event, occurrence_date } = occurrence;
    const endDate = calculateEndDate(occurrence);
    const uid = `${event.id}-${occurrence_date.getTime()}@haringeybahai.org.uk`;

    return [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(occurrence_date)}`,
      `DTEND:${formatIcsDate(endDate)}`,
      `SUMMARY:${escapeIcsText(event.title)}`,
      `DESCRIPTION:${escapeIcsText(event.description || '')}`,
      `LOCATION:${escapeIcsText(event.location || '')}`,
      'END:VEVENT',
    ].join('\r\n');
  });

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Haringey Bahai Community//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Haringey Bahai Community Events',
    ...events,
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

/**
 * Trigger download of ICS file in browser
 * Note: This function only works in browser context
 *
 * @param content - ICS file content
 * @param filename - Name for downloaded file
 */
export function downloadIcs(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate a sanitized filename from event title
 *
 * @param title - Event title
 * @returns Safe filename string
 */
export function generateFilename(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50) + '.ics';
}
