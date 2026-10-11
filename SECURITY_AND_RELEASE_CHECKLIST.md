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

## C. Application system (Stage 2+) — additional gates (refreshed 2026-10-11)

Design: `APPLICATION_SYSTEM_SPEC.md` §14. Go-live gates: §11. Test ids (T-…) are defined in §14.15. **Stage 2 is not built, so nothing in this section can be ticked today.** Tick a box only with evidence (test report, dated screenshot or signed log), and write the date and who ticked it beside the box.

**C1 Scope and data**
- [ ] C1.1 Release scope written down: 2a (accounts, save-and-resume, readiness, checklist; no uploads) or 2b (uploads and reviewer queue). §14.0
- [ ] C1.2 Every environment holds synthetic records only (`@example.invalid`) until C13 is signed. §14.0, §11
- [ ] C1.3 If 2a is to open before every §11 gate is met (EXECUTIVE_REPORT §K.8 proposal), §11 carries an explicit, dated line naming that scope. §14.0

**C2 Host facts (dated screenshot or first synthetic test on the host)** §14.2
- [ ] C2.1 H1: document root path, and the sibling private directory writable by PHP (with A1, A8).
- [ ] C2.2 H2, H3: PHP ≥ 8.2 and the listed extensions; `argon2id` in `password_algos()` if passwords will be offered.
- [ ] C2.3 H4: database engine and version; a dedicated database; least-privilege users (or a note that only all-privileges users exist).
- [ ] C2.4 H5: cron runs PHP scripts.
- [ ] C2.5 H6: authenticated SMTP works; SPF and DKIM (and DMARC) present; a synthetic magic-link e-mail arrives outside spam (with A7, backlog N4).
- [ ] C2.6 H7: PHP upload and memory limits at or above the §14.5 caps.
- [ ] C2.7 H8: `REMOTE_ADDR` is the visitor's address.
- [ ] C2.8 H9: the server cache does not store `/apply/app/` responses.
- [ ] C2.9 H10: whether a per-file malware scanner is available, recorded as yes or no.
- [ ] C2.10 H11: deploy route for code outside the web root chosen and tested with a dummy file; H12 quota noted.

**C3 Configuration and secrets** §14.3
- [ ] C3.1 `uma-app/` and `uma-private/stage2/` sit outside the web root; `stage2/config.php` is mode 0600; the data directories are 0700.
- [ ] C3.2 No secret in Git (`git grep -i -E 'password|secret|api[_-]?key'` clean, as A9); keys generated on the server or by the owner, never in chat or e-mail.
- [ ] C3.3 `display_errors` off and `log_errors` on, shown by T-LOG-2 on the host.
- [ ] C3.4 The only Stage-2 PHP file in the web root is `apply/app/index.php`; any other `.php` under `apply/app/` is denied.

**C4 Authentication and sessions** §14.5 · §11 gate 1
- [ ] C4.1 Magic links: T-AUTH-1 to T-AUTH-8 pass.
- [ ] C4.2 Sessions: T-SESS-1 to T-SESS-5 pass (cookie flags, new id at sign-in, idle and absolute timeouts, sign out everywhere).
- [ ] C4.3 Staff MFA: T-MFA-1 to T-MFA-4 pass; every staff account has enrolled.
- [ ] C4.4 Passwords switched off, or T-PWD-1 to T-PWD-3 pass (Argon2id only).

**C5 Request protections** §14.6 · §11 gates 1 and 3
- [ ] C5.1 CSRF: T-CSRF-1 to T-CSRF-3 pass.
- [ ] C5.2 Rate limits and abuse: T-RATE-1 to T-RATE-3 and T-ABUSE-1 pass.
- [ ] C5.3 Input and output: T-INPUT-1 to T-INPUT-5 and T-XSS-1 pass.
- [ ] C5.4 Headers: T-HDR-1 and T-HDR-2 pass in CI, and T-HDR-3 passes against the host.

