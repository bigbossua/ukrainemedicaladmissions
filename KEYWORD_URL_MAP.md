# KEYWORD_URL_MAP.md

**Evidence status: NO SEMrush DATA EXISTS YET** (0 API units — see `SEMRUSH_API_LEDGER.md`). Every keyword below is an **UNVALIDATED seed**. No volume, difficulty, intent score, country split or competitor figure has been recorded, and none may be inferred from this document.

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

## 4. Validated findings

None yet.

## 5. Continuous workflow (once access exists)

Monthly: re-pull positions for mapped URLs (Search Console first-party; SEMrush for competitor/gap). Quarterly: review clusters, consolidate or expand, log decisions in `PAGE_ASSET_REGISTER.md`. SEMrush estimates and Search Console actuals are always labelled separately.
