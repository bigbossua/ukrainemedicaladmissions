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
| 2026-10-10 | `execute_report phrase_all` | phrase="study medicine in ukraine"; columns database,keyword,volume,cpc,competitive_density,results,keyword_difficulty,intent | Country-demand evidence (Part 9) | **910 metered** (91 lines × 10; estimate was ≈300 — report returns zero-volume databases too) | `research/semrush/2026-10-10-phrase_all-study-medicine-in-ukraine.csv` | unknown (≈49,000 if balance was 50,000) |
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

Reading B is almost certainly wrong: six identical 8-line requests reported six different values, so the field cannot be a per-call price; the values rise toward exactly 1,200 — the published-price total for the batch — which fits a running counter observed at different moments by concurrent calls. Earlier sequential calls (910 for 91 lines; 130 for 12–13 lines) matched the published price list. **Working assumption: Reading A (balance ≈ 50,000 − 2,240 = 47,760 if the owner's screenshot balance was current). This is an assumption until the owner confirms the balance; no further paid call will be made before that confirmation.**

**Lesson recorded:** `phrase_all` bills every regional database (≈90 lines) even when volume is 0 — use `phrase_this`/`phrase_these` with explicit databases for all further country checks (10 units per keyword-database).

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
