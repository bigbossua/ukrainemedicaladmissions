# KEYWORD_URL_MAP.md

**Evidence status (2026-10-10): first genuine SEMrush data retrieved** — see §4 and `research/semrush/`. Seeds are marked *validated* only where a SEMrush figure now exists; everything else remains **UNVALIDATED**.

## 1. Seed clusters → canonical URL (one URL per intent)

| Cluster (intent) | Seed phrases (validated where §4 gives a figure; else unvalidated) | Canonical URL | Status |
|---|---|---|---|
| Study medicine / MBBS in Ukraine (informational) | study medicine in Ukraine (uk 30, za 30, ru 90, in 10); mbbs in ukraine / ukraine mbbs (in 260, uk 20); medicine admission in Ukraine (no data) | `/courses/medicine/` | Built; MBBS explainer added |
| Medical universities / colleges in Ukraine, list, "best" (comparison) | ukraine medical college (in 2,900); medical college list (in 210); best medical college/university/schools (in 390; uk 20×3); medical universities in ukraine (20 in ng/za/ae/pk/in; uk 0); ukraine medical university (20 in all six) | `/universities/` | Built; college wording + no-ranking section added |
| Named university (navigational) | pirogov medical university ukraine (in 390, uk 40); bogomolets national medical university ukraine (in 320, uk 70) + national medical university in kiev (uk 70); bukovinian state medical university ukraine (uk 20); **ternopil … admission/fees (uk 0; not measured in in)** | `/universities/<slug>/` | Ternopil built, noindex; others not yet created |
| Fees / cost (informational, lowest kd) | ukraine medical college fees for indian students (in 2,900 — lead only); ukraine medical fees (720); ukraine medical college fees (590); medical fees in ukraine (480); cost of medical education in ukraine (320); mbbs in ukraine fees (in 260; uk/ae/pk 20) | `/tuition-fees/` | Built; fee-vocabulary headings added; **no figures until verified** |
| Requirements / how to apply | medical university admission requirements in Ukraine; how to apply; documents required | `/admissions/` | Built |
| Dentistry | study dentistry in Ukraine; dentistry universities in Ukraine | `/courses/dentistry/` | Built |
| Nursing | study nursing in Ukraine; nursing universities in Ukraine | `/courses/nursing/` | Built |
| Pharmacy | study pharmacy in Ukraine; pharmacy universities in Ukraine | `/courses/pharmacy/` | Built |
| English-language programmes | English-language medical programmes in Ukraine | `/universities/?language=English` (filter) — no separate page unless evidence shows distinct intent | Not a page |
| Preparatory / foundation | preparatory course Ukraine medical | none yet — only if programmes are verified and demand shown | Not built |
| Country-specific (e.g. "for Nigerian students") | — | none — requires country demand evidence + admissions feasibility | Not built |

\* "MBBS" is not the qualification Ukrainian universities award. Pages may acknowledge the search term in copy but describe the actual qualification; a dedicated MBBS page is created only if SEMrush shows distinct intent and the copy can be accurate.

Anti-cannibalisation rule: a new page is created only if its target cluster has a different dominant intent from every existing row. Minor wording variants map to the existing URL.

## 2. Research ledger format (when units exist)

Store raw exports under `research/semrush/` (git-tracked, no credentials) as CSV with columns:
`date, database, report, keyword, volume, kd, cpc, intent, serp_features, source_trace_id`.
Log each API call in `SEMRUSH_API_LEDGER.md` with units consumed.
Summaries go in this file's §4; raw numbers are never typed by hand into pages.

## 3. Pilot programme (≤ 200 units, then review)

1. Keyword overview for the 20 brief seeds, database `uk`.
2. Related + question reports for the top 3 seeds by volume.
3. `organic_research` for 3 competitors visible in the SERP for seed 1 (names recorded only after the SERP is retrieved — none assumed).
4. Country check: repeat step 1 for `in`, `ng`, `pk` only if step 1 shows the metric set is useful.
Outputs: prioritised cluster table (volume, KD, intent, competitor gap) feeding `PAGE_ASSET_REGISTER.md`.

