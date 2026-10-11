# SEMRUSH_API_LEDGER.md

Every material SEMrush API request is recorded here. No keys or credentials are stored in this file.

**Budget rule (brief):** initial research cap 2,000 Standard API units; preserve ≥48,000 unless the owner approves otherwise. Treated as a ceiling only if the allowance is authorised *and available*.
**Last observed balance (owner screenshot, date unknown):** 50,000 Standard API units.
**Balance observed via the MCP integration:** 0 usable units until the owner re-authorised the connector on 2026-10-10 (toast "Connected to Semrush"); after that, calls succeed. The MCP reports units *metered per call* (`metadata.usage.api_units`) but never the remaining balance — owner to confirm balance on the API Units page.

## Request log

| Date | Endpoint / tool | Parameters | Purpose | Unit cost | Result | Balance after |
|---|---|---|---|---|---|---|
| 2026-10-10 | `domain_overview` (discovery) | none | List reports before any paid call | 0 | `no_api_units` (trace 4cd290fe…) | 0 |
| 2026-10-10 | `organic_research` (discovery) | none | Same | 0 | `no_api_units` (trace 63363b8f…) | 0 |
| 2026-10-10 | `keyword_research` (discovery) | none | Same | 0 | `no_api_units` (trace bd8ab198…) | 0 |
| 2026-10-10 (later session) | `keyword_research` (discovery) | none | Single re-check after time elapsed | 0 | `no_api_units` (trace e398e801…) | 0 |
| 2026-10-10 (later session) | `projects` (discovery) | none | Different endpoint family — test whether project tools have a separate allowance | 0 | `no_api_units` (trace a3ce5143…) | 0 |
| 2026-10-10 (investigation) | `get_report_schema(phrase_all)` | report=phrase_all | Cheapest possible Standard-API call to get the precise error on a specific report | 0 | `no_api_units` (trace fb632a09…) | 0 |
| 2026-10-10 **after reconnect** | `get_report_schema(phrase_all)` | report=phrase_all | Confirm access | 0 | **Schema returned — access working** | unknown |
| 2026-10-10 | `keyword_research` discovery; `get_report_schema` ×2 (`phrase_this`, `phrase_fullsearch`) | — | Choose reports, check parameters | 0 | OK | unknown |
| 2026-10-10 | `execute_report phrase_all` | phrase="study medicine in ukraine"; columns database,keyword,volume,cpc,competitive_density,results,keyword_difficulty,intent | Country-demand evidence (Part 9) | **910 metered** for 79 returned rows (≈11.5/row; estimate was ≈300 — the report returns zero-volume databases too) | `research/semrush/2026-10-10-phrase_all-study-medicine-in-ukraine.csv` | unknown (≈49,000 if balance was 50,000) |
| 2026-10-10 | `execute_report phrase_these` | database=uk; 20 seed phrases; columns + keyword_difficulty, intent | Validate seed keywords (Part 8) | **130 metered** (12 lines with data; 8 seeds had no data) | `research/semrush/2026-10-10-phrase_these-uk-seeds.csv` | unknown (≈48,860) |
| 2026-10-10 (approved follow-up) | `execute_report phrase_these` | database=in; 8 variants (study medicine in ukraine; mbbs in ukraine; medical universities in ukraine; study in ukraine; ukraine medical university; medicine in ukraine; mbbs in ukraine fees; ukraine mbbs); columns + kd, intent | Country targeting (Part 9) | published 10/line × 8 = **80**; MCP `usage.api_units` field returned 520 | `research/semrush/2026-10-10-phrase_these-in-variants.csv` | unknown |
| 2026-10-10 | `execute_report phrase_these` | database=ng; same 8 variants | same | published **80**; MCP field 1040 | `…phrase_these-ng-variants.csv` | unknown |
| 2026-10-10 | `execute_report phrase_these` | database=uk; same 8 variants | same | published **80**; MCP field 1040 | `…phrase_these-uk-variants.csv` | unknown |
| 2026-10-10 | `execute_report phrase_these` | database=za; same 8 variants | same | published **80**; MCP field 1120 | `…phrase_these-za-variants.csv` | unknown |
| 2026-10-10 | `execute_report phrase_these` | database=ae; same 8 variants | same | published **80**; MCP field 1120 | `…phrase_these-ae-variants.csv` | unknown |
| 2026-10-10 | `execute_report phrase_these` | database=pk; same 8 variants | same | published **80**; MCP field 1120 | `…phrase_these-pk-variants.csv` | unknown |
| 2026-10-10 | `execute_report phrase_fullsearch` | database=in; phrase="ukraine medical"; display_limit=18; sort volume_desc; columns + kd, intent | How Indian applicants phrase searches; cluster discovery (Part 8) | published 20/line × 18 = **360**; MCP field 1200 | `…phrase_fullsearch-in-ukraine-medical.csv` | unknown |
| 2026-10-10 | `execute_report phrase_fullsearch` | database=uk; same | Same for UK | published **360**; MCP field 1120 | `…phrase_fullsearch-uk-ukraine-medical.csv` | unknown |

