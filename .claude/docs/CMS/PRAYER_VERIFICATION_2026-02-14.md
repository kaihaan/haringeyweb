# Content Verification Report

**Date**: 2026-02-14
**Source**: Bahá'í Reference Library (https://www.bahai.org/library/)
**Scope**: All Directus content — prayers (10), resources (22), events (65), writings (0), news (0)
**Method**: Word-for-word comparison against authoritative sources; Unicode consistency check; factual verification

## Summary

### Prayers (10 items)
- **4 author attribution errors** found and corrected
- **2 Unicode inconsistencies** found and corrected
- **0 text errors** — all prayer texts match authoritative versions exactly
- **1 incomplete text** noted (Tablet of Ahmad excerpt — intentional)

### Resources (22 items)
- **1 grammatical error** fixed (missing possessive)
- **1 incorrect URL** fixed
- **3 duplicate URL pairs** noted (informational)
- Unicode: all consistent (U+02BC/U+02BB used correctly throughout)

### Events (65 items)
- **1 factual error** fixed (Ayyám-i-Há day count for 2026)
- All holy day descriptions verified factually correct
- All 19 Bahá'í month names verified with correct transliterations
- Bahá'í Era year numbering verified correct (182 B.E. for 2025, 183 B.E. for 2026)
- Unicode: all consistent throughout

### Writings (0 items) — Nothing to verify
### News (0 items) — Nothing to verify

## Verification Results

| # | ID | Category | Text | Author | Issues & Fixes |
|---|-----|----------|------|--------|----------------|
| 1 | 01cfe131 | Children | Correct | Correct: `Abdul-Baha | None |
| 2 | 02f804f5 | General | Correct | **FIXED**: Was Baha'u'llah, corrected to **`Abdul-Baha** | Author error |
| 3 | 321fdc83 | Assistance | Correct | **FIXED**: Was Baha'u'llah, corrected to **The Bab** | Author error |
| 4 | 846a6994 | Protection | Correct (excerpt) | Correct: Baha'u'llah | First 2 paragraphs of Tablet of Ahmad only |
| 5 | 8f0438b5 | Healing | Correct | Correct: Baha'u'llah | None |
| 6 | 9d819774 | General | Correct | **FIXED**: Unicode standardised (ASCII ' to U+02BC) | Unicode inconsistency |
| 7 | be030f8c | Morning | Correct | Correct: Baha'u'llah | None |
| 8 | c24dc49c | General | Correct | **FIXED**: Unicode standardised (ASCII ' to U+02BC) | Unicode inconsistency |
| 9 | fb347d4b | Departed | Correct | **FIXED**: Was Baha'u'llah, corrected to **`Abdul-Baha** | Author error |
| 10 | fcbcb6a3 | Unity | Correct | **FIXED**: Was `Abdul-Baha, corrected to **Baha'u'llah** | Author error |

## Author Attribution Corrections

| Prayer | Opening Words | Was | Should Be | Source |
|--------|--------------|-----|-----------|--------|
| #2 | "O Thou kind Lord! Thou hast created all humanity..." | Baha'u'llah | **`Abdul-Baha** | BP pp.101-102 |
| #3 | "Is there any Remover of difficulties save God?..." | Baha'u'llah | **The Bab** | BP p.28 |
| #9 | "O my God! O Thou forgiver of sins..." | Baha'u'llah | **`Abdul-Baha** | BP pp.45-46 |
| #10 | "O my God! O my God! Unite the hearts..." | `Abdul-Baha | **Baha'u'llah** | BP p.204 |

## Unicode Standardisation

All author names now use consistent Unicode characters:
- **Baha'u'llah**: `Bahá` + U+02BC (MODIFIER LETTER APOSTROPHE) + `u'lláh`
- **`Abdul-Baha**: U+02BB (MODIFIER LETTER TURNED COMMA) + `Abdu'l-Bahá`
- **The Bab**: `The Báb` (U+00E1 for accented a)

Previously prayers #6 and #8 used a plain ASCII apostrophe (U+0027) instead of U+02BC.

## Notes

- Prayer #4 (Tablet of Ahmad) contains only the first 2 paragraphs of the full tablet. The text that IS present is accurate. The full Tablet of Ahmad spans 5 pages (BP pp.209-213).
- Prayer #6 uses the Baha'i Prayers (BP) translation, which differs from the Prayers and Meditations (PM-98) translation of the same prayer. Both are authoritative translations by Shoghi Effendi.
- Prayer #8 uses the short version from BP (pp.19-20), not the longer PM version.

---

## Resources Verification (22 items)

### Fixes Applied

| ID | Issue | Fix |
|----|-------|-----|
| 7 | Description: "Baháʼuʼlláh vision" (missing possessive) | Changed to "Baháʼuʼlláh's vision" |
| 15 | URL pointed to https://www.bahai.org (main site) but title is "Baháʼí Reference Library" | Changed to https://www.bahai.org/library/ |

### Duplicate URLs Noted (informational)

| URL | Resources |
|-----|-----------|
| https://books.bahai.org.uk/products/bahai-basics | #2 (Website) and #4 (Book) — different categories, same link |
| https://www.bic.org/videos/focus-faith-series-introduction-bahai-faith | #7 and #21 — different titles pointing to same video |
| https://islam-bahai.org/en/some-of-the-basic-principles... | #9 and #13 — different teachings, same source page |

### Unicode Consistency
All 22 resources use consistent Unicode throughout (U+02BC for hamza, U+02BB for ʻayn).

---

## Events Verification (65 items)

### Fix Applied

| Event | Issue | Fix |
|-------|-------|-----|
| 2026 Ayyám-i-Há (5e2412ae) | Said "Four days" but 2026 is a Bahá'í leap year with 5 intercalary days | Changed to "Five days" |

### Holy Days Verified

All 12 holy day types verified against authoritative sources:
- Naw-Rúz: Spring equinox, B.E. year numbering correct (182 for 2025, 183 for 2026) ✅
- Riḍván (1st, 9th, 12th days): Baghdad 1863 declaration correct ✅
- Declaration of the Báb: Mullá Ḥusayn, Shíráz, 1844 ✅
- Ascension of Bahá'u'lláh: 1892, Bahjí, near ʻAkká ✅
- Martyrdom of the Báb: Tabríz, 1850 ✅
- Birth of the Báb: 1819, Shíráz ✅
- Birth of Bahá'u'lláh: 1817, Tehran ✅
- Day of the Covenant: ʻAbdu'l-Bahá appointment ✅
- Ascension of ʻAbdu'l-Bahá: 1921, Haifa ✅
- Ayyám-i-Há: 4 days (2025), 5 days (2026) ✅
- 19-Day Fast: Ages 15-70 with exemptions ✅

### 19 Bahá'í Month Names Verified

All feast names use correct transliterations with proper diacritical marks (ʻ, ʼ, á, í, ú, ḥ, ẓ, ṭ, ḍ).

### Unicode Consistency
All 65 events use consistent Unicode throughout.

---

## Authoritative Sources Used

- Bahá'í Prayers: A Selection (BP) - https://reference.bahai.org/en/t/c/BP/
- Prayers and Meditations by Bahá'u'lláh (PM) - https://reference.bahai.org/en/t/b/PM/
- Bahá'í Reference Library - https://www.bahai.org/library/
- Bahá'í Calendar - https://www.bahai.org/action/devotional-life/calendar
