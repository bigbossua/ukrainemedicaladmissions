# SEMrush raw exports

Each file is the unmodified CSV returned by the Semrush MCP `execute_report` call logged in `../../SEMRUSH_API_LEDGER.md` (date, report, parameters, metered units). Never edit these files; derive summaries in `KEYWORD_URL_MAP.md`.

Columns follow the SEMrush export names. `keyword_difficulty = 0` and empty `intent` mean SEMrush did not compute the metric for that keyword/database (too little data), not that difficulty is zero.

| File | Report | Database(s) | Units metered |
|---|---|---|---|
| `2026-10-10-phrase_all-study-medicine-in-ukraine.csv` | `phrase_all` | all (91 lines) | 910 |
| `2026-10-10-phrase_these-uk-seeds.csv` | `phrase_these` (20 seeds) | uk | 130 |
