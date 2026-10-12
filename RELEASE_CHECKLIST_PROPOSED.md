# RELEASE_CHECKLIST_PROPOSED.md — first release from `claude/university-profile-pipeline`

**Date written:** 2026-10-12 · **Status:** PROPOSED. Nothing here has been run against the live host, nothing is approved, and no box is ticked. It complements `SECURITY_AND_RELEASE_CHECKLIST.md` (sections A, B and D still apply) and does not replace the owner's approval.

**Starting point (REPO):** production is the `production` branch at `b2ca3d6`, built from `4d4e605`, tag `release-20261011-005330` (45 files). It still shows the unverified Ternopil card on `/universities/` and serves a noindex Ternopil page. The working branch carries the publication gate, the research previews (N25, 2026-10-12: the 12 unpublished universities listed by name and labelled "Not yet verified", the old Ternopil URL served as one of them instead of the 302 chosen on 2026-10-11; `PUBLICATION_POLICY_DECISIONS.md` (d)), the empty-state sentence, the CSP fix (backlog N20) and the stepped `/apply/` form (`HOSTING_AND_DEPLOYMENT_ASSESSMENT.md` §13). Mail delivery, live headers and every official university source are **unverified**.

**How to use it.** Tick a box only with the evidence named in it, and write the date and who ticked it beside the box. Commands run from `site/` unless they start with `cd`. **(Owner)** marks items only the owner can do; **(Claude)** marks items Claude can do from the repository; unmarked items can be done by either. Expected outputs quoted below are the final lines printed on 2026-10-12 by the commit this file was written on; numbers can change as the code changes, but every "0 failures" / "0 problems" must stay 0.

---

## 1. Approvals

- [ ] **1.1 (Owner)** Approve this specific release in writing: the exact commit (§2.1), the date, and the scope "first release from `claude/university-profile-pipeline`" (checklist A12). Nothing is published before this.
- [ ] **1.2 (Owner)** Confirm you have read the behaviour-change table in `HOSTING_AND_DEPLOYMENT_ASSESSMENT.md` §13. The Ternopil handling there was decided on 2026-10-11 (owner decision 7: a temporary 302 to `/universities/` while the record is unpublished) and changed on 2026-10-12: the URL now serves the labelled, noindex research preview (`PUBLICATION_POLICY_DECISIONS.md` (d), whose default the owner has still to confirm); this box records that the whole table is accepted for this release.
- [ ] **1.3 (Owner)** Decide how the release treats checklist **A0** (draft legal pages, live forms): either the legal pages are complete first (§5), or a written decision on what happens to the forms meanwhile. This checklist does not make that decision.
- [ ] **1.4 (Owner)** Confirm the remaining one-time items of checklist section A that apply to a first release from this branch: A1 document root, A2 backup and hash, A4 Hostinger Git on `production` only, A5a repository private (recommended), A9 secrets review.

## 2. Exact commit and green CI

- [ ] **2.1** Record the commit: `cd /path/to/repo && git fetch origin && git rev-parse origin/claude/university-profile-pipeline` → write the full SHA here: `________________`. The working tree used for §3 is clean: `git status --porcelain` prints nothing.
- [ ] **2.2** CI is green on **that exact SHA**: GitHub → Actions → "Site CI" → the run for the SHA shows success (or `gh run list --workflow "Site CI" --branch claude/university-profile-pipeline --limit 5` lists it as `completed success`). Paste the run link. A green run on any other commit does not count.
- [ ] **2.3** Confirm the publish workflow at that SHA runs the release gate: `git show <SHA>:.github/workflows/publish-production-branch.yml`, step "Release gate (production)", runs `node scripts/release-gate.mjs` (full `npm test`, clean production build, `npm run report:publication`, `npm run check:release`) before the only push step; `npm run test:publish-workflow` checks this statically and CI calls the workflow in its non-deploying `verify` mode on every push. (Updated 2026-10-12: on `e822e4e` the production job ran a shorter suite; from the candidate onward the workflow itself refuses to publish while any release blocker remains.) Either way 2.2 is required, and the publish job must be green on the same SHA (§9.4).

## 3. Local checks on that commit

Run each and compare the last line. Any failure stops the release.

