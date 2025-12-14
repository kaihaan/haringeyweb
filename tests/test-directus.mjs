/**
 * Test script to verify Directus API connection
 * Run with: node test-directus.mjs
 */

import { createDirectus, rest, readItems, staticToken } from '@directus/sdk';
import 'dotenv/config';

const DIRECTUS_URL = process.env.PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

console.log('Testing Directus connection...');
console.log('URL:', DIRECTUS_URL);
console.log('Token:', DIRECTUS_TOKEN ? '✓ Set' : '✗ Missing');

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error('\n❌ Missing environment variables!');
  console.error('Make sure .env file exists with PUBLIC_DIRECTUS_URL and DIRECTUS_TOKEN');
  process.exit(1);
}

const directus = createDirectus(DIRECTUS_URL)
  .with(rest())
  .with(staticToken(DIRECTUS_TOKEN));

try {
  console.log('\nFetching prayers from Directus...');
  const prayers = await directus.request(readItems('prayers'));

  console.log(`\n✅ Success! Found ${prayers.length} prayer(s):\n`);

  prayers.forEach((prayer, index) => {
    console.log(`${index + 1}. Prayer by ${prayer.author}`);
    console.log(`   Category: ${prayer.category}`);
    console.log(`   Status: ${prayer.status}`);
    console.log(`   Language: ${prayer.language}`);
    console.log(`   Text preview: ${prayer.text.substring(0, 80)}...`);
    if (prayer.tags && prayer.tags.length > 0) {
      console.log(`   Tags: ${prayer.tags.join(', ')}`);
    }
    console.log('');
  });

  console.log('✅ Directus connection successful!');
  console.log('\nNext step: Migrate prayers page to use Directus API');

} catch (error) {
  console.error('\n❌ Error connecting to Directus:');
  console.error(error.message);
  if (error.errors) {
    console.error('\nDetails:', error.errors);
  }
  console.error('\nTroubleshooting:');
  console.error('1. Check that Directus is running at:', DIRECTUS_URL);
  console.error('2. Verify the API token is correct');
  console.error('3. Check that "Public" role has Read permission for prayers collection');
  process.exit(1);
}
