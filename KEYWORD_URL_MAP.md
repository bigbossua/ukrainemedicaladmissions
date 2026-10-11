# KEYWORD_URL_MAP.md

**Evidence status (2026-10-11): SEMrush data from 2026-10-10 (§4) and from the approved R1/R2 batch of 2026-10-11 (§6.1, §11, §12); raw exports in `research/semrush/`** — see §4 and `research/semrush/`. Seeds are marked *validated* only where a SEMrush figure now exists; everything else remains **UNVALIDATED**.

## 1. Seed clusters → canonical URL (one URL per intent)

| Cluster (intent) | Seed phrases (validated where §4 gives a figure; else unvalidated) | Canonical URL | Status |
|---|---|---|---|
| Study medicine / MBBS in Ukraine (informational) | study medicine in Ukraine (uk 30, za 30, ru 90, in 10); mbbs in ukraine / ukraine mbbs (in 260, uk 20); medicine admission in Ukraine (no data) | `/courses/medicine/` | Built; MBBS explainer added |
| Medical universities / colleges in Ukraine, list, "best" (comparison) | ukraine medical college (in 2,900); medical college list (in 210); best medical college/university/schools (in 390; uk 20×3); medical universities in ukraine (20 in ng/za/ae/pk/in; uk 0); ukraine medical university (20 in all six) | `/universities/` | Built; college wording + no-ranking section added |
| Named university (navigational) | pirogov medical university ukraine (in 390, uk 40); bogomolets national medical university ukraine (in 320, uk 70) + national medical university in kiev (uk 70); bukovinian state medical university ukraine (uk 20); **ternopil national medical university — in 110 (kd 16), uk 20, ng 20; fees in 10 (R2, 2026-10-11); uk admission/fees phrasings 0 (2026-10-10)** | `/universities/<slug>/` | Ternopil built, noindex; others not yet created |
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
ru 90 (KD 15, intent 1=informational — the only database where SEMrush computed KD/intent) · uk 30 (CPC £1.02, competition 0.66) · cl 30 · cz 30 · dk 30 · hu 30 · jp 30 · mx 30 · za 30 · zw 30 · ae 20 · au 20 · ca 20 · de 20 · it 20 · kr 20 · ma 20 · se 20 · tr 20 · us 20 · in 10 · ng 10 · ar/bg/es/fi/fr/gr/ie/nl/no/pl/ro/sg/ua 10 · **0 in 44 databases incl. pk, bd, gh, eg, sa, qa, my** (volume 0 returned); `lk` was not returned at all (no data — distinct from 0). *(Corrected 2026-10-11 after audit; earlier text said 45 and listed lk.)*

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
4. **Named-university demand sets directory priority:** Vinnytsia NMU ("Pirogov") 390 in / 40 uk; Bogomolets NMU 320 in / 140 uk (two namings); Bukovinian SMU 20 uk. **Ternopil — the brief's focus — measures 0 in uk for both measured phrases and was not measured in in.** *(Superseded 2026-10-11: the official name measures 110/mo in India at kd 16, uk 20, ng 20 — §6.1, §11.)*

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
| `/universities/<slug>/` | Order revised 2026-10-11 (§8; `UNIVERSITY_DATA_REGISTER.md` §9): Bukovinian → Vinnytsia → Odesa → Bogomolets → Ivano-Frankivsk → Uzhhorod → Ternopil (indexed once verified); Kharkiv gated | named-university rows | Pending official access |
| `/faq/`, `/admissions/`, `/about/`, `/contact/`, `/courses/{dentistry,pharmacy}/`, `/privacy/`, `/terms/` | No keyword-driven change | conversion/trust pages | No change |
| Future `/for-indian-students/` | **Not built.** Trigger: Search Console India impressions on `/tuition-fees/`, regulator requirements from an official document, ≥1 verified fee schedule, admissions feasibility confirmed | — | Trigger recorded |

## 5. Continuous workflow (once access exists)

Monthly: re-pull positions for mapped URLs (Search Console first-party; SEMrush for competitor/gap). Quarterly: review clusters, consolidate or expand, log decisions in `PAGE_ASSET_REGISTER.md`. SEMrush estimates and Search Console actuals are always labelled separately.

---

## 6. Country comparison (Phase B-A) — from the exports that exist, 2026-10-11

**Data compatibility, stated once:** `phrase_all` and `phrase_these` are **exact-phrase** monthly volumes (SEMrush "phrase match" of the exact wording); `phrase_fullsearch` is **broad match** ("keyword contains the phrase") and returns SEMrush's grouped keywords, so its rows are a different population and **not additive** with the exact-phrase rows or with each other. `keyword_difficulty = 0` with an empty `intent` means *not computed*. No SERP or competitor report has been purchased for any market; trend data exists only in the 2026-10-11 exports (§6.1). All figures are SEMrush estimates retrieved 2026-10-10; Search Console actuals do not yet exist.

