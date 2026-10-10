# KEYWORD_URL_MAP.md

**Evidence status (2026-10-10): first genuine SEMrush data retrieved** — see §4 and `research/semrush/`. Seeds are marked *validated* only where a SEMrush figure now exists; everything else remains **UNVALIDATED**.

## 1. Seed clusters → canonical URL (one URL per intent)

| Cluster (intent) | Seed phrases (unvalidated) | Canonical URL | Status |
|---|---|---|---|
| Study medicine in Ukraine (informational → commercial) | study medicine in Ukraine; medicine admission in Ukraine; MBBS in Ukraine* | `/courses/medicine/` | Built |
| Medical universities in Ukraine (navigational/comparison) | medical universities in Ukraine; medical universities in Ukraine for international students | `/universities/` | Built |
| Named university admissions | Ternopil National Medical University admission / fees / courses | `/universities/ternopil-national-medical-university/` | Built, noindex until verified |
| Fees (commercial) | MBBS fees in Ukraine*; Ukrainian medical university fees | `/tuition-fees/` | Built |
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

## 5. Continuous workflow (once access exists)

Monthly: re-pull positions for mapped URLs (Search Console first-party; SEMrush for competitor/gap). Quarterly: review clusters, consolidate or expand, log decisions in `PAGE_ASSET_REGISTER.md`. SEMrush estimates and Search Console actuals are always labelled separately.
