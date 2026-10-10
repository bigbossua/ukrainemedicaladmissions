# PROJECT_EXECUTION_PLAN.md — Ukraine Medical Admissions

**Status:** Stage 1 (read-only audit) — BLOCKED on environment access. Nothing below has been changed on production.
**Last updated:** 2026-10-10
**Governing brief:** `ukrainemedicaladmissions.com` (master task, identical in content to the uploaded `Untitled_document.docx`)

Every statement in this document is tagged as one of:
- **VERIFIED** — observed directly in this session, with the evidence named.
- **REPORTED** — stated in the brief or an earlier audit; not re-checked yet.
- **PROPOSAL** — requires owner approval before action.

---

## 1. Existing assets and completed work

| Item | Status | Evidence |
|---|---|---|
| Git repository `bigbossua/ukrainemedicaladmissions` | VERIFIED | Branches: `main`, `claude/new-session-ppgh22`. One commit (`d9a4542 Create ukrainemedicaladmissions.com`). |
| Repository contents | VERIFIED | A single file, the master brief. **No Kirby code, templates, snippets, routes, content folders, config, sitemap, redirects, or project archives are in the repository.** |
| Project archives / earlier audits / keyword datasets | VERIFIED — NOT FOUND | Not in the repo, not in the session uploads (only the two copies of the brief). Part 3 asks for them to be reviewed; they must be supplied. |
| Live website | VERIFIED — UNREACHABLE | `https://ukrainemedicaladmissions.com/` and `www.` variant: egress proxy answered HTTP 403 to CONNECT (network policy denial). DNS also fails from the fetch tool. |
| Archived copies (Wayback Machine) | VERIFIED — UNREACHABLE | `web.archive.org` is not fetchable from this environment. |
| Official university sources (e.g. `tdmu.edu.ua`) | VERIFIED — UNREACHABLE | DNS resolution fails from this environment. Stage 3 fact verification cannot be done here until network access is widened. |
| SEMrush API | VERIFIED — NO UNITS | Three discovery calls (domain overview, organic research, keyword research) each returned `no_api_units`: active subscription, zero usable API units. The 50,000-unit balance in the brief is **not** the current balance. See `SEMRUSH_API_LEDGER.md`. |
| Google indexing of the domain | UNVERIFIED | `site:` search returned no pages from the domain, but the search tool did not honour the operator, so this is not evidence of de-indexing. Needs Search Console. |

## 2. Current technical architecture

REPORTED only: Kirby CMS on Hostinger. Version, PHP version, plugins, hosting plan, staging environment, DNS, SSL and redirect configuration are all **unverified** — none of the code or hosting is accessible from this session.

## 3. Existing URL inventory

Not obtainable. Requires any one of: repository containing the Kirby `content/` tree, network access to the live sitemap, a Hostinger file export, or a Search Console URL export.

## 4. Known SEO performance

Unavailable. No Search Console, analytics or SEMrush data could be read. **Marked unavailable, not estimated.**

## 5. Technical problems and risks

The eight previously-reported issues are carried into `TECHNICAL_REPAIR_BACKLOG.md`, each marked **REPORTED / recheck required**. None has been confirmed or refuted in this session.

Additional risks identified now:
- **R1** — The repository is not the website. Any development here has nothing to deploy to until the actual Kirby codebase is committed (or a deploy path to Hostinger is defined).
- **R2** — SEMrush budget rule (preserve ≥48,000 units) cannot be honoured as written because the balance is 0. The research plan is on hold until the owner confirms the real balance / unit renewal date.
- **R3** — Working from a container with no access to the production domain, official university sites or archives makes every factual claim unverifiable; the brief forbids filling that gap with invented data, so no university or fee content will be drafted until access exists.

## 6. SEMrush research plan (PROPOSAL — on hold)

Unchanged from the brief (Parts 4.2 and 8): seed topics → related/question/variation reports → cluster by intent → one canonical URL per cluster → country breakdown. Execution order once units are available:
1. Confirm balance and per-endpoint unit costs; log in the ledger.
2. `domain_overview` for the production domain (baseline).
3. `organic_research` for the production domain (current rankings — expected to be small).
4. Keyword overview for the 20 seed phrases, UK/IN/NG/PK/… databases only after country demand is checked in a cheap aggregate report first.
5. Stop at the 2,000-unit cap unless re-approved.

## 7. Directory and content architecture (PROPOSAL)

Single source of truth: a structured dataset (`UNIVERSITY_DATA_REGISTER.md` → later a Kirby structure field or JSON) with the fields listed in Part 6. Page types: directory, university profile, programme profile, tuition guide, comparison, admissions guide, application journey. Ternopil National Medical University is the template pilot. No pages will be drafted before Stage 3 verification.

## 8. Application-system specification

Deferred to `APPLICATION_SYSTEM_SPEC.md` — not yet started. Cannot inspect the existing forms (Part 12 requires inspection before design).

## 9. Service-tier specification

Deferred to `SERVICE_TIERS_SPEC.md` — not yet started. Provisional tiers from Part 13 only.

## 10. Staging and release plan

Deferred to `SECURITY_AND_RELEASE_CHECKLIST.md`. Precondition: Hostinger staging access (Part 18) and the codebase.

## 11. Outstanding questions and decisions for the owner

1. **Codebase** — Can the Kirby site (minus secrets and `.env`) be committed to this repository, or exported from Hostinger and attached? Without it there is nothing to audit or build on.
2. **Network access** — Add `ukrainemedicaladmissions.com`, `www.ukrainemedicaladmissions.com`, `web.archive.org` and the official university domains (e.g. `tdmu.edu.ua`) to the cloud environment's allowed domains, or raise the access level. (Environment menu in the session title bar → Edit → Network access; see https://code.claude.com/docs/en/cloud-environments#network-access.)
3. **SEMrush units** — The account currently has no API units. Confirm whether the 50,000 units are on a different account/key, pending renewal, or need topping up (https://www.semrush.com/mcp-access). I will not purchase units or change billing.
4. **Archives** — Where are the earlier audit, content inventory and keyword datasets referenced in Part 3?
5. **Hostinger staging** — Confirm the staging URL / access method and that it is `noindex`ed, before any build work.
