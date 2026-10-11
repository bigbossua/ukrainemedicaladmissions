# SECURITY_AND_RELEASE_CHECKLIST.md

Complete every box before the **first** production write and before each later release. Record the date and who ticked it. Production deployment requires the owner's explicit approval of the specific change.

## A. Before the first production deployment (one-time)

- [ ] **A1 Document root confirmed** for `ukrainemedicaladmissions.com` in hPanel — the FTP Accounts path plus the website entry's platform/connection status (`HOSTING_AND_DEPLOYMENT_ASSESSMENT.md` §10.1); exact path recorded there. Not assumed from File Manager (owner's 2026-10-10 view: empty `public_html`, mapping unconfirmed).
- [ ] **A2 Backup** of that directory downloaded and dated (or dated evidence that it is empty); any database linked to the domain exported. Stored off-server, not in Git. SHA-256 of the archive and the release-manifest fingerprint (`npm run manifest`) recorded in the assessment §9.
- [ ] **A3 Old URLs** inventoried from the backup with `npm run compare:backup -- <dir>` (plus sitemap/Search Console export if available); every legacy URL KEPT or REDIRECTED, no UNCOVERED row left unreviewed; the resulting rules pass `npm run test:redirects` (backlog N1).
- [ ] **A4 Hostinger Git** connected to the **`production` branch only** (branch exists since 2026-10-11: `b2ca3d6`, `release-20261011-005330`) (never `main` or the working branch — they hold source and project documents, not a built site) with the deploy directory = A1 (`public_html/` default shown by Hostinger for this website); auto-deploy understood; the `production` branch is created by the publish workflow (`HOSTING_AND_DEPLOYMENT_ASSESSMENT.md` §12); rollback = re-run the publish workflow from the previous `release-*` tag.
- [ ] **A5 (OPTIONAL — owner waived mandatory staging, 2026-10-10)** Staging subdomain created in hPanel, **password-protected (hPanel → Password Protect Directories)**, connected to the `staging` branch; the staging build itself is noindex everywhere (no canonical/og:url/JSON-LD, no sitemap, robots allows crawling so the noindex is seen, `X-Robots-Tag` in `.htaccess`) — verified by `npm run test:staging`; confirmed absent from search engines after a week.
- [ ] **A5a Repository private** (free; recommended) before any deploy branch is published — public branches are browsable and indexable on GitHub (D8).
- [ ] **A6 `.htaccess` verified (on staging if used, otherwise immediately after the first production deploy)**: HTTPS + non-www redirects, 404 page, security headers, `.json` blocked but `site.webmanifest` served, PHP handler reachable by POST only.
- [ ] **A7 Email**: `mail()` from the handler delivers to the business inbox from staging; SPF/DKIM set for the sending address.
- [ ] **A8 Private storage**: `uma-private/` exists beside the document root, mode 0700, owned by the hosting user; a test record lands there and is not web-accessible (direct URL returns 403/404).
- [ ] **A9 Secrets**: none in Git (`git grep -i -E 'password|secret|api[_-]?key'` clean); `config.php` lives only in `uma-private/`.
- [ ] **A10 Legal**: privacy notice and terms reviewed; entity details inserted (D7); cookie/analytics statement matches what is actually installed.
- [ ] **A11 Search Console** property verified for the non-www HTTPS host; baseline exported.
- [ ] **A12 Owner approval** recorded (date, scope of change).

## B. Every release

- [ ] CI green on the commit (build, astro check, links, meta incl. JSON-LD and `security.txt` expiry, redirect safety, UI smoke, axe, Lighthouse, tooling self-test, staging guard, php -l).
- [ ] `npm run manifest` fingerprint recorded for the release; `.well-known/security.txt` Expires still in the future.
- [ ] Screenshots from CI reviewed at mobile/tablet/desktop for the changed pages.
- [ ] No new page without a `PAGE_ASSET_REGISTER.md` row; no university flipped to `publishable` without `SOURCE_VERIFICATION_REGISTER.md` entries.
- [ ] Sitemap diff reviewed: no private or unverified URL added.
- [ ] Release tag created by the publish workflow; previous tag noted for rollback.
- [ ] Post-deploy live checks: home 200, `/sitemap-index.xml` 200, `/robots.txt` 200, `/api/enquiry.php` GET → 405, `/apply/thank-you/` has noindex, www → non-www 301, HTTP → HTTPS 301, a synthetic enquiry arrives by email and in `uma-private/`.
- [ ] Rollback rehearsed at least once on staging.

## C. Application system (Stage 2+) — additional gates

- [ ] Security review of `APPLICATION_SYSTEM_SPEC.md` §3 controls completed and signed by the owner.
- [ ] Cross-account access tests pass (403), CSRF tests pass, upload validation tests pass.
- [ ] Backup + restore of the document store rehearsed.
- [ ] Incident response contact and breach-notification procedure written.
- [ ] Only synthetic data until all of the above are ticked.

## D. Rollback

1. Actions → Publish deploy branch → "Use workflow from" the previous `release-*` tag → target `production`, confirm `PUBLISH`: adds a fast-forward commit carrying the previous build; Hostinger auto-deploys it.
2. If the handler misbehaves: rename `api/enquiry.php` → 404s safely; the site stays up.
3. If the whole deployment is wrong: restore A2 backup into the document root.
4. Record the incident and cause in `TECHNICAL_REPAIR_BACKLOG.md`.
