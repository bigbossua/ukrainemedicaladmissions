# PAGE_ASSET_REGISTER.md

Every published URL must justify itself here. SEMrush evidence column now cites measured rows (`KEYWORD_URL_MAP.md` §4); "unvalidated" where nothing was measured. Last updated 2026-10-10 (evening).

| URL | Target intent | SEMrush evidence | Audience | Unique applicant value | Official sources required | Conversion path | Key internal links | Status | Last verified | Maintainer |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | Brand / orientation (H1 no longer targets "study medicine in Ukraine") | brand query — not measured | All prospective applicants | Orientation + immediate application start | none (no facts) | Hero form → `/apply/` | universities, courses, admissions, fees | Built, indexable | 2026-10-10 | Owner |
| `/universities/` | Medical universities/colleges in Ukraine, list, "best" | in: ukraine medical college 2,900 (kd 22); college list 210 (kd 11); best medical college 390 (kd 14); uk: best × 20 | Shortlisting applicants | Filterable, verification-flagged directory | per-university | Card → profile → apply | profiles, courses, fees | Built, indexable | 2026-10-10 | Owner |
| `/universities/ternopil-national-medical-university/` | Named university admissions/fees | uk: ternopil … admission 0, fees 0; in: not measured | Applicants considering TNMU | Per-programme verified facts with dates | tdmu.edu.ua official pages; EDEBO | Programme CTA → `/apply/?university=…&course=…` | courses, admissions, fees | Built, **noindex** until verified | — | Owner |
| `/courses/` | Course overview | unvalidated | Early-stage | Programme categories explained | none | → course pages | course pages | Built, indexable | 2026-10-10 | Owner |
| `/courses/medicine/` | Study medicine / MBBS in Ukraine | in: mbbs in ukraine 260 (kd 18); uk: study medicine 30, mbbs 20; za 30; ru 90 (kd 15) | Medicine applicants | Which universities, what to check | per-university | → profile → apply | universities, admissions, fees | Built, indexable | 2026-10-10 | Owner |
| `/courses/dentistry/` | Study dentistry in Ukraine | uk: 10; elsewhere not measured | Dentistry applicants | same | per-university | same | same | Built, indexable | 2026-10-10 | Owner |
| `/courses/nursing/` | Study nursing in Ukraine | uk: 20 (= mbbs); elsewhere not measured | Nursing applicants | Format/level caveats | per-university | same | same | Built, indexable | 2026-10-10 | Owner |
| `/courses/pharmacy/` | Study pharmacy in Ukraine | uk: 0; elsewhere not measured | Pharmacy applicants | same | per-university | same | same | Built, indexable | 2026-10-10 | Owner |
| `/admissions/` | Requirements / how to apply / documents | uk seeds returned no data; not measured elsewhere | Ready-to-apply | Four-stage process, document list, no-guarantee clarity | university admissions pages; MoE rules | → `/apply/` | fees, universities, apply | Built, indexable | 2026-10-10 | Owner |
| `/tuition-fees/` | Fees / cost of medical education | in: fees cluster 260–2,900 (kd 7–18); uk/ae/pk: mbbs in ukraine fees 20 | Budget-conscious applicants & parents | Only verified, dated fees; cost components explained | official fee schedules | → `/apply/` | profiles, admissions | Built, indexable | 2026-10-10 | Owner |
| `/faq/` | Applicant questions | not measured | All | Plain answers; FAQPage schema | none | → `/apply/` | admissions, fees, contact | Built, indexable | 2026-10-10 | Owner |
| `/about/` | Trust / who are you | n/a | All | Verification method, independence | none | → `/apply/` | contact | Built, indexable | 2026-10-10 | Owner |
| `/contact/` | Contact | n/a | All | Email + enquiry form | none | form → `/apply/thank-you/` | faq, admissions | Built, indexable | 2026-10-10 | Owner |
| `/apply/` | Transactional — start application | n/a | Ready-to-apply | Stage-1 form, prefilled | none | POST `/api/enquiry.php` → thank-you | admissions#stages | Built, indexable | 2026-10-10 | Owner |
| `/apply/thank-you/` | Confirmation | n/a | Submitters | States clearly nothing sent to a university | none | — | admissions, universities | Built, **noindex**, not in sitemap | 2026-10-10 | Owner |
| `/privacy/` · `/terms/` | Legal | n/a | All | Draft for legal review | legal entity details (D7) | — | — | Built, indexable, **draft** | — | Owner / legal |
| `/404` | — | n/a | — | Recovery links | — | — | universities, courses | Built, noindex | — | — |

