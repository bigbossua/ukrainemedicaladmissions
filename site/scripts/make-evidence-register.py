#!/usr/bin/env python3
"""Generate the evidence registers for manual verification: research/verification/<slug>/EVIDENCE_REGISTER.md
One row per claim that the published profile would show, with the official page to open and what to read.
Every "verified value" column is EMPTY: nothing has been verified. Generated from the record JSON (exact field paths)."""
import json, os, sys
from urllib.parse import urlparse
import pathlib
ROOT = str(pathlib.Path(__file__).resolve().parents[2])
os.chdir(ROOT)
SLUGS = sys.argv[1:] or ['vinnytsia-national-pirogov-memorial-medical-university', 'odesa-national-medical-university', 'bukovinian-state-medical-university']
THIRD = {'vstup.osvita.ua', 'naqa.gov.ua', 'universities.studyinukraine.gov.ua'}

# Which official page (by research-reference label keyword) answers which field. Keyed per slug; fallback = all official refs.
PAGE_HINTS = {
    'vinnytsia-national-pirogov-memorial-medical-university': {
        'identity': ['about the university', 'Documents (new site)'], 'contacts': ['about the university'], 'status': ['Orders and directives'],
        'programmes': ['admission conditions', 'Medicine programme 2025', 'procedures 2026'], 'fees': ['Tuition fee 2026–2027', 'Tuition fee 2025–2026'],
        'documents': ['Document list'], 'exams': ['admission conditions', 'procedures 2026'], 'dates': ['procedures 2026'], 'prep': ['Preparatory faculty', 'Preparatory department article', 'Tuition fee 2026–2027'],
    },
    'odesa-national-medical-university': {
        'identity': ['Important information'], 'contacts': ['Admission commission requirements', 'International faculty'], 'status': ['Education news'],
        'programmes': ['Master\'s degree programmes', 'Educational programmes for foreign citizens', 'Applicants 2026'], 'fees': ['Fees for foreign citizens', 'Tuition instalments'],
        'documents': ['Information on admission 2026'], 'exams': ['Information on admission 2026', 'Entrance examination programmes'], 'dates': ['Information on admission 2026'], 'prep': ['Preparatory department', 'Fees for foreign citizens'],
    },
    'bukovinian-state-medical-university': {
        'identity': ['Official English homepage'], 'contacts': ['International FAQ'], 'status': ['Annual report 2025', 'Results of 2024–25'],
        'programmes': ['Medical Faculty No. 3', 'Admissions sub-site', 'English entrance-exam programme 2026'], 'fees': ['Tuition fees'],
        'documents': ['International FAQ'], 'exams': ['English entrance-exam programme 2026'], 'dates': ['Admissions sub-site'], 'prep': ['Preparatory course page', 'Tuition fees'],
    },
}
TO_LOCATE = {
    'vinnytsia-national-pirogov-memorial-medical-university': ['Official contacts page with the postal address (www.vnmu.edu.ua or foreign.vnmu.edu.ua) — not surfaced by any snippet', 'The current order on the organisation of the educational process (No. 146 of 20.08.2025 or its 2026–27 successor): capture the orders list page AND the order itself', 'EDEBO (info.edbo.gov.ua) or universities.studyinukraine.gov.ua entry for ВНМУ ім. М.І. Пирогова'],
    'odesa-national-medical-university': ['A DATED current-year (2025–26 or 2026–27) notice on teaching format and location, found via the education news category — capture the index AND the notice', 'The fee page in full, including the table header and its academic-year label', 'EDEBO or Ministry-portal entry'],
    'bukovinian-state-medical-university': ['Official contacts page with the postal address — not surfaced by any snippet', 'The Medicine, Dentistry and Pharmacy programme pages linked from the faculty pages (level, award title, duration)', 'The 2026/27 Rules of admission for foreign citizens on vstup.bsmu.edu.ua — capture the index AND the rules', 'A dated university-wide notice on the 2026–27 teaching format (news section)', 'EDEBO or Ministry-portal entry (university id 21)'],
}

