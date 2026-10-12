# RELEASE_CANDIDATE.md — first release from `claude/university-profile-pipeline`

**Status (2026-10-12): NOT SAFE TO RELEASE.** The release gate refuses, for one reason only: the owner's legal details are missing and the legal review is not recorded (`npm run check:release`; `LEGAL_COMPLETION_CHECKLIST.md`). Every other check passes. Nothing has been deployed; production is still `b2ca3d6` (release `release-20261011-005330`, source `4d4e605`).

**Candidate commit.** The head of `claude/university-profile-pipeline` that the owner approves. Its exact SHA is stated in the handover and re-checked at `RELEASE_CHECKLIST_PROPOSED.md` 2.1. It fast-forwards the publish pointer (`4d4e605` is its ancestor).

## What the release changes on the live site (versus `b2ca3d6`)

- The unverified Ternopil card disappears from `/universities/` and the home page; the old profile URL answers 302 to `/universities/`; the directory shows the honest empty state. All twelve university records stay unpublished; the fail-closed publication policy blocks any record whose public fields are not each backed by verified evidence.
- The mobile menu and directory filters work under the site's security policy (inline scripts removed; backlog N20). On `b2ca3d6` they are blocked wherever the host sends the CSP header (UNVERIFIED live).
- `/apply/` becomes the five-step candidate-profile form (no documents, no accounts); the handler stores input as typed, hashes the IP only with a private key, and sends a fuller notification e-mail.
- Copy no longer claims features or facts that do not exist (dashboard, save-and-resume, status tracking, durations, verified data); FAQ, fees, admissions, courses and directory pages carry the SEMrush-backed improvements and cross-links (`KEYWORD_URL_MAP.md` §18).
- Legal pages read the owner's details from `site/src/lib/legal.mjs`; until they are complete they show visible "[to be supplied by the owner: …]" markers and the draft banner, which is why the gate refuses.
- The sitemap keeps the same 18 URLs; no page is added or removed.

## The safeguard

`site/scripts/release-gate.mjs` is the single list of release checks: full `npm test` (records and evidence rules, readiness, publication policy and fixture builds, evidence tools, build, links, meta, redirects, release-readiness test, publish-workflow guard, UI, accessibility, performance, release tooling, staging guard, publication gate, preview UI, PHP handler, live-checks self-test), a clean production build, the publication report and the release-readiness check. The publish workflow's production target runs it before its only push; its `verify` target runs the same checks and never pushes. CI calls the publish workflow in `verify` mode on every push and requires the gate to refuse while the legal details are missing (`expect: blocked`). Simulations in CI (`npm run test:release-gate`): a record flagged publishable without evidence, and today's missing legal details, each make the gate exit 1.

## Blockers

| Category | Item | Owner of the action |
|---|---|---|
| Must fix before launch | Owner legal details and legal review: 22 missing items, 9 proposals to approve, review fields (`LEGAL_COMPLETION_CHECKLIST.md`; `npm run check:release` lists each) | Owner (and a qualified reviewer for the items marked) |
| Must fix before launch | Backup of the live document root before the first write (checklist 9.1) | Owner |
| Must fix before launch | `uma-private/config.php` on the host with `notify_to`, `from`, `send_mail` and a random `ip_hash_key` (`EMAIL_DELIVERY_VERIFICATION.md` step 1) | Owner |
| Must verify at launch (cannot be tested here) | E-mail delivery from the host, live headers and CSP, redirects, the Ternopil 302, release integrity: `EMAIL_DELIVERY_VERIFICATION.md` and `npm run verify:live` (checklist §10) | Owner (from a computer that can reach the site) |
| Can follow after launch | Verified university profiles (blocked by access); Search Console property and baseline (`ANALYTICS_AND_SEARCH_CONSOLE.md` §A); minor defects N22; residual policy items N24 (d)–(k) | Mixed |
| Requires owner decision | Release approval and the Ternopil 302 behaviour change (`HOSTING_AND_DEPLOYMENT_ASSESSMENT.md` §13); the three N24 defaults (`PUBLICATION_POLICY_DECISIONS.md`); the 17 evidence-standard items (§13); Zaporizhzhia's non-health programmes; whether to run the optional 200-unit SEMrush batch after the balance is read | Owner |
| Blocked by external access | Every official university and government source (32 hosts, `DIRECTORY_VERIFICATION_PLAN.md` §10.1a), the production host and Search Console | Owner (Network access settings, or captures) |

## Release instructions (only after the "must fix" items and the owner's approval)

1. Fill `site/src/lib/legal.mjs` (or send the values; they are committed on the review branch) until `cd site && npm run build && npm run check:release` prints READY; change `expect: blocked` to `expect: pass` in `.github/workflows/ci.yml`; push; CI must be green on that exact SHA, including the publish-workflow `verify` job.
2. Take the backup (checklist 9.1) and create `uma-private/config.php` on the host (`EMAIL_DELIVERY_VERIFICATION.md` step 1).
3. Publish (checklist 9.3): move the pointer branch `publish-production` to the approved SHA (`gh api -X PATCH repos/bigbossua/ukrainemedicaladmissions/git/refs/heads/publish-production -f sha=<SHA>`; a fast-forward). The publish workflow runs the release gate at that SHA; only if it passes does it add one fast-forward commit to `production` and tag `release-<UTC stamp>`; Hostinger Git deploys it.
4. Smoke tests (checklist §10): `cd site && npm ci && npx playwright install chromium && npm run build && npm run verify:live` from a computer that can reach the site; on a phone: menu, directory, `/apply/` steps; `curl -sI https://ukrainemedicaladmissions.com/universities/ternopil-national-medical-university/` answers 302 to `/universities/`; then the e-mail test in `EMAIL_DELIVERY_VERIFICATION.md`.

## Rollback (checklist §11)

- Previous release: `release-20261011-005330` (source `4d4e605`, deploy commit `b2ca3d6`). Move `publish-production` back to `4d4e60583c904384d0a9b0a374e94b0bed9c7510` (needs `-F force=true`; or push a tag `publish-production-<YYYYMMDD-HHMM>` at that commit): the workflow re-runs that commit's own checks and adds a fast-forward commit carrying the old build. This restores the unverified Ternopil card and the blocked inline scripts, so it is a last resort.
- Form problem only: rename `api/enquiry.php` on the host (the form returns 404; the site stays up).
- Whole deployment wrong: restore the backup into the document root and pause auto-deploy.
