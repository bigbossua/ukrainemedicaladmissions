# Evidence register — Zhytomyr Medical Institute (`zhytomyr-medical-institute`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/zhytomyr-medical-institute.json`, checked 2026-10-24): **blocked**. Tested on 2026-10-24 from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: zhim.org.ua, universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua. Probe on 2026-10-24T16:30:56Z over the fourth host list (research/verification/ALLOWLIST_P4.txt, 32 hosts): 32 refused at the environment's proxy under its network policy (403 to CONNECT), 0 open. No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. A refused request is an access limitation, never evidence about the institution.

**Record under verification:** `site/src/content/universities/zhytomyr-medical-institute.json` — 0 programme(s) with an official-domain lead of international admission (); 12 deferred programme(s) kept unpublished until eligibility is read (Медсестринство (223 Nursing), Медсестринство (223 Nursing) — 2026 cycle, Медсестринство (Nursing) — bachelor, Акушерська справа (Midwifery) — bachelor, Екстрена медицина (Emergency Medicine) — specialisation under Nursing (I5), Фізична терапія (Physical Therapy) under Терапія та реабілітація (I7 / 227), Менеджмент (Management), PhD in Nursing (Медсестринство) — aggregator claim only, Медсестринство (Nursing) — at the institute's professional college sub-unit, Лікувальна справа (General Medicine / paramedic-level) — at the college sub-unit, Стоматологія (dentistry-related programme) — at the college sub-unit only, Public Health (Громадське здоров'я) — FRSE directory claim only).

