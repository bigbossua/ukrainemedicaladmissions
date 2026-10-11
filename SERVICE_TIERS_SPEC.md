# SERVICE_TIERS_SPEC.md

**Status: PROPOSED — nothing here is an offer, a price or a promise.** No tier is shown to applicants until inclusions, terms, pricing and operational delivery are approved by the owner. The public site currently says only that paid support may be offered and will be explained in full before any choice.

## Eligibility rule (from the brief)

The tier-selection interface appears only after an application reaches state 3 (submitted to Ukraine Medical Admissions) and has passed an initial completeness review. Starting an application is always free.

## Proposed tiers

| | Tier 1 — Essential Application Support | Tier 2 — Comprehensive Admissions Support | Tier 3 — Premium Student Support |
|---|---|---|---|
| Proposed inclusions | Personal document checklist; one administrative review of uploaded documents; written eligibility note against the university's published requirements; status updates by email | Tier 1 + coordination of translations/legalisation requirements (guidance, not the translation itself); up to two further document reviews; follow-up with the university's international office where the university permits; defined response time | Tier 2 + a named adviser with a defined contact allowance (e.g. N scheduled calls); pre-departure guidance pack (visa process overview — not visa handling, accommodation options as published, arrival checklist); arrival coordination only where a verified partner exists |
| Explicit exclusions (all tiers) | University tuition and charges; visa fees and decisions; translation/legalisation fees; any guarantee of admission, visa, recognition, scholarship or employment; submission to a university without the applicant's confirmation | | |
| Operational workload (estimate to validate) | ~1–2 h per applicant | ~3–5 h | ~8–12 h + partner coordination |
| Likely costs to us | Staff time; email tooling | + staff time; possible courier costs (passed through) | + adviser time; partner fees (passed through, disclosed) |
| Eligibility stage | State 3 | State 3 | State 3 and university confirmed open to the applicant's country |
| Support boundaries | Email, defined response time | Email + scheduled calls | Named adviser, allowance cap, escalation to owner |
| Evidence required before publishing | Time-and-motion on 5+ synthetic/pilot applications; response-time commitment we can meet; refund terms drafted; legal review of terms; complaints procedure | + confirmation that each target university accepts third-party communication on an applicant's behalf | + a written agreement with any arrival/accommodation partner; insurance/liability check |

## Pricing

**Not set.** Price only after: workload measurement, cost-of-delivery, comparison with transparent competitors (recorded with sources), and owner approval. Prices will be shown with currency, payment timing, what happens if the university declines, and refund rules.

## Payments

Stripe Checkout only; test mode until the owner approves go-live; no card data stored; reconciliation and refund procedure documented before the first live charge.

## What the business will never promise

Admission, visa approval, qualification recognition, scholarships, employment, invitation letters (issued by universities), or "guaranteed" anything.

---

## Revenue-model options assessed (2026-10-11) — hypotheses, none validated

Agreed model: a student application service with legitimate, transparent, disclosed revenue. No conversion rate, willingness-to-pay figure or forecast exists for this business; none is stated below. Pricing stays unset.

