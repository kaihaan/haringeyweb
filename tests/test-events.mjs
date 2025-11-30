/**
 * Test script to verify Directus events API
 */

import { createDirectus, rest, readItems, staticToken } from '@directus/sdk';
import 'dotenv/config';

const DIRECTUS_URL = process.env.PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

console.log('Testing Directus events...');
console.log('URL:', DIRECTUS_URL);
console.log('Token:', DIRECTUS_TOKEN ? '✓ Set' : '✗ Missing');

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error('\n❌ Missing environment variables!');
  process.exit(1);
}

const directus = createDirectus(DIRECTUS_URL)
  .with(rest())
  .with(staticToken(DIRECTUS_TOKEN));

try {
  console.log('\nFetching ALL events from Directus (no filters)...');
  const allEvents = await directus.request(readItems('events'));

  console.log(`\nFound ${allEvents.length} total event(s):\n`);

  allEvents.forEach((event, index) => {
    console.log(`${index + 1}. ${event.title}`);
    console.log(`   ID: ${event.id}`);
    console.log(`   Status: ${event.status}`);
    console.log(`   Is Public: ${event.is_public}`);
    console.log(`   Is Recurring: ${event.is_recurring}`);
    if (event.is_recurring) {
      console.log(`   Recurrence Pattern: ${event.recurrence_pattern}`);
      console.log(`   Days of Week: ${event.days_of_week}`);
      console.log(`   Week of Month: ${event.week_of_month}`);
    }
    console.log(`   Start: ${event.start_datetime}`);
    console.log(`   End: ${event.end_datetime}`);
    console.log(`   Location: ${event.location}`);
    console.log('');
  });

  console.log('\n--- Testing Published Filter ---');
  const publishedEvents = await directus.request(
    readItems('events', {
      filter: { status: { _eq: 'published' } }
    })
  );

  console.log(`Found ${publishedEvents.length} published event(s)`);

  console.log('\n--- Testing Public Permissions ---');
  console.log('Checking if Public role can read events...');

  // Try without token to test public access
  const publicDirectus = createDirectus(DIRECTUS_URL).with(rest());

  try {
    const publicEvents = await publicDirectus.request(readItems('events'));
    console.log(`✅ Public access works! Found ${publicEvents.length} event(s)`);
  } catch (err) {
    console.log(`❌ Public access blocked: ${err.message}`);
    console.log('   → You need to configure Public role permissions for events collection');
  }

  console.log('\n✅ Test complete!');

} catch (error) {
  console.error('\n❌ Error:');
  console.error(error.message);
  if (error.errors) {
    console.error('\nDetails:', error.errors);
  }
  process.exit(1);
}
