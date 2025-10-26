/**
 * Populate Directus with Baháʼí Calendar Events for 2025-2026 (182-183 B.E.)
 *
 * This script creates Nineteen Day Feasts, Holy Days, and special events
 * for the UK Baháʼí community calendar.
 *
 * Usage:
 *   node scripts/populate-bahai-events.js [--dry-run] [--year=2025|2026]
 */

import { createDirectus, rest, createItems, readItems, staticToken } from '@directus/sdk';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const DIRECTUS_URL = process.env.PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error('❌ Error: DIRECTUS_URL and DIRECTUS_TOKEN must be set in .env file');
  process.exit(1);
}

// Load event data from JSON file
let BAHAI_EVENTS;
try {
  const dataPath = join(__dirname, 'bahai-events-data.json');
  const rawData = readFileSync(dataPath, 'utf-8');
  BAHAI_EVENTS = JSON.parse(rawData);
  console.log('✅ Loaded event data from bahai-events-data.json');
} catch (error) {
  console.error('❌ Error loading event data:', error.message);
  process.exit(1);
}

// Initialize Directus client
const directus = createDirectus(DIRECTUS_URL)
  .with(rest())
  .with(staticToken(DIRECTUS_TOKEN));

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const yearArg = args.find(arg => arg.startsWith('--year='));
const targetYear = yearArg ? parseInt(yearArg.split('=')[1]) : null;

console.log('\n🌟 Baháʼí Calendar Events Population Script');
console.log('==========================================\n');

if (isDryRun) {
  console.log('🔍 DRY RUN MODE - No events will be created\n');
}

/**
 * Create a date-time string in ISO format
 * Note: Baháʼí days begin at sunset, approximated as 6:00 PM for UK
 */
function createDateTime(year, month, day, hour = 19, minute = 0) {
  // Use sunset time (18:00) for event start if it's the beginning of a Baháʼí day
  return new Date(year, month - 1, day, hour, minute, 0).toISOString();
}

/**
 * Convert event data to Directus format
 */
function formatEvent(event, type, year) {
  const isPublic = type === 'holyDays' || type === 'special';
  const isFeast = type === 'feasts';

  // Get date/time info
  const date = event.date;
  const time = event.time || [19, 0]; // Default to 7:00 PM for feasts

  // Create start datetime
  const startDateTime = createDateTime(...date, ...time);

  // Create end datetime (2 hours later for most events, or use endDate if provided)
  let endDateTime;
  if (event.endDate) {
    endDateTime = createDateTime(...event.endDate, 23, 59); // End of day
  } else {
    const endTime = [...time];
    endTime[0] += 2; // Add 2 hours
    endDateTime = createDateTime(...date, ...endTime);
  }

  return {
    status: 'published',
    title: event.title,
    description: event.description,
    start_datetime: startDateTime,
    end_datetime: endDateTime,
    location: 'Venue TBD',
    is_public: isPublic,
    category: isFeast ? 'Nineteen Day Feast' : (type === 'holyDays' ? 'Holy Day' : 'Special Event'),
    is_recurring: false,
  };
}

/**
 * Check if event already exists
 */
async function eventExists(title, startDate) {
  try {
    const existing = await directus.request(
      readItems('events', {
        filter: {
          title: { _eq: title },
          start_datetime: { _eq: startDate },
        },
        limit: 1,
      })
    );
    return existing.length > 0;
  } catch (error) {
    console.error(`Error checking for existing event "${title}":`, error.message);
    return false;
  }
}

/**
 * Create events in Directus
 */
async function populateEvents() {
  const years = targetYear ? [targetYear] : [2025, 2026];
  const eventsToCreate = [];
  let skipped = 0;

  for (const year of years) {
    console.log(`\n📅 Processing Year ${year} (${year === 2025 ? '182' : '183'} B.E.)\n`);

    const yearData = BAHAI_EVENTS[year];
    if (!yearData) {
      console.log(`⚠️  No data available for year ${year}`);
      continue;
    }

    // Process each event type
    for (const [type, events] of Object.entries(yearData)) {
      const typeName = type === 'feasts' ? 'Nineteen Day Feasts' :
                       type === 'holyDays' ? 'Holy Days' : 'Special Events';
      console.log(`\n  ${typeName}:`);

      for (const event of events) {
        const formattedEvent = formatEvent(event, type, year);

        // Check if event already exists
        const exists = await eventExists(formattedEvent.title, formattedEvent.start_datetime);

        if (exists) {
          console.log(`  ⏭️  Skipped (already exists): ${event.title}`);
          skipped++;
        } else {
          eventsToCreate.push(formattedEvent);
          console.log(`  ✓ ${event.title} - ${new Date(formattedEvent.start_datetime).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}`);
        }
      }
    }
  }

  console.log(`\n\n📊 Summary:`);
  console.log(`   Total events to create: ${eventsToCreate.length}`);
  console.log(`   Already existing (skipped): ${skipped}`);

  if (isDryRun) {
    console.log('\n🔍 DRY RUN COMPLETE - No events were created');
    console.log('   Run without --dry-run to actually create events');
    return;
  }

  if (eventsToCreate.length === 0) {
    console.log('\n✨ All events already exist in Directus!');
    return;
  }

  console.log(`\n🚀 Creating ${eventsToCreate.length} events in Directus...`);

  try {
    await directus.request(createItems('events', eventsToCreate));
    console.log(`\n✅ Successfully created ${eventsToCreate.length} events!`);
  } catch (error) {
    console.error('\n❌ Error creating events:', error.message);
    if (error.errors) {
      console.error('Details:', JSON.stringify(error.errors, null, 2));
    }
    process.exit(1);
  }
}

// Run the script
console.log('Connecting to Directus...');
populateEvents()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