**Evidence store:** `site/data/evidence/zhytomyr-medical-institute.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `zhytomyr-medical-institute--NN--short-name.pdf` where NN is the row number of this register (e.g. `zhytomyr-medical-institute--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/zhytomyr-medical-institute.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | Catalogue profile: type institute, licensed volume 394, alternative name 'Житомирский институт медсестринства' *(Result date as shown: undated (seen 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 2 | [Catalogue: 'Відокремлений структурний підрозділ фаховий коледж Житомирського мед](https://www.education.ua/colleges/350/?industry=39) | Catalogue: 'Відокремлений структурний підрозділ фаховий коледж Житомирського медичного інституту' offering programmes 'зокрема стоматологію' *(Result date as shown: undated (seen 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 3 | [Institute record inviting applicants to bachelor programmes incl. nursing](https://osvita.ua/vnz/college/16458/) | Institute record inviting applicants to bachelor programmes incl. nursing *(Result date as shown: undated (seen 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 4 | [Polish FRSE exchange directory: levels (professional junior bachelor, bachelor, ](https://wymianymlodziezy.frse.org.pl/?p=6064) | Polish FRSE exchange directory: levels (professional junior bachelor, bachelor, master) and fields incl. Nursing, Midwifery, Emergency Medicine, Dentistry, Public Health; 'close cooperation with forei *(Result date as shown: undated (seen 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 5 | [Aggregator article (also ?p=2169 on fees): history; claims PhD licence in Nursin](https://plandiy.com.ua/?p=3766) | Aggregator article (also ?p=2169 on fees): history; claims PhD licence in Nursing 'as of 2026' — unverified *(Result date as shown: undated (seen 2026-10-24). Search-result lead, not read in full.)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [MON 'Study in Ukraine' portal profile: 'Zhytomyr Medical Institute Ownership: mu](https://universities.studyinukraine.gov.ua/en/minedu/university/24); [MON news: new communal HEI 'Zhytomyr Medical Institute' opened on the basis of Z](https://mon.gov.ua/news/u-zhitomiri-vidkrili-noviy-medichniy-institut); [NAQA certificate-extension annex that appeared in results; snippet does not show](https://naqa.gov.ua/wp-content/uploads/2025/01/Додаток-7_Продовження-строків-дії-сертифікатів.-Січень-2025.pdf)

Third-party pages (leads only, never a source): [2025 admission catalogue entry: founder Regional Council, type institute, offici](https://vstup.osvita.ua/y2025/r7/319/1436775/); [2026 admission catalogue entries (also 1584842, 1584843): nursing master day/par](https://vstup.osvita.ua/y2026/r7/319/1584812/); [College sub-unit listings (also 1464524, 1457158, 1582808, 1441901, 1461062): pr](https://vstup.osvita.ua/y2025/r7/1884/1461063/)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Zhytomyr Medical Institute (lead: MON "Study in Ukraine" portal and FRSE directory; longer form "Zhytomyr Medical Institute of Zhytomyr Regional Council" seen only in inventory alias, not in a snippet) | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://zhim.org.ua/ | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | not-published | — (no lead) | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `223-nursing` — Медсестринство (223 Nursing) (nursing) | `programmes.223-nursing.internationalAdmission`; `programmes.223-nursing.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `223-nursing-2026-cycle` — Медсестринство (223 Nursing) — 2026 cycle (nursing) | `programmes.223-nursing-2026-cycle.internationalAdmission`; `programmes.223-nursing-2026-cycle.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `nursing-bachelor` — Медсестринство (Nursing) — bachelor (nursing) | `programmes.nursing-bachelor.internationalAdmission`; `programmes.nursing-bachelor.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `midwifery-bachelor` — Акушерська справа (Midwifery) — bachelor (nursing) | `programmes.midwifery-bachelor.internationalAdmission`; `programmes.midwifery-bachelor.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `emergency-medicine-specialisation-under-nursing-i5` — Екстрена медицина (Emergency Medicine) — specialisation under Nursing (I5) (nursing) | `programmes.emergency-medicine-specialisation-under-nursing-i5.internationalAdmission`; `programmes.emergency-medicine-specialisation-under-nursing-i5.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `physical-therapy-under-i7-227` — Фізична терапія (Physical Therapy) under Терапія та реабілітація (I7 / 227) (other) | `programmes.physical-therapy-under-i7-227.internationalAdmission`; `programmes.physical-therapy-under-i7-227.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `management` — Менеджмент (Management) (other) | `programmes.management.internationalAdmission`; `programmes.management.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `phd-in-nursing-aggregator-claim-only` — PhD in Nursing (Медсестринство) — aggregator claim only (nursing) | `programmes.phd-in-nursing-aggregator-claim-only.internationalAdmission`; `programmes.phd-in-nursing-aggregator-claim-only.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `nursing-at-the-institute-s-professional-college-sub-unit` — Медсестринство (Nursing) — at the institute's professional college sub-unit (nursing) | `programmes.nursing-at-the-institute-s-professional-college-sub-unit.internationalAdmission`; `programmes.nursing-at-the-institute-s-professional-college-sub-unit.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `general-medicine-paramedic-level-at-the-college-sub-unit` — Лікувальна справа (General Medicine / paramedic-level) — at the college sub-unit (medicine) | `programmes.general-medicine-paramedic-level-at-the-college-sub-unit.internationalAdmission`; `programmes.general-medicine-paramedic-level-at-the-college-sub-unit.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `dentistry-related-programme-at-the-college-sub-unit-only` — Стоматологія (dentistry-related programme) — at the college sub-unit only (dentistry) | `programmes.dentistry-related-programme-at-the-college-sub-unit-only.internationalAdmission`; `programmes.dentistry-related-programme-at-the-college-sub-unit-only.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `public-health-frse-directory-claim-only` — Public Health (Громадське здоров'я) — FRSE directory claim only (other) | `programmes.public-health-frse-directory-claim-only.internationalAdmission`; `programmes.public-health-frse-directory-claim-only.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Catalogue profile: type institute, licensed volume 394, alternative name 'Житоми](https://www.education.ua/universities/958/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Relocation lead (unverified): No relocation lead. Zhytomyr is government-controlled territory; 2026-cycle admission listings for the institute (vstup.osvita.ua y2026/r7/319) and its college (y2025/r7/1884) indicate ongoing intake in Zhytomyr. History lead: MON news (2017) "У Житомирі відкрили новий медичний інститут" — the communal HEI "Zhytomyr Medical Institute" was created on the basis of the Zhytomyr Institute of Nursing by decision of a Zhytomyr Regional Council session to allow new specialties. No merger, suspension or reorganisation news for 2025–2026 found; current rector not found.  
   Closure (fill): 
6. Red flag to resolve before any fact is shown: No lead at all for admission of foreign applicants or English-medium teaching; the only 'international' lead is the FRSE phrase 'close cooperation with foreign partners'.  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: No higher-education programme in 222 Medicine, 221 Dentistry or 226 Pharmacy found; the institute is nursing-based (223) plus physical therapy and management. FRSE's 'Dentistry' and 'Public Health' claims are not corroborated by 2025/2026 admission catalogues; dentistry appears only at the professional-college sub-unit.  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: 'Лікувальна справа' and 'Стоматологія' leads belong to the institute's фаховий коледж (vocational level) and must not be presented as medical or dental degree programmes.  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: Name confusion risk: Zhytomyr Polytechnic State University (ztu.edu.ua, separate technical university that dominated the English-language search results), Zhytomyr Institute of MAUP (private, vstup.osvita.ua r7/1186), Polissia National University (polissiauniver.edu.ua), and the predecessor name 'Zhytomyr Institute of Nursing' still used by aggregators.  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: Licence/accreditation status unverified: no EDEBO or NAQA record found in search; catalogue licensed-volume figures conflict (337 vs 394).  
   Closure (fill): 
11. Red flag to resolve before any fact is shown: PhD-in-Nursing licence claim (2026) comes from a third-party aggregator (plandiy.com.ua) only.  
   Closure (fill): 
12. Red flag to resolve before any fact is shown: Fees (39,900 UAH/year master; 25,600 UAH/year college) are catalogue figures, not official and not for foreign students.  
   Closure (fill): 
13. Red flag to resolve before any fact is shown: Inventory group G (communal nursing-level institute): likely outside the directory's scope of medical degree programmes for international applicants.  
   Closure (fill): 
14. Missing evidence: Official site zhim.org.ua not opened: full legal name, founder, structure, rector, contacts unconfirmed.  
   Closure (fill): 
15. Missing evidence: EDEBO extract: licence (specialties, levels, licensed volume) and accreditation certificates — none found; the 337 vs 394 licensed-volume conflict unresolved.  
   Closure (fill): 
16. Missing evidence: NAQA register entry for 223 Nursing (bachelor/master) and any other accredited programme.  
   Closure (fill): 
17. Missing evidence: Any official page on admission of foreign citizens (Rules of Admission section for foreigners, international office, invitation/visa process) — not found.  
   Closure (fill): 
18. Missing evidence: Any evidence of English-medium instruction — not found.  
   Closure (fill): 
19. Missing evidence: Confirmation whether 221 Dentistry and Public Health exist at higher-education level (FRSE claim) or only at the college sub-unit.  
   Closure (fill): 
20. Missing evidence: Official fee schedule (the 39,900 and 25,600 UAH figures are catalogue leads).  
   Closure (fill): 
21. Missing evidence: Date and legal act of the 2017 rename/establishment (Regional Council decision number).  
   Closure (fill): 
22. Missing evidence: Verification of the aggregator PhD-licence claim (2026).  
   Closure (fill): 
23. Missing evidence: MON Study in Ukraine portal page content beyond the ownership line (programmes, languages, contacts).  
   Closure (fill): 
24. Skeptic's note: No lead at all for admission of foreign applicants or English-medium teaching (only FRSE's 'close cooperation with foreign partners').  
   Closure (fill): 
25. Skeptic's note: Only nursing (223) degree leads at higher-education level: bachelor (nursing, midwifery, emergency-medicine specialisation) and master (2025 and 2026 vstup.osvita.ua cards, institution id 319). No 222 Medicine, 221 Dentistry or 226 Pharmacy degree lead; FRSE's 'Dentistry' and 'Public Health' claims are uncorroborated.  
   Closure (fill): 
26. Skeptic's note: The 'Лікувальна справа' and 'Стоматологія' leads belong to the institute's attached vocational college (vstup.osvita.ua id 1884, professional junior bachelor) and must never be shown as medical or dental degree programmes.  
   Closure (fill): 
27. Skeptic's note: Licence and accreditation unverified: no EDEBO or NAQA record found; licensed-volume figures conflict (337 vs 394); the PhD-in-Nursing licence claim rests on one aggregator (plandiy.com.ua).  
   Closure (fill): 
28. Skeptic's note: Official domain zhim.org.ua comes from an admissions catalogue (medium confidence); the site was not opened. Full legal name (KZVO prefix, founder Zhytomyr Regional Council) unverified.  
   Closure (fill): 
29. Skeptic's note: Name-confusion risk with Zhytomyr Polytechnic State University (ztu.edu.ua), Polissia National University, Zhytomyr Institute of MAUP, and the predecessor name 'Zhytomyr Institute of Nursing'.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/zhytomyr-medical-institute.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
