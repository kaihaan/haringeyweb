# Bahá'í Media Collection

This directory contains curated images from the official Bahá'í Media Bank for educational and non-commercial use on the Haringey Bahá'í Community website.

## Source

All images downloaded from: [media.bahai.org](https://media.bahai.org)

## Collection Details

**Downloaded**: October 26, 2025
**Total Images**: 95 medium-resolution images
**Resolution**: 1600px width (medium quality for web use)

### Buildings & Places (60 images)

1. **Shrine of Bahá'u'lláh** (10 images)
   - Location: 'Akká, Israel
   - The most holy place for Bahá'ís, burial site of Bahá'u'lláh

2. **Shrine of the Báb & Terraces** (10 images)
   - Location: Haifa, Israel
   - Iconic golden-domed shrine surrounded by beautiful terraces

3. **Mansion Bahjí & Gardens** (10 images)
   - Location: Near 'Akká, Israel
   - Final residence of Bahá'u'lláh

4. **Administrative Buildings** (10 images)
   - Location: Haifa, Israel
   - International Bahá'í administrative center

5. **House of Worship - North America** (5 images)
   - Location: Wilmette, Illinois, USA
   - The "Bahá'í Temple" - architectural landmark

6. **House of Worship - India** (15 images)
   - Location: New Delhi, India
   - The "Lotus Temple" - renowned for its lotus flower design

### History (35 images)

1. **Bahá'u'lláh** (10 images)
   - Prophet-Founder of the Bahá'í Faith (1817-1892)
   - Historical photographs and sites

2. **The Báb** (10 images)
   - Forerunner of the Bahá'í Faith (1819-1850)
   - Historical documentation

3. **'Abdu'l-Bahá** (10 images)
   - Son of Bahá'u'lláh and exemplar of the Faith (1844-1921)
   - Historical photographs

4. **Early Bahá'ís and Pioneers** (5 images)
   - Early believers and teachers of the Faith
   - Historical documentation

## File Organization

```
bahai/
├── buildings/
│   ├── shrine-bahaullah/
│   ├── shrine-bab/
│   ├── mansion-bahji/
│   ├── administrative-haifa/
│   └── houses-of-worship/
│       ├── north-america/
│       └── india/
└── history/
    ├── bahaullah/
    ├── bab/
    ├── abdul-baha/
    └── early-believers/
```

## Naming Convention

Images are named systematically:
- `[collection-name]-[number].jpg`
- Example: `shrine-bahaullah-001.jpg`, `abdul-baha-005.jpg`

## Metadata

See `manifest.json` for complete metadata including:
- Original source URLs
- Alt text descriptions
- Download timestamp
- Collection organization

## Usage

These images are provided by the Bahá'í Media Bank for **non-commercial educational purposes only**.

### Terms

- **Educational Use**: Appropriate for community websites, presentations, and educational materials
- **Attribution**: Images courtesy of media.bahai.org
- **Copyright**: All rights reserved by the Bahá'í International Community
- **Modification**: Minimal editing recommended; maintain dignity and respect

## Scripts

Images were downloaded using: `scripts/download-bahai-images.js`

To re-download or update:
```bash
node scripts/download-bahai-images.js --limit=10
```

Options:
- `--dry-run` - Preview without downloading
- `--limit=N` - Number of images per collection (default: 10)

## Accessibility

All images include descriptive alt text extracted from the source. Use these descriptions for screen readers and accessibility compliance.

## Contact

For questions about image usage or licensing, contact:
- Bahá'í Media Bank: https://media.bahai.org/contact
- Haringey Bahá'í Community: [your contact information]
