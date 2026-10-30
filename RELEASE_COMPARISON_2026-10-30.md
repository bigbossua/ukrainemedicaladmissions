# Release comparison: production versus the candidate (30 October 2026)

**Deployed on 30 October 2026 as an interim release, on the owner's explicit approval ("OWNER APPROVAL — PROCEED WITH UKRAINE MEDICAL ADMISSIONS INTERIM RELEASE").** Sections 1 to 8 are the comparison as prepared before the deployment; section 9 records the deployment and the live checks. The approval covers the interim candidate only: it closes no legal item and publishes no unverified university information.

| | Production (live) | Candidate |
|---|---|---|
| Deploy branch commit | `5048eb1` "Build 053cee0 (release-20261026-210314, interim release …)" | not yet built onto `production` |
| Source commit | `053cee0` (26 October) | branch `claude/university-profile-pipeline`; site build identical to `7c53003` (later commits change only documents outside `site/`) |
| Build | 108 files | 110 files, 2,000,492 bytes, manifest fingerprint `1e4f054ec6b9708ec489a31724d9fa110ec3f0cc1d132307f0ac67211b3bb2d9`, identical across two clean builds |
| Release gate | passed (interim) on 26 October | interim gate **passed** on `7c53003` (full suite 1,312 s); final gate blocked only by the 40 legal items; 22 gate simulations pass |
| CI | green (run 71) | runs 77–81 green; run on `7c53003` and later: see the final report |

Method: every file on the `production` branch was hashed straight from Git and compared with the candidate build (`site/dist`, built from the candidate source), plus page signals (title, description, robots, canonical, H1, structured data, WhatsApp links, floating group) for all 65 pages.

## 1. Files

| | Count | What they are |
|---|---|---|
| Unchanged | 34 | images, fonts, icons, `robots.txt`, `.htaccess`, `_astro/.htaccess`, `.well-known/security.txt`, sitemaps, unchanged bundles |
| Changed | 66 | all 65 HTML pages, and `api/enquiry.php` |
| Added | 10 | renamed CSS and JS bundles (content hashes change when styles or scripts change) |
| Removed | 8 | the bundles those replace |

The security headers and the Content Security Policy (`.htaccess`) are byte-for-byte unchanged. `robots.txt` and both sitemaps are unchanged.

## 2. Visible changes

1. **Floating actions on every page** (owner requirement 30 October): "Apply Now" (to `https://ukrainemedicaladmissions.com/apply/`) and "WhatsApp Us" (to `https://wa.me/380633534065` with the default message), bottom-right on desktop, a bottom bar on phones. On `/apply/` itself, Apply Now moves to the form.
2. **WhatsApp in-page links** (owner decision 29 October): in the footer of every page, the call-to-action bands, the contact page (new WhatsApp section), the apply page sidebar and each university preview, each with a pre-filled message naming the site and the page. Production has no WhatsApp link at all (0 pages; candidate 65).
3. **Contact form:** errors named next to each field, "(required)" labels, a corrected e-mail error message.
4. **Directory:** the search box is shown from the first paint (no layout jump), keeps what was typed before the script loaded, and follows choices restored on Back; count badges read correctly.
5. **Mobile menu** scrolls on short screens; **focus rings** clearly visible on the white hero card.
6. **University previews:** sources on unverified websites read "Reported website, page N" (not "Official page"); a city that is its own region is printed once; the profile's sticky sidebar now ends above the floating actions.
7. **Content accuracy:** home and services descriptions, FAQ title and heading, one FAQ answer and the draft Terms wording now match what the directory actually shows; Kharkiv Polytechnic's postgraduate lead is no longer counted as Medicine.
8. **Privacy notice (still a draft with its banner):** WhatsApp messages, host logs and direct e-mails are described with owner placeholders; nothing is filled in.
9. **Thank-you page:** the address wraps on 320 px screens (it overflowed by 7 px).

## 3. Technical changes

- **Form handler (`api/enquiry.php`):** posts without the forms' hidden fields are dropped like the honeypot; the honeypot also catches "0"; the per-visitor limit is enforced under a file lock (30 parallel posts store exactly 5); the site-wide cap counts the last 60 minutes, reading the clock once; IPv6 visitors are grouped by /64 and IPv4-mapped addresses are used whole; the PHP version header is removed; an optional envelope sender (off by default). Same storage location and record format.
- **Publish workflow:** checkout keeps no token in the repository configuration; only the deploy step authenticates, through its own URL. The deploy step's new fetch through that URL has **not yet run in a real publish** (CI's verify mode skips the deploy step). If it fails, the push fails and nothing is deployed: production stays as it is.
- **Tests added to the gate and CI:** floating actions (5,829 checks), WhatsApp links (2,095), audit regressions (90), handler (239), workflow guard (43), plus a Lighthouse layout-shift budget.

