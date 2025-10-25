/**
 * Test script to verify prayers in Directus
 */

import { createDirectus, rest, readItems, staticToken } from '@directus/sdk';
import 'dotenv/config';

const DIRECTUS_URL = process.env.PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

console.log('Testing Directus prayers...');
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
  console.log('\n--- Fetching Published Prayers ---');
  const publishedPrayers = await directus.request(
    readItems('prayers', {
      filter: { status: { _eq: 'published' } }
    })
  );

  console.log(`\nFound ${publishedPrayers.length} published prayer(s):\n`);

  publishedPrayers.forEach((prayer, index) => {
    console.log(`${index + 1}. ${prayer.title}`);
    console.log(`   Author: ${prayer.author}`);
    console.log(`   Category: ${prayer.category}`);
    console.log(`   Tags: ${prayer.tags?.join(', ') || 'None'}`);
    console.log(`   Text length: ${prayer.text?.length || 0} characters`);
    console.log('');
  });

  console.log('✅ Prayers loaded successfully!');

} catch (error) {
  console.error('\n❌ Error:');
  console.error(error.message);
  if (error.errors) {
    console.error('\nDetails:', error.errors);
  }
  process.exit(1);
}