def claim_row(field, c, what, pages, kind='claim'):
    val = c.get('value')
    if isinstance(val, dict): val = ', '.join(f'{k}: {v}' for k, v in val.items()) or None
    if isinstance(val, list): val = ', '.join(map(str, val)) or None
    lead = f'LEAD: {val}' if val not in (None, '') else '— (no lead)'
    return f"| `{field}` | {c.get('status')} | {lead} | {pages} | {what} |  |  |  |"

def pages_for(refs, hints, key):
    labels = hints.get(key, [])
    chosen = [r for r in refs if any(h.lower() in r['label'].lower() for h in labels)]
    if not chosen: chosen = refs[:1]
    return '<br>'.join(f"[{r['label']}]({r['url']})" for r in chosen)

for slug in SLUGS:
    d = json.load(open(f'site/src/content/universities/{slug}.json', encoding='utf-8'))
    refs = [r for r in d['researchReferences'] if urlparse(r['url']).netloc not in THIRD]
    third = [r for r in d['researchReferences'] if urlparse(r['url']).netloc in THIRD]
    hints = PAGE_HINTS.get(slug, {})
    P = lambda key: pages_for(refs, hints, key)
    out = []
    w = out.append
    w(f'''# Evidence register — {d['shortName']} (`{slug}`)

**Status:** NOTHING VERIFIED. Every "Verified value / wording" cell below is empty because no official page could be opened from the build environment (DNS blocked for `.ua` domains, tested 2026-10-11 with curl and the fetch tool). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Record under verification:** `site/src/content/universities/{slug}.json` — {len(d['programmes'])} programme(s) with an official-domain lead of international admission ({', '.join(p['name'] for p in d['programmes'])}); {len(d['deferredProgrammes'])} deferred programme(s) kept unpublished until eligibility is read ({', '.join(p['name'] for p in d['deferredProgrammes']) or 'none'}).

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `{slug}--NN--short-name.pdf` where NN is the row number of this register (e.g. `{slug}--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date).

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|''')
    for i, r in enumerate(refs, 1):
        note = f" *({r['note']})*" if r.get('note') else ''
        w(f"| {i} | [{r['label']}]({r['url']}) | {r['purpose']}{note} |  |  |")
    for j, t in enumerate(TO_LOCATE.get(slug, []), len(refs) + 1):
        w(f"| {j} | To locate: {t} | — |  |  |")
    if third:
        w(f"\nCross-check only, never a source: " + '; '.join(f"[{r['label']}]({r['url']})" for r in third))
    w('''
## B. Record-level claims

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|''')
    w(claim_row('officialName', d['officialName'], 'The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation', P('identity')))
    w(claim_row('website', d['website'], 'The canonical domain and the international-students section', P('identity')))
    w(claim_row('address', d['address'], 'Postal address exactly as printed on the contacts page', P('contacts')))
    w(claim_row('internationalOffice', d['internationalOffice'], 'Name of the unit for foreign applicants, email, phone, page URL', P('contacts')))
    w(claim_row('status', d['status'], '"operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so', P('status')))
    w(claim_row('statusStatement', d['statusStatement'], 'The university\'s own dated statement on the organisation/format of the current academic year — VERBATIM, with its date', P('status')))
    w(claim_row('teachingFormat', d['teachingFormat'], 'in-person / blended / distance exactly as the statement says; otherwise not-published', P('status')))
    w(claim_row('founded', d['founded'], 'Founding year only from the official history page', P('identity')))
    w(claim_row('accreditation', d['accreditation'], 'Only from the NAQA register or the certificate; a news item is not evidence', 'NAQA register (to locate)'))
    w(claim_row('recognition', d['recognition'], 'At most a bare "listed in the World Directory of Medical Schools" with its own URL; never licensing implications', 'search.wdoms.org (to locate)'))
    w(claim_row('accommodation', d['accommodation'], 'Hostel availability and published prices with year, or not-published', P('identity')))
    for p in d['programmes']:
        w(f'''
## C. Programme `{p['id']}` — {p['name']} (`programmes[].id = "{p['id']}"`, field {p['field']})

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|''')
        w(claim_row('internationalAdmission', p['internationalAdmission'], 'The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it)', P('programmes')))
        w(claim_row('intakeYear', p['intakeYear'], 'The intake/academic year the page refers to, exactly as printed', P('programmes')))
        w(claim_row('level', p['level'], 'Level as the university classifies it (master\'s / single-cycle master\'s / bachelor)', P('programmes')))
        w(claim_row('specialtyCode', p['specialtyCode'], 'Specialty code(s) exactly as printed (e.g. "222", "I2")', P('programmes')))
        w(claim_row('qualification', p['qualification'], 'Exact award title as printed (never MBBS unless printed)', P('programmes')))
        w(claim_row('durationText', p['durationText'], 'Duration exactly as printed (e.g. "5 years 10 months", "12 semesters")', P('programmes')))
        w(claim_row('durationYears', p['durationYears'], 'Whole years only if the page states years', P('programmes')))
        w(claim_row('language', p['language'], 'Languages of instruction offered to foreign applicants for this programme', P('programmes')))
        w(claim_row('format', p['format'], 'Teaching format only from the dated statement (row statusStatement)', P('status')))
        w(claim_row('tuition', p['tuition'], 'Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation — ALL as printed; if the page shows another year or is silent → "To be confirmed"', P('fees')))
        w(claim_row('deadlines', p['deadlines'], 'Application window dates with the year as printed; a committee working period is recorded as exactly that', P('dates')))
        w(claim_row('intake', p['intake'], 'Start of studies as printed', P('dates')))
        for r in p['requirements']:
            w(claim_row(f"requirements[{r['id']}]", {'status': r['status'], 'value': r['summary']}, f"Entrance requirement wording verbatim ({r['type']}; subject {r.get('subject', '—')}; format {r.get('examFormat', '—')}); intake year", P('exams')))
        if not p['requirements']:
            w(claim_row('requirements[]', {'status': 'not-published', 'value': None}, 'Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim', P('exams')))
        for doc in p['documents']:
            w(claim_row(f"documents[{doc['id']}]", {'status': doc['status'], 'value': doc['name'] + (f" ({doc['condition']})" if doc.get('condition') else '')}, 'Document name and any condition (translation, legalisation, format) verbatim', P('documents')))
        if not p['documents']:
            w(claim_row('documents[]', {'status': 'not-published', 'value': None}, 'The full numbered document list for foreign applicants, with conditions — one row each', P('documents')))
    for r in d['preparatoryRoutes']:
        w(f'''
## D. Preparatory route `{r['id']}` — {r['name']}

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|''')
        for k, what in [('languageOfInstruction', 'Language(s) the preparatory subjects are taught in'), ('englishTrack', 'Whether an English-language preparatory track exists (quote)'), ('durationText', 'Duration exactly as printed'), ('subjects', 'Subject list as printed'), ('certificateName', 'Name of the certificate awarded, as printed'), ('progressionText', 'VERBATIM wording on what completion gives / does not give'), ('appliesToEnglishDegreeTrack', 'Whether English-track degree applicants use this route'), ('startDate', 'Start date or month as printed, with year'), ('fee', 'Fee with currency and academic year as printed; else To be confirmed'), ('eligibilityText', 'Eligibility wording verbatim')]:
            w(claim_row(k, r[k], what, P('prep')))
    if d['deferredProgrammes']:
        w('''
## E. Deferred programmes — eligibility question only (stay unpublished until answered)

| Programme (`deferredProgrammes[].id`) | Field | Lead | Page(s) to open | What to read | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|''')
        for p in d['deferredProgrammes']:
            w(f"| `{p['id']}` — {p['name']} ({p['field']}) | internationalAdmission; language | {p['internationalAdmission'].get('note', '') or '—'} | {P('programmes')} | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred |  |  |  |")
    w(f'''
## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)

''')
    for i, q in enumerate(d['verification']['openQuestions'], 1):
        w(f"{i}. {q}  \n   Closure (fill): ")
    w('''
## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
''')
    os.makedirs(f'research/verification/{slug}', exist_ok=True)
    open(f'research/verification/{slug}/EVIDENCE_REGISTER.md', 'w', encoding='utf-8').write('\n'.join(out))
    print('wrote', slug, 'pages', len(refs), 'to-locate', len(TO_LOCATE.get(slug, [])), 'programmes', len(d['programmes']), 'deferred', len(d['deferredProgrammes']), 'openQ', len(d['verification']['openQuestions']))
