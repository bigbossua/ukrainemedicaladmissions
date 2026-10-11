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
