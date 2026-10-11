# SEMrush raw exports

Each file is the unmodified CSV returned by the Semrush MCP `execute_report` call logged in `../../SEMRUSH_API_LEDGER.md` (date, report, parameters, metered units). Never edit these files; derive summaries in `KEYWORD_URL_MAP.md`.

Columns follow the SEMrush export names. `keyword_difficulty = 0` and empty `intent` mean SEMrush did not compute the metric for that keyword/database (too little data), not that difficulty is zero.

| File | Report | Database(s) | Units metered |
|---|---|---|---|
| `2026-10-10-phrase_all-study-medicine-in-ukraine.csv` | `phrase_all` | all databases returned (79 rows: 35 with volume, 44 zero) | 910 |
| `2026-10-10-phrase_these-uk-seeds.csv` | `phrase_these` (20 seeds) | uk | 130 |
| `2026-10-10-phrase_these-{in,ng,uk,za,ae,pk}-variants.csv` | `phrase_these` (8 phrasing variants) | one file per database | published price 10/line → 80 each; MCP `usage.api_units` reported 520/1040/1040/1120/1120/1120 — see ledger note on that field |
| `2026-10-10-phrase_fullsearch-{in,uk}-ukraine-medical.csv` | `phrase_fullsearch` "ukraine medical", top 18 by volume | in, uk | published price 20/line → 360 each; MCP reported 1200 / 1120 |

Note on `intent` codes (SEMrush): 0 = commercial, 1 = informational, 2 = navigational, 3 = transactional; "1,0" = mixed.

## 2026-10-11 exports (R1 + R2, approved; 850 units in total — see the ledger)

Header style differs from the 2026-10-10 files: the MCP now returns display headers (`Keyword;Search Volume;…;Trends`) and the `Trends` column (12 monthly values normalised to the peak = 1.00, oldest first). Unreturned keywords were **not billed**: each file lists only the lines SEMrush returned; the requested keyword sets are in `../../KEYWORD_URL_MAP.md` §9.

| File | Report · database | Requested → returned lines | Units (10/line, counter-confirmed) |
|---|---|---|---|
| `2026-10-11-probe-phrase_these-in-mbbs-in-ukraine.csv` | `phrase_these` · in | 1 → 1 | 10 |
| `2026-10-11-R1-phrase_these-{in,uk,ng,pk,za,ae}-programme-terms.csv` | `phrase_these` · six databases | 24 → 6 / 6 / 2 / 4 / 3 / 4 | 60 / 60 / 20 / 40 / 30 / 40 |
| `2026-10-11-R2-phrase_these-{in,uk,ng}-universities-cities.csv` | `phrase_these` · in, uk, ng | 30 → 21 / 24 / 14 | 210 / 240 / 140 |

## 2026-10-11 exports — research programme 3 (prefix `P3`; one row per call; `probe` = single-line price check)

| File | Report · db | Lines | Units | What it answers |
|---|---|---|---|---|
| `2026-10-11-P3-probe-phrase_organic-in-mbbs-in-ukraine.csv` | phrase_organic · in | 1 | 10 | price probe (10/line) |
| `2026-10-11-P3-probe-phrase_related-in-mbbs-in-ukraine.csv` | phrase_related · in | 1 | 40 | price probe (40/line); top related = "ukraine medical college" 2,900 |
| `2026-10-11-P3-probe-phrase_questions-in-mbbs-in-ukraine.csv` | phrase_questions · in | 1 | 40 | price probe (40/line) |
| `2026-10-11-P3-probe-phrase_questions-in-ukraine-medical-college.csv` | phrase_questions · in | 1 | 40 | sequential price resolution; top question has 0 volume |
| `2026-10-11-P3-phrase_organic-in-mbbs-in-ukraine.csv` | phrase_organic · in | 10 | 100 | SERP: 10/10 education agencies |
| `2026-10-11-P3-phrase_organic-in-ukraine-medical-college-fees.csv` | phrase_organic · in | 10 | 100 | SERP: agencies + Quora |
| `2026-10-11-P3-phrase_organic-in-ukraine-medical-college.csv` | phrase_organic · in | 10 | 100 | SERP: Wikipedia list #1, agencies, directories |
| `2026-10-11-P3-phrase_organic-in-best-medical-college-in-ukraine.csv` | phrase_organic · in | 10 | 100 | SERP: agencies, Wikipedia, rankings sites, shiksha, YouTube |
| `2026-10-11-P3-phrase_organic-in-bukovinian-state-medical-university.csv` | phrase_organic · in | 10 | 100 | SERP: official site #1/#3/#5, Wikipedia, social, agencies #7–#10 |
| `2026-10-11-P3-phrase_organic-in-ukraine-mbbs-college.csv` | phrase_organic · in | 10 | 100 | SERP for the kd-7 term: agencies + shiksha |
| `2026-10-11-P3-phrase_organic-in-pirogov-medical-university-ukraine.csv` | phrase_organic · in | 10 | 100 | SERP: look-alike domains above the official site |
| `2026-10-11-P3-phrase_these-za-universities.csv` / `-ae-` / `-pk-` | phrase_these · za, ae, pk | 4 / 9 / 9 of 12 | 40 / 90 / 90 | named-university demand outside in/uk/ng (10–40) |
| `2026-10-11-P3-phrase_these-in-study-mbbs-in-ukraine.csv` | phrase_these · in | 1 | 10 | metering check; "study mbbs in ukraine" 40 (spike in the latest month) |
| `2026-10-11-P3-phrase_fullsearch-ng-ukraine-medical.csv` / `-pk-` / `-za-` | phrase_fullsearch · ng, pk, za | 10 each | 200 each | broad ceilings: ng top 40; pk top 40; za top 20 (8 zero-volume rows) |
| `2026-10-11-P3-phrase_questions-in-mbbs-in-ukraine.csv` | phrase_questions · in | 15 | 600 | what students ask: cost, duration, validity (India/Germany/Canada), NEET, how to apply |
| `2026-10-11-P3-phrase_related-in-mbbs-in-ukraine.csv` | phrase_related · in | 20 | 800 | semantic cluster: new low-kd fee/college phrasings |
| `2026-10-11-P3-probe-resource_organic-in-rmcedu-mbbs-in-ukraine.csv` | resource_organic · in | 1 | 10 | price probe (10/line) |
| `2026-10-11-P3-resource_organic-in-rmcedu-mbbs-in-ukraine.csv` | resource_organic · in | 20 | 200 | the top agency page's keyword set and estimated traffic (701/month in total) |

Not returned (0 data, recorded at 0 units): `phrase_related` "mbbs in ukraine fees" (in); `phrase_organic` "mbbs in ukraine fees" (in), "bogomolets national medical university" (uk), "study medicine in ukraine" (uk). SERP feature codes are stored raw; the legend was not re-read in this session.

