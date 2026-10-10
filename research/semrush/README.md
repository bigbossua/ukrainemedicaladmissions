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
