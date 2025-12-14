/**
 * Migration Script: Local Prayers → Directus
 *
 * Reads prayer markdown files from src/content/prayers/
 * and imports them into Directus CMS.
 */

import { createDirectus, rest, createItems, readItems, staticToken } from '@directus/sdk';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import 'dotenv/config';

const DIRECTUS_URL = process.env.PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;
const PRAYERS_DIR = './src/content/prayers';

console.log('🔄 Prayer Migration Script\n');
console.log('Directus URL:', DIRECTUS_URL);
console.log('Token:', DIRECTUS_TOKEN ? '✓ Set' : '✗ Missing');

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error('\n❌ Missing environment variables!');
  console.error('Make sure .env has PUBLIC_DIRECTUS_URL and DIRECTUS_TOKEN');
  process.exit(1);
}

// Initialize Directus client
const directus = createDirectus(DIRECTUS_URL)
  .with(rest())
  .with(staticToken(DIRECTUS_TOKEN));

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    throw new Error('No frontmatter found');
  }

  const [, frontmatterStr, body] = match;
  const frontmatter = {};

  // Parse YAML-like frontmatter
  const lines = frontmatterStr.split('\n');
  let currentKey = null;
  let currentArray = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Array item
    if (trimmed.startsWith('- ')) {
      if (currentArray) {
        currentArray.push(trimmed.substring(2).trim());
      }
    }
    // Key-value pair
    else if (trimmed.includes(':')) {
      const colonIndex = trimmed.indexOf(':');
      const key = trimmed.substring(0, colonIndex).trim();
      let value = trimmed.substring(colonIndex + 1).trim();

      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      currentKey = key;

      // Check if this starts an array
      if (value === '') {
        currentArray = [];
        frontmatter[key] = currentArray;
      } else {
        frontmatter[key] = value;
        currentArray = null;
      }
    }
  }

  return {
    ...frontmatter,
    text: body.trim()
  };
}

/**
 * Check if prayer already exists in Directus by title
 */
async function prayerExists(title) {
  try {
    const existing = await directus.request(
      readItems('prayers', {
        filter: { title: { _eq: title } },
        limit: 1
      })
    );
    return existing.length > 0;
  } catch (error) {
    console.error(`Error checking if prayer exists: ${error.message}`);
    return false;
  }
}

/**
 * Migrate a single prayer file
 */
async function migratePrayer(filename) {
  const filepath = join(PRAYERS_DIR, filename);

  try {
    // Read and parse file
    const content = await readFile(filepath, 'utf-8');
    const prayer = parseFrontmatter(content);

    // Check if already exists
    const exists = await prayerExists(prayer.title);
    if (exists) {
      console.log(`⏭️  Skipped: "${prayer.title}" (already exists)`);
      return { skipped: true, title: prayer.title };
    }

    // Prepare data for Directus
    const prayerData = {
      status: 'published',
      title: prayer.title,
      author: prayer.author,
      category: prayer.category,
      text: prayer.text,
      tags: prayer.tags || [],
      language: 'en'
    };

    // Create in Directus
    await directus.request(createItems('prayers', prayerData));

    console.log(`✅ Imported: "${prayer.title}"`);
    return { success: true, title: prayer.title };

  } catch (error) {
    console.error(`❌ Failed to migrate ${filename}:`);
    console.error(`   ${error.message}`);
    return { error: true, title: filename, message: error.message };
  }
}

/**
 * Main migration function
 */
async function main() {
  try {
    // Read all markdown files
    const files = await readdir(PRAYERS_DIR);
    const prayerFiles = files.filter(f => f.endsWith('.md'));

    console.log(`\nFound ${prayerFiles.length} prayer file(s) to migrate\n`);

    // Check current prayers in Directus
    const existingPrayers = await directus.request(readItems('prayers', { limit: -1 }));
    console.log(`Directus currently has ${existingPrayers.length} prayer(s)\n`);

    console.log('Starting migration...\n');

    // Migrate each prayer
    const results = {
      success: [],
      skipped: [],
      errors: []
    };

    for (const file of prayerFiles) {
      const result = await migratePrayer(file);

      if (result.success) {
        results.success.push(result.title);
      } else if (result.skipped) {
        results.skipped.push(result.title);
      } else if (result.error) {
        results.errors.push({ title: result.title, message: result.message });
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('Migration Summary');
    console.log('='.repeat(50));
    console.log(`✅ Successfully imported: ${results.success.length}`);
    console.log(`⏭️  Skipped (already exists): ${results.skipped.length}`);
    console.log(`❌ Failed: ${results.errors.length}`);

    if (results.success.length > 0) {
      console.log('\nImported prayers:');
      results.success.forEach(title => console.log(`  - ${title}`));
    }

    if (results.skipped.length > 0) {
      console.log('\nSkipped prayers:');
      results.skipped.forEach(title => console.log(`  - ${title}`));
    }

    if (results.errors.length > 0) {
      console.log('\nFailed prayers:');
      results.errors.forEach(({ title, message }) => {
        console.log(`  - ${title}: ${message}`);
      });
    }

    console.log('\n✨ Migration complete!');

    // Verify final count
    const finalPrayers = await directus.request(readItems('prayers', { limit: -1 }));
    console.log(`\nDirectus now has ${finalPrayers.length} total prayer(s)`);

  } catch (error) {
    console.error('\n❌ Migration failed:');
    console.error(error);
    process.exit(1);
  }
}

main();
