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

## 2. Architecture decision (PROPOSED → implemented in repo pending approval)

**Chosen: Astro (static output) + a small PHP layer for forms, deployed as plain files.**

| Criterion | Astro (chosen) | Kirby CMS |
|---|---|---|
| Hostinger shared PHP hosting | Static HTML/CSS/JS runs anywhere; PHP handler for forms | Native PHP — also fine |
| Licence / recurring cost | £0 (MIT) | Paid per-site licence (not approved) |
| Non-technical editing (succession) | Structured JSON content, validated at build; editable on GitHub's web UI; a free git-based CMS (Decap) can be added later | Built-in Panel — best editor UX |
| Security / maintenance | No server-side CMS attack surface; dependencies pinned, CI-checked | PHP app to patch; Panel login to protect |
| Structured university data | Zod-validated schema; build fails on bad data | Blueprints/structure fields |
| SEO / URL stability | Full control of canonical, robots, sitemap, JSON-LD | Full control |
| Application system | Separate PHP/MySQL module under `/apply/` (Phase 5) — independent of the CMS either way | Same |
| Version control / rollback | Everything in Git; release = tag; rollback = republish previous tag | Content files in Git too |

Why not Kirby: the licence is a recurring cost requiring approval, and the only thing it buys over Astro here is the editor UI, which can be added for free later. Decision reversible: content is plain JSON.

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

D1 document root · D2 approve Hostinger Git deployment · D3 confirm Astro (Kirby rejected on cost) · D4 staging subdomain · D5 network access or official PDFs · D6 SEMrush account/key · D7 legal entity details for privacy/terms.
