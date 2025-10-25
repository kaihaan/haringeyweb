/**
 * Recurrence Calculation Module
 *
 * Handles calculation of recurring event dates:
 * - Weekly recurring events (one or more days per week)
 * - Monthly recurring events (specific week + day of month)
 */

import type { Event } from './directus';

/**
 * Days of the week mapping
 */
const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Get the next occurrence of a recurring event
 *
 * @param event - The event to calculate occurrence for
 * @param fromDate - Calculate from this date (default: now)
 * @returns Next occurrence date, or null if no future occurrences
 */
export function getNextOccurrence(event: Event, fromDate: Date = new Date()): Date | null {
  const occurrences = getNextOccurrences(event, 1, fromDate);
  return occurrences.length > 0 ? occurrences[0] : null;
}

/**
 * Normalize event data to ensure correct format
 * Handles Directus returning strings instead of arrays, lowercase instead of capitalized
 */
function normalizeEventData(event: Event): Event {
  const normalized = { ...event };

  // Normalize days_of_week: ensure it's an array with capitalized days
  if (normalized.days_of_week) {
    if (typeof normalized.days_of_week === 'string') {
      // Convert string to array
      normalized.days_of_week = [normalized.days_of_week];
    }
    // Capitalize each day
    normalized.days_of_week = normalized.days_of_week.map(day =>
      day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()
    );
  }

  // Normalize week_of_month: ensure it's capitalized
  if (normalized.week_of_month) {
    // Convert array to string if needed (Directus might return as array)
    let weekValue = normalized.week_of_month;
    if (Array.isArray(weekValue)) {
      weekValue = weekValue[0];
    }
    if (typeof weekValue === 'string') {
      normalized.week_of_month = (weekValue.charAt(0).toUpperCase() +
        weekValue.slice(1).toLowerCase()) as 'First' | 'Second' | 'Third' | 'Fourth' | 'Last';
    }
  }

  return normalized;
}

/**
 * Get the next N occurrences of a recurring event
 *
 * @param event - The event to calculate occurrences for
 * @param count - Number of occurrences to return
 * @param fromDate - Calculate from this date (default: now)
 * @returns Array of occurrence dates, sorted chronologically
 */
export function getNextOccurrences(
  event: Event,
  count: number = 5,
  fromDate: Date = new Date()
): Date[] {
  // Normalize event data to handle various Directus field configurations
  const normalizedEvent = normalizeEventData(event);

  if (!normalizedEvent.is_recurring) {
    // For non-recurring events, just return the event date if it's in the future
    const eventDate = new Date(normalizedEvent.start_datetime);
    return eventDate > fromDate ? [eventDate] : [];
  }

  if (normalizedEvent.recurrence_pattern === 'weekly') {
    return getWeeklyOccurrences(normalizedEvent, count, fromDate);
  } else if (normalizedEvent.recurrence_pattern === 'monthly') {
    return getMonthlyOccurrences(normalizedEvent, count, fromDate);
  }

  return [];
}

/**
 * Calculate next N occurrences for weekly recurring events
 *
 * @param event - The weekly recurring event
 * @param count - Number of occurrences to return
 * @param fromDate - Calculate from this date
 * @returns Array of occurrence dates
 */
function getWeeklyOccurrences(event: Event, count: number, fromDate: Date): Date[] {
  const occurrences: Date[] = [];
  const daysOfWeek = event.days_of_week || [];

  if (daysOfWeek.length === 0) {
    return [];
  }

  // Get time from template
  const templateDate = new Date(event.start_datetime);
  const hours = templateDate.getHours();
  const minutes = templateDate.getMinutes();

  // Start from today
  let currentDate = new Date(fromDate);
  currentDate.setHours(0, 0, 0, 0);

  // Find next occurrences
  let weeksChecked = 0;
  const maxWeeks = Math.ceil(count / daysOfWeek.length) + 4; // Extra weeks for safety

  while (occurrences.length < count && weeksChecked < maxWeeks) {
    for (const dayName of daysOfWeek) {
      const targetDayIndex = DAYS_OF_WEEK.indexOf(dayName);
      if (targetDayIndex === -1) continue;

      // Find next occurrence of this day of week
      const daysUntilTarget = (targetDayIndex - currentDate.getDay() + 7) % 7;
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + daysUntilTarget);
      nextDate.setHours(hours, minutes, 0, 0);

      // Only add if it's in the future
      if (nextDate > fromDate) {
        occurrences.push(nextDate);
      }
    }

    // Move to next week
    currentDate.setDate(currentDate.getDate() + 7);
    weeksChecked++;
  }

  // Sort and limit
  return occurrences.sort((a, b) => a.getTime() - b.getTime()).slice(0, count);
}

/**
 * Calculate next N occurrences for monthly recurring events
 *
 * @param event - The monthly recurring event
 * @param count - Number of occurrences to return
 * @param fromDate - Calculate from this date
 * @returns Array of occurrence dates
 */
