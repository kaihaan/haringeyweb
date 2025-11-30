/**
 * Download Bahá'í Images from media.bahai.org
 *
 * Downloads curated collections of images for buildings, shrines, and historical figures
 * from the official Bahá'í Media Bank for non-commercial educational use.
 *
 * Usage:
 *   node scripts/download-bahai-images.js [--dry-run] [--limit=10]
 */

import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import { JSDOM } from 'jsdom';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitArg = args.find(arg => arg.startsWith('--limit='));
const IMAGES_PER_COLLECTION = limitArg ? parseInt(limitArg.split('=')[1]) : 10;

const BASE_URL = 'https://media.bahai.org';
const OUTPUT_DIR = join(projectRoot, 'public', 'images', 'bahai');

console.log('\n📸 Bahá\'í Images Download Script');
console.log('==================================\n');

if (isDryRun) {
  console.log('🔍 DRY RUN MODE - No images will be downloaded\n');
}

console.log(`📊 Configuration:`);
console.log(`   Images per collection: ${IMAGES_PER_COLLECTION}`);
console.log(`   Output directory: ${OUTPUT_DIR}\n`);

// Define collections to download
const COLLECTIONS = {
  buildings: [
    {
      name: 'Shrine of Bahá\'u\'lláh',
      url: '/buildings-places/akka-area/shrine-bahaullah/',
      folder: 'shrine-bahaullah',
    },
    {
      name: 'Shrine of the Báb & Terraces',
      url: '/buildings-places/haifa-area/shrine-bab-terraces/',
      folder: 'shrine-bab',
    },
    {
      name: 'Mansion Bahjí & Gardens',
      url: '/buildings-places/akka-area/mansion-bahji-gardens/',
      folder: 'mansion-bahji',
    },
    {
      name: 'Administrative Buildings (Haifa)',
      url: '/buildings-places/haifa-area/administrative-buildings/',
      folder: 'administrative-haifa',
    },
    {
      name: 'House of Worship - North America',
      url: '/buildings-places/bahai-houses-worship/north-america/',
      folder: 'houses-of-worship/north-america',
    },
    {
      name: 'House of Worship - India',
      url: '/buildings-places/bahai-houses-worship/indian-subcontinent/',
      folder: 'houses-of-worship/india',
    },
  ],
  history: [
    {
      name: 'Bahá\'u\'lláh',
      url: '/history/images-related-central-figures/bahaullah/',
      folder: 'bahaullah',
    },
    {
      name: 'The Báb',
      url: '/history/images-related-central-figures/the-bab/',
      folder: 'bab',
    },
    {
      name: '\'Abdu\'l-Bahá',
      url: '/history/images-related-central-figures/abdul-baha/',
      folder: 'abdul-baha',
    },
    {
      name: 'Early Bahá\'ís and Pioneers',
      url: '/history/other-historical-figures/early-bahais-pioneers/',
      folder: 'early-believers',
    },
  ],
};

// Metadata storage
const manifest = {
  downloaded_at: new Date().toISOString(),
  source: 'https://media.bahai.org',
  purpose: 'Educational and non-commercial use for Haringey Bahá\'í Community website',
  collections: {},
};

/**
 * Fetch and parse HTML from a URL
 */
async function fetchHTML(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const html = await response.text();
    return new JSDOM(html);
  } catch (error) {
    console.error(`❌ Error fetching ${url}:`, error.message);
    return null;
  }
}

/**
 * Extract image URLs from collection page
 */
function extractImageUrls(dom, limit) {
  const images = [];
  const document = dom.window.document;

  // Find all image elements in the grid
  const imgElements = document.querySelectorAll('img[src*="datocms-assets"]');

  for (let i = 0; i < Math.min(imgElements.length, limit); i++) {
    const img = imgElements[i];
    let src = img.getAttribute('src');

    // Remove query parameters and get base URL
    src = src.split('?')[0];

    // Construct medium resolution URL
    // Using width=1600 for good quality medium resolution
    const mediumResUrl = `${src}?auto=format&fit=max&w=1600`;

    // Try to extract a descriptive name
    const alt = img.getAttribute('alt') || '';
    const urlParts = src.split('/');
    const filename = urlParts[urlParts.length - 1];

    images.push({
      url: mediumResUrl,
      filename: filename,
      alt: alt,
    });
  }

  return images;
}

/**
 * Download an image file
 */
async function downloadImage(url, outputPath) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    await pipeline(
      response.body,
      createWriteStream(outputPath)
    );

    return true;
  } catch (error) {
    console.error(`   ❌ Failed to download: ${error.message}`);
    return false;
  }
}

