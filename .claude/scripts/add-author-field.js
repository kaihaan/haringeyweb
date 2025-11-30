/**
 * Add 'author' field to Directus Resources collection
 *
 * This script adds the missing author field to the resources collection schema.
 *
 * Usage:
 *   node scripts/add-author-field.js
 */

import { createDirectus, rest, staticToken } from '@directus/sdk';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const DIRECTUS_URL = process.env.PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error('❌ Error: PUBLIC_DIRECTUS_URL and DIRECTUS_TOKEN must be set in .env file');
  process.exit(1);
}

// Initialize Directus client
const directus = createDirectus(DIRECTUS_URL)
  .with(rest())
  .with(staticToken(DIRECTUS_TOKEN));

console.log('\n📝 Adding Author Field to Resources Collection');
console.log('==============================================\n');

async function addAuthorField() {
  try {
    console.log('Connecting to Directus...');

    // First, check if the field already exists
    console.log('Checking if author field exists...');

    try {
      const response = await fetch(`${DIRECTUS_URL}/fields/resources/author`, {
        headers: {
          'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
        },
      });

      if (response.ok) {
        console.log('✓ Author field already exists!');
        return;
      }
    } catch (error) {
      // Field doesn't exist, continue to create it
    }

    console.log('Creating author field...');

    // Create the author field
    const response = await fetch(`${DIRECTUS_URL}/fields/resources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
      },
      body: JSON.stringify({
        field: 'author',
        type: 'string',
        meta: {
          interface: 'input',
          options: {
            placeholder: 'Enter author name'
          },
          display: 'raw',
          readonly: false,
          hidden: false,
          sort: 5,
          width: 'full',
          note: 'Author of the resource (for books, articles, etc.)'
        },
        schema: {
          name: 'author',
          table: 'resources',
          data_type: 'varchar',
          default_value: null,
          max_length: 255,
          is_nullable: true,
          is_unique: false,
          is_primary_key: false,
          has_auto_increment: false
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create field: ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    console.log('✅ Successfully created author field!');
    console.log('\nField details:');
    console.log(`   Field name: ${result.data.field}`);
    console.log(`   Type: ${result.data.type}`);
    console.log(`   Nullable: ${result.data.schema.is_nullable}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
addAuthorField()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
