# PROJECT_EXECUTION_PLAN.md — Ukraine Medical Admissions

**Status date:** 2026-10-10 (evening) · **Branch:** `claude/new-session-ppgh22` · **`main`:** untouched (`d9a4542`)
**Labels:** VERIFIED (observed, evidence named) · UNVERIFIED (reported, not checked) · PROPOSED (needs owner approval)

## 1. Status summary

| Area | State |
|---|---|
| Brand identity | DONE — `brand/` (commit `ea1f6a9`) |
| Hosting assessment | DONE — `HOSTING_AND_DEPLOYMENT_ASSESSMENT.md`; document root still UNVERIFIED — owner's File Manager shows an empty `public_html` and no `domains/` (§10); the single remaining check is whether the domain's DNS points at this server (§10.1, owner action D1) |
| Website scaffold | DONE — `site/`, Astro static site, 18 pages, all tests passing locally (see §4) |
| University data model | DONE — schema in `site/src/content.config.ts`; Ternopil pilot record, every claim marked unverified / not-published |
| Enquiry / application-start (Stage 1) | DONE — `site/public/api/enquiry.php`, tested with synthetic data; stores outside web root |
| SEMrush research | DONE (pilot + approved follow-up, 2,240 units at published prices; balance to be confirmed by owner). Evidence and per-URL actions in `KEYWORD_URL_MAP.md` §4; raw exports in `research/semrush/`. No further paid calls without approval |
| University fact verification | BLOCKED — official domains unreachable (network policy). Official sources *identified* by search (tdmu.edu.ua, nmuofficial.com, kmu.edu.ua, MoES portal, EDEBO) and logged snippet-only in `SOURCE_VERIFICATION_REGISTER.md`; 0 claims verified; Ternopil stays noindex |
| Deployment | PREPARED, NOT ACTIVE — CI + manual publisher with `staging` (forced noindex, X-Robots-Tag, no sitemap, guard test) and `production` (PUBLISH confirmation + release tag) targets; Hostinger Git connection is an owner action |
| Legacy site | Live pages exist on the domain (`/services`, `/about`, `/dentistry-admissions-in-ukraine`, `/document-translation-legalisation` — search-evidenced, unfetched); inventory and migration risks in `PAGE_ASSET_REGISTER.md`; earlier-audit claims 0 confirmed / 0 refuted |
| Production | UNTOUCHED |

## 2. Architecture: reconciling the brief's "Kirby" with the implemented Astro site (updated 2026-10-10)

**The discrepancy, stated plainly.** The master brief names Kirby as the CMS ("CMS: Kirby — verify current version"; "Inspect the existing Kirby architecture before making technical decisions"). The repository contains no Kirby code and nobody has yet seen the old site's files; the site built so far is Astro (static) + a PHP enquiry handler. The earlier version of this section rejected Kirby because "the licence is a recurring cost" — **that premise was wrong**: Kirby Basic is **€99 per production site, one-time**, with three years of feature upgrades included (getkirby.com/buy, 2026). The decision is therefore re-opened and put to the owner below. No migration or destructive change is made without explicit approval.

**Evidence base (VERIFIED unless marked):** Kirby 5 requires PHP 8.2–8.4 (8.5 from 5.2.1); Hostinger's current support page says hPanel offers PHP 8.2–8.5 with 8.3 default — *plan-specific availability for this account UNVERIFIED*; Hostinger Git deploys a branch into a directory with no build step (UNVERIFIED whether it leaves untracked directories such as a Kirby `content/` folder untouched); live pages exist on the production domain (`/services`, `/about`, `/document-translation-legalisation`) while the File Manager `public_html` shown was empty, so the old site's files and technology remain uninspected; the Astro build is CI-green on `4d8f250` with link, metadata, Playwright, axe and Lighthouse checks passing.

**Comparison (from an adversarial panel: three advocates, two independent judges — one scoring "the daughter operating alone in five years", one scoring "business risk now" — and a synthesis):**

