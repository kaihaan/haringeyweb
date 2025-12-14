/**
 * Debug normalization function
 */

import { createDirectus, rest, readItems, staticToken } from '@directus/sdk';
import 'dotenv/config';

const DIRECTUS_URL = process.env.PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

const directus = createDirectus(DIRECTUS_URL)
  .with(rest())
  .with(staticToken(DIRECTUS_TOKEN));

// Copy the normalization function to test it
function normalizeEventData(event) {
  console.log('\n🔍 BEFORE normalization:');
  console.log('  days_of_week:', JSON.stringify(event.days_of_week), `(type: ${typeof event.days_of_week})`);
  console.log('  week_of_month:', event.week_of_month);

  const normalized = { ...event };

  // Normalize days_of_week: ensure it's an array with capitalized days
  if (normalized.days_of_week) {
    console.log('\n📝 Processing days_of_week...');

    if (typeof normalized.days_of_week === 'string') {
      console.log('  → Converting string to array');
      normalized.days_of_week = [normalized.days_of_week];
    } else {
      console.log('  → Already an array');
    }

    console.log('  → Before capitalize:', JSON.stringify(normalized.days_of_week));

    // Capitalize each day
    normalized.days_of_week = normalized.days_of_week.map(day => {
      const result = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
      console.log(`    "${day}" → "${result}"`);
      return result;
    });

    console.log('  → After capitalize:', JSON.stringify(normalized.days_of_week));
  }

  // Normalize week_of_month: ensure it's capitalized
  if (normalized.week_of_month && typeof normalized.week_of_month === 'string') {
    console.log('\n📝 Processing week_of_month...');
    console.log('  → Before:', normalized.week_of_month);
    normalized.week_of_month = (normalized.week_of_month.charAt(0).toUpperCase() +
      normalized.week_of_month.slice(1).toLowerCase());
    console.log('  → After:', normalized.week_of_month);
  }

  console.log('\n✅ AFTER normalization:');
  console.log('  days_of_week:', JSON.stringify(normalized.days_of_week));
  console.log('  week_of_month:', normalized.week_of_month);

  return normalized;
}

try {
  const events = await directus.request(
    readItems('events', {
      filter: { status: { _eq: 'published' } }
    })
  );

  const event = events[0];
  console.log('Original event data from Directus:');
  console.log(JSON.stringify(event, null, 2));

  const normalized = normalizeEventData(event);

  console.log('\n\n=== Testing with DAYS_OF_WEEK constant ===');
  const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const dayOfWeek = normalized.days_of_week?.[0];
  console.log('Day to check:', dayOfWeek);
  console.log('Index in DAYS_OF_WEEK:', DAYS_OF_WEEK.indexOf(dayOfWeek));

  if (DAYS_OF_WEEK.indexOf(dayOfWeek) === -1) {
    console.log('❌ DAY NOT FOUND IN ARRAY! This is why no occurrences are generated.');
  } else {
    console.log('✅ Day found in array');
  }

} catch (error) {
  console.error('Error:', error);
}
