# HOSTING_AND_DEPLOYMENT_ASSESSMENT.md — Phase 1 (read-only)

**Date:** 2026-10-10
**Scope:** Repository and hosting access, deployment options, architecture recommendation, backup/rollback plan, roadmap, decisions required.
**Labels:** VERIFIED (observed directly, evidence named) · UNVERIFIED (reported or inferred, not checked) · PROPOSED (needs owner approval)

No production system was changed. No credentials were requested, received or recorded. Host, port and username visible in the owner's hPanel screenshot are deliberately **not** reproduced here.

---

## 1. Repository and hosting access

| Item | Status | Evidence |
|---|---|---|
| GitHub `bigbossua/ukrainemedicaladmissions` read/write | VERIFIED | Branch `claude/new-session-ppgh22` pushed at `26e11d8`; `main` untouched at `d9a4542`. |
| Repository contents | VERIFIED | Master brief + three Stage 1 documents. **No website code of any kind.** |
| `studymedicineuknigeria` project | VERIFIED — not referenced | Not in this repo, not in this session. Nothing from it is used. |
| Hostinger account holds this site | VERIFIED (screenshot) | hPanel → Websites → `ukrainemedicaladmissions.com` → Advanced → SSH Access; SSH status ACTIVE. |
| Hosting type / plan | UNVERIFIED | hPanel (not cPanel) shared hosting with PHP Configuration, Databases, Cron Jobs, Cache Manager and a Git menu — consistent with a Hostinger Web/Business plan. Exact plan and PHP version not yet read. |
| Same account hosts other sites | VERIFIED (screenshot) | Nine SSH keys named for unrelated projects (StudyUKToday, EastAfricaMinerals, haringey, houseremovalslewisham, kenyaflowermerchant, quietmindsleep, SMUKN-GitHub-Actions, ugandagoldreport…). **Any file operation on this account must be scoped to this domain's directory only.** |
| `public_html` shown in File Manager is empty | VERIFIED (screenshot) | `srv1376-files.hstgr.io/…/files/public_html/` → "It feels lonely here…". |
| `public_html` is this domain's document root | **UNVERIFIED — do not assume** | Hostinger uses `/home/<user>/public_html` for the primary domain and `/home/<user>/domains/<domain>/public_html` for additional domains ([Hostinger support](https://www.hostinger.com/support/1583494-what-is-the-path-to-your-website-s-root-home-directory-and-how-to-change-it-in-hostinger/)). With nine other projects on the account, this domain is likely an *additional* domain, so the empty folder shown may be a different site's root (or the primary root). See Decision D1. |
| Old website files (the ~55-URL Kirby site from earlier audits) | UNVERIFIED — location unknown | Not in the empty folder shown. Either under `domains/ukrainemedicaladmissions.com/public_html`, already removed, or never on this account. |
| SSH from this Claude environment | VERIFIED — NOT POSSIBLE | TCP connection to the SSH host/port times out (network policy) and no `ssh` client is installed in the container. |
| Hostinger docs / hPanel / production domain from this environment | VERIFIED — NOT REACHABLE | DNS/proxy denial for `hostinger.com`, `docs.hostinger.com`, `support.hostinger.com`, `ukrainemedicaladmissions.com`, `web.archive.org`, university domains. |
| SEMrush API | VERIFIED — 0 units | See `SEMRUSH_API_LEDGER.md`. |

## 2. Deployment options

| Option | Status | Assessment |
|---|---|---|
| **A. Hostinger Advanced → Git (GitHub App auto-deploy)** | PROPOSED — recommended | Hostinger's documented flow: connect GitHub, choose repository, branch and deploy directory; auto-deploys on push ([Hostinger docs](https://docs.hostinger.com/websites/git), [support article](https://www.hostinger.com/support/?p=1537)). **No secrets ever enter this environment**; the owner authorises once in hPanel. Branch-based: `main` → production directory; a `staging` branch → a staging subdomain's directory. Limitation (UNVERIFIED): whether it runs Composer/build steps — assume it does **not**, so the deployed branch must contain built output. |
| B. GitHub Actions → SSH/rsync to Hostinger | PROPOSED — fallback | Pattern the owner already uses (`SMUKN-GitHub-Actions` key). Requires a dedicated deploy key stored only as a GitHub Actions secret, never in this environment. Allows build steps before upload. More moving parts than A. |
| C. SSH/SFTP from this Claude environment | VERIFIED — not available | Blocked by network policy; no client. Not pursued and no bypass attempted. |
| D. Manual upload via hPanel File Manager | PROPOSED — emergency only | Not repeatable; no audit trail. |

## 3. Architecture and technology recommendation (PROPOSED)