| Market (database) | Exact phrases measured (volume/mo) | Broad match "ukraine medical" | Course terms | Named universities | kd / intent | What is **not** measured | Tier (evidence-based) |
|---|---|---|---|---|---|---|---|
| **India (in)** | study medicine in ukraine 10 · mbbs in ukraine 260 · ukraine mbbs 260 · mbbs in ukraine fees 260 · medical universities in ukraine 20 · ukraine medical university 20 · medicine in ukraine 10 · study in ukraine 20 | ukraine medical college 2,900 (kd 22) · …college fees for indian students 2,900 (kd 9; cpc 0; competition 0 — lead) · ukraine medical fees 720 (18) · ukraine medical college fees 590 (12) · medical fees in ukraine 480 (12) · best medical college in ukraine 390 (14, mixed) · cost of medical education in ukraine 320 (11) · ukraine medical college list 210 (11); returnee/news rows ≈6,440 excluded | not measured | pirogov medical university ukraine 390 (kd 23) · bogomolets national medical university ukraine 320 (kd 28, navigational) | computed for most rows (kd 7–30; intent informational) | SERPs (programme terms, city terms, university names and trends were added on 2026-10-11 — §6.1) | **1 — only market with measured applicant demand above the lowest buckets and the only one where SEMrush computed kd/intent** |
| **United Kingdom (uk)** | study medicine in ukraine 30 (cpc 1.02, comp. 0.66) · mbbs in ukraine 20 · ukraine mbbs 20 · mbbs in ukraine fees 20 · medical universities in ukraine 0 · ukraine medical university 20 · medicine in ukraine 20 · study in ukraine 30 | humanitarian/aid rows ≈390 of 650 excluded; bogomolets 70 + "national medical university in kiev ukraine" 70 · pirogov 40 · bukovinian 20 · best medical colleges/schools/university 20 each | study nursing in ukraine 20 · study dentistry in ukraine 10 · study pharmacy in ukraine 0 · nursing/dentistry universities in ukraine 0 | as broad match | not computed for any row | trends; SERPs; nothing below 10/mo is reported | **2 — small but measured, English-language, the only market with course-term data** |
| **South Africa (za)** | study medicine in ukraine 30 · mbbs/ukraine mbbs/fees 0 · medical universities 20 · ukraine medical university 20 · medicine in ukraine 10 · study in ukraine 20 | not purchased | not measured | not measured | not computed | broad match, courses, universities | **3 — "study medicine" phrasing only; ceiling unknown** |
| **UAE (ae)** | study medicine 20 · mbbs 10 · ukraine mbbs 10 · mbbs fees 20 · medical universities 20 · ukraine medical university 20 · medicine in ukraine 10 · study in ukraine 20 | not purchased | not measured | not measured | not computed | as za | **3** |
| **Pakistan (pk)** | study medicine 0 · mbbs 10 · ukraine mbbs 10 · mbbs fees 20 · medical universities 20 · ukraine medical university 20 · medicine in ukraine 20 · study in ukraine 20 | not purchased | not measured | not measured | not computed | as za | **3** |
| **Nigeria (ng)** | study medicine 10 · mbbs 10 · ukraine mbbs 10 · mbbs fees 0 · medical universities 20 · ukraine medical university 20 · medicine in ukraine 10 · study in ukraine 20 | not purchased | not measured | not measured | not computed | as za — **historically a large source market; its broad-match ceiling is unmeasured, so it is not rejected** | **3 → 2b after R2 (§6.1: eight university names at 10–30/mo)** |
| Russia (ru) | study medicine in ukraine 90 (kd 15, informational) | — | — | — | computed | everything else | **Excluded** — not a served market; language |
| 30/mo single-phrase markets: cl, cz, dk, hu, jp, mx, zw; 20/mo: au, ca, de, it, kr, ma, se, tr, us | one exact phrase each | — | — | — | not computed | everything else | **Unranked** — one data point each; several are non-English-first markets where the English phrase under-measures demand |

**Reading.** Measured English-language demand is small everywhere. India is the only market where SEMrush shows applicant intent at scale and with computed difficulty; its vocabulary is "medical college", "MBBS", "fees". The UK is the only market with course-level data (nursing = MBBS = 20 > dentistry 10 > pharmacy 0). Every other market has eight exact phrases at 0–30/mo and nothing else — **that is an evidence gap, not evidence of no market**. The recommended research (§9) measures broad match in ng, pk, za and ae before any country is dropped or promoted.

### 6.1 Additions from R1 + R2 (retrieved 2026-10-11; `phrase_these`, exact phrase, monthly volume; kd/intent where SEMrush computed them; 12-month trend normalised to peak = 1.00)

**Named universities (exact official-style name; "<name> fees" in brackets):**

| University | India (in) | UK (uk) | Nigeria (ng) | kd · intent (in) |
|---|---|---|---|---|
| Bukovinian State Medical University | **480** (fees 20) | 20 (fees 0) | 30 (fees 0) | kd 30 · informational + transactional |
| Odessa National Medical University | **390** (fees 20) | 20 (fees 0) | 20 (fees 0) | kd 16 · informational |
| Kharkiv National Medical University | **390** (fees 20) | 20 (fees 10) | 10 (fees 20) | kd 34 · navigational |
| Bogomolets National Medical University | **320** (fees 30) | **90** (fees 0) | 20 (fees 30) | kd 25 · navigational |
| Ivano Frankivsk National Medical University | 210 (fees 30) | 20 (fees 0) | 20 (fees 0) | kd 29 · navigational |
| Uzhhorod National University | 140 (fees 10) | 20 (fees 0) | 20 (fees: no data) | kd 30 · navigational |
| Ternopil National Medical University | **110** (fees 10) | 20 (fees 0) | 20 (fees: no data) | kd 16 · navigational |
| Zaporizhzhia State Medical University | 90 (fees: no data) | 20 (fees: no data) | no data | not computed |
| Vinnytsia National Medical University | 50 (fees: no data) — plus "pirogov medical university ukraine" 390 (2026-10-10 broad match, kd 23) | 0 | no data | not computed |
| Lviv National Medical University | 50 (fees 20) | 20 (fees 0) | 30 (fees 0) | not computed |
| Poltava State Medical University | 20 (fees 10) | 20 (fees 0) | no data | not computed |
| Dnipro State Medical University | 20 (fees: no data) | 20 (fees 0) | no data | not computed |
| City phrases ("medical university in kyiv/kharkiv/lviv/odessa/dnipro/vinnytsia") | no data for any | lviv 20; kyiv 0; others no data | no data | — |

