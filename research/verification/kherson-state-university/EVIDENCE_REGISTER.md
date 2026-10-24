# Evidence register — Kherson State University (`kherson-state-university`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/kherson-state-university.json`, checked 2026-10-24): **blocked**. Tested on 2026-10-24 from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: kspu.edu, universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua. Probe on 2026-10-24T16:30:56Z over the fourth host list (research/verification/ALLOWLIST_P4.txt, 32 hosts): 32 refused at the environment's proxy under its network policy (403 to CONNECT), 0 open. No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. A refused request is an access limitation, never evidence about the institution.

**Record under verification:** `site/src/content/universities/kherson-state-university.json` — 0 programme(s) with an official-domain lead of international admission (); 3 deferred programme(s) kept unpublished until eligibility is read (Medicine (Department of Medicine, Medical Faculty) - existence of a current 222 Medicine intake NOT confirmed; lead only, Терапія та реабілітація / фізична терапія (physical therapy) - shown with code '361I7' on education.ua, Медсестринство (Nursing) - offered by the Henichesk Professional College of Kherson State University (Генічеський фаховий коледж ХДУ), a VOCATIONAL subdivision, not a university degree).

**Evidence store:** `site/data/evidence/kherson-state-university.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `kherson-state-university--NN--short-name.pdf` where NN is the row number of this register (e.g. `kherson-state-university--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/kherson-state-university.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [Medical Faculty 'About' page (search snippet): teaching/research unit; 'prepares](https://www.kspu.edu/About/Faculty/Medicine/AboutMF.aspx?lang=en) | Medical Faculty 'About' page (search snippet): teaching/research unit; 'prepares applicants for ... KROK-1 and KROK-2'; three departments; KSU-online platform *(Result date as shown: undated in results. Search-result lead, not read in full.)* |  |  |
| 2 | [Department of Medicine history page: 'after the start of the full-scale invasion](https://www.kspu.edu/About/Faculty/Medicine/DepartmentOfMedicine/111.aspx?lang=en) | Department of Medicine history page: 'after the start of the full-scale invasion in 2022, the faculty, together with the university, was moved to Ivano-Frankivsk' (Precarpathian National University pr *(Result date as shown: undated in results. Search-result lead, not read in full.)* |  |  |
| 3 | [Medical Faculty international-activity page: internationalisation strategy 2023-](https://www.kspu.edu/About/Faculty/Medicine/InternationalActivity.aspx?lang=en) | Medical Faculty international-activity page: internationalisation strategy 2023-2027, English-language teaching concept 2023-2027, academic-mobility rules; no foreign-student medicine programme shown *(Result date as shown: undated in results (documents dated 2023-2027). Search-result lead, not read in full.)* |  |  |
| 4 | [University 'About' page: 'about 8,000 students, drawn from 23 regions of Ukraine](https://www.kspu.edu/About.aspx?lang=en) | University 'About' page: 'about 8,000 students, drawn from 23 regions of Ukraine and CIS countries' *(Result date as shown: result title shows 'Updated: 11/21/2024'. Search-result lead, not read in full.)* |  |  |
| 5 | [Fundraising page: 'temporary relocation to Ivano-Frankivsk ... in 2022'; Kherson](https://www.kspu.edu/About/DepartmentAndServices/Fundraising.aspx?lang=en) | Fundraising page: 'temporary relocation to Ivano-Frankivsk ... in 2022'; Kherson buildings, observatory and 'all dormitories have been damaged' *(Result date as shown: undated in results. Search-result lead, not read in full.)* |  |  |
| 6 | ['International Student' page: Economics bachelor/master in English or Ukrainian,](https://kspu.edu/About/Faculty/FBP/International_Student) | 'International Student' page: Economics bachelor/master in English or Ukrainian, 'IELTS 5.5+', maths exam and interview; International Relations Office with Ivano-Frankivsk address; a separate kspu.ed *(Result date as shown: undated in results. Search-result lead, not read in full.)* |  |  |
| 7 | ['Херсонський держуніверситет продовжує працювати в Україні': relocated to Ivano-](https://osvita.ua/consultations/86867/) | 'Херсонський держуніверситет продовжує працювати в Україні': relocated to Ivano-Frankivsk, admits students, issues Ukrainian diplomas; warns about a self-proclaimed structure in occupied Kherson *(Result date as shown: undated in results (occupation-era wording, 2022). Search-result lead, not read in full.)* |  |  |
| 8 | [KSU repository item '«Чорний лебідь» в історії Херсонського державного університ](https://ekhsuir.kspu.edu/items/57057904-cec1-46db-bbea-554f3265ea73) | KSU repository item '«Чорний лебідь» в історії Херсонського державного університету, або хроніки релокованого вишу' (relocation chronicle) *(Result date as shown: undated in results. Search-result lead, not read in full.)* |  |  |
| 9 | [education.ua profile: structural units include 'Медичний факультет' / 'Факультет](https://www.education.ua/universities/350/) | education.ua profile: structural units include 'Медичний факультет' / 'Факультет: Медицини, здоров'я та спорту'; offer '361I7 Терапія та реабілітація' (physical therapy), full-time; overall licence vo *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 10 | [Wikipedia article (title only; content not read)](https://en.wikipedia.org/wiki/Kherson_State_University) | Wikipedia article (title only; content not read) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 11 | [TSN report: a university in Kherson hit by drones/artillery; 'Kherson branch hea](https://tsn.ua/en/ato/kherson-under-attack-by-fpv-drones-and-artillery-a-university-was-hit-victims-reported-2738367.html) | TSN report: a university in Kherson hit by drones/artillery; 'Kherson branch head' quoted ('about three thousand students'); institution not identified in snippet *(Result date as shown: undated in results. Search-result lead, not read in full.)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [Ministry 'Study in Ukraine' portal entry (id 163, 'preparatory department') retu](https://universities.studyinukraine.gov.ua/en/minedu/university/163/preparatory-department)

Third-party pages (leads only, never a source): [2025 admission card under 'Медичний факультет': Chemistry master's, full-time, 4](https://vstup.osvita.ua/y2025/r10/48/1444612/); [Henichesk Professional College of KSU 2025 listing: vocational nursing ('Медсест](https://vstup.osvita.ua/y2025/r22/5076/); [2020 vstup.osvita.ua listing of KSU under Kherson region (r22), institution id 4](https://vstup.osvita.ua/y2020/r22/48/)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Kherson State University (search-result lead: kspu.edu page titles and Wikipedia article title; no official page read) | [Medical Faculty 'About' page (search snippet): teaching/research unit; 'prepares](https://www.kspu.edu/About/Faculty/Medicine/AboutMF.aspx?lang=en) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://kspu.edu/ | [Medical Faculty 'About' page (search snippet): teaching/research unit; 'prepares](https://www.kspu.edu/About/Faculty/Medicine/AboutMF.aspx?lang=en) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [Medical Faculty 'About' page (search snippet): teaching/research unit; 'prepares](https://www.kspu.edu/About/Faculty/Medicine/AboutMF.aspx?lang=en) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | unverified | LEAD: url: https://kspu.edu/About/Faculty/FBP/International_Student | [Medical Faculty 'About' page (search snippet): teaching/research unit; 'prepares](https://www.kspu.edu/About/Faculty/Medicine/AboutMF.aspx?lang=en) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: relocated | [Medical Faculty 'About' page (search snippet): teaching/research unit; 'prepares](https://www.kspu.edu/About/Faculty/Medicine/AboutMF.aspx?lang=en) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [Medical Faculty 'About' page (search snippet): teaching/research unit; 'prepares](https://www.kspu.edu/About/Faculty/Medicine/AboutMF.aspx?lang=en) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [Medical Faculty 'About' page (search snippet): teaching/research unit; 'prepares](https://www.kspu.edu/About/Faculty/Medicine/AboutMF.aspx?lang=en) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [Medical Faculty 'About' page (search snippet): teaching/research unit; 'prepares](https://www.kspu.edu/About/Faculty/Medicine/AboutMF.aspx?lang=en) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [Medical Faculty 'About' page (search snippet): teaching/research unit; 'prepares](https://www.kspu.edu/About/Faculty/Medicine/AboutMF.aspx?lang=en) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `medicine-department-of-medicine-medical-faculty-existence-of-a-current-222-medicine-intake-not-confirmed-lead-only` — Medicine (Department of Medicine, Medical Faculty) - existence of a current 222 Medicine intake NOT confirmed; lead only (medicine) | `programmes.medicine-department-of-medicine-medical-faculty-existence-of-a-current-222-medicine-intake-not-confirmed-lead-only.internationalAdmission`; `programmes.medicine-department-of-medicine-medical-faculty-existence-of-a-current-222-medicine-intake-not-confirmed-lead-only.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Medical Faculty 'About' page (search snippet): teaching/research unit; 'prepares](https://www.kspu.edu/About/Faculty/Medicine/AboutMF.aspx?lang=en) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `physical-therapy-shown-with-code-361i7-on-education-ua` — Терапія та реабілітація / фізична терапія (physical therapy) - shown with code '361I7' on education.ua (other) | `programmes.physical-therapy-shown-with-code-361i7-on-education-ua.internationalAdmission`; `programmes.physical-therapy-shown-with-code-361i7-on-education-ua.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Medical Faculty 'About' page (search snippet): teaching/research unit; 'prepares](https://www.kspu.edu/About/Faculty/Medicine/AboutMF.aspx?lang=en) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `nursing-offered-by-the-henichesk-professional-college-of-kherson-state-university-a-vocational-subdivision-not-a-university-degree` — Медсестринство (Nursing) - offered by the Henichesk Professional College of Kherson State University (Генічеський фаховий коледж ХДУ), a VOCATIONAL subdivision, not a university degree (nursing) | `programmes.nursing-offered-by-the-henichesk-professional-college-of-kherson-state-university-a-vocational-subdivision-not-a-university-degree.internationalAdmission`; `programmes.nursing-offered-by-the-henichesk-professional-college-of-kherson-state-university-a-vocational-subdivision-not-a-university-degree.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Medical Faculty 'About' page (search snippet): teaching/research unit; 'prepares](https://www.kspu.edu/About/Faculty/Medicine/AboutMF.aspx?lang=en) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Location lead as found (unverified): Kherson (legal seat lead: Admission Committee address 'Universitets'ka 27, Kherson' on a kspu.edu page). Reported relocated to Ivano-Frankivsk since 2022, working on the premises of Vasyl Stefanyk Precarpathian National University (kspu.edu Medicine department history page and fundraising page, undated in results; osvita.ua/consultations/86867, undated). The International Relations Office address shown on kspu.edu is in Ivano-Frankivsk.  
   Closure (fill): 
6. Relocation lead (unverified): Search-result leads (no official page read): the Medical Faculty's own history page says that 'after the start of the full-scale invasion in 2022, the faculty, together with the university, was moved to Ivano-Frankivsk' using the premises of Vasyl Stefanyk Precarpathian National University (https://www.kspu.edu/About/Faculty/Medicine/DepartmentOfMedicine/111.aspx?lang=en, undated). The fundraising page describes 'its temporary relocation to Ivano-Frankivsk, to the premises of Vasyl Stefanyk Precarpathian National University, in 2022' and says the Kherson buildings, assembly hall, observatory and 'all dormitories have been damaged' (https://www.kspu.edu/About/DepartmentAndServices/Fundraising.aspx?lang=en, undated). osvita.ua reports the university 'перемістився до Івано-Франківська, проводить набір студентів і видає українські дипломи' and warns not to confuse it with 'самопроголошеною структурою у захопленому окупантами Херсоні' (https://osvita.ua/consultations/86867/, undated in results, occupation-era wording). A KSU repository item is titled 'хроніки релокованого вишу' (https://ekhsuir.kspu.edu/items/57057904-cec1-46db-bbea-554f3265ea73, undated). The kspu.edu International Relations Office address is shown in Ivano-Frankivsk while the Admission Committee address is still 'Universitets'ka 27, Kherson'. The 2025 vstup.osvita.ua listing sits under region code r10 (vs r22 in 2017-2020), consistent with the move. Date of the relocation reports: 2022 (event year as stated by the pages); report dates not shown.  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: No 2025 admission offer for 222 Medicine found on vstup.osvita.ua; the only 2025 card tagged 'Медичний факультет' is a Chemistry master's. The inventory records the faculty page title as 'Medical Faculty (Archive)' and education.ua shows a renamed 'Факультет медицини, здоров'я та спорту' - the medicine programme may be discontinued, suspended or restructured. Do not list a medicine programme until an official 2026 admission page or EDEBO/NAQA record is read.  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: No lead of English-medium medical teaching or of foreign-applicant intake for medicine. The only English-medium lead is Economics (bachelor/master, 'IELTS 5.5+', on the FBP International Student page); the Medical Faculty 'Концепція викладання та використання англійської мови 2023-2027' is a policy document, not a programme.  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: Relocated institution: legal seat in Kherson (front-line city; campus buildings and all dormitories reported damaged), operating from another university's premises in Ivano-Frankivsk. Address data on official pages is mixed (Kherson for admissions, Ivano-Frankivsk for the international office).  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: Identity confusion: osvita.ua warns about a 'self-proclaimed structure' in occupied Kherson using the university's identity (occupation-era report). Any site or contact claiming to be 'Kherson State University' in Kherson under occupation administration must be rejected.  
   Closure (fill): 
11. Red flag to resolve before any fact is shown: Name confusion with other Kherson institutions that appeared in the same searches: Kherson State Maritime Academy (ksma.ks.ua), Kherson National Technical University (kntu.net.ua), Kherson State Agrarian and Economic University (ksau.kherson.ua), and the Kherson Basic Medical Professional College (inventory slug kherson-basic-medical-college). None of these is KSU.  
   Closure (fill): 
12. Red flag to resolve before any fact is shown: Two or three hosts in play: kspu.edu / www.kspu.edu / old.kspu.edu (legacy 'pedagogical university' domain), an admissions e-mail on ksu.kherson.ua, and a search-engine suggestion of 'ksu.ks.ua' that is unverified and must not be used.  
   Closure (fill): 
13. Red flag to resolve before any fact is shown: The Henichesk Professional College of KSU offers vocational nursing and medical-massage programmes (фаховий молодший бакалавр). These are college-level, not university degrees, and must not be presented as KSU medicine/nursing degrees; Henichesk lies in the occupied part of Kherson oblast (general knowledge; the college's relocation status was not found in these searches).  
   Closure (fill): 
14. Red flag to resolve before any fact is shown: A TSN report of a university in Kherson 'hit' by FPV drones quotes a 'Kherson branch head' ('We had about three thousand students'); the article did not show which university was meant, so it is not attributed to KSU here.  
   Closure (fill): 
15. Missing evidence: Whether KSU currently runs (and admits to) a 222 Medicine master's programme at all: no 2025 admission offer, licence volume or NAQA accreditation record found; the faculty page is archived/renamed. Needs the official 2026 Rules of Admission (Правила прийому) or the vstup.osvita.ua y2025/y2026 r10/48 listing for field 22 'Охорона здоров'я', read in full.  
   Closure (fill): 
16. Missing evidence: EDEBO registry entry (licence for 222 Medicine, 226 Pharmacy, 221 Dentistry, 223 Nursing, or the new I-series health codes) and NAQA accreditation certificates: not found.  
   Closure (fill): 
17. Missing evidence: Whether any medicine/health programme at KSU is open to foreign applicants, and whether any is taught in English: no lead found (only Economics shows English-medium teaching and IELTS requirement).  
   Closure (fill): 
18. Missing evidence: Confirmation of the official domain: kspu.edu is the consistent lead, but the admissions e-mail is on ksu.kherson.ua and the suggested 'ksu.ks.ua' is unverified; no official page could be opened.  
   Closure (fill): 
19. Missing evidence: Official English and Ukrainian legal names (statute/EDEBO form) and ownership (state) confirmed from an official register rather than directory listings.  
   Closure (fill): 
20. Missing evidence: Current operating base and address for applicants (Ivano-Frankivsk premises vs Kherson legal address), and the date of the most recent official statement on relocation.  
   Closure (fill): 
21. Missing evidence: Whether the 'Study in Ukraine' portal entry id 163 belongs to KSU, and what it lists.  
   Closure (fill): 
22. Missing evidence: Status and location of the Henichesk Professional College (occupied-territory risk) and whether it is still an operating KSU subdivision.  
   Closure (fill): 
23. Missing evidence: Any fee, duration or quota figures for health programmes: none found; nothing should be published.  
   Closure (fill): 
24. Skeptic's note: Medicine (222) must NOT be presented as a current programme: no 2025 or 2026 admission card for Medicine was found, the faculty appears renamed 'Факультет медицини, здоров'я та спорту' and the old faculty page is titled 'Medical Faculty (Archive)'. The qualifying degree lead is a 2026 Pharmacy master's card, seen only in search summaries of an EDEBO-fed aggregator (page not opened).  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/kherson-state-university.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
