# UNIVERSITY_DATA_REGISTER.md

**Single source of truth:** `site/src/content/universities/<slug>.json`, validated at build time by the schema in `site/src/content.config.ts`. This document explains the model, the verification process and the current state of each record. It does not duplicate the data.

## 1. Data model (summary)

Every factual field is a **claim**: `{ value, status, source, checked, note }`.

| `status` | Meaning | How pages render it |
|---|---|---|
| `verified` | Checked against the official source in `source` on date `checked` | Shown as fact with "Verified", source link and date |
| `unverified` | Reported value (brief, earlier list, general knowledge) not yet checked | Shown highlighted with "Verification pending" and a warning |
| `outdated` | Was verified, but the source has changed or the academic year has passed | Treated like unverified until re-checked |
| `not-published` | We deliberately hold no value (e.g. a fee we have not confirmed) | "To be confirmed" — nothing invented |

Record-level: `officialName`, `alternativeNames`, `status` (operating / relocated / merged / suspended), `city`, `address`, `website`, `internationalOffice`, `founded`, `accreditation`, `recognition`, `accommodation`, `programmes[]`, `faqs[]`, `images[]` (with credit, licence, source, retrieval date), `verification { publishable, lastReview, openQuestions }`.

Programme-level: `qualification`, `course` (medicine | dentistry | nursing | pharmacy | preparatory | other), `durationYears`, `language`, `format`, `internationalAdmission`, `tuition { amount, currency, per, academicYear, schedule }`, `otherMandatoryCosts[]`, `entryRequirements`, `requiredDocuments`, `deadlines`, `intake`.

**`verification.publishable = false`** ⇒ the profile is built but `noindex`, excluded from the sitemap, carries a banner, and emits no structured data. Flip to `true` only after a full review.

University fees are never mixed with our own service fees (which do not exist in the data model at all).

## 2. Inclusion criteria for the directory (PROPOSED)

An institution is listed only when all of the following are evidenced:
1. It currently operates as a higher-education institution in Ukraine (official site live; present in a Ministry of Education / EDEBO register).
2. It offers at least one programme in medicine, dentistry, nursing or pharmacy leading to a recognised qualification.
3. It publishes an admissions route for international students (or explicitly states none — in which case it is listed with `internationalAdmission = false`).
4. Its current official name is confirmed; merged or renamed predecessors are recorded as `alternativeNames`, not as separate entries.
5. Relocated institutions (occupied-territory origins) are listed under their current operating city with `status = relocated`.

Completeness sources (official, identified 2026-10-10 by search; none yet fetched from this environment):
- **MoES "Study in Ukraine" university directory** — `universities.studyinukraine.gov.ua/en/minedu/university/<id>/` (contacts, invitation procedure per institution).
- **EDEBO** — `info.edbo.gov.ua` (Unified State Electronic Database on Education: licences, programmes; Ukrainian only).
- **NAQA accreditation register** — `naqa.gov.ua`.
- **World Directory of Medical Schools** — `search.wdoms.org` (listing only; never "recognised in country X").
Cross-check against the Wikipedia research list in the brief (research inventory only).

## 3. Verification procedure (per university, per intake)

1. Open the official website; record the domain in `website.source`.
2. For each claim, find the official page or PDF; paste its URL into `source`, set `checked` to today, set `status = verified`.
3. Fees: copy amount, currency, per-period and academic year exactly; record the payment schedule; never convert currencies.
4. If a page does not publish a fact, set `status = not-published` and explain in `note`.
5. Record the session in `SOURCE_VERIFICATION_REGISTER.md`.
6. When every programme the page shows has verified `language`, `durationYears`, `internationalAdmission` and `tuition` (or explicit `not-published`), set `verification.publishable = true` and `lastReview`.
7. Re-run `npm test`; the build fails on schema errors; the meta test fails if an unpublishable page leaks into the sitemap.
8. Diary a re-check before the next intake; set `outdated` when the academic year passes.

## 4. Record status

| Slug | Official name (claimed) | Publishable | Verified claims | Open questions |
|---|---|---|---|---|
| `ternopil-national-medical-university` | I. Horbachevsky Ternopil National Medical University of the Ministry of Health of Ukraine | **No** | 0 of 7 record-level, 0 of 44 programme-level | 7 (listed in the JSON) — official domain, international intake, fee schedule, requirements, deadlines, accommodation, recognition evidence |

Access attempt 2026-10-10: `www.tdmu.edu.ua` — DNS resolution failed from the build environment (network policy). No claim could be verified. Nothing has been invented to fill the gap.

## 5. Verification priority (SEMrush named-university evidence, 2026-10-10)

| Priority | Institution | Measured demand | Official domain (search-evidenced, unfetched) |
|---|---|---|---|
| 1 | Vinnytsia National Pirogov Memorial Medical University | in: "pirogov medical university ukraine" 390/mo (kd 23); uk 40 | to be identified |
| 2 | Bogomolets National Medical University (Kyiv) | in: 320/mo (kd 28, navigational); uk: 70 + "national medical university in kiev ukraine" 70 | `nmuofficial.com` (snippet: foreign applications 19 Jul–31 Oct 2026) |
| 3 | Bukovinian State Medical University (Chernivtsi) | uk: 20/mo | to be identified |
| 4 | Ternopil National Medical University (brief's pilot) | uk: 0/mo for admission and fees phrases; **not measured in in** | `tdmu.edu.ua` (official per search results) |

Ternopil remains the *template* pilot (its record exists and the page renders correctly as noindex) but has no measured search demand; the three institutions above should be verified before it unless the owner directs otherwise.

## 6. Research inventory (NOT a confirmed list; from the brief)

Bogomolets NMU · Bukovinian SMU · Danylo Halytsky Lviv NMU · Dnipro SMU · Donetsk NMU (relocated) · International European University · Ivano-Frankivsk NMU · Kharkiv NMU · Kharkiv International Medical University · Kyiv Medical University · Luhansk SMU (relocated) · Odesa NMU · Odesa International Medical University · Poltava SMU · Ternopil NMU (pilot) · Uzhhorod NU (medical faculty) · Vinnytsia NMU · Zaporizhzhia SMPU · Sumy SU (medical institute) · Petro Mohyla Black Sea NU · Cherkasy NU · V. N. Karazin Kharkiv NU (medical school) · Taras Shevchenko NU of Kyiv · Dnipro Medical Institute of Conventional and Alternative Medicine. Postgraduate academies (Shupyk, KhMAPE, ZMAPE) are out of scope for undergraduate admissions unless a relevant programme is evidenced.

Each must pass §2 before a JSON record is created.
