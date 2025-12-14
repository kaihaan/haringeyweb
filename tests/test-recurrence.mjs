/**
 * Test recurrence calculation with actual Directus event data
 */

import { getNextOccurrences, formatRecurrencePattern } from '../src/lib/recurrence.ts';

// Simulate the event data from Directus
const testEvent = {
  id: "ba7012be-ff93-46d7-a50a-3565a9c8c144",
  title: "Prayer & Meditation",
  status: "published",
  is_public: true,
  is_recurring: true,
  recurrence_pattern: "monthly",
  days_of_week: "sunday",  // ❌ This is a STRING, not an array!
  week_of_month: "first",  // ❌ This is lowercase, not "First"
  start_datetime: "2025-10-25T17:00:00.000Z",
  end_datetime: "2025-10-25T20:00:00",
  location: "Quaker Meeting Hall, Muswell Hill",
  description: "Monthly prayer and meditation"
};

console.log('Testing recurrence calculation...\n');
console.log('Event:', testEvent.title);
console.log('Pattern:', testEvent.recurrence_pattern);
console.log('Days of Week (raw):', testEvent.days_of_week, `(type: ${typeof testEvent.days_of_week})`);
console.log('Week of Month (raw):', testEvent.week_of_month);

// Test 1: As-is (will likely fail)
console.log('\n--- Test 1: With current data (will fail) ---');
try {
  const occurrences = getNextOccurrences(testEvent, 5);
  console.log(`✅ Found ${occurrences.length} occurrences:`);
  occurrences.forEach((date, i) => {
    console.log(`  ${i + 1}. ${date.toLocaleString('en-GB')}`);
  });
} catch (err) {
  console.log(`❌ Failed: ${err.message}`);
}

// Test 2: Fix the data format
console.log('\n--- Test 2: With corrected data format ---');
const fixedEvent = {
  ...testEvent,
  days_of_week: typeof testEvent.days_of_week === 'string'
    ? [testEvent.days_of_week.charAt(0).toUpperCase() + testEvent.days_of_week.slice(1).toLowerCase()]
    : testEvent.days_of_week,
  week_of_month: testEvent.week_of_month.charAt(0).toUpperCase() + testEvent.week_of_month.slice(1).toLowerCase()
};

console.log('Days of Week (fixed):', fixedEvent.days_of_week);
console.log('Week of Month (fixed):', fixedEvent.week_of_month);

try {
  const occurrences = getNextOccurrences(fixedEvent, 5);
  console.log(`✅ Found ${occurrences.length} occurrences:`);
  occurrences.forEach((date, i) => {
    console.log(`  ${i + 1}. ${date.toLocaleString('en-GB', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })}`);
  });

  console.log('\nRecurrence pattern text:', formatRecurrencePattern(fixedEvent));
} catch (err) {
  console.log(`❌ Failed: ${err.message}`);
  console.error(err);
}

console.log('\n--- Solution ---');
console.log('The Directus field needs to be configured differently:');
console.log('1. days_of_week should be a JSON array field, not a string');
console.log('2. Store values with proper capitalization: ["Sunday"] not "sunday"');
console.log('3. week_of_month should store: "First" not "first"');
