# APPLICATION_SYSTEM_SPEC.md

**Status:** Stage 1 implemented and tested with synthetic data. Stages 2–4 are specification only — **no real applicant documents may be collected until the Stage 2 security review is signed off by the owner.**

## 1. The four states (never conflated)

| State | Meaning | Who can see "sent to university"? |
|---|---|---|
| 1 Enquiry | Contact details + interests received by us | Never |
| 2 Draft application | Applicant is completing forms/uploads in their account | Never |
| 3 Submitted to Ukraine Medical Admissions | Applicant confirmed; we review, request missing items | Never |
| 4 Official submission to university | Completed through the university's authorised procedure, with a reference/receipt stored | Only after the receipt is recorded by staff |

Status copy shown to applicants is generated from the state machine; free-text can never set state 4.

## 2. Stage 1 — implemented (`site/public/api/enquiry.php`, `/apply/`, `/contact/`)

- Forms: application-start (course, university, start year, name, email, certificate country, qualification, message, consent) and enquiry (name, email, message, consent). Client-side accessible validation; server-side validation authoritative.
- Anti-abuse: honeypot field; method check (405); input length caps; email validation; IP stored only as a monthly-rotating SHA-256 hash.
- Storage: JSON record per submission in `<document-root-parent>/uma-private/enquiries/` (configurable via `UMA_PRIVATE_DIR`), directory mode 0700. **Never inside the web root; never in Git** (`private/` ignored).
- Notification: plain-text email to the business address (no documents, no card data). Deliverability **untested** on Hostinger (backlog N4).
- Applicants are told explicitly not to send passport/certificate scans at this stage.
- Thank-you page is noindex and states that nothing has been sent to a university.

## 3. Stage 2 — accounts, save-and-resume, documents (PROPOSED)

**Runtime:** PHP 8.3 on Hostinger + MySQL (both available on the plan — UNVERIFIED until hPanel is inspected), under `/apply/app/` served with `X-Robots-Tag: noindex` and `Disallow` in robots.txt. Framework: a small, well-maintained PHP stack (e.g. Slim) — decided at Stage 2 start, no paid components. *(Corrected 2026-10-11: "Laravel-lite" is not a named product and was removed. §14.1 now recommends plain PHP with a few vendored libraries.)*

**Data model (tables):** `applicants` (id, email, password_hash Argon2id, status, consent_version, created, last_login) · `applications` (id, applicant_id, university_slug, course, intake, state ∈ {draft, submitted_to_uma, official_submitted, closed}, created, updated) · `application_fields` (application_id, key, value_encrypted) · `documents` (id, application_id, type, original_name, storage_path, sha256, size, mime, uploaded_at, reviewed_by, review_status, review_note) · `status_events` (application_id, from_state, to_state, actor, at, note) · `audit_log` (actor, action, object, at, ip_hash) · `staff` (id, email, role ∈ {admin, reviewer}, mfa_secret).

**Security controls (must pass review before go-live):**
- TLS only; HSTS; CSP; SameSite=Strict session cookies; CSRF tokens on every POST.
- Passwords Argon2id; rate-limited login; email verification; optional TOTP for applicants, mandatory for staff.
- Uploads: allow-list (PDF/JPG/PNG), size cap, MIME sniffing, stored **outside web root** with random names, served only through an authenticated download endpoint with `Content-Disposition: attachment`; virus scan if available on the host.
- Encryption at rest for sensitive fields (libsodium) with the key in an env file outside the web root; database credentials likewise.
- Role-based access: applicants see only their own records; reviewers see assigned applications; admins manage staff.
- Audit log for every state change, document view/download and staff login.
- Retention: drafts untouched for 12 months → deletion warning → delete; closed applications → documents deleted after a defined period (owner to set, e.g. 6 months), metadata retained for accounts; export/delete on request.
- Backups: nightly encrypted dump + document store copy to a separate location; restore tested quarterly; incident response contact list.
- Notifications: transactional email only; templates reviewed so no message implies university submission unless state 4.

## 4. Stage 3 — administration

Reviewer dashboard: queue by state, missing-document requests (templated, logged), notes, state transitions with mandatory reason, official-submission receipt upload (required to reach state 4), reporting (enquiries → drafts → submitted → official → outcomes, by landing page and country).

## 5. Stage 4 — payments (not before owner approval)

Stripe Checkout only (no card data touches our server); prices and terms from `SERVICE_TIERS_SPEC.md`; webhooks verified and idempotent; refunds reconciled; test mode until explicitly switched.

## 6. Testing

