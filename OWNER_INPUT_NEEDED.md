# OWNER_INPUT_NEEDED.md — owner checklist

**Date:** 2026-10-12 · **Branch:** `claude/university-profile-pipeline` · Not legal advice. Nothing below has been filled in for you.

**Short version: `OWNER_ACTION_SHEET.md`**: the 20 hosts to allow, the 38 gate items numbered exactly as the gate prints them with a reply template, and the Search Console steps (domain property now, sitemap after the release).

Tick a box (`[x]`) when an item is done. Today the release gate refuses to publish because of **38 blocking items**: 22 missing legal details, 9 draft wordings waiting for your approval, 3 review fields and the draft banner on 4 pages. Background: `LEGAL_COMPLETION_CHECKLIST.md`, `RELEASE_CANDIDATE.md`.

**How to give a legal answer:** in `site/src/lib/legal.mjs`, replace `null` or `proposed(...)` with plain text in quotes. Write dates as `'YYYY-MM-DD'` and yes/no answers as `true` or `false`. "TBC", "???" or anything in square brackets counts as not supplied. Or send the answers and Claude will enter them word for word.

**Already recorded, so not asked again:** the business e-mail (info@ukrainemedicaladmissions.com); hosting by Hostinger; no analytics installed; nothing sold; no referral fees or partnerships; no documents taken at Stage 1; what each form submission stores.

## 1. Information only you can provide

"Reviewer: Yes" means a qualified legal reviewer must check the answer. At the end the reviewer reads all four built pages, including the rows marked "No".

