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

**Runtime:** PHP 8.3 on Hostinger + MySQL (both available on the plan — UNVERIFIED until hPanel is inspected), under `/apply/app/` served with `X-Robots-Tag: noindex` and `Disallow` in robots.txt. Framework: a small, well-maintained PHP stack (e.g. Slim/Laravel-lite) — decided at Stage 2 start, no paid components.

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

Synthetic applicants only (`test+<n>@example.com`); fixture documents are generated PDFs; automated tests for state machine, access control (cross-account access must 403), upload validation, CSRF, and that no route under `/apply/app/` is indexable. Production verification only after deployment is approved.

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
| Files outside the document root writable by PHP | expected (`/home/u…/domains/<domain>/uma-private/`) | to be confirmed on the live host after the first enquiry test |
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

Copy rules: no step mentions deadlines, scarcity or eligibility; the thank-you page states what happens next and that nothing is sent to any university. Anti-abuse as today (honeypot, timing, 405/422). Accessible: one question group per screen, error summary at the top, progress indicator with step names, keyboard order verified by the UI test.

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
