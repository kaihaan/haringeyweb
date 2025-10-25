/**
 * Debug script to see what's happening during the build process
 */

import { createDirectus, rest, readItems, staticToken } from '@directus/sdk';
import { getNextOccurrences, formatEventDate } from './src/lib/recurrence.ts';
import 'dotenv/config';

console.log('=== Debugging Build Process ===\n');

const DIRECTUS_URL = process.env.PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

console.log('Environment Variables:');
console.log('PUBLIC_DIRECTUS_URL:', DIRECTUS_URL);
console.log('DIRECTUS_TOKEN:', DIRECTUS_TOKEN ? '✓ Set' : '✗ Missing');
console.log('');

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error('❌ Missing environment variables!');
  process.exit(1);
}

const directus = createDirectus(DIRECTUS_URL)
  .with(rest())
  .with(staticToken(DIRECTUS_TOKEN));

try {
  console.log('Fetching events from Directus...');
  const events = await directus.request(
    readItems('events', {
      filter: { status: { _eq: 'published' } }
    })
  );

  console.log(`Found ${events.length} published event(s):\n`);

  events.forEach((event, index) => {
    console.log(`${index + 1}. ${event.title}`);
    console.log(`   ID: ${event.id}`);
    console.log(`   Status: ${event.status}`);
    console.log(`   Is Public: ${event.is_public}`);
    console.log(`   Is Recurring: ${event.is_recurring}`);
    console.log(`   Pattern: ${event.recurrence_pattern}`);
    console.log(`   Days: ${JSON.stringify(event.days_of_week)}`);
    console.log(`   Week: ${event.week_of_month}`);
    console.log(`   Start: ${event.start_datetime}`);
    console.log('');
  });

  console.log('Testing recurrence calculation for each event...\n');

  events.forEach((event) => {
    console.log(`Event: ${event.title}`);
    console.log(`  Is Recurring: ${event.is_recurring}`);

    if (event.is_recurring) {
      const occurrences = getNextOccurrences(event, 5);
      console.log(`  Generated ${occurrences.length} occurrence(s):`);

      if (occurrences.length === 0) {
        console.log(`  ⚠️  WARNING: No occurrences! This event will not appear.`);
      } else {
        occurrences.slice(0, 3).forEach((date, i) => {
          console.log(`    ${i + 1}. ${formatEventDate(date)}`);
        });
      }
    } else {
      const eventDate = new Date(event.start_datetime);
      const now = new Date();
      if (eventDate > now) {
        console.log(`  Single event in future: ${formatEventDate(eventDate)}`);
      } else {
        console.log(`  ⚠️  Single event in past - will not appear`);
      }
    }
    console.log('');
  });

} catch (error) {
  console.error('❌ Error:');
  console.error(error);
  if (error.errors) {
    console.error('Details:', error.errors);
  }
}