## 4. Legal

- The four legal pages stay **drafts with the "Draft for legal review" banner**, as in production. 40 items are open (production's gate counted 36 on 26 October); the four new ones are WhatsApp retention, which WhatsApp service is used and where its data is kept, host-log retention, and retention of e-mails sent directly. `OWNER_RESPONSE_FORM.md` has all 40.
- The release proceeds only under `RELEASE_AUTHORISATION.md` (interim mode), which ends when the legal review is recorded. No legal value has been filled in and no review recorded.

## 5. SEO and indexation

| | Production | Candidate |
|---|---|---|
| Indexable pages | 18 | 18 (same set) |
| Sitemap URLs | 18 | 18 (identical) |
| noindex pages | 47 (45 previews, thank-you, 404) | 47 (no page changed indexing) |
| `robots.txt` | — | unchanged |

Changed signals, all on existing pages: `/faq/` title "Student FAQ: cost, duration, recognition" becomes "MBBS in Ukraine FAQ: cost, duration, NEET, recognition" and its H1 gains "MBBS in Ukraine:" (SEMrush evidence, India database: "mbbs in ukraine" 260, KD 18; "is neet required for mbbs in ukraine" 20, `research/semrush/2026-10-11-P3-phrase_questions-in-mbbs-in-ukraine.csv`; the page answers the NEET question without stating the regulator's rules). Meta descriptions of `/`, `/services/` and `/contact/` changed for accuracy (the contact one now mentions WhatsApp). No SEMrush units were used for this comparison.

## 6. What a deployment changes, and what it does not

**Changes:** one fast-forward commit on the `production` branch carrying the 110 files above, which Hostinger deploys to the document root; a new `release-<UTC stamp>` tag on the source commit.

**Does not change:** DNS; e-mail settings; `uma-private/` (the stored enquiries, the per-visitor counters and `config.php` live outside the document root and outside the deploy branch: `enquiry.php` reads `dirname(document root)/uma-private`); the `publish-production` pointer; the legal pages' draft status; any university record (all 45 stay research previews: noindex, out of the sitemap, no verified fact shown).

**Route (only after explicit approval):** `git push origin <candidate commit>:refs/heads/publish-production-interim`. The publish workflow runs the interim release gate on that commit and deploys only if it passes.

## 7. Rollback (checked against the workflow, not executed)

1. While the interim authorisation is in force: `git tag publish-production-interim-rollback-<YYYYMMDD-HHMM> release-20261026-210314 && git push origin publish-production-interim-rollback-<YYYYMMDD-HHMM>`. The tag points at `053cee0`; that commit's own workflow treats `publish-production-interim-*` tags as interim production publishes and runs its own gate; its `RELEASE_AUTHORISATION.md` carries `Mode: interim` and an `Ends:` line. The rebuilt `053cee0` is what is live today (production `5048eb1`).
2. Never move `publish-production-interim` backwards (that needs a force push), and never roll back to `release-20261011-005330` (`4d4e605`): it predates the release gate.
3. Check afterwards: `git log -1 origin/production` reads "Build 053cee0 …", and the live pages no longer show the floating actions.
4. If the handler misbehaves: rename `api/enquiry.php` (the site stays up). If the whole deployment is wrong: restore the A2 backup into the document root. Full procedure: `SECURITY_AND_RELEASE_CHECKLIST.md` §D.

## 8. Not launch-ready

The site is technically releasable as an interim release, which the owner must approve. It is **not launch-ready**: 40 legal items are open and no legal review is recorded, and no university fact is verified (0 of 45; `research/verification/LEAD_REGISTER_2026-10-30.md`).

## 9. Deployment record (30 October 2026)

**Before the deployment (recorded first):** `production` at `5048eb1` "Build 053cee0 (release-20261026-210314 …)"; rollback reference `release-20261026-210314` → `053cee0`; `publish-production-interim` at `053cee0`; `publish-production` (final pointer) at `4d4e605`, not touched.

**Pre-checks, all passed:** working branch `claude/university-profile-pipeline`; commits `7c53003` (floating actions), `8670ef3` (owner response form) and `302fde3` (this comparison) present; clean working tree; CI run 82 green on `7c53003`, and nothing under `site/` changed after it; the release manifest of `302fde3` matched the tested one (110 files, fingerprint `1e4f054e…b3bb2d9`); `RELEASE_AUTHORISATION.md` in force (Mode: interim, ends when the legal review is recorded); the workflow publishes `publish-production-interim` to `production`.

**Deployment:** `git push origin 302fde3:refs/heads/publish-production-interim` (fast-forward `053cee0..302fde3`, 05:34:49 UTC). Publish run 7 (`41009220298`): interim release gate passed (05:35 to 05:47), deploy step succeeded. This was the first real publish through the deploy step's own URL (section 3); it worked.

**After the deployment:** `production` at `137e5a5` "Build 302fde3 (release-20261030-054715, interim release: legal pages published as drafts)"; tag `release-20261030-054715` → `302fde3`; the `production` tree is identical to the tested manifest (110 files). `publish-production` still at `4d4e605`. No DNS, e-mail, `uma-private/` or university-record change was made.

### Live verification (read-only, from a GitHub runner)

This environment cannot reach the live domain, so the checks ran on GitHub: workflow "Live verification (read-only)", run `41011004955` on `9dc1caa` (05:54 to 05:59 UTC). GET requests and a browser only: **no form submitted, no POST sent** (`--no-post`; owner instruction 30 October). Screenshots and reports: artifact `live-verification` (ID 12957886664, kept 30 days), https://github.com/bigbossua/ukrainemedicaladmissions/actions/runs/41011004955/artifacts/12957886664 (sign-in required; the archive could not be downloaded into this environment, the proxy refuses GitHub's artifact storage).

| Check | Result |
|---|---|
| Floating actions live ("WhatsApp Us" and "Apply Now"): 15 page types × 10 viewports (1440, 1280, 768, 430, 414, 390, 375, 360 px wide, and 320 px at two heights) × top, middle and end of page; topmost, at least 44 px, desktop bottom-right group, phone bottom bar, not covering the footer, form buttons, open menu or sticky sidebars; no horizontal overflow; keyboard focus; Apply opens `/apply/` with the form; WhatsApp opens `https://wa.me/380633534065` with the default message; works without JavaScript | **5,679 checks, 0 failures** |
| `verify-live.mjs`: security headers (HSTS, nosniff, frame options, referrer policy, permissions policy), CSP on pages, 404 and the handler, no `X-Powered-By` on pages or the handler, all pages and statuses, titles, canonicals, robots meta, research previews noindex, redirects (canonical host, no loops), sitemap index and child (18 URLs, no profile), `robots.txt`, `security.txt`, custom 404, MIME types, no directory listings, `/.git/`, `/.env` and `.htaccess` refused, `/uma-private/`, `/uma-private/config.php` and `/uma-private/enquiries/` refused (403 or 404), handler GET answers 405 (PHP runs), directory, home, thank-you page, mobile menu, axe accessibility | **252 passed**, 1 failed, 5 warnings, 1 not run |
| Failed: release integrity | 4 images served with different bytes: `android-chrome-192x192.png` (4,712 B served, 4,508 B built), `android-chrome-512x512.png` (13,558 / 12,887), `apple-touch-icon.png` (4,711 / 4,513), `og-default.png` (48,176 / 52,372). All four are byte-identical in Git between the previous release (`5048eb1`) and this one (`137e5a5`): this release did not change them. So the difference arises where the host serves the files, not in the deployment. The likely cause is image optimisation by Hostinger's CDN (in use: `www` points to `cdn.hstgr.net`), not confirmed; the owner can check whether image optimisation is switched on under hPanel's CDN settings. It is not a deployment fault. Same count from the separate hash step: 103 files identical, these 4 different, all HTTP 200 |
| Warnings | `site.webmanifest` served as `text/plain` (file unchanged since earlier releases; browsers still read it; a MIME line in `.htaccess` would fix it, which is a header change for a later release); the four legal pages show "Draft for legal review" and their owner placeholders, as required while the legal items are open |
| Not run | Enquiry POST probes (no POST by instruction). Live form processing, stored records and e-mail delivery therefore remain **not tested** |

**Public DNS seen from the runner (for the record; nothing was changed, and no earlier DNS baseline exists in the repository):** A `147.79.79.16`, `88.223.87.207`; AAAA `2a02:4780:4d:e0c0:9874:61f2:33f5:9290`, `2a02:4780:4b:5c99:af6a:7acb:1984:84ab`; MX 5 `mx1.hostinger.com`, 10 `mx2.hostinger.com`; TXT SPF `v=spf1 include:_spf.mail.hostinger.com ~all` and the Google site-verification record; `www` CNAME `www.ukrainemedicaladmissions.com.cdn.hstgr.net`.

**Applicant records:** the deployment writes only the `production` branch's files into the document root; `uma-private/` is outside both, and the live check confirms it is not served. The records themselves cannot be inspected from here: the owner can confirm in hPanel's File Manager that `uma-private/enquiries/` still holds the earlier enquiries.

**Rollback for this release:** section 7, unchanged: a `publish-production-interim-rollback-<stamp>` tag at `release-20261026-210314` (`053cee0`). Afterwards `git log -1 origin/production` reads "Build 053cee0 …" and the floating actions are gone from the live pages.
