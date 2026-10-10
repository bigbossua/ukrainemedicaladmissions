# PROJECT_EXECUTION_PLAN.md — Ukraine Medical Admissions

**Status date:** 2026-10-10 · **Branch:** `claude/new-session-ppgh22` · **`main`:** untouched (`d9a4542`)
**Labels:** VERIFIED (observed, evidence named) · UNVERIFIED (reported, not checked) · PROPOSED (needs owner approval)

## 1. Status summary

| Area | State |
|---|---|
| Brand identity | DONE — `brand/` (commit `ea1f6a9`) |
| Hosting assessment | DONE — `HOSTING_AND_DEPLOYMENT_ASSESSMENT.md`; document root still UNVERIFIED (owner action D1) |
| Website scaffold | DONE — `site/`, Astro static site, 18 pages, all tests passing locally (see §4) |
| University data model | DONE — schema in `site/src/content.config.ts`; Ternopil pilot record, every claim marked unverified / not-published |
| Enquiry / application-start (Stage 1) | DONE — `site/public/api/enquiry.php`, tested with synthetic data; stores outside web root |
| SEMrush research | BLOCKED — account reports 0 API units on every toolkit (5 calls total, see ledger). No keyword data exists; all seeds are unvalidated |
| University fact verification | BLOCKED — official university domains unreachable from this environment (network policy) |
| Deployment | PREPARED, NOT ACTIVE — CI workflow + manual production-branch publisher; Hostinger Git connection is an owner action |
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

**Decision D3 for the owner (requires explicit answer):** *Rebuild on Kirby now* (approve €99 licence; accept 2–4 build days and the discard of the Astro build; blocked outright if PHP 8.2+ is not selectable) — or — *Astro-first with the Kirby trigger* (proceed to staging once the document root is confirmed; give in-principle approval of the €99 licence so a later trigger does not stall). Either way, before any production write: inspect and back up the real document root, confirm the PHP version, build the redirect map.

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

## 5. Blockers and the smallest action to clear each

| Blocker | Smallest action (owner) |
|---|---|
| SEMrush 0 API units | Log in to SEMrush → check which account/key the MCP uses vs. the one showing 50,000 units (https://www.semrush.com/mcp-access). No purchase without approval. |
| University sources unreachable | Add `tdmu.edu.ua`, `tnmu.edu.ua`, `mon.gov.ua`, `vstup.edbo.gov.ua` to the cloud environment's allowed domains — or upload the official fee/admissions PDFs. |
| Document root unknown | hPanel → Websites → domain → Files/FTP details → read the path; reply with it. |
| Hostinger Git not connected | hPanel → Advanced → Git → Connect GitHub → repo `bigbossua/ukrainemedicaladmissions`, branch `production`, deploy dir = the confirmed document root. **Do not run the publish workflow before this is confirmed.** |
| Staging | Create `staging.ukrainemedicaladmissions.com` subdomain + directory; connect a `staging` branch the same way. |

## 6. Next executable tasks (in order)

1. Owner clears D1 (document root) and connects Hostinger Git to `production` — **no deployment until explicitly approved**.
2. Verify Ternopil claims against official sources once reachable → flip `verification.publishable` → profile enters sitemap automatically.
3. Add universities one at a time via the same JSON schema and `SOURCE_VERIFICATION_REGISTER.md` process.
4. SEMrush pilot (≤ 200 units) once units exist, per `KEYWORD_URL_MAP.md` §3.
5. Application system Stage 2 (accounts, save-and-resume, uploads) per `APPLICATION_SYSTEM_SPEC.md` — only after security review.
6. Service tiers: evidence gathering per `SERVICE_TIERS_SPEC.md`; no publication without approval.
7. ~~Self-host fonts and tighten CSP~~ — done 2026-10-10.
8. Search Console: owner adds the property and grants access; baseline before any growth claims.

## 7. Decisions still required

D1 document root · D2 approve Hostinger Git deployment · D3 Kirby-now vs Astro-first-with-trigger (see §2; the earlier 'rejected on cost' reasoning was wrong — Kirby is €99 one-time) · D4 staging subdomain · D5 network access or official PDFs · D6 SEMrush account/key · D7 legal entity details for privacy/terms.
