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

**Observed by the owner in hPanel File Manager (reported; trusted as an observation):**

| Observation | Label |
|---|---|
| The directory shown as the account home contains a `public_html` directory and a file named `DO_NOT_UPLOAD_HERE`. No `domains/` directory was reported. | OBSERVED (owner) |
| `public_html` is empty. | OBSERVED (owner) — matches the earlier screenshot (§1) |
| `public_html` is the document root of `ukrainemedicaladmissions.com` | **UNCONFIRMED — not assumed** (owner's instruction) |

**What Hostinger's own documentation says (search-snippet evidence gathered 2026-10-10; direct fetches of hostinger.com are blocked here, so each line is labelled):**

| Claim | Basis | Label |
|---|---|---|
| A website's root is in one of two forms: `/home/uNNNNNNNN/domains/<domain>/public_html` or `/home/uNNNNNNNN/public_html`. Which form an account uses is not stated in the docs; it must be read from hPanel. | Hostinger support 1583494 ("It will be in either one of the two following formats…") | SNIPPET-BACKED |
| The documented place to read the exact directory serving a website is hPanel → Websites → the site's Dashboard → **FTP Accounts** → the root path shown in the "Create New FTP account" section (also on the Plan Details page). | Hostinger support 1583494 | SNIPPET-BACKED |
| The File Manager has two entry modes: opened from a website's dashboard it starts **inside that website's folder** (`public_html` + the `DO_NOT_UPLOAD_HERE` marker beside it); opened account-wide it shows the `domains` folder and system directories. **A view showing only `public_html` + `DO_NOT_UPLOAD_HERE` is therefore a website-scoped folder and does not by itself say which domain it serves, nor whether other websites exist.** | docs.hostinger.com File Manager page; community reports on the marker file | SNIPPET-BACKED (marker semantics: community, not official) |
| A Hostinger Website Builder site is **not** served from `public_html` at all; the File Manager is unavailable for builder sites. An empty `public_html` is fully consistent with a live builder site. Leaving the builder means deleting the builder website and adding an "Empty PHP/HTML" website — destructive by design, and builder export is a ZIP whose format is not documented as plain HTML. | Hostinger support 4548688, 6639802, 8412815 | SNIPPET-BACKED |
| In Websites, each entry shows a platform icon (WordPress / Website Builder / other) and builder sites carry an **Edit Website** button; a domain not pointing at Hostinger shows a **Domain not connected** / **Temporary domain** notice with a Check guide button. | Hostinger support ?p=821, 1863967 | SNIPPET-BACKED (labels approximate) |
| Hostinger Git deployment: root directory defaults to `public_html`, any directory can be chosen, deployed files **overwrite** existing files at the same paths; whether files absent from the repository are deleted is **not documented** — assume they remain. File Manager deletions are permanent by default. | Hostinger support 1583302, 4548688 | SNIPPET-BACKED / UNVERIFIED (deletion behaviour) |
| Whether the top-level `public_html` is a link to the main domain's folder | no Hostinger source found | UNVERIFIED |

**Consequences for the reading of the observation.** My earlier inference in this section that "no `domains/` directory ⇒ one website on the plan" is withdrawn: the view the owner described is what a website-scoped File Manager shows for *any* website. The observation is consistent with all of these, which lead to different first-write plans:

| Hypothesis | What it would mean | How the single check (§10.1) resolves it |
|---|---|---|
| H1 — the folder is this domain's root and the site was never deployed here (or was removed); the indexed legacy pages are stale or served elsewhere | Writing here overwrites nothing; redirects protect only old links | FTP Accounts path = the browsed folder; no builder icon; domain connected |
| H2 — the live site is a Hostinger Website Builder site | `public_html` is unused; replacing it with the Astro build requires deleting the builder website — an irreversible step that needs a prior builder export and **separate approval**; not a routine deploy | Websites entry shows the builder icon / Edit Website button |
| H3 — the domain's DNS points at another host; this plan is not production | A write here changes nothing visitors see; the production target is the other host or a DNS move (separate approval) | "Domain not connected" / "Temporary domain" notice on the entry; `nslookup` from the owner's computer differs from the hPanel server IP |
| H4 — the folder browsed belongs to a different website on the account | This domain's root is elsewhere (`domains/ukrainemedicaladmissions.com/public_html`) and may hold the legacy files | FTP Accounts path differs from the browsed folder |

**DNS evidence from this container:** attempted 2026-10-10 17:47 UTC — no system resolver for the domain (`getent`/Python: name not known), `dig` absent, DNS-over-HTTPS to Google and Cloudflare refused by the proxy (403). VERIFIED: not obtainable from here.

### 10.1 The single remaining hosting check

**hPanel → Websites → the entry for `ukrainemedicaladmissions.com` → Dashboard → FTP Accounts.** One read-only visit; screenshot three things on the way:

1. The website **entry** itself in the Websites list: its platform icon, whether it has an **Edit Website** button (builder) and whether a **Domain not connected** or **Temporary domain** notice is shown.
2. In the Dashboard sidebar, **FTP Accounts** → the absolute directory path printed in the "Create New FTP account" section (expected form `/home/uNNNNNNNN/domains/ukrainemedicaladmissions.com/public_html` or `/home/uNNNNNNNN/public_html`). This is Hostinger's own statement of which directory serves the domain.
3. Optional corroboration, from the owner's own computer: `nslookup ukrainemedicaladmissions.com` (Windows) or `dig +short ukrainemedicaladmissions.com` (macOS/Linux), compared with the server IP shown in hPanel's hosting details.

| Result | Reading | Effect on §9 |
|---|---|---|
| No builder icon, no "not connected" notice, FTP path = the folder browsed (empty) | H1. This plan is production and its root is empty. | Field 1 = that path; field 2 = "no live files"; E2 is a one-line statement; first write overwrites nothing; redirects protect old links and index entries. |
| Builder icon / Edit Website button | H2. The live site is a builder site. | §9 pauses. A decision gate is added: export the builder site, then delete it and create an "Empty PHP/HTML" website — only with separate explicit approval. |
| "Domain not connected" / "Temporary domain", or `nslookup` IP ≠ hPanel server IP | H3. Production is elsewhere. | §9 pauses. Owner decides: deploy here and move DNS later (DNS change = separate approval) or deploy to the other host. |
| FTP path ≠ the folder browsed | H4. The real root is elsewhere on this account. | Owner opens File Manager from this website's dashboard, repeats E1/E2 for that folder; the comparison tooling in §11 then produces the redirect map and collision list. |

Until this check is done, nothing is deployed, deleted or modified on the server, nothing is purchased, and the branch carries only repository work.

---

## 11. Network-independent first-write tooling (on the branch; nothing runs against the server)

Built 2026-10-10 so that the moment E1/E2 arrive the first-write plan can be completed from evidence rather than assumptions. All commands run from `site/` after `npm run build`; none touches the network or the server.

| Tool | Command | What it produces | Feeds |
|---|---|---|---|
| Release manifest | `npm run manifest` | `tests/output/release-manifest.json`: every file a deploy would write, bytes, SHA-256, and a release fingerprint (SHA-256 over all path+hash lines); a top-level table on the console | §9 field 3 (exact files that will change); the fingerprint is recorded next to the backup hash before and after the first write |
| Live-backup comparison | `unzip -q backup.zip -d <dir>` then `npm run compare:backup -- <dir>` | `tests/output/live-backup-report.md`: document-root candidates; technology markers (presence only — WordPress, Kirby incl. licence-file presence, Composer, PHP, static); the legacy `.htaccess` redirect/rewrite lines; sitemap URLs; the legacy URL inventory with titles; coverage of every legacy URL as KEPT / REDIRECTED / UNCOVERED; **proposed** `RedirectMatch` lines for uncovered URLs (never applied); collisions (live files the build overwrites, with sizes); untouched live files (stay reachable); counts of pages with messaging-app or `tel:` contacts; sensitive files flagged and never read | §9 fields 2, 3, 5, 6; backlog N1 (redirect map), N10 (legacy contact channels); checklist A2/A3 |
| Redirect safety test | `npm run test:redirects` | Fails the build if `.htaccess` carries a prefix `Redirect`, an unanchored `RedirectMatch`, a target without a built page, a redirect chain or loop, a page that is both built and redirected, a missing host-scoped canonical rule, or a 404 document that does not exist | Checklist A6/B; runs in CI |
| Tooling self-test | `npm run test:release` | Runs the manifest over `dist/` and the comparator over a synthetic fixture (`tests/fixtures/legacy-backup/`, clearly marked synthetic) and asserts every classification, the proposed-line format, sensitive-file flagging, collision listing and that no fixture body text leaks into the report | CI (`npm test`) |

The comparator reads only directory listings, `.html`/`.php` text, `.htaccess` rules and sitemap URLs. It never opens `.sql`, `.env`, archives, keys or `wp-config.php`; it reports their presence so they are excluded from any deploy.