Rules: no page is added without a row here; no row without a distinct intent; city/country pages require SEMrush evidence + admissions feasibility; every university profile stays noindex until `publishable`.


## Excluded intents — never build pages for these (evidence 2026-10-10)

| Cluster | Rows | Why excluded |
|---|---|---|
| Indian returnee / NMC / Supreme Court / news | in: ukraine returned medical students 2,900; supreme court 880; news 390; nmc on ukraine medical students 320; return medical students 260; haryana medical student 210 (+ ambiguous: ukraine medical students 1,000; ukraine indian medical students 480) | Wartime policy/news demand, not applicants; brief Part 2 rule 3 forbids a news strategy. Recognition facts (NMC/FMGE) may be *cited from official regulator documents* on `/tuition-fees/` and `/admissions/`, never as a page of their own |
| UK humanitarian aid | medical volunteer 70; donate medical supplies 50; plymouth medical aid 50; international medical corps 40; … | Not applicants |
| Generic "study in ukraine" | 20–30 in every database | Belongs to the sibling project; off-brief |

## Legacy URL inventory (production domain, evidence as of 2026-10-10)

Method: multi-angle web search only. **Direct fetches of the domain, the Wayback Machine and all .ua sites are blocked by the cloud environment's network policy, so no status code, redirect or page content was observed.** Everything below is from search-engine titles/snippets. Nothing has been changed on production.

| Legacy URL (as surfaced) | Evidence | HTTP status | Redirects | Proposed mapping in new site | Risk |
|---|---|---|---|---|---|
| `/services` | Returned by every domain-restricted query (title "Our Services"); snippets describe a consultancy branded **"Study Medicine in Ukraine"**, services list, Ternopil address (Verbytskoho 1, 46003), a phone number, **a WhatsApp option**, footer links Privacy Policy, Terms and Conditions, Complaints Policy, Disclaimer, Meet the team, Referral Marketing Disclosure, Careers, FAQ, Contact | UNVERIFIED | UNVERIFIED | 301 → `/about/` (service description) or a new `/services/` section only if the owner wants the service list public before tiers are approved | Only indexed URL found — likely carries whatever equity exists |
| `/about` | One search angle (title "About"); snippet: "established 2015", founder "Dr. Oksana Melnyk", team members in Lviv/Kharkiv | UNVERIFIED | UNVERIFIED | 301 → `/about/` | **Claims (founder, est. 2015, team) must be confirmed by the owner or dropped — not carried over unverified** |
| `/dentistry-admissions-in-ukraine` | One search angle; snippet lists service-area city headings (Kyiv, Lviv, Kharkiv, Odesa, Dnipro, Ivano-Frankivsk, Poltava, Sumy, Ternopil, Uzhhorod, Vinnytsia) | UNVERIFIED | UNVERIFIED | 301 → `/courses/dentistry/` | City headings on one page ≠ the "11 city pages" of the earlier audit — not confirmed either way |
| `/document-translation-legalisation` | Two search angles; snippet: translation → notarisation → legalisation; invitation letter | UNVERIFIED | UNVERIFIED | 301 → `/admissions/#documents` | Content useful; rewrite from official sources |
| Footer pages implied by snippets: privacy policy, terms and conditions, complaints policy, disclaimer, meet the team, referral marketing disclosure, careers, FAQ, contact | Titles only, URLs not surfaced | UNVERIFIED | UNVERIFIED | map to `/privacy/`, `/terms/`, `/about/`, `/faq/`, `/contact/`; complaints policy and referral disclosure are **new pages to write** before launch | URLs unknown — cannot redirect what is not inventoried |
| ~55-URL sitemap, 14 university pages, 11 city pages, 25 contractor folders, www duplicates (earlier audit) | **No evidence found** by ~22 domain-restricted and open-web queries; one angle found 4 URLs, three angles found only `/services` | — | — | — | Neither confirmed nor refuted; resolvable only with the owner's sitemap/Search Console export or network allow-listing |

Migration risks recorded: (1) the legacy brand name differs ("Study Medicine in Ukraine" vs "Ukraine Medical Admissions") — brand continuity and any inbound links need an owner decision; (2) the legacy site advertises WhatsApp — must not be carried over (brief Part 11); (3) founder/team/"established 2015" claims are unverified; (4) the legacy phone number and address are public on the old site — the owner decides whether they carry over; (5) redirect map cannot be completed without the real URL list (backlog N1, checklist A3).