**Constraints:** shared PHP hosting (no Node runtime at request time, MySQL available), succession requirement (owner's daughter must edit content without a developer), application system with private uploads later, zero paid tooling preferred.

**Recommendation — two-layer, Git-deployed:**

1. **Public site: Kirby CMS (flat-file PHP)** in `site/`, deployed via Option A.
   - Already named in the master brief; runs natively on Hostinger shared PHP; no database for content; every university, programme and fee record is a versioned text file in Git = the "single source of truth" the brief requires (`UNIVERSITY_DATA_REGISTER` becomes structured content, not a parallel document).
   - Kirby Panel gives a non-technical editor a secure login to update fees, deadlines and FAQs.
   - Cost: Kirby requires a paid licence per production site (price to be confirmed on getkirby.com — UNVERIFIED here). If £0 tooling is mandatory, the alternative is **Astro** (static, built in GitHub Actions, deployed via Option B) with content as Markdown/JSON — no editor UI for the successor.
2. **Application system (Phase 5): separate PHP module** under `/apply/` with its own MySQL database, outside the CMS content tree, `noindex`, uploads stored **above** the web root with authenticated download only. Designed before built; synthetic data only; no payments until approved.

**Site map (v1):** `/` · `/universities/` (+ filters) · `/universities/<slug>/` · `/courses/{medicine,dentistry,nursing,pharmacy}/` (only where availability is verified) · `/admissions/` (requirements + process) · `/tuition-fees/` · `/faq/` · `/about/` · `/contact/` · `/apply/` (private journey). One canonical URL per keyword cluster; no city pages until SEMrush evidence exists.

## 4. Backup and rollback plan (PROPOSED)

Pre-conditions before the first production write:
1. **Identify the real document root** for the domain (hPanel → Websites → domain → Files/FTP accounts shows the exact path) — Decision D1.
2. **Full file backup of that directory**: hPanel → Files → Backups → generate and download; keep a dated copy off-server. If the directory is genuinely empty, record that fact with a screenshot and date — then there is nothing to lose, but the record still proves it.
3. **Database check**: hPanel → Databases — list any database linked to this domain; export it before anything else touches it. Do not commit the export to Git.
4. **Rollback**: because deployment is Git-based, rollback = redeploy the previous tag. Tag every production release (`v0.1.0`, …). For the first release, rollback = restore the step-2 backup (or re-empty the directory if it was empty).
5. **Private data**: `.env`, uploads and database dumps are git-ignored from day one; `.gitignore` committed before any code.

## 5. Prioritised roadmap (PROPOSED)

| # | Step | Depends on |
|---|---|---|
| 1 | Owner resolves decisions D1–D5 below | — |
| 2 | Brand identity (Phase 2): logo SVG/PNG, favicons, colour + type system — produced in this repo, no hosting needed | — |
| 3 | Scaffold Kirby (or Astro) site skeleton, design system, templates for the v1 site map; `.gitignore`, `robots.txt`, sitemap, canonical rules | D3 |
| 4 | Staging: connect hPanel Git to a `staging` branch → staging subdomain, `noindex` + HTTP auth | D2, D4 |
| 5 | Content: Ternopil NMU profile first, verified against official sources (needs network access or owner-supplied official PDFs) | D5 |
| 6 | Directory + remaining universities, fees with sources/dates; FAQs; admissions guide | 5 |
| 7 | SEMrush keyword→URL map once units exist; Search Console baseline | SEMrush units |
| 8 | Application-system specification (`APPLICATION_SYSTEM_SPEC.md`), then build with synthetic data | approval |
| 9 | Validation (security, mobile, performance, SEO, forms) on staging; written results | 4–8 |
| 10 | Release plan → explicit approval → `main` deploy → live verification → tag | approval |

## 6. Decisions and permissions required from the owner

- **D1 — Document root.** In hPanel, open the domain's FTP/File details and confirm the exact path for `ukrainemedicaladmissions.com`. Is it `/public_html` or `/domains/ukrainemedicaladmissions.com/public_html`? Is it empty?
- **D2 — Deployment method.** Approve Option A (hPanel Git ↔ GitHub App) as primary, Option B as fallback. You perform the one-time GitHub authorisation in hPanel; I never hold a key.
- **D3 — Technology. DECIDED 2026-10-10: Option C (Astro-first, Kirby on written trigger) — see `PROJECT_EXECUTION_PLAN.md` §2.** Earlier note: re-opened 2026-10-10 with an adversarial panel (see `PROJECT_EXECUTION_PLAN.md` §2): Kirby is €99 **one-time** (not recurring); recommendation is Astro-first with a written Kirby trigger, but the owner must answer D3 explicitly. First action under either answer: hPanel → PHP Configuration (8.2–8.4 selectable?) and inspection of the real document root.
- **D4 — Staging.** Approve creating a `staging.ukrainemedicaladmissions.com` subdomain in hPanel (DNS change, so owner-performed) with its own directory.
- **D5 — Network access for verification.** Add the university domains (`tdmu.edu.ua` first), `hostinger.com`/`docs.hostinger.com`, and `ukrainemedicaladmissions.com` to the cloud environment's allowed domains, or supply official fee/admissions PDFs as uploads. Without one of these, no university facts will be written.
- **D6 — SEMrush.** Confirm which account/key holds the 50,000 units.
- **D7 — Brand.** Confirm I may finalise the logo design without a review round, as stated, or whether you want to see two directions first.

---

## 7. Update 2026-10-10 — deployment design now in the repository (PROPOSED, inactive)

| Piece | Where | State |
|---|---|---|
| CI: build + `astro check` + link/meta/UI tests + `php -l` on every push touching `site/` | `.github/workflows/ci.yml` | Active on push (runs in GitHub, changes nothing outside the repo) |
| Deploy-branch publisher: `target: staging` builds with `STAGING=1` (every page noindex, robots disallow all, no sitemap, `X-Robots-Tag` header) → branch `staging`; `target: production` → branch `production` with `PUBLISH` confirmation and a `release-<timestamp>` tag | `.github/workflows/publish-production-branch.yml` | **Manual trigger only**; pushes nothing to Hostinger by itself |
| Hostinger side | hPanel → Advanced → Git → connect `bigbossua/ukrainemedicaladmissions`, branch `production`, deploy dir = confirmed document root (D1) | **Owner action; not done** |
| Staging | Owner: create `staging.ukrainemedicaladmissions.com` + directory in hPanel, enable hPanel password protection on it, connect Hostinger Git to branch `staging` (D4). Repo side ready. | Owner action pending |
| Hosting rules | `site/public/.htaccess` (HTTPS + non-www canonical, headers, CSP, caching, private-file blocks) | Untested on Hostinger LiteSpeed — test on staging first |
| Private data | PHP handler writes to `<document-root-parent>/uma-private/` (override with `UMA_PRIVATE_DIR`); `config.php` there holds notify address / mail toggle; nothing secret in Git | Tested locally with PHP's built-in server |
| Rollback | Republish previous `release-*` tag via the workflow, or restore the pre-deployment backup | Documented in `SECURITY_AND_RELEASE_CHECKLIST.md` §D |

SSH from this environment remains **not possible** (connection timeout + no client) and was not attempted further. No DNS, hosting or production change has been made.

---

## 8. Direction change 2026-10-10 (evening): direct production development — inspection attempt and routes

**Owner's instruction:** work directly on the live site; staging is no longer a prerequisite; the first production write still requires an explicit, itemised approval; no uncontrolled overwrite.

**Re-tested from this environment (all VERIFIED, same session):**

| Target | Result |
|---|---|
| `https://ukrainemedicaladmissions.com/` (also `/services`, `/robots.txt`, `/sitemap.xml`, `www.`, `http://`) | 000 — connection refused by the environment's network policy |
| `hpanel.hostinger.com`, `developers.hostinger.com` | 000 — blocked |
| SSH/SFTP port on the Hostinger host | TCP connect times out; **no `ssh`/`sftp` client installed** (`curl` has sftp/scp/ftp support, but the TCP path is closed) |
| Hostinger credentials or API token in the environment | none present |
| Browser / remote-device tools (to use the owner's logged-in hPanel) | none attached to this session |
| Official university domains | 000 — blocked |

**Consequence:** the live files, document root, PHP version, routing, forms, redirects and sitemap **cannot be inspected from this container**, and no file on the server can be read or written from it. Three routes make direct production work possible without that:

| Route | What it gives | What the owner does | Network needed here |
|---|---|---|---|
| **R1 — Hostinger Git (recommended for writes)** | Hostinger pulls the `production` branch into the directory the owner chooses; every deploy is a Git push from this repo; rollback = republish the previous release tag or a backup | hPanel → Websites → domain → Advanced → Git → connect `bigbossua/ukrainemedicaladmissions`, branch `production`, deploy directory = the real document root | none |
| **R2 — Backup upload (recommended for inspection)** | The live files themselves: CMS, PHP, `.htaccess`, forms, sitemap, redirects — read here, nothing touched on the server | hPanel → Files → Backups (or File Manager → select the real site directory → Compress) → download the zip → upload it to this session; also a screenshot of hPanel → domain → FTP/Files showing the path, and PHP Configuration | none |
| **R3 — Allow-list + credentials** | Live HTTP inspection of the domain; SFTP only if non-HTTP egress is enabled, which it currently is not | Environment settings → Network: add `ukrainemedicaladmissions.com`, `www.`, `hpanel.hostinger.com`; for SFTP a credential stored as an environment secret (never pasted in chat) and a network policy that permits the SSH port | yes |

**Semrush as live-site evidence (reachable; costed; awaiting approval):** `resource_organic_unique` for the production domain lists the live pages that currently rank (the pages carrying SEO equity) — published price 10 units per row, `display_limit` 50 ⇒ **≤ 500 units**, almost certainly far fewer because the domain ranks for few terms. `resource_organic` (keyword → URL, position) ⇒ same per-row price, ≤ 500. `list_projects` reveals whether a Site Audit crawl (status codes, redirects, pages) already exists — Semrush documents Projects API calls as not consuming Standard API units, but that is UNVERIFIED here; it will be run only on approval and its metered usage recorded.

**No production write will be made before the owner approves an itemised first-change plan** (document root, live technology, exact files, backup/rollback, URL/indexing/form impact, unresolved risks).
