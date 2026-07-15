/**
 * Deployed smoke test — runs against the REAL deployed URL, not localhost.
 *
 * Catches proxy / routing / SSL / Content-Type issues that localhost tests miss.
 * Zero dependencies (plain Node + fetch), so it runs anywhere with `npm run test:e2e:deployed`.
 *
 * Env vars:
 *   DEPLOY_URL                        Base URL to test (default: production custom domain)
 *   VERCEL_AUTOMATION_BYPASS_SECRET   Optional. If the deployment has Vercel Deployment
 *                                     Protection on, set this to the "Protection Bypass for
 *                                     Automation" secret so the test can reach protected routes.
 *   MEMBER_FEED_TOKEN                 Optional. A real member's feed_token. If set, the test also
 *                                     asserts the personal feed returns a valid members calendar.
 *
 * Examples:
 *   DEPLOY_URL=https://haringeybahai.org.uk npm run test:e2e:deployed
 *   DEPLOY_URL=https://<preview>.vercel.app VERCEL_AUTOMATION_BYPASS_SECRET=xxx npm run test:e2e:deployed
 */

const BASE = (process.env.DEPLOY_URL || 'https://haringeybahai.org.uk').replace(/\/$/, '');
const BYPASS = process.env.VERCEL_AUTOMATION_BYPASS_SECRET || '';
const MEMBER_FEED_TOKEN = process.env.MEMBER_FEED_TOKEN || '';

const headers = BYPASS ? { 'x-vercel-protection-bypass': BYPASS } : {};

let passed = 0;
let failed = 0;
const ok = (m) => { console.log('  ✅ ' + m); passed++; };
const bad = (m) => { console.log('  ❌ ' + m); failed++; };

async function get(path, { redirect = 'manual' } = {}) {
  const res = await fetch(BASE + path, { headers, redirect });
  const body = await res.text();
  return { status: res.status, ctype: res.headers.get('content-type') || '', location: res.headers.get('location') || '', body };
}

// Content-Type must be the expected type and never the octet-stream fallback.
function assertType(label, r, expected) {
  if (r.ctype.includes('application/octet-stream')) return bad(`${label}: Content-Type is application/octet-stream (misconfigured)`);
  if (!r.ctype.includes(expected)) return bad(`${label}: Content-Type "${r.ctype}" (expected ${expected})`);
  ok(`${label}: ${expected} [${r.status}]`);
}

async function main() {
  console.log(`Deployed smoke test → ${BASE}${BYPASS ? ' (with bypass)' : ''}\n`);

  // 1. Home page loads and is THIS app (not Grafana / another service).
  console.log('1. Public site identity');
  const home = await get('/');
  assertType('/', home, 'text/html');
  /Haringey Bahá|Haringey Baháʼí|Baháʼí Community/i.test(home.body)
    ? ok('/ contains Haringey Baháʼí branding (correct app)')
    : bad('/ does not contain expected branding (wrong app served?)');

  // 2. Public calendar feed.
  console.log('2. Public calendar feed');
  const pub = await get('/events.ics', { redirect: 'follow' });
  assertType('/events.ics', pub, 'text/calendar');
  pub.body.startsWith('BEGIN:VCALENDAR') ? ok('/events.ics is a valid VCALENDAR') : bad('/events.ics is not a VCALENDAR');

  // 3. Members gate.
  console.log('3. Members area gate');
  const login = await get('/members/login');
  assertType('/members/login', login, 'text/html');
  const gated = await get('/members/events');
  gated.status === 302 && /\/members\/login/.test(gated.location)
    ? ok('/members/events redirects unauthenticated users to login')
    : bad(`/members/events did not gate (status ${gated.status}, location "${gated.location}")`);

  // 4. Feed endpoint is alive and fails safe on a bogus token.
  console.log('4. Members feed endpoint');
  const badFeed = await get('/members/feed/definitely-not-a-real-token.ics', { redirect: 'follow' });
  badFeed.status === 404
    ? ok('unknown feed token → 404 (fails safe, no 500)')
    : bad(`unknown feed token → ${badFeed.status} (expected 404)`);

  // 5. Optional: real member feed happy-path (only if a token is provided).
  if (MEMBER_FEED_TOKEN) {
    console.log('5. Members feed happy-path (MEMBER_FEED_TOKEN provided)');
    const feed = await get(`/members/feed/${MEMBER_FEED_TOKEN}.ics`, { redirect: 'follow' });
    assertType('members feed', feed, 'text/calendar');
    feed.body.includes('BEGIN:VCALENDAR') ? ok('members feed is a valid VCALENDAR') : bad('members feed is not a VCALENDAR');
    feed.body.includes('TZID=Europe/London') ? ok('members feed carries Europe/London timezone') : bad('members feed missing TZID=Europe/London');
  } else {
    console.log('5. Members feed happy-path — skipped (set MEMBER_FEED_TOKEN to enable)');
  }

  console.log(`\n${failed ? '❌' : '✅'} ${passed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
}

main().catch((e) => { console.error('Smoke test error:', e.message); process.exit(1); });