- [ ] **3.1** `npm ci` completes.
- [ ] **3.2** `npx astro check` → the result block shows `- 0 errors` (on 2026-10-12 also `- 0 warnings`, `- 2 hints`).
- [ ] **3.3** `npm test` (the full chain: records, readiness, publication, build, links, meta, redirects, UI, a11y, perf, release tooling, staging guard, gate, preview, PHP) → exit code 0, and no test in the chain prints a non-zero failure or problem count. On 2026-10-12 the chain ended with `enquiry-php: … checks, 0 failures`.
- [ ] **3.4** `node tests/verify-live-selftest.mjs` (after `npm run build`; needs `php` and Playwright's Chromium) → `verify-live-selftest: … checks, 0 failures`. It serves `dist/` locally under the rules of `public/.htaccess` and proves that `verify:live` (§10) catches each release defect listed in this checklist: an inline script or handler, a missing or weakened CSP, the Ternopil preview hidden by a 302 or replaced by an unlabelled indexable page, a research preview made indexable, given structured data, missing from the directory or listed in the sitemap, a draft card, an unpublished profile in the sitemap or in a link, the handler answering GET, reachable private storage, legal placeholders. The only checks it cannot make locally are the three canonical-host redirects (they need the production DNS and certificate); §10.1 makes them on the live host.
- [ ] **3.5** `npm run check:release` (`scripts/release-readiness.mjs`, added by the legal-readiness work package; it reads the built legal pages, so run it after the build of 3.3 or 3.7) → exit code 0 and no blocking item. Today it is expected to exit 1 and list blockers (owner legal details missing, legal review not recorded); a release with any blocker listed needs 1.3 answered in writing.
- [ ] **3.6** `npm run report:publication` → every record says it is not published (on 2026-10-12 the last line reads `12 records: 0 published, 12 not published (12 listed as research previews).`), unless the owner has signed off a profile with its evidence file (checklist B, line 2); exit code 0.
- [ ] **3.7** `npm run build && npm run manifest` → write down the line `release-manifest: <n> files, <bytes> bytes, build <sha>, fingerprint <hex>` (checklist A2, B). The build SHA must equal 2.1.
- [ ] **3.8** `.well-known/security.txt` `Expires:` is in the future (today `2027-09-30`; `node tests/check-meta.mjs` fails within 30 days of expiry).

## 4. The unverified Ternopil card replaced by research previews

*(Rewritten 2026-10-12 for N25: until then this section expected no Ternopil page and a 302. Now the old Ternopil card is replaced by 12 labelled research previews, one of them at the old Ternopil URL; `PUBLICATION_POLICY_DECISIONS.md` (d).)*

- [ ] **4.1** The production build has no unverified Ternopil card or full profile, only research previews:
  - `ls dist/universities/` → `index.html` and 12 directories, one per research preview (Ternopil among them);
  - `grep -c "RedirectMatch 302" dist/.htaccess` → `0` (the 302 of 2026-10-11 is gone);
  - `grep -ril ternopil dist` → the home page, `apply/index.html`, `universities/index.html`, the Ternopil preview page, `.htaccess` (a comment only) and one `_astro/*.js` file (the directory search's spelling variants); nothing else;
  - `grep -ci "verification in progress" dist/index.html dist/universities/index.html dist/tuition-fees/index.html` → `0` for each;
  - `node tests/publication-gate.mjs` passes (part of 3.3; it reports 0 published and 12 research previews, checks every preview page and requires the 302 rule only for a record that is neither published nor a research preview).
- [ ] **4.2 (after deploy)** The old URL serves the Ternopil research preview, never a 302 or 404: `curl -sI https://ukrainemedicaladmissions.com/universities/ternopil-national-medical-university/` → `HTTP/… 200` with no `location:`; the page is labelled "Not yet verified" and carries `noindex, follow`; without the final slash it ends on the same page. `npm run verify:live` reports "Ternopil profile URL" passed twice ("research-preview page served (labelled, noindex)") and "research preview page" passed for each of the 12 previews (200, labelled, noindex, no structured data).
- [ ] **4.3 (after deploy)** `/universities/` shows the sentence "No university profile has completed verification yet." followed by 12 cards labelled "Not yet verified", and no verified card. No page shows "Verification in progress", and no page links to, offers in a select, or names a profile the release neither publishes nor lists as a research preview (verify-live checks every sitemap page: "unverified draft shown", "unpublished profile referenced", "directory lists research previews", "directory empty state").
- [ ] **4.4 (Owner, once a Search Console property exists, A11)** Ask search engines to refresh: Search Console → URL Inspection → `https://ukrainemedicaladmissions.com/universities/ternopil-national-medical-university/` → Test live URL (expect a 200 page marked `noindex`: the research preview) and record what Google shows; then inspect `https://ukrainemedicaladmissions.com/universities/` and press Request indexing; resubmit `sitemap-index.xml` (`ANALYTICS_AND_SEARCH_CONSOLE.md` §A2). The old page was served `noindex`, so it is not expected to be in Google's index; use the Removals tool only if it appears in search results. Until a property exists, there is nothing to submit.

## 5. Legal and privacy readiness

- [ ] **5.1 (Owner)** Every item in `LEGAL_COMPLETION_CHECKLIST.md` (added by the legal-readiness work package) supplied: legal entity, address, contacts, retention periods, governing law, processors and the other owner details. Claude does not supply or guess any of them.
- [ ] **5.2 (Owner)** The legal review is recorded (who, when) as that checklist asks (checklist A10, C11.1).
- [ ] **5.3** `npm run check:release` (3.5) shows no missing owner value, no proposal and the review recorded.
- [ ] **5.4** The built legal pages carry no draft text: `grep -l -E "Draft for legal review|\[to be supplied|\[proposed in the draft" dist/privacy/index.html dist/terms/index.html dist/disclosure/index.html dist/complaints-policy/index.html` prints nothing. (Today all four print: each shows the "Draft for legal review" banner.)
- [ ] **5.5** The privacy notice still says no analytics is installed, and nothing has been installed (checklist A10; `ANALYTICS_AND_SEARCH_CONSOLE.md`).
- [ ] **5.6 (after deploy)** `npm run verify:live` shows no "legal page not final" warning.

## 6. Publication-gate checks

- [ ] **6.1** `npm run test:records`, `npm run test:publication`, `npm run test:gate` and `npm run test:preview` pass (all inside 3.3).
- [ ] **6.2** `npm run report:publication` (3.6) matches the intended state. Today: 12 records, none published. A record published in this release needs its evidence file, a passing policy and the owner's sign-off.
- [ ] **6.3** No profile page in the production build and no record slug in any built page: 4.1, plus `grep -c '/universities/[a-z0-9-]\+/</loc>' dist/sitemap-0.xml` → `0`.
- [ ] **6.4** No preview output is deployed: the deploy branch is built by the publish workflow from `dist/` (never `dist-preview/` or `dist-staging/`).

## 7. Form delivery

- [ ] **7.1 (Owner)** `uma-private/config.php` exists beside the document root with `notify_to`, `from`, `send_mail` true and a random `ip_hash_key` (32 bytes), mode 0600, directory 0700, never in Git (checklist B; backlog N21; `EMAIL_DELIVERY_VERIFICATION.md` §2 P3).
- [ ] **7.2 (Owner)** `EMAIL_DELIVERY_VERIFICATION.md` run on the real host (production after this release, or an approved staging host before it); all of C1 to C11 pass; the evidence line is added under checklist B. **Until then, e-mail delivery is unverified and must not be described as working.**
- [ ] **7.3 (after deploy)** `npm run verify:live`: "enquiry GET" (405), "enquiry empty POST" (422) and "enquiry honeypot POST" (303) pass. These show that PHP runs the handler; the honeypot post stores nothing and sends nothing, so it is **not** a delivery test.

## 8. Sitemap and indexability

- [ ] **8.1** The production build's sitemap lists exactly these 18 URLs (`grep -o '<loc>[^<]*' dist/sitemap-0.xml | sed 's/<loc>//'`):

  ```text
  https://ukrainemedicaladmissions.com/
  https://ukrainemedicaladmissions.com/about/
  https://ukrainemedicaladmissions.com/admissions/
  https://ukrainemedicaladmissions.com/apply/
  https://ukrainemedicaladmissions.com/complaints-policy/
  https://ukrainemedicaladmissions.com/contact/
  https://ukrainemedicaladmissions.com/courses/
  https://ukrainemedicaladmissions.com/courses/dentistry/
  https://ukrainemedicaladmissions.com/courses/medicine/
  https://ukrainemedicaladmissions.com/courses/nursing/
  https://ukrainemedicaladmissions.com/courses/pharmacy/
  https://ukrainemedicaladmissions.com/disclosure/
  https://ukrainemedicaladmissions.com/faq/
  https://ukrainemedicaladmissions.com/privacy/
  https://ukrainemedicaladmissions.com/services/
  https://ukrainemedicaladmissions.com/terms/
  https://ukrainemedicaladmissions.com/tuition-fees/
  https://ukrainemedicaladmissions.com/universities/
  ```

  It is the same set as the live release: `diff <(git show origin/production:sitemap-0.xml | grep -o '<loc>[^<]*') <(grep -o '<loc>[^<]*' dist/sitemap-0.xml)` prints nothing (checked 2026-10-12).
- [ ] **8.2** No profile URL in the sitemap (6.3).
- [ ] **8.3** `dist/robots.txt` reads exactly:

  ```text
  User-agent: *
  Allow: /
  Disallow: /api/
  Disallow: /apply/thank-you/

  Sitemap: https://ukrainemedicaladmissions.com/sitemap-index.xml
  ```

- [ ] **8.4** Every page's canonical is its own production URL and every indexable page is in the sitemap: `node tests/check-meta.mjs` → `check-meta: 20 pages, 0 problems`.
- [ ] **8.5** Only two pages are `noindex`, and neither is in the sitemap: `grep -l 'name="robots" content="noindex' -r dist --include=*.html` → `dist/404.html` and `dist/apply/thank-you/index.html`.
- [ ] **8.6 (after deploy)** `npm run verify:live` passes "robots.txt", "sitemap", "sitemap profiles", and "page" with "canonical ok" for all 18 URLs.

## 9. Backup and deploy (only after §1 to §8)

- [ ] **9.1 (Owner)** Backup of the document root (A1) downloaded and dated, or dated evidence that it is empty; any database linked to the domain exported; stored off-server, never in Git. Record the archive's SHA-256 (`shasum -a 256 <archive>` on macOS, `sha256sum <archive>` on Linux, `Get-FileHash <archive>` in PowerShell) and the 3.7 fingerprint in `HOSTING_AND_DEPLOYMENT_ASSESSMENT.md` §9 (checklist A2).
- [ ] **9.2** Note the release being replaced: `git ls-remote origin refs/heads/production refs/heads/publish-production 'refs/tags/release-*'`. On 2026-10-12: `production` = `b2ca3d6`, pointer `publish-production` = `4d4e605`, tag `release-20261011-005330` → `4d4e605`. This is the rollback target (§11).
- [ ] **9.3 (Owner approves; either runs it)** Start the publish workflow ("Publish deploy branch") for the exact SHA of 2.1, target production; its release gate must pass first (step "Release gate (production)"), otherwise nothing is pushed. Route as on 2026-10-11 (assessment §12.2 row 2): GitHub shows the "Run workflow" button only once the workflow file is on `main` (decision D9), and tag pushes from Claude's environment are refused, so the trigger is the pointer branch `publish-production` moved to the SHA through the GitHub API: `gh api -X PATCH repos/bigbossua/ukrainemedicaladmissions/git/refs/heads/publish-production -f sha=<SHA> -F force=true`. (Alternatives: Actions → Publish deploy branch → Run workflow → target `production`, confirm `PUBLISH`, once D9 is done; or the owner pushes a tag `publish-production-<YYYYMMDD-HHMM>` at the SHA.) Nothing else moves the `production` branch.
- [ ] **9.4** The workflow run for that SHA is green: `gh run list --workflow "Publish deploy branch" --limit 3` → `completed success`; paste the run link. Its log shows `deploy branch production -> commit <deploy sha>` (followed by the list of top-level entries it pushed). Then `git fetch origin production --tags && git log -1 --format='%h %s' origin/production` → `Build <first 7 of the SHA> (release-<stamp>)`, and the new tag points at the SHA: `git rev-parse release-<stamp>^{commit}`.
- [ ] **9.5** The deploy branch carries exactly the local build: `D=$(mktemp -d) && git -C "$(git rev-parse --show-toplevel)" archive origin/production | tar -x -C "$D" && node scripts/release-manifest.mjs --dist "$D" --out "$D.json"` → the fingerprint in the `release-manifest:` line (the last line but one) equals 3.7 (its `build` label is only the local checkout's commit). Then `rm -r "$D" "$D.json"`. (Checked on 2026-10-12 against today's `production`: 45 files, fingerprint `5ff6e7e7…c033d4`, as recorded in assessment §9.)
- [ ] **9.6 (Owner)** Hostinger: if auto-deploy is on, the `production` branch is pulled automatically; otherwise hPanel → Websites → `ukrainemedicaladmissions.com` → Advanced → Git → Deploy (menu names UNVERIFIED; assessment §12.2 step 3). Screenshot the result with its time. Whether files that are on the server but not in the release are deleted is UNVERIFIED (assessment §12 labels it so; §9 field 3 assumes they stay): a stale file can stay reachable, so 4.2, 4.3 and 10.1 are checked on the live host, not inferred.

## 10. Production smoke tests (after deploy)

- [ ] **10.1** On a computer with Node 22 (from the released commit; Claude's environment cannot reach the live host): `cd site && npm ci && npx playwright install chromium && npm run build && npm run manifest && npm run verify:live` → last line `live-verify: <n> passed, 0 failed, <w> warnings, 0 not checked`. Read every warning in `tests/output/live/live-report.md`; after §5 there should be none. "release integrity" must pass: every deployed file is byte-identical to the release manifest of 3.7. The three canonical-host redirects (HTTP to HTTPS, www to apex) are checked here only; the local self-test (3.4) cannot make them.
- [ ] **10.2** The Content-Security-Policy header is sent on pages and on error pages: `curl -sI https://ukrainemedicaladmissions.com/ | grep -i content-security-policy` and `curl -sI https://ukrainemedicaladmissions.com/no-such-page/ | grep -i content-security-policy` both show `script-src 'self'` (verify-live checks the same: "CSP header", "CSP on 404 response").
- [ ] **10.3 (Owner, on a phone)** with mobile data, not Wi-Fi if possible:
  - menu: tap the menu button on the home page; the menu opens; tap again, it closes; links work;
  - directory: `/universities/` loads, shows the empty-state text and 12 "Not yet verified" cards, searching a name (e.g. "Odessa") finds the university, the filters respond and "Reset filters" works;
  - apply: `/apply/` shows one step at a time; Continue and Back work; leaving a required field empty shows a message next to it; do **not** submit except as the synthetic test of `EMAIL_DELIVERY_VERIFICATION.md`;
  - the old Ternopil link opens the Ternopil research preview, labelled "Not yet verified";
  - no page scrolls sideways.
- [ ] **10.4 (Owner, on a computer)** Open the home page with the browser's developer tools → Network → the first document → Response headers: `content-security-policy` present with `script-src 'self'`; Console shows no red "Refused to execute" errors on `/`, `/universities/` and `/apply/`.
- [ ] **10.5** Write down the deploy time, the release tag created by the publish workflow and the 3.7 fingerprint in `HOSTING_AND_DEPLOYMENT_ASSESSMENT.md` §9 and checklist A12.

## 11. Rollback

- [ ] **11.1** The previous release is noted (9.2): today `release-20261011-005330` (source `4d4e605`, deploy commit `b2ca3d6`).
- [ ] **11.2** Know the route (checklist D; assessment §12.2): run the publish workflow for the previous release's **source** commit, by the same trigger as 9.3 with that commit (today: `gh api -X PATCH repos/bigbossua/ukrainemedicaladmissions/git/refs/heads/publish-production -f sha=4d4e60583c904384d0a9b0a374e94b0bed9c7510 -F force=true`). The workflow adds a fast-forward commit carrying the old build to `production`, and Hostinger deploys it (9.6). It re-runs that commit's own tests first, so a date-dependent check (for example `security.txt` expiry in `tests/check-meta.mjs`) can stop an old commit from publishing; then use 11.4. Rolling back to `release-20261011-005330` brings back the unverified Ternopil card and the CSP-blocked inline scripts (backlog N20), so it is a last resort.
- [ ] **11.3** Form problem only: rename `api/enquiry.php` on the host; the form post then returns 404 and the rest of the site stays up (checklist D2).
- [ ] **11.4** Whole deployment wrong: restore the 9.1 backup into the document root (checklist D3), then disconnect or pause auto-deploy so the next pull does not overwrite it.
- [ ] **11.5 (Owner)** Rollback rehearsed at least once (checklist B), or a written decision to release without a rehearsal.

## 12. Post-release monitoring

- [ ] **12.1** Day 0: §10 complete; `EMAIL_DELIVERY_VERIFICATION.md` passed or its failure recorded.
- [ ] **12.2 (Owner)** Days 1 to 7: check `info@` inbox and spam folder daily; compare the number of new files in `uma-private/enquiries/` with the number of notification e-mails (each record should have one e-mail).
- [ ] **12.3** Re-run `npm run verify:live` after any hosting change (PHP version, `.htaccess`, cache settings) and after every later release.
- [ ] **12.4 (Owner)** Once Search Console is verified: Indexing → Pages and Sitemaps weekly for four weeks after the release (`ANALYTICS_AND_SEARCH_CONSOLE.md` §A4).
- [ ] **12.5** Record anything that went wrong, and its cause, in `TECHNICAL_REPAIR_BACKLOG.md` (checklist D4).

---

### Owner-only items in one list

1.1, 1.2, 1.3, 1.4, 4.4, 5.1, 5.2, 7.1, 7.2, 9.1, 9.3 (approval), 9.6, 10.3, 10.4, 11.5, 12.2, 12.4.
