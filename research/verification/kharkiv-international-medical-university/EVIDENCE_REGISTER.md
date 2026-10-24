# Evidence register — Kharkiv International Medical University (`kharkiv-international-medical-university`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/kharkiv-international-medical-university.json`, checked 2026-10-24): **blocked**. Tested on 2026-10-24 from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: khimu.edu.ua, universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua. Probe on 2026-10-24T16:30:56Z over the fourth host list (research/verification/ALLOWLIST_P4.txt, 32 hosts): 32 refused at the environment's proxy under its network policy (403 to CONNECT), 0 open. No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. A refused request is an access limitation, never evidence about the institution.

**Record under verification:** `site/src/content/universities/kharkiv-international-medical-university.json` — 1 programme(s) with an official-domain lead of international admission (Medicine (General Medicine), English-medium track for foreign applicants); 1 deferred programme(s) kept unpublished until eligibility is read (Dentistry (Стоматологія)).

**Evidence store:** `site/data/evidence/kharkiv-international-medical-university.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `kharkiv-international-medical-university--NN--short-name.pdf` where NN is the row number of this register (e.g. `kharkiv-international-medical-university--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/kharkiv-international-medical-university.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ", founded 03.10.2017, website khimu.edu.ua - not opened *(Result date as shown: undated live registry; searched 2026-10-24. Search-result lead, not read in full.)* |  |  |
| 2 | [Official homepage (snippet): 'first private international medical university in ](https://khimu.edu.ua/en/) | Official homepage (snippet): 'first private international medical university in Ukraine'; claims licensing by MoES and MoH and NAQA accreditation *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 3 | [Official admissions page (snippet): General Medicine in English for foreign appl](https://khimu.edu.ua/en/admissions/) | Official admissions page (snippet): General Medicine in English for foreign applicants, 50% minimum in biology/physics/chemistry/English, no language certificate, autumn and winter intakes, Master's i *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 4 | [Official contacts page (snippet): foreign applicants directed to admission@khimu](https://khimu.edu.ua/en/contacts/) | Official contacts page (snippet): foreign applicants directed to admission@khimu.edu.ua *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 5 | [Official general-information page surfaced in search; content not read](https://khimu.edu.ua/en/about-university/general-information/) | Official general-information page surfaced in search; content not read *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 6 | [Aggregator card: Ukrainian title 'Приватний вищий навчальний заклад «Харківський](https://www.education.ua/universities/922/) | Aggregator card: Ukrainian title 'Приватний вищий навчальний заклад «Харківський міжнародний медичний університет»', address vul. Molochna 38, 2026 intake notice for Стоматологія *(Result date as shown: 2026 intake notice; page undated. Search-result lead, not read in full.)* |  |  |
| 7 | [Aggregator guide: founded 2017, private, rector Denys Shyian, address vul. Moloc](https://osvita.ua/vnz/guide/37331/) | Aggregator guide: founded 2017, private, rector Denys Shyian, address vul. Molochna 38, Kharkiv *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 8 | [uniRank profile: private non-profit, founded 2017, 'officially recognized by the](https://www.unirank.org/ua/uni/kharkiv-international-medical-university/) | uniRank profile: private non-profit, founded 2017, 'officially recognized by the Ministry of Health of Ukraine', international students welcome (aggregator claim) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 9 | [THE institutional profile exists (content not read)](https://www.timeshighereducation.com/world-university-rankings/kharkiv-international-medical-university) | THE institutional profile exists (content not read) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 10 | [EDEBO entry of Kharkiv Institute of Medicine and Biomedical Sciences of Kyiv Med](https://registry.edbo.gov.ua/university/3979) | EDEBO entry of Kharkiv Institute of Medicine and Biomedical Sciences of Kyiv Medical University - a DIFFERENT institution (name-confusion check) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 11 | [Agent guide: repeats NMC/WHO claims but states NMC listing not verified and advi](https://future-mbbs.com/blog/universities/mbbs-in-ukraine-kharkiv-international-medical-university/) | Agent guide: repeats NMC/WHO claims but states NMC listing not verified and advises checking conflict impact on operating/accreditation status *(Result date as shown: 2026. Search-result lead, not read in full.)* |  |  |
| 12 | [Agent marketing page advertising 2026-27 admission (not evidence)](https://www.rmcedu.com/mbbs-abroad/mbbs-in-ukraine/kharkiv-international-medical-university/) | Agent marketing page advertising 2026-27 admission (not evidence) *(Result date as shown: 2026-27 cycle. Search-result lead, not read in full.)* |  |  |
| 13 | [News on return to offline teaching - concerns Kharkiv NATIONAL Medical Universit](https://gwaramedia.com/harkivskij-meduniversitet-gotuietsya-do-perehodu-v-oflajn-navchannya/) | News on return to offline teaching - concerns Kharkiv NATIONAL Medical University, not KhIMU (exclusion note) *(Result date as shown: older than one year per search summary. Search-result lead, not read in full.)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [Ministry Study in Ukraine portal listing of Kharkiv International Medical Univer](https://universities.studyinukraine.gov.ua/en/minedu/university/17/); [NAQA 2025 accreditation of Kharkiv Institute of Medicine and Biomedical Sciences](https://en.naqa.gov.ua/?p=5910)

Third-party pages (leads only, never a source): [Admission information system card (EDEBO code 4054): 2025 entry requires NMT 202](https://vstup.osvita.ua/r21/4054/)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Private Institution of Higher Education "Kharkiv International Medical University" (LEAD: EDEBO registry / DEQAR record title as shown in search results; official English page not opened) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://khimu.edu.ua/ | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | unverified | LEAD: url: https://khimu.edu.ua/en/admissions/ | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## C. Programme `medicine-general-medicine-english-medium-track-for-foreign-applicants` — Medicine (General Medicine), English-medium track for foreign applicants (`programmes[].id = "medicine-general-medicine-english-medium-track-for-foreign-applicants"`, field medicine)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.medicine-general-medicine-english-medium-track-for-foreign-applicants.internationalAdmission` | unverified | LEAD: True | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.medicine-general-medicine-english-medium-track-for-foreign-applicants.intakeYear` | not-published | — (no lead) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.medicine-general-medicine-english-medium-track-for-foreign-applicants.level` | unverified | LEAD: master | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.medicine-general-medicine-english-medium-track-for-foreign-applicants.specialtyCode` | not-published | — (no lead) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.medicine-general-medicine-english-medium-track-for-foreign-applicants.qualification` | not-published | — (no lead) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.medicine-general-medicine-english-medium-track-for-foreign-applicants.durationText` | not-published | — (no lead) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.medicine-general-medicine-english-medium-track-for-foreign-applicants.durationYears` | not-published | — (no lead) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.medicine-general-medicine-english-medium-track-for-foreign-applicants.language` | unverified | LEAD: English, Ukrainian | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.medicine-general-medicine-english-medium-track-for-foreign-applicants.format` | not-published | — (no lead) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.medicine-general-medicine-english-medium-track-for-foreign-applicants.tuition` | not-published | — (no lead) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.medicine-general-medicine-english-medium-track-for-foreign-applicants.otherMandatoryCosts.*` | not-published | — (no lead) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.medicine-general-medicine-english-medium-track-for-foreign-applicants.deadlines` | not-published | — (no lead) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.medicine-general-medicine-english-medium-track-for-foreign-applicants.intake` | not-published | — (no lead) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.medicine-general-medicine-english-medium-track-for-foreign-applicants.requirements.*` | not-published | — (no lead) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim | no evidence recorded |  |  |  |
| `programmes.medicine-general-medicine-english-medium-track-for-foreign-applicants.documents.*` | not-published | — (no lead) | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | The full numbered document list for foreign applicants, with conditions — one row each | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `dentistry` — Dentistry (Стоматологія) (dentistry) | `programmes.dentistry.internationalAdmission`; `programmes.dentistry.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [EDEBO state registry entry (search snippet): private HEI, short name ПВНЗ "ХММУ"](https://registry.edbo.gov.ua/university/4054) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Location lead as found (unverified): Kharkiv (LEAD: EDEBO entry; aggregators osvita.ua / education.ua give the address as vul. Molochna 38, Kharkiv; no relocation report found)  
   Closure (fill): 
6. Relocation lead (unverified): No relocation, suspension, merger or licence-revocation lead was found in English or Ukrainian searches for 2024-2026. Admission activity leads exist for 2025 (vstup.osvita.ua/r21/4054: NMT results 2022-2025 required) and 2026 (education.ua: 2026 intake notice for Dentistry; agent pages advertise 2026-27 intake). However Kharkiv is a frontline city and no snippet states the current teaching mode (online/offline) or physical base; the gwaramedia.com article about a Kharkiv medical university returning to offline teaching concerns Kharkiv NATIONAL Medical University, not KhIMU, and must not be attributed to this institution. Status therefore remains a lead, not a verified fact.  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: NAQA accreditation decision for KhIMU's own programmes not found in search (official site snippet claims NAQA accreditation and MoES/MoH licensing - unverified self-description); inventory flag 'accreditation found only to 2021' remains open  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: Name confusion with Kharkiv National Medical University (KhNMU, state, already listed): most results for 'Kharkiv International Medical University' returned KhNMU pages and the summariser mixed the two  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: Name confusion with 'Kharkiv Institute of Medicine and Biomedical Sciences' (private, a unit of Kyiv Medical University, EDEBO 3979): its NAQA accreditations surfaced in searches for KhIMU and could be misattributed  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: Education-agent pages (rmcedu.com, selectyouruniversity.com, ruseducation.in, future-mbbs.com) advertise 'NMC and WHO recognised'; one 2026 agent guide itself says the NMC listing was not verified and notes WHO does not approve medical schools - do not reuse these recognition claims  
   Closure (fill): 
11. Red flag to resolve before any fact is shown: Young (founded 03.10.2017), private institution; uniRank states 'officially recognized by the Ministry of Health of Ukraine' - aggregator claim, not a licence record  
   Closure (fill): 
12. Red flag to resolve before any fact is shown: Kharkiv is a frontline city; current teaching mode and physical base in 2025/26 not shown by any snippet  
   Closure (fill): 
13. Red flag to resolve before any fact is shown: SEMrush exact-match demand for the name is only 10/month (IN), so the page has weak independent organic justification  
   Closure (fill): 
14. Missing evidence: EDEBO licence record (licensed specialities 222 Medicine, 221 Dentistry; licence volumes) - registry page not opened  
   Closure (fill): 
15. Missing evidence: NAQA accreditation certificate(s) for KhIMU's Medicine and Dentistry programmes - none found in search; the site's own NAQA claim is unverified  
   Closure (fill): 
16. Missing evidence: Full official programme list with levels; Pharmacy and Nursing: NOT FOUND in any snippet  
   Closure (fill): 
17. Missing evidence: Whether Dentistry admits foreign applicants and whether it is taught in English - not shown  
   Closure (fill): 
18. Missing evidence: Current (2025/26) teaching mode and physical base in frontline Kharkiv  
   Closure (fill): 
19. Missing evidence: Official tuition fees - not found (agent figures must not be used)  
   Closure (fill): 
20. Missing evidence: Contents of the Study in Ukraine portal record (university/17) - confirm it is KhIMU and which programmes it lists  
   Closure (fill): 
21. Missing evidence: DEQAR/EQAR record contents referenced in the inventory - not opened  
   Closure (fill): 
22. Missing evidence: Official confirmation of the address (vul. Molochna 38) and rector (Denys Shyian) - aggregator leads only  
   Closure (fill): 
23. Missing evidence: WDOMS listing (claimed by agents) - not checked  
   Closure (fill): 
24. Missing evidence: Legal identity details (EDRPOU code, founder) - not found  
   Closure (fill): 
25. Skeptic's note: Open (not a bar): NAQA accreditation decision for its own Medicine/Dentistry programmes not found; the site's NAQA/MoES/MoH claims are self-description.  
   Closure (fill): 
26. Skeptic's note: Open (not a bar): EDEBO licence record (registry.edbo.gov.ua/university/4054) not opened; licence volumes and the Study in Ukraine portal record (university/17) unconfirmed.  
   Closure (fill): 
27. Skeptic's note: Open (not a bar): Kharkiv is a frontline city; current teaching mode and physical base in 2025/26 not shown by any snippet.  
   Closure (fill): 
28. Skeptic's note: Name-confusion risk to manage in copy: Kharkiv National Medical University (state, listed) and the Kyiv Medical University unit at khim.edu.ua (candidate kharkiv-institute-of-medicine-and-biomedical-sciences); search results for KhIMU mostly return KhNMU pages.  
   Closure (fill): 
29. Skeptic's note: Agent recognition claims (NMC/WHO) must not be reused; Pharmacy/Nursing not found.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/kharkiv-international-medical-university.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
