# Evidence register — Lviv Medical University (private) (`lviv-medical-institute`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/lviv-medical-institute.json`, checked 2026-10-24): **blocked**. Tested on 2026-10-24 from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua. Probe on 2026-10-24T16:30:56Z over the fourth host list (research/verification/ALLOWLIST_P4.txt, 32 hosts): 32 refused at the environment's proxy under its network policy (403 to CONNECT), 0 open. No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. A refused request is an access limitation, never evidence about the institution.

**Record under verification:** `site/src/content/universities/lviv-medical-institute.json` — 0 programme(s) with an official-domain lead of international admission (); 5 deferred programme(s) kept unpublished until eligibility is read (Медицина (Medicine), Стоматологія (Dentistry), Фармація (Pharmacy), Медична психологія (Medical Psychology), Терапія та реабілітація (Therapy and Rehabilitation)).

**Evidence store:** `site/data/evidence/lviv-medical-institute.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `lviv-medical-institute--NN--short-name.pdf` where NN is the row number of this register (e.g. `lviv-medical-institute--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/lviv-medical-institute.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [osvita.ua guide entry for ВПНЗ «Львівський медичний університет»: training direc](https://osvita.ua/vnz/guide/330/) | osvita.ua guide entry for ВПНЗ «Львівський медичний університет»: training directions Фармація, Терапія та реабілітація, Медицина, Медична психологія, Стоматологія; page shown as updated 14.07.2026 *(Result date as shown: 2026-07-14 (as marked on the aggregator page). Search-result lead, not read in full.)* |  |  |
| 2 | [education.ua profile 'Львівський медичний університет (ЛМУ), ВПНЗ' / Russian for](https://www.education.ua/universities/324/) | education.ua profile 'Львівський медичний університет (ЛМУ), ВПНЗ' / Russian form 'Высшее частное учебное заведение «Львовский медицинский университет»'; 651 students, 107 teaching staff; EDEBO-derive *(Result date as shown: undated page showing the 2026 admission campaign. Search-result lead, not read in full.)* |  |  |
| 3 | [Third-party directory 'Lviv Medical Institute': described as established in 2004](https://www.uni2study.com/universities/ukraine/lviv-medical-institute) | Third-party directory 'Lviv Medical Institute': described as established in 2004, private, Lviv; little programme detail; page itself advises cross-checking with the official website *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 4 | [Encyclopedia of Modern Ukraine PDF mentioning a private 'Львівський медичний уні](https://esu.com.ua/pdf/file/891342.pdf) | Encyclopedia of Modern Ukraine PDF mentioning a private 'Львівський медичний університет' where physician Mar'yana Regeda worked — confirms a private LMU exists, nothing on founding date or rector *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 5 | [Suspilne article on foreign students in Lviv during the war: '10 іноземних студе](https://suspilne.media/592639-a-obrav-zalisitisa-v-ukraini-ak-studenti-inozemci-navcautsa-u-lvovi-popri-vijnu/) | Suspilne article on foreign students in Lviv during the war: '10 іноземних студентів' enrolled in first year of 'Львівського медуніверситету', intake to 15 December, USD 5,000/year for foreigners, Pol *(Result date as shown: undated in snippet. Search-result lead, not read in full.)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [NAQA document that surfaced for the name query but concerns the state Danylo Hal](https://naqa.gov.ua/wp-content/uploads/2019/10/035.pdf); [Study in Ukraine portal programme list URL surfaced in results; snippet did not ](https://studyinukraine.gov.ua/study-in-ukraine/programmes-and-courses/?areas=22)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Higher Private Educational Institution "Lviv Medical University" (working translation of the Ukrainian legal name; no official English form found in search results) | [osvita.ua guide entry for ВПНЗ «Львівський медичний університет»: training direc](https://osvita.ua/vnz/guide/330/) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | not-published | — (no lead) | [osvita.ua guide entry for ВПНЗ «Львівський медичний університет»: training direc](https://osvita.ua/vnz/guide/330/) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [osvita.ua guide entry for ВПНЗ «Львівський медичний університет»: training direc](https://osvita.ua/vnz/guide/330/) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | not-published | — (no lead) | [osvita.ua guide entry for ВПНЗ «Львівський медичний університет»: training direc](https://osvita.ua/vnz/guide/330/) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [osvita.ua guide entry for ВПНЗ «Львівський медичний університет»: training direc](https://osvita.ua/vnz/guide/330/) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [osvita.ua guide entry for ВПНЗ «Львівський медичний університет»: training direc](https://osvita.ua/vnz/guide/330/) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [osvita.ua guide entry for ВПНЗ «Львівський медичний університет»: training direc](https://osvita.ua/vnz/guide/330/) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [osvita.ua guide entry for ВПНЗ «Львівський медичний університет»: training direc](https://osvita.ua/vnz/guide/330/) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [osvita.ua guide entry for ВПНЗ «Львівський медичний університет»: training direc](https://osvita.ua/vnz/guide/330/) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `medicine` — Медицина (Medicine) (medicine) | `programmes.medicine.internationalAdmission`; `programmes.medicine.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua guide entry for ВПНЗ «Львівський медичний університет»: training direc](https://osvita.ua/vnz/guide/330/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `dentistry` — Стоматологія (Dentistry) (dentistry) | `programmes.dentistry.internationalAdmission`; `programmes.dentistry.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua guide entry for ВПНЗ «Львівський медичний університет»: training direc](https://osvita.ua/vnz/guide/330/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `pharmacy` — Фармація (Pharmacy) (pharmacy) | `programmes.pharmacy.internationalAdmission`; `programmes.pharmacy.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua guide entry for ВПНЗ «Львівський медичний університет»: training direc](https://osvita.ua/vnz/guide/330/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `medical-psychology` — Медична психологія (Medical Psychology) (other) | `programmes.medical-psychology.internationalAdmission`; `programmes.medical-psychology.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua guide entry for ВПНЗ «Львівський медичний університет»: training direc](https://osvita.ua/vnz/guide/330/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `therapy-and-rehabilitation` — Терапія та реабілітація (Therapy and Rehabilitation) (other) | `programmes.therapy-and-rehabilitation.internationalAdmission`; `programmes.therapy-and-rehabilitation.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua guide entry for ВПНЗ «Львівський медичний університет»: training direc](https://osvita.ua/vnz/guide/330/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Relocation lead (unverified): No relocation lead. All leads place the institution in Lviv; education.ua shows an EDEBO-derived admission offer for the 2026 intake (applications 19 July – 1 August 2026) and osvita.ua marks its page as updated 14.07.2026, which together suggest current operation. Nursing programme: not found.  
   Closure (fill): 
6. Red flag to resolve before any fact is shown: Official website/domain not surfaced in six searches; every lead is an aggregator (osvita.ua, education.ua, uni2study) or an encyclopaedia mention — unusual for an operating HEI and the official domain remains unsettled.  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: Severe name confusion with the listed state institution Danylo Halytsky Lviv National Medical University (ЛНМУ), which English-language agents also call 'Lviv Medical University' and whose own history begins as 'Львівський державний медичний інститут' (1939); most results for 'Lviv Medical University/Institute' refer to the state university, so any fee, English-medium or recognition claim found under that name must not be attributed to the private ВПНЗ.  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: Rename from 'Львівський медичний інститут' to 'Львівський медичний університет' and licence/legal-form continuity: no lead found (only uni2study lists 'Lviv Medical Institute, private, established 2004'); founding year, founder and rector unconfirmed.  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: No lead shows admission of foreign applicants or English-medium teaching at this institution. A Suspilne article (https://suspilne.media/592639-...) says 'на перший курс Львівського медуніверситету зарахували 10 іноземних студентів ... п'ять тисяч доларів на рік', but the snippet does not identify which Lviv medical university and the article is undated — cannot be attributed.  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: Programme levels, licence volumes and accreditation status for Medicine, Dentistry and Pharmacy are not shown in any lead; only field names and one EDEBO-derived 2026 dentistry offer (contract places only, no state-funded places) are visible.  
   Closure (fill): 
11. Missing evidence: Official website and domain (no host surfaced; none could be opened from this environment).  
   Closure (fill): 
12. Missing evidence: Official English name as used by the institution itself.  
   Closure (fill): 
13. Missing evidence: EDEBO registry entry: institution ID, legal form, licensed specialties (222 Medicine, 221 Dentistry, 226 Pharmacy) and licence volumes.  
   Closure (fill): 
14. Missing evidence: MES licence register entry and NAQA accreditation decisions/certificates per programme.  
   Closure (fill): 
15. Missing evidence: Documentary evidence of the rename 'Львівський медичний інститут' → 'Львівський медичний університет' (date, founder decision, MES order) and legal-form continuity.  
   Closure (fill): 
16. Missing evidence: Founding year (2004 appears only on uni2study), founder and current rector.  
   Closure (fill): 
17. Missing evidence: Degree level (Master/Bachelor) of each programme; whether Medicine and Pharmacy have current 2026 intakes (only Dentistry seen on education.ua).  
   Closure (fill): 
18. Missing evidence: Any page or policy on admission of foreign applicants, language of instruction (English-medium not evidenced), tuition for foreigners and the international office contact.  
   Closure (fill): 
19. Missing evidence: Whether the Suspilne '10 foreign students' report refers to this institution or to the state LNMU.  
   Closure (fill): 
20. Missing evidence: Study in Ukraine (studyinukraine.gov.ua) portal listing.  
   Closure (fill): 
21. Missing evidence: Nursing programme: not found in any lead.  
   Closure (fill): 
22. Skeptic's note: Official website/domain not surfaced in any of the researcher's six searches or mine — unusual for an operating HEI; officialDomain stays empty. The planned EDRPOU follow-up (opendatabot record 46005015 returned for the name query, name on record not shown) did not run.  
   Closure (fill): 
23. Skeptic's note: Rename lead undocumented: slug and uni2study use 'Lviv Medical Institute' (private, est. 2004) while every current Ukrainian lead uses 'Вищий приватний навчальний заклад «Львівський медичний університет»'; no founder decision or MES order found and legal-form continuity unconfirmed.  
   Closure (fill): 
24. Skeptic's note: No lead for foreign-applicant admission or English-medium teaching; a Suspilne article about 10 foreign first-years at 'Львівський медуніверситет' does not identify which Lviv institution.  
   Closure (fill): 
25. Skeptic's note: Programme levels, licence volumes and accreditation unknown; only the 2026 Dentistry offer (90 contract places) is EDEBO-derived; Medicine and Pharmacy appear only in the osvita.ua programme list.  
   Closure (fill): 
26. Skeptic's note: Severe name confusion with the listed state Danylo Halytsky Lviv National Medical University, which English-language agents also call 'Lviv Medical University'.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/lviv-medical-institute.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
