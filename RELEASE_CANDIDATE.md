# RELEASE_CANDIDATE.md — first release from `claude/university-profile-pipeline`

**Status (2026-10-12, updated after the directory milestone): NOT SAFE TO RELEASE.** The release gate refuses, for one reason only: the owner's legal details are missing and the legal review is not recorded (`npm run check:release`; `LEGAL_COMPLETION_CHECKLIST.md`). Every other check passes. Nothing has been deployed; production is still `b2ca3d6` (release `release-20261011-005330`, source `4d4e605`).

**Candidate commit.** The head of `claude/university-profile-pipeline` that the owner approves. Its exact SHA is stated in the handover and re-checked at `RELEASE_CHECKLIST_PROPOSED.md` 2.1. It fast-forwards the publish pointer (`4d4e605` is its ancestor).

## What the release changes on the live site (versus `b2ca3d6`)

- **University directory (2026-10-12, N25):**
  - The unverified Ternopil card is replaced by a directory of **17 universities listed by name**, each labelled "Not yet verified". There is a name search, and verified profiles will appear above the list as they pass.
  - Each university has a page at `/universities/<slug>/`. It shows no unverified fact. It says what to check before applying and what is still unverified, gives Apply Online Now with the university preselected, and says that no partnership is claimed. These pages are noindex/follow, have no structured data and are not in the sitemap.
  - The old Ternopil URL now shows its research-preview page (200, noindex) instead of the old profile. There is no redirect.
  - The home page lists all 12. `/apply/` and the home form offer them labelled "(not yet verified)".
  - All twelve records stay unpublished. The fail-closed policy shows a fact only when its evidence passes.
- The mobile menu, the directory search and the apply form work under the site's security policy (no inline scripts; backlog N20).
- `/apply/` becomes the five-step candidate-profile form (no documents, no accounts). The handler stores input as typed, hashes the IP only with a private key, and sends a fuller notification email.
- **Page rewrites (2026-10-12):** medicine (MBBS) hub; course-specific checks for dentistry, nursing and pharmacy; a task-led admissions guide; FAQ reordered (eligibility, cost, duration first) with India recognition split out; the fees guide led by how to read a fee schedule and questions to ask; about, contact, services, 404 and thank-you pages tidied. No unverified claims; unverified "Study in Ukraine portal", "MBBS equivalent" and NMC-rule wording removed.
- **Google readiness (2026-10-12):** `/contact/` and `/courses/` gain practical guidance (no new claims); titles carry the brand suffix only within 60 characters; the 404 page no longer declares a canonical; robots.txt no longer blocks `/apply/thank-you/` (it stays noindex); course pages link to each other. A URL-by-URL audit (`npm run audit:seo`, report `GOOGLE_READINESS_AUDIT.md`) now runs in `npm test`, CI and the release gate and fails on any high issue: today 0 high, 0 medium, 3 accepted low. A Search Console verification tag can be switched on by setting one value (`SEARCH_CONSOLE_VERIFICATION` in `site/src/lib/site.ts`); it is off.
- **Legal pages:** they read the owner's details from `site/src/lib/legal.mjs`. Until those are complete they show visible "[to be supplied by the owner: …]" markers and the draft banner, which is why the gate refuses.
- **Sitemap:** indexable pages only. The 17 research previews are excluded; each university becomes indexable automatically once its profile is verified.

## The safeguard

`site/scripts/release-gate.mjs` is the single list of release checks: full `npm test` (records and evidence rules, readiness, publication policy and fixture builds, evidence tools, build, links, meta, redirects, release-readiness test, publish-workflow guard, UI, accessibility, performance, release tooling, staging guard, publication gate, preview UI, PHP handler, live-checks self-test), a clean production build, the publication report and the release-readiness check. The publish workflow's production target runs it before its only push; its `verify` target runs the same checks and never pushes. CI calls the publish workflow in `verify` mode on every push and requires the gate to refuse while the legal details are missing (`expect: blocked`). Simulations in CI (`npm run test:release-gate`): a record flagged publishable without evidence, and today's missing legal details, each make the gate exit 1.