**Programme, requirement and recognition terms (24 requested per market; only returned lines shown — "—" = not returned = no data, not billed):**

| Term | in | uk | ng | pk | za | ae |
|---|---|---|---|---|---|---|
| study dentistry in ukraine | **30** | 10 | — | 0 | — | 0 |
| mbbs in ukraine eligibility | **30** | 0 | 0 | 0 | 0 | 0 |
| mbbs in ukraine for indian students | 20 (cpc 0.36) | 0 | — | 0 | — | 0 |
| is ukraine mbbs valid in india | 20 (trend: single spike in month 11) | 0 | 0 | 0 | 0 | 0 |
| study nursing in ukraine | 0 | **20** | — | — | 0 | — |
| public health in ukraine | 0 | 10 | — | — | — | — |
| bsn / msn / nursing for international students; mph / master of public health; physiotherapy / physical therapy / physical rehabilitation; sports science; preparatory course / foundation year / without biology; admission requirements / documents required; mbbs in ukraine 2026; dentistry fees; pharmacy for international students; english medium medical university | **not returned in any of the six databases** | | | | | |

**Trend note:** "mbbs in ukraine" (in) rises through the series to a peak in month 9 and stays high (0.67–1.00 in months 7–12); the large university names in India are flat-to-high across all twelve months; "is ukraine mbbs valid in india" is a one-month spike (news-driven). SEMrush trends are relative indices, not volumes.