/**
 * Ensure directory exists
 */
function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Process a single collection
 */
async function processCollection(category, collection) {
  console.log(`\n📁 ${collection.name}`);
  console.log(`   URL: ${BASE_URL}${collection.url}`);

  // Fetch collection page
  const dom = await fetchHTML(`${BASE_URL}${collection.url}`);
  if (!dom) {
    console.log(`   ⚠️  Failed to fetch collection page`);
    return { downloaded: 0, failed: 0 };
  }

  // Extract image URLs
  const images = extractImageUrls(dom, IMAGES_PER_COLLECTION);
  console.log(`   Found ${images.length} images to download`);

  if (images.length === 0) {
    console.log(`   ⚠️  No images found in collection`);
    return { downloaded: 0, failed: 0 };
  }

  // Create output directory
  const outputPath = join(OUTPUT_DIR, category, collection.folder);
  if (!isDryRun) {
    ensureDir(outputPath);
  }

  // Download images
  let downloaded = 0;
  let failed = 0;

  const collectionImages = [];

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const imageNum = String(i + 1).padStart(3, '0');
    const extension = image.filename.split('.').pop() || 'jpg';
    // Use only the last part of the folder path for the filename (not the full path)
    const folderBaseName = collection.folder.split('/').pop();
    const outputFilename = `${folderBaseName}-${imageNum}.${extension}`;
    const outputFilePath = join(outputPath, outputFilename);

    if (isDryRun) {
      console.log(`   ✓ [DRY RUN] Would download: ${outputFilename}`);
      downloaded++;
      collectionImages.push({
        filename: outputFilename,
        source_url: image.url,
        alt_text: image.alt,
      });
    } else {
      // Check if file already exists
      if (existsSync(outputFilePath)) {
        console.log(`   ⏭️  Skipped (already exists): ${outputFilename}`);
        downloaded++;
        collectionImages.push({
          filename: outputFilename,
          source_url: image.url,
          alt_text: image.alt,
        });
      } else {
        process.stdout.write(`   ⬇️  Downloading ${imageNum}/${images.length}...`);
        const success = await downloadImage(image.url, outputFilePath);

        if (success) {
          process.stdout.write(` ✓ ${outputFilename}\n`);
          downloaded++;
          collectionImages.push({
            filename: outputFilename,
            source_url: image.url,
            alt_text: image.alt,
          });
        } else {
          process.stdout.write(`\n`);
          failed++;
        }
      }
    }
  }

  // Add to manifest
  manifest.collections[`${category}/${collection.folder}`] = {
    name: collection.name,
    source_url: `${BASE_URL}${collection.url}`,
    images: collectionImages,
  };

  console.log(`   ✅ Downloaded: ${downloaded}, Failed: ${failed}`);

  return { downloaded, failed };
}

/**
 * Main execution
 */
async function main() {
  let totalDownloaded = 0;
  let totalFailed = 0;

  // Process Buildings & Places
  console.log('\n🏛️  BUILDINGS & PLACES');
  console.log('======================');

  for (const collection of COLLECTIONS.buildings) {
    const result = await processCollection('buildings', collection);
    totalDownloaded += result.downloaded;
    totalFailed += result.failed;
  }

  // Process History
  console.log('\n\n📜 HISTORY');
  console.log('==========');

  for (const collection of COLLECTIONS.history) {
    const result = await processCollection('history', collection);
    totalDownloaded += result.downloaded;
    totalFailed += result.failed;
  }

  // Save manifest
  console.log('\n\n📝 Saving manifest...');
  const manifestPath = join(OUTPUT_DIR, 'manifest.json');

  if (!isDryRun) {
    ensureDir(OUTPUT_DIR);
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`   ✓ Manifest saved: ${manifestPath}`);
  } else {
    console.log(`   ✓ [DRY RUN] Would save manifest to: ${manifestPath}`);
  }

  // Summary
  console.log('\n\n📊 SUMMARY');
  console.log('==========');
  console.log(`   Total collections processed: ${COLLECTIONS.buildings.length + COLLECTIONS.history.length}`);
  console.log(`   Total images downloaded: ${totalDownloaded}`);
  console.log(`   Total failed: ${totalFailed}`);

  if (isDryRun) {
    console.log('\n🔍 DRY RUN COMPLETE - Run without --dry-run to download images');
  } else {
    console.log(`\n✨ All images downloaded to: ${OUTPUT_DIR}`);
  }
}

// Run the script
main()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