| ✓ | What to provide | Draft wording (approve or replace) | Where it goes (`legal.mjs` unless stated) | Reviewer |
|---|---|---|---|---|
| [ ] | Legal name of the person or company that runs the service | — | `entity.name` | No |
| [ ] | Legal form (for example sole trader or limited company) | — | `entity.type` | No |
| [ ] | Country of registration (most other answers depend on it) | — | `entity.country` | No |
| [ ] | Registration number, or `NOT_APPLICABLE` | — | `entity.registrationNumber` | No |
| [ ] | Postal address for formal requests and complaints | — | `entity.address` | No |
| [ ] | Name of the data controller | — | `controller.name` | Yes |
| [ ] | Is a UK or EU representative required (`true`/`false`)? If `true`, give their name and address | — | `representative.needed`, `representative.details` | Yes |
| [ ] | Law that governs the terms | — | `governingLaw` | Yes |
| [ ] | Courts that decide disputes | — | `courts` | Yes |
| [ ] | Data-protection authority people can complain to, with its web address | — | `privacyAuthority` | Yes |
| [ ] | Outside body for complaints you cannot resolve, or `NOT_APPLICABLE` | — | `complaintsBody` | Yes |
| [ ] | Company that provides the info@ mailbox | — | `processors.mailbox` | No |
| [ ] | Countries where Hostinger and the mailbox provider store data | — | `processingLocation` | Yes |
| [ ] | Does personal data go to other countries? If so, which safeguard is used? | — | `internationalTransfers` | Yes |
| [ ] | Rule for applicants under 18 | — | `under18Policy` | Yes |
| [ ] | How long enquiries are kept | "up to 12 months after our last contact" | `retention.enquiries` | Yes |
| [ ] | How long candidate profiles from /apply/ are kept | "up to 12 months after our last contact" | `retention.candidateProfiles` | Yes |
| [ ] | How long e-mail copies in the mailbox are kept | "the same period as the stored record" | `retention.mailboxCopies` | Yes |
| [ ] | Whether backups hold form submissions, and how long backups are kept | none | `retention.backups` | Yes |
| [ ] | How long application records are kept after an application ends | none | `retention.applicationRecords` | Yes |
| [ ] | How long complaint records are kept | none | `retention.complaints` | Yes |
| [ ] | Lawful basis: replying to enquiries | "your consent and steps taken at your request before any contract" | `lawfulBasis.enquiries` | Yes |
| [ ] | Lawful basis: candidate profiles | same as the row above | `lawfulBasis.candidateProfiles` | Yes |
| [ ] | Lawful basis: keeping the submission time and the keyed IP code to detect abuse | none | `lawfulBasis.abuseDetection` | Yes |
| [ ] | Lawful basis: application documents (future dashboard, not built yet) | none | `lawfulBasis.applications` | Yes |
| [ ] | Time to acknowledge a complaint | "3 working days" | `complaints.acknowledge` | No |
| [ ] | Time to give a full reply | "15 working days" | `complaints.reply` | No |
| [ ] | Who reviews a complaint at the second stage | "the business owner" | `complaints.reviewer` | No |
| [ ] | Time for the second-stage reply | "a further 10 working days" | `complaints.review` | No |
| [ ] | Date the legal pages take effect | — | `effectiveDate` | No |
| [ ] | Privacy notice version number | — | `noticeVersion` | No |
| [ ] | Reviewer's name and review date, once they have read the four built pages; then set `legalReviewCompleted: true` | — | `reviewedBy`, `reviewDate`, `legalReviewCompleted` | — |
| [ ] | Search Console verification token (only if you choose a URL-prefix property in §2): only the `content` value of the tag Google shows | — | `SEARCH_CONSOLE_VERIFICATION` in `site/src/lib/site.ts`, or send it to Claude | — |
| [ ] | SEMrush balance from Subscription info → API units, with the date you read it | — | Send it to Claude; it goes in `SEMRUSH_API_LEDGER.md` (the ledger's estimate is 43,740, not yet confirmed) | — |
| [ ] | Hostinger plan and PHP version (the form needs PHP 8.1 or later) | — | `HOSTING_AND_DEPLOYMENT_ASSESSMENT.md` §1 | — |

Not needed today: `referralDetails` and `paidServices.terms`. They are needed only if a referral arrangement is agreed or a paid service is offered. Also ask the reviewer the six questions in `LEGAL_COMPLETION_CHECKLIST.md` §3: processing terms with the providers, whether a data protection officer is needed, the consent wording, cookies, the breach procedure and consumer law.

## 2. Decisions requiring your approval

| ✓ | Decision | Default now / recommendation | Where it is set or recorded |
|---|---|---|---|
| [ ] | N24 (a): our own text (overview, programme names, city, region) | An overview is shown only after a named editorial review of the exact text. A programme is listed only if its name appears in the quotation that verifies it; otherwise it is not listed. City and region are shown only if a verified address contains them | `site/src/lib/publication-config.mjs`; record the decision in `PUBLICATION_POLICY_DECISIONS.md` |
| [ ] | N24 (b): which hosts count as a recognition authority | None. The list is empty, so no recognition claim is shown | `RECOGNITION_AUTHORITY_HOSTS`, same file |
| [ ] | N24 (c): proving the official website | The website counts only when a .gov.ua government page lists exactly the same website. Until then no profile can go live | `WEBSITE_REQUIRES_GOVERNMENT_EVIDENCE`, same file |
| [ ] | N25: research previews and the label "Not yet verified" | On. The 12 universities are listed by name only, labelled "Not yet verified", kept out of search results (noindex) and left out of the sitemap | `RESEARCH_PREVIEWS`, same file |
| [ ] | Search Console property type | A domain property verified by a DNS TXT record (recommended if you can edit DNS; no release needed), or a URL-prefix property verified by a meta tag the site carries (this needs a release and the token from §1) | `ANALYTICS_AND_SEARCH_CONSOLE.md` §A1 |
| [ ] | Analytics option | Recommended: Search Console, the host's logs and a first-party event beacon. The beacon uses no cookie, needs no banner and no CSP change, but needs a privacy-notice line and a release. GA4 would need a consent banner, a CSP change and a privacy-notice change | `ANALYTICS_AND_SEARCH_CONSOLE.md` §B |
| [ ] | Merge `/courses/pharmacy/` into `/courses/` | Kept for now as a thin page. The plan is to merge it if no verified English-taught programme exists by the next review | `KEYWORD_URL_MAP.md`, row 11 |
| [ ] | Further SEMrush spend | None planned (30 units were used on 2026-10-12 to check demand for Vinnytsia). Any more only after you send a balance reading | `SEMRUSH_API_LEDGER.md` (2026-10-12) |
| [ ] | Release approval: move `publish-production` to the approved commit, only after the gate prints READY | Not approved | `RELEASE_CANDIDATE.md` |
| [ ] | Make the repository private before any Search Console export is stored in it (D8) | It is public today, so keep exports outside it until then | GitHub repository settings |

Other open questions, not needed for the first release, are listed in `PUBLICATION_POLICY_DECISIONS.md` under "Other owner decisions still open".

## 3. Work Claude can complete independently

| ✓ | Task | Can start |
|---|---|---|
| [ ] | Record evidence in `site/data/evidence/<slug>.json`, update the records and registers, close open questions, run `npm test` and build a preview for you to sign off each profile | When captures arrive or the hosts are allowed (§4) |
| [ ] | Enter your legal answers word for word in `legal.mjs`, rebuild, and run the readiness check | When you send them (§1) |
| [ ] | Apply your N24/N25 choices, update the tests that pin them, and record the choices | When you decide (§2) |
| [ ] | Set the Search Console token in `site/src/lib/site.ts` (the tag and its test are already in place), run the tests and include it in the release | When you send a URL-prefix token |
| [ ] | Build the event beacon (`/api/event.php`, one bundled script and `data-*` markers) and draft the privacy-notice line | When you choose that option |
| [ ] | Record your SEMrush reading and reconcile the ledger | When you send it |
| [ ] | Fix defects that audits and tests find, and keep tests and documents (including this file) up to date | Now |

## 4. Evidence that must come from official sources

**Nothing has been verified yet.** All 12 records are unpublished and every evidence file is empty. Every official university and government host was refused from this environment.

**What each university needs for a first publishable profile:**
1. A Ukrainian government page (.gov.ua, for example EDEBO or the Ministry portal) that lists the university's website exactly (the N24 (c) default).
2. The official name, website, postal address and international-admissions contact, exactly as printed.
3. A dated official statement for 2026/27 on where and how teaching takes place.
4. For Medicine at least: the sentence admitting foreign applicants for 2026/27, plus the level, award title, duration and teaching language.
5. The current fee page: either a fee with its academic year, or "To be confirmed" (you approved this on 2026-10-11).

| ✓ | University (ordered by India search demand) | Main gaps beyond the five items above |
|---|---|---|
| [ ] | Bukovinian State Medical University | No address lead; the fee page showed 2023–24; no dated teaching statement; the 2026/27 rules for foreign applicants are still to be found |
| [ ] | Odesa National Medical University | The teaching statement covers 2024–25 only; the year on the fee table is unconfirmed |
| [ ] | Kharkiv National Medical University | First: where international students are taught in 2026/27 (only 2022 statements found). Then the 2026 admission rules, the address, the Medicine award title (leads conflict) and fees (none found) |
| [ ] | Bogomolets National Medical University | Which domain is official (nmuofficial.com or nmu.ua); no fee figure; current contacts; no teaching statement |
| [ ] | Ivano-Frankivsk National Medical University | Admission and fee leads are from the 2025 cycle, and the fee columns are unlabelled; the teaching notice dated 2026-09-01 still has to be read |
| [ ] | Uzhhorod National University | No address lead; the English-programme fee page has never been captured; Medicine is the only programme |
| [ ] | Ternopil National Medical University | The fee table is for 2025/26; no dated 2026/27 statement; the name and address came from the brief, not from the university |
| [ ] | Vinnytsia National Pirogov Memorial Medical University (listed separately: added to this group on 2026-10-12 after a demand check; it has the most 2026/27 documents) | No address lead; no 2026/27 teaching order (only a 2025 order was found, and it has not been read) |

**Two routes (either one works, and both are free):**
- [ ] **A. Allow the hosts.** In the session title bar, open the cloud environment menu → Edit → Network access → add the hosts under Allowed domains. Keep "Allow package managers" ticked. Steps: https://code.claude.com/docs/en/cloud-environments#network-access. The 20 hosts are in `OWNER_ACTION_SHEET.md` §1 (also `research/verification/ALLOWLIST_P1.txt`); then run `npm run probe:access` from `site/` to confirm which answer.
- [ ] **B. Send captures.** Save each page listed in `research/verification/CAPTURE_REQUEST_2026-10-12.md` as a PDF that shows the URL and the date. Keep captures outside the repository while it is public. "Not found" or "silent" counts as a valid answer.

## 5. Tests that can only be completed after a release

| ✓ | Test | How |
|---|---|---|
| [ ] | Before the release first writes to the host: take a dated backup of the live document root. Then create `uma-private/config.php` beside `public_html` with a new random `ip_hash_key` (generate it yourself and never send it to anyone) | `RELEASE_CHECKLIST_PROPOSED.md` 9.1; `EMAIL_DELIVERY_VERIFICATION.md` P3 |
| [ ] | Run `npm run verify:live` from a computer that can reach the site (or from here, once `ukrainemedicaladmissions.com` and `www.ukrainemedicaladmissions.com` are allowed) | `RELEASE_CANDIDATE.md`, step 4 |
| [ ] | Real e-mail delivery test: one synthetic submission, checks C1–C11 | `EMAIL_DELIVERY_VERIFICATION.md` §4–§7 |
| [ ] | Search Console: verify the property, submit `sitemap-index.xml`, and inspect `/`, `/universities/` and `/tuition-fees/` | `ANALYTICS_AND_SEARCH_CONSOLE.md` §A2 |
| [ ] | First Search Console baseline export, repeated 28 days later. Store it outside the repository until the repository is private | `ANALYTICS_AND_SEARCH_CONSOLE.md` §A3 |
| [ ] | Live Core Web Vitals: Search Console's Core Web Vitals report or PageSpeed Insights on the live pages (the local Lighthouse test only gives lab results) | — |

**You are done when** `cd site && npm run build && node scripts/release-readiness.mjs` prints READY. Then change `expect: blocked` to `expect: pass` in `.github/workflows/ci.yml`.