Synthetic applicants only (`test+<n>@example.invalid`; corrected 2026-10-11 from `example.com` to follow the owner's rule that synthetic data uses `example.invalid`); fixture documents are generated PDFs; automated tests for state machine, access control (cross-account access must 403), upload validation, CSRF, and that no route under `/apply/app/` is indexable. Production verification only after deployment is approved.

## 7. Blockers to a genuine, secure online application workflow (status 2026-10-10)

| # | Blocker | Why it blocks | Owner action / evidence needed | Status |
|---|---|---|---|---|
| B1 | Document root and hosting layout for this domain unknown | Private storage must sit outside the real web root; the File Manager `public_html` seen is evidently not where the live site is served from (live pages exist on the domain) | hPanel → domain → Files/FTP path; confirm which directory serves `ukrainemedicaladmissions.com` | UNVERIFIED |
| B2 | MySQL availability and PHP version on the plan | Stage 2 needs a database and PHP ≥ 8.2 (Hostinger offers 8.2–8.5 on current plans per its support page — plan-specific availability not yet seen) | Screenshot of hPanel → Databases and PHP Configuration | UNVERIFIED |
| B3 | Transactional email | Status notifications and email verification depend on deliverable mail from the domain (SPF/DKIM) | Test `mail()` from staging; add SPF/DKIM in hPanel Emails | NOT TESTED |
| B4 | Staging environment | No real applicant data may touch an untested system; all auth/upload/role tests must run on staging first | Create `staging.` subdomain + directory; connect `staging` branch | NOT CREATED |
| B5 | Security review sign-off (§3 controls) | Required before any real document upload | Owner (or a reviewer the owner appoints) ticks `SECURITY_AND_RELEASE_CHECKLIST.md` §C | NOT STARTED |
| B6 | Legal basis and retention periods | Privacy notice must state entity, periods and lawful basis before collecting identity documents | D7: legal entity details; retention decision | OPEN |
| B7 | Backup and restore procedure for the private store | Documents outside the web root are not covered by a plain site backup | Define backup target + quarterly restore test | NOT DEFINED |
| B8 | University submission procedures | State 4 ("official submission") requires each university's authorised route and any permission to act for applicants | Verify per university on official pages (blocked from this environment: network policy) | BLOCKED |
| B9 | Payments | Not before tiers, prices, refund terms are approved (`SERVICE_TIERS_SPEC.md`) | Owner decision | DEFERRED |

Nothing in Stage 2+ is built; Stage 1 (enquiry/application-start, no documents) is the only live-capable component and stores records outside the web root.

---

## 8. Candidate-profile and application-readiness service (added 2026-10-11; PROPOSED, nothing built)

**Principle:** a prospective student is never turned away for lacking documents or grades. The service separates a **candidate profile** (free, saveable, incomplete by design) from a **completed application** (state 3+ in §1). Nothing in this section may label a candidate "eligible" or "ineligible"; the system records *what is known*, *what the verified programme requirement says*, and *what evidence is still needed*.

### 8.1 Stage 1 — create a candidate profile (minimum data)

| Field group | Fields (all optional except contact + consent) | Why collected | Not collected at this stage |
|---|---|---|---|
| Contact | name, email (verified by link), country of residence, nationality (optional) | Account identity, communication, country-specific requirements | phone (optional, never required), messaging-app handles |
| Intent | field of study (medicine · dentistry · pharmacy · nursing · public health · physical therapy/rehabilitation · physical education/sport · preparatory · undecided), academic level (bachelor/master/integrated), preferred universities (0–3), intended intake (if known) | Drives which verified requirements are compared | — |
| Education | current level, school-leaving qualification + awarding country + year (achieved / expected), subjects studied with grade and grading scale, outstanding examinations/results | Readiness assessment | certificates themselves |
| Documents | which document types the candidate *already has* vs *still needs* (self-declared checkboxes) | Readiness checklist | the files — no upload at Stage 1 |
| Support | free-text questions; preferred language of correspondence | Service | — |

Consent text states what is stored, for how long, and that nothing is sent to any university. Passport numbers, scans and sensitive data are **not requested** to express interest.

### 8.2 Stage 2 — academic-readiness framework (evidence-based, programme-specific)

The framework compares the candidate's record with **verified requirement objects** of a specific programme at a specific university for a specific intake. Each requirement object: `{ programme_id, type ∈ {subject, grade, exam, language, age, document, other}, value, condition (e.g. "applicants with A-levels"), source_url, checked, status ∈ {verified, unverified, not-published} }`.

| Distinguish | Stored as | Rule |
|---|---|---|
| Subjects studied | candidate record | self-declared until a transcript is reviewed |
| Subjects required | requirement objects (`type=subject`) | only `verified` objects are used in an assessment |
| Grades achieved | candidate record with grading scale | never converted between scales automatically |
| Minimum grades required | requirement objects (`type=grade`) | shown only when verified; otherwise "not published by the university" |
| Entrance examinations | `type=exam` | where applicable; never assumed |
| Language requirements | `type=language` | per programme and language of instruction |
| Outstanding results | candidate record (`pending`) | assessment result `pending_evidence` |
| Evidence needed | derived | the document that would verify each self-declared item |

Assessment output per requirement: **met · not met · unknown (requirement unverified or candidate data missing) · pending evidence**. The page wording is fixed: "This compares what you told us with the requirements the university has published; it is not an admission decision." Where a requirement is *not met* and a **verified** preparatory route exists (§PROGRAMME_SUPPLY_REGISTER), the route is shown with its source and the sentence that completing it does not guarantee admission or progression.

Biology, Chemistry, Physics, Mathematics and languages are the subjects most often referenced in medical admissions; the framework treats them as **candidate fields**, not as universal requirements — a subject becomes "required" only through a verified requirement object.

### 8.3 Stage 3 — document-readiness checklist (programme-specific)

Checklist items are generated from `type=document` requirement objects (each with source, check date and applicability condition — e.g. "translation required if the certificate is not in Ukrainian/English", "photographs: 6, 3×4 cm — if the university's page says so"). States per item:

`not requested → required → outstanding → uploaded → under review → accepted for processing | replacement or clarification requested`

"Accepted for processing" means our reviewer found the item complete and legible for *our* review; it never asserts authenticity or university acceptance, and the UI says so beside the state.

### 8.4 Stage 4 — save and resume

- Progress indicator with the five stages and a count of outstanding items; the next best action is always visible ("Add your Chemistry grade", "Upload a scan of your certificate when you have it").
- No deadline is shown unless it is a verified requirement object with a source; no countdowns, no "places running out".
- Reminders: at most one email per fortnight, opt-out in one click; content lists outstanding items only.
- Drafts untouched for 12 months → deletion warning → deletion (as §3).

### 8.5 Stage 5 — submit and track

As §1 states 3–4 and §3–§4: submission to Ukraine Medical Admissions only after the candidate confirms a complete checklist; reviewer queue; official-submission receipt required for state 4; corrections requested through templated, logged messages; candidate can request a correction of any stored field; audit trail; retention and deletion as §3.

## 9. Multi-university, multi-programme data model (extension of §3)

New tables: `programmes` (id, university_slug, title_official, qualification, level, field, language, duration, intake, status, source_url, checked) · `requirements` (as §8.2) · `preparatory_routes` (id, university_slug, title, duration, subjects, language, progression_condition_text, source_url, checked, status) · `candidate_profiles` (id, applicant_id, field, level, intake, countries, consent_version, updated) · `candidate_qualifications` (profile_id, qualification, awarding_country, year, subject, grade, scale, status ∈ {achieved, pending}) · `readiness_assessments` (profile_id, programme_id, generated_at, results JSON {requirement_id → met|not_met|unknown|pending_evidence}, basis = list of requirement versions) · `document_items` (application_id, requirement_id, state, uploaded_document_id, reviewer_note). Public-site content stays in `site/src/content/universities/*.json`; the application database imports the **verified** programme and requirement objects from it at build/publish time, so the public directory and the readiness logic share one source of truth. Nothing is hard-coded to Ternopil.

## 10. Hostinger capability assessment for Stage 2 (what is known, what must be checked)

| Capability | Status | Basis |
|---|---|---|
| PHP 8.x selectable per website | likely (8.2–8.5 offered per Hostinger's PHP configuration page) | search snippet, plan-specific availability UNVERIFIED — E3 screenshot settles it |
| MySQL databases, phpMyAdmin, cron jobs | included on Hostinger web-hosting plans | Hostinger plan descriptions (snippet-level); UNVERIFIED for this plan — hPanel Databases page |
| Node.js runtime for the website | **not on web hosting** — Node is a separate Hostinger product | Hostinger docs (snippet, §12 of the hosting assessment) |
| Files outside the document root writable by PHP | expected: a sibling of the document root, i.e. `/home/u…/uma-private/` or `/home/u…/domains/<domain>/uma-private/` depending on which root form hPanel shows (corrected 2026-10-11; the earlier text gave only the second form, while the assessment §10 leaves both open) | to be confirmed on the live host after the first enquiry test (checklist A1, A8) |
| Outbound SMTP / `mail()` | available; deliverability depends on SPF/DKIM for the domain | UNVERIFIED (backlog N4) |

**Decision (recommended, no purchase):** build Stage 2 as a small PHP 8 application with MySQL (SQLite in a private directory is acceptable for a synthetic pilot), uploads outside the web root, server-rendered forms with the existing design system, and e-mail through the hosting mailbox. Alternatives considered: a Node/serverless stack (not available on the plan; would need a paid service), a form/database SaaS (monthly cost, data outside our control, consent complexity), WordPress plus plugins (large attack surface for document handling). Confidence: strongly supported for the platform choice; the plan's exact PHP/MySQL limits are unknown until the hPanel screenshots (E3/E4) arrive.

## 11. Gates before any real candidate document is accepted (all must be ticked, by the owner)

- [ ] Account security as §3 (Argon2id, verified email, rate limits, CSRF, SameSite cookies, staff MFA).
- [ ] Upload handling: allow-list PDF/JPG/PNG, size cap, MIME sniffing, random storage names outside the web root, authenticated download only, malware scan if the host provides one, rejection of embedded scripts in PDFs or stripping.
- [ ] Abuse controls: per-account and per-IP rate limits, CAPTCHA-free honeypots and timing checks, logging.
- [ ] Backups: nightly encrypted database dump and document copy to a separate location; restore rehearsed with synthetic data.
- [ ] Retention and deletion rules written, implemented, tested with synthetic records; export/delete on request.
- [ ] Privacy notice and consent text reviewed for the applicable law (UK GDPR if the business is UK-based; GDPR-equivalent for EU applicants; the owner confirms the legal entity — D7).
- [ ] Access review: cross-account access attempts return 403 in automated tests; reviewer roles scoped.
- [ ] Owner's written sign-off recorded here with date.

---

## 12. Candidate-profile design detail (added 2026-10-11; planning only — nothing implemented, no document collection)

### 12.1 Stage-1 stepped form (replaces the single `/apply/` form; still e-mail + JSON backed until Stage 2)

| Step | Fields | Validation | Saved as |
|---|---|---|---|
| 1 Your plan | field of study (9 options incl. undecided) · level (bachelor / master / integrated master / preparatory / unsure) · up to 3 preferred universities (from the directory; "not decided yet" allowed) · intended intake (year or "not sure") | one field required: field of study | `profile.intent` |
| 2 Your education | highest level completed or in progress · school-leaving qualification name · awarding country · year (achieved / expected) · grading scale (selected from a list or free text) · subjects studied with grade (repeatable rows; Biology, Chemistry, Physics, Mathematics, English and "other" offered as suggestions, none required) · results still outstanding (free text) | none required; grades accepted as typed, never converted | `profile.education[]`, `profile.subjects[]` |
| 3 Your documents | checklist of common document types, each marked **have / need / not sure**: secondary-school certificate, transcript, passport, photographs, birth certificate, medical certificate, translations, legalisation/apostille, language certificate, other | none required | `profile.documents[]` (states: have · need · not_sure) |
| 4 About you | name · e-mail (verification link) · country of residence · nationality (optional) · preferred language of correspondence · your questions | name, e-mail, consent required | `profile.contact`, `consent.version` |
| 5 Review | summary; "Create my profile" (primary) · "Apply Online Now" stays the global primary CTA leading into this flow | — | state 1 (enquiry) record + e-mail; later Stage 2 account |

Copy rules: no step mentions deadlines, scarcity or eligibility; the thank-you page states what happens next and that nothing is sent to any university. Anti-abuse as today (honeypot, 405/422) plus a minimum-time check. *(Corrected 2026-10-11: the handler committed at `50376e3` has the honeypot, 405 and 422 but no timing check; §11 gate 3 requires one.)* Accessible: one question group per screen, error summary at the top, progress indicator with step names, keyboard order verified by the UI test.

### 12.2 Readiness assessment — worked example with synthetic data (illustrates the rules; not a published requirement)

Synthetic candidate: field = medicine, level = integrated master, qualification = "Secondary School Certificate", country = Example-land, subjects: Biology B, Chemistry C, Physics not studied, English B, Mathematics A; documents: certificate have, transcript need, passport have, translation not sure.

Synthetic programme P at University U with **verified** requirement objects: `subject Biology` (source U/admissions, checked 2026-10-11), `subject Chemistry`, `language English B1 or school instruction in English`, `document secondary certificate + transcript`, `document translation if not in Ukrainian/English`; and an **unverified** object `grade minimum 60% in Biology` (status unverified).

| Requirement | Candidate data | Result shown | Wording |
|---|---|---|---|
| Biology studied | B | **met** | "Biology: studied (grade B as you entered it)" |
| Chemistry studied | C | **met** | — |
| Minimum 60% Biology | B on an unknown scale; requirement unverified | **unknown** | "The university's minimum grade has not yet been verified by us; we will confirm it from the official page." |
| English B1 or instruction in English | English B | **pending evidence** | "Upload your English certificate or school letter when you have it." |
| Certificate + transcript | have / need | **outstanding** (transcript) | "Transcript: outstanding — request it from your school." |
| Translation | not sure | **unknown** | "Needed only if your documents are not in Ukrainian or English — tell us the language." |

The page never totals these into a score or a verdict. If a verified preparatory route exists at U, it is shown beneath with its official wording on progression; if not, nothing is suggested.

### 12.3 Missing-document workflow (Stage 2 behaviour; states from §8.3)

`required → outstanding`: created from verified requirement objects when the candidate selects a programme; the candidate sees the list immediately.
`outstanding → uploaded`: candidate uploads (allow-listed types, size cap, outside web root); the item shows "received, not yet reviewed".
`uploaded → under review`: a reviewer opens it (logged).
`under review → accepted for processing`: reviewer confirms it is complete and legible for our review — label text: "Accepted for our review. This is not confirmation of authenticity or acceptance by the university."
`under review → replacement or clarification requested`: templated reason (illegible, wrong document, expired, missing pages, translation needed) → e-mail with the reason → item returns to `outstanding` with the note visible.
Any state → `not requested`: if the requirement object is withdrawn (programme or intake changed), with the reason logged.
Reminders: one per fortnight at most, listing outstanding items only; a candidate can pause reminders.

### 12.4 Save-and-resume

Magic-link sign-in (e-mail) plus optional password at Stage 2; profile autosaves per step; "Continue where you left off" lands on the first incomplete step; progress indicator shows steps done, items outstanding and the next best action; deletion request honoured within the retention rules of §3.

### 12.5 What is not built in this phase

No accounts, no uploads, no database, no reviewer interface. The Stage-1 stepped form (§12.1) is the only candidate-facing build proposed for the next implementation cycle, and it only reaches production through an approved release.

---

## 13. Specification review 2026-10-11 (against the owner's five requirements) — gaps found and fixes adopted

| Requirement | Where covered | Gap found in review | Fix adopted (specification only) |
|---|---|---|---|
| Save and resume | §8.4, §12.4 | No statement of what "progress" means when a candidate changes field or university mid-way | Add: changing field/level/university re-runs the readiness comparison and re-derives the checklist; completed items stay; items no longer required move to `not requested` with a visible note; nothing is deleted |
| Academic subjects and grades | §8.2, §12.1 step 2 | Grading scale captured as free text could prevent any later comparison; no handling of predicted vs achieved | Add fields `scale_type` (percentage · letter · points · GPA · other) + `scale_max`; `result_status ∈ {achieved, predicted, pending}`; comparison runs only when a verified requirement object states a scale-compatible minimum; otherwise the result is `unknown` with the explanation "no verified minimum" or "scale not comparable" |
| Missing documents | §8.3, §12.3 | Document requirements came only from `type=document` objects; the sweep shows universities also require translation/legalisation conditionally and photographs in specific formats | Add `condition` expressions evaluated against the profile (certificate language, awarding country) and a `format_note` quoted from the official page; show the reason a conditional item appears |
| Legitimate preparatory routes | §8.2 (one sentence), §9 `preparatory_routes` table | The sweep shows preparatory departments differ in language (Ukrainian-only vs Bukovinian's English track), duration, certificate name and progression wording; the earlier spec treated them as one type | `preparatory_routes` gains `language_of_instruction`, `english_track (bool)`, `duration_text`, `certificate_name`, `progression_text` (verbatim official wording), `applies_to_english_degree_track (bool, e.g. Ternopil: no)`, `fee_text + year`, `source_url`, `checked`; the readiness page shows a route only when `status=verified` and only with its own progression wording; never "guarantees entry" |
| University-specific requirements | §8.2 requirement objects, §9 | No link from a requirement object to the intake year; no handling of entrance exams named by universities (e.g. oral exams in biology/chemistry/physics/English at Bogomolets; minimum pass 6/12 at Zaporizhzhia — both snippet leads) | Requirement objects gain `intake_year` and `exam_format_text` (verbatim), and the readiness result for `type=exam` is always `pending_evidence` until the university's result exists; objects for a past intake become `outdated` automatically |

Also adopted: the profile's **field and level choice drives the directory filter** (§UNIVERSITY_DATA_REGISTER §10) so that a candidate choosing public health or rehabilitation sees only universities with a verified programme in that family — and sees an honest "no verified English-language programme is known to us" message when none exists, rather than being funnelled to medicine.

Status: specification complete for Stage 1 (stepped form) and the data model; **nothing implemented; no real documents collected; go-live gates in §11 unchanged.**

---

## 14. Stage-2 technical architecture and security design (PHP 8 + MySQL on the current hosting; design only, nothing built)

**Status 2026-10-11: DESIGN ONLY. Nothing in §14 is built.** No account, sign-in, upload, payment, reviewer screen or real document handling exists. The only live-capable component is Stage 1: the `/apply/` and `/contact/` forms posting to `site/public/api/enquiry.php`, which e-mails the business address and writes a JSON record outside the web root. Stage 2 is developed and tested on **synthetic records only** (`@example.invalid`) until the owner signs §11.

Labels: **VERIFIED-IN-REPO** (read in a repository file) · **VERIFIED (screenshot)** and **OWNER-REPORTED** (as recorded in `HOSTING_AND_DEPLOYMENT_ASSESSMENT.md`) · **SNIPPET-BACKED** (search-snippet evidence recorded in that assessment; in the owner's label set this is a LEAD, not OFFICIAL) · **UNVERIFIED** (not yet checked on the host) · **ASSUMPTION** · **RECOMMENDATION** (a design choice the owner may change) · **ESTIMATE** (effort, not measured).

### 14.0 Phasing, and what this section changes

| Phase | Contents | Real candidates allowed when |
|---|---|---|
| 2a | Magic-link accounts; save-and-resume profile (the §12.1 steps); programme choice; readiness comparison against verified requirement objects (§8.2); document checklist with the candidate's own have / need answers (§12.3 states up to `outstanding`); reminders (§8.4). **No uploads.** | The owner signs §11. EXECUTIVE_REPORT §K.8 proposes that accounts without uploads could open after §11 gates 1, 3, 6 and 7; if the owner wants that, §11 must carry an explicit, dated line naming that scope. Until then: synthetic records only. |
| 2b | Uploads; reviewer queue; document item states beyond `outstanding`; staff accounts with MFA in use. | Every §11 gate ticked and the sign-off recorded. |
| Stage 3 / 4 | Administration (§4) and payments (§5). | Separate owner approvals. Not designed here. |

Where §14 differs from earlier sections, §14 governs:

| Earlier text | §14 decision | Why |
|---|---|---|
| §3 "SameSite=Strict session cookies" | `SameSite=Lax`, with CSRF tokens on every state-changing request (§14.6) | With `Strict`, the cookie is not sent when a candidate follows a link from an e-mail (for example a reminder), so a signed-in candidate would appear signed out. `Lax` still withholds the cookie on cross-site POSTs. The CSRF token is the main defence either way. |
| §3 passwords (Argon2id) as the sign-in method | E-mail magic links first; an optional password later, Argon2id only (§14.5) | No password to steal or reuse at launch. The first sign-in also proves the e-mail address works, which is the "verified email" of §11 gate 1. |
| §3 `Disallow` for `/apply/app/` in robots.txt | `X-Robots-Tag: noindex, nofollow` on every app response; no `Disallow` line | A `Disallow` stops crawlers reading the noindex (the reasoning already used in `site/src/pages/robots.txt.ts`). No app URL ever enters the sitemap. |
| §3 table list (`applicants`, `applications`, `application_fields` …) and the §9 tables | The DDL in §14.8 | One schema covering §8, §9, §12 and §13. |
| §3 "framework decided at Stage 2 start" | Plain PHP with a few vendored libraries (§14.1) | Smallest attack surface and upgrade burden for a successor. RECOMMENDATION. |

Factual corrections made elsewhere in this file on 2026-10-11, each marked in place: §3 (framework example), §6 (synthetic address domain), §10 (private directory path), §12.1 (the committed handler has no timing check).

Corrections made inside §14 by the adversarial review on 2026-10-11: §14.1 (hosting-plan label), §14.3 (which requirement objects are imported), §14.7, §14.11 and §14.12 (deleted data stays in older backups until they leave the window; deletions are re-applied after a restore), §14.5 (the confirmation page names the address), §14.8 (`subjects.result_status` may be NULL), §14.14 (v2 field names checked against `wip/apply` at `6a35310`).

### 14.1 Why server-rendered PHP, and the stack

- The site's Hostinger account is managed in hPanel (VERIFIED (screenshot), assessment §1). That it is a shared web-hosting plan is inferred from the menus seen there (PHP Configuration, Databases, Cron Jobs, Cache Manager, Git); the exact plan is UNVERIFIED (assessment §1). Its Git feature copies files as they are and runs no build step; build commands exist only in Hostinger's separate Node.js hosting product (SNIPPET-BACKED, assessment §12). There is no Node runtime at request time on this kind of plan (assessment §3; §10 above). A Node or serverless back end would therefore need a paid service. PHP is already what the Stage-1 handler uses.
- Server-rendered HTML forms work without JavaScript, fit the current CSP (`script-src 'self'`, no inline scripts) and can reuse the site's design system. Small bundled scripts may improve forms; nothing depends on them.
- RECOMMENDATION: PHP 8.3 (minimum 8.2, §7 B2), PDO MySQL, libsodium, no full framework. Routing, templates, sessions, CSRF, rate limits and TOTP are small in-repo modules with unit tests. Third-party code only where writing our own is riskier: an SMTP mailer (for example PHPMailer) and, for tests, PHPUnit. Dependencies are pinned in `composer.lock`, installed in GitHub Actions (never on the host), checked with `composer audit` in CI and shipped vendored.
- The code lives in this repository in a new top-level `app/` directory, separate from `site/`. The public Astro build is unchanged.

### 14.2 Host facts to confirm before anything is built on the host

None of these has been checked on the plan. Each stays UNVERIFIED until the owner sends a dated screenshot, or the first synthetic test on the host proves it. The hPanel menu names come from the assessment; tab and sub-page names that it does not record (**PHP extensions**, **PHP options**, Databases → **Management**, the Emails pages) are approximate and may read differently on the owner's screen.

| # | Fact needed | Why | Where the owner checks in hPanel | Status |
|---|---|---|---|---|
| H1 | The domain's document root, and that a sibling directory beside it is writable by PHP | Config, code, data and backups must sit outside the web root | Websites → the domain → Dashboard → **FTP Accounts** (path line, assessment §10.1); checklist A1, A8 | UNVERIFIED |
| H2 | PHP ≥ 8.2 selectable for this website | Language features (the assessment, §9 risk (e), already asks for ≥ 8.1 for the Stage-1 handler) | Websites → the domain → Advanced → **PHP Configuration** (evidence E3) | UNVERIFIED |
| H3 | Extensions `pdo_mysql`, `sodium`, `fileinfo`, `mbstring`, `openssl`, `gd` or `imagick`, `exif`, `zip`; `password_algos()` includes `argon2id` | Database, encryption, MIME sniffing, image re-encoding, export archives, optional passwords | PHP Configuration → **PHP extensions**; confirmed by a one-off check script run over SSH and then deleted | UNVERIFIED |
| H4 | MySQL or MariaDB, and its version (target MySQL ≥ 8.0.16 or MariaDB ≥ 10.6, which enforce `CHECK` constraints); one database and user can be created; whether per-table grants are possible | Data model §14.8; append-only audit log | **Databases** → Management; version in phpMyAdmin (evidence E4) | UNVERIFIED |
| H5 | Cron jobs can run PHP scripts | Backups, retention, purges, reminders | Advanced → **Cron Jobs** (menu seen in the screenshot, assessment §1; behaviour unknown) | UNVERIFIED |
| H6 | Authenticated SMTP from a domain mailbox; SPF and DKIM (ideally DMARC) for the sending address | Magic links must arrive and not land in spam | **Emails** → the domain's mail service and its DNS records; checklist A7; backlog N4; §7 B3 | UNVERIFIED (not tested) |
| H7 | PHP limits: `upload_max_filesize`, `post_max_size`, `max_file_uploads`, `memory_limit`, `max_execution_time` | Upload caps (§14.7) and backups | PHP Configuration → **PHP options** | UNVERIFIED |
| H8 | `REMOTE_ADDR` is the visitor's address (no undocumented proxy in front) | Per-IP rate limits | First synthetic request on the host from a known address | UNVERIFIED |
| H9 | The server cache never stores `/apply/app/` responses | Personal pages must not be served from a cache | **Cache Manager** (menu seen, assessment §1) | UNVERIFIED |
| H10 | Whether a malware scanner can be called per file from PHP | Optional upload scan (§14.7) | hPanel security section, if present. ASSUMPTION: shared hosting offers at most an account-wide periodic scan, which does not replace a per-upload check | UNVERIFIED |
| H11 | A deploy route for code that must sit outside the web root | Hostinger Git deploys into a directory the owner picks; whether it can be outside `public_html` is not documented (assessment §12) | Advanced → **Git** (directory field); or Advanced → **SSH Access** (status ACTIVE, VERIFIED (screenshot), assessment §1) for deployment option B: GitHub Actions → SSH/rsync with a deploy key held only as a GitHub secret | UNVERIFIED |
| H12 | Disk and inode quota | Document store and backups | Plan details | UNVERIFIED |

### 14.3 Components and directory layout

```text
/home/uNNNNNNNN/[domains/ukrainemedicaladmissions.com/]    exact form from H1 (assessment §10)
├── public_html/                      WEB ROOT: the Astro build plus PHP entry points only
│   ├── api/enquiry.php               Stage 1 handler (exists)
│   └── apply/app/                    Stage 2 entry point, added only in the approved 2a release
│       ├── index.php                 front controller: no logic, requires ../../../uma-app/bootstrap.php
│       └── .htaccess                 rewrite to index.php; deny any other .php; ExpiresActive Off; app headers
├── uma-app/                          PRIVATE application code, not web-reachable, deployed by route H11
│   ├── bootstrap.php                 config, error handling, autoload
│   ├── src/                          Http (router, middleware), Auth, Csrf, RateLimit, Profile, Readiness,
│   │                                 Documents (state machine, uploads), Staff, Audit, Mail, Privacy (export, deletion)
│   ├── templates/                    PHP templates; every value printed through e()
│   ├── migrations/                   numbered SQL files (§14.8)
│   ├── data/requirements.json        verified programme and requirement objects exported at build time
│   ├── bin/                          CLI: migrate, import-stage1, import-requirements, staff-create, retention, backup, purge
│   └── vendor/                       pinned, installed in CI
└── uma-private/                      PRIVATE data, mode 0700 (created by the Stage-1 handler by design)
    ├── config.php                    optional Stage 1 overrides (notify address, mail switch)
    ├── enquiries/                    Stage 1 JSON records
    └── stage2/
        ├── config.php                mode 0600: DB and SMTP credentials, sodium master key, HMAC key, maintenance switch (503)
        ├── documents/ab/…            encrypted files, random 64-hex names, no extensions (2b)
        ├── quarantine/               uploads being checked (2b)
        ├── exports/                  short-lived subject-access exports
        ├── backup-out/               encrypted dumps waiting for transfer
        └── logs/                     application logs (no personal content)
```

| Component | Role |
|---|---|
| Public site (Astro, existing) | Unchanged. `/apply/` stays the Stage-1 form until a later approved release links it to the app. |
| Front controller | The only Stage-2 PHP file in the web root. |
| Middleware chain | Security headers → session → timeouts → CSRF → rate limit → authentication → authorisation (§14.4). |
| Controllers | Candidate: sign-in, profile steps, programme choices, readiness, checklist, uploads (2b), privacy (export, deletion, sign out everywhere). Staff: MFA, queue, item review, assignments. |
| Services | MagicLink, Session, Csrf, RateLimiter, Readiness (pure functions over a profile and requirement objects), DocumentStateMachine, UploadValidator, Mailer, Audit, Retention, Backup, Export, Stage1Importer. |
| Repositories | PDO prepared statements only. Every method on candidate-owned data takes a scope object built from the session (§14.9). |
| Cron jobs | Nightly backup. Daily retention and purge (tokens, sessions, rate-limit rows, expired exports). Daily reminder run: at most one e-mail per candidate per fortnight, listing outstanding items only (§8.4). |
| Requirement import | The publish workflow exports **only publishable records** from `site/src/content/universities/*.json` to `data/requirements.json`, and for each of their programmes every requirement object with its status. The official wording (`value_text`) is exported only for `verified` (or `outdated`) objects, so an unverified or unpublished requirement can only give `unknown` and its value is never shown (§8.2, §14.8 `ck_requirements_unverified_value_hidden`). The content schema spells one status `not-published`; the importer maps it to `not_published`. `bin/import-requirements` loads the file. *(Corrected 2026-10-11 in review: an earlier draft exported verified objects only, which would have hidden unverified requirements instead of reporting them as `unknown`, contrary to §12.2.)* With today's data (seven records, none publishable, zero verified claims) it imports nothing, so no readiness result can yet be `met` or `not_met`. |

### 14.4 Request flow

1. HTTPS request → site `.htaccess` (canonical host, HTTPS) → `apply/app/.htaccess` rewrites to `index.php`.
2. `bootstrap.php` loads `stage2/config.php`, sets `display_errors=0`, sends errors to the private log and creates a request id.
3. PHP sets the security headers on **every** response, including errors and downloads (§14.6).
4. Session: read the `__Host-uma_s` cookie and look up its SHA-256 in `sessions`; apply idle and absolute timeouts; unknown or expired → a new anonymous session.
5. State-changing requests are POST only (the app uses no PUT or DELETE). Check the CSRF token and the `Origin` header → 403 on failure.
6. Rate limit for the route's action (§14.6) → 429 with `Retry-After`.
7. Authentication: the route needs a candidate, a staff member, or a staff member who has passed MFA.
8. Authorisation: build the scope (the candidate id from the session; a reviewer's assigned candidates) and pass it on.
9. Controller: validate input against allow-lists (§14.6), call services, write audit rows (§14.10).
10. A successful POST answers 303 to a GET page (post/redirect/get). GET renders a template with output encoding.

### 14.5 Authentication and sessions

**Magic links (candidates and staff):**

- Request: the person types an e-mail address. The answer is always the same page ("If this address can receive e-mail, a link is on its way"), whether or not an account exists, so the form does not reveal who has one. Rate-limited per address and per IP (§14.6).
- Token: a 12-byte random **selector** (the lookup key) and a 32-byte random **verifier**, both from `random_bytes()`. Only `sha256(verifier)` is stored (`login_tokens.verifier_hash`). The verifier exists only in the e-mail.
- Expiry 15 minutes. Single use (`used_at`). Sending a new link invalidates earlier unused links for that address.
- Bound to the e-mail address: the token row keeps the address it was sent to and is accepted only if that address still belongs to the account (or, on a first sign-in, to no other account).
- Comparison: `hash_equals($row['verifier_hash'], hash('sha256', $verifier, true))`, which runs in constant time.
- Mail scanners open links automatically. So opening the link (GET) **never** signs anyone in. It shows a "Continue signing in" button that POSTs the selector and verifier, and names the address being signed in to, so a person sent someone else's link (a login-CSRF trick to capture what they then type) can see it is not their account. The POST consumes the token, creates a fresh session, sets `email_verified_at` on first use and redirects (303) to a URL without the token. Both pages send `Referrer-Policy: no-referrer` and `Cache-Control: no-store`.
- The e-mail is plain text: the link, when it expires, and "If you did not ask for this, ignore this e-mail". No other personal data.

**Optional password (later):** `password_hash($p, PASSWORD_ARGON2ID)` only (needs H3); `password_needs_rehash()` at sign-in; never required; reset by magic link; checked against a local list of common passwords, with no external service.

**Staff:** created by an admin with `bin/staff-create`; no self-registration. Sign-in is a magic link followed by a mandatory TOTP code (RFC 6238, any authenticator app), with single-use recovery codes stored as keyed hashes. A staff session reaches no candidate data until `mfa_passed_at` is set. TOTP secrets are encrypted with libsodium `secretbox` under a key in `stage2/config.php`. The enrolment secret is shown as text; no external QR service is used.

**Sessions:**

- App-managed and database-backed (`sessions` table). The session id is 32 random bytes; only its SHA-256 is stored.
- Cookie `__Host-uma_s`: `Secure`, `HttpOnly`, `SameSite=Lax`, `Path=/`, no `Domain`. The `__Host-` prefix makes browsers enforce these, so a subdomain (such as a staging host) cannot plant the cookie. Session ids never appear in URLs.
- A new session id on every sign-in and on MFA completion; the old row is deleted, which prevents session fixation.
- Idle and absolute timeouts (table below). On expiry the person signs in again and finds their saved progress, because each profile step is saved when submitted.
- "Sign out" deletes the current session row. "Sign out everywhere" deletes every session row for the account and every unused login link. Changing the e-mail address also signs out everywhere.
- The account page lists active sessions (start time, a short browser description) so a candidate can spot one that is not theirs.

**Configuration defaults.** RECOMMENDATION: design values, not measurements; the owner may change them.

| Setting | Default |
|---|---|
| Magic-link lifetime | 15 minutes (brief) |
| Candidate session: idle / absolute timeout | 60 minutes / 24 hours |
| Staff session: idle / absolute timeout | 30 minutes / 10 hours |
| Sign-in link requests | 5 per e-mail address per hour; 20 per IP per hour |
| Link confirmations (the POST) | 30 per IP per hour |
| Profile and other form posts | 120 per account per hour; 300 per IP per hour |
| Uploads (2b) | 30 per account per day; 60 per IP per day |
| Staff sign-in | 10 per IP per hour; 5 wrong TOTP codes lock the staff account for 15 minutes and alert the admin |
| Upload size (2b) | 10 MB per file; 30 files per candidate |
| Image decode cap (2b) | 40 megapixels, checked with `getimagesize()` before decoding |

### 14.6 CSRF, rate limits, input and output rules, headers

**CSRF.** One synchroniser token per session (`sessions.csrf_secret`), sent as a hidden field in every form and compared with `hash_equals`. Every POST route requires it, including sign-in and link confirmation (anonymous sessions have a token too). As a second check, a POST whose `Origin` header is present and is not `https://ukrainemedicaladmissions.com` is refused. A test walks the route table, so a new POST route without the check fails CI.

**Rate limits.** Table-backed (`rate_limits`), fixed windows, one atomic `INSERT … ON DUPLICATE KEY UPDATE hits = hits + 1` per check. Buckets are HMAC-SHA256 values of the IP address, e-mail address or account id under a secret key, so raw addresses are not stored. Over the limit → 429 with `Retry-After` and no side effect (no e-mail sent, nothing stored). Note on Stage 1: it stores `sha256(ip + month)` (VERIFIED-IN-REPO, `enquiry.php`). Because there are few enough IPv4 addresses to try them all, that hash can be reversed. Stage 2 uses a keyed HMAC instead.

**Input validation** (server-side is authoritative):

| Input | Rule |
|---|---|
| Every form | Only fields on that form's allow-list are read; others are ignored (no mass assignment). An array where a string is expected, or invalid UTF-8, is rejected. |
| Enumerations (field of study, level, scale type, result status, document type and state, reason codes) | Must match the allow-list exactly, otherwise the field is rejected with a plain message. |
| Single-line text | Control characters removed, spaces collapsed, length-capped (the same caps as the Stage-1 handler). |
| Multi-line text | Line breaks normalised; other control characters removed; length-capped. |
| E-mail | `filter_var(FILTER_VALIDATE_EMAIL)`, trimmed, domain lower-cased, at most 254 characters. |
| Years and counts | Integers within a stated range. |
| Grades | Stored exactly as typed (at most 40 characters); never converted between scales (§8.2). |
| IDs in URLs | Random 32-hex `public_id` values, looked up only inside the scope (§14.9). |
| File paths | Never built from user input. |

**Output encoding.** Every value goes through `e()` = `htmlspecialchars($v, ENT_QUOTES | ENT_SUBSTITUTE | ENT_HTML5, 'UTF-8')`; attributes are always quoted; URL parts use `rawurlencode`; no user data inside `<script>` or `<style>`; JSON uses `JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT`. E-mail bodies are plain text and only validated addresses go into headers, with CR and LF removed. SQL uses PDO with `ATTR_EMULATE_PREPARES = false`, `ERRMODE_EXCEPTION`, `charset=utf8mb4` in the DSN, strict SQL mode and a UTC session time zone.

**Security headers.** The site's `.htaccess` sends today (VERIFIED-IN-REPO, `site/public/.htaccess`): `X-Content-Type-Options: nosniff`; `X-Frame-Options: SAMEORIGIN`; `Referrer-Policy: strict-origin-when-cross-origin`; `Permissions-Policy: camera=(), microphone=(), geolocation=()`; `Strict-Transport-Security: max-age=31536000; includeSubDomains`; and `Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'self'; form-action 'self'; frame-ancestors 'self'; base-uri 'self'`. The CSP uses `Header set`, not `Header always set`, so it may be missing from error responses. The app keeps these, tightens them, and sets all of them from PHP on every response:

| Header | App value |
|---|---|
| `Content-Security-Policy` | `default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'; object-src 'none'` (app templates use no inline styles, so `'unsafe-inline'` is dropped) |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `same-origin`; `no-referrer` on the magic-link pages |
| `Cache-Control`, `Expires` | `no-store` and an `Expires` date in the past on every app response. The site's `ExpiresByType text/html` rule must not apply, hence `ExpiresActive Off` in the app directory. |
| `X-Robots-Tag` | `noindex, nofollow` |
| `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy` | `same-origin`, `same-origin` |
| HSTS, `X-Content-Type-Options`, `Permissions-Policy` | as the site |

The app directory's `.htaccess` replaces the inherited site CSP so that only one policy arrives. Whether LiteSpeed on this host honours these `.htaccess` directives is UNVERIFIED (checklist A6). Test T-HDR therefore also runs against the host after deployment.

### 14.7 Uploads (phase 2b only, behind every §11 gate)

- Uploads are per document item. A candidate can upload only against an item derived from a verified requirement (§12.3). There is no free upload area.
- Allow-list: PDF, JPEG, PNG. Both checks must pass: the original name ends in `.pdf`, `.jpg`, `.jpeg` or `.png`, **and** `finfo(FILEINFO_MIME_TYPE)` on the content returns `application/pdf`, `image/jpeg` or `image/png` matching that extension. The browser's `Content-Type` is ignored. SVG, HEIC, Office files and archives are refused with a plain explanation.
- Size caps per file and per candidate (§14.5 defaults), within the host limits (H7). Only `is_uploaded_file()` and `move_uploaded_file()` are used.
- Flow: PHP temporary file → checks → `stage2/quarantine/<random>` → re-encode or PDF checks → optional scan → encrypt → `stage2/documents/<2 hex>/<64 hex>` → database row → item state `uploaded`. Any failure deletes the quarantine copy and tells the candidate why.
- Storage names are 32 random bytes in hex, with no extension. The original file name is kept only as sanitised display text and is never used as a path. Files sit outside the web root, are never `include`d, and no PHP handler applies to them.
- Images: dimensions checked with `getimagesize()` before decoding (decode cap, §14.5); EXIF orientation applied; then re-encoded with GD or Imagick (H3). Re-encoding drops EXIF, GPS and other metadata and breaks most polyglot files. The re-encoded file is the one stored, and its SHA-256 is recorded.
- PDFs: must start with `%PDF-`; encrypted PDFs are refused (they cannot be checked); a PDF is refused if, after decoding `#xx` escapes in names, it contains `/JavaScript`, `/JS`, `/Launch`, `/EmbeddedFile`, `/RichMedia`, `/XFA` or `/AA`. This byte-level check is a heuristic, because compressed object streams can hide such names. So reviewers open PDFs only in a browser's built-in viewer, never in a desktop reader with scripting switched on, and the download response carries a sandboxing CSP. Server-side flattening (Ghostscript, qpdf) is probably not available on shared hosting (ASSUMPTION; H3 or H10 would show it).
- Malware scan: only if H10 finds a scanner that can be called per file. Otherwise `scan_status = 'not_available'` is recorded and the gap is put to the owner under §11 gate 2.
- Encryption at rest: each file is encrypted with libsodium `secretstream` under a per-candidate data key, which is itself wrapped by a master key in `stage2/config.php`. Honest limit: the master key is on the same server, so this protects against stray copies, web misconfiguration and backup leaks, not against a full compromise of the hosting account. Destroying a candidate's wrapped key at deletion makes any copy of their files left on the live disk unreadable. It does **not** reach old backups: each nightly backup holds the database dump (with `candidates.data_key_wrapped`) and the master key sealed to the owner's key (§14.11), so a backup taken before the deletion can still decrypt that candidate's files with the owner's offline key until it leaves the rotation window (§14.12). *(Corrected 2026-10-11 in review: an earlier draft said key destruction also made old backups unreadable.)*
- Download: `GET /apply/app/files/<public_id>` → session → scope check (the owning candidate, or an assigned reviewer) → audit row `file.view` → headers `Content-Type` (the stored allow-listed value), `Content-Disposition: attachment; filename="document.<ext>"; filename*=UTF-8''<sanitised name>` (`<ext>` is `pdf`, `jpg` or `png` from the stored type), `X-Content-Type-Options: nosniff`, `Cache-Control: no-store`, `Content-Security-Policy: default-src 'none'; sandbox`, `Cross-Origin-Resource-Policy: same-origin` → decrypting stream.
- While an item is `uploaded` (not yet under review) the candidate may replace their own file. The earlier file is soft-deleted and later removed by the retention job.

### 14.8 Data model (MySQL DDL; draft; not created on any server and not yet run against a database engine)

Rules: InnoDB; `utf8mb4` with `utf8mb4_unicode_ci` (accepted by MySQL 8 and MariaDB); all times UTC in `DATETIME(3)`. Every candidate-owned table carries `candidate_id NOT NULL`, and child tables use a composite foreign key `(parent_id, candidate_id)`, so a row can never point at another candidate's parent. No column holds a readiness score, total or verdict. Reserved words are avoided (`rank`, `condition`, `year`). `CHECK` constraints never use a column that has a cascading foreign key (MySQL refuses that combination). Tables beyond the brief's list (`staff_users`, `staff_recovery_codes`, `reviewer_assignments`, `programmes`, `requirements`, `document_declarations`, `document_state_transitions`, `consent_texts`) are needed for staff MFA, reviewer scope, the link to verified requirements, the Stage-1 have / need answers, the item state machine and consent evidence. The DDL is validated in CI against a MySQL service when the build starts (§14.15).

```sql
-- Stage-2 schema, draft 1, 2026-10-11. DESIGN ONLY: not created on any server.
-- Target: MySQL >= 8.0.16 or MariaDB >= 10.6 (server version UNVERIFIED, §14.2 H4).
-- Each connection: SET NAMES utf8mb4; SET time_zone = '+00:00'; strict sql_mode.

CREATE TABLE candidates (
  id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id         CHAR(32) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,     -- 16 random bytes, hex
  email             VARCHAR(254) NOT NULL,                                       -- trimmed, domain lower-cased
  email_verified_at DATETIME(3) NULL,                                            -- first successful magic link
  password_hash     VARCHAR(255) CHARACTER SET ascii COLLATE ascii_bin NULL,     -- optional, later
  data_key_wrapped  VARBINARY(128) NULL,                                         -- per-candidate file key (2b), wrapped
  status            ENUM('unclaimed','active','locked','deletion_pending') NOT NULL DEFAULT 'active',
  stage1_record_id  CHAR(16) CHARACTER SET ascii COLLATE ascii_bin NULL,         -- imported Stage-1 record (§14.14)
  created_at        DATETIME(3) NOT NULL,
  last_login_at     DATETIME(3) NULL,
  last_activity_at  DATETIME(3) NULL,                                            -- drives the inactivity rule (§14.12)
  PRIMARY KEY (id),
  UNIQUE KEY uq_candidates_public_id (public_id),
  UNIQUE KEY uq_candidates_email (email),
  UNIQUE KEY uq_candidates_stage1 (stage1_record_id),
  KEY ix_candidates_activity (status, last_activity_at),
  CONSTRAINT ck_candidates_argon2id CHECK (password_hash IS NULL OR password_hash LIKE '$argon2id$%')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE staff_users (
  id               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email            VARCHAR(254) NOT NULL,
  display_name     VARCHAR(120) NOT NULL,
  role             ENUM('reviewer','admin') NOT NULL,
  totp_secret_enc  VARBINARY(255) NULL,                 -- libsodium secretbox; key outside the web root
  mfa_enrolled_at  DATETIME(3) NULL,                    -- no candidate data is reachable until this is set
  failed_totp      TINYINT UNSIGNED NOT NULL DEFAULT 0,
  locked_until     DATETIME(3) NULL,
  active           TINYINT(1) NOT NULL DEFAULT 1,
  created_at       DATETIME(3) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_staff_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE staff_recovery_codes (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  staff_id   BIGINT UNSIGNED NOT NULL,
  code_hmac  BINARY(32) NOT NULL,
  used_at    DATETIME(3) NULL,
  PRIMARY KEY (id),
  KEY ix_recovery_staff (staff_id),
  CONSTRAINT fk_recovery_staff FOREIGN KEY (staff_id) REFERENCES staff_users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE login_tokens (
  id               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  selector         CHAR(24) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,   -- 12 random bytes, hex; lookup key
  verifier_hash    BINARY(32) NOT NULL,                                       -- SHA-256 of the 32-byte verifier
  subject_type     ENUM('candidate','staff') NOT NULL,
  email            VARCHAR(254) NOT NULL,                                     -- address the link was sent to
  candidate_id     BIGINT UNSIGNED NULL,                                      -- NULL on a first sign-in
  staff_id         BIGINT UNSIGNED NULL,
  purpose          ENUM('sign_in','change_email') NOT NULL DEFAULT 'sign_in',
  created_at       DATETIME(3) NOT NULL,
  expires_at       DATETIME(3) NOT NULL,                                      -- created_at + 15 minutes
  used_at          DATETIME(3) NULL,                                          -- single use
  invalidated_at   DATETIME(3) NULL,                                          -- superseded by a newer link
  request_ip_hmac  BINARY(32) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_login_tokens_selector (selector),
  KEY ix_login_tokens_email (email, created_at),
  KEY ix_login_tokens_expires (expires_at),
  CONSTRAINT fk_login_tokens_candidate FOREIGN KEY (candidate_id) REFERENCES candidates (id) ON DELETE CASCADE,
  CONSTRAINT fk_login_tokens_staff FOREIGN KEY (staff_id) REFERENCES staff_users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sessions (
  id_hash              BINARY(32) NOT NULL,             -- SHA-256 of the cookie value; the raw id is never stored
  subject_type         ENUM('anonymous','candidate','staff') NOT NULL,
  candidate_id         BIGINT UNSIGNED NULL,
  staff_id             BIGINT UNSIGNED NULL,
  mfa_passed_at        DATETIME(3) NULL,                -- staff only
  csrf_secret          BINARY(32) NOT NULL,
  flash                VARBINARY(2048) NULL,            -- one-time notices only; never profile data or documents
  created_at           DATETIME(3) NOT NULL,
  last_seen_at         DATETIME(3) NOT NULL,            -- idle timeout
  absolute_expires_at  DATETIME(3) NOT NULL,            -- absolute timeout
  ip_hmac              BINARY(32) NULL,
  browser_summary      VARCHAR(80) NULL,                -- shown in "your signed-in sessions"
  PRIMARY KEY (id_hash),
  KEY ix_sessions_candidate (candidate_id),
  KEY ix_sessions_staff (staff_id),
  KEY ix_sessions_expires (absolute_expires_at),
  CONSTRAINT fk_sessions_candidate FOREIGN KEY (candidate_id) REFERENCES candidates (id) ON DELETE CASCADE,
  CONSTRAINT fk_sessions_staff FOREIGN KEY (staff_id) REFERENCES staff_users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE profiles (
  candidate_id             BIGINT UNSIGNED NOT NULL,
  full_name                VARCHAR(120) NOT NULL,
  field_of_study           ENUM('medicine','dentistry','pharmacy','nursing','public_health','physical_therapy',
                                'physical_education','preparatory','other','undecided') NULL,   -- site/src/lib/fields.ts + undecided
  study_level              ENUM('bachelor','master','integrated_master','preparatory','unsure') NULL,   -- §12.1 step 1
  education_level          ENUM('secondary','foundation','diploma','bachelor','master','other') NULL,
  residence_country        VARCHAR(100) NULL,
  nationality              VARCHAR(100) NULL,
  correspondence_language  VARCHAR(60) NULL,
  outstanding_results      TEXT NULL,
  documents_note           VARCHAR(200) NULL,
  questions                TEXT NULL,
  steps_done               SET('plan','education','documents','about') NOT NULL DEFAULT '',
  reminders_paused         TINYINT(1) NOT NULL DEFAULT 0,
  last_reminder_at         DATETIME(3) NULL,
  source                   ENUM('account','stage1_v1','stage1_v2') NOT NULL,
  created_at               DATETIME(3) NOT NULL,
  updated_at               DATETIME(3) NOT NULL,
  PRIMARY KEY (candidate_id),
  CONSTRAINT fk_profiles_candidate FOREIGN KEY (candidate_id) REFERENCES candidates (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE qualifications (
  id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  candidate_id      BIGINT UNSIGNED NOT NULL,
  name              VARCHAR(200) NOT NULL,              -- as typed, e.g. "Secondary School Certificate"
  awarding_country  VARCHAR(100) NULL,
  award_year        SMALLINT UNSIGNED NULL,
  year_status       ENUM('achieved','expected') NULL,
  scale_type        ENUM('percentage','letter','points','gpa','other') NULL,   -- §13
  scale_max         VARCHAR(20) NULL,                   -- as typed; never used to convert grades
  created_at        DATETIME(3) NOT NULL,
  updated_at        DATETIME(3) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_qualifications_owner (id, candidate_id),
  KEY ix_qualifications_candidate (candidate_id),
  CONSTRAINT fk_qualifications_candidate FOREIGN KEY (candidate_id) REFERENCES candidates (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE subjects (
  id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  candidate_id      BIGINT UNSIGNED NOT NULL,
  qualification_id  BIGINT UNSIGNED NOT NULL,
  name              VARCHAR(80) NOT NULL,
  grade_text        VARCHAR(40) NULL,                   -- exactly as typed
  scale_type        ENUM('percentage','letter','points','gpa','other') NULL,   -- defaults to the qualification's scale
  scale_max         VARCHAR(20) NULL,
  result_status     ENUM('achieved','predicted','pending','not_studied') NULL,   -- §13, plus not_studied (§14.14); NULL = not stated (Stage-1 v2 allows an empty status)
  position          TINYINT UNSIGNED NOT NULL,          -- display order
  PRIMARY KEY (id),
  KEY ix_subjects_candidate (candidate_id),
  KEY ix_subjects_qualification (qualification_id, candidate_id),
  CONSTRAINT fk_subjects_candidate FOREIGN KEY (candidate_id) REFERENCES candidates (id) ON DELETE CASCADE,
  CONSTRAINT fk_subjects_qualification FOREIGN KEY (qualification_id, candidate_id)
    REFERENCES qualifications (id, candidate_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Imported from publishable content records only; read-only to the application user.
CREATE TABLE programmes (
  id               VARCHAR(120) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,   -- '<university-slug>/<programme-key>'
  university_slug  VARCHAR(80) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  title_official   VARCHAR(255) NOT NULL,
  field_of_study   ENUM('medicine','dentistry','pharmacy','nursing','public_health','physical_therapy',
                        'physical_education','preparatory','other') NOT NULL,
  study_level      VARCHAR(40) CHARACTER SET ascii NOT NULL,      -- keys of LEVELS in site/src/lib/fields.ts
  language         VARCHAR(60) NOT NULL,
  intake_year      SMALLINT UNSIGNED NULL,
  source_url       VARCHAR(500) NOT NULL,
  checked_on       DATE NOT NULL,
  content_commit   CHAR(40) CHARACTER SET ascii NOT NULL,         -- repository commit the import came from
  imported_at      DATETIME(3) NOT NULL,
  PRIMARY KEY (id),
  KEY ix_programmes_university (university_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE requirements (
  id                VARCHAR(160) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  version           INT UNSIGNED NOT NULL,              -- new version when wording, source or check date changes
  programme_id      VARCHAR(120) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  req_type          ENUM('subject','grade','exam','language','age','document','other') NOT NULL,
  status            ENUM('verified','unverified','not_published','outdated') NOT NULL,
  value_text        TEXT NULL,                          -- verbatim official wording; NULL unless verified or outdated
  condition_expr    VARCHAR(500) NULL,                  -- §13: evaluated against the profile
  format_note       TEXT NULL,                          -- §13: quoted from the official page
  exam_format_text  TEXT NULL,                          -- §13
  intake_year       SMALLINT UNSIGNED NULL,
  source_url        VARCHAR(500) NULL,
  checked_on        DATE NULL,
  PRIMARY KEY (id, version),
  KEY ix_requirements_programme (programme_id, status),
  CONSTRAINT fk_requirements_programme FOREIGN KEY (programme_id) REFERENCES programmes (id),
  CONSTRAINT ck_requirements_unverified_value_hidden CHECK (status IN ('verified','outdated') OR value_text IS NULL),
  CONSTRAINT ck_requirements_verified_sourced CHECK (status <> 'verified' OR (source_url IS NOT NULL AND checked_on IS NOT NULL))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE programme_choices (
  id                            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id                     CHAR(32) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  candidate_id                  BIGINT UNSIGNED NOT NULL,
  preference                    TINYINT UNSIGNED NOT NULL,                 -- 1 to 3 (§12.1: up to three universities)
  programme_id                  VARCHAR(120) CHARACTER SET ascii COLLATE ascii_bin NULL,   -- set only for a verified programme
  university_slug               VARCHAR(80) CHARACTER SET ascii COLLATE ascii_bin NULL,    -- as chosen; 'unlisted' allowed
  university_other              VARCHAR(200) NULL,
  intake_year                   SMALLINT UNSIGNED NULL,
  intake_text                   VARCHAR(20) NULL,                          -- 'later' or 'not_sure' when no year
  application_state             ENUM('enquiry','draft','submitted_to_uma','official_submitted','closed') NOT NULL DEFAULT 'draft',
  official_receipt_ref          VARCHAR(120) NULL,                         -- state 4 only (§1)
  official_receipt_recorded_at  DATETIME(3) NULL,
  official_receipt_recorded_by  BIGINT UNSIGNED NULL,                      -- staff member; enforced in code and by T-STATE
  created_at                    DATETIME(3) NOT NULL,
  updated_at                    DATETIME(3) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_choices_public_id (public_id),
  UNIQUE KEY uq_choices_owner (id, candidate_id),
  UNIQUE KEY uq_choices_preference (candidate_id, preference),
  KEY ix_choices_programme (programme_id),
  KEY ix_choices_state (application_state),
  CONSTRAINT fk_choices_candidate FOREIGN KEY (candidate_id) REFERENCES candidates (id) ON DELETE CASCADE,
  CONSTRAINT fk_choices_programme FOREIGN KEY (programme_id) REFERENCES programmes (id),
  CONSTRAINT fk_choices_receipt_staff FOREIGN KEY (official_receipt_recorded_by) REFERENCES staff_users (id),
  CONSTRAINT ck_choices_preference CHECK (preference BETWEEN 1 AND 3),
  CONSTRAINT ck_choices_state4_needs_receipt CHECK (application_state <> 'official_submitted'
    OR (official_receipt_ref IS NOT NULL AND official_receipt_recorded_at IS NOT NULL))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- One row per requirement per comparison run. Deliberately no score, total, percentage or verdict column.
-- Rules (§8.2, §12.2, §13): only a 'verified' requirement can give 'met', 'not_met' or 'pending_evidence';
-- every other status gives 'unknown'; type 'exam' stays 'pending_evidence' until a result exists;
-- grades are compared only when a verified minimum uses a compatible scale, otherwise 'unknown'.
CREATE TABLE readiness_results (
  id                   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  candidate_id         BIGINT UNSIGNED NOT NULL,
  programme_choice_id  BIGINT UNSIGNED NOT NULL,
  run_id               CHAR(32) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  requirement_id       VARCHAR(160) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  requirement_version  INT UNSIGNED NOT NULL,
  result               ENUM('met','not_met','unknown','pending_evidence') NOT NULL,
  reason_code          ENUM('matches_verified','does_not_match_verified','requirement_unverified',
                            'requirement_not_published','candidate_data_missing','scale_not_comparable',
                            'no_verified_minimum','result_pending','evidence_needed','exam_result_awaited') NOT NULL,
  generated_at         DATETIME(3) NOT NULL,
  PRIMARY KEY (id),
  KEY ix_readiness_run (candidate_id, programme_choice_id, run_id),
  CONSTRAINT fk_readiness_candidate FOREIGN KEY (candidate_id) REFERENCES candidates (id) ON DELETE CASCADE,
  CONSTRAINT fk_readiness_choice FOREIGN KEY (programme_choice_id, candidate_id)
    REFERENCES programme_choices (id, candidate_id) ON DELETE CASCADE,
  CONSTRAINT fk_readiness_requirement FOREIGN KEY (requirement_id, requirement_version)
    REFERENCES requirements (id, version)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- The candidate's own have / need / not sure answers (§12.1 step 3). Never changes a document item's state.
CREATE TABLE document_declarations (
  candidate_id  BIGINT UNSIGNED NOT NULL,
  doc_type      ENUM('certificate','transcript','passport','photographs','birth_certificate','medical_certificate',
                     'translations','legalisation','language_certificate','other') NOT NULL,
  state         ENUM('have','need','not_sure') NOT NULL,
  updated_at    DATETIME(3) NOT NULL,
  PRIMARY KEY (candidate_id, doc_type),
  CONSTRAINT fk_declarations_candidate FOREIGN KEY (candidate_id) REFERENCES candidates (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE document_items (
  id                   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id            CHAR(32) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  candidate_id         BIGINT UNSIGNED NOT NULL,
  programme_choice_id  BIGINT UNSIGNED NOT NULL,
  requirement_id       VARCHAR(160) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,   -- a verified 'document' requirement
  requirement_version  INT UNSIGNED NOT NULL,
  state                ENUM('not_requested','required','outstanding','uploaded','under_review',
                            'accepted_for_processing','replacement_requested') NOT NULL DEFAULT 'required',
  reason_code          ENUM('illegible','wrong_document','expired','missing_pages','translation_needed',
                            'requirement_withdrawn','programme_changed') NULL,
  note_to_candidate    VARCHAR(1000) NULL,                 -- templated text plus an optional reviewer sentence
  state_changed_at     DATETIME(3) NOT NULL,
  state_changed_by     ENUM('candidate','staff','system') NOT NULL,
  state_changed_by_id  BIGINT UNSIGNED NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_items_public_id (public_id),
  UNIQUE KEY uq_items_owner (id, candidate_id),
  UNIQUE KEY uq_items_choice_requirement (programme_choice_id, requirement_id),
  KEY ix_items_candidate_state (candidate_id, state),
  KEY ix_items_queue (state, state_changed_at),          -- reviewer queue
  CONSTRAINT fk_items_candidate FOREIGN KEY (candidate_id) REFERENCES candidates (id) ON DELETE CASCADE,
  CONSTRAINT fk_items_choice FOREIGN KEY (programme_choice_id, candidate_id)
    REFERENCES programme_choices (id, candidate_id) ON DELETE CASCADE,
  CONSTRAINT fk_items_requirement FOREIGN KEY (requirement_id, requirement_version)
    REFERENCES requirements (id, version)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- The only moves the state machine allows (§8.3, §12.3). Anything not listed is refused and logged.
CREATE TABLE document_state_transitions (
  from_state  ENUM('not_requested','required','outstanding','uploaded','under_review',
                   'accepted_for_processing','replacement_requested') NOT NULL,
  to_state    ENUM('not_requested','required','outstanding','uploaded','under_review',
                   'accepted_for_processing','replacement_requested') NOT NULL,
  actor       ENUM('candidate','staff','system') NOT NULL,
  PRIMARY KEY (from_state, to_state, actor)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO document_state_transitions (from_state, to_state, actor) VALUES
  ('not_requested',           'required',                'system'),     -- requirement applies again
  ('required',                'outstanding',             'system'),     -- item shown on the candidate's checklist
  ('outstanding',             'uploaded',                'candidate'),  -- file passed the upload checks (2b)
  ('uploaded',                'under_review',            'staff'),      -- reviewer opens it (audited)
  ('under_review',            'accepted_for_processing', 'staff'),      -- complete and legible for OUR review only
  ('under_review',            'replacement_requested',   'staff'),      -- templated reason chosen
  ('replacement_requested',   'outstanding',             'system'),     -- e-mail with the reason queued; note stays visible
  ('required',                'not_requested',           'system'),     -- requirement withdrawn, programme or intake changed
  ('outstanding',             'not_requested',           'system'),
  ('uploaded',                'not_requested',           'system'),
  ('under_review',            'not_requested',           'system'),
  ('accepted_for_processing', 'not_requested',           'system'),
  ('replacement_requested',   'not_requested',           'system');

CREATE TABLE document_files (
  id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id         CHAR(32) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  candidate_id      BIGINT UNSIGNED NOT NULL,
  document_item_id  BIGINT UNSIGNED NOT NULL,
  storage_name      CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,     -- 32 random bytes, hex, no extension
  display_name      VARCHAR(255) NOT NULL,                                       -- sanitised original name; never a path
  mime              ENUM('application/pdf','image/jpeg','image/png') NOT NULL,   -- from finfo, not from the browser
  size_bytes        INT UNSIGNED NOT NULL,
  sha256            BINARY(32) NOT NULL,                                         -- of the stored (re-encoded) content
  reencoded         TINYINT(1) NOT NULL,
  scan_status       ENUM('not_available','clean') NOT NULL,                      -- a file that fails a scan is never stored
  encryption        ENUM('sodium_secretstream_v1') NOT NULL,
  uploaded_at       DATETIME(3) NOT NULL,
  deleted_at        DATETIME(3) NULL,                                            -- soft delete; retention job removes the file
  PRIMARY KEY (id),
  UNIQUE KEY uq_files_public_id (public_id),
  UNIQUE KEY uq_files_storage_name (storage_name),
  KEY ix_files_item (document_item_id, candidate_id),
  KEY ix_files_candidate (candidate_id),
  CONSTRAINT fk_files_candidate FOREIGN KEY (candidate_id) REFERENCES candidates (id) ON DELETE CASCADE,
  CONSTRAINT fk_files_item FOREIGN KEY (document_item_id, candidate_id)
    REFERENCES document_items (id, candidate_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE reviewer_assignments (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  staff_id      BIGINT UNSIGNED NOT NULL,
  candidate_id  BIGINT UNSIGNED NOT NULL,
  assigned_by   BIGINT UNSIGNED NOT NULL,
  assigned_at   DATETIME(3) NOT NULL,
  ended_at      DATETIME(3) NULL,
  PRIMARY KEY (id),
  KEY ix_assign_staff_open (staff_id, ended_at),
  KEY ix_assign_candidate (candidate_id),
  CONSTRAINT fk_assign_staff FOREIGN KEY (staff_id) REFERENCES staff_users (id),
  CONSTRAINT fk_assign_candidate FOREIGN KEY (candidate_id) REFERENCES candidates (id) ON DELETE CASCADE,
  CONSTRAINT fk_assign_by FOREIGN KEY (assigned_by) REFERENCES staff_users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Append-only: the application's database user gets INSERT and SELECT only (if H4 allows per-table grants).
CREATE TABLE audit_log (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  at            DATETIME(3) NOT NULL,
  request_id    CHAR(16) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  actor_type    ENUM('candidate','staff','system') NOT NULL,
  actor_id      BIGINT UNSIGNED NULL,
  action        VARCHAR(60) CHARACTER SET ascii NOT NULL,    -- e.g. sign_in.success, profile.update, file.view, item.transition
  object_type   VARCHAR(40) CHARACTER SET ascii NOT NULL,
  object_ref    VARCHAR(64) CHARACTER SET ascii NULL,        -- a public_id; never a file name
  candidate_id  BIGINT UNSIGNED NULL,                        -- whose data; no foreign key, so the trail survives deletion
  detail        JSON NULL,                                   -- field NAMES and from/to states only; never values or contents
  ip_hmac       BINARY(32) NULL,
  PRIMARY KEY (id),
  KEY ix_audit_candidate (candidate_id, at),
  KEY ix_audit_actor (actor_type, actor_id, at),
  KEY ix_audit_at (at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE rate_limits (
  action        ENUM('link_request_email','link_request_ip','link_confirm_ip','form_post_account','form_post_ip',
                     'upload_account','upload_ip','staff_sign_in_ip') NOT NULL,
  bucket        BINARY(32) NOT NULL,                  -- HMAC-SHA256 of the IP address, e-mail or account id
  window_start  DATETIME NOT NULL,
  hits          INT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (action, bucket, window_start),
  KEY ix_rate_window (window_start)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE consent_texts (
  purpose       ENUM('stage1_enquiry','account_and_profile','reminder_emails','document_processing','readiness_review') NOT NULL,
  version       VARCHAR(20) CHARACTER SET ascii NOT NULL,
  text_sha256   BINARY(32) NOT NULL,
  body          TEXT NOT NULL,                        -- the exact wording shown to the candidate
  published_at  DATETIME(3) NOT NULL,
  PRIMARY KEY (purpose, version)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE consents (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  candidate_id  BIGINT UNSIGNED NOT NULL,
  purpose       ENUM('stage1_enquiry','account_and_profile','reminder_emails','document_processing','readiness_review') NOT NULL,
  version       VARCHAR(20) CHARACTER SET ascii NOT NULL,
  text_sha256   BINARY(32) NOT NULL,                  -- copied at the moment of consent
  given_at      DATETIME(3) NOT NULL,
  withdrawn_at  DATETIME(3) NULL,
  source        ENUM('account','stage1_import') NOT NULL,
  ip_hmac       BINARY(32) NULL,
  PRIMARY KEY (id),
  KEY ix_consents_candidate (candidate_id, purpose),
  KEY ix_consents_text (purpose, version),
  CONSTRAINT fk_consents_candidate FOREIGN KEY (candidate_id) REFERENCES candidates (id) ON DELETE CASCADE,
  CONSTRAINT fk_consents_text FOREIGN KEY (purpose, version) REFERENCES consent_texts (purpose, version)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE deletion_requests (
  id                   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  candidate_id         BIGINT UNSIGNED NULL,          -- becomes NULL when the account is deleted
  email_hmac           BINARY(32) NOT NULL,           -- proof the request was honoured, without keeping the address
  scope                ENUM('account','documents_only') NOT NULL,
  requested_at         DATETIME(3) NOT NULL,
  identity_checked_at  DATETIME(3) NULL,              -- signed-in request, or a magic link to the address
  due_by               DATE NOT NULL,                 -- statutory period, as confirmed by the owner's legal review
  completed_at         DATETIME(3) NULL,
  completed_by_type    ENUM('staff','system') NULL,
  completed_by_id      BIGINT UNSIGNED NULL,
  retained_note        VARCHAR(500) NULL,             -- anything kept under a legal duty, with the reason
  PRIMARY KEY (id),
  KEY ix_deletion_open (completed_at, due_by),
  CONSTRAINT fk_deletion_candidate FOREIGN KEY (candidate_id) REFERENCES candidates (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Least privilege (two database users; per-table grants depend on H4):
--   uma_app    SELECT, INSERT, UPDATE, DELETE on candidate data; INSERT, SELECT on audit_log;
--              SELECT only on programmes, requirements, consent_texts, document_state_transitions.
--   uma_maint  migrations, requirement import and retention purges (incl. audit_log); used by CLI and cron only.
-- If hPanel only offers all-privileges users, append-only behaviour is enforced in code and proved by T-AUDIT.
```

**Document item rules in words.** Items are created as `required` from verified `document` requirements when a candidate chooses a programme, and move to `outstanding` when shown. In 2a nothing moves past `outstanding`; the candidate's own have / need answer is shown beside the item but does not change its state. `accepted_for_processing` always carries the label "Accepted for our review. This is not confirmation of authenticity or acceptance by the university." (§12.3). Changing field, level, university or intake re-runs the readiness comparison and re-derives the checklist; completed items stay; items no longer required move to `not_requested` with a visible note; nothing is deleted (§13).

### 14.9 Authorisation

- **Candidate scope.** A `CandidateScope` object is built only from the session. Every repository method on candidate-owned data takes it and adds `candidate_id = ?` to the query, for example `SELECT … FROM document_items WHERE public_id = ? AND candidate_id = ?`. No method accepts a candidate id from the request.
- **Responses.** On routes carrying an id, "does not exist" and "not yours" both return **403** with the same body (§11 wording), and write `authz.denied` to the audit log.
- **Reviewer scope.** The set of candidate ids with an open row in `reviewer_assignments`. A reviewer sees the profile, choices, readiness results, items and files of assigned candidates only, and can perform the `staff` transitions in §14.8. A reviewer cannot export, delete, manage staff or record a state-4 receipt.
- **Admin.** Manages staff and assignments, records state-4 receipts (§1), and handles deletion and export requests. Every admin read of candidate data is audited like a reviewer's.
- **Separation.** Candidate sessions on staff routes → 403. Staff sessions without MFA → sent to the MFA step; data routes → 403. Staff and candidate accounts are separate tables; one e-mail address may not hold both.
- **Automated proof.** T-AUTHZ (§14.15): two synthetic candidates and two reviewers; every id-bearing route is called across accounts and must return 403 with no data and no change. A static test fails CI if a repository query touches a candidate-owned table without `candidate_id` in its `WHERE` clause (exceptions listed and reviewed).

### 14.10 Logging and audit

- **Audit trail (`audit_log`)** records who did what to whose data, and when: sign-in success and failure (failures without revealing whether an account exists), sign out everywhere, profile updates (field names only), choices added or removed, readiness runs, every document item transition with its reason code, uploads, every file view or download by anyone, file deletions, exports generated and downloaded, consent given or withdrawn, deletion requests and their completion, staff MFA enrolment and lock-outs, assignment changes and every `authz.denied`.
- **Never logged:** document contents, file names, field values, grades, messages, tokens, session ids, passwords, TOTP codes. E-mail addresses appear in application logs only masked (first character and domain).
- **Application log** (`stage2/logs/`, monthly files, mode 0600): errors and warnings with the request id; PHP `display_errors` off and `log_errors` on.
- **Access:** admins read the audit trail through a staff screen (2b) or over SSH. RECOMMENDATION for 2b: candidates see "who has viewed my documents and when".
- **Retention** of the audit trail and application logs: TO BE CONFIRMED by the owner (§14.12).

### 14.11 Backups and restore

- **What:** the database, and the encrypted document store (2b). Code and configuration templates are in Git; `stage2/config.php` is backed up separately by the owner (it holds the keys).
- **Nightly job (cron, H5):** `bin/backup` dumps the database (`mysqldump` if the host provides it, otherwise a PDO-based dump; UNVERIFIED which), compresses it, and encrypts it with libsodium: a fresh random file key encrypts the dump (`secretstream`), and that file key is sealed with the owner's **public** key (`crypto_box_seal`). The matching private key is held offline by the owner and never stored on the server. A stolen backup is therefore unreadable without the offline key. New document files are copied in their already-encrypted form, with a manifest (storage name, SHA-256) and the master key sealed to the same public key.
- **Separate location:** a place the owner controls that is not this hosting account, for example the owner's own computer pulling the files over SFTP (SSH Access is ACTIVE, assessment §1). Owner decision; no purchase is assumed. Hostinger's own backups (hPanel → Files → Backups) are useful but are on the same provider, so they do not count as the separate copy.
- **Rotation:** a rolling window of nightly copies; length TO BE CONFIRMED (it decides how long deleted data survives in backups, §14.12).
- **Deletions after a restore:** a backup taken before a deletion brings the deleted candidate back. So, before the app reopens after any restore, every deletion request completed after that backup was taken is applied again (matched on `deletion_requests.email_hmac`, from the newest copy of that table available), and the restore log lists them.
- **Restore rehearsal:** before go-live and then quarterly (§3), on a local or CI environment with **synthetic data only**: decrypt with the offline key, load into an empty database, check row counts against the manifest, check each file's SHA-256 against `document_files.sha256`, re-apply a synthetic deletion completed after the backup and confirm it is gone, sign in as a synthetic candidate and open a file. The rehearsal log (date, who, time taken, result, problems) is kept beside checklist §C.

### 14.12 Retention, deletion, export and data minimisation

Periods come from §3 and the draft privacy notice (`site/src/pages/privacy/index.astro`, VERIFIED-IN-REPO: "Enquiries: up to 12 months after our last contact. Application records and documents: for the duration of the application process and a limited period afterwards … [Exact periods to be confirmed.]"). Nothing below is final until the owner confirms it and the privacy notice says the same.

| Data | Rule | Basis | Status |
|---|---|---|---|
| Stage-1 enquiry JSON | Deleted 12 months after our last contact | Privacy notice | Period in the draft notice; owner to confirm |
| Unclaimed Stage-1 imports (§14.14) | Deleted when the enquiry period above ends | Follows the enquiry rule | TO BE CONFIRMED |
| Stage-2 profile with no sign-in or change | Warning e-mail after 12 months of inactivity; deleted if still inactive after a notice period | §3, §8.4 | Notice period TO BE CONFIRMED |
| Documents of a closed application | Deleted after a period the owner sets (§3 gives "e.g. 6 months" only as an example) | §3 | TO BE CONFIRMED |
| Application metadata after closure | Kept for a limited period for accountability, then deleted | Privacy notice | TO BE CONFIRMED |
| Login links, sessions, rate-limit rows, exports | Purged daily after expiry | Design | RECOMMENDATION |
| Audit trail and application logs | Kept for a fixed period, then purged by `uma_maint` | Design | TO BE CONFIRMED |
| Backups | Rolling window (§14.11). Deleted data stays in the backups taken before the deletion, readable only with the owner's offline key, and disappears when the last of those backups leaves the window. The privacy notice must say so. Destroying a candidate's key at deletion does not change this, because each backup also holds the wrapped key and the sealed master key (§14.7) | Design | Window TO BE CONFIRMED |
| Deletion requests | The request row (address kept only as an HMAC) is kept as proof that deletion happened | Design | Period TO BE CONFIRMED |

**Deletion on request:** the candidate asks in the account (or by e-mail, after which we send a magic link to the address to confirm it is theirs) → `deletion_requests` row with `due_by` → account set to `deletion_pending` and every session ended → job deletes the files and destroys the candidate's wrapped key → database rows deleted (cascades in §14.8) → confirmation e-mail → `completed_at` set. Anything kept under a legal duty is listed in `retained_note` with the reason. On shared hosting a deleted file cannot be guaranteed to be physically erased from disk; destroying the key is what makes any copy left on the live disk unreadable. Copies inside backups taken before the deletion remain until they leave the rotation window (§14.11, table above).

**Export on request:** a JSON file of every stored field plus the candidate's files (as a zip if H3 has `zip`, otherwise separate downloads), generated on request, available for a short time, every step audited.

**Data minimisation:**

- No passport number, passport scan, date of birth, phone number or messaging-app handle at profile stage. A date of birth is asked only if a **verified** `age` requirement applies to the chosen programme, and then only to compare with it.
- Documents only in 2b, and only those a verified requirement asks for (uploads are per item).
- IP addresses only as keyed HMACs; no analytics or third-party resources in the app.
- Whether candidates under 18 may hold an account, and on what basis, is an open legal question (EXECUTIVE_REPORT §K.8 escalation). Until the owner's legal review answers it, the design collects no age data and the owner decides the rule.

### 14.13 Threat model (STRIDE)

| # | Category | Threat | Mitigation | Test that proves it (§14.15) |
|---|---|---|---|---|
| S1 | Spoofing | Someone uses an intercepted or old magic link | 15-minute expiry; single use; hash-only storage; bound to the address; a new link invalidates older ones; consumed only by POST | T-AUTH-2 to T-AUTH-6 |
| S2 | Spoofing | Session hijack or fixation | `__Host-` cookie with `Secure`, `HttpOnly`, `SameSite=Lax`; new id at sign-in and MFA; idle and absolute timeouts; no ids in URLs | T-SESS-1 to T-SESS-5 |
| S3 | Spoofing | Staff account taken over through its mailbox | Mandatory TOTP after the magic link; lock-out after repeated wrong codes; admin alert | T-MFA-1 to T-MFA-4 |
| S4 | Spoofing | Phishing e-mails sent in our name | SPF, DKIM and DMARC for the sending domain; e-mails never ask for documents or payment | Owner action H6; header check on a received synthetic message |
| T1 | Tampering | Cross-site request forgery | Synchroniser token on every POST; `Origin` check; `SameSite=Lax` | T-CSRF-1 to T-CSRF-3 |
| T2 | Tampering | SQL injection | PDO prepared statements, emulation off; no string-built SQL | T-INPUT-4 (payload corpus stored verbatim, no error); static check |
| T3 | Tampering | Extra or forged form fields (for example a posted `candidate_id` or `application_state`) | Per-form allow-lists; states change only through the state-machine service | T-INPUT-2; T-STATE-1 to T-STATE-4 |
| T4 | Tampering | Malicious upload (script disguised as an image, polyglot, oversized image) | Extension and `finfo` allow-list; pixel cap; re-encoding; random names without extensions outside the web root; never executed | T-UPL-1 to T-UPL-8 |
| T5 | Tampering | Stored cross-site scripting through profile text shown to reviewers | Output encoding everywhere; CSP without inline scripts or styles | T-XSS-1, T-HDR-1 |
| R1 | Repudiation | A candidate disputes consent; a staff member denies viewing or changing something | `consent_texts` and `consents` with version and text hash; append-only `audit_log` for every view and change | T-CONS-1, T-AUDIT-1 to T-AUDIT-3 |
| I1 | Information disclosure | One candidate reads another's data by changing an id | Scope from the session in every query; random public ids; 403 | T-AUTHZ-1 to T-AUTHZ-4 |
| I2 | Information disclosure | Stored files, config or backups fetched over the web | All outside the web root; app `.htaccess` denies other PHP files; site `.htaccess` blocks dotfiles, `.json`, `.sql`, `.log`, `.bak` | T-IDX-2 on the host; checklist A8 |
| I3 | Information disclosure | Token leaks through the `Referer` header, browser history or cache | `no-referrer` and `no-store` on link pages; the token leaves the URL after the POST | T-AUTH-7 |
| I4 | Information disclosure | Errors or logs expose personal data | `display_errors` off; generic error pages; logging rules in §14.10 | T-LOG-1, T-LOG-2 |
| I5 | Information disclosure | Account enumeration through the sign-in form | Identical response whether or not an account exists | T-AUTH-1 |
| I6 | Information disclosure | Backup copy stolen | Encrypted to the owner's offline public key | T-BKP-1; restore rehearsal |
| I7 | Information disclosure | A cache serves one candidate's page to another | `Cache-Control: no-store`; past `Expires`; Cache Manager check | T-HDR-2; owner check H9 |
| D1 | Denial of service | Flood of sign-in links (mail bombing a victim, using up the mail quota) | Per-address and per-IP limits; 429 with no e-mail sent | T-RATE-1, T-RATE-2 |
| D2 | Denial of service | Disk filled by uploads | Per-file and per-candidate caps; host limits | T-UPL-5, T-UPL-6 |
| D3 | Denial of service | Bulk form posts or fake sign-ups | Rate limits; honeypot and minimum-time check on public forms | T-RATE-3, T-ABUSE-1 |
| E1 | Elevation of privilege | A candidate reaches staff pages | Role checks in middleware; separate staff table | T-AUTHZ-5 |
| E2 | Elevation of privilege | A reviewer reaches unassigned candidates or admin functions | Assignment scope; admin-only routes | T-AUTHZ-6, T-AUTHZ-7 |
| E3 | Elevation of privilege | Code execution through an upload or a dynamic include | No include path from input; uploads never in an executable location | Static check for variable `include`/`require`; T-UPL-1 |
| E4 | Elevation of privilege | A vulnerable dependency | Few dependencies, pinned; `composer audit` in CI | CI step (§14.15) |

### 14.14 Migration from Stage-1 JSON records

**Sources.** Files in `uma-private/enquiries/*.json`, one per submission.

- **Version 1** (VERIFIED-IN-REPO: `site/public/api/enquiry.php` at `50376e3`): no `version` key. Keys `id` (16 hex characters), `type` (`enquiry` or `application-start`), `stage` (always `enquiry`), `received`, `name`, `email`, `country` (the form labels it "Country of your school-leaving certificate"), `course` (a course slug: `medicine`, `dentistry`, `nursing` or `pharmacy` from `site/src/lib/courses.ts`), `university` (a directory slug or `unlisted`), `startYear`, `qualification`, `message`, `consent`, `consentText`, `ip_hash`.
- **Version 2**: `"version": 2` plus a nested `profile` object produced by the Stage-1 stepped form. The field names and enumerations below were checked in review on 2026-10-11 against the handler committed on branch `wip/apply` at `6a35310` (not merged into this branch; `site/public/api/enquiry.php` here is still version 1). They must be re-checked against the merged handler before the importer is written.

**Rules.**

- Only `type = application-start` records are imported. Contact-page enquiries stay as JSON until their retention period ends (§14.12).
- A record whose `stage` is not `enquiry`, or whose JSON does not parse, is skipped and listed in the report by record id.
- Every value passes the Stage-2 validators (§14.6). A value outside an allow-list is dropped and the field name is reported; it is never stored as typed. Grades are never converted.
- Imported people become `candidates` with `status = 'unclaimed'`, `email_verified_at = NULL`, `profiles.source = 'stage1_v1'` or `'stage1_v2'`, and programme choices in state `enquiry`. Nobody can sign in to an unclaimed profile until they request a magic link to the same address **and** accept the Stage-2 consent; only then does the account become `active`.
- Consent: the Stage-1 `consentText` is stored as a `consent_texts` row (purpose `stage1_enquiry`) and a `consents` row with `source = 'stage1_import'` and the record's `received` time. Stage-1 records keep a short summary sentence, not the full checkbox wording; the full wording shown at the time is recovered from the form's Git history for that date. A Stage-1 consent never counts as Stage-2 consent.
- Whether Stage-1 enquirers may be e-mailed an invitation to claim their profile depends on the purpose they agreed to. That is an owner and legal decision; until it is made, nobody is invited and unclaimed imports are deleted when the enquiry period ends.
- Duplicate addresses: one candidate per address; the newest record fills only empty fields; conflicts are listed in the report.
- `ip_hash` is not imported (it served abuse control at Stage 1).
- Tool: `php uma-app/bin/import-stage1.php --dry-run | --commit`, run over SSH, one database transaction per record, idempotent through the unique `candidates.stage1_record_id`. The report lists counts by version and skipped record ids with reasons, and holds no other personal data. It runs first on a synthetic fixture set (`@example.invalid`) in CI (T-MIG).

**Mapping.**

| Stage-1 key | v1 | v2 | Stage-2 target |
|---|---|---|---|
| `id` | yes | yes | `candidates.stage1_record_id` |
| `received` | yes | yes | `candidates.created_at`; `consents.given_at` |
| `name` / `profile.contact.name` | yes | yes | `profiles.full_name` |
| `email` / `profile.contact.email` | yes | yes | `candidates.email` (normalised) |
| `course` / `profile.intent.field` | slug | field key | `profiles.field_of_study` (v1 slugs map one-to-one; anything else dropped) |
| `profile.intent.level` | – | yes | `profiles.study_level` |
| `university` / `profile.intent.universities[0..2]` | one slug | up to three | `programme_choices` with `preference` 1–3, `university_slug`, `programme_id = NULL` (only a verified programme may be linked later) |
| `profile.intent.university_other` | – | yes | `programme_choices.university_other` on the `unlisted` choice |
| `startYear` / `profile.intent.intake` | year or empty | year or `later` | `programme_choices.intake_year`, or `intake_text = 'later'` |
| `qualification` / `profile.education.qualification` | yes | yes | `qualifications.name` |
| `country` / `profile.education.awarding_country` | yes | yes | `qualifications.awarding_country` |
| `profile.education.year`, `.year_status` | – | yes | `qualifications.award_year`, `.year_status` |
| `profile.education.scale_type`, `.scale_max` | – | yes | `qualifications.scale_type`, `.scale_max`, copied to each subject row |
| `profile.education.subjects[]` (`name`, `grade`, `result_status`) | – | yes | `subjects` rows; `result_status` may be `not_studied`, which is why §14.8 allows it alongside the §13 values |
| `profile.education.level` | – | yes | `profiles.education_level` |
| `profile.education.outstanding` | – | yes | `profiles.outstanding_results` |
| `profile.documents[]` (`type`, `state`) | – | yes | `document_declarations` |
| `profile.documents_note` | – | yes | `profiles.documents_note` |
| `profile.contact.residence`, `.nationality`, `.language` | – | yes | `profiles.residence_country`, `.nationality`, `.correspondence_language` |
| `message` / `profile.contact.questions` | yes | yes | `profiles.questions` |
| `consent`, `consentText` | yes | yes | `consent_texts` + `consents` (`stage1_import`) |
| `type`, `stage` | yes | yes | filters only |
| `ip_hash` | yes | yes | not imported |

### 14.15 Test plan, and how each §11 gate is proved

All tests use synthetic data (`@example.invalid`), an injected clock and a captured mail transport (nothing is sent). They run locally and in CI against a MySQL service; the DDL in §14.8 is applied by the migration runner as the first step, which is also its syntax check. Planned CI steps when the build starts (the orchestrator wires them; nothing is added now): `php -l` over `app/`, migrations, PHPUnit, `composer audit`, and the static checks named below.

| Id | What it asserts |
|---|---|
| T-AUTH-1 | The sign-in request answers identically (status and body) for a known and an unknown address. |
| T-AUTH-2 | Only the selector and `sha256(verifier)` are stored; the verifier appears in no table and no log. |
| T-AUTH-3 | A link used 15 minutes and 1 second after issue is refused. |
| T-AUTH-4 | A used link is refused on a second POST. |
| T-AUTH-5 | A link is refused after the account's address changes; a newer link invalidates an older one. |
| T-AUTH-6 | A GET of the link page (as a mail scanner does) does not consume the token; the page names the address being signed in to. |
| T-AUTH-7 | Link pages send `Referrer-Policy: no-referrer` and `Cache-Control: no-store`; the final URL after the POST holds no token. |
| T-AUTH-8 | Static check: token and CSRF comparisons use `hash_equals`. |
| T-SESS-1 | Cookie is `__Host-uma_s` with `Secure`, `HttpOnly`, `SameSite=Lax`, `Path=/`, no `Domain`. |
| T-SESS-2 | The session id changes at sign-in and at MFA; the old id no longer works. |
| T-SESS-3 / 4 | Idle and absolute timeouts are enforced. |
| T-SESS-5 | "Sign out everywhere" ends every session of the account and voids unused links. |
| T-MFA-1 | A staff session without TOTP reaches no candidate data. |
| T-MFA-2 | Repeated wrong codes lock the staff account and alert the admin. |
| T-MFA-3 | A recovery code works once only. |
| T-MFA-4 | No TOTP secret is stored in plain text. |
| T-PWD-1 to 3 | Only when passwords are switched on: stored hashes start with `$argon2id$` (and the database refuses others); rehash when parameters change; password sign-in is rate-limited. |
| T-CSRF-1 | Every POST route in the route table refuses a missing token with 403 and changes nothing. |
| T-CSRF-2 | A token from another session is refused. |
| T-CSRF-3 | A POST with a foreign `Origin` is refused. |
| T-RATE-1 / 2 | Sign-in links over the per-address or per-IP limit → 429 and no e-mail captured. |
| T-RATE-3 | Form posts and uploads over their limits → 429; old rows are purged. |
| T-ABUSE-1 | A filled honeypot or a too-fast submission on a public form is not stored and gets the normal response. |
| T-INPUT-1 | Unknown enumeration values are refused with a message. |
| T-INPUT-2 | Extra fields (`candidate_id`, `application_state`, `state`) are ignored. |
| T-INPUT-3 | Arrays for strings, invalid UTF-8, control characters and over-length values are handled as §14.6 says. |
| T-INPUT-4 | An SQL-injection corpus is stored verbatim with no database error. |
| T-INPUT-5 | Grades are stored exactly as typed. |
| T-XSS-1 | A script-injection corpus in every text field is shown escaped in candidate and staff views. |
| T-HDR-1 | Every route, including 403, 404, 429, 500 and downloads, sends the §14.6 headers, with exactly one CSP. |
| T-HDR-2 | Every app response has `Cache-Control: no-store`, a past `Expires` and `X-Robots-Tag: noindex, nofollow`. |
| T-HDR-3 | T-HDR-1 and T-HDR-2 repeated against the host after deployment, by an owner-run script. |
| T-AUTHZ-1 to 3 | Candidate B calling candidate A's profile, choices, readiness, items and files by id, by GET or POST → 403, no data, no change. |
| T-AUTHZ-4 | An id that does not exist returns the same 403 body. |
| T-AUTHZ-5 | A candidate session on any staff route → 403. |
| T-AUTHZ-6 | A reviewer assigned to A, on B's data → 403. |
| T-AUTHZ-7 | A reviewer on admin routes (staff, export, deletion, state-4 receipt) → 403. |
| T-AUTHZ-8 | Static check: every query on a candidate-owned table filters on `candidate_id`. |
| T-STATE-1 | `official_submitted` is reachable only through the admin receipt action with a reference and the recording staff member; the database refuses it without a receipt. |
| T-STATE-2 | No route lets free text set any application or item state. |
| T-STATE-3 | Every allowed (from, to, actor) in `document_state_transitions` succeeds; every other combination of the 7 × 7 states and 3 actors is refused and logged. |
| T-STATE-4 | Changing programme moves items no longer required to `not_requested` with a note; nothing is deleted. |
| T-READ-1 | The §12.2 worked example reproduces its table exactly. |
| T-READ-2 | Only verified requirements give `met`, `not_met` or `pending_evidence`; others give `unknown`, and their value text is never shown. |
| T-READ-3 | No score, total, percentage or verdict appears in any output. |
| T-READ-4 | Non-comparable scales give `unknown` ("scale not comparable"); exams stay `pending_evidence` until a result exists. |
| T-READ-5 | With today's content records the requirement import produces zero programmes. |
| T-UPL-1 | A `.php` file renamed `.jpg`, an HTML file and an SVG are refused; nothing stored is executable. |
| T-UPL-2 | Extension and `finfo` disagreement is refused. |
| T-UPL-3 | Polyglot files are refused or neutralised by re-encoding. |
| T-UPL-4 | EXIF and GPS data are gone after re-encoding. |
| T-UPL-5 | An oversized file is refused before full processing. |
| T-UPL-6 | The per-candidate quota is enforced. |
| T-UPL-7 | PDFs with risky names (including `#xx`-escaped names) and encrypted PDFs are refused. |
| T-UPL-8 | Download headers are as §14.7; the storage path cannot be derived from the public id; quarantine is empty after a failure. |
| T-AUDIT-1 | Each action listed in §14.10 writes one audit row with actor, object and candidate. |
| T-AUDIT-2 | No audit `detail` contains a fixture value. |
| T-AUDIT-3 | The application user cannot update or delete `audit_log` rows (grant test, or no code path if H4 rules out grants). |
| T-LOG-1 | After the full suite, logs contain no unmasked fixture address, token, grade or file name. |
| T-LOG-2 | A forced exception gives a generic 500 page with no stack trace. |
| T-CONS-1 | Each consent row's version and text hash match `consent_texts`. |
| T-CONS-2 | A new consent version requires fresh consent before the candidate can continue. |
| T-RET-1 | With the clock moved forward, the jobs apply every §14.12 rule to synthetic records, including the warning e-mail before inactivity deletion. |
| T-RET-2 | A deletion request leaves no candidate rows or files and destroys the key; the request row keeps only the HMAC. |
| T-RET-3 | An export holds every stored field of that candidate and nothing of anyone else. |
| T-BKP-1 | A backup cannot be decrypted with anything held on the server, and decrypts with the offline key. |
| T-BKP-2 | The restore rehearsal checks in §14.11 pass, including the re-application of a deletion completed after the backup was taken. |
| T-MIG-1 | Version 1 and version 2 fixtures import as §14.14 maps them. |
| T-MIG-2 | A second run imports nothing. |
| T-MIG-3 | Tampered or malformed records are skipped or have fields dropped, and are reported by record id. |
| T-MIG-4 | Imported records never go beyond state `enquiry` and stay `unclaimed` until a magic link and Stage-2 consent. |
| T-IDX-1 | The production build's sitemap holds no `/apply/app/` URL, and robots.txt does not hide the app's noindex. |
| T-IDX-2 | On the host, guessed paths into `uma-app/`, `uma-private/` and the document store return 403 or 404. |

**§11 gates mapped to proof:**

| §11 gate | Automated proof | Owner action |
|---|---|---|
| 1. Account security as §3 (Argon2id, verified email, rate limits, CSRF, SameSite cookies, staff MFA), read with §14.5 | T-AUTH-1 to 8, T-SESS-1 to 5, T-MFA-1 to 4, T-RATE-1 to 3, T-CSRF-1 to 3; T-PWD-1 to 3 if passwords are switched on | Read the test report; confirm that magic links (which verify the address on first use) meet "verified email", and that `SameSite=Lax` replaces `Strict` (§14.0) |
| 2. Upload handling | T-UPL-1 to 8, T-HDR-1 | Answer H10 (scanner); accept or reject the PDF rule in §14.7 |
| 3. Abuse controls | T-RATE-1 to 3, T-ABUSE-1, T-AUDIT-1 | – |
| 4. Backups | T-BKP-1 | Choose the separate location; hold the offline key; carry out and sign the first restore rehearsal (T-BKP-2) |
| 5. Retention and deletion; export and delete on request | T-RET-1 to 3 | Confirm every TO BE CONFIRMED period in §14.12, and make the privacy notice match |
| 6. Privacy notice and consent text reviewed for the applicable law | T-CONS-1 and 2 (mechanics only) | Legal review; legal entity (D7); lawful basis; the under-18 question (§14.12); publish the reviewed notice |
| 7. Access review | T-AUTHZ-1 to 8 | Read the cross-account report; confirm the reviewer and admin roles |
| 8. Owner's written sign-off | – | Sign §11 with the date and the scope (2a only, or 2a and 2b) |

### 14.16 Effort (ESTIMATE)

ESTIMATE only: working days for one experienced PHP developer, not measured, with no comparable project in this repository to calibrate against. Excludes owner time, legal review, verification of programme requirements, and Stages 3 and 4.

| Component | Days (ESTIMATE) |
|---|---|
| Host confirmation support and the deploy route for private code (H1–H12) | 1–2 |
| Skeleton: front controller, router, config, error handling, headers, escaped templates, reuse of the site's CSS | 2–3 |
| Schema, migration runner, synthetic seed data | 1–2 |
| Magic-link sign-in, sessions, sign out everywhere, SMTP mail | 3–4 |
| CSRF, rate limits, input validation | 1–2 |
| Profile steps with save-and-resume | 3–4 |
| Programme choice, verified-requirement import, readiness comparison and page | 3–5 |
| Document checklist without uploads, have / need answers | 1–2 |
| Staff accounts, TOTP MFA, recovery codes, reviewer scope | 3–4 |
| Audit trail and application logging | 1–2 |
| Retention, deletion and export jobs | 2–3 |
| Encrypted backups and the first restore rehearsal | 2–3 |
| Stage-1 JSON importer (versions 1 and 2) | 1–2 |
| Cross-cutting test suite and CI wiring | 4–6 |
| Internal security review, fixes, and a plain-English runbook for the owner's daughter | 3–4 |
| **Phase 2a subtotal** | **31–48** |
| Uploads: validation, re-encoding, PDF checks, quarantine, encrypted storage, download | 4–6 |
| Reviewer queue for items, templated replacement requests and their e-mails | 3–4 |
| Phase 2b tests and security review | 2–3 |
| **Phase 2b subtotal** | **9–13** |

### 14.17 Owner decisions this design needs, and status

1. The host facts H1–H12 (§14.2), as dated screenshots.
2. The deploy route for code outside the web root (H11).
3. The separate backup location, and who holds the offline key (§14.11).
4. Every TO BE CONFIRMED period in §14.12.
5. Legal entity, lawful basis and consent texts (D7, §7 B6), and the rule for candidates under 18.
6. Whether Stage-1 enquirers may be invited to claim a profile (§14.14).
7. Whether 2a may open on a partial §11 sign-off, as §K.8 proposes (§14.0).
8. If H10 finds no per-file scanner: whether uploads may go ahead without one.

**Restated: nothing in §14 is built.** No account, sign-in, upload, payment, reviewer screen or real document handling exists, and none of the host facts above has been confirmed. Stage 2 work uses synthetic records only until the owner signs §11.