function getMonthlyOccurrences(event: Event, count: number, fromDate: Date): Date[] {
  const occurrences: Date[] = [];

  if (!event.week_of_month || !event.days_of_week || event.days_of_week.length === 0) {
    return [];
  }

  const weekOfMonth = event.week_of_month;
  const dayOfWeek = event.days_of_week[0]; // For monthly, use first day
  const dayIndex = DAYS_OF_WEEK.indexOf(dayOfWeek);

  if (dayIndex === -1) {
    return [];
  }

  // Get time from template
  const templateDate = new Date(event.start_datetime);
  const hours = templateDate.getHours();
  const minutes = templateDate.getMinutes();

  // Start from current month
  let currentDate = new Date(fromDate);
  currentDate.setDate(1); // Start of month
  currentDate.setHours(0, 0, 0, 0);

  // Check up to 24 months ahead
  for (let monthsAhead = 0; monthsAhead < 24 && occurrences.length < count; monthsAhead++) {
    const checkDate = new Date(currentDate);
    checkDate.setMonth(currentDate.getMonth() + monthsAhead);

    const occurrence = getWeekOfMonthDate(checkDate.getFullYear(), checkDate.getMonth(), weekOfMonth, dayIndex);

    if (occurrence) {
      occurrence.setHours(hours, minutes, 0, 0);

      // Only add if it's in the future
      if (occurrence > fromDate) {
        occurrences.push(occurrence);
      }
    }
  }

  return occurrences.slice(0, count);
}

/**
 * Get the date for a specific week and day of month
 *
 * @param year - The year
 * @param month - The month (0-indexed)
 * @param week - Which week ("First", "Second", "Third", "Fourth", "Last")
 * @param dayOfWeek - Day of week (0=Sunday, 6=Saturday)
 * @returns The calculated date, or null if invalid
 */
function getWeekOfMonthDate(
  year: number,
  month: number,
  week: 'First' | 'Second' | 'Third' | 'Fourth' | 'Last',
  dayOfWeek: number
): Date | null {
  if (week === 'Last') {
    // For "Last", start from the end of the month and work backwards
    const lastDay = new Date(year, month + 1, 0); // Last day of month
    const lastDayOfWeek = lastDay.getDay();

    // Calculate days to subtract to get to target day of week
    let daysBack = (lastDayOfWeek - dayOfWeek + 7) % 7;

    const result = new Date(lastDay);
    result.setDate(lastDay.getDate() - daysBack);

    return result;
  }

  // For First, Second, Third, Fourth
  const weekNumber = {
    'First': 1,
    'Second': 2,
    'Third': 3,
    'Fourth': 4
  }[week];

  if (!weekNumber) return null;

  // Start from first day of month
  const firstDay = new Date(year, month, 1);
  const firstDayOfWeek = firstDay.getDay();

  // Calculate how many days until target day of week in first week
  let daysToAdd = (dayOfWeek - firstDayOfWeek + 7) % 7;

  // Add weeks
  daysToAdd += (weekNumber - 1) * 7;

  const result = new Date(firstDay);
  result.setDate(1 + daysToAdd);

  // Verify we're still in the same month (important for 4th/5th week edge cases)
  if (result.getMonth() !== month) {
    return null;
  }

  return result;
}

/**
 * Format a recurring event's pattern as human-readable text
 *
 * @param event - The event
 * @returns Human-readable recurrence description
 *
 * Examples:
 * - "Every Wednesday"
 * - "Every Monday and Thursday"
 * - "First Sunday of each month"
 */
export function formatRecurrencePattern(event: Event): string {
  if (!event.is_recurring) {
    return '';
  }

  // Normalize event data first
  const normalizedEvent = normalizeEventData(event);

  if (normalizedEvent.recurrence_pattern === 'weekly') {
    const days = normalizedEvent.days_of_week || [];
    if (days.length === 0) return '';

    if (days.length === 1) {
      return `Every ${days[0]}`;
    } else if (days.length === 2) {
      return `Every ${days[0]} and ${days[1]}`;
    } else {
      const lastDay = days[days.length - 1];
      const otherDays = days.slice(0, -1).join(', ');
      return `Every ${otherDays}, and ${lastDay}`;
    }
  }

  if (normalizedEvent.recurrence_pattern === 'monthly') {
    const week = normalizedEvent.week_of_month;
    const day = normalizedEvent.days_of_week?.[0];

    if (!week || !day) return '';

    return `${week} ${day} of each month`;
  }

  return '';
}

/**
 * Format a date for display
 *
 * @param date - The date to format
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatEventDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }
): string {
  return date.toLocaleString('en-GB', options);
}

/**
 * Check if an event has future occurrences
 *
 * @param event - The event to check
 * @param fromDate - Check from this date (default: now)
 * @returns True if event has future occurrences
 */
export function hasUpcomingOccurrences(event: Event, fromDate: Date = new Date()): boolean {
  const next = getNextOccurrence(event, fromDate);
  return next !== null;
}
