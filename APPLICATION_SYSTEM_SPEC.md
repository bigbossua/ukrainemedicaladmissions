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
