# Evidence register — Oles Honchar Dnipro National University (`oles-honchar-dnipro-national-university`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/oles-honchar-dnipro-national-university.json`, checked 2026-10-24): **blocked**. Tested on 2026-10-24 from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: dnu.dp.ua, universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua. Probe on 2026-10-24T16:30:56Z over the fourth host list (research/verification/ALLOWLIST_P4.txt, 32 hosts): 32 refused at the environment's proxy under its network policy (403 to CONNECT), 0 open. No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. A refused request is an access limitation, never evidence about the institution.

**Record under verification:** `site/src/content/universities/oles-honchar-dnipro-national-university.json` — 0 programme(s) with an official-domain lead of international admission (); 7 deferred programme(s) kept unpublished until eligibility is read (223 Медсестринство / Nursing, 223 Медсестринство / Nursing (master's educational programme, 'ONP' in filename), 227 Фізична терапія, ерготерапія / Physical therapy, occupational therapy (field 227 Therapy and Rehabilitation), 224 Технології медичної діагностики та лікування / Technologies of medical diagnostics and treatment, 224 Technologies of medical diagnostics and treatment, specialisation 'Лабораторна діагностика' / Laboratory diagnostics, 224 Technologies of medical diagnostics and treatment — educational-scientific (PhD) programme, code 47810, Public health (partner-report lead only, unconfirmed)).

**Evidence store:** `site/data/evidence/oles-honchar-dnipro-national-university.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `oles-honchar-dnipro-national-university--NN--short-name.pdf` where NN is the row number of this register (e.g. `oles-honchar-dnipro-national-university--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/oles-honchar-dnipro-national-university.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [English name; 'state-sponsored public university ... affiliated with the Ministr](https://en.wikipedia.org/wiki/Oles_Honchar_Dnipro_National_University) | English name; 'state-sponsored public university ... affiliated with the Ministry of Education and Science of Ukraine'; history (1918 Ekaterynoslavasky University, 1933 Dnipropetrovsk State University *(Result date as shown: undated (search 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 2 | ['Admission of Foreigners to Study at Oles Honchar Dnipro National University': p](https://www.dnu.dp.ua/en/admission_of_foreigners) | 'Admission of Foreigners to Study at Oles Honchar Dnipro National University': preparatory faculty, language courses, postgraduate/advanced-training/internship; in-person or remote; enrolment via Unif *(Result date as shown: undated (search 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 3 | [International Students Office: 72 Nauky Avenue, Dnipro, office 117; int.educatio](https://www.dnu.dp.ua/en/International_Students_Office) | International Students Office: 72 Nauky Avenue, Dnipro, office 117; int.education.dnu@gmail.com; +38 (056) 374-98-16; Mon–Fri 8:00–16:30; subordinated to the Rector and Vice-Rector for International R *(Result date as shown: undated (search 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 4 | ['DNU 2024' news: 88 bachelor's and 64 master's programmes](https://www.dnu.dp.ua/ennews/138) | 'DNU 2024' news: 88 bachelor's and 64 master's programmes *(Result date as shown: 2024. Search-result lead, not read in full.)* |  |  |
| 5 | [DNU news: graduates of the medical faculty practise at Mechnikov Regional Clinic](https://www.dnu.dp.ua/ennews/110) | DNU news: graduates of the medical faculty practise at Mechnikov Regional Clinical Hospital; training covers physical rehabilitation, occupational therapy, laboratory diagnostics and nursing *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 6 | [DNU–Charles University partnership news (operating-status lead)](https://www.dnu.dp.ua/ennews/189) | DNU–Charles University partnership news (operating-status lead) *(Result date as shown: undated (recent). Search-result lead, not read in full.)* |  |  |
| 7 | [Medical University of Bialystok agreement news: faculty offers nursing, public h](https://www.umb.edu.pl/en/international_cooperation/news/31015,Agreement_with_Oles_Honchar_Dnipro_National_University) | Medical University of Bialystok agreement news: faculty offers nursing, public health, physiotherapy and medical diagnostics; DNU had 86 international agreements by 2025 *(Result date as shown: 2025. Search-result lead, not read in full.)* |  |  |
| 8 | [Aggregator structure page: faculty specialities 227 (Therapy and Rehabilitation)](https://abitly.org/en/universities/dnu-111/structure) | Aggregator structure page: faculty specialities 227 (Therapy and Rehabilitation), 223 (Nursing), 231 (Social Work), Medical Diagnostics (truncated) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 9 | [DNU order no. 858с of 20 Aug 2024 for the ФМТДР faculty (competitive scores / ba](https://dnu.dp.ua/docs/vstup/2024/nakazy/858%D1%81%20%D0%B2%D1%96%D0%B4%2020_08_2024%20%D0%A4%D0%9C%D0%A2%D0%94%D0%A0%20%D0%BF%D0%B7%D1%81%D0%BE.pdf) | DNU order no. 858с of 20 Aug 2024 for the ФМТДР faculty (competitive scores / bachelor places incl. 223) *(Result date as shown: 2024-08-20. Search-result lead, not read in full.)* |  |  |
| 10 | [Master's programme 223 Медсестринство, 2022–2024 editions; 'Галузь знань – 22 Ох](https://www.dnu.dp.ua/docs/osvitni_programy/redakcii_2021_2024/m_223_ONP___2022-2024.pdf) | Master's programme 223 Медсестринство, 2022–2024 editions; 'Галузь знань – 22 Охорона здоров'я' *(Result date as shown: 2022–2024. Search-result lead, not read in full.)* |  |  |
| 11 | [Master's programme 223, 2020 intake; 'Наявність акредитації ... До проходження п](https://www.dnu.dp.ua/docs/osvitni_programy/nabir_20_21_m/17_09_21/m_2020_223_ONP.pdf) | Master's programme 223, 2020 intake; 'Наявність акредитації ... До проходження первинної акредитації' (outdated) *(Result date as shown: 2020/2021. Search-result lead, not read in full.)* |  |  |
| 12 | [Bachelor 227 Фізична терапія, ерготерапія programme; department of general medic](https://www.dnu.dp.ua/docs/osvitni_programy/2022/b_227_TR_FTE_opp__2024.pdf) | Bachelor 227 Фізична терапія, ерготерапія programme; department of general medicine with a course of physical therapy; updated for 2024/25, amended Dec 2025; professional standard 'Асистент фізичного  *(Result date as shown: 2024/2025. Search-result lead, not read in full.)* |  |  |
| 13 | [2025 expert-group accreditation report, bachelor 227; references naqa.gov.ua and](https://dnu.dp.ua/docs/osvitni_programy/vidomosti/2025/2025_zvit_EG_b_227.pdf) | 2025 expert-group accreditation report, bachelor 227; references naqa.gov.ua and ЄДЕБО *(Result date as shown: 2025. Search-result lead, not read in full.)* |  |  |
| 14 | [Project educational programme 2026–2027 (227 per search summary)](https://www.dnu.dp.ua/docs/osvitni_programy/2026-2027/31_03/b_I7_opp_2026_project.pdf) | Project educational programme 2026–2027 (227 per search summary) *(Result date as shown: 2026. Search-result lead, not read in full.)* |  |  |
| 15 | [Sectoral expert council conclusion on PhD programme 47810 Технології медичної ді](https://www.dnu.dp.ua/docs/osvitni_programy/2025/2025_vysnovok_GER_PhD_224.pdf) | Sectoral expert council conclusion on PhD programme 47810 Технології медичної діагностики та лікування *(Result date as shown: 2025. Search-result lead, not read in full.)* |  |  |
| 16 | [NAQA decision document on PhD 224 (hosted by DNU; outcome not shown)](https://www.dnu.dp.ua/docs/osvitni_programy/2026/2026_rischennia%20NA_PhD_224.pdf) | NAQA decision document on PhD 224 (hosted by DNU; outcome not shown) *(Result date as shown: 2026. Search-result lead, not read in full.)* |  |  |
| 17 | [Aggregator: 'International students are welcome to apply for enrollment'; accept](https://www.unirank.org/ua/uni/oles-honchar-dnipro-national-university/) | Aggregator: 'International students are welcome to apply for enrollment'; acceptance rate 20–29%; tuition US$1,000–2,499/yr for international students (unverified) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 18 | [DNU fact sheet: 7,142 students, 166 international (older figure)](https://www.dnu.dp.ua/docs/Megdunarodnoe/DNUFactSheet.pdf) | DNU fact sheet: 7,142 students, 166 international (older figure) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 19 | [THE profile: ~3,000 international students from 20+ countries (apparently older ](https://timeshighereducation.com/world-university-rankings/oles-honchar-dnipro-national-university) | THE profile: ~3,000 international students from 20+ countries (apparently older figure) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 20 | [osvita.ua university guide entry (surfaced; content not shown)](https://osvita.ua/vnz/guide/17/208/) | osvita.ua university guide entry (surfaced; content not shown) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [MoES licensing-commission protocol surfaced for the DNU licence query; DNU-speci](https://mon.gov.ua/storage/app/media/protokoly-zasidan-litsenziynoi-komisii/2018/_88%20.pdf)

Third-party pages (leads only, never a source): [223 Медсестринство bachelor, full-time, year-1 entry on complete general seconda](https://vstup.osvita.ua/y2024/r5/111/584337/); ['Спеціальність: 224. Технології медичної діагностики та лікування' listing](https://vstup.osvita.ua/y2017/r5/111/372841/); [224 bachelor (field Охорона здоров'я) / 224 master's specialisation Лабораторна ](https://vstup.osvita.ua/y2024/r5/111/1300175/)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Oles Honchar Dnipro National University | [English name; 'state-sponsored public university ... affiliated with the Ministr](https://en.wikipedia.org/wiki/Oles_Honchar_Dnipro_National_University) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://dnu.dp.ua/ | [English name; 'state-sponsored public university ... affiliated with the Ministr](https://en.wikipedia.org/wiki/Oles_Honchar_Dnipro_National_University) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [English name; 'state-sponsored public university ... affiliated with the Ministr](https://en.wikipedia.org/wiki/Oles_Honchar_Dnipro_National_University) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | unverified | LEAD: url: https://www.dnu.dp.ua/en/International_Students_Office | [English name; 'state-sponsored public university ... affiliated with the Ministr](https://en.wikipedia.org/wiki/Oles_Honchar_Dnipro_National_University) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [English name; 'state-sponsored public university ... affiliated with the Ministr](https://en.wikipedia.org/wiki/Oles_Honchar_Dnipro_National_University) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [English name; 'state-sponsored public university ... affiliated with the Ministr](https://en.wikipedia.org/wiki/Oles_Honchar_Dnipro_National_University) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [English name; 'state-sponsored public university ... affiliated with the Ministr](https://en.wikipedia.org/wiki/Oles_Honchar_Dnipro_National_University) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [English name; 'state-sponsored public university ... affiliated with the Ministr](https://en.wikipedia.org/wiki/Oles_Honchar_Dnipro_National_University) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [English name; 'state-sponsored public university ... affiliated with the Ministr](https://en.wikipedia.org/wiki/Oles_Honchar_Dnipro_National_University) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `223-nursing` — 223 Медсестринство / Nursing (nursing) | `programmes.223-nursing.internationalAdmission`; `programmes.223-nursing.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [English name; 'state-sponsored public university ... affiliated with the Ministr](https://en.wikipedia.org/wiki/Oles_Honchar_Dnipro_National_University) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `223-nursing-master-s-educational-programme-onp-in-filename` — 223 Медсестринство / Nursing (master's educational programme, 'ONP' in filename) (nursing) | `programmes.223-nursing-master-s-educational-programme-onp-in-filename.internationalAdmission`; `programmes.223-nursing-master-s-educational-programme-onp-in-filename.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [English name; 'state-sponsored public university ... affiliated with the Ministr](https://en.wikipedia.org/wiki/Oles_Honchar_Dnipro_National_University) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `227-physical-therapy-occupational-therapy-field-227-therapy-and-rehabilitation` — 227 Фізична терапія, ерготерапія / Physical therapy, occupational therapy (field 227 Therapy and Rehabilitation) (other) | `programmes.227-physical-therapy-occupational-therapy-field-227-therapy-and-rehabilitation.internationalAdmission`; `programmes.227-physical-therapy-occupational-therapy-field-227-therapy-and-rehabilitation.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [English name; 'state-sponsored public university ... affiliated with the Ministr](https://en.wikipedia.org/wiki/Oles_Honchar_Dnipro_National_University) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `224-technologies-of-medical-diagnostics-and-treatment` — 224 Технології медичної діагностики та лікування / Technologies of medical diagnostics and treatment (other) | `programmes.224-technologies-of-medical-diagnostics-and-treatment.internationalAdmission`; `programmes.224-technologies-of-medical-diagnostics-and-treatment.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [English name; 'state-sponsored public university ... affiliated with the Ministr](https://en.wikipedia.org/wiki/Oles_Honchar_Dnipro_National_University) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `224-technologies-of-medical-diagnostics-and-treatment-specialisation-laboratory-diagnostics` — 224 Technologies of medical diagnostics and treatment, specialisation 'Лабораторна діагностика' / Laboratory diagnostics (other) | `programmes.224-technologies-of-medical-diagnostics-and-treatment-specialisation-laboratory-diagnostics.internationalAdmission`; `programmes.224-technologies-of-medical-diagnostics-and-treatment-specialisation-laboratory-diagnostics.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [English name; 'state-sponsored public university ... affiliated with the Ministr](https://en.wikipedia.org/wiki/Oles_Honchar_Dnipro_National_University) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `224-technologies-of-medical-diagnostics-and-treatment-educational-scientific-phd-programme-code-47810` — 224 Technologies of medical diagnostics and treatment — educational-scientific (PhD) programme, code 47810 (other) | `programmes.224-technologies-of-medical-diagnostics-and-treatment-educational-scientific-phd-programme-code-47810.internationalAdmission`; `programmes.224-technologies-of-medical-diagnostics-and-treatment-educational-scientific-phd-programme-code-47810.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [English name; 'state-sponsored public university ... affiliated with the Ministr](https://en.wikipedia.org/wiki/Oles_Honchar_Dnipro_National_University) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `public-health-partner-report-lead-only-unconfirmed` — Public health (partner-report lead only, unconfirmed) (other) | `programmes.public-health-partner-report-lead-only-unconfirmed.internationalAdmission`; `programmes.public-health-partner-report-lead-only-unconfirmed.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [English name; 'state-sponsored public university ... affiliated with the Ministr](https://en.wikipedia.org/wiki/Oles_Honchar_Dnipro_National_University) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Relocation lead (unverified): No relocation lead found. DNU's own English pages place the International Students Office at 72 Nauky Avenue, Dnipro, office 117 (search summary of https://www.dnu.dp.ua/en/International_Students_Office); DNU news for 2024 (ennews/138) and 2025–2026 programme/accreditation PDFs (227 project programme for 2026–2027, 2026 NAQA decision document on PhD 224) indicate ongoing activity in Dnipro. Wartime operating mode (in-person vs remote) was not checked.  
   Closure (fill): 
6. Red flag to resolve before any fact is shown: No medicine (222), dentistry (221) or pharmacy (226) degree surfaced — only nursing (223), medical-diagnostics technologies (224) and physical therapy (227); the inventory group H classification stands. Absence in search results is not proof of absence.  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: Foreign-applicant route is generic: the 'Admission of Foreigners' page (https://www.dnu.dp.ua/en/admission_of_foreigners) describes a preparatory faculty, language courses, postgraduate/internship programmes and enrolment via the Unified Interdepartmental Information System, but no lead ties foreign admission or English-medium teaching to the 223/224/227 programmes.  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: Accreditation status unverified: the 2020 master's 223 document stated 'До проходження первинної акредитації'; 2025–2026 NAQA-related PDFs for 227 and PhD 224 are self-hosted and their outcomes were not shown.  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: Name confusion: distinct from the listed Dnipro State Medical University (slug dnipro-state-medical-university) and from Ukrainian State University of Science and Technologies (also Dnipro, inventory group H); 'Dnipro National University' / 'DNU' must not be mapped to either.  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: Conflicting international-enrolment figures across sources (Wikipedia ~130; DNU fact sheet 166; THE and FAO AGRIS ~3,000 — apparently pre-2014 figures): aggregator data is stale.  
   Closure (fill): 
11. Red flag to resolve before any fact is shown: International Students Office contact in the search summary is a gmail.com address (int.education.dnu@gmail.com) rather than a dnu.dp.ua address — verify on the official page before publishing.  
   Closure (fill): 
12. Red flag to resolve before any fact is shown: abitly.org lists 231 Social Work under the medical faculty; it is not a health programme and must not be counted.  
   Closure (fill): 
13. Red flag to resolve before any fact is shown: Public-health programme lead comes only from a Polish partner's 2025 news item and is contradicted by Ukrainian-language results.  
   Closure (fill): 
14. Missing evidence: Official faculty programme page of the Faculty of Medical Technologies of Diagnostics and Rehabilitation on dnu.dp.ua not read (host blocked); programme set assembled from vstup.osvita.ua, abitly.org and DNU PDF titles/snippets.  
   Closure (fill): 
15. Missing evidence: EDEBO (registry.edbo.gov.ua) entry: licence volumes and licensed specialities for 223, 224, 227 — not found.  
   Closure (fill): 
16. Missing evidence: NAQA register: current accreditation certificates/decisions for bachelor 223, master 223, bachelor 224, master 224, bachelor 227 and PhD 224 — not found; only DNU-hosted 2025/2026 PDFs whose outcomes were not shown.  
   Closure (fill): 
17. Missing evidence: Ministry 'Study in Ukraine' portal listing — not found.  
   Closure (fill): 
18. Missing evidence: Whether foreign applicants are admitted to 223/224/227 specifically, and language of instruction (no English-medium lead for any programme).  
   Closure (fill): 
19. Missing evidence: Tuition fees for these programmes — only a uniRank aggregate range (US$1,000–2,499) exists.  
   Closure (fill): 
20. Missing evidence: Confirmation that DNU runs no 222 Medicine, 221 Dentistry or 226 Pharmacy programme (none surfaced; absence not proven).  
   Closure (fill): 
21. Missing evidence: Existence and level of any 229 Public Health programme (contradictory leads).  
   Closure (fill): 
22. Missing evidence: Exact official English name on the charter and the precise rename date (Wikipedia snippet says 2018; not cross-checked).  
   Closure (fill): 
23. Missing evidence: International Students Office contact details (gmail address, phone, hours) not read on the live page.  
   Closure (fill): 
24. Missing evidence: Current operating mode under wartime conditions (in-person vs remote) and any 2025/2026 admission deadlines.  
   Closure (fill): 
25. Skeptic's note: Nursing (223) currency not shown for 2025/2026: the bachelor lead is a 2024 vstup.osvita.ua card plus a DNU order of 20 Aug 2024; the master's lead is a 2022-2024 programme PDF. Only the 227 physical-therapy programme has a 2026-2027 project document.  
   Closure (fill): 
26. Skeptic's note: No lead ties foreign admission or English-medium teaching to 223/224/227; the 'Admission of Foreigners' page is generic (preparatory faculty, UES enrolment).  
   Closure (fill): 
27. Skeptic's note: Accreditation unverified: the 2020 master's 223 document said 'до проходження первинної акредитації'; 2025/2026 NAQA-related PDFs for bachelor 227 and PhD 224 are self-hosted with outcomes not shown; no EDEBO, NAQA or Study in Ukraine portal hit.  
   Closure (fill): 
28. Skeptic's note: No 222 Medicine, 221 Dentistry or 226 Pharmacy lead; a 'public health' programme is claimed only by a Polish partner's news item and contradicted by Ukrainian-language results; abitly.org's 231 Social Work under the medical faculty is not a health programme.  
   Closure (fill): 
29. Skeptic's note: International Students Office contact in the snippet is a gmail.com address; verify on the live page before showing any contact. International-enrolment figures across sources are stale and contradictory.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/oles-honchar-dnipro-national-university.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
