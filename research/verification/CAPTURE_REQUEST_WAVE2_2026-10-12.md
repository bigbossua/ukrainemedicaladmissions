# Official-source capture request — wave 2 (institutions found on 2026-10-12)

**Status:** not started. Every host below was refused by the environment's network policy when tested on 2026-10-12 (curl through the proxy, one request per host root; 403 to CONNECT): the five research-preview institutions' hosts and the government hosts at 13:02 UTC, the other institutions' hosts at 13:19 UTC. Nothing has been read. Third-party hosts (news, aggregators, agencies) are leads only and are not listed; `mfhea.mt` is the Maltese higher-education regulator, needed only for the Malta-campus question. This list is separate from `CAPTURE_REQUEST_2026-10-12.md` and from the 20 hosts in `OWNER_ACTION_SHEET.md` §1: do the first eight priority universities first.

**Order:** India search demand (SEMrush, `research/semrush/2026-10-12-phrase_these-in-new-university-names.csv`) × how much one official or government page can settle. Demand is a research priority only; it says nothing about legitimacy, licence, recognition or admissions. Research leads and the skeptic's re-check for each institution: `research/universities/2026-10-12-landscape-sweep-wave1.json` / `…-wave2.json`; summary in `UNIVERSITY_DATA_REGISTER.md` §12.

