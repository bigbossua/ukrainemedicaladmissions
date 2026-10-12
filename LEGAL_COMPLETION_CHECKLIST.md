# LEGAL_COMPLETION_CHECKLIST.md — what the owner must supply before the legal pages leave draft

**Date:** 2026-10-12 · **Branch:** `wip/legal` (for `claude/university-profile-pipeline`) · **Status:** preparation only.

**This is preparation, not legal advice.** Nothing in this file or in `site/src/lib/legal.mjs` was decided by a lawyer. It lists what the four legal pages still need, says where the repository already documents an answer, and marks which answers need a qualified legal reviewer. No owner detail has been made up: every value that is not documented in the repository is left empty, and wording that today's drafts contain without a recorded owner approval is marked as a **proposal**, not a fact.

## How it works

- **One file.** Every owner detail the four pages need (`/privacy/`, `/terms/`, `/disclosure/`, `/complaints-policy/`) lives in `site/src/lib/legal.mjs`, in the object `LEGAL`. The pages read it; nobody edits the pages to fill in a detail.
- **Visible gaps.** A detail that is still empty appears on the page as **"[to be supplied by the owner: …]"** (visible text, read out by screen readers). A proposal appears as its draft wording followed by **"[proposed in the draft, not yet approved by the owner]"**.
- **The draft banner** ("Draft for legal review") stays on all four pages until every required detail is supplied (no empty value, no proposal) **and** `legalReviewCompleted` is `true` with `reviewedBy` and `reviewDate` set.
- **The check.** From `site/`, `node scripts/release-readiness.mjs` (to be wired as `npm run check:release`) lists, in plain words, every missing detail, every unapproved proposal, the review flag, any draft text left in the built pages (`dist/`, so run `npm run build` first) and any university record flagged publishable that fails the publication policy. It exits non-zero until all of that is clear. Today it exits 1 with 38 blocking items (22 missing details, 9 proposals, 3 review fields, 4 draft pages).
- **To supply a value:** in `legal.mjs`, replace `null` (or the `proposed(...)` call) with the value as plain text; dates as `'YYYY-MM-DD'`; yes/no answers as `true` or `false`. Only items 4 and 12 accept `NOT_APPLICABLE` ("N/A" or "not applicable" count the same). A placeholder such as "TBC", "to be confirmed", "???" or anything in square brackets counts as not supplied, so the draft banner stays.

## 1. Already documented in the repository (not asked again)

| Detail | Value used | Where it is documented |
|---|---|---|
| Business e-mail (contact, privacy requests, complaints) | info@ukrainemedicaladmissions.com | `site/src/lib/site.ts` (`SITE.email`); `site/public/api/enquiry.php` (`notify_to`); `site/public/.well-known/security.txt` |
| Website hosting and storage of form submissions | Hostinger | `HOSTING_AND_DEPLOYMENT_ASSESSMENT.md` §1 ("Hostinger account holds this site — VERIFIED (screenshot)") and §2 (Hostinger Git is the "CHOSEN ROUTE"). The same document leaves the hosting plan (§1) and whether the domain is already connected to that website entry (§12.1) UNVERIFIED. |
| Analytics | None installed | Privacy draft (since `4136658`); `ANALYTICS_AND_SEARCH_CONSOLE.md` ("no analytics tool is installed") |
| Payments and paid services | None; nothing is sold or priced | Disclosure draft ("We currently charge nothing…"); `SERVICE_TIERS_SPEC.md` ("Not on sale, not priced, not shown on the website"); `APPLICATION_SYSTEM_SPEC.md` §5 |
| Referral fees, commissions, partnerships | None | Disclosure draft; `SERVICE_TIERS_SPEC.md` ("no agreements exist"); `EXECUTIVE_REPORT.md` §6 |
| Documents accepted at Stage 1 | None | `APPLICATION_SYSTEM_SPEC.md` §2; `enquiry.php` header |
| What each submission stores | The record fields and candidate-profile fields listed in `legal.mjs` (`facts`); one JSON file per submission outside the web root, plus a plain-text e-mail to the business address | `site/public/api/enquiry.php`; `APPLICATION_SYSTEM_SPEC.md` §2. `tests/release-readiness.mjs` fails if the handler starts storing a field the list does not name. |
| Keyed IP code | Stored only when a secret `ip_hash_key` is set in `uma-private/config.php`; without it no IP data is stored | `enquiry.php`; `TECHNICAL_REPAIR_BACKLOG.md` N21 |

## 2. Owner details and decisions

"Current state": **MISSING** = not recorded anywhere in the repository; **PROPOSED** = wording in today's draft with no recorded owner approval (shown on the page as a proposal); **NOT REQUIRED today** = needed only if the condition changes.

