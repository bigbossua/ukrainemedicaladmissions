# SOURCE_VERIFICATION_REGISTER.md

Log of every attempt to verify a factual claim against an official source. The machine-readable result lives in the university JSON (`status`, `source`, `checked`); this register is the human audit trail.

## Verification sessions

| Date | Institution / claim | Source attempted | Outcome | Recorded in |
|---|---|---|---|---|
| 2026-10-10 | Ternopil NMU — official name, domain, programmes, fees, requirements | `https://www.tdmu.edu.ua/en/` | **FAILED — unreachable** (DNS resolution refused by the cloud environment's network policy). No claim verified. | JSON record left `unverified` / `not-published`; `publishable: false` |
| 2026-10-10 | Hostinger Git deployment behaviour | `docs.hostinger.com/websites/git`, `hostinger.com/support/…` | **FAILED — unreachable** from environment. Behaviour summarised from search-engine snippets only (UNVERIFIED). | `HOSTING_AND_DEPLOYMENT_ASSESSMENT.md` |

## Claims currently published as fact on the site

None. Every university fact renders as "Verification pending" or "To be confirmed". The tuition table contains no figures. No recognition, ranking, partnership, student-number or testimonial claim exists anywhere on the site.

## Standing sources to use when reachable

| Purpose | Source |
|---|---|
| Institution existence, licence, official name | Ukrainian Unified State Electronic Database on Education (EDEBO) / Ministry of Education and Science register |
| Programmes, fees, requirements, deadlines, contacts | The university's own official website (international-students / admissions / fees pages) and its published fee orders (PDF) |
| Medical-school listing | World Directory of Medical Schools (for a factual "listed" statement only — never "recognised in country X") |
| Student visa process overview | Ukrainian Ministry of Foreign Affairs / State Migration Service pages |

Rule: one claim, one source URL, one check date. If the source does not say it, we do not publish it.