| Criterion | A — Kirby 5 on Hostinger PHP | B — keep Astro, add free git-CMS later | C — Astro-first with written Kirby trigger |
|---|---|---|---|
| Hostinger compatibility & deployment | Needs PHP 8.2+ (unverified on this plan); Panel writes content on the server while Git deploys from the repo — content-sync design unsolved (data-loss failure mode) | Static output needs nothing; only `enquiry.php` needs PHP 8.x; built branch deployed by Hostinger Git | Same as B, with written preconditions (document root, old-site inspection, staging proof) |
| Content editing & succession | Strongest on paper: first-party Panel, save-time validation of each fee/source/date; blueprints and roles unbuilt | Weakest today: editing is a 100-line nested JSON on GitHub; Decap/Sveltia unbuilt, no trigger | Same tooling as B today, plus a measurable task test for the successor and a defined trigger to move to Kirby |
| SEO & URL preservation | Full server control, but sitemap/canonical/JSON-LD/noindex logic must be re-implemented and re-tested | Suite already green; 301 map from old URLs undone in every option | Same as B |
| Secure application system | One PHP runtime, but a second login surface (Panel) on the host that will hold applicant uploads; CSP must be path-scoped for `/panel` | Separate PHP+MySQL module under `/apply/`; public site has no login surface | Same as B; names the `/apply/app/` isolation explicitly |
| Licensing & cost | €99 one-time (verified); needs owner approval; post-3-year upgrade terms and staging coverage are assumptions | £0 licence; unpriced contractor time for Node toolchain upkeep | £0 until a trigger fires; €99 pre-approved in principle |
| Portability, maintainability, operation by the daughter | Flat text files on any PHP host, no build step; Panel is a patch-treadmill surface | Content is plain JSON, output plain HTML; but regenerating output depends on GitHub + Actions + Node, which a non-developer cannot repair when it drifts | Same exposure as B, mitigated by a planned conversion path |
| Work completed / cost & risk of changing | Discards a tested CI-green build; 2–4 unmeasured build days; two unverified hosting facts | Zero switching cost, but silently drops the brief's named CMS | Zero switching cost; deviation recorded with reversal conditions |
| Judge totals (J1 succession / J2 business-risk) | **7.2 / 6.0** — the only disputed placement (1st / 3rd) | 6.7 / 7.25 | **6.9 / 7.5** — never ranked last |

**Recommendation (PROPOSED):** Option C. Keep the tested Astro build as the staging candidate; record Kirby as the live alternative with a written trigger rather than dropping it; fire the trigger if (a) the real document root reveals a licensed Kirby install with reusable content, or (b) the successor fails a defined editing task test ("update a tuition claim with source and date, add an FAQ, publish") on the free git-based editor once it is prototyped on staging. Both judges agree on the first action regardless of ranking: **a ten-minute check in hPanel → PHP Configuration** (is 8.2–8.4 selectable?) and inspection of the real document root, before any further architectural argument.

**DECISION D3 — TAKEN BY THE OWNER, 2026-10-10: Astro-first. No purchases: the €99 Kirby licence will NOT be bought.** Kirby remains documented only as an alternative *if an existing licensed installation is discovered on the live server and can be reused at no additional cost*; otherwise it is closed. Recorded consequences:
- The Astro build remains the production candidate; no Kirby migration; no destructive change.
- **Kirby re-evaluation trigger (only one remains):** inspection of the real document root reveals a licensed Kirby installation with reusable content *and no cost to continue using it*. A failed successor task test now leads to improving the free editor route (rung 1), not to a purchase.
- **Rung 0 (now):** content edited as JSON on GitHub; build-time validation. **Rung 1 (prepared):** free git-based editor — `.pages.yml` committed for Pages CMS (inert until the owner installs its GitHub App — a separate access decision; Decap/Sveltia are equivalent alternatives needing an OAuth relay). **Rung 2:** Kirby, only on trigger.
- **Successor task test (rung 1 acceptance):** in one session, unaided: (1) open the Ternopil record, set a tuition claim's value/currency/academic year, paste the official source URL, set the check date and status `verified`; (2) add one FAQ item; (3) save, watch CI go green, and publish to staging via the workflow. Pass = all three without a developer.
- **No open purchase decision.** (The earlier "in-principle €99 approval" item is withdrawn.)
- **Deployment model (owner, 2026-10-10): direct production, no mandatory staging.** The staging build mode and guard stay in the repo as optional tooling. The first live write still requires the owner's approval of an itemised plan (`HOSTING_AND_DEPLOYMENT_ASSESSMENT.md` §9); after that, changes within the approved scope proceed without per-file approval. Preconditions: real document root identified, live files backed up, redirect map from the legacy inventory.

**Original decision text (for the record):** *Rebuild on Kirby now* (approve €99 licence; accept 2–4 build days and the discard of the Astro build; blocked outright if PHP 8.2+ is not selectable) — or — *Astro-first with the Kirby trigger* (proceed to staging once the document root is confirmed; give in-principle approval of the €99 licence so a later trigger does not stall). Either way, before any production write: inspect and back up the real document root, confirm the PHP version, build the redirect map.

## 3. What exists in `site/`

- Layout + components: `Base` (title/description/canonical/robots/OG/JSON-LD), `Header` (accessible mobile menu), `Footer` (disclaimer), `CtaBand`, `Breadcrumbs`, `Fact` (renders a claim as verified / pending / to-be-confirmed — never as plain fact when unverified).
- Pages (18): home, `/universities/` (client-side filters: city, course, language — only facets the data supports), `/universities/<slug>/` (profile template), `/courses/` + 4 course templates, `/admissions/`, `/tuition-fees/` (fee table shows only verified fees), `/faq/` (FAQPage JSON-LD), `/about/`, `/contact/`, `/apply/` (Stage 1 form, prefilled from profile links), `/apply/thank-you/` (noindex), `/privacy/`, `/terms/` (both marked draft for legal review), 404.
- SEO: canonical self-reference, robots meta on every page, `robots.txt`, XML sitemap that **excludes noindex pages and unpublishable university profiles**, Organization/WebSite/FAQPage structured data only where visible content supports it; CollegeOrUniversity JSON-LD emitted only once a profile is `publishable`.
- Hosting files: `.htaccess` (non-www + HTTPS canonical, security headers incl. CSP, no dotfile/JSON serving, caching), `site.webmanifest`, favicons.
- Tests (`npm test`): build, `astro check` (0 errors), link check (27 internal URLs, 0 broken), metadata check (titles ≤70, descriptions 50–165, canonical match, 1×h1, noindex⇔sitemap), Playwright smoke at 390/820/1440 px (console errors, header CTA, horizontal overflow, mobile menu, directory filter, apply-form validation + prefill, no WhatsApp strings) with screenshots.

