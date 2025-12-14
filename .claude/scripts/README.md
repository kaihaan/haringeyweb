# Baháʼí Calendar Event Scripts

This directory contains scripts for populating and managing Baháʼí calendar events in the Directus CMS.

## populate-bahai-events.js

Populates Directus with Baháʼí calendar events for 2025-2026 (182-183 B.E.), including:

- **19 Nineteen Day Feasts** per year (monthly community gatherings)
- **11 Holy Days** per year (commemorating significant historical events)
- **Special Events** (Ayyám-i-Há and 19-Day Fast)

### Prerequisites

1. Ensure you have Node.js installed
2. Your `.env` file must contain:
   ```
   PUBLIC_DIRECTUS_URL=https://your-directus-instance.com
   DIRECTUS_TOKEN=your-static-token-here
   ```

### Usage

#### Dry Run (Preview Only)
Preview what events will be created without actually creating them:

```bash
node scripts/populate-bahai-events.js --dry-run
```

#### Create All Events (2025 & 2026)
Create all events for both years:

```bash
node scripts/populate-bahai-events.js
```

#### Create Events for Specific Year
Create events for only one year:

```bash
# 2025 only (182 B.E.)
node scripts/populate-bahai-events.js --year=2025

# 2026 only (183 B.E.)
node scripts/populate-bahai-events.js --year=2026
```

### Event Categories

#### Nineteen Day Feasts (`is_public: false`)
Monthly community gatherings for Baháʼís. These events are marked as **private** (Baháʼí community only):

- Held on the first day of each Baháʼí month
- Standard time: 7:00 PM
- Location: "Venue TBD"
- Category: "Nineteen Day Feast"

The 19 months are:
1. Bahá (Splendour)
2. Jalál (Glory)
3. Jamál (Beauty)
4. ʻAẓamat (Grandeur)
5. Núr (Light)
6. Raḥmat (Mercy)
7. Kalimát (Words)
8. Kamál (Perfection)
9. Asmáʼ (Names)
10. ʻIzzat (Might)
11. Mashíyyat (Will)
12. ʻIlm (Knowledge)
13. Qudrat (Power)
14. Qawl (Speech)
15. Masáʼil (Questions)
16. Sharaf (Honour)
17. Sulṭán (Sovereignty)
18. Mulk (Dominion)
19. ʻAláʼ (Loftiness)

#### Holy Days (`is_public: true`)
These events are marked as **public** (welcoming everyone):

1. **Naw-Rúz** (Baháʼí New Year) - Spring equinox
2. **First Day of Riḍván** - Start of the 12-day festival
3. **Ninth Day of Riḍván** - Mid-festival holy day
4. **Twelfth Day of Riḍván** - End of the festival
5. **Declaration of the Báb** - May 23
6. **Ascension of Bahá'u'lláh** - May 29
7. **Martyrdom of the Báb** - July 9
8. **Birth of the Báb** - October (date varies by lunar calendar)
9. **Birth of Bahá'u'lláh** - October (date varies by lunar calendar)
10. **Day of the Covenant** - November 25/26
11. **Ascension of ʻAbdu'l-Bahá** - November 27/28

#### Special Events (`is_public: true`)

- **Ayyám-i-Há (Intercalary Days)** - 4 days of celebration before the Fast
- **19-Day Fast** - Annual fast from sunrise to sunset

### Important Notes

#### Baháʼí Calendar
- The Baháʼí day begins and ends at **sunset**
- Naw-Rúz falls on the spring equinox (March 20 or 21)
- The calendar consists of 19 months of 19 days each
- Ayyám-i-Há provides the extra days needed to align with the solar year

#### Twin Birthdays (2026)
The Birth of the Báb and Birth of Bahá'u'lláh dates for 2026 are **calculated estimates** based on lunar patterns. These should be confirmed with official Baháʼí sources when the UK National Spiritual Assembly publishes the official calendar.

#### Duplicate Prevention
The script automatically checks for existing events with the same title and start date. Duplicate events will be skipped with a notification.

### Troubleshooting

#### Error: "DIRECTUS_URL and DIRECTUS_TOKEN must be set"
Ensure your `.env` file contains the required variables.

#### Error: "fetch failed" or timeout errors
Your Directus instance may be sleeping (if on Render free tier) or unavailable. Wait a moment and try again.

#### Events already exist
If you see "Already existing (skipped)" messages, those events are already in your Directus database. The script will not create duplicates.

### Event Structure

Each event created in Directus has the following structure:

```javascript
{
  status: 'published',
  title: 'Event Name',
  description: 'Detailed description...',
  start_datetime: '2025-03-20T18:00:00.000Z', // ISO 8601 format
  end_datetime: '2025-03-20T20:00:00.000Z',
  location: 'Venue TBD',
  is_public: true/false,
  category: 'Nineteen Day Feast' | 'Holy Day' | 'Special Event',
  is_recurring: false
}
```

### Data Sources

Event dates are based on:
- Official Baháʼí calendar from [bahai.org](https://www.bahai.org/action/devotional-life/calendar)
- UK Baháʼí Community calendar from [bahai.org.uk](https://www.bahai.org.uk/calendar)
- Calendar information from the Haringey Baháʼí Community (2023-24 reference)

### Future Updates

To update dates for future years:

1. Consult official Baháʼí calendars for the new year
2. Add a new year entry to the `BAHAI_EVENTS` object in the script
3. Update feast dates (add 19 days from Naw-Rúz)
4. Update holy day dates (especially Twin Birthdays which vary by lunar calendar)
5. Run the script with `--year=YYYY` to populate only the new year

## Support

For questions about the Baháʼí calendar or these scripts, contact the Haringey Baháʼí Community at secretary@haringeybahai.org.uk
