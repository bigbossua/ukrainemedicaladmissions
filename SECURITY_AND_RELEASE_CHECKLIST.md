# SECURITY_AND_RELEASE_CHECKLIST.md

Complete every box before the **first** production write and before each later release. Record the date and who ticked it. Production deployment requires the owner's explicit approval of the specific change.

## A. Before the first production deployment (one-time)

- [ ] **A1 Document root confirmed** for `ukrainemedicaladmissions.com` in hPanel (exact path recorded in `HOSTING_AND_DEPLOYMENT_ASSESSMENT.md`). Not assumed from File Manager.
- [ ] **A2 Backup** of that directory downloaded and dated (or dated evidence that it is empty); any database linked to the domain exported. Stored off-server, not in Git.
- [ ] **A3 Old URLs** inventoried (sitemap/Search Console export) and a redirect map prepared (backlog N1) so existing equity is preserved.
- [ ] **A4 Hostinger Git** connected to the `production` branch with the deploy directory = A1; auto-deploy understood; rollback = republish previous release tag.
- [ ] **A5 Staging** subdomain created in hPanel, **password-protected (hPanel → Password Protect Directories)**, connected to the `staging` branch; the staging build itself is noindex everywhere (no canonical/og:url/JSON-LD, no sitemap, robots allows crawling so the noindex is seen, `X-Robots-Tag` in `.htaccess`) — verified by `npm run test:staging`; confirmed absent from search engines after a week.
- [ ] **A5a Repository private** (or exposure accepted in writing) before the first staging publish — a public `staging` branch is browsable on GitHub (D8).
- [ ] **A6 `.htaccess` verified on staging**: HTTPS + non-www redirects, 404 page, security headers, `.json` blocked but `site.webmanifest` served, PHP handler reachable by POST only.
- [ ] **A7 Email**: `mail()` from the handler delivers to the business inbox from staging; SPF/DKIM set for the sending address.
- [ ] **A8 Private storage**: `uma-private/` exists beside the document root, mode 0700, owned by the hosting user; a test record lands there and is not web-accessible (direct URL returns 403/404).
- [ ] **A9 Secrets**: none in Git (`git grep -i -E 'password|secret|api[_-]?key'` clean); `config.php` lives only in `uma-private/`.
- [ ] **A10 Legal**: privacy notice and terms reviewed; entity details inserted (D7); cookie/analytics statement matches what is actually installed.
- [ ] **A11 Search Console** property verified for the non-www HTTPS host; baseline exported.
- [ ] **A12 Owner approval** recorded (date, scope of change).

## B. Every release

- [ ] CI green on the commit (build, astro check, links, meta, UI smoke, php -l).
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

1. hPanel → Advanced → Git → deploy the previous `release-*` tag (or re-run the publish workflow from the previous commit).
2. If the handler misbehaves: rename `api/enquiry.php` → 404s safely; the site stays up.
3. If the whole deployment is wrong: restore A2 backup into the document root.
4. Record the incident and cause in `TECHNICAL_REPAIR_BACKLOG.md`.
