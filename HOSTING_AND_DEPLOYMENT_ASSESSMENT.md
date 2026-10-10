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
| Same account hosts other sites | UNVERIFIED (downgraded 2026-10-10, §10) | Nine SSH keys named for unrelated projects (StudyUKToday, EastAfricaMinerals, haringey, houseremovalslewisham, kenyaflowermerchant, quietmindsleep, SMUKN-GitHub-Actions, ugandagoldreport…) prove keys were added, not that other websites live on this plan; the owner's home-directory listing shows no `domains/` directory. **Any file operation on this account is still scoped to this domain's directory only.** |
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
- **D3 — Technology. DECIDED 2026-10-10: Astro-first; no Kirby licence purchase; Kirby only if an already-licensed install is found on the server and reusable at no cost — see `PROJECT_EXECUTION_PLAN.md` §2.** Earlier note: re-opened 2026-10-10 with an adversarial panel (see `PROJECT_EXECUTION_PLAN.md` §2): Kirby is €99 **one-time** (not recurring); recommendation is Astro-first with a written Kirby trigger, but the owner must answer D3 explicitly. First action under either answer: hPanel → PHP Configuration (8.2–8.4 selectable?) and inspection of the real document root.
- ~~**D4 — Staging.**~~ Owner decision 2026-10-10: staging is **not** a prerequisite. The `staging` build mode remains available as optional tooling.
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


---

## 9. First production write — plan skeleton (AWAITING INPUTS, THEN OWNER APPROVAL)

Owner decision 2026-10-10: direct production, no mandatory staging, nothing purchased. This section becomes the approval request once the two unverified fields are filled from the live backup / hPanel evidence.

| Item | Status |
|---|---|
| 1. Verified production document root | **UNVERIFIED** — owner's File Manager shows an empty `public_html` and no `domains/` directory (§10), which points to `public_html` but is **not assumed**; settled by the single check in §10.1 plus the FTP Accounts directory line |
| 2. Current live technology and deployment method | **UNVERIFIED** — needs the backup zip (brief says Kirby; search snippets show a consultancy site with a WhatsApp option, Ternopil address, policy footer) |
| 3. Exact files/directories that will change | The confirmed root will receive the Astro build output: `index.html`, `404.html`, `robots.txt`, `sitemap-index.xml`, `sitemap-0.xml`, `site.webmanifest`, favicons, `og-default.png`, `.htaccess`, and directories `_astro/`, `fonts/`, `brand/`, `api/` (PHP handler), `universities/`, `courses/`, `admissions/`, `tuition-fees/`, `faq/`, `about/`, `services/`, `contact/`, `apply/`, `privacy/`, `terms/`, `complaints-policy/`, `disclosure/`. **Existing files are not deleted by Hostinger Git deploys; conflicting paths are overwritten.** Any legacy file not overwritten stays reachable until explicitly retired in a later approved step. A sibling directory `uma-private/` is created outside the root by the handler on first enquiry. |
| 4. Backup and rollback | Before the write: hPanel → Files → Backups → generate + download a dated full backup of the root (and any database); owner stores it off-server; its SHA-256 recorded here. Rollback: hPanel → Backups → restore files (and DB) from that backup; or republish the previous `release-*` tag via the publish workflow; `api/enquiry.php` can be renamed to disable the form independently. |
| 5. Impact on URLs, indexing, forms, visitors | Legacy `/services` and `/about` keep working (new pages); `/dentistry-admissions-in-ukraine` and `/document-translation-legalisation` 301 to new URLs; any other legacy URL found in the backup gets a 301 before the write. The legacy contact form, phone and WhatsApp are replaced by the enquiry form + email (WhatsApp is not carried over, per brief). Indexing: production build is index-enabled with sitemap; unverified university profiles stay noindex. Visitors see the new site immediately after Hostinger pulls the branch (seconds). |
| 6. Unresolved risks | (a) Document root wrong → deploy lands in the wrong folder (no damage to the live site, but no change either) — mitigated by confirming the path first. (b) Legacy URLs not in the inventory → 404s and lost equity — mitigated by the backup inventory + redirect map before the write. (c) `.htaccess` behaviour on Hostinger LiteSpeed untested → verified immediately after deploy with the post-deploy checks (checklist §B). (d) `mail()` deliverability untested → first live enquiry is a synthetic test by the owner. (e) PHP version must be ≥ 8.1 for the handler's syntax (uses `declare(strict_types=1)`, arrow functions, `??`) — confirm in hPanel. (f) The repository is public — make private (D8) before the `production` branch exists. |

### 9.1 Evidence still needed before the plan can be approved (exact list)

| # | Missing fact | Evidence that settles it | What I derive from it |
|---|---|---|---|
| E1 | **Whether this server is production, and which directory serves `ukrainemedicaladmissions.com`** | **The single check in §10.1**: hPanel website dashboard (domain-pointing status + server IP) and `nslookup`/`dig` from the owner's computer; then hPanel → Websites → *ukrainemedicaladmissions.com* → **Files / FTP accounts** (directory line) | Field 1 of the plan; the Hostinger Git deploy directory; whether a write here changes the live site at all |
| E2 | **Live technology and files** | hPanel → Files → **Backups → Files backup → download** (or File Manager → that directory → Compress → download) and upload the zip to this session. If §10.1 shows production is on another host, the backup comes from that host instead. If the confirmed root is empty, E2 is a one-line statement to that effect. | Field 2 (CMS/framework, PHP use, forms, redirects, `.htaccess`, sitemap, every URL) → complete redirect map (A3), confirmation that nothing valuable is lost, exact list of files that will be overwritten — to be produced by `site/scripts/compare-live-backup.mjs` (in development on this branch) |
| E3 | **PHP version on the plan** | Screenshot of hPanel → Advanced → **PHP Configuration** | Risk (e) — the enquiry handler needs PHP ≥ 8.1 |
| E4 | **Any database tied to the domain** | Screenshot of hPanel → **Databases** | Whether a DB export belongs in the backup (A2) |
| E5 | **Backup taken and stored** | The dated backup zip name + its SHA-256 (I compute it from the upload) kept off-server by the owner | Field 4 — rollback artefact; without it no first write |
| E6 | **Hostinger Git connection** | Screenshot of hPanel → Advanced → **Git** after connecting `bigbossua/ukrainemedicaladmissions`, branch `production`, directory = E1 | Field 3's write mechanism; deploy = push to `production` |
| E7 | **Repository private (D8)** | GitHub → Settings → Danger zone → Change visibility → Private (free) | Closes GitHub-side exposure before any deploy branch exists |