**Units spent — two readings, to be settled by the owner reading the API Units page:**

| Reading | Pilot (2 calls) | Approved follow-up (8 calls, run in parallel) | Cumulative |
|---|---|---|---|
| A — SEMrush published per-line prices | 1,040 | 6 × 80 + 2 × 360 = **1,200** (exactly the approved amount) | **2,240** |
| B — MCP `metadata.usage.api_units` taken as a per-call cost | 1,040 | 520+1040+1040+1120+1120+1120+1200+1120 = 8,280 | 9,320 |

Reading B is almost certainly wrong: six identical 8-line requests reported six different values, so the field cannot be a per-call price; the values rise toward exactly 1,200 — the published-price total for the batch — which fits a running counter observed at different moments by concurrent calls. Earlier sequential calls (910 for 79 rows ≈ 11.5/row; 130 for 12 rows ≈ 10.8/row) were close to, not exactly at, the published 10-per-line price. **Working assumption: Reading A (balance ≈ 50,000 − 2,240 = 47,760 if the owner's screenshot balance was current). This is an assumption until the owner confirms the balance; no further paid call will be made before that confirmation.**

**Lesson recorded:** `phrase_all` bills every regional database returned (79 rows here) even when volume is 0 — use `phrase_this`/`phrase_these` with explicit databases for all further country checks (10 units per keyword-database).

## Export validation and usage-field investigation (offline, 2026-10-10)

**Validation (script run over `research/semrush/*.csv`; no API calls):** all 10 files have the expected header, column count, zero duplicate keyword/database keys and zero malformed rows; overlapping keyword/database pairs (166 across files, e.g. uk "study medicine in ukraine" in three files) agree exactly. Row counts match the recorded queries: 6 variant files × 8, 2 broad-match files × 18, uk seeds 12 (8 seeds returned no row), `phrase_all` 79 rows — the complete API response (79 database rows: 35 with volume > 0, 44 with volume 0). The earlier note "91 lines" was an inference from 910 ÷ 10 units, not an observation, and is withdrawn: 910 units for 79 rows means the per-row price of `phrase_all` with the requested columns was ≈11.5, or the usage figure included something else — either way the published 10-per-line price is an approximation for this report.

**`metadata.usage.api_units` investigation.** Observed values: sequential calls 910 (79 rows, phrase_all) and 130 (12 rows, phrase_these); eight parallel calls 520, 1040, 1040, 1120, 1120, 1120, 1200, 1120. Facts: (1) six requests with identical shape (8 rows each) reported six different values — the field is not a per-request price; (2) the values are non-decreasing in completion order and end at 1,200, which equals the published-price sum for the batch (6 × 80 + 2 × 360); (3) the two sequential calls were within ~15% of published prices, consistent with per-row metering plus a small per-request component. **Conclusion: the field is a running total of units consumed within the batch/session as observed at the moment each call completed, not a per-call cost.** The current account balance cannot be inferred from these figures and is not inferred here; only the owner's API Units page shows it.

**Budget position (published prices):** 1,040 + 1,200 = **2,240 units consumed in total**. If the owner's screenshot balance (50,000) was current before the first call, the balance is now ≈47,760, i.e. **240 units below the brief's 48,000-unit preservation floor**; the owner's approval of the ≈1,200 follow-up implied this, but it is recorded explicitly. No further paid call without a cost estimate and explicit approval.

## Connector investigation (2026-10-10, after owner's screenshot showing 50,000 units)

| Fact | Status | Evidence |
|---|---|---|
| Owner's account shows Standard API balance 50,000, subscription active, next payment 17 Oct 2026, £193.50/month | VERIFIED (owner screenshot of semrush.com/accounts/subscription-info/api-units) | — |
| This Claude workspace has exactly one SEMrush connector: the official Semrush MCP, OAuth (`isAuthless: false`), `installState: connected`, enabled in chat | VERIFIED | `ListConnectors` |
| The MCP exposes no resource or tool revealing which SEMrush login it is authorised as | VERIFIED | `ListMcpResources` → none |
| The connector supports the Standard-API toolkits the brief needs (keyword, organic, domain, competitors, backlinks) | VERIFIED | tool list |
| Every call, including a zero-cost schema fetch, returns `no_api_units` | VERIFIED | 6 traces |
| Qualifying plans (Semrush One Starter, Pro+, SEO Classic Pro, Guru) include 50,000 MCP API units refreshing on the renewal date; the units are a pool shared by every AI tool connected to that account | REPORTED (Semrush KB 1618/1619 via search; pages unreachable directly) | — |
| Trial accounts: sources conflict; most say a trial of a qualifying plan includes MCP access | UNVERIFIED | — |

**Conclusion:** the plan is not the blocker. The connector is drawing from a balance that is empty, while the login in the owner's browser shows 50,000. Only two explanations fit: (a) the connector is authorised to a different SEMrush login; (b) same login, but the MCP unit pool for this cycle is exhausted by other connected tools/sessions while the subscription page shows the allocation. Which one applies is visible only at semrush.com/mcp-access, Authorized Applications and Query log for the owner's login.

## Access investigation (2026-10-10)

| Route | Finding |
|---|---|
| SEMrush MCP integration in this environment | VERIFIED connected to an account with an **active subscription and 0 API units**. Every toolkit (domain, organic, keyword, projects) returns the same error. |
| Authenticated SEMrush browser interface | Not available from the cloud environment (no browser tools attached to this session). |
| Existing exports / datasets in repo or uploads | None exist. |
| Account/usage logs | Not accessible via the MCP; the error carries no balance figure. |
| Same account as the 50,000-unit screenshot? | **UNVERIFIED.** The MCP's key may belong to a different login, or the 50,000 may be a plan quota rather than purchased API units. Only the owner can see this at https://www.semrush.com/mcp-access. |

**Smallest action to resolve:** owner opens https://www.semrush.com/mcp-access while logged in to the account that showed 50,000 units and confirms (a) the API-unit balance and (b) that the MCP connection is linked to that account. No purchase, upgrade or billing change is requested.

## Original pilot plan (superseded by the executed pilot above)

1. `get_report_schema` for `phrase_all` / keyword overview → note per-line cost from the schema.
2. Keyword overview for the 20 seed phrases (`KEYWORD_URL_MAP.md`) in database `uk` first, then `in`, `ng`, `pk`, `gh`, `ke`, `za`, `bd`, `ae` **only if** the UK run shows the metric set is useful.
3. `domain_overview` + `organic_research` for the production domain (baseline).
4. Record each call here with cost and output location (`research/semrush/YYYY-MM-DD-<report>.csv`).
5. Stop and report at 200 units; continue only on approval.

## 2026-10-11 — R1 + R2 conditionally authorised; NOT executed (pre-flight condition unmet)

**Owner's instruction:** run R1 and R2 only, capped at 2,340 units, *provided the available balance and actual cost are verified before execution*; otherwise stop and report the blocker. No R3–R5, no purchase.

| Pre-flight item | Result | Label |
|---|---|---|
| Price per line | Semrush's developer documentation prices the Keyword Overview reports (`phrase_this`, `phrase_all`) at **10 API units per line** (snippet: "10 API units per line"; a historical 50-unit price is also shown, so prices change) — [developer.semrush.com keyword reports](https://developer.semrush.com/api/v3/analytics/keyword-reports/). The MCP's batch form `phrase_these` metered 130 units for 12 returned lines on 2026-10-10 (≈10.8/line) and 80 per 8-line call at published prices. **R1 (144 lines) + R2 (90 lines) = 234 lines ⇒ 2,340 units at 10/line; a per-request overhead like the 2026-10-10 pilot's could add ≈8%.** | VERIFIED (published price, snippet) / observed metering recorded |
| Available balance | **Cannot be read from this environment.** The MCP returns no balance field (only a running usage counter), exposes no account tool, and the API-units page requires the owner's login; the Semrush API key must never be handled here. Last reading: the owner's screenshot (50,000 units, date unknown) before 2,240 units were consumed. | **UNVERIFIED — blocker** |
| Authorisation | Given for R1+R2 ≤ 2,340 units, conditional on the two items above. | VERIFIED (owner message 2026-10-11) |

**Decision:** stopped before any call. **Units spent this session: 0.** Cumulative remains **2,240** (published prices).

**What unblocks execution (owner, two minutes):** open Semrush → Subscription info → API units, and tell me the current Standard API balance figure (a screenshot or the number). If it is ≥ 2,340 + the margin you want to keep, execution proceeds as below.

**Execution plan once the balance is confirmed (no changes to R1/R2 keyword sets in `KEYWORD_URL_MAP.md` §9):**
1. Probe: one `phrase_these` call, 1 keyword × 1 database (`in`, "mbbs in ukraine", a known-data row) — expected ≈10 units; its `metadata.usage.api_units` is read as the actual per-line price (sequential call, so the counter equals the call).
2. If the probe meters > 15 units/line, stop and report; otherwise run R1 as six sequential `phrase_these` calls (one per database, 24 keywords each) and R2 as three sequential calls (`in`, `uk`, `ng`; 30 keywords each), recording the counter after every call; hard stop if cumulative metered usage for the batch reaches 2,340.
3. Save every CSV under `research/semrush/2026-10-11-*.csv`, validate (header, row count, duplicates), update `KEYWORD_URL_MAP.md` §6–§7 and this ledger with metered usage per call.

## 2026-10-11 — Balance reconciliation (owner's API Units page: 47,890 remaining)

| Item | Value | Label |
|---|---|---|
| Owner's current balance | **47,890** Standard API units (screenshot of Subscription info → API units, 2026-10-11) | VERIFIED (owner) |
| Starting allowance | 50,000 (owner's earlier screenshot) | VERIFIED (owner) |
| **Actual units consumed to date** | **50,000 − 47,890 = 2,110** | VERIFIED |
| Ledger's running total before this entry | 2,240 (Reading A: observed 910 + observed 130 + *published-price estimate* 1,200 for the eight parallel follow-up calls) | superseded |
| Discrepancy | **130 units over-stated** | explained below |

**Where the 130 comes from.** Two calls were *observed* (910 for `phrase_all`; 130 for the uk-seeds `phrase_these`) and the eight follow-up calls were *estimated* at published prices (1,200) because their `metadata.usage.api_units` readings (520 → 1,200) had been identified as a running counter rather than per-call costs. The only arithmetic consistent with the verified balance is: the counter in that session was cumulative **including the earlier uk-seeds call (130)** that ran in the same connector session, so the counter's final value 1,200 = 130 (uk seeds) + **1,070 (the eight follow-up calls together)**; with `phrase_all` (910) having run in a separate session: 910 + 130 + 1,070 = **2,110** — exactly the verified figure. The per-call split of the 1,070 cannot be recovered after the fact (zero-volume lines may not have been billed; `phrase_fullsearch` may have billed fewer lines than 20/line); the batch total is what the balance proves.

**Corrections applied:** cumulative consumption is now **2,110 (VERIFIED)**; the eight follow-up calls are re-stated as **1,070 in total (derived from the verified balance), not 1,200**; the "running counter" conclusion stands, refined to *cumulative within a connector session*. From this entry on, each call's cost is recorded as the **counter delta within the session** and the session total is reconciled against the owner's next balance reading.

**Position before the approved research:** 47,890 available; approved spend ≤ 2,340 (R1 + R2) plus a 10-unit probe; the brief's 48,000 preservation floor was already crossed before this phase and the owner has explicitly approved the spend; expected balance after the phase ≈ 45,540 if the full cap is used.

## 2026-10-11 — R1 + R2 executed (approved; cap 2,340) — **850 units used**

Pre-flight satisfied: balance 47,890 confirmed by the owner; price confirmed by the probe below. All calls `phrase_these`, columns `keyword,volume,cpc,competitive_density,results,keyword_difficulty,intent,trend`. Raw CSVs: `research/semrush/2026-10-11-*.csv`.

| # | Call | Requested → returned lines | `metadata.usage.api_units` reading | Cost recorded | Notes |
|---|---|---|---|---|---|
| 1 | probe · in · "mbbs in ukraine" | 1 → 1 | 10 | **10** | sequential; confirms 10 units per returned line and the earlier 260/kd 18 figure |
| 2 | R1 · in · 24 programme terms | 24 → 6 | 60 | **60** | sequential; 18 keywords with no data were **not billed** |
| 3 | R1 · uk | 24 → 6 | 60 | **60** | sequential (reading equals this call's cost, not a cumulative total) |
| 4 | R1 · ng | 24 → 2 | 20 | **20** | |
| 5 | R1 · pk | 24 → 4 | 40 | **40** | |
| 6 | R1 · za | 24 → 3 | 30 | **30** | |
| 7 | R1 · ae | 24 → 4 | 40 | **40** | |
| 8 | R2 · in · 12 universities × 2 + 6 cities | 30 → 21 | 210 | **210** | |
| 9 | R2 · uk | 30 → 24 | 240 | **240** | |
| 10 | R2 · ng | 30 → 14 | 140 | **140** | |
| | **Total this phase** | 234 requested → 85 returned | | **850** | cap 2,340 — 1,490 unused; R3–R5 not run |

**Expected balance after this phase: 47,890 − 850 = 47,040** — to be confirmed by the owner's next reading of the API Units page; any difference is recorded here.

**Counter semantics — corrected observation.** On every sequential call today the `usage.api_units` reading equalled that call's own cost (10 × returned lines) and did **not** accumulate across calls (readings 10, 60, 60, 20, 40, 30, 40, 210, 240, 140). The 2026-10-10 parallel-batch readings (520 … 1,200 for 8- and 18-line requests) therefore remain anomalous — most plausibly the field reported an in-flight aggregate while eight requests ran concurrently — and the per-call attribution for that batch is unrecoverable; the verified total (2,110 before today) governs, as recorded in the reconciliation above. Rule from now on: **run metered calls sequentially and read the counter after each.**

**Cumulative consumption: 2,110 (verified) + 850 (this phase) = 2,960 units; balance expected 47,040.**
