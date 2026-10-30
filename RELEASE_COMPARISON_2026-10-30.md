# Release comparison: production versus the candidate (30 October 2026)

**Not deployed. Nothing below changes production until the owner explicitly approves a release.**

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