**What changes in the country tiers:** India stays Tier 1 and the picture broadens — twelve university names carry 20–480/mo each, far more than the generic phrases. The UK stays Tier 2 (Bogomolets 90, ten other names 20 each, Vinnytsia's official name 0, nursing 20, public health 10). **Nigeria gains its first measured demand beyond generic phrases**: eight university names at 10–30/mo and "bogomolets … fees" 30 — upgraded to **Tier 2b (measured named-university interest, exact match only)**. Pakistan, South Africa and the UAE returned zero for every programme term and were not in R2, so they remain Tier 3/unmeasured. **No SERP or competitor evidence exists** (R3–R5 not run); kd and intent are available only where SEMrush computed them (the seven larger names in India).

## 7. Master keyword-to-URL register (every indexable URL considered; expanded programme and university clusters included)

Field key: **Evidence** = report · database · retrieval date (`research/semrush/`); **Demand/Difficulty** exactly as exported, *n/a* = not computed, *unavailable* = not purchased; **SERP evidence**: no SERP or competitor report has been purchased for any term — every row says so; **Action** ∈ improve · consolidate · retain · consider new page · defer · reject.

| # | Keyword / cluster | Market | Evidence | Demand | Difficulty | Intent | SERP evidence | Existing URL | Recommended action | Business value | Evidence gap | Decision rationale |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | study medicine in ukraine (head) | uk, za, ae, in, ng, pk (+ru, others) | phrase_all + phrase_these · 2026-10-10 | uk 30 · za 30 · ae 20 · in 10 · ng 10 · pk 0 · ru 90 | n/a (ru 15) | informational (ru only computed) | unavailable | `/courses/medicine/` | **retain** as canonical; improve with verified programme facts | Entry point for the largest service line → profile → apply | SERP/competitors; trend | Covered by one URL; home H1 already de-conflicted |
| 2 | mbbs in ukraine · ukraine mbbs | in, uk, ae, pk, ng | phrase_these · 2026-10-10 | in 260 (both) · uk 20 · ae 10 · pk 10 · ng 10 · za 0 | in 18 | informational | unavailable | `/courses/medicine/` (MBBS explainer H2) | **retain + improve** (explainer exists; add verified qualification titles per university) | Same journey as #1; India vocabulary | SERP; what Indian applicants expect on-page | Same intent as #1 — separate page would cannibalise |
| 3 | fees / cost cluster: mbbs in ukraine fees · ukraine medical fees · ukraine medical college fees · medical fees in ukraine · cost of medical education in ukraine · …fees for indian students | in (uk, ae, pk for "mbbs in ukraine fees") | phrase_these + phrase_fullsearch (in) · 2026-10-10 | in 260 · 720 · 590 · 480 · 320 · 2,900 (lead) · uk/ae/pk 20 | in 7 · 18 · 12 · 12 · 11 · 9 | informational | unavailable | `/tuition-fees/` | **improve** — publish verified, dated fee schedules per university; nothing else can make this page rank | Highest-intent informational cluster; parents and applicants budgeting → apply | ≥1 verified fee order (blocked: official sites unreachable); SERP | Lowest kd in the dataset; page exists with the right structure but no figures |
| 4 | ukraine medical college · ukraine medical college list · best medical college in ukraine (+ uk "best…" ×3) | in, uk | phrase_fullsearch · 2026-10-10 | in 2,900 · 210 · 390 · uk 20 ×3 | in 22 · 11 · 14 | informational / mixed | unavailable | `/universities/` | **improve** — comparison framework (§ UNIVERSITY_DATA_REGISTER §7), more verified institutions, explicit no-ranking stance | Directory is the shortlisting step → profile → apply | Verified institutions (currently 0 publishable); SERP | "Best" intent answered with criteria, never a ranking |
| 5 | medical universities in ukraine · ukraine medical university | in, ng, uk, za, ae, pk | phrase_these · 2026-10-10 | 20 in each (uk 0 for the first) | n/a | n/a | unavailable | `/universities/` | **retain** | As #4 | broad match in ng/za/ae/pk | Same intent as #4 |
| 6 | named universities (12 measured): bukovinian 480 · odessa 390 · kharkiv 390 · bogomolets 320 · ivano frankivsk 210 · uzhhorod 140 · ternopil 110 · zaporizhzhia 90 · vinnytsia 50 (+ pirogov 390) · lviv 50 · poltava 20 · dnipro 20; "<name> fees" 10–30 | in (uk 0–90; ng 10–30) | phrase_these R2 · 2026-10-11 (+ phrase_fullsearch 2026-10-10) | see §6.1 | in: 16 (odessa, ternopil) · 25 (bogomolets) · 29 (ivano) · 30 (bukovinian, uzhhorod) · 34 (kharkiv) | navigational (most); bukovinian informational + transactional; odessa informational | unavailable | none except Ternopil (noindex) | **consider new page** — one verified profile each, in the order of `UNIVERSITY_DATA_REGISTER.md` §9 (demand × verifiability × operating conditions) | Named-university demand converts closest to an application; the fees sub-intent (10–30) lives on the profile and `/tuition-fees/`, never as separate fee pages | Official verification (blocked); SERP (official sites likely rank first — we target the admissions-for-internationals sub-intent) | The only demand-backed new URLs in the dataset; twelve measured, not two |
| 7 | ternopil national medical university (+ fees) | in, uk, ng | phrase_these R2 · 2026-10-11 (uk seeds 2026-10-10: admission/fees phrasings 0) | **in 110 (fees 10) · uk 20 · ng 20** | in 16 | navigational | unavailable | `/universities/ternopil-national-medical-university/` (noindex) | **retain noindex until verified, then index** — the template profile has measured demand after all | Pilot profile with the richest official leads and the joint-lowest kd among the names (16, with Odesa) | verification (official pages) | Correction to the 2026-10-10 reading ("0 demand" was UK-only); India demand is 110/mo |
| 8 | admission requirements / eligibility / documents: mbbs in ukraine eligibility · ukraine medical university admission requirements · documents required for mbbs in ukraine | in (uk, ng, pk, za, ae) | phrase_these R1 · 2026-10-11 | **in 30 (eligibility)**; requirements/documents phrasings: no data anywhere; eligibility 0 in uk/ng/pk/za/ae | n/a | n/a | unavailable | `/admissions/` | **improve** — eligibility/readiness states and verified per-programme requirements (candidate-profile service) | Core of the service; every applicant passes through | verified requirements | Small measured demand confirms the eligibility framing; conversion page first |
| 9 | study dentistry in ukraine (+ dentistry in ukraine fees) | in, uk (pk, ae 0; ng, za no data) | phrase_these R1 · 2026-10-11 (+ uk 2026-10-10) | **in 30 · uk 10**; fees phrasing: no data | n/a | n/a | unavailable | `/courses/dentistry/` | **retain; improve with verified programmes** (now India-evidenced) | Secondary service line | supply verification | Small but measured in the Tier-1 market |
| 10 | study nursing in ukraine · bsn in ukraine · msn in ukraine · nursing in ukraine for international students | in, uk, ng, pk, za, ae | phrase_these R1 · 2026-10-11 | **uk 20; in 0; za 0; others not returned; BSN/MSN/"for international students": not returned anywhere** | n/a | n/a | unavailable | `/courses/nursing/` | **retain; improve only when a programme is verified — low priority** | UK-only micro-demand; no India demand for nursing phrasings | supply verification (English-track leads: Kharkiv, Ternopil) | Measured demand does not justify content investment ahead of the profiles |
| 11 | study pharmacy in ukraine · pharmacy universities in ukraine | uk | phrase_these · 2026-10-10 | uk 0 · no data | n/a | n/a | unavailable | `/courses/pharmacy/` | **retain (thin)** — R1 returned nothing for "pharmacy in ukraine for international students" in any database; consolidate into `/courses/` if no verified English programme by the next review (§12) | Weakest service line | demand in other markets; supply | Avoid a thin page living on no evidence |
| 12 | public health in ukraine · mph in ukraine · master of public health ukraine | in, uk, ng, pk, za, ae | phrase_these R1 · 2026-10-11 | **uk 10; in 0; mph/master phrasings: not returned anywhere** | n/a | n/a | unavailable | none | **defer (confirmed)** | Possible postgraduate line, no measured demand | supply (Ukrainian-language only) | No page on near-zero evidence |
| 13 | physiotherapy in ukraine · physical therapy ukraine university · physical rehabilitation ukraine | in, uk, ng, pk, za, ae | phrase_these R1 · 2026-10-11 | **not returned in any database** | — | — | unavailable | none | **defer (confirmed)** | None measured | supply Ukrainian-language; recognition undocumented | Zero measured demand |
| 14 | sports science ukraine university | in, uk, ng, pk, za, ae | phrase_these R1 · 2026-10-11 | **not returned in any database** | — | — | unavailable | none | **reject (confirmed)** | None | — | Zero demand, no medical-university supply |
| 15 | preparatory course ukraine medicine · foundation year ukraine medical · medical university ukraine without biology | in, uk, ng, pk, za, ae | phrase_these R1 · 2026-10-11 | **not returned in any database** | — | — | unavailable | none (`/admissions/` closest) | **improve `/admissions/` with a verified preparatory-routes section; no page** (no search demand to carry one) | High student value inside the readiness service, not as an acquisition page | supply verification (12 departments found) | Zero measured search demand; the value is in the service |
| 16 | english medical programmes in ukraine · medical universities in ukraine for international students | uk | phrase_these · 2026-10-10 | no data · 0 | n/a | n/a | unavailable | `/universities/` (language filter) | **retain filter; no page** | — | — | No distinct measured intent |
| 17 | ukraine medical college fees for indian students · mbbs in ukraine for indian students (country-specific) | in | phrase_fullsearch 2026-10-10 · phrase_these R1 2026-10-11 | 2,900 (lead; cpc 0) · **20 (cpc 0.36)** | 9 · n/a | informational (2,900 row); not computed (20 row) | unavailable | `/tuition-fees/` ("Fees for Indian students" H2) | **improve existing**; **defer** dedicated page — trigger unchanged | Largest single lead; the exact country phrasing is small | trend; SERP; regulator source | The exact "for indian students" phrasing is 20/mo — no page |
| 18 | city terms: medical university in kyiv / kharkiv / lviv / odessa / dnipro / vinnytsia | in, uk, ng | phrase_these R2 · 2026-10-11 | **in: not returned for any; uk: lviv 20, kyiv 0; ng: not returned** | — | — | unavailable | none | **reject (confirmed)** — cities stay as directory filters | — | — | Earlier audit's "11 city pages" failure mode, now evidenced |
| 19 | ukraine returned medical students · supreme court · nmc · news · haryana (returnee/policy) | in | phrase_fullsearch · 2026-10-10 | ≈6,440 + 1,480 ambiguous | 22–30 | informational | unavailable | none | **reject** | None — not applicants; brief forbids | — | Excluded intent |
| 20 | medical volunteer / supplies / aid ukraine | uk | phrase_fullsearch · 2026-10-10 | ≈390 | n/a | n/a | unavailable | none | **reject** | None | — | Excluded intent |
| 21 | study in ukraine (generic) | all six | phrase_these · 2026-10-10 | 20–30 | n/a | n/a | unavailable | none | **reject** (sibling project; not medical) | None | — | Out of scope |
| 22 | is ukraine mbbs valid in india (recognition, applicant-side) | in (uk, ng, pk, za, ae 0) | phrase_these R1 · 2026-10-11 | **in 20** (news-driven single-month spike) | n/a | n/a | unavailable | `/faq/` | **improve `/faq/` only with an official regulator source** | Trust; decisive question for Indian families | official regulator document | Small, spiky demand; high trust value |
| 23 | brand, services, about, contact, FAQ, legal (`/`, `/services/`, `/about/`, `/contact/`, `/faq/`, `/privacy/`, `/terms/`, `/complaints-policy/`, `/disclosure/`, `/apply/`) | — | — | n/a | — | navigational / transactional | — | each exists | **retain**; conversion and trust roles; `/services/` keeps legacy equity | Conversion, trust, compliance | — | Not keyword pages |

**Cannibalisation review:** #1/#2 share one URL by design; #4/#5 share one URL; nursing wording variants share #10; no two indexable URLs target the same cluster. **Thin-page watch:** `/courses/pharmacy/` (#11) and `/courses/` index are the thinnest indexable pages; neither is removed before R1 data exists.

## 8. Proposed money-page register (hypotheses with decisions — not an approved build list)

| # | Candidate | Target cluster | Market · intent | Demand / competition evidence | Audience | Practical information provided | Distinction from existing pages | Route to **Apply Online Now** | Verified facts needed first | Legitimate-revenue link | **Decision** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | `/tuition-fees/` (existing) | #3 fees/cost | in (uk/ae/pk) · informational | in 260–720 at kd 7–18; 2,900 lead | Applicants and parents budgeting | Verified, dated fee schedules per university and programme; what a total year costs includes; payment timing | None — it is the page | Fee row → university profile → `/apply/` prefilled | ≥1 official fee order per listed university (blocked by network policy) | Readiness-to-pay signal; the service fee is explained separately | **Improve (P0 content once verification is possible)** |
| M2 | `/courses/medicine/` (existing) | #1 + #2 | in, uk, za, ae · informational | in 260 (kd 18); uk 30/20; za 30 | Medicine applicants | Which universities teach medicine in English, qualification title, duration, requirements — all verified | None | Course → directory filter → profile → apply | Programme titles, language, duration per university | Largest service line | **Improve (P1)** |
| M3 | `/universities/` (existing) | #4 + #5 | in, uk, +4 · informational/mixed | in 2,900 (kd 22), 210 (11), 390 (14) | Shortlisting applicants | Fair comparison framework (verified facts, "unavailable" shown honestly), filters, no ranking | None | Card → profile → apply | ≥3 publishable profiles | Directory is the funnel's widest step | **Improve (P1)** |
| M4 | `/universities/vinnytsia-national-pirogov-memorial-medical-university/` (new) | #6 | in 390 (pirogov, kd 23) + 50 (official name), uk 40/0 · informational | second-strongest named-university demand | Applicants considering Vinnytsia | Programmes, language, requirements, fees, deadlines, preparatory route — verified, dated | First publishable profile beyond the template | Programme CTA → `/apply/?university=…` | Everything in §UNIVERSITY_DATA_REGISTER §3 | Named demand close to application | **Approve for planning — rank 2 — build only after verification** |
| M5 | `/universities/bogomolets-national-medical-university/` (new) | #6 | in 320 (kd 25, navigational; fees 30), uk 90 (+70+70 broad), ng 20 (fees 30) | strongest UK and Nigeria name; navigational share means the official site wins the head term — we serve the "admissions for internationals" sub-intent | As M4 | As M4 | As M4 | As M4 | As M4 | As M4 | **Approve for planning — after verification** |
| M6 | `/universities/bukovinian-state-medical-university/` (new) | #6 | **in 480 (kd 30, informational + transactional; fees 20)**, uk 20, ng 30 | **largest named-university demand in the dataset; the only name with a transactional intent flag; English-track preparatory course documented** | As M4 | As M4 | As M4 | As M4 | As M4 | As M4 | **Approve for planning — rank 1** |
| M7 | `/courses/nursing/` (existing) | #10 | uk 20; in 0; BSN/MSN not returned · intent not computed | UK micro-demand only | Nursing applicants | Exact award titles, level, language, eligibility — verified; distinction from medical qualifications | None | Course → directory → apply | Supply verification (`PROGRAMME_SUPPLY_REGISTER.md`) | Second service line if English programmes exist | **Retain; improve only on verified supply — P3 (demoted 2026-10-11)** |
| M8 | `/admissions/` (existing) | #8 + #15 | in 30 ("mbbs in ukraine eligibility", R1) · intent not computed | small measured demand (R1, 2026-10-11); preparatory phrasings not returned | Ready-to-apply and under-prepared applicants | Document-readiness states; verified per-programme requirements; preparatory routes where verified | None | Checklist → `/apply/` (profile) | Verified requirements and preparatory routes | Core of the paid service | **Improve (P0 product, independent of SEO)** |
| M9 | Preparatory / foundation resource (new) | #15 | not returned in any of six databases (R1) | none | Applicants with low marks or missing science subjects | Who is eligible, duration, subjects, language, progression conditions — verified; no guarantees | New intent (readiness) | → profile with gap analysis | ≥2 universities' official preparatory pages; R1 demand | Differentiating service for the largest under-served group | **Defer — build the `/admissions/` section first; page only if R1 + supply support it** |
| M10 | `/for-indian-students/` (new) | #17 + #22 | in · informational | 2,900 lead (unqualified) · exact "mbbs in ukraine for indian students" 20 (R1) | Indian applicants and parents | Regulator rules from the official document, fees, eligibility | Country framing | → `/tuition-fees/` → apply | Regulator document; ≥1 fee; GSC India signal | Largest lead market | **Defer — trigger recorded** |
| M11 | Public health / MPH page (new) | #12 | uk 10, in 0, MPH not returned | near-zero | Graduates | — | — | — | Supply + demand | Postgraduate line | **Defer** |
| M12 | Physiotherapy / rehabilitation page (new) | #13 | not returned in six databases | none | — | — | — | — | Supply + demand + recognition facts | — | **Defer** |
| M13 | University comparison page (separate) | #4 | — | — | — | — | Overlaps `/universities/` | — | — | — | **Reject — comparison lives on `/universities/`** |
| M14 | City pages | #18 | in: none; uk lviv 20 | none | — | — | Thin variants | — | — | — | **Reject (fold into directory filters)** |
| M15 | Standalone "MBBS in Ukraine" page | #2 | in 260 | same intent as medicine | — | — | Cannibalises M2 | — | — | — | **Reject (consolidated into M2)** |

| M16 | `/universities/odesa-national-medical-university/` (new) | #6 | in 390 (kd 16, informational; fees 20), uk 20, ng 20 | lowest difficulty among the large names; official 2026 fee page and intake window exist to verify against | Applicants considering Odesa | As M4 | As M4 | As M4 | As M4 | As M4 | **Approve for planning — rank 3 (added 2026-10-11)** |
| M17 | `/universities/ivano-frankivsk-national-medical-university/` (new) | #6 | in 210 (kd 29, navigational; fees 30), uk 20, ng 20 | richest official documentation found (2025 fee table, 2026 rules) | As M4 | As M4 | As M4 | As M4 | As M4 | As M4 | **Approve for planning — rank 5 (added 2026-10-11)** |
| M18 | `/universities/uzhhorod-national-university/` (new) | #6 | in 140 (kd 30, navigational; fees 10), uk 20, ng 20 | broadest health-sciences supply; western region | As M4 | As M4 | As M4 | As M4 | As M4 | As M4 | **Approve for planning — rank 6 (added 2026-10-11)** |
| M19 | `/universities/ternopil-national-medical-university/` (existing, noindex) | #7 | in 110 (kd 16, navigational; fees 10), uk 20, ng 20 | template profile; richest leads incl. a 2025/26 fee table | As M4 | As M4 | Already built | As M4 | As M4 | As M4 | **Approve for indexing after verification — rank 7 (was retain-noindex)** |
| M20 | `/universities/kharkiv-national-medical-university/` (new) | #6 | in 390 (kd 34, navigational; fees 20), uk 20 (fees 10), ng 10 (fees 20) | high demand, highest difficulty; **operating-conditions gate** (front-line region) | As M4 | As M4 | As M4 | As M4 | dated official statement on format and location + the standard set | As M4 | **Conditional — rank 4 by demand, deferred until the operating check passes** |
| M21 | Zaporizhzhia, Lviv, Poltava, Dnipro profiles | #6 | in 90 · 50 · 20 · 20 | small demand; Zaporizhzhia has the Berehove location question | — | — | — | — | — | — | **Defer** |
Order of work implied (revised 2026-10-11): M8 and M1 (product and verification), then M2/M3, then profiles in demand-and-verifiability order **M6 Bukovinian → M4 Vinnytsia → M16 Odesa → M5 Bogomolets → M17 Ivano-Frankivsk → M18 Uzhhorod → M19 Ternopil**, with M20 Kharkiv once its operating conditions are confirmed; M7 nursing only on verified supply; everything marked defer stays deferred.

## 9. Costed SEMrush research request — R1+R2 EXECUTED 2026-10-11 for 850 units (cap 2,340; see `SEMRUSH_API_LEDGER.md` and §11); R3–R5 NOT approved and not run. The preamble below is the pre-execution text, kept for the record

Prices: `phrase_these` 10 units/line and `phrase_fullsearch` 20 units/line are the published per-line prices recorded in the ledger. Prices for `phrase_organic`, `phrase_related`, `phrase_questions` and `domain_organic` are **assumptions to be confirmed on Semrush's API pricing page before approval** (assumed 10/line for organic reports, 40/line for related/questions). Cumulative spend so far: 2,240 units; the brief's preservation floor (48,000 of 50,000) is already crossed by 240 units if the screenshot balance was current, so **every request below exceeds the original cap and needs explicit approval**. Each line can be approved separately.

| Req. | Report · databases | Keyword set | Lines | Estimated units | What it decides |
|---|---|---|---|---|---|
| R1 | `phrase_these` · in, uk, ng, pk, za, ae | 24 exact phrases: study nursing in ukraine · bsn in ukraine · nursing in ukraine for international students · msn in ukraine · public health in ukraine · mph in ukraine · master of public health ukraine · physiotherapy in ukraine · physical therapy ukraine university · physical rehabilitation ukraine · sports science ukraine university · preparatory course ukraine medicine · foundation year ukraine medical · medical university ukraine without biology · mbbs in ukraine eligibility · ukraine medical university admission requirements · documents required for mbbs in ukraine · mbbs in ukraine for indian students · is ukraine mbbs valid in india · mbbs in ukraine 2026 · study dentistry in ukraine · dentistry in ukraine fees · pharmacy in ukraine for international students · english medium medical university ukraine | 24 × 6 = 144 | **1,440** | Whether any expanded programme, preparatory, requirements or recognition cluster has measurable demand in any market (#8–#15, #22) |
| R2 | `phrase_these` · in, uk, ng | 12 universities × 2 phrasings ("<name> ukraine", "<name> fees") + 6 city phrases ("medical university kyiv/kharkiv/lviv/odesa/dnipro/vinnytsia") | 30 × 3 = 90 | **900** | Expansion order of the directory (M4–M6 and beyond); city intent (#18) |
| R3 | `phrase_fullsearch` · ng, pk, za, ae | "ukraine medical", display_limit 18, volume desc | 18 × 4 = 72 | **1,440** | Whether the broad-match ceilings in the Tier-3 markets resemble India's; the only way to rank those countries fairly |
| R4 | `phrase_organic` (SERP top 10) · in, uk | mbbs in ukraine · ukraine medical college fees · best medical college in ukraine · study medicine in ukraine · pirogov medical university ukraine · study nursing in ukraine | 6 × 10 × 2 = 120 | **≈1,200 (assumed 10/line)** | Who ranks (universities, agencies, directories, news), page types rewarded, realism for a new site |
| R5 | `domain_organic` · in | top 3 competitor domains revealed by R4 | 3 × 50 | **≈1,500 (assumed 10/line)** | Competitor keyword sets → gaps and improvement targets for existing URLs |
| **Minimum viable** | R1 + R2 | | | **2,340** | Enough to decide the programme and university expansion questions in this document |
| **Full** | R1–R5 | | | **≈6,480 (R4/R5 prices assumed)** | Adds SERP realism and competitor gaps |

Metered usage will be recorded per call in `SEMRUSH_API_LEDGER.md`; raw CSVs saved under `research/semrush/`; no page is created from this data without passing through §7.

## 10. Review 2026-10-11 (evening) — no new SEMrush data; supply evidence re-read against the registers

- *(Superseded later the same day by §11: R1/R2 were then executed for 850 units.)* At the time of this review R1/R2 were authorised conditionally but not executed (balance unverifiable from this environment); no demand figure in this file had changed.
- **Page opportunities reconsidered against the new supply evidence (`PROGRAMME_SUPPLY_REGISTER.md`):**
  - #10 nursing → **improve `/courses/nursing/` stands**, strengthened: official-domain English-track leads at Kharkiv and Ternopil, Ukrainian-language bachelors at Uzhhorod, Bukovinian, Vinnytsia, Odesa, Poltava, Ivano-Frankivsk. Still no new page; still nothing publishable until verified.
  - #12 public health → **defer stands**: eleven programmes found, all Ukrainian-taught in official snippets; Bogomolets explicitly excludes it from its 2026 foreign-citizen intake; no "MPH" award anywhere.
  - #13 physiotherapy → **defer stands**: supply is broad but Ukrainian-language; the only English claim is a private institution's marketing page; recognition route undocumented.
  - #14 sport → **reject stands** (no medical-university supply; specialist universities only).
  - #15 preparatory → **improve `/admissions/` stands and is now well-founded**: official preparatory departments at 12 of 12 universities, with differing certificates and progression wording that must be quoted per university; only one English-track course (Bukovinian). A dedicated page still waits for R1 demand data.
  - #6 named universities → the expansion order in `UNIVERSITY_DATA_REGISTER.md` §9 gains Uzhhorod (7), Zaporizhzhia (8), Dnipro (9); no new URL until verification.
- **No new SEO page is proposed.**

## 11. Review 2026-10-11 (late) — R1 + R2 results and what they change

**Spend:** 850 units (probe 10, R1 250, R2 590) against the 2,340 cap; balance expected 47,040. Raw exports `research/semrush/2026-10-11-*.csv`; §6.1, §7 and §8 updated in place; §9 keyword sets unchanged.

**What changed**
1. **University profiles are the main SEO opportunity, and there are twelve of them, not two.** India searches the official names of all twelve universities (20–480/mo), with Bukovinian (480, informational + transactional), Odessa (390, kd 16), Kharkiv (390, kd 34), Bogomolets (320) and Ivano-Frankivsk (210) at the top. The money-page register now approves seven profiles for planning in demand-and-verifiability order (M6, M4, M16, M5, M17, M18, M19), holds Kharkiv behind an operating-conditions check, and defers the four smallest.
2. **Ternopil correction.** The 2026-10-10 "0 measured demand" applied to UK admission/fees phrasings only; the official name draws 110/mo in India at kd 16. The template profile should be indexed once verified (M19).
3. **Nigeria has measurable named-university interest** (eight names at 10–30/mo) — enough to keep Nigeria in the content plan as a secondary English market (Tier 2b); not enough for country-specific pages.
4. **Programme pages are demoted, not promoted.** Nursing: UK 20, India 0, BSN/MSN not returned anywhere → `/courses/nursing/` is retained but drops to P3. Public health: UK 10 only → defer confirmed. Physiotherapy, sport, preparatory/foundation, "without biology", requirements/documents phrasings, "english medium", "mbbs in ukraine 2026": **not returned in any of six databases** → defer/reject confirmed; preparatory routes stay a section of `/admissions/` (student value, not search value).
5. **Small confirmations in the Tier-1 market:** "study dentistry in ukraine" 30, "mbbs in ukraine eligibility" 30, "mbbs in ukraine for indian students" 20, "is ukraine mbbs valid in india" 20 (spike) — they support improving `/courses/dentistry/`, `/admissions/` (eligibility framing) and `/faq/` (regulator-sourced recognition answer); none justifies a new URL.
6. **Fee phrasing per university is 10–30/mo** → fees belong on each profile and on `/tuition-fees/`; no separate fee pages.
7. **City pages rejected with evidence** (no India data; UK "medical university in lviv" 20 only).

**What did not change:** no new SEO page is approved; `/tuition-fees/` remains the first content priority and still cannot rank without verified figures; India wording leads; the UK is second; Pakistan, South Africa and the UAE remain unmeasured for university names (not in R2) and zero for programme terms. **No SERP or competitor evidence exists** — R3–R5 were not run; difficulty is known only for the seven larger Indian name queries (16–34).

**Trend caveat:** SEMrush trends are relative monthly indices; the large university names are steady across the year in India, so there is no seasonal window to plan around; "mbbs in ukraine" peaks in months 7–12 of the series.

## 12. Programme-family opportunity matrix (2026-10-11; one line per family — the decision-grade summary)

Evidence classes used in this table: **M** = measured SEMrush estimate (exact phrase, `phrase_these`, 2026-10-10/11, raw CSV in `research/semrush/`); **L** = lead from an official-domain search snippet (unverified; `PROGRAMME_SUPPLY_REGISTER.md`); **A** = assumption or analyst judgement. Nothing in this table is a verified university fact.

| Family | Demand (M) | Supply (L) | Existing URL | Decision |
|---|---|---|---|---|
| Medicine (incl. MBBS wording) | in: mbbs in ukraine 260 (kd 18), eligibility 30, for indian students 20, valid in india 20; broad "ukraine medical college" 2,900 (kd 22); uk study medicine 30; za 30 | English-medium integrated master's for foreigners at 11 of 12 swept universities (Dnipro: no official snippet) | `/courses/medicine/`, `/universities/`, `/tuition-fees/`, `/admissions/`, `/faq/` | **Improve existing pages**; profiles carry the programme detail (M4–M20) |
| Dentistry | in 30 · uk 10; fees phrasing not returned | English-medium master's at most swept universities | `/courses/dentistry/` | **Retain; improve with verified programmes** |
| Pharmacy | uk 0 (2026-10-10); "pharmacy in ukraine for international students" not returned anywhere | master's at most universities; English at 6 (official snippets) | `/courses/pharmacy/` | **Retain (thin); consolidate into `/courses/` if no verified English programme by the next review** |
| Nursing | uk 20 · in 0 · za 0; BSN / MSN / "for international students" not returned anywhere | bachelors at 9 universities (Ukrainian docs); English-track leads only at Kharkiv and Ternopil; no award named "BSN/MSN" | `/courses/nursing/` | **Retain; improve only on verified supply (P3)**; never use BSN/MSN as award names |
| Public health | uk 10 · in 0; MPH phrasings not returned | master's at ≥10 universities, Ukrainian-taught in every official snippet; several new/unaccredited; Bogomolets excludes it for foreigners (2026) | none | **Defer** |
| Physical training / sport (017 → A7) | not returned in any database | no medical-university degree; specialist universities only | none | **Reject** |
| Rehabilitation / physical therapy (227 → "Терапія та реабілітація") | not returned in any database | bachelor/master at ≥10 universities, Ukrainian-language; recognition route undocumented | none | **Defer** |
| Preparatory / foundation | not returned in any database (incl. "without biology") | preparatory departments at 12 of 12 universities; certificate and progression wording differ; only Bukovinian English-track | `/admissions/` (section to add) | **Improve `/admissions/` with verified per-university routes; no page** |

Reading for the business: measured search demand concentrates on **medicine wording, fees and university names**; the broader health-science families have real supply but no measured English-language search demand in any of six databases, so they belong inside the candidate-profile service (as options a candidate can choose and be assessed against), not as acquisition pages.
