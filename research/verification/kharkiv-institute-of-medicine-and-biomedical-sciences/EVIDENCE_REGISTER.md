# Evidence register — Kharkiv Institute of Medicine and Biomedical Sciences (`kharkiv-institute-of-medicine-and-biomedical-sciences`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/kharkiv-institute-of-medicine-and-biomedical-sciences.json`, checked 2026-10-24): **blocked**. Tested on 2026-10-24 from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: khim.edu.ua, universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua. Probe on 2026-10-24T16:30:56Z over the fourth host list (research/verification/ALLOWLIST_P4.txt, 32 hosts): 32 refused at the environment's proxy under its network policy (403 to CONNECT), 0 open. No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. A refused request is an access limitation, never evidence about the institution.

**Record under verification:** `site/src/content/universities/kharkiv-institute-of-medicine-and-biomedical-sciences.json` — 0 programme(s) with an official-domain lead of international admission (); 4 deferred programme(s) kept unpublished until eligibility is read (Medicine (speciality 222 Medicine), Nursing (сестринська справа) – reported new bachelor programme, Psychology – reported new bachelor programme, Management and Business Administration – reported new bachelor programme).

**Evidence store:** `site/data/evidence/kharkiv-institute-of-medicine-and-biomedical-sciences.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `kharkiv-institute-of-medicine-and-biomedical-sciences--NN--short-name.pdf` where NN is the row number of this register (e.g. `kharkiv-institute-of-medicine-and-biomedical-sciences--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/kharkiv-institute-of-medicine-and-biomedical-sciences.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [osvita.ua news: 'Харківській інститут медицини та біомедичних наук стає Універси](https://osvita.ua/news/96051/) | osvita.ua news: 'Харківській інститут медицини та біомедичних наук стає Університетом медицини та соціальних наук' — rename report; president Anton Smirnov quoted; new bachelor programmes in psycholog *(Result date as shown: undated in search result; MON register dated 05.05.2026 already carries the new name. Search-result lead, not read in full.)* |  |  |
| 2 | [EQAR/DEQAR institution entry titled 'Kharkiv Institute of Medicine and Biomedica](https://www.eqar.eu/qa-results/search/by-institution/institution/?id=9491) | EQAR/DEQAR institution entry titled 'Kharkiv Institute of Medicine and Biomedical Sciences' *(Result date as shown: unknown. Search-result lead, not read in full.)* |  |  |
| 3 | [Business directory: 'Kharkiv Institute of Medicine and Biomedical Sciences of PH](https://village.ai/company/khim) | Business directory: 'Kharkiv Institute of Medicine and Biomedical Sciences of PHEE Kyiv Medical University', domain khim.edu.ua, founded 2017 *(Result date as shown: unknown. Search-result lead, not read in full.)* |  |  |
| 4 | [Lecturio MedEd Atlas: private, 'currently operational', instruction in English a](https://mededatlas.lecturio.com/school/kharkiv-institute-of-medicine-and-biomedical-sciences) | Lecturio MedEd Atlas: private, 'currently operational', instruction in English and Ukrainian, start year 2018; many fields 'TBA' *(Result date as shown: unknown. Search-result lead, not read in full.)* |  |  |
| 5 | [education.ua profile under the new name: ~238 students, 69 teachers, faculty of ](https://www.education.ua/universities/886/) | education.ua profile under the new name: ~238 students, 69 teachers, faculty of medicine, dormitory, preparatory department, military department (third-party, unverified) *(Result date as shown: unknown. Search-result lead, not read in full.)* |  |  |
| 6 | [Kharkiv Oblast administration list of private higher-education institutions (ret](https://kharkivoda.gov.ua/content/documents/149/14826/Attaches/spisok_privatnih_zakladiv_vischoyi_osviti_1_.pdf) | Kharkiv Oblast administration list of private higher-education institutions (returned for the new name; PDF not read) *(Result date as shown: unknown. Search-result lead, not read in full.)* |  |  |
| 7 | [Kyiv Medical University document returned in the search for the new name (not re](https://kmu.edu.ua/wp-content/uploads/2020/05/KMU_FaFa_2020_UKRENG_v3.pdf) | Kyiv Medical University document returned in the search for the new name (not read) — weak lead for the KMU relationship *(Result date as shown: 2020-05 (from URL path). Search-result lead, not read in full.)* |  |  |
| 8 | [Profile of the different private 'Харківський міжнародний медичний університет' ](https://www.education.ua/universities/922/) | Profile of the different private 'Харківський міжнародний медичний університет' (Kharkiv International Medical University) — name-confusion reference *(Result date as shown: unknown. Search-result lead, not read in full.)* |  |  |
| 9 | [Agent listing for Kharkiv International Medical University (khimu.edu.ua) return](https://www.selectyouruniversity.com/university/kharkiv-international-medical-university/) | Agent listing for Kharkiv International Medical University (khimu.edu.ua) returned when searching this institution's name — shows confusion risk; its fee figures do not apply here *(Result date as shown: 2026-27 admission cycle (per title). Search-result lead, not read in full.)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [Ministry of Education licence register of higher-education providers, Kharkiv ob](https://mon.gov.ua/ministerstvo-2/poslugi/litsenzuvannya/litsenziyniy-reestr-subektiv-osvitnoi-diyalnosti/litsenziyniy-reestr-subektiv-osvitnoi-diyalnosti-u-sferi-vishchoi-osviti/kharkivska-oblast-2); [NAQA (English) record: Medicine speciality 222, Master's level, accredited by AH](https://en.naqa.gov.ua/?p=5910); [Earlier NAQA (English) record: AHPGS experts required an in-person visit; term c](https://en.naqa.gov.ua/?p=1676); [Further NAQA (English) record for the institution (returned in search; content n](https://en.naqa.gov.ua/?p=5033)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Private Higher Education Institution "University of Medicine and Social Sciences" (English rendering of the registered Ukrainian name; no official English form found in search results). Formerly "Kharkiv Institute of Medicine and Biomedical Sciences", the name still used in NAQA (English), EQAR and third-party listings. | [osvita.ua news: 'Харківській інститут медицини та біомедичних наук стає Універси](https://osvita.ua/news/96051/) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://khim.edu.ua/ | [osvita.ua news: 'Харківській інститут медицини та біомедичних наук стає Універси](https://osvita.ua/news/96051/) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [osvita.ua news: 'Харківській інститут медицини та біомедичних наук стає Універси](https://osvita.ua/news/96051/) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | not-published | — (no lead) | [osvita.ua news: 'Харківській інститут медицини та біомедичних наук стає Універси](https://osvita.ua/news/96051/) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [osvita.ua news: 'Харківській інститут медицини та біомедичних наук стає Універси](https://osvita.ua/news/96051/) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [osvita.ua news: 'Харківській інститут медицини та біомедичних наук стає Універси](https://osvita.ua/news/96051/) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [osvita.ua news: 'Харківській інститут медицини та біомедичних наук стає Універси](https://osvita.ua/news/96051/) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [osvita.ua news: 'Харківській інститут медицини та біомедичних наук стає Універси](https://osvita.ua/news/96051/) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [osvita.ua news: 'Харківській інститут медицини та біомедичних наук стає Універси](https://osvita.ua/news/96051/) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `medicine-speciality-222-medicine` — Medicine (speciality 222 Medicine) (medicine) | `programmes.medicine-speciality-222-medicine.internationalAdmission`; `programmes.medicine-speciality-222-medicine.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua news: 'Харківській інститут медицини та біомедичних наук стає Універси](https://osvita.ua/news/96051/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `nursing-reported-new-bachelor-programme` — Nursing (сестринська справа) – reported new bachelor programme (nursing) | `programmes.nursing-reported-new-bachelor-programme.internationalAdmission`; `programmes.nursing-reported-new-bachelor-programme.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua news: 'Харківській інститут медицини та біомедичних наук стає Універси](https://osvita.ua/news/96051/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `psychology-reported-new-bachelor-programme` — Psychology – reported new bachelor programme (other) | `programmes.psychology-reported-new-bachelor-programme.internationalAdmission`; `programmes.psychology-reported-new-bachelor-programme.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua news: 'Харківській інститут медицини та біомедичних наук стає Універси](https://osvita.ua/news/96051/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `management-and-business-administration-reported-new-bachelor-programme` — Management and Business Administration – reported new bachelor programme (other) | `programmes.management-and-business-administration-reported-new-bachelor-programme.internationalAdmission`; `programmes.management-and-business-administration-reported-new-bachelor-programme.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua news: 'Харківській інститут медицини та біомедичних наук стає Універси](https://osvita.ua/news/96051/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Relocation lead (unverified): No relocation lead found. Every lead places the institution in Kharkiv: the Ministry of Education licence register for Kharkiv oblast (data stated as current at 05.05.2026) lists ПЗВО "Університет медицини та соціальних наук", and the education.ua profile (undated) shows a Kharkiv institution with a faculty of medicine, dormitory, preparatory department and military department (~238 students, 69 teachers; third-party figures, unverified). The osvita.ua rename report quotes president Anton Smirnov: "зміна назви не вплине на навчальний процес. Усі освітні програми, документи та права студентів залишаються без змін". Kharkiv is a frontline city; the teaching format (in-person/online) during hostilities is unverified. Rename date not shown in the search results.  
   Closure (fill): 
6. Red flag to resolve before any fact is shown: Identity split across sources: the MON register and osvita.ua carry the new name 'Університет медицини та соціальних наук', while NAQA (English), EQAR, Lecturio and directories still use 'Kharkiv Institute of Medicine and Biomedical Sciences'; the domain lead khim.edu.ua comes from a third-party directory and may be stale after the rename (no new domain found).  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: Relationship to PHEE 'Kyiv Medical University' (inventory slug kyiv-medical-university) is unexplained: a directory names it 'Kharkiv Institute of Medicine and Biomedical Sciences of PHEE Kyiv Medical University' and a KMU document surfaced in the rename search, yet the MON register lists it as a separate private HEI under the new name. Whether it was a KMU branch that became a separate legal entity, and when, is unverified.  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: Accreditation of the only medical degree programme (Medicine 222, Master's) was granted by AHPGS for one year only, until 21 October 2026 (NAQA, decision 14 Oct 2025) — that date has passed as of 2026-10-24 and no renewal lead was found; the 2021 NAQA record shows a conditional term pending an on-site visit.  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: Name confusion risk with two other Kharkiv institutions: Kharkiv International Medical University (KhIMU, khimu.edu.ua, private; inventory slug kharkiv-international-medical-university) and the state Kharkiv National Medical University (KNMU). Agent sites returned for this institution's name actually describe KhIMU/KNMU fees and MBBS intakes — none of those figures apply here.  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: No international-applicants page, English-medium programme page, tuition or admissions information for foreigners was found; the only English-medium lead is a third-party atlas entry (Lecturio) with most fields marked 'TBA'.  
   Closure (fill): 
11. Red flag to resolve before any fact is shown: Young and small institution per third-party leads: founded 2017 (village.ai) or 2018 (Lecturio); ~238 students and 69 teachers (education.ua) — figures unverified.  
   Closure (fill): 
12. Red flag to resolve before any fact is shown: Kharkiv is a frontline city; teaching format and campus access during hostilities unverified (no relocation report found either way).  
   Closure (fill): 
13. Red flag to resolve before any fact is shown: Dentistry and pharmacy: no programme leads found; the directory must not imply them.  
   Closure (fill): 
14. Missing evidence: Official website: no page read; current domain after the rename unknown (khim.edu.ua is a third-party directory lead only).  
   Closure (fill): 
15. Missing evidence: Official English name of the renamed institution (the English form 'University of Medicine and Social Sciences' is a translation).  
   Closure (fill): 
16. Missing evidence: Date and legal basis of the rename (institute to university); institution type after the rename (register shows 'університет' in the name but no structure was seen).  
   Closure (fill): 
17. Missing evidence: EDEBO entry: licence number, legal-entity (ЄДРПОУ) code, licensed specialities and volumes (222 Medicine, 223 Nursing, others).  
   Closure (fill): 
18. Missing evidence: Current accreditation status of Medicine 222 after 21 Oct 2026 (AHPGS/NAQA); the 2021 conditional term and whether the extension to 30 Sept 2027 was granted.  
   Closure (fill): 
19. Missing evidence: Admission of foreign applicants, English-medium teaching, tuition, international office contact and application procedure — no official lead found.  
   Closure (fill): 
20. Missing evidence: Legal relationship to PHEE 'Kyiv Medical University' (former branch? separate entity? date of separation).  
   Closure (fill): 
21. Missing evidence: Teaching format and campus access in Kharkiv during hostilities; any relocation or distance-learning arrangement.  
   Closure (fill): 
22. Missing evidence: Ministry 'Study in Ukraine' portal listing (not found).  
   Closure (fill): 
23. Missing evidence: Verification of third-party figures: founding year (2017 vs 2018), ~238 students, 69 teachers.  
   Closure (fill): 
24. Missing evidence: Confirmation that no dentistry or pharmacy programme exists (none found; absence not proven).  
   Closure (fill): 
25. Skeptic's note: Identity split: the MON higher-education licence register (Kharkiv oblast, stated current at 05.05.2026) and an osvita.ua news item carry a new name, ПЗВО «Університет медицини та соціальних наук», while NAQA (English), EQAR, Lecturio and directories still use 'Kharkiv Institute of Medicine and Biomedical Sciences'. The rename date, legal basis and official English form are unconfirmed; no English source uses the new name.  
   Closure (fill): 
26. Skeptic's note: Relationship to the candidate kyiv-medical-university is unexplained: one directory (village.ai) calls it 'Kharkiv Institute of Medicine and Biomedical Sciences of PHEE Kyiv Medical University', yet the MON register lists it as a separate private HEI. Treated as a separate institution on the strength of the register lead; not confirmed.  
   Closure (fill): 
27. Skeptic's note: Only medical degree lead (Medicine 222, Master's) was accredited by AHPGS for one year to 21 Oct 2026 per NAQA; that date has passed and no renewal lead exists. Open question, not a bar for a name-only listing.  
   Closure (fill): 
28. Skeptic's note: Domain khim.edu.ua is a third-party directory lead (low confidence) and may be stale after the rename; no new domain found.  
   Closure (fill): 
29. Skeptic's note: Name-confusion risk with Kharkiv International Medical University (candidate) and Kharkiv National Medical University (listed); agent sites returned for this name actually describe those two.  
   Closure (fill): 
30. Skeptic's note: No foreign-applicant, English-medium or admissions page found (not required for the name-only tier).  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/kharkiv-institute-of-medicine-and-biomedical-sciences.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