With E1–E5 in hand I fill §9 fields 1, 2 and 4, finish the redirect map from the real URL list, and present the itemised plan for approval. E6–E7 are needed before the approved write, not before the plan.

---

## 10. File Manager evidence 2026-10-10 (late evening) — domain mapping still UNCONFIRMED

**Observed by the owner in hPanel File Manager (reported, trusted as an observation):**

| Observation | Label |
|---|---|
| The account home directory contains a `public_html` directory and a file named `DO_NOT_UPLOAD_HERE`. No `domains/` directory was reported. | OBSERVED (owner) |
| `public_html` is empty. | OBSERVED (owner) — matches the earlier screenshot (§1) |
| `public_html` is the document root of `ukrainemedicaladmissions.com` | **UNCONFIRMED — not assumed** (owner's instruction) |

**What the observation is consistent with (each labelled):**

| Reading | Basis | Status |
|---|---|---|
| The home directory is `/home/u…/`; Hostinger places `DO_NOT_UPLOAD_HERE` there because files in the home directory are not web-served; the website's files belong in `public_html` (primary domain) or `domains/<domain>/public_html` (additional domains). | Hostinger support article cited in §1; marker-file meaning from Hostinger documentation as remembered | UNVERIFIED on this account |
| No `domains/` directory listed ⇒ this plan serves one website, and `public_html` is that website's root. hPanel already shows `ukrainemedicaladmissions.com` as the website on this plan (§1, SSH Access screenshot). The nine SSH keys named for other projects (§1) prove only that keys were added, not that other websites are hosted on this plan — that earlier "same account hosts other sites" line is downgraded to UNVERIFIED. | Owner's listing + §1 screenshots | UNVERIFIED (depends on the listing being complete; hidden entries are possible) |
| If `public_html` is the root **and** the search index still lists live pages (`/services`, `/about`, …), then either (a) the domain's DNS points at another server where the old site still runs, or (b) the old site was removed from here and the search index is stale, or (c) the old site is a Hostinger Website Builder site, which keeps no files in `public_html` (less likely: the website entry shows an SSH Access menu, which builder sites do not have — approximate UI claim). | Reasoning from §1 + legacy inventory in `PAGE_ASSET_REGISTER.md` | UNVERIFIED — exactly the point the next check settles |
| DNS evidence from this container | Attempted 2026-10-10 17:47 UTC: no system resolver for the domain (`getent`/Python: name not known), `dig` absent, DNS-over-HTTPS to Google and Cloudflare refused by the proxy (403). | VERIFIED — not obtainable from here |

**Why this matters for the first write:** the plan in §9 writes the Astro build into the document root via Hostinger Git. If DNS does not point at this server, that write changes nothing visitors see and the real production target is elsewhere; if DNS does point here and the root is empty, the write overwrites nothing and the "legacy URLs" are already dead, so the redirect map protects only residual index entries and inbound links.

### 10.1 The single remaining hosting check

**Does `ukrainemedicaladmissions.com` resolve to this Hostinger server?** One question, two free read-only readings that answer it together:

1. **hPanel → Websites → `ukrainemedicaladmissions.com` → Dashboard.** Screenshot the top of the dashboard where hPanel states whether the domain is pointing to Hostinger (a warning banner appears when it is not — UI wording approximate), and the hosting details panel that shows the **server IP address** (also under Hosting → Manage → Details, label approximate).
2. **On the owner's own computer:** run `nslookup ukrainemedicaladmissions.com` (Windows) or `dig +short ukrainemedicaladmissions.com` (macOS/Linux) and screenshot the result.

Reading the result:

| Result | Meaning | Effect on §9 |
|---|---|---|
| The resolved IP **equals** the hPanel server IP and hPanel shows the domain pointing to Hostinger | This plan is production. With no `domains/` directory, `public_html` is the root (then CONFIRMED by hPanel → Files → FTP Accounts, whose directory line prints the absolute path — take that screenshot too). The live site is therefore empty/removed and the indexed legacy pages are stale. | Field 1 = that path; field 2 = "no live files"; E2 backup becomes a formality (empty root); redirects protect only old links; first write overwrites nothing. |
| The resolved IP **differs** (another host, or a proxy/CDN) | Production is served elsewhere; this plan is not the live target. | §9 pauses. The next decision is the owner's: move DNS to this server (a DNS change — separate approval, after the build is deployed here and verified on the server's temporary/preview URL) or deploy to the other host instead. Nothing on either host is touched until then. |
| Nothing resolves (domain expired/parked) | No live site; visitors already get nothing. | First write cannot damage anything; DNS/registration must be fixed by the owner first. |

Until this check is done, nothing is deployed, deleted or modified on the server, nothing is purchased, and the branch continues to carry only repository work.
