# OWNER_INPUT_NEEDED.md — the exact information that clears the release blockers

**Date:** 2026-10-12 · **Branch:** `claude/university-profile-pipeline` · Nothing below has been filled in for you, and nothing here is legal advice.

The release gate (`npm run release:gate`, also run by the publish workflow) refuses to publish while the four legal pages are drafts. It counts **38 blocking items**: 22 missing details, 9 proposals awaiting approval, 3 review fields and the draft banner on 4 pages. Every value goes into one file, `site/src/lib/legal.mjs`; the pages read it from there. Full explanations are in `LEGAL_COMPLETION_CHECKLIST.md`; this page is the short form to fill in.

## A. Who runs the service (owner only: 5 answers)

| # | Question | Your answer |
|---|---|---|
| 1 | Legal name of the person or company that runs Ukraine Medical Admissions | |
| 2 | Legal form (for example sole trader, limited company) | |
| 3 | Country of registration | |
| 4 | Registration number, or "not applicable" | |
| 5 | Postal address for formal requests and complaints | |

## B. Law and authorities (owner with a qualified legal reviewer: 7 answers)

| # | Question | Your answer |
|---|---|---|
| 6 | Name of the data controller | |
| 7 | Is a UK or EU representative required? (yes/no; if yes, their name and address) | |
| 8 | Law that governs the terms | |
| 9 | Courts that decide disputes | |
| 10 | Data-protection authority people can complain to, with its web address | |
| 11 | Outside body an unresolved complaint can go to, or "not applicable" | |

## C. Providers and data location (owner, from the hosting and mail accounts: 3 answers)

| # | Question | Your answer |
|---|---|---|
| 12 | Company that provides the business mailbox (info@ukrainemedicaladmissions.com) | |
| 13 | Countries where the hosting (Hostinger) and the mailbox store data | |
| 14 | Does personal data go to other countries? If so, which safeguard is used? | |

## D. Data rules (owner with the reviewer)

| # | Question | Draft wording (approve or replace) | Your answer |
|---|---|---|---|
| 15 | How long enquiries are kept | "up to 12 months after our last contact" | |
| 16 | How long candidate profiles from /apply/ are kept | "up to 12 months after our last contact" | |
| 17 | How long email copies in the mailbox are kept | "the same period as the stored record" | |
| 18 | Do backups contain form submissions, and how long are backups kept? | none | |
| 19 | How long application records are kept after an application ends | none | |
| 20 | How long complaint records are kept | none | |
| 21 | Lawful basis for replying to enquiries | "your consent and steps taken at your request before any contract" | |
| 22 | Lawful basis for candidate profiles | same as 21 | |
| 23 | Lawful basis for keeping the submission time and keyed IP code (abuse detection) | none | |
| 24 | Lawful basis for application documents (future dashboard) | none | |
| 25 | Rule for applicants under 18 | none | |

## E. Complaints timescales (owner decision: approve or change 4 proposals)

| # | Item | Draft wording | Your answer |
|---|---|---|---|
| 26 | Acknowledge a complaint within | 3 working days | |
| 27 | Full reply within | 15 working days | |
| 28 | Second-stage reviewer | the business owner | |
| 29 | Second-stage reply within | a further 10 working days | |

## F. Dates and sign-off

| # | Item | Your answer |
|---|---|---|
| 30 | Date the legal pages take effect (YYYY-MM-DD) | |
| 31 | Privacy notice version number | |
| 32 | Name of the qualified reviewer who read the four built pages, and the review date | |

When A–F are filled in, `node scripts/release-readiness.mjs` (from `site/`) must print READY. Then change `expect: blocked` to `expect: pass` in `.github/workflows/ci.yml` so CI proves the publish workflow now passes.

## G. Other decisions and actions that only you can take

| Item | What is needed | Where it is explained |
|---|---|---|
| Research previews (new, N25) | Confirm that the 12 universities may be listed by name, labelled "Not yet verified", with no facts, and that the student-facing label "Not yet verified" is acceptable. Default: on. To switch off: `RESEARCH_PREVIEWS = false` in `site/src/lib/publication-config.mjs`. | `PUBLICATION_POLICY_DECISIONS.md` (N25) |
| Publication rules N24 (a)–(c) | Confirm or change the three fail-closed defaults (overview review, city only from a verified address, website only with a government listing; recognition authority list empty) | `PUBLICATION_POLICY_DECISIONS.md` |
| Official sources | Either allow this environment to reach the 32 blocked official hosts, or send captures/PDFs of the pages listed for Vinnytsia, Odesa and Bukovinian | `DIRECTORY_VERIFICATION_PLAN.md` §10 |
| SEMrush | Send a fresh reading of Subscription info → API units before any further metered call | `SEMRUSH_API_LEDGER.md` (2026-10-12) |
| Hosting | Take the Hostinger backup; create `uma-private/config.php` with an `ip_hash_key`; confirm PHP version | `RELEASE_CANDIDATE.md`, `EMAIL_DELIVERY_VERIFICATION.md` |
| Release approval | Explicit approval to move the `publish-production` pointer to the candidate commit, after the gate passes | `RELEASE_CANDIDATE.md` |
| After release | Run the email-delivery test on the real host and `npm run verify:live` | `EMAIL_DELIVERY_VERIFICATION.md`, `RELEASE_CANDIDATE.md` |
