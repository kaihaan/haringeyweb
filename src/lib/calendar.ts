/**
 * Calendar Export Utilities
 *
 * Functions to generate calendar URLs and ICS content for events.
 * Supports Google Calendar, Outlook, and universal ICS format.
 */

import type { EventOccurrence } from './directus';

/**
 * Format date for Google Calendar URL (YYYYMMDDTHHmmssZ)
 */
function formatGoogleDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * The IANA timezone all community events are anchored to. Emitted as a TZID on
 * DTSTART/DTEND together with the VTIMEZONE block below, so subscribed calendars
 * render the correct local time regardless of the viewer's own timezone.
 */
const LONDON_TZID = 'Europe/London';

/**
 * VTIMEZONE definition for Europe/London (GMT ⇄ BST). Included once per calendar
 * so clients can resolve TZID=Europe/London without their own tz database quirks.
 * Transition rules: BST starts last Sunday of March, GMT resumes last Sunday of October.
 */
const VTIMEZONE_LONDON = [
  'BEGIN:VTIMEZONE',
  'TZID:Europe/London',
  'BEGIN:DAYLIGHT',
  'TZOFFSETFROM:+0000',
  'TZOFFSETTO:+0100',
  'TZNAME:BST',
  'DTSTART:19700329T010000',
  'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
  'END:DAYLIGHT',
  'BEGIN:STANDARD',
  'TZOFFSETFROM:+0100',
  'TZOFFSETTO:+0000',
  'TZNAME:GMT',
  'DTSTART:19701025T020000',
  'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
  'END:STANDARD',
  'END:VTIMEZONE',
].join('\r\n');

/**
 * Format a Date as an ICS local date-time (YYYYMMDDTHHmmss) expressed in the
 * Europe/London wall clock. Paired with `;TZID=Europe/London` on the property.
 *
 * Uses Intl to read the London wall-clock components so the output is correct no
 * matter what timezone the build/serverless host runs in (Vercel uses UTC).
 */
function formatIcsDateLondon(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: LONDON_TZID,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00';
  // Intl can emit '24' for midnight in some engines; normalise to '00'.
  const hour = get('hour') === '24' ? '00' : get('hour');
  return `${get('year')}${get('month')}${get('day')}T${hour}${get('minute')}${get('second')}`;
}

/**
 * Format a Date as a UTC ICS timestamp (YYYYMMDDTHHmmssZ). Used for DTSTAMP,
 * which must be in UTC per RFC 5545.
 */
function formatIcsUtc(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
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
 * Build the VEVENT lines for a single occurrence, anchored to Europe/London.
 * Cancelled events are marked STATUS:CANCELLED so subscribers see them struck
 * through / removed rather than silently disappearing.
 */
function buildVevent(occurrence: EventOccurrence): string {
  const { event, occurrence_date } = occurrence;
  const endDate = calculateEndDate(occurrence);
  const uid = `${event.id}-${occurrence_date.getTime()}@haringeybahai.org.uk`;

  const lines = [
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatIcsUtc(new Date())}`,
    `DTSTART;TZID=${LONDON_TZID}:${formatIcsDateLondon(occurrence_date)}`,
    `DTEND;TZID=${LONDON_TZID}:${formatIcsDateLondon(endDate)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.description || '')}`,
    `LOCATION:${escapeIcsText(event.location || '')}`,
  ];
  if (event.status === 'cancelled') {
    lines.push('STATUS:CANCELLED');
  }
  lines.push('END:VEVENT');
  return lines.join('\r\n');
}

/**
 * Generate ICS content for a single event occurrence (used for one-off downloads).
 *
 * @param occurrence - Event occurrence with calculated date
 * @returns ICS file content string
 */
export function generateIcsContent(occurrence: EventOccurrence): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Haringey Bahai Community//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    VTIMEZONE_LONDON,
    buildVevent(occurrence),
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

/**
 * Generate a subscribable ICS calendar containing many occurrences.
 *
 * Includes refresh hints (REFRESH-INTERVAL / X-PUBLISHED-TTL) so Google/Outlook/
 * Apple re-poll roughly twice a day, and a VTIMEZONE so times render correctly
 * in any viewer timezone.
 *
 * @param occurrences - Array of event occurrences
 * @param calName - Calendar display name shown in the user's calendar app
 * @returns ICS file content string with all events
 */
export function generateAllEventsIcs(
  occurrences: EventOccurrence[],
  calName: string = 'Haringey Baháʼí Community Events'
): string {
  const events = occurrences.map(buildVevent);

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Haringey Bahai Community//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeIcsText(calName)}`,
    `X-WR-TIMEZONE:${LONDON_TZID}`,
    'REFRESH-INTERVAL;VALUE=DURATION:PT12H',
    'X-PUBLISHED-TTL:PT12H',
    VTIMEZONE_LONDON,
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