## Blockers, by kind of action

| Kind | Item | Who |
|---|---|---|
| **1. Safe now: built and tested on this branch** | Research-preview directory and pages; directory search; home list; page rewrites; release gate, publish-workflow guard, live-checks tooling updated for previews | Done (this branch) |
| **2. Publishable only after evidence verification** | Any university fact: names as official, websites, addresses, teaching statements, programmes, languages, durations, fees, requirements, deadlines, accreditation, recognition. Fee rows, university comparisons, indexable profiles. Vinnytsia first, then Odesa and Bukovinian, once the 32 refused official hosts can be read or captures are supplied (`DIRECTORY_VERIFICATION_PLAN.md` §10) | Owner (network access or source documents), then evidence entry |
| **3. Legal, privacy and owner decisions** | The legal and owner details and the reviewer's sign-off (`OWNER_INPUT_NEEDED.md` §1; the gate counts 38 blocking items). Decisions in §2. Confirm N25 research previews and the "Not yet verified" label, and the N24 defaults (`PUBLICATION_POLICY_DECISIONS.md`). Whether to merge `/courses/pharmacy/`. Whether to run the optional ≤200-unit SEMrush batch after a balance reading | Owner (and a qualified reviewer for the items marked) |
| **4. Needs explicit release approval** | Backup of the live document root; `uma-private/config.php` with `notify_to`, `from`, `send_mail` and a random `ip_hash_key`; moving `publish-production` to the approved SHA | Owner |
| **Must verify at launch (cannot be tested here)** | Email delivery from the host, live headers and CSP, redirects, the 17 preview pages (Ternopil included), release integrity: `EMAIL_DELIVERY_VERIFICATION.md` and `npm run verify:live` (checklist §10) | Owner (from a computer that can reach the site) |
| **Blocked by external access** | Every official university and government source (32 hosts), the production host and Search Console | Owner (network access settings, or captures) |

## Release instructions (only after the "must fix" items and the owner's approval)

1. Fill `site/src/lib/legal.mjs` (or send the values; they are committed on the review branch) until `cd site && npm run build && npm run check:release` prints READY; change `expect: blocked` to `expect: pass` in `.github/workflows/ci.yml`; push; CI must be green on that exact SHA, including the publish-workflow `verify` job.
2. Take the backup (checklist 9.1) and create `uma-private/config.php` on the host (`EMAIL_DELIVERY_VERIFICATION.md` step 1).
3. Publish (checklist 9.3): move the pointer branch `publish-production` to the approved SHA (`gh api -X PATCH repos/bigbossua/ukrainemedicaladmissions/git/refs/heads/publish-production -f sha=<SHA>`; a fast-forward). The publish workflow runs the release gate at that SHA; only if it passes does it add one fast-forward commit to `production` and tag `release-<UTC stamp>`; Hostinger Git deploys it.
4. Smoke tests (checklist §10): `cd site && npm ci && npx playwright install chromium && npm run build && npm run verify:live` from a computer that can reach the site; on a phone: menu, directory search (try "Odessa"), a university page, `/apply/` steps; `curl -sI https://ukrainemedicaladmissions.com/universities/ternopil-national-medical-university/` answers 200 and the page carries `noindex` and "Not yet verified"; then the email test in `EMAIL_DELIVERY_VERIFICATION.md`.

## Rollback (checklist §11)

- Previous release: `release-20261011-005330` (source `4d4e605`, deploy commit `b2ca3d6`). Move `publish-production` back to `4d4e60583c904384d0a9b0a374e94b0bed9c7510` (needs `-F force=true`; or push a tag `publish-production-<YYYYMMDD-HHMM>` at that commit): the workflow re-runs that commit's own checks and adds a fast-forward commit carrying the old build. This restores the unverified Ternopil card and the blocked inline scripts, so it is a last resort.
- Form problem only: rename `api/enquiry.php` on the host (the form returns 404; the site stays up).
- Whole deployment wrong: restore the backup into the document root and pause auto-deploy.