| # | Item (`legal.mjs` path) | What the owner supplies | Why the page needs it | Where it appears | Current state | Qualified legal review |
|---|---|---|---|---|---|---|
| 1 | `entity.name` | The legal name of the person or company that runs the service ("Ukraine Medical Admissions" is the site's name, not a legal entity) | Visitors must be told who they are dealing with and who holds their data | /privacy/ /terms/ /disclosure/ /complaints-policy/ | MISSING (open decision D7) | No |
| 2 | `entity.type` | Legal form (for example sole trader or limited company) | Identifies the entity; decides whether a registration number exists | /privacy/ /terms/ | MISSING | No |
| 3 | `entity.country` | Country of registration | Decides which data-protection and consumer law applies, the authority, and whether a representative is needed | /privacy/ /terms/ | MISSING | No |
| 4 | `entity.registrationNumber` | Registration number, or `NOT_APPLICABLE` | Identifies a registered company | /privacy/ /terms/ | MISSING | No |
| 5 | `entity.address` | Registered or business postal address | A postal address for formal requests and complaints | /privacy/ /terms/ /complaints-policy/ | MISSING | No |
| 6 | `controller.name` | Name of the data controller | The privacy notice must name who decides how personal data is used | /privacy/ | MISSING | Yes |
| 7 | `representative.needed` | Whether the law requires a representative in the UK or the EU (`true`/`false`) | Depends on where the business is established | /privacy/ | MISSING | Yes |
| 8 | `representative.details` | The representative's name and postal address | Must be named when one is required | /privacy/ | NOT REQUIRED today (only if item 7 is `true`) | Yes |
| 9 | `governingLaw` | The law that governs the terms | The terms must say which law applies | /terms/ | MISSING | Yes |
| 10 | `courts` | The courts that deal with disputes | The terms must say where disputes are decided | /terms/ | MISSING | Yes |
| 11 | `privacyAuthority` | The data-protection authority people can complain to, with its web address | The draft names only "the relevant supervisory authority" | /privacy/ | MISSING | Yes |
| 12 | `complaintsBody` | The outside body an unresolved complaint can be taken to, or `NOT_APPLICABLE` | The complaints draft asked for the "applicable consumer-protection body" | /complaints-policy/ | MISSING | Yes |
| 13 | `effectiveDate` | The date the pages take effect (`YYYY-MM-DD`) | Every draft says "effective date to be set before publication" | all four | MISSING | No |
| 14 | `noticeVersion` | Version number of the privacy notice | Shown on the notice; also the consent version the handler should store (backlog N22e) | /privacy/ | MISSING | No |
| 15 | `retention.enquiries` | How long contact-form enquiries are kept | Each retention period must be stated | /privacy/ | PROPOSED: "up to 12 months after our last contact" (privacy draft; `APPLICATION_SYSTEM_SPEC.md` §14.12 "owner to confirm") | Yes |
| 16 | `retention.candidateProfiles` | How long candidate profiles from `/apply/` are kept | As above; the handler stores them as Stage-1 enquiry records | /privacy/ | PROPOSED: "up to 12 months after our last contact" (§14.12 row "Stage-1 enquiry JSON") | Yes |
| 17 | `retention.mailboxCopies` | How long the e-mail copies in the business mailbox are kept | Each submission is also e-mailed to the mailbox | /privacy/ | PROPOSED: "the same period as the stored record" (privacy draft) | Yes |
| 18 | `retention.backups` | Whether backups contain form submissions, and how long backups are kept | Deleted data can remain in backups (§14.12) | /privacy/ | MISSING (§14.12 "Window TO BE CONFIRMED"; host backup behaviour not recorded) | Yes |
| 19 | `retention.applicationRecords` | How long application records and documents are kept after an application ends | The notice describes the future dashboard with no period | /privacy/ | MISSING (draft: "[Exact periods to be confirmed.]"; §14.12 TO BE CONFIRMED) | Yes |
| 20 | `retention.complaints` | How long complaint records are kept | The policy says each complaint is recorded, with no period | /complaints-policy/ | MISSING | Yes |
| 21 | `lawfulBasis.enquiries` | Lawful basis for replying to enquiries | A lawful basis is needed for each purpose | /privacy/ | PROPOSED: "your consent and steps taken at your request before any contract" (privacy draft; not legally reviewed) | Yes |
| 22 | `lawfulBasis.candidateProfiles` | Lawful basis for handling candidate profiles | As above | /privacy/ | PROPOSED: same wording as item 21 | Yes |
| 23 | `lawfulBasis.abuseDetection` | Lawful basis for keeping the submission time and the keyed IP code to detect abuse | The draft gives no basis for this purpose | /privacy/ | MISSING | Yes |
| 24 | `lawfulBasis.applications` | Lawful basis for handling application documents | The draft describes the future dashboard with no basis | /privacy/ | MISSING | Yes |
| 25 | `processors.mailbox` | The company that provides the business mailbox | It receives a copy of every submission | /privacy/ | MISSING (`APPLICATION_SYSTEM_SPEC.md` §14.2 H6 UNVERIFIED) | No |
| 26 | `processingLocation` | The countries where the hosting and mailbox providers store the data | The notice must say where data is processed | /privacy/ | MISSING (hosting plan unverified, assessment §1) | Yes |
| 27 | `internationalTransfers` | Whether personal data goes to other countries, and the safeguard used | Transfers abroad must be disclosed | /privacy/ | MISSING | Yes |
| 28 | `under18Policy` | The rule for applicants under 18 | Open legal question (§14.12; checklist C11.2; `EXECUTIVE_REPORT.md` §K.8) | /privacy/ | MISSING | Yes |
| 29 | `complaints.acknowledge` | How quickly a complaint is acknowledged | The policy promises timescales | /complaints-policy/ | PROPOSED: "3 working days" (complaints draft) | No (owner decision) |
| 30 | `complaints.reply` | How quickly a complaint gets a full reply | As above | /complaints-policy/ | PROPOSED: "15 working days" | No (owner decision) |
| 31 | `complaints.reviewer` | Who reviews a complaint at the second stage | The policy names a second stage | /complaints-policy/ | PROPOSED: "the business owner" | No (owner decision) |
| 32 | `complaints.review` | How quickly the second stage replies | The policy promises timescales | /complaints-policy/ | PROPOSED: "a further 10 working days" | No (owner decision) |
| 33 | `referralDetails` | Who pays any referral fee or commission, and how much | The disclosure promises to state any such payment | /disclosure/ | NOT REQUIRED today (no arrangement exists; needed only if one is agreed) | Yes |
| 34 | `paidServices.terms` | Terms of each paid service: inclusions, exclusions, price, payment timing, refund terms (and the VAT position, `SERVICE_TIERS_SPEC.md`) | Needed before any paid service is offered | /terms/ | NOT REQUIRED today (nothing is sold) | Yes |
| — | `legalReviewCompleted`, `reviewedBy`, `reviewDate` | Set only after a qualified reviewer has read the four built pages with the values above | The draft banner stays until these are set | all four (banner) | `false`, empty, empty | — |

Items 19 and 24 concern the secure application dashboard, which is not built. They are listed because today's privacy notice already describes it. Whether that paragraph should stay in the notice until the dashboard exists is for the owner and the reviewer to decide; it has not been removed here.

## 3. Items that need a qualified legal review

Items 6–12, 15–24, 26–28, 33 and 34, plus the questions below. The reviewer should also read the final text of all four pages before `legalReviewCompleted` is set, including the owner-decision items (1–5, 13, 14, 25, 29–32).

Questions for the reviewer that are not values on the pages:

1. Whether written data-processing terms are needed, and in place, with the hosting provider and the mailbox provider.
2. Whether a data protection officer is required.
3. Whether the consent wording on the forms (`site/src/pages/apply/index.astro`, `site/src/pages/contact/index.astro`, and the `consentText` stored by `enquiry.php`) fits the lawful basis chosen in items 21–23.
4. Whether the notice must say anything about cookies or device storage (`ANALYTICS_AND_SEARCH_CONSOLE.md` §B marks its legal frame as an ASSUMPTION needing legal review).
5. The breach-notification procedure and its statutory time limits (`SECURITY_AND_RELEASE_CHECKLIST.md` C13.1).
6. Consumer-law terms (information before purchase, cancellation rights, refunds) before any paid service is introduced (`SERVICE_TIERS_SPEC.md`, "Consumer-law terms reviewed").

## 4. Order to complete

1. **Owner — who runs the service (items 1–5).** Only the owner knows these; the country (item 3) decides most of what follows.
2. **Owner with the reviewer — law and authorities (items 6–12).** With the country known, the reviewer advises on the controller, representative, governing law, courts, data-protection authority and any outside complaints body.
3. **Owner — service providers (items 25–26).** The mailbox provider and the data locations, read from the hosting and mail accounts.
4. **Owner with the reviewer — lawful bases, transfers and the under-18 rule (items 21–24, 27, 28).**
5. **Owner — retention and complaints timescales (items 15–20, 29–32).** Approve each proposal (replace `proposed(...)` with the plain value) or set a different value; the reviewer confirms the retention periods.
6. **Owner — effective date and version (items 13–14).** Last, once the text is final.
7. **Reviewer — read the built pages.** `npm run build`, then open `dist/privacy/`, `dist/terms/`, `dist/disclosure/` and `dist/complaints-policy/`; when satisfied, set `legalReviewCompleted: true`, `reviewedBy` and `reviewDate`.
8. **Check.** `node scripts/release-readiness.mjs` from `site/` must print READY and exit 0. Then follow `SECURITY_AND_RELEASE_CHECKLIST.md` for the rest of the release.

## 5. What the check does not cover

- It does not judge whether a value is legally right; that is the reviewer's job.
- It does not test mail delivery, live headers, the live CSP or anything on the host (`SECURITY_AND_RELEASE_CHECKLIST.md` A6–A8, B).
- Storing the notice version with each consent (backlog N22e) is a separate code change in `enquiry.php`, not made here.
- Until this checklist is complete, `SECURITY_AND_RELEASE_CHECKLIST.md` A0 applies: complete the legal pages, or keep the forms disabled, before any deployment.
