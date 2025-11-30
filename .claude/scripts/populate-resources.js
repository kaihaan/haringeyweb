/**
 * Populate Directus with Resources from hardcoded data
 *
 * This script migrates resources from src/data/resources.ts to the Directus CMS.
 *
 * Usage:
 *   node scripts/populate-resources.js [--dry-run]
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
  console.error('❌ Error: PUBLIC_DIRECTUS_URL and DIRECTUS_TOKEN must be set in .env file');
  process.exit(1);
}

// Hardcoded resources from src/data/resources.ts
const RESOURCES = [
  // Foundational Websites
  {
    id: 'bahai-org',
    title: 'Bahai.org – The Official Baháʼí Website',
    category: 'Website',
    tags: ['official', 'writings', 'beliefs', 'foundational'],
    description: 'The central hub for authoritative Baháʼí writings, beliefs, and teachings. Access to the Baháʼí Reference Library.',
    link: 'https://www.bahai.org/beliefs/'
  },
  {
    id: 'bahai-basics-site',
    title: 'Baháʼí Basics Guide',
    category: 'Website',
    tags: ['beginner', 'overview', 'practices', 'history'],
    description: 'A very approachable guide that explains beliefs, practices, history, and core principles.',
    link: 'https://books.bahai.org.uk/products/bahai-basics'
  },
  {
    id: 'ccea-resource',
    title: 'CCEA Religion Resource – Baháʼí',
    category: 'Website',
    tags: ['overview', 'beliefs', 'oneness', 'equality'],
    description: 'Clear overview of key beliefs: oneness of humanity, unity of religion, equality of men and women.',
    link: 'https://ccea.org.uk/learning-resources/world-religions-other-christianity/religions/bahai'
  },

  // Books
  {
    id: 'bahai-basics-book',
    title: 'Baháʼí Basics',
    category: 'Book',
    tags: ['beginner', 'introduction', 'accessible'],
    description: 'A very accessible, clear introduction to the Baháʼí Faith.',
    link: 'https://books.bahai.org.uk/products/bahai-basics',
    author: 'Frances Worthington'
  },
  {
    id: 'emerging-global-religion',
    title: 'The Baháʼí Faith: The Emerging Global Religion',
    category: 'Book',
    tags: ['in-depth', 'philosophy', 'history'],
    description: 'Offers a more in-depth philosophical and historical perspective.',
    link: 'https://en.wikipedia.org/wiki/The_Baha%27i_Faith%3A_The_Emerging_Global_Religion',
    author: 'William S. Hatcher & Douglas Martin'
  },
  {
    id: 'bahai-faith-basics',
    title: 'Baháʼí Faith: The Basics',
    category: 'Book',
    tags: ['modern', 'scholarly', 'course'],
    description: 'Modern and scholarly. There is even an online course based on this book.',
    link: 'https://www.bahai-ottawa.org/Online_Course.pdf',
    author: 'Christopher Buck'
  },

  // Videos
  {
    id: 'focus-on-faith',
    title: 'Focus on Faith Series: An Introduction to the Baháʼí Faith',
    category: 'Video',
    tags: ['introduction', 'unity', 'overview'],
    description: 'Overview of the core message: unity, the oneness of humanity, and Baháʼuʼlláh vision.',
    link: 'https://www.bic.org/videos/focus-faith-series-introduction-bahai-faith'
  },
  {
    id: '16-key-facts',
    title: 'What Is the Baháʼí Faith? – 16 Key Facts Explained',
    category: 'Video',
    tags: ['beginner', 'quick', 'overview'],
    description: 'A concise, modern-style video that breaks down main principles.',
    link: 'https://www.bahaiblog.net/video/short-film/what-is-the-bahai-faith-16-key-facts-explained/'
  },

  // Key Teachings
  {
    id: 'oneness-humanity',
    title: 'The Oneness of Humanity',
    category: 'Article',
    tags: ['unity', 'principles', 'equality'],
    description: 'Core teaching on the unity of people, breaking down national, racial, or class prejudice.',
    link: 'https://islam-bahai.org/en/some-of-the-basic-principles-of-the-bah%C3%A1%E2%80%99%C3%AD-faith'
  },
  {
    id: 'progressive-revelation',
    title: 'Progressive Revelation',
    category: 'Article',
    tags: ['religion', 'prophets', 'unity'],
    description: 'Religions are seen as part of a continuing, progressive divine plan.',
    link: 'https://en.wikipedia.org/wiki/Progressive_revelation_%28Bah%C3%A1%CA%BC%C3%AD%29'
  },
  {
    id: 'harmony-science-religion',
    title: 'Harmony of Science and Religion',
    category: 'Article',
    tags: ['science', 'reason', 'principles'],
    description: 'Faith and reason are not opposed; they are complementary.',
    link: 'https://www.bahai-cm.org/belief/basic-teachings-bahaullah'
  },
  {
    id: 'equality-sexes',
    title: 'Equality of the Sexes',
    category: 'Article',
    tags: ['equality', 'women', 'principles'],
    description: 'Men and women are spiritually and morally equal.',
    link: 'https://bahaimalawi.com/bahai-faith/'
  },
  {
    id: 'independent-investigation',
    title: 'Independent Investigation of Truth',
    category: 'Article',
    tags: ['truth', 'investigation', 'principles'],
    description: 'Each person is encouraged to search for truth on their own.',
    link: 'https://islam-bahai.org/en/some-of-the-basic-principles-of-the-bah%C3%A1%E2%80%99%C3%AD-faith'
  },

  // Study Resources
  {
    id: 'bahaipedia',
    title: 'Bahaipedia – Teachings Section',
    category: 'Website',
    tags: ['wiki', 'teachings', 'reference'],
    description: 'A wiki-style resource that gathers together many central teachings, including social and spiritual principles.',
    link: 'https://bahaipedia.org/Teachings'
  },
  {
    id: 'reference-library',
    title: 'Baháʼí Reference Library',
    category: 'Website',
    tags: ['official', 'scriptures', 'writings'],
    description: 'Access primary scriptures (writings of Baháʼuʼlláh, the Báb, ʻAbduʼl-Bahá, etc.).',
    link: 'https://www.bahai.org'
  },

  // Study Programs
  {
    id: 'christian-seeker-program',
    title: '4-Week Baháʼí Exploration for Christian Seekers',
    category: 'Study Program',
    tags: ['christian', 'study', 'exploration', '4-weeks'],
    description: 'A gentle, self-guided exploration plan for those with Christian backgrounds.',
    link: '/seekers#christian-program'
  },
  {
    id: 'muslim-seeker-program',
    title: '4-Week Baháʼí Exploration for Muslim Seekers',
    category: 'Study Program',
    tags: ['muslim', 'study', 'exploration', '4-weeks'],
    description: 'An exploration plan designed for thoughtful Muslim seekers.',
    link: '/seekers#muslim-program'
  },
  {
    id: 'independent-seeker-program',
    title: '4-Week Baháʼí Exploration for Independent Seekers',
    category: 'Study Program',
    tags: ['interfaith', 'study', 'exploration', '4-weeks'],
    description: 'For non-denominational seekers exploring connections with Islam, Christianity, Judaism, and Hinduism.',
    link: '/seekers#independent-program'
  },

  // Additional Resources
  {
    id: 'search-for-truth',
    title: 'The Search for Truth',
    category: 'Article',
    tags: ['truth', 'spiritual', 'guidance'],
    description: 'Exploring the Baháʼí teaching that every person has a duty to seek truth without clergy.',
    link: 'https://www.bahai.org/beliefs/life-spirit/search-truth/'
  },
  {
    id: 'service-humanity',
    title: 'Service to Humanity',
    category: 'Article',
    tags: ['service', 'action', 'community'],
    description: 'How Baháʼí spirituality expresses itself through unity, justice, and service.',
    link: 'https://www.bahai.org/beliefs/life-spirit/service-humanity/'
  },
  {
    id: 'oneness-religion-video',
    title: 'The Oneness of Religion',
    category: 'Video',
    tags: ['unity', 'religion', 'messengers'],
    description: 'Understanding how all religions are expressions of one divine truth.',
    link: 'https://www.bic.org/videos/focus-faith-series-introduction-bahai-faith'
  },
  {
    id: 'building-communities',
    title: 'Building Vibrant Communities',
    category: 'Video',
    tags: ['community', 'service', 'action'],
    description: 'How Baháʼís worldwide are building communities rooted in service, learning, and spiritual growth.',
    link: 'https://www.bic.org/'
  }
];

// Initialize Directus client
const directus = createDirectus(DIRECTUS_URL)
  .with(rest())
  .with(staticToken(DIRECTUS_TOKEN));

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');

console.log('\n📚 Resources Migration Script');
console.log('==============================\n');

if (isDryRun) {
  console.log('🔍 DRY RUN MODE - No resources will be created\n');
}

/**
 * Convert hardcoded resource to Directus format
 */