**C6 Authorisation** §14.9 · §11 gate 7
- [ ] C6.1 Cross-account matrix: T-AUTHZ-1 to T-AUTHZ-8 pass (403, no data, no change).
- [ ] C6.2 State rules: T-STATE-1 to T-STATE-4 pass (state 4 only with a recorded receipt; item transitions only as listed).
- [ ] C6.3 Readiness rules: T-READ-1 to T-READ-5 pass (no score or verdict; unverified requirements give `unknown`).
- [ ] C6.4 The owner has read the cross-account report and confirmed the reviewer and admin roles.

**C7 Uploads (2b only)** §14.7 · §11 gate 2
- [ ] C7.1 T-UPL-1 to T-UPL-8 pass.
- [ ] C7.2 The PDF rule (§14.7) accepted by the owner; if C2.9 is "no", the owner's written decision on uploads without a scanner.
- [ ] C7.3 Reviewers briefed to open PDFs only in a browser's built-in viewer.

**C8 Audit and logging** §14.10
- [ ] C8.1 T-AUDIT-1 to T-AUDIT-3 pass.
- [ ] C8.2 T-LOG-1 and T-LOG-2 pass (no personal content in logs; no stack traces shown).

**C9 Backups and restore** §14.11 · §11 gate 4
- [ ] C9.1 Nightly encrypted backup runs on the host; T-BKP-1 passes.
- [ ] C9.2 Separate location chosen; the offline private key is held by the owner and is not on the server.
- [ ] C9.3 First restore rehearsal done with synthetic data and its log signed (T-BKP-2); next rehearsal date set (quarterly, §3).

**C10 Retention, deletion and export** §14.12 · §11 gate 5
- [ ] C10.1 Every TO BE CONFIRMED period in §14.12 confirmed by the owner and matched in the privacy notice.
- [ ] C10.2 T-RET-1 to T-RET-3 pass.

**C11 Privacy, consent and legal** §11 gate 6
- [ ] C11.1 Legal entity details inserted (D7); lawful basis stated; privacy notice and consent texts reviewed for the applicable law (with A10).
- [ ] C11.2 Rule for candidates under 18 decided after legal review (§14.12).
- [ ] C11.3 T-CONS-1 and T-CONS-2 pass; consent texts loaded into `consent_texts` with their hashes.

**C12 Migration and indexing** §14.14 · §14.15
- [ ] C12.1 T-MIG-1 to T-MIG-4 pass on synthetic fixtures; the v2 field names re-checked against the merged Stage-1 handler.
- [ ] C12.2 The owner has decided whether Stage-1 enquirers may be invited to claim a profile.
- [ ] C12.3 T-IDX-1 and T-IDX-2 pass (no app URL in the sitemap; private paths unreachable on the host).

**C13 Incident response and sign-off**
- [ ] C13.1 Incident contacts and a breach-notification procedure written: who decides, who is told, statutory time limits as confirmed by the legal review, where the evidence is kept.
- [ ] C13.2 Emergency switches rehearsed with synthetic data: maintenance flag in `stage2/config.php` (the app answers 503 with a plain notice) or rename the `apply/app/` directory (the path returns the site's 404 and the public pages stay up); end every session; rotate the keys.
- [ ] C13.3 Every box in C1–C12 that applies to the scope in C1.1 is ticked with evidence.
- [ ] C13.4 The owner's written sign-off recorded in `APPLICATION_SYSTEM_SPEC.md` §11 with the date and the scope (§11 gate 8). Until then: synthetic data only.

## D. Rollback

1. Actions → Publish deploy branch → "Use workflow from" the previous `release-*` tag → target `production`, confirm `PUBLISH`: adds a fast-forward commit carrying the previous build; Hostinger auto-deploys it.
2. If the handler misbehaves: rename `api/enquiry.php` → 404s safely; the site stays up.
3. If the whole deployment is wrong: restore A2 backup into the document root.
4. Record the incident and cause in `TECHNICAL_REPAIR_BACKLOG.md`.
