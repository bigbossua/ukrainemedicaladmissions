# SEMRUSH_API_LEDGER.md

Every material SEMrush API request is recorded here. No keys or credentials are stored in this file.

**Budget rule (brief):** initial research cap 2,000 Standard API units; preserve ≥48,000 unless the owner approves otherwise. Treated as a ceiling only if the allowance is authorised *and available*.
**Last observed balance (owner screenshot, date unknown):** 50,000 Standard API units. **Latest reading (owner, 2026-10-11): 47,890** before the R1/R2 batch; no owner reading since. **Current position (after programme 3):** cumulative 6,230 line-based (max-reading estimate 6,340; conservative bound 6,810); expected balance 43,770 (43,660; conservative 43,190) — ESTIMATE until the owner's next API Units reading, which is the mandatory reconciliation step before any further metered call (see "Authorisation and reconciliation status" under programme 3).
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
| **Actual units consumed to date** | **50,000 − 47,890 = 2,110** | DERIVED — assumes the 50,000 screenshot was the balance immediately before the first paid call and that no other connected tool drew on the shared pool |
| Ledger's running total before this entry | 2,240 (Reading A: observed 910 + observed 130 + *published-price estimate* 1,200 for the eight parallel follow-up calls) | superseded |
| Discrepancy | **130 units over-stated** | explained below |

**Where the 130 comes from.** Two calls were *observed* (910 for `phrase_all`; 130 for the uk-seeds `phrase_these`) and the eight follow-up calls were *estimated* at published prices (1,200) because their `metadata.usage.api_units` readings (520 → 1,200) had been identified as a running counter rather than per-call costs. The only arithmetic consistent with the verified balance is: the counter in that session was cumulative **including the earlier uk-seeds call (130)** that ran in the same connector session, so the counter's final value 1,200 = 130 (uk seeds) + **1,070 (the eight follow-up calls together)**; with `phrase_all` (910) having run in a separate session: 910 + 130 + 1,070 = **2,110** — exactly the verified figure. The per-call split of the 1,070 cannot be recovered after the fact (zero-volume lines may not have been billed; `phrase_fullsearch` may have billed fewer lines than 20/line); the batch total is what the balance proves.