## 4. Validated findings (SEMrush, retrieved 2026-10-10; raw CSVs in `research/semrush/`)

### 4.1 Country demand for the head term "study medicine in ukraine" (`phrase_all`, monthly volume)
ru 90 (KD 15, intent 1=informational — the only database where SEMrush computed KD/intent) · uk 30 (CPC £1.02, competition 0.66) · cl 30 · cz 30 · dk 30 · hu 30 · jp 30 · mx 30 · za 30 · zw 30 · ae 20 · au 20 · ca 20 · de 20 · it 20 · kr 20 · ma 20 · se 20 · tr 20 · us 20 · in 10 · ng 10 · ar/bg/es/fi/fr/gr/ie/nl/no/pl/ro/sg/ua 10 · **0 in 45 databases incl. pk, bd, gh, eg, sa, qa, my, lk** (ids with no data).

Reading: measured English-language demand for the head term is **very small in every market** (no database above 90/month; largest English market, UK, is 30/month). India and Nigeria — historically the largest source markets — register only 10/month each for this exact phrase. The `0` KD/intent values mean SEMrush could not compute them (insufficient data), not low difficulty.

### 4.2 Seed phrases, UK database (`phrase_these`)
| Seed | Volume | CPC | Competition | KD |
|---|---|---|---|---|
| study medicine in ukraine | 30 | 1.02 | 0.66 | n/a |
| mbbs in ukraine | 20 | 0 | 0.33 | n/a |
| study nursing in ukraine | 20 | 0 | 0.14 | n/a |
| study dentistry in ukraine | 10 | 0 | 0 | n/a |
| medical universities in ukraine | 0 | — | 0.18 | n/a |
| medical universities in ukraine for international students | 0 | — | — | n/a |
| mbbs fees in ukraine | 0 | — | 0.33 | n/a |
| dentistry universities in ukraine · nursing universities in ukraine · study pharmacy in ukraine · ternopil national medical university admission · ternopil national medical university fees | 0 | — | — | n/a |
| 8 further seeds (medicine admission…, pharmacy universities…, ukrainian medical university fees, admission requirements…, english medical programmes…, ternopil … courses, how to apply…, documents required…) | **no data returned** | | | |

### 4.3 What this changes (decision-grade)
1. **No new SEO landing pages are justified by current evidence.** The existing 15 indexable URLs already cover every cluster with measurable demand (medicine, MBBS wording, nursing, dentistry). City pages, country pages and more course pages remain unjustified.
2. **"Nursing" (20/mo UK) is as large as "MBBS" and larger than dentistry** — the nursing course page deserves equal content investment, subject to verified programme availability.
3. **Country targeting cannot be decided from one phrase.** The head term is near-zero everywhere; the next cheap step is `phrase_these` (10 units per keyword-database) for 6–8 phrasing variants in `in`, `ng`, `uk`, `za`, `ae` and `pk` (≈400 units) plus `phrase_fullsearch` for "ukraine medical university" in `in` and `uk` (≈20 units per returned line, cap 20 lines each ≈ 800 units). **Requires owner approval — would exceed the 2,000 pilot cap.**
4. **Wartime demand collapse is visible in the data.** The business case should be re-examined against these volumes before major content spend; Search Console actuals (once the site is live) will be the second data source.
5. Metrics SEMrush did not compute (KD, intent) are marked n/a — not estimated.

### 4.4 Follow-up evidence (approved calls, 2026-10-10; raw CSVs `research/semrush/*variants.csv`, `*fullsearch*.csv`)

**Eight phrasing variants, six databases (monthly volume; kd/intent computed only where shown):**