**For every institution, first:** the government register card (EDEBO `registry.edbo.gov.ua`, or the Ministry's `universities.studyinukraine.gov.ua`) that names the official website; then the official contacts page; then a dated statement for 2026/27 on whether, where and how foreign students are taught; then the programme, admission and fee pages. Capture format and file naming as in `CAPTURE_REQUEST_2026-10-12.md` §3 (use the slug below). A page that is silent on a point is still a valid capture; a page that cannot be found is reported NOT FOUND.

| # | Institution | Slug | Public directory | India demand | Hosts needed (official and government) |
|---|---|---|---|---|---|
| 1 | International European University | `international-european-university` | not listed (open licence and Malta-campus questions) | in 590 | `campusmalta.ieu.edu.ua`, `en.naqa.gov.ua`, `ieu.edu.ua`, `malta.ieu.edu.ua`, `maltacampus.ieu.edu.ua`, `medicine.ieu.edu.ua`, `mfhea.mt`, `mon.gov.ua`, `naqa.gov.ua`, `public.naqa.gov.ua`, `registry.edbo.gov.ua`, `universities.studyinukraine.gov.ua`, `www.ieu.edu.ua` |
| 2 | State Establishment "Luhansk State Medical University" | `luhansk-state-medical-university` | not listed (reported as relocated: needs a dated official notice of its current base) | in 390 (name shared) | `lsmu.edu.ua`, `mon.gov.ua`, `moz.gov.ua`, `naqa.gov.ua`, `registry.edbo.gov.ua`, `studyinukraine.gov.ua`, `www.i-lug.gov.ua`, `www.lsmu.edu.ua` |
| 3 | Kyiv Medical University | `kyiv-medical-university` | not listed (licence, accreditation and branch questions) | in 140 | `dimh.kmu.edu.ua`, `kmu.edu.ua`, `mon.gov.ua`, `naqa.gov.ua`, `registry.edbo.gov.ua`, `studyinukraine.gov.ua`, `universities.studyinukraine.gov.ua`,  |
| 4 | Sumy State University | `sumy-state-university` | research preview | in 110 | `edbo.gov.ua`, `en.naqa.gov.ua`, `int.sumdu.edu.ua`, `inter.med.sumdu.edu.ua`, `med.sumdu.edu.ua`, `mon.gov.ua`, `naqa.gov.ua`, `news.sumdu.edu.ua`, `registry.edbo.gov.ua`, `study.sumdu.edu.ua`, `sumdu.edu.ua`, `t1.sumdu.edu.ua`, `universities.studyinukraine.gov.ua` |
| 5 | National University of Pharmacy | `national-university-of-pharmacy` | research preview | in 40 | `college.nuph.edu.ua`, `en.nuph.edu.ua`, `mon.gov.ua`, `moz.gov.ua`, `naqa.gov.ua`, `nuph.edu.ua`, `pat.nuph.edu.ua`, `public.naqa.gov.ua`, `registry.edbo.gov.ua`, `studyinukraine.gov.ua`, `universities.studyinukraine.gov.ua` |
| 6 | Taras Shevchenko National University of Kyiv | `taras-shevchenko-national-university-of-kyiv` | research preview | in 20 | `biomed.knu.ua`, `knu.ua`, `mon.gov.ua`, `naqa.gov.ua`, `pdis.knu.ua`, `registry.edbo.gov.ua`, `studyinukraine.gov.ua` |
| 7 | Petro Mohyla Black Sea National University | `petro-mohyla-black-sea-national-university` | research preview | in 20 | `chmnu.edu.ua`, `mon.gov.ua`, `naqa.gov.ua`, `registry.edbo.gov.ua`, `universities.studyinukraine.gov.ua`, `vstup.edbo.gov.ua` |
| 8 | Bohdan Khmelnytsky National University of Cherkasy | `bohdan-khmelnytsky-national-university-of-cherkasy` | research preview | in 20 | `cdu.edu.ua`, `mon.gov.ua`, `naqa.gov.ua`, `registry.edbo.gov.ua`, `universities.studyinukraine.gov.ua`, `www.cdu.edu.ua` |
| 9 | V. N. Karazin Kharkiv National University | `karazin-kharkiv-national-university` | not listed (needs one government listing) | in 20 | `cie.karazin.ua`, `en.naqa.gov.ua`, `iie.karazin.ua`, `karazin.ua`, `med.karazin.ua`, `medicine.karazin.ua`, `mon.gov.ua`, `naqa.gov.ua`, `old.karazin.ua`, `rada.karazin.ua`, `registry.edbo.gov.ua`, `start.karazin.ua`, `www.medicine.karazin.ua` |

## 1. International European University (`international-european-university`)

| Page | What it should establish |
|---|---|
| https://registry.edbo.gov.ua/university/4374 | EDEBO entry: official name, code, address, website, licensed specialties (222), licence volumes including foreign students, founder or owner |
| https://universities.studyinukraine.gov.ua/en/minedu/university/11/ | Study in Ukraine portal listing: programmes open to foreigners, language, duration, fees as listed by the Ministry portal |
| https://www.ieu.edu.ua/docs/Extract_ENG.pdf | MON licence extract (November 2019): foreign-student column entry for specialty 222 and other specialties |
| https://ieu.edu.ua/en/about-ieu/news/international-european-university-received-national-accreditation-of-the-medicine-educational-and-professional-program | Claim of 2023 national accreditation of Medicine: date, certificate details, validity; then cross-check on NAQA's register |
| https://ieu.edu.ua/en/about-ieu/news/the-medicine-educational-program-of-ieu-has-obtained-international-accreditation | ZEvA accreditation claim: date, validity, scope; then cross-check on ZEvA's or DEQAR's records |
| https://ieu.edu.ua/en/admission/tuition-fees | Medicine tuition (6000 EUR per year): date, academic year, inclusions, extra fees |
| https://ieu.edu.ua/en/admission/admission-rules | 2025 admission rules for foreign citizens: entrance exams, documents, deadlines, intake dates, language of instruction |
| https://ieu.edu.ua/en/apply-now | Application route and documents for foreign applicants |
| https://medicine.ieu.edu.ua/en | European Medical School page: programme title, duration, language, clinical bases, current teaching format |
| https://ieu.edu.ua/en/education/educational-plans | Medicine educational plan: duration, credits, language |
| https://ieu.edu.ua/en/about-ieu/material-and-technical-facilities/dormitory | Dormitory availability and rates for foreign students |
| https://ieu.edu.ua/en/about-ieu/university-profile | Institutional profile: legal status, address, founders |
| https://ieu.edu.ua/docs/Medical-Residency-Policy.pdf | Postgraduate licence reference (MON order 22.04.2024 No. 265-л) |
| https://ieu.edu.ua/docs/Zvit_2024_Proekt.pdf | Draft 2024 report: student numbers, foreign students, teaching format during the war |
| https://mfhea.mt/resources/announcements/ | MFHEA notices on IEU Malta: exact wording, dates, licence type, theory-only statement, July 2024 notice |
| https://maltacampus.ieu.edu.ua/faq/ | IEU's Malta recognition and licensing claims (to record verbatim against MFHEA statements) |
| https://malta.ieu.edu.ua/faq/ | Second Malta FAQ using 'accredited' wording |
| https://campusmalta.ieu.edu.ua/online-classes/ | 'Study MBBS online in Europe': what is offered online, who awards the degree, where clinical training happens |
| https://maltacampus.ieu.edu.ua/doctor-of-medicine/ | Malta MD programme description: duration, credits, language, awarding body |
| https://maltacampus.ieu.edu.ua/tuition-fees-campus/ | Malta fee schedule (7,500 EUR) with date |
| https://mon.gov.ua/ministerstvo-2/poslugi/litsenzuvannya/litsenziyniy-reestr-subektiv-osvitnoi-diyalnosti/litsenziyniy-reestr-subektiv-osvitnoi-diyalnosti-u-sferi-vishchoi-osviti/kiivska-oblast-2 | MON licence register (Kyiv oblast). Check whether IEU is listed, or locate the Kyiv-city register page |
| https://archive.kyivpost.com/business-wire/international-european-university-was-opened-in-kyiv.html | Date and content of the opening announcement (third-party page: context and leads only, never evidence) |

## 2. State Establishment "Luhansk State Medical University" (`luhansk-state-medical-university`)

| Page | What it should establish |
|---|---|
| https://lsmu.edu.ua/en/foreign-students-en/admission-requirements | Official admission rules for foreigners: programmes (Medicine, Dentistry, Pharmacy, Pediatrics), levels, durations, teaching language, documents, deadlines, the MES Order No. 1167 reference |
| https://www.lsmu.edu.ua/students/admission-requirements | Duplicate admission-requirements page under the main site's students section; confirm it matches and check its date |
| https://lsmu.edu.ua/en/component/content/article/2-uncategorised/1751-department-foreign-students | Foreign-students department: Rivne address, contacts, support services |
| https://lsmu.edu.ua/en/home/history-of-lsmu | Official chronicle: dated relocations (2014 Rubizhne, 2022 Rivne), the 2016 dormitory, current status statements |
| https://lsmu.edu.ua/en/ | Official homepage: confirm domain ownership and the institution's legal name (SE 'LSMU'), find tuition-fee, accommodation and licence/accreditation pages |
| https://registry.edbo.gov.ua/ | EDEBO register entry: legal name, EDRPOU code, founder/governing ministry, current legal address (Rivne), licensed specialities and volumes |
| https://naqa.gov.ua/ | NAQA accreditation decisions for LSMU programmes (222 Medicine, 221 Dentistry, 228 Pediatrics, 226 Pharmacy, or their 2025+ equivalents) |
| https://studyinukraine.gov.ua/ | Whether LSMU is listed for international applicants, and with which programmes |
| https://moz.gov.ua/ | Ministry of Health orders on LSMU's temporary relocation to Rivne (March 2022) and its subordination |
| https://www.i-lug.gov.ua/en/research_and_innovation_space/university/derzhavnij-zaklad-%C2%ABluganskij-derzhavnij-medichnij-universitet%C2%BB | Luhansk regional government portal entry for the university: content and date |
| https://vstup.osvita.ua/y2025/r13/13/ | Third-party mirror of 2025 admissions data (location, licensed volumes, enrolment counts) to cross-check against EDEBO (third-party page: context and leads only, never evidence) |
| https://euneighbourseast.eu/projects/eu-project-page/?id=1987 | EU project page: date, description of equipment shortages, the 'accredited programmes' wording (third-party page: context and leads only, never evidence) |
| https://search.wdoms.org/ | Check whether a WDOMS directory entry exists, and which location/name it shows (directory entry only, not recognition) (third-party page: context and leads only, never evidence) |

## 3. Kyiv Medical University (`kyiv-medical-university`)

| Page | What it should establish |
|---|---|
| https://registry.edbo.gov.ua/university/35646/ | EDEBO registry record: legal status, licences (222 Medicine, 221 Dentistry, 226 Pharmacy), licensed volumes, foreigner training permission, branches/separate units (URL pattern built from ID 35646, not shown in results) |
| https://naqa.gov.ua/wp-content/uploads/2022/10/Протокл-від-03.10.2022.pdf | NAQA protocol 03.10.2022: exact wording on the KMU pharmacy programme foreign accreditation, agency name, validity |
| https://universities.studyinukraine.gov.ua/en/minedu/university/15/ | Government directory listing for KMU: programmes, languages, any fees, linked official domain |
| https://universities.studyinukraine.gov.ua/en/minedu/university/15/preparatory-department | Government listing of the preparatory department |
| https://kmu.edu.ua/en/apply-here/ | Programme list for international students (MD 6 y, Dentistry 5 y, Pharmacy 5 y), language, Polish campus location |
| https://kmu.edu.ua/en/specialties-list/ | Official specialties, levels, durations, languages |
| https://kmu.edu.ua/en/admission-requirements-2/ | 2026 admission sessions, routes (Kyiv/Poland/remote), Study in Ukraine e-invitation, International Faculty contact |
| https://kmu.edu.ua/en/admission-requirements/ | Older admission page (semester intakes), for comparison |
| https://kmu.edu.ua/?p=11815 | Admission Requirements variant: documents, NEET, entrance tests |
| https://kmu.edu.ua/?p=3302 | Admission Requirements variant: documents and tests |
| https://kmu.edu.ua/en/f-a-q/ | FAQ: campus split by year, clinical bases, housing |
| https://kmu.edu.ua/en/preparatory-faculty/ | Preparatory faculty for international citizens |
| https://kmu.edu.ua/en/kyiv-medical-university-opens-enrolment-for-international-students-in-the-general-medical-practice-primary-specialization-programme/ | Only official fee figures (General Medical Practice primary specialization) and date of announcement |
| https://kmu.edu.ua/uk/general-medical-practice-primary-specialization/ | Ukrainian-language programme page for the primary specialization |
| https://kmu.edu.ua/wp-content/uploads/2022/08/CLARIFICATIONS.pdf | 2022 statement on offline teaching and Polish campus licence/accreditation basis |
| https://kmu.edu.ua/wp-content/uploads/2023/04/KMU_Fast_Facts_2023_3-eng.pdf | 2023 Fast Facts: founding, Bytom campus, Kharkiv branch, accreditation claims |
| https://kmu.edu.ua/wp-content/uploads/2026/01/ПРО-ПІДСУМКИ-ДІЯЛЬНОСТІ-КОЛЕКТИВУ-ПВНЗ-КИЇВСЬКИЙ-МЕДИЧНИЙ-УНІВЕРСИТЕТ.pdf | 2025 rector's report: current specialties, admissions, accreditation and operating status statements |
| https://kmu.edu.ua/wp-content/uploads/2021/11/zvit-rectora-2021.pdf | 2021 rector's report: 'international accreditation extended' wording and details |
| https://kmu.edu.ua/en/academic-planning | Academic planning page (content not summarised) |
| https://www.ebrd.com/home/news-and-events/news/2024/ebrd-helps-kyiv-medical-university-maintain-education-in-wartime.html | 2024 third-party account of partial relocation to Poland and clinical training in Katowice (third-party page: context and leads only, never evidence) |
| https://vstup.osvita.ua/y2020/r27/197/ | 2020 admission mirror record for 222 Medicine licensed volume (third-party; compare with EDEBO) (third-party page: context and leads only, never evidence) |

## 4. Sumy State University (`sumy-state-university`)

| Page | What it should establish |
|---|---|
| https://study.sumdu.edu.ua/images/Prices%202023-2024/Prices_Eng_2023-2024.pdf | Official foreigners' tuition list 2023-2024 (medicine line). Also find the 2025-2026 / 2026-2027 equivalent on study.sumdu.edu.ua. |
| https://int.sumdu.edu.ua/en/study/251-master.html | Admission requirements, documents, entry window, application route for foreigners (check date and currency) |
| https://study.sumdu.edu.ua/en/study/institutes-and-faculties/med.html | Medical Institute programmes for foreigners, contract-based admission, language groups, international accreditation note |
| https://int.sumdu.edu.ua/en/welcome-to-sumdu/academic-structure/53-medical-institute.html | Official Medical Institute description, programme list by level and language, foreign student numbers (date) |
| https://med.sumdu.edu.ua/en/our-specialties/ | Specialties and durations (General Medicine six-year, Preventive Medicine, Dentistry) |
| https://med.sumdu.edu.ua/en/international-accreditation-expertise/ | University's account of the IAAR/NAQA pilot accreditation |
| https://inter.med.sumdu.edu.ua/wp-content/uploads/2022/09/sumdu_master_medicine_certificate-international-accreditation.pdf | IAAR certificate: issue date 22 April 2022, validity to 21 April 2027, scope (Medicine 222 Master's), WFME wording |
| https://news.sumdu.edu.ua/en/en-news/12371-accreditation-assessment-of-the-educational-program-of-the-medical-specialty-according-to-the-pilot-project-of-the-independent-international-agency-national-agency-for-quality-assurance-in-higher-education-and-sumdu-is-completed.html | Pilot project details, expert visit dates January 26-28, 2022 |
| https://www.eqar.eu/qa-results/search/by-report/report/?id=77762 | EQAR/DEQAR record of the IAAR programme accreditation decision (22/04/2022) (third-party page: context and leads only, never evidence) |
| https://data.deqar.eu/institution/3364 | DEQAR institution record (identifier UA-national 168, list of accreditation reports) (third-party page: context and leads only, never evidence) |
| https://en.naqa.gov.ua/?p=1739 | NAQA statement on the NAQA-IAAR pilot; find any NAQA decision for SumDU 222/221 |
| https://universities.studyinukraine.gov.ua/en/minedu/university/74/contacts | Government portal listing: ownership, official name, website, international department contacts |
| https://universities.studyinukraine.gov.ua/en/minedu/university/74/preparatory-department | Government portal: preparatory department details (10 months, address) |
| https://universities.studyinukraine.gov.ua/en/minedu/university/150 | Resolve which institution this entry is |
| https://int.sumdu.edu.ua/en/life-ssu/student-campus/residences3 | Residences for foreign students (No. 3, 4, 5), contacts; look for fees |
| https://study.sumdu.edu.ua/en/preparatory-department.html | Preparatory department and Department of International Education details |
| https://news.sumdu.edu.ua/en/en-news/12464-sumdu-is-consolidated-and-aimed-at-further-development-rector-vasyl-karpusha.html | Dated 2022 wartime teaching-format statement (remote from April 1, shelters, medicine/dentistry near shelters) |
| https://news.sumdu.edu.ua/en/en-news/12492-the-academic-council-of-sumdu-has-considered-the-issue-of-university-activities-in-terms-of-martial-law.html | Academic Council decision on martial-law operation (date and content) |
| https://med.sumdu.edu.ua/en/how-foreign-students-live-in-war/ | Dated (March 2022) foreign-student wartime situation |
| https://study.sumdu.edu.ua/en/students-life/university-hospital.html | Clinical base / university hospital statement |
| To locate: EDEBO register entry for Sumy State University (registry.edbo.gov.ua; exact URL not shown in results) | State registration, licensed specialties and licensed volumes (222 Medicine, 221 Dentistry, etc.) |
| To locate: Current-year SumDU news / schedule page on teaching format 2025-2026 or 2026-2027 (exact URL not shown in results) | Dated statement on in-person, blended or distance teaching for Medical Institute foreign students |

## 5. National University of Pharmacy (`national-university-of-pharmacy`)

| Page | What it should establish |
|---|---|
| https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf | 2025-2026 fee and duration schedule for foreign citizens: programme titles, levels, durations, language columns, currency, full-time/part-time |
| https://en.nuph.edu.ua/wp-content/uploads/2024/06/2.Specialties-and-training-cost_04.06.2024р.pdf | 2024-2025 fee schedule, for comparison and dating |
| https://en.nuph.edu.ua/?p=433 | English (5-year) and Ukrainian (6-year) tracks, July 01 to October 31 window, year-round Pre-University intake, hostel statement; capture the page date |
| https://en.nuph.edu.ua/?p=953 | Dean of Faculty for Foreign Citizens' Education: 'accredited specialties' claim, Kharkiv 'safe place to study' statement, any date |
| https://en.nuph.edu.ua/?p=703 | Rules for applicants holding a Pre-University Certificate from another university |
| https://en.nuph.edu.ua/faculties/ | Faculty for Foreign Citizens' Education: contacts (indek@ vs interdep@), programmes |
| https://nuph.edu.ua/information-about-activities | Basic institutional information: study modes, languages, MOH laboratory reference, any licence or accreditation data |
| https://en.nuph.edu.ua/?p=13610 | 2019 newsletter: foreign student numbers (1.5 thousand from 43 countries) |
| https://en.nuph.edu.ua/?p=124 | History of international education at NUPh |
| https://universities.studyinukraine.gov.ua/en/minedu/university/41 | Check which institution this Study in Ukraine portal entry is; if it is not NUPh, find the NUPh entry |
| https://pat.nuph.edu.ua/en/information-for-the-foreign-educational-applicants-about-distance-learning-during-quarantine | 2020 quarantine distance-learning notice (context only; pre-war) |

## 6. Taras Shevchenko National University of Kyiv (`taras-shevchenko-national-university-of-kyiv`)

| Page | What it should establish |
|---|---|
| https://knu.ua/en/inter-stud/degrees-and-programs/bachelor | Foreign-student programme list: Medicine 222 in English, 201 places, six years, host unit. Capture the page date or admission year and any fee shown. |
| https://biomed.knu.ua/ukreducational-program/medicine-eng.html | English Master's Programme in Medicine: 360 ECTS, 6 years, language, the 'recognized in the EU' claim, and any version date or accreditation note. |
| https://biomed.knu.ua/institute-activity/educational/kafedry/kafedra-klinichnoi-medytsyny/osvitnia-diialnist/medicine-eng.html | Department of Clinical Medicine page on the English medicine programme: language of instruction, clinical training, date. |
| https://biomed.knu.ua/medicine/educational-program.html | Educational programme document(s) for Medicine: edition year, guarantor, EDEBO ID, any accreditation reference. |
| https://biomed.knu.ua/images/stories/Upload/Buklet/2020/ESC_Institute_Biology_Medicine_2020_ENGred.pdf | 2020 English booklet: programmes, languages, durations, history (dated 2020; check against current pages). |
| https://knu.ua/en/departments/bm/ | Official unit name, address (Hlushkova Avenue), departments, dormitory statements. |
| https://knu.ua/en/abit/training | Foreigner training procedure (1998 decree reference) and preparatory faculty description. |
| https://knu.ua/en/abit/rules_inoz_2013 | Older admission policy (languages, interview-based enrolment). Confirm whether superseded. |
| https://knu.ua/en/ | 'Admission of foreign nationals' timeline (invitation, visa, application, residence permit; in-person or remote). |
| https://pdis.knu.ua/en/ | Identify the role of this subdomain (possible international or preparatory unit) and any fees or contacts for foreigners. |
| https://registry.edbo.gov.ua/ | EDEBO register entry for Taras Shevchenko National University of Kyiv: licence for specialty 222 Medicine and licensed volume, including for foreign citizens (exact URL not shown in results). |
| https://naqa.gov.ua/ | NAQA accreditation record or certificate for the KNU 222 Medicine programme (exact URL not shown in results). |
| https://studyinukraine.gov.ua/ | Study in Ukraine portal listing of KNU or the Medicine programme for foreigners (exact URL not shown in results). |

## 7. Petro Mohyla Black Sea National University (`petro-mohyla-black-sea-national-university`)

| Page | What it should establish |
|---|---|
| https://chmnu.edu.ua/conditions-and-tuition-fees/ | Full 2025-26 fee table for foreigners including the Medicine row, the Academic Council minutes No. 11 of 29 Aug 2025 reference, payment terms, language-of-instruction statement |
| https://chmnu.edu.ua/en/foreign-students/ | Intake dates (1 Nov / 1 Mar) with year, admission bases, programme list for foreigners |
| https://chmnu.edu.ua/peculiarities-of-admission/ | Admission rules for foreigners, requirements and documents |
| https://chmnu.edu.ua/dovidnik-abituriyenta | Applicant handbook: current admission rules and deadlines |
| https://chmnu.edu.ua/preparatory-department/ | Preparatory department duration, fees, language, entry requirements |
| https://chmnu.edu.ua/wp-content/uploads/222_Rishennya_Natsionalnogo_agentstva.pdf | NAQA decision of 26 Dec 2023 (protocol 21 (50)): programme name, accreditation type and term |
| https://chmnu.edu.ua/wp-content/uploads/OPP_222_Medicine-2021-3.pdf | Medicine programme document (English): language, duration, admission conditions; check for a newer edition |
| https://chmnu.edu.ua/wp-content/uploads/OPP-222-Meditsina-2021.pdf | Medicine programme document (Ukrainian): level, 360 ECTS, 6-year term |
| https://chmnu.edu.ua/general_information/ | Official name, history, medical university status since 2016, foreign-student numbers |
| https://chmnu.edu.ua/university-structure | Exact name of the Medical Institute and its departments |
| https://chmnu.edu.ua/mizhnarodna-diyalnist/ | International office and contacts, foreign-student information |
| https://chmnu.edu.ua/category/zapisi/novini/page/2 | News and orders on 2025-26 teaching format (in-person, blended, online) and shelter arrangements |
| https://chmnu.edu.ua/wp-content/uploads/Strategichnij_plan_CHNU_2025-2029.pdf | Strategic plan 2025-2029: any statement on wartime operation and teaching mode |
| https://universities.studyinukraine.gov.ua/en/minedu/university/13/student-feedback | Confirm that id 13 is this university; capture the government portal listing and programmes |
| https://vstup.osvita.ua/y2024/r15/265/840428/ | Third-party mirror of the 2024 Medicine admission listing; cross-check against the EDEBO original (third-party page: context and leads only, never evidence) |

## 8. Bohdan Khmelnytsky National University of Cherkasy (`bohdan-khmelnytsky-national-university-of-cherkasy`)

| Page | What it should establish |
|---|---|
| https://www.cdu.edu.ua/ | Official homepage: confirm official name/domain, faculties/institutes list, any medical or health faculty |
| https://universities.studyinukraine.gov.ua/en/minedu/university/52 | Government profile: ownership, levels, languages, specialty list, application windows |
| https://universities.studyinukraine.gov.ua/en/minedu/university/52/cost | Government-listed tuition fees for foreigners (check for any medical specialty) |
| https://universities.studyinukraine.gov.ua/en/minedu/university/52/documents | Application documents for foreign applicants |
| https://universities.studyinukraine.gov.ua/en/minedu/university/52/preparatory-department | Preparatory department fields (economic, biological) and Institute of International Education details |
| https://vstup.osvita.ua/y2025/r24/101/ | 2025 specialty list and licensed volumes; check whether 222 Medicine appears (third-party page: context and leads only, never evidence) |
| https://www.rmcedu.com/mbbs-abroad/mbbs-in-ukraine/cherkasy-national-university/ | Evidence capture of agency MBBS, fee (USD 37,200) and NMC/WHO approval claims for comparison against official records (third-party page: context and leads only, never evidence) |
| https://www.rmcedu.com/bohdan-khmelnytsky-national-university-cherkasy.html | Second agency page: capture claims as stated (third-party page: context and leads only, never evidence) |
| https://registry.edbo.gov.ua/ (exact institution URL not shown in results) | EDEBO register entry: state registration and licensed specialties (verify 222 Medicine presence/absence) |
| https://naqa.gov.ua/ (exact URL not shown in results) | NAQA accreditation records for any programmes |

## 9. V. N. Karazin Kharkiv National University (`karazin-kharkiv-national-university`)

| Page | What it should establish |
|---|---|
| https://medicine.karazin.ua/en/future-students/abiturientam-navchannya-na-fakulteti | Programme statement (222 Medicine, second/master level, full-time), duration and language of instruction |
| https://medicine.karazin.ua/en/about | Languages of instruction, foreign student numbers, date of page |
| https://www.medicine.karazin.ua/en/student-life/distantsiyni-tehnologii-navchannya | Distance-learning statement and current teaching format |
| https://medicine.karazin.ua/en/news/page/37 | 2022 news: English-language online programme lists, Igbinedion University agreement |
| https://www.medicine.karazin.ua/en/news/page/29 | 2022 news: offline study abroad options (Germany, Bulgaria, Turkey) and Istanbul clinical practice |
| https://karazin.ua/en/news/opryliudneno-vartist-navchannia-v-karazinskomu-universyteti-2/ | 19 May 2026 tuition fee announcement and attached fee document (Medicine 222 figure, foreign rate) |
| https://karazin.ua/en/news/opryliudneno-vartist-navchannia-z-nbsp-urakhuvanniam-indeksa/ | 11 July 2024 fee announcement with indexation |
| https://cie.karazin.ua/en | Center for International Education: contacts (inter@karazin.ua), foreign applicant procedures |
| https://cie.karazin.ua/en/news/zaprosennya-na-navchannya-2026 | 2026 invitation procedure, document list, campaign dates (19 July – 20 October 2026) |
| https://karazin.ua/en/korisna-informatciia/iak-stati-studentom/ | 7-step procedure for foreign applicants, Selection Board document verification |
| https://karazin.ua/en/osvita/vstup/ | General admission page, legalization/translation requirements |
| https://karazin.ua/en/universitet/zymovyi-vstup/ | Winter admission: whether it applies to foreigners or Medicine |
| https://iie.karazin.ua/applicants | International Education Institute foreign applicant page: entrance exams in English for Medicine |
| https://start.karazin.ua/i/news/view/10 | Preparatory course details and eligibility for foreigners |
| https://old.karazin.ua/docs/med-1.pdf | Medical programme accreditation-related document: decision, date, expiry |
| https://old.karazin.ua/docs/work/zvit-med.pdf | Medical programme report (possible accreditation self-evaluation) |
| https://karazin.ua/storage/documents/1635_X4fXKMulWWiYQYqrOvLR5D2U2.pdf | Unidentified Karazin PDF returned for the accreditation query; check its content |
| https://rada.karazin.ua/en/?p=970 | 2015 foreign student enrolment results (historical context only) |
| https://en.naqa.gov.ua/ | NAQA registry search for Karazin 222 Medicine accreditation (no exact URL surfaced) |
| https://whed.net/institutions/IAU-007026 | WHED entry: listed website and fee range (third-party directory) (third-party page: context and leads only, never evidence) |

## Hosts to allow for wave 2 (one per line)

Only when the owner wants wave 2 started. Government hosts already in the 20-host request are not repeated as new.

```
biomed.knu.ua
campusmalta.ieu.edu.ua
cdu.edu.ua
chmnu.edu.ua
cie.karazin.ua
college.nuph.edu.ua
dimh.kmu.edu.ua
en.nuph.edu.ua
ieu.edu.ua
iie.karazin.ua
int.sumdu.edu.ua
inter.med.sumdu.edu.ua
karazin.ua
kmu.edu.ua
knu.ua
lsmu.edu.ua
malta.ieu.edu.ua
maltacampus.ieu.edu.ua
med.karazin.ua
med.sumdu.edu.ua
medicine.ieu.edu.ua
medicine.karazin.ua
mfhea.mt
news.sumdu.edu.ua
nuph.edu.ua
old.karazin.ua
pat.nuph.edu.ua
pdis.knu.ua
rada.karazin.ua
start.karazin.ua
study.sumdu.edu.ua
sumdu.edu.ua
t1.sumdu.edu.ua
www.cdu.edu.ua
www.i-lug.gov.ua
www.ieu.edu.ua
www.lsmu.edu.ua
www.medicine.karazin.ua
edbo.gov.ua
en.naqa.gov.ua
mon.gov.ua
moz.gov.ua
naqa.gov.ua
public.naqa.gov.ua
studyinukraine.gov.ua
vstup.edbo.gov.ua
```

## Change log

- 2026-10-12 — first version (nine institutions: five research previews and the four with the strongest demand or leads among those not listed).
