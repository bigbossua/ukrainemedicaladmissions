# PAGE_ASSET_REGISTER.md

Every published URL must justify itself here. **SEMrush evidence column: none exists yet — all rows are "unvalidated".** Last updated 2026-10-10.

| URL | Target intent | SEMrush evidence | Audience | Unique applicant value | Official sources required | Conversion path | Key internal links | Status | Last verified | Maintainer |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | Brand / "study medicine in Ukraine" (broad) | unvalidated | All prospective applicants | Orientation + immediate application start | none (no facts) | Hero form → `/apply/` | universities, courses, admissions, fees | Built, indexable | 2026-10-10 | Owner |
| `/universities/` | Medical universities in Ukraine (comparison) | unvalidated | Shortlisting applicants | Filterable, verification-flagged directory | per-university | Card → profile → apply | profiles, courses, fees | Built, indexable | 2026-10-10 | Owner |
| `/universities/ternopil-national-medical-university/` | Named university admissions/fees | unvalidated | Applicants considering TNMU | Per-programme verified facts with dates | tdmu.edu.ua official pages; EDEBO | Programme CTA → `/apply/?university=…&course=…` | courses, admissions, fees | Built, **noindex** until verified | — | Owner |
| `/courses/` | Course overview | unvalidated | Early-stage | Programme categories explained | none | → course pages | course pages | Built, indexable | 2026-10-10 | Owner |
| `/courses/medicine/` | Study medicine in Ukraine | unvalidated | Medicine applicants | Which universities, what to check | per-university | → profile → apply | universities, admissions, fees | Built, indexable | 2026-10-10 | Owner |
| `/courses/dentistry/` | Study dentistry in Ukraine | unvalidated | Dentistry applicants | same | per-university | same | same | Built, indexable | 2026-10-10 | Owner |
| `/courses/nursing/` | Study nursing in Ukraine | unvalidated | Nursing applicants | Format/level caveats | per-university | same | same | Built, indexable | 2026-10-10 | Owner |
| `/courses/pharmacy/` | Study pharmacy in Ukraine | unvalidated | Pharmacy applicants | same | per-university | same | same | Built, indexable | 2026-10-10 | Owner |
| `/admissions/` | Requirements / how to apply / documents | unvalidated | Ready-to-apply | Four-stage process, document list, no-guarantee clarity | university admissions pages; MoE rules | → `/apply/` | fees, universities, apply | Built, indexable | 2026-10-10 | Owner |
| `/tuition-fees/` | Fees / cost of studying | unvalidated | Budget-conscious applicants & parents | Only verified, dated fees; cost components explained | official fee schedules | → `/apply/` | profiles, admissions | Built, indexable | 2026-10-10 | Owner |
| `/faq/` | Applicant questions | unvalidated | All | Plain answers; FAQPage schema | none | → `/apply/` | admissions, fees, contact | Built, indexable | 2026-10-10 | Owner |
| `/about/` | Trust / who are you | n/a | All | Verification method, independence | none | → `/apply/` | contact | Built, indexable | 2026-10-10 | Owner |
| `/contact/` | Contact | n/a | All | Email + enquiry form | none | form → `/apply/thank-you/` | faq, admissions | Built, indexable | 2026-10-10 | Owner |
| `/apply/` | Transactional — start application | n/a | Ready-to-apply | Stage-1 form, prefilled | none | POST `/api/enquiry.php` → thank-you | admissions#stages | Built, indexable | 2026-10-10 | Owner |
| `/apply/thank-you/` | Confirmation | n/a | Submitters | States clearly nothing sent to a university | none | — | admissions, universities | Built, **noindex**, not in sitemap | 2026-10-10 | Owner |
| `/privacy/` · `/terms/` | Legal | n/a | All | Draft for legal review | legal entity details (D7) | — | — | Built, indexable, **draft** | — | Owner / legal |
| `/404` | — | n/a | — | Recovery links | — | — | universities, courses | Built, noindex | — | — |

Rules: no page is added without a row here; no row without a distinct intent; city/country pages require SEMrush evidence + admissions feasibility; every university profile stays noindex until `publishable`.