| Phrase | in | ng | uk | za | ae | pk |
|---|---|---|---|---|---|---|
| study medicine in ukraine | 10 | 10 | 30 | 30 | 20 | 0 |
| mbbs in ukraine | **260** (kd 18, inf.) | 10 | 20 | 0 | 10 | 10 |
| ukraine mbbs | **260** (kd 18, inf.; identical metrics → same keyword group) | 10 | 20 | 0 | 10 | 10 |
| mbbs in ukraine fees | **260** (kd 7, inf.) | 0 | 20 | 0 | 20 | 20 |
| medical universities in ukraine | 20 | 20 | 0 | 20 | 20 | 20 |
| ukraine medical university | 20 | 20 | 20 | 20 | 20 | 20 |
| medicine in ukraine | 10 | 10 | 20 | 10 | 10 | 20 |
| study in ukraine (generic) | 20 | 20 | 30 | 20 | 20 | 20 |

**Broad match "ukraine medical", top 18 by volume (India):** applicant-type rows — ukraine medical college 2,900 (kd 22); ukraine medical college fees for indian students 2,900 (kd 9, cpc 0, competition 0); ukraine medical fees 720 (kd 18); ukraine medical college fees 590 (kd 12); medical fees in ukraine 480 (kd 12); best medical college in ukraine 390 (kd 14, mixed intent); cost of medical education in ukraine 320 (kd 11); ukraine medical college list 210 (kd 11). Returnee/news/policy rows — ukraine returned medical students 2,900; ukraine medical students supreme court 880; ukraine medical students news 390; nmc on ukraine medical students 320; ukraine return medical students 260; haryana medical student ukraine 210; ambiguous — ukraine medical students 1,000; ukraine indian medical students 480. Named universities — pirogov medical university ukraine 390 (kd 23); bogomolets national medical university ukraine 320 (kd 28, navigational). All India rows are informational except "best medical college" (mixed).
**Broad match, UK:** humanitarian/aid rows dominate (medical volunteer 70, donate medical supplies 50, plymouth medical aid 50, international medical corps 40, medical supplies 30, medical volunteering 30, puma plymouth 30, donate near me 30, british medic 20, christian medical association 20, combat medic 20 = 390 of 650); named universities (bogomolets 70, "national medical university in kiev" 70, pirogov 40, bukovinian 20); "best medical colleges / schools / university in ukraine" 20 each. kd/intent not computed for any UK row.

### 4.5 Reading the evidence

**Strongest supported opportunities (all on existing URLs):**
1. **Fees/cost cluster → `/tuition-fees/`.** Six Indian phrasings at kd 7–18 (upper bound 5,270/mo; SEMrush groups variants, so not additive) plus "mbbs in ukraine fees" 20/mo in uk, ae, pk. The page exists with the right structure but **publishes no figure** — it cannot rank until at least one fee is verified from an official fee order. Fee schedules therefore become the *first* claims verified for every university.
2. **MBBS vocabulary → `/courses/medicine/`.** "mbbs in ukraine"/"ukraine mbbs" 260/mo in India (26× the "study medicine" phrasing), present at 10–20/mo in uk/ae/pk/ng, absent in za. One URL carries both vocabularies; "MBBS" appears as an explained search term, never as the awarded qualification.
3. **"Medical college / list / best" → `/universities/`.** "ukraine medical college" 2,900 and "college list" 210 (kd 11) vs "medical universities in ukraine" 20. "Best" intent (390 in, 20×3 uk) is answered on the directory with criteria and an explicit *no official ranking* statement — never a ranking page.
4. **Named-university demand sets directory priority:** Vinnytsia NMU ("Pirogov") 390 in / 40 uk; Bogomolets NMU 320 in / 140 uk (two namings); Bukovinian SMU 20 uk. **Ternopil — the brief's focus — measures 0 in uk for both measured phrases and was not measured in in.**

**Misleading or irrelevant terms (never build for):** the Indian returnee/NMC/Supreme Court/news cluster (≈6,440/mo, plus 1,480 ambiguous) — wartime policy demand about students who left Ukraine, forbidden by brief Part 2 rule 3; the UK humanitarian-aid cluster; generic "study in ukraine" (belongs to the sibling project). **"ukraine medical college fees for indian students" (2,900) is a lead, not qualified demand:** cpc 0, competition 0, and it sits in the same 2,900 bucket as the news term; trend data not purchased.