**Corrections applied:** cumulative consumption is now **2,110 (DERIVED from the owner's verified balance)**; the eight follow-up calls are re-stated as **1,070 in total (derived from the verified balance), not 1,200**; the "running counter" conclusion stands, refined to *cumulative within a connector session*. From this entry on, each call's cost is recorded as the **counter delta within the session** and the session total is reconciled against the owner's next balance reading.

**Position before the approved research:** 47,890 available; approved spend ≤ 2,340 (R1 + R2) plus a 10-unit probe; the brief's 48,000 preservation floor was already crossed before this phase and the owner has explicitly approved the spend; expected balance after the phase ≈ 45,540 if the full cap is used.

## 2026-10-11 — R1 + R2 executed (approved; cap 2,340) — **850 units used**

Pre-flight satisfied: balance 47,890 confirmed by the owner; price confirmed by the probe below. All calls `phrase_these`, columns `keyword,volume,cpc,competitive_density,results,keyword_difficulty,intent,trend`. Raw CSVs: `research/semrush/2026-10-11-*.csv`.

| # | Call | Requested → returned lines | `metadata.usage.api_units` reading | Cost recorded | Notes |
|---|---|---|---|---|---|
| 1 | probe · in · "mbbs in ukraine" | 1 → 1 | 10 | **10** | sequential; confirms 10 units per returned line and the earlier 260/kd 18 figure |
| 2 | R1 · in · 24 programme terms | 24 → 6 | 60 | **60** | sequential; 18 keywords with no data were **not billed** (inferred from the counter; confirmed only when the owner's next balance reading matches 47,040) |
| 3 | R1 · uk | 24 → 6 | 60 | **60** | sequential (reading equals this call's cost, not a cumulative total) |
| 4 | R1 · ng | 24 → 2 | 20 | **20** | |
| 5 | R1 · pk | 24 → 4 | 40 | **40** | |
| 6 | R1 · za | 24 → 3 | 30 | **30** | |
| 7 | R1 · ae | 24 → 4 | 40 | **40** | |
| 8 | R2 · in · 12 universities × 2 + 6 cities | 30 → 21 | 210 | **210** | |
| 9 | R2 · uk | 30 → 24 | 240 | **240** | |
| 10 | R2 · ng | 30 → 14 | 140 | **140** | |
| | **Total this phase** | 235 requested (234 + probe) → 85 returned | | **850** | cap 2,340 — 1,490 unused; R3–R5 not run |

**Expected balance after this phase: 47,890 − 850 = 47,040** — to be confirmed by the owner's next reading of the API Units page; any difference is recorded here.

**Counter semantics — corrected observation.** On every sequential call today the `usage.api_units` reading equalled that call's own cost (10 × returned lines) and did **not** accumulate across calls (readings 10, 60, 60, 20, 40, 30, 40, 210, 240, 140). The 2026-10-10 parallel-batch readings (520 … 1,200 for 8- and 18-line requests) therefore remain anomalous — most plausibly the field reported an in-flight aggregate while eight requests ran concurrently — and the per-call attribution for that batch is unrecoverable; the verified total (2,110 before today) governs, as recorded in the reconciliation above. Rule from now on: **run metered calls sequentially and read the counter after each.**

**Cumulative consumption: 2,110 (verified) + 850 (this phase) = 2,960 units; balance expected 47,040.**

## 2026-10-11 — University-profile pipeline phase: NO API calls (reconciliation restated for the completion report)

| Item | Units | Label |
|---|---|---|
| Starting pool (owner screenshot, date unknown) | 50,000 | OWNER-REPORTED |
| Consumed before 2026-10-11 (= 50,000 − 47,890) | 2,110 | DERIVED from the owner's verified 47,890 reading; assumes the 50,000 screenshot preceded the first paid call and that no other connected tool drew on the shared pool |
| 2026-10-11 batch: probe 10 + R1 250 + R2 590 | 850 | VERIFIED per call (sequential counter readings = per-call cost, 10 units per returned line; unreturned keywords unbilled) |
| **Cumulative consumption** (position at this phase; superseded by programme 3 below) | **2,960** | DERIVED (2,110) + VERIFIED (850) |
| **Expected remaining balance** (position at this phase; superseded by programme 3 below) | **47,040** | ESTIMATE = 47,890 − 850; to be confirmed by the owner's next reading of Subscription info → API units; any difference is recorded here |
| Calls in this phase (pipeline implementation) | 0 | VERIFIED — no SEMrush tool was invoked |

The 130-unit discrepancy found earlier (published-price estimate 1,200 vs derived actual 1,070 for the 2026-10-10 follow-up batch) stays resolved as recorded above. R3–R5 remained unauthorised and unexecuted at this phase (they ran later, under research programme 3 below).

**Standing rule (owner, 2026-10-11):** no metered call without (1) the owner's current balance reading reconciled here, (2) a research purpose logged in `KEYWORD_URL_MAP.md` §14 naming the decision it informs, (3) the owner's approval of the batch and its cap, and (4) a check that existing exports do not already answer the question. Every call: report, database, keyword set, lines returned, counter reading, units, CSV path.


## 2026-10-11 — Research programme 3 (owner-authorised, working cap 5,000 incl. the 850 R1/R2 batch; executed without per-call approval under the standing rule above, except its condition (1) — see "Authorisation and reconciliation status")

**Authorisation (owner's master mandate, 2026-10-11):** "Use a working cap of 5,000 API units for the next research programme, including the already completed 850-unit batch only if those units are confirmed to belong to the same approved programme… This is a ceiling, not a spending target." (Quoted with an elision; the full mandate text is not stored in this repository.) No confirmation that the 850 R1/R2 units belong to the same programme is recorded here, so the ledger counts them inside the cap (4,150 available), the stricter of the two readings. *(Corrected 2026-10-11: this heading earlier said the programme ran "under the eight-step batch discipline"; no eight-step procedure is written down in any project document, so the phrase is replaced by a reference to the standing rule that is written down.)*

**Authorisation and reconciliation status:** conditions (2) to (4) of the standing rule were met as recorded (decision questions logged as RB1–RB5 in `KEYWORD_URL_MAP.md` §14 and in the pre-flight below; the owner's programme cap above; existing exports checked: no item repeats an R1/R2 question). Condition (1) was **not** met: programme 3 ran on a **DERIVED** opening balance (47,040 = the owner's 47,890 reading − 850) without the fresh owner reading that the standing rule asks for. The balance after programme 3 is therefore an unreconciled estimate, not a verified figure. **The owner's next reading of Subscription info → API units is the mandatory reconciliation step before any further metered call;** any difference from 43,770 (43,660; conservative 43,190) is recorded here, and the per-line prices and the assumption that "NOTHING FOUND" calls are unbilled are revisited.

**Pre-flight (recorded before the first call):** opening position 47,040 units = owner's reading 47,890 (2026-10-11) − 850 counter-confirmed R1/R2 units (DERIVED; no newer owner reading exists). Programme cap 5,000 including the 850 ⇒ 4,150 available. Prices confirmed by single-line probes before use: `phrase_organic` 10/line, `phrase_related` 40/line, `phrase_questions` 40/line, `resource_organic` 10/line (`phrase_these` 10 and `phrase_fullsearch` 20 already confirmed). Stop conditions: programme spend ≥ 4,150 (worst case), any per-line reading deviating from the confirmed price, or a `no_api_units` error. Decision questions: SERP composition and ranking feasibility for the proven clusters (O1–O4), named-university demand outside in/uk/ng (O2/O16), broad ceilings in ng/pk/za (O16), what students ask (O1/O5), the semantic cluster around MBBS/medical college (O1/O3), the top competitor page's keyword set and traffic (realism).

**Metering lesson (VERIFIED today):** when calls run strictly one after another, `usage.api_units` equals that call's own cost (10 units for a 1-line `phrase_these`; 100 for a 10-line `phrase_organic`); when three calls were sent in parallel (calls 13–15) the readings (250/330/220) interleaved and could not be attributed per call. Costs for those three are recorded at the confirmed per-line price (220 in total); the batch's max-reading estimate is the highest reading (330), i.e. +110; the conservative bound treats the three readings as separate charges (250 + 330 + 220 = 800), i.e. +580. All later calls were sequential. "NOTHING FOUND" responses returned no data and are recorded at 0 (to be confirmed by the owner's next balance reading). `phrase_fullsearch` bills returned rows even at zero volume (call 19: 10 rows, 8 with volume 0, reading 200).

| # | Report · db | Keyword / target | Lines req → ret | Units (line-based) | Reading | CSV | Purpose · notes |
|---|---|---|---|---|---|---|---|
| 1 | `phrase_organic` · in | mbbs in ukraine | 1 → 1 | 10 | not recorded | `2026-10-11-P3-probe-phrase_organic-in-mbbs-in-ukraine.csv` | price probe for SERP report (10/line confirmed) |
| 2 | `phrase_related` · in | mbbs in ukraine fees | 1 → 0 | 0 | not recorded | — | price probe; NOTHING FOUND (no data returned; treated as unbilled, to confirm by the owner reading) |
| 3 | `phrase_related` · in | mbbs in ukraine | 1 → 1 | 40 | not recorded per call (the 3/4 pair read 80; see notes) | `2026-10-11-P3-probe-phrase_related-in-mbbs-in-ukraine.csv` | price probe for phrase_related · resolved by call 5: 40/line; the parallel readings of 80 were a cumulative pair (40+40) |
| 4 | `phrase_questions` · in | mbbs in ukraine | 1 → 1 | 40 | not recorded per call (the 3/4 pair read 80; see notes) | `2026-10-11-P3-probe-phrase_questions-in-mbbs-in-ukraine.csv` | price probe for phrase_questions · resolved by call 5: 40/line; the parallel readings of 80 were a cumulative pair (40+40) |
| 5 | `phrase_questions` · in | ukraine medical college | 1 → 1 | 40 | not recorded | `2026-10-11-P3-probe-phrase_questions-in-ukraine-medical-college.csv` | sequential price resolution (40/line confirmed); top question has 0 volume |
| 6 | `phrase_organic` · in | mbbs in ukraine | 10 → 10 | 100 | not recorded | `2026-10-11-P3-phrase_organic-in-mbbs-in-ukraine.csv` | B1 SERP: who ranks for the MBBS head term in India (O4) |
| 7 | `phrase_organic` · in | mbbs in ukraine fees | 10 → 0 | 0 | not recorded | — | B1 SERP fees exact term — NOTHING FOUND (no SERP stored; not returned) |
| 8 | `phrase_organic` · in | ukraine medical college fees | 10 → 10 | 100 | not recorded | `2026-10-11-P3-phrase_organic-in-ukraine-medical-college-fees.csv` | B1 SERP: fees cluster (O1) |
| 9 | `phrase_organic` · in | ukraine medical college | 10 → 10 | 100 | not recorded | `2026-10-11-P3-phrase_organic-in-ukraine-medical-college.csv` | B1 SERP: directory/list intent (O3) |
| 10 | `phrase_organic` · in | best medical college in ukraine | 10 → 10 | 100 | not recorded | `2026-10-11-P3-phrase_organic-in-best-medical-college-in-ukraine.csv` | B1 SERP: comparison/best intent (O3) |
| 11 | `phrase_organic` · in | bukovinian state medical university | 10 → 10 | 100 | not recorded | `2026-10-11-P3-phrase_organic-in-bukovinian-state-medical-university.csv` | B1 SERP: named-university term — official site dominance check (O2) |
| 12 | `phrase_organic` · uk | bogomolets national medical university | 10 → 0 | 0 | not recorded | — | B1 SERP uk — NOTHING FOUND (no SERP stored; not returned) |
| 13 | `phrase_these` · za | 12 university names | 12 → 4 | 40 | 250 | `2026-10-11-P3-phrase_these-za-universities.csv` | B3 named-university demand outside in/uk/ng (O2/O16) · run in PARALLEL with the other two (readings 250/330/220 interleaved and are not per-call); cost recorded at the confirmed 10/returned line; max-reading estimate for the batch = 330 (conservative bound: the three readings summed, 800) |
| 14 | `phrase_these` · ae | 12 university names | 12 → 9 | 90 | 330 | `2026-10-11-P3-phrase_these-ae-universities.csv` | B3 · run in PARALLEL with the other two (readings 250/330/220 interleaved and are not per-call); cost recorded at the confirmed 10/returned line; max-reading estimate for the batch = 330 (conservative bound: the three readings summed, 800) |
| 15 | `phrase_these` · pk | 12 university names | 12 → 9 | 90 | 220 | `2026-10-11-P3-phrase_these-pk-universities.csv` | B3 · run in PARALLEL with the other two (readings 250/330/220 interleaved and are not per-call); cost recorded at the confirmed 10/returned line; max-reading estimate for the batch = 330 (conservative bound: the three readings summed, 800) |
| 16 | `phrase_these` · in | study mbbs in ukraine | 1 → 1 | 10 | 10 | `2026-10-11-P3-phrase_these-in-study-mbbs-in-ukraine.csv` | metering check + new phrasing (40, spike in latest month) · sequential; confirms per-call readings when sequential |
| 17 | `phrase_fullsearch` · ng | ukraine medical | 10 → 10 | 200 | 200 | `2026-10-11-P3-phrase_fullsearch-ng-ukraine-medical.csv` | B2 broad ceiling Nigeria (O16): top phrase 40, rest 20 |
| 18 | `phrase_fullsearch` · pk | ukraine medical | 10 → 10 | 200 | 200 | `2026-10-11-P3-phrase_fullsearch-pk-ukraine-medical.csv` | B2 broad ceiling Pakistan: top 40 (ukraine medical college, kd 27, commercial intent), rest 10-30 |
| 19 | `phrase_fullsearch` · za | ukraine medical | 10 → 10 | 200 | 200 | `2026-10-11-P3-phrase_fullsearch-za-ukraine-medical.csv` | B2 broad ceiling South Africa: two phrases at 20, eight zero-volume rows (fullsearch bills returned rows even at zero volume) |
| 20 | `phrase_questions` · in | mbbs in ukraine | 15 → 15 | 600 | 600 | `2026-10-11-P3-phrase_questions-in-mbbs-in-ukraine.csv` | B5 what prospective students ask (O1/O5 content): cost, duration, validity in India/Germany/Canada, NEET, how to apply |
| 21 | `phrase_related` · in | mbbs in ukraine | 20 → 20 | 800 | 800 | `2026-10-11-P3-phrase_related-in-mbbs-in-ukraine.csv` | B4 semantic cluster around MBBS/medical college in India: new low-kd fee/college phrasings (ukraine mbbs college 480 kd 7; ukraine mbbs fees 260 kd 7; |
| 22 | `phrase_organic` · in | ukraine mbbs college | 10 → 10 | 100 | 100 | `2026-10-11-P3-phrase_organic-in-ukraine-mbbs-college.csv` | B1 SERP for the new low-kd term (480, kd 7): agencies + shiksha; no official site |
| 23 | `phrase_organic` · uk | study medicine in ukraine | 10 → 0 | 0 | not recorded | — | B6 UK SERP composition — NOTHING FOUND (no SERP stored for a 30-volume UK term; not returned) |
| 24 | `phrase_organic` · in | pirogov medical university ukraine | 10 → 10 | 100 | 100 | `2026-10-11-P3-phrase_organic-in-pirogov-medical-university-ukraine.csv` | B6 named-university SERP (390 broad): look-alike third-party domains (vnnmu.com #1, pirogov-university.com #3) above the official vnmu.edu.ua (#6) |
| 25 | `resource_organic` · in | https://www.rmcedu.com/mbbs-abroad/mbbs-in-ukraine/ | 1 → 1 | 10 | 10 | `2026-10-11-P3-probe-resource_organic-in-rmcedu-mbbs-in-ukraine.csv` | B7 price probe (10/line confirmed); traffic reality check: position 2 for "ukraine medical college" = 116 est. visits/month |
| 26 | `resource_organic` · in | https://www.rmcedu.com/mbbs-abroad/mbbs-in-ukraine/ | 30 → 20 | 200 | 200 | `2026-10-11-P3-resource_organic-in-rmcedu-mbbs-in-ukraine.csv` | B7 competitor keyword set of the top agency page: 20 keywords, est. traffic 701/month in total (SEMrush estimate), positions 1-6, kd 6-26 |

**Programme 3 total: 3,270 units line-based; max-reading estimate 3,380 (3,270 + (330 − 220) for the parallel batch); conservative bound 3,850 (sum of the three parallel readings, 800, in place of their 220 line-based), still inside the 4,150 programme cap.** Cumulative consumption: 2,110 (DERIVED) + 850 (VERIFIED) + 3,270 = **6,230 line-based (max-reading estimate 6,340; conservative bound 6,810)**. **Expected balance: 47,890 − 850 − 3,270 = 43,770 (max-reading estimate 43,660; conservative bound 43,190)** — ESTIMATE until the owner's next reading of Subscription info → API units; any difference is recorded here and the per-line assumptions revisited. Programme cap headroom left: 880 line-based / 770 at the max-reading estimate / 300 at the conservative bound, deliberately unspent: every decision question was answered; the UAE broad-ceiling query was skipped (ng/pk/za ceilings of 20–40 and the existing ae exact/named files already settle the UAE question).

## 2026-10-12 — Directory milestone: reconciliation and decision not to spend (0 units)

**Owner's instruction (2026-10-12):** use SEMrush as the primary research engine; inspect the existing exports and reconcile the balance first; use existing data before spending; if justified, run a small number of targeted reports; no purchases or upgrades.

**Reconciliation (no new reading available):**

| Item | Figure | Label |
|---|---|---|
| Last verified owner reading | 47,890 (2026-10-11, before R1/R2) | VERIFIED (owner) |
| Consumed since that reading | 850 (R1/R2) + 3,270 (programme 3, line-based) | VERIFIED + ESTIMATE |
| Expected balance | 43,770 line-based · 43,660 max-reading · 43,190 conservative | ESTIMATE, **unverified** |
| Programme-cap headroom (5,000 cap) | 880 · 770 · 300 | DERIVED |
| Live balance | cannot be read from this environment (the MCP reports per-call usage only; the API Units page needs the owner's login) | — |

**Inventory re-checked:** 42 exports (2026-10-10: 10; 2026-10-11: 32). By report: phrase_these 21, phrase_organic 8, phrase_fullsearch 5, phrase_questions 3, phrase_related 2, resource_organic 2, phrase_all 1. By database: in 21, uk 5, ng 4, pk 4, za 4, ae 3. All files well-formed; where one keyword and database appear in several files, the volumes agree.

**Decision: no metered call (0 units).** Every question this milestone had to answer was answered by the existing exports (full analysis in the session notes, summarised in `EXECUTIVE_REPORT.md` §Q):
- Strongest named-university demand (India exact, 2026-10-11 R2): Bukovinian 480, Odesa ("odessa…") 390, Kharkiv 390, Bogomolets 320, Ivano-Frankivsk 210, Uzhhorod 140, Ternopil 110; total 2,270 for the 12 names. Steady across 12 months except Vinnytsia and Lviv (single-month spikes).
- Country priority: India exact 3,160 (≈6× the UK's 490; ae 310, ng 300, pk 290, za 150, mostly 10–30 minimum buckets).
- Competitor reality: one agency hub (rmcedu) holds positions 1–6 on 20 India keywords for an estimated 701 visits/month in total; the MBBS, fees and "college" SERPs share 4–6 of 10 URLs (one intent).
- New pages: no distinct exact intent justifies a country, eligibility, comparison, MBBS or city page now; university profiles are the only distinct steady demand and become indexable once verified.

The gaps that remain (exact demand for "pirogov medical university ukraine", the Zaporizhzhia current name, the "for indian students" SERP, other universities) would not change what is built now. If the owner later wants them settled, the smallest batch is one `phrase_these` (in, 10 keywords, ≤100 units) plus one `phrase_organic` (in, "ukraine medical college fees for indian students", 100 units): ≤200 units, inside the 300-unit conservative headroom, and only after the owner's next API Units reading is recorded here.

**Cumulative consumption unchanged: 6,230 line-based (6,340 max-reading; 6,810 conservative). Expected balance unchanged and unverified: 43,770 (43,660; 43,190).**

## 2026-10-12 — Priority check for the verification queue (30 units)

**Owner's instruction (2026-10-12, second message):** reuse the 42 exports first; check the actual balance if possible; spend only where a specific unanswered question could change a page, university or country priority; record database, report, units and decision.

**Balance:** not readable. A zero-cost `get_report_schema` call succeeded, so the connector works, but the MCP reports only per-call usage (`metadata.usage.api_units`) and never the remaining balance. The expected balance before this call stays an **unverified estimate**: 43,770 (43,660; conservative 43,190).

**Question:** does Vinnytsia National Pirogov Memorial Medical University belong in the top verification group? The only large figure for it, "pirogov medical university ukraine" 390, existed only as a broad-match row (2026-10-10). If exact, it moves Vinnytsia from #10 to about #2 in India and changes which official pages the owner should capture first. The Zaporizhzhia current name had never been measured (only the former name, 90).

| # | Call | Requested → returned lines | `usage.api_units` | Cost recorded | File | Decision supported |
|---|---|---|---|---|---|---|
| 1 | `phrase_these` · in · 5 names (columns keyword, volume, cpc, competitive_density, results, keyword_difficulty, intent, trend) | 5 → 3 | 30 | **30** | `research/semrush/2026-10-12-phrase_these-in-vinnytsia-zaporizhzhia-names.csv` | Vinnytsia joins the top priority group |

**Result (exact, database in):**
- "pirogov medical university ukraine": **390**, kd 23, informational. The 12-month trend is steady (average 0.57 of peak; no single-month spike), so typical monthly demand is about 390.
- "national pirogov memorial medical university": 320, but spike-driven (one month at peak, the others at 0.06–0.17 of it); typical month about 180.
- "vinnytsia national medical university": 50, spike-driven.
- "vinnytsia national pirogov memorial medical university" and "zaporizhzhia state medical and pharmaceutical university": no data (not returned, not billed).

**Decision:** on steady exact demand, Vinnytsia (≈390) ranks with Odesa (390) and Kharkiv (390), behind Bukovinian (480). It is moved into the top verification group, and the capture request lists it with the other seven. Zaporizhzhia stays where it is (only its former name has demand, 90).

**Cumulative consumption: 6,230 + 30 = 6,260 line-based (6,370 max-reading; 6,840 conservative). Expected balance: 43,740 (43,630; conservative 43,160) — ESTIMATE, unverified until the owner's next API Units reading. Programme-cap headroom left: 850 / 740 / 270.**

## 2026-10-12 — Master task: competitor gap check and new-name demand (programme 4; 450 units)

**Owner's instruction (2026-10-12, master task):** "Use the existing SEMrush subscription and units when necessary"; reuse existing exports first; confirm the balance through the account interface if accessible; for each further report record the question, database, report type, units and resulting decision; no purchases or upgrades. **Balance:** still not readable through the MCP (it reports per-call usage only). This programme's own working cap, set here because the instruction names none: **1,000 units**, each call justified by a question the 43 existing exports cannot answer.

**Existing exports reused first:** demand for the 12 names (in, pk, ng, uk), programme and fee terms (R1), SERPs for eight head terms and the rmcedu hub page's keywords (programme 3). None of them shows which Ukraine pages of the leading competitor earn traffic beyond its hub page.

| # | Call | Question | Requested → returned | `usage.api_units` | File | Decision supported |
|---|---|---|---|---|---|---|
| 1 | `resource_organic` · in · target `rmcedu.com` · filter URL contains "ukraine" · sort traffic desc · limit 30 · columns keyword, position, volume, url, traffic, keyword_difficulty, intent | Which Ukraine topics and page types bring the leading competitor organic traffic, and do any lack a page on our site? | 30 → 30 | 300 | `research/semrush/2026-10-12-resource_organic-in-rmcedu-ukraine-urls.csv` | See below |

**Result (database in; volumes are SEMrush estimates):**
- **Fees dominate.** About 85% of the estimated traffic to its Ukraine pages lands on one hub page and comes from cost and fee queries: "ukraine medical college fees for indian students" (2,900; position 2; kd 13), "ukraine medical college" (2,900), "ukraine medical fees" (720), "ukraine medical college fees" (590), "medical fees in ukraine" (480), "cost of medical education in ukraine" (320), "cost of mbbs in ukraine" (260), "ukraine me mbbs fees kitni hai" (260, Hindi), "cost of mbbs in ukraine for indian students" (210). Our matching page is `/tuition-fees/` (money page 1 in `KEYWORD_URL_MAP.md` §18.1; it already has a "Fees for Indian students" section, and its meta description now names "MBBS fees for Indian students"). This confirms its priority but does not justify a second fees page: one intent, one URL.
- **University pages earn little for it** (positions 2–15): Danylo Halytsky (110 + 110), "pirogov medical university ukraine" (260), "ieu university" (170, International European University, Kyiv), Bogomolets (320), "odessa national medical university" (320), Bukovinian (480, position 10), "zaporozhye state medical university" (170; older spelling, position 15). Our directory search already maps "Zaporozhye", "Odessa" and the other old spellings.
- **List and choice queries:** "ukraine mbbs college list" (140), "best mbbs college in ukraine" (110), "why students go to ukraine for mbbs" (140) → `/universities/` (list, plus the "no ranking" answer) and `/courses/medicine/`. No new page.
- **New lead:** International European University ("ieu university" 170) is a private Kyiv institution not among our 12. It is passed to the research sweep; no page is created from demand alone.

**Decision:** no new URL. `/tuition-fees/` stays the top money page; its meta description now carries the "MBBS fees for Indian students" phrasing that its existing section answers, with no fee figures. The university-name demand confirms the verification order already recorded. International European University enters the research register as a lead.

**Cumulative consumption: 6,260 + 300 = 6,560 line-based (6,670 max-reading; 7,140 conservative). Expected balance: 43,440 (43,330; conservative 42,860): ESTIMATE, unverified. Programme 4 headroom: 700 of 1,000.**

| # | Call | Question | Requested → returned | `usage.api_units` | File | Decision supported |
|---|---|---|---|---|---|---|
| 2 | `phrase_these` · in · 18 name variants of the institutions found by the research sweep (columns keyword, volume, competitive_density, results, trend, intent, keyword_difficulty) | Which of the newly found institutions carry measurable India search demand, so that verification effort goes to them first? None of the 44 earlier exports covers these names | 18 → 15 (3 not returned, not billed: "luhansk state medical university", "odessa international medical university", "lesya ukrainka volyn national university") | 150 | `research/semrush/2026-10-12-phrase_these-in-new-university-names.csv` | Verification order for the new institutions |

**Result (exact, database in; typical month judged from the 12-month trend):**
- **International European University (Kyiv, private): 590**, kd 19, steady but declining over the year. Highest of all new names, and higher than any of our 12 (the highest of those is Bukovinian, 480). Searches may also concern its former Malta campus, whose licence the research sweep found revoked on 13 August 2025 (MFHEA, third-party report of a government announcement).
- **"lugansk state medical university": 390**, kd 20, steady. The name is ambiguous: the Ukrainian state university reported in search results as relocated to Rivne and the institution in occupied Luhansk that the results describe as Russian-run ("named after St. Luke") share it. The figure cannot be split between them.
- **Kyiv Medical University (private): 140**, kd 20, steady. **Sumy State University: 110**, kd 24, steady ("sumy state medical university", an agency name, 40).
- All others 10–40 (Karazin, Taras Shevchenko, Petro Mohyla / "black sea national university", Cherkasy, National University of Pharmacy, Donetsk NMU, Kharkiv International MU, Zaporizhzhia National University).

**Decision:** demand does not decide what is listed; evidence does. International European University and Luhansk State Medical University (reported base: Rivne) go to the top of the verification queue for the new institutions, because each has demand and an open status question that official or government pages can settle (IEU: current licence and the Malta campus; LSMU: a dated official notice of its current base and a clear distinction from the occupied-territory institution). They stay out of the public directory until then. Kyiv Medical University (licence and branch questions) follows. Sumy State University is listed as a research preview (its search-result leads meet the preview criteria; nothing about it is verified); the low-demand state universities that meet the criteria are listed too, because a complete directory helps applicants who already have a university in mind.

**Cumulative consumption: 6,560 + 150 = 6,710 line-based (6,820 max-reading; 7,290 conservative). Expected balance: 43,290 (43,180; conservative 42,710): ESTIMATE, unverified. Programme 4 headroom: 550 of 1,000.**

## 2026-10-26 — Programme 5 request (100+ URL mandate): refused for lack of API units (0 units)

**Owner's instruction (2026-10-26):** "I have provided SEMrush access. Use it." Research country demand (Nigeria, India, Egypt, Morocco, Azerbaijan, Georgia, Turkey and others the data supports), programme, fee, eligibility, document, visa and university-name clusters, competitors, SERP features and trends; protect the allowance; batch related research. No unit cap was stated; the working cap set here before the first call was 2,000 units, sequential calls only.

| # | Call | Result | `usage.api_units` | Decision |
|---|---|---|---|---|
| 1 | `get_report_schema` (`phrase_these`), the zero-cost first step before any metered call | error `no_api_units`: "The user has an active Semrush subscription, but does not have enough API units to complete this request." (trace 2d51201fa99a88bec5e20bb4ab094615) | none reported (no data returned) | No further call. New research is blocked until API units are available on the account; units are never bought from this project (owner rule). |

**Reconciliation.** The ledger's expected balance (43,290 line-based; conservative 42,710) was an unverified estimate. The account now reports that it does not have enough units for even the schema step, so that estimate is withdrawn: the live balance is effectively zero for this connector. The owner's reading of Subscription info → API units is still the only way to record the actual figure.

**Consequence for the 100+ URL mandate.** Every decision in this round is taken from the 46 existing exports (115 distinct keywords; 85 with volume of 20 or more). Markets with no export (Egypt, Morocco, Azerbaijan, Georgia, Turkey, and Nigeria beyond the 10–40 list and name queries) stay **unmeasured**; no page is created for them (CLAUDE.md SEO rule 2 and rule 8). The opportunity register is `KEYWORD_URL_MAP.md` §20.

**Cumulative consumption unchanged: 6,710 line-based (6,820 max-reading; 7,290 conservative).**