## 4. Test results (local, 2026-10-10) — VERIFIED

| Check | Result |
|---|---|
| `astro build` | 18 pages, no errors |
| `astro check` | 0 errors / 0 warnings |
| `test:links` | 0 broken of 27 |
| `test:meta` | 0 problems (after title/description trims) |
| `test:ui` | 18 pages × 3 widths, 0 failures |
| `test:a11y` (axe, added 2026-10-10) | 18 pages × 2 widths, 0 violations after fixing 2 real contrast defects |
| PHP handler (php -S, synthetic data) | valid → 303 to thank-you + JSON record **outside** web root; missing consent → 422; honeypot → silent 303; GET → 405 |
| `php -l enquiry.php` | no syntax errors |
| Not tested (cannot be, here) | real email delivery via `mail()`, behaviour under Hostinger's LiteSpeed `.htaccess`, live HTTPS/HSTS, production document root |

## 4a. CI coverage note

CI (`.github/workflows/ci.yml`) runs only when `site/**` or the workflow file changes. Runs #1 (`6bff593`), #2 (`ebb671f`) and #3 (`4d8f250`) passed. Documentation-only commits (`920d4f3`, `3266e7e`, `0c51279`, `570c317`, `9122282`, `097930d`) did not trigger CI and are not covered by those runs; the next commit touching `site/` triggers run #4.

## 5. Blockers and the smallest action to clear each

| Blocker | Smallest action (owner) |
|---|---|
| SEMrush 0 API units | Log in to SEMrush → check which account/key the MCP uses vs. the one showing 50,000 units (https://www.semrush.com/mcp-access). No purchase without approval. |
| University sources unreachable | Add `tdmu.edu.ua`, `tnmu.edu.ua`, `mon.gov.ua`, `vstup.edbo.gov.ua` to the cloud environment's allowed domains — or upload the official fee/admissions PDFs. |
| Document root unknown | hPanel → Websites → domain → Files/FTP details → read the path; reply with it. |
| Hostinger Git not connected | hPanel → Advanced → Git → Connect GitHub → repo `bigbossua/ukrainemedicaladmissions`, branch `production`, deploy dir = the confirmed document root. **Do not run the publish workflow before this is confirmed.** |
| Staging | Create `staging.ukrainemedicaladmissions.com` subdomain + directory; connect a `staging` branch the same way. |

## 6. Next executable tasks (in order)

1. Owner: upload a backup zip of the live site directory + hPanel screenshots (FTP path, PHP Configuration); connect Hostinger Git to branch `production` with the confirmed root; make the repository private (D8). Then I present the itemised first-write plan for approval. **No production write before that approval.**
2. Verify Ternopil claims against official sources once reachable → flip `verification.publishable` → profile enters sitemap automatically.
3. Add universities one at a time via the same JSON schema and `SOURCE_VERIFICATION_REGISTER.md` process.
4. SEMrush next wave only on approval with a cost estimate: broad match in ng/pk/ae (≈20/line), named-university phrases incl. Ternopil in `in` (≈10/line), phrase_organic SERP for the India fee terms (≈10/line) — see `KEYWORD_URL_MAP.md` §4.5 limitations.
5. Application system Stage 2 (accounts, save-and-resume, uploads) per `APPLICATION_SYSTEM_SPEC.md` — only after security review.
6. Service tiers: evidence gathering per `SERVICE_TIERS_SPEC.md`; no publication without approval.
7. ~~Self-host fonts and tighten CSP~~ — done 2026-10-10.
8. Search Console: owner adds the property and grants access; baseline before any growth claims.

## 7. Decisions still required

~~D3~~ **decided: Astro-first, no purchases** (§2) · **D8 repository visibility — RECOMMENDED: make the repository private now (free).** Checked consequences: GitHub Actions keep running on private repos (2,000 free minutes/month; a CI run takes ≈2–3 min); Hostinger Git supports private repositories via its GitHub App; the prepared Pages CMS config works with private repos; nothing in the project depends on public visibility. This closes the exposure of deploy branches and the unverified Ternopil JSON on GitHub blob pages · D1 document root / production target (single check: `HOSTING_AND_DEPLOYMENT_ASSESSMENT.md` §10.1) · D2 approve Hostinger Git deployment · ~~D4 staging subdomain~~ optional, no longer required · D5 network access or official PDFs · D6 SEMrush account/key · D7 legal entity details for privacy/terms.