**Country differences:** India is the only database with demand above the lowest buckets and the only one where SEMrush computed kd/intent for applicant terms; India says "medical college", "MBBS", "fees". South Africa uses "study medicine", zero MBBS. UK leads on "study medicine"/"study in ukraine" and named universities. Nigeria, Pakistan, UAE: flat 10–20/mo on generic "medical universities / ukraine medical university" phrasing — **exact-match only; broad match not purchased there, so their ceilings are unmeasured** (in India broad match revealed demand two orders of magnitude above the exact-match seeds).

**Cannibalisation fixed:** the home H1 and `/courses/medicine/` both targeted "study medicine in Ukraine"; the home H1 is now a brand/orientation statement.

**Limitations:** no SERP/competitor data (phrase_organic) for any term; no question or related reports; kd/intent uncomputed outside India/ru; course demand (dentistry/nursing/pharmacy) measured only in uk; no trend/seasonality; no Search Console actuals; SEMrush volumes are estimates. **Refutation status:** the four lens analyses and the merge into 12 recommendations completed; only the fees→`/tuition-fees/` recommendation finished adversarial refutation (not refuted; rationale corrected to exclude the Indian-qualified returnee rows). The remaining recommendations were stopped before refutation to conserve time and are recorded as analyst-level, not adversarially verified.

### 4.6 Actions for existing URLs (no new indexable URL)

| URL | Action | Evidence | Status |
|---|---|---|---|
| `/` | H1 changed to a brand/orientation statement so it no longer competes with `/courses/medicine/` for "study medicine in Ukraine" | cannibalisation rule; uk 30 / za 30 / ru 90 belong to the course page | **Implemented 2026-10-10** |
| `/courses/medicine/` | Added H2 "Searching for 'MBBS in Ukraine'?" explaining the term, that each university sets its own degree title (shown once verified) and that recognition is the home regulator's decision; "MBBS" added to meta description, not to the title until a qualification title is verified | in: mbbs in ukraine 260 (kd 18); uk 20; ae 10; pk 10 | **Implemented** |
| `/universities/` | Title "Medical universities in Ukraine: full list of medical colleges"; intro sentence on Indian/UK naming; H2 "Which is the best medical university in Ukraine?" with *no official ranking* statement and the comparison criteria | in: ukraine medical college 2,900; list 210; best 390; uk best× 20 | **Implemented** |
| `/tuition-fees/` | Title "Medical college fees in Ukraine: tuition & cost of study"; H2s mirroring measured phrasings (by university; MBBS fees; cost of medical education — what a total includes; fees for Indian students stating only what official schedules publish); internal links with varied anchors | fees cluster, kd 7–18 | **Implemented (copy); figures await verified fee orders** |
| `/courses/nursing/` | Bring to parity with dentistry once a nursing programme is verified | uk: study nursing 20 = mbbs 20 > dentistry 10 | Pending verification |
| `/universities/<slug>/` | Verify Vinnytsia (Pirogov), Bogomolets, Bukovinian next; Ternopil stays noindex | named-university rows | Pending official access |
| `/faq/`, `/admissions/`, `/about/`, `/contact/`, `/courses/{dentistry,pharmacy}/`, `/privacy/`, `/terms/` | No keyword-driven change | conversion/trust pages | No change |
| Future `/for-indian-students/` | **Not built.** Trigger: Search Console India impressions on `/tuition-fees/`, regulator requirements from an official document, ≥1 verified fee schedule, admissions feasibility confirmed | — | Trigger recorded |

## 5. Continuous workflow (once access exists)

Monthly: re-pull positions for mapped URLs (Search Console first-party; SEMrush for competitor/gap). Quarterly: review clusters, consolidate or expand, log decisions in `PAGE_ASSET_REGISTER.md`. SEMrush estimates and Search Console actuals are always labelled separately.
