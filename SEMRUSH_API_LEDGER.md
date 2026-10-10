# SEMRUSH_API_LEDGER.md

Every material SEMrush API request is recorded here. No keys or credentials are stored in this file.

**Budget rule (brief):** initial research cap 2,000 Standard API units; preserve ≥48,000 unless the owner approves otherwise. Treated as a ceiling only if the allowance is authorised *and available*.
**Last observed balance (owner screenshot, date unknown):** 50,000 Standard API units.
**Balance observed via the MCP integration:** 0 usable units (all calls below).

## Request log

| Date | Endpoint / tool | Parameters | Purpose | Unit cost | Result | Balance after |
|---|---|---|---|---|---|---|
| 2026-10-10 | `domain_overview` (discovery) | none | List reports before any paid call | 0 | `no_api_units` (trace 4cd290fe…) | 0 |
| 2026-10-10 | `organic_research` (discovery) | none | Same | 0 | `no_api_units` (trace 63363b8f…) | 0 |
| 2026-10-10 | `keyword_research` (discovery) | none | Same | 0 | `no_api_units` (trace bd8ab198…) | 0 |
| 2026-10-10 (later session) | `keyword_research` (discovery) | none | Single re-check after time elapsed | 0 | `no_api_units` (trace e398e801…) | 0 |
| 2026-10-10 (later session) | `projects` (discovery) | none | Different endpoint family — test whether project tools have a separate allowance | 0 | `no_api_units` (trace a3ce5143…) | 0 |
| 2026-10-10 (investigation) | `get_report_schema(phrase_all)` | report=phrase_all | Cheapest possible Standard-API call to get the precise error on a specific report | 0 | `no_api_units` (trace fb632a09…) | 0 |

**Total units spent:** 0. **No keyword research has been performed.** No keyword, volume, difficulty, competitor or country metric exists in this project yet.

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

## Pilot plan once units exist (≤ 200 units before review)

1. `get_report_schema` for `phrase_all` / keyword overview → note per-line cost from the schema.
2. Keyword overview for the 20 seed phrases (`KEYWORD_URL_MAP.md`) in database `uk` first, then `in`, `ng`, `pk`, `gh`, `ke`, `za`, `bd`, `ae` **only if** the UK run shows the metric set is useful.
3. `domain_overview` + `organic_research` for the production domain (baseline).
4. Record each call here with cost and output location (`research/semrush/YYYY-MM-DD-<report>.csv`).
5. Stop and report at 200 units; continue only on approval.