| | Option A — Free profile + paid application-support levels (the proposed tiers above) | Option B — Single paid "document-readiness review" | Option C — Preparatory-route guidance service | Option D — University referral commissions | Option E — Paid listings / promotion for universities |
|---|---|---|---|---|---|
| Service actually provided | Readiness assessment, checklist, document review, submission support, status tracking (states 1–4) | One structured review of a candidate's record and documents against a verified programme's requirements, with a written gap report | Identifying and explaining verified preparatory/foundation routes for candidates with gaps; help applying to the preparatory department | We would be paid by a university for each enrolled applicant | Universities pay to be listed/promoted |
| Who pays, what they receive | The candidate, after their application is received and reviewed; receives the tier's defined inclusions | The candidate; receives the report and a prioritised to-do list | The candidate; receives route options with sources and the application support for the chosen route | The university; the candidate pays nothing to us | The university; candidates see promoted content |
| Why the fee would be fair | Work is visible and itemised; starting is free; no fee before review; refund terms shown first | Fixed scope, fixed deliverable, fixed price | Addresses the largest under-served group honestly | — | — |
| Costs and operational work | Reviewer time (estimates in the tier table — to be measured on ≥5 synthetic/pilot cases), e-mail tooling, hosting (none extra) | ~1–2 h reviewer time per report (estimate) | Research time per route (verified sources), reviewer time | Contract negotiation, reporting, compliance | Sales, compliance |
| Demand evidence available | None measured; the only proxies are the fees/requirements search clusters (KEYWORD_URL_MAP §7 #3, #8) | None | None; preparatory demand unmeasured (R1) | — | — |
| Evidence needed to validate | Pilot with synthetic then real applicants; completion rates by stage from the application system; stated willingness to pay collected at state 3 ("would you consider paid support?" — optional question); competitor price points recorded with sources | Same | Verified supply of preparatory routes first | — | — |
| Refund / cancellation / complaints | Refund terms per tier before purchase; 14-day cancellation where law requires; complaints policy page exists (draft) | Full refund if the report is not delivered within the stated time | As A | — | — |
| Conflict of interest / disclosure | None if we are paid only by candidates — stated on `/disclosure/` | None | Must disclose if a preparatory department pays us anything (it must not) | **Inherent conflict**: recommendations would be shaped by payers; brief requires independence; would require written agreements, disclosure on every page and probably regulatory review in the candidate's country | **Inherent conflict** with the "no ranking, no promotion" promise |
| Legal prerequisites | Legal entity and address (D7), consumer terms, refund policy, privacy notice, VAT position, payment processor terms | Same | Same | Agency agreements, local-law review in source countries, disclosure | Advertising law, disclosure |
| **Decision** | **Recommended core model** — build the product first, measure stage conversion, then price | **Recommended as the first sellable unit** (smallest, clearest, fits the readiness service) | **Recommended as a feature of A/B once routes are verified**, not a separate product | **Rejected** for now — no agreements exist, and it would contradict the independence disclosure already published; revisit only with the owner's explicit decision and full disclosure | **Rejected** |

Validation gaps in one line: no demand or willingness-to-pay data; no measured workload; no legal entity details; no verified programme requirements to review against. None of these needs money to close — they need the application system (Stage 2), the verification access (D5) and the owner's legal details (D7).

---

## Document-readiness review - offer design (2026-10-11; hypothesis, not on sale)

**Status: HYPOTHESIS. Not on sale, not priced, not shown on the website.** It cannot be delivered today. None of the seven university records in `site/src/content/universities/` is verified (all have `verification.publishable=false` and zero verified claims), so there is no programme whose requirements a review could be measured against. This section designs the offer so that its workload can be measured and its terms reviewed before anyone decides to sell it. It develops Option B above and the service offer in EXECUTIVE_REPORT §K.8 (both RECOMMENDATION). No price, competitor figure or partnership is stated here because none exists in the evidence.

### Who it is for

- A prospective student who has a Stage-1 profile, has picked one programme at one university, and wants a person to check what they told us against what that university publishes, and to say what to do next.
- Most useful when the picture is mixed: results still to come, a grading scale that is not obvious, documents not yet obtained, documents that are needed only in some cases (translations, legalisation).
- Not for someone who wants to know whether they will be admitted, wants visa or recognition advice, or has not yet chosen a programme. The free profile and the guidance pages serve them better.

### Inputs

| Input | Rule |
|---|---|
| A complete-enough Stage-1 profile | All of: field of study and level; one chosen university and programme, with an intake year; qualification name, awarding country, year, and whether achieved or expected; grading scale type; every subject the programme's verified requirements mention, with a grade or a status (achieved, predicted, pending, not studied); a have / need / not sure answer for each document type on the checklist; contact details and consent. Anything missing is listed back to the candidate before the review starts. The review does not start on an incomplete profile. |
| One chosen programme whose requirements are VERIFIED | The programme's record is publishable, and its requirement objects carry `status: verified`, a source link and a check date for the intake year in question (APPLICATION_SYSTEM_SPEC §8.2, §13). A requirement the university does not publish is reported as "not published by the university". A requirement still unverified is reported as unknown, and its value is not shown. |
| Documents | None. Until Stage-2 uploads exist and APPLICATION_SYSTEM_SPEC §11 is signed, the review reads only what the candidate typed. No document is requested or accepted by e-mail either, which is the Stage-1 rule. Anything that needs a document to confirm it is reported as pending evidence. |

### Deliverable

A written report, sent through the channel the owner approves (e-mail at first; inside the account once Stage 2a exists). Contents, in this order:

1. The fixed disclaimer, at the top and again at the end: "This compares what you told us with the requirements the university has published; it is not an admission decision." (APPLICATION_SYSTEM_SPEC §8.2).
2. Basis: candidate reference, programme, university, intake year, each requirement's source link and check date, date of the report, reviewer.
3. A table with one row per requirement: the requirement in the university's own words; what the candidate told us; the result (**met · not met · unknown · pending evidence**); the reason; what would change the result.
4. A prioritised to-do list: first anything not met that the candidate can act on; then each item pending evidence, with the document or result that would settle it; then each unknown, with what we will check and where.
5. A document checklist with conditions: each document a verified requirement asks for; the condition under which it applies (for example a translation only if the certificate is not in a language the university accepts, and only where the university's page says so); the format note quoted from that page; and the candidate's have / need / not sure answer.
6. Preparatory route: only if a verified route exists at that university, with the university's own wording on progression and the sentence that completing it does not guarantee admission or progression. Otherwise nothing is suggested.

Never in the report: an eligibility verdict, a score, a total, a percentage, a probability or a ranking.

### What it is not

- Not an admission decision. Only the university decides.
- Not a guarantee of admission, a place, a visa, recognition, a scholarship or a job.
- Not visa advice, and not advice on whether the degree will be recognised in the candidate's country. On recognition the report points to the candidate's home regulator and asks them to check its current rules.
- Not a check that any document is genuine; not a translation or legalisation service.
- Not an application. Nothing is sent to any university.
- Not a replacement for the free readiness comparison. Everything the free profile shows stays free. The paid review adds a person's reading, the to-do list and our follow-up on unknowns.

### Turnaround

To be measured, not promised. No turnaround is stated to candidates until the pilot shows one that the reviewer met in every pilot case. Whatever is then stated is backed by Option B's refund rule (full refund if the report is not delivered within the stated time).

### Workload measurement plan (before any price)

- At least five synthetic cases (fictional names, `@example.invalid` addresses), each built to test a different part of the method:
  1. every verified requirement met;
  2. a required subject not studied, at a university with a verified preparatory route;
  3. results still pending (predicted grades);
  4. a grading scale that cannot be compared with the verified minimum;
  5. documents needed only in some cases (translation, legalisation) and several "not sure" answers;
  6. optional: a programme with some requirements still unverified, to time how unknowns are handled.
- Two rounds: a dry run against the synthetic programme in APPLICATION_SYSTEM_SPEC §12.2; then a measurement run against the first programme whose requirements are actually verified, because real verified requirements are what drive the work.
- For each case, record: reviewer; date; minutes spent on the intake check, the comparison, writing and the quality check; questions that had to go back to the candidate; and errors found by a second reviewer who repeats the comparison from the same inputs. The results are added to this section as a table when the pilot runs.
- ESTIMATE before measurement: 1–2 reviewer hours per report (EXECUTIVE_REPORT §K.8; not measured).
- The owner's daughter carries out at least one case as reviewer, to show the method can be run from the written instructions.

### Pricing gates (all must be met before any price is set)

- [ ] Workload measured as above, and the cost of delivery worked out from the measured minutes.
- [ ] Competitor price points recorded with sources: page link, capture date, currency and what is included. None is recorded today and none is quoted here.
- [ ] Consumer-law terms reviewed for the operating jurisdiction: information given before purchase; cancellation rights (the tier text above already notes 14-day cancellation where the law requires it); what happens if the review starts within the cancellation period; the refund rule; the complaints route (the complaints policy page is still a draft).
- [ ] Legal entity confirmed (D7) and named on the terms, privacy notice and invoice; VAT position known.
- [ ] Payment route approved (APPLICATION_SYSTEM_SPEC §5; no payment system exists today).
- [ ] Owner approval of the price, with the cost basis recorded in this section.

### Disclosures (shown before purchase)

- Independence, as on `/disclosure/`: no official partnership or agent status with any university unless a written agreement exists and is stated; no payment from universities.
- No commissions: none exist. If any arrangement ever exists, it is disclosed before the candidate decides, as the disclosure page already says.
- What the fee includes and excludes, and who does the review (our reviewer, not a university official).
- That the results depend on what the candidate told us and on the requirements as published on the check date shown.
- The refund and complaints routes, and how the candidate's data is used and kept (privacy notice).

### What has to be true before it is offered

- [ ] At least one programme with VERIFIED requirements (today: none).
- [ ] The report template reviewed by the owner, using the measured pilot cases.
- [ ] A safe way to receive the profile and deliver the report agreed: sending a report that holds academic personal data by e-mail needs the owner's decision; delivery inside the account needs Stage 2a and its §11 sign-off.
- [ ] Workload measured, price set, and every pricing gate ticked.
- [ ] Terms, refund rule, complaints procedure and privacy notice updated and reviewed.
- [ ] Offer wording written without scarcity, countdowns or guarantees, and placed on an existing page (for example `/services/`). No new indexable URL.
- [ ] The owner's written approval recorded here, with the date.