function formatResource(resource) {
  return {
    status: 'published',
    title: resource.title,
    type: 'link', // All current resources are external links
    description: resource.description,
    resource_url: resource.link, // Use resource_url field
    tags: resource.tags,
    category: resource.category,
    author: resource.author || null,
    language: 'en',
  };
}

/**
 * Check if resource already exists by title
 */
async function resourceExists(title) {
  try {
    const existing = await directus.request(
      readItems('resources', {
        filter: {
          title: { _eq: title },
        },
        limit: 1,
      })
    );
    return existing.length > 0;
  } catch (error) {
    console.error(`Error checking for existing resource "${title}":`, error.message);
    return false;
  }
}

/**
 * Populate resources in Directus
 */
async function populateResources() {
  const resourcesToCreate = [];
  let skipped = 0;

  console.log('Processing resources...\n');

  for (const resource of RESOURCES) {
    const formattedResource = formatResource(resource);

    // Check if resource already exists
    const exists = await resourceExists(formattedResource.title);

    if (exists) {
      console.log(`⏭️  Skipped (already exists): ${resource.title}`);
      skipped++;
    } else {
      resourcesToCreate.push(formattedResource);
      console.log(`✓ ${resource.title}`);
      if (resource.author) {
        console.log(`  Author: ${resource.author}`);
      }
    }
  }

  console.log(`\n\n📊 Summary:`);
  console.log(`   Total resources to create: ${resourcesToCreate.length}`);
  console.log(`   Already existing (skipped): ${skipped}`);

  if (isDryRun) {
    console.log('\n🔍 DRY RUN COMPLETE - No resources were created');
    console.log('   Run without --dry-run to actually create resources');
    return;
  }

  if (resourcesToCreate.length === 0) {
    console.log('\n✨ All resources already exist in Directus!');
    return;
  }

  console.log(`\n🚀 Creating ${resourcesToCreate.length} resources in Directus...`);

  try {
    await directus.request(createItems('resources', resourcesToCreate));
    console.log(`\n✅ Successfully created ${resourcesToCreate.length} resources!`);
  } catch (error) {
    console.error('\n❌ Error creating resources:', error.message);
    if (error.errors) {
      console.error('Details:', JSON.stringify(error.errors, null, 2));
    }
    process.exit(1);
  }
}

// Run the script
console.log('Connecting to Directus...');
populateResources()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
