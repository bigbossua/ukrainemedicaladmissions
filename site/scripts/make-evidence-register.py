#!/usr/bin/env python3
"""Generate the evidence registers for manual verification: research/verification/<slug>/EVIDENCE_REGISTER.md
One row per claim that the published profile would show, with the official page to open, what to read, and the
evidence entries recorded for that claim in site/data/evidence/<slug>.json (UNIVERSITY_EVIDENCE_STANDARD.md).
Generated from the record JSON and the evidence file. The "verified value" columns stay empty for manual filling.
Run from the repository root: python3 -I site/scripts/make-evidence-register.py <slug> [<slug> ...]"""
import json, os, sys
from urllib.parse import urlparse
import pathlib
ROOT = str(pathlib.Path(__file__).resolve().parents[2])
os.chdir(ROOT)
SLUGS = sys.argv[1:] or ['vinnytsia-national-pirogov-memorial-medical-university', 'odesa-national-medical-university', 'bukovinian-state-medical-university']
THIRD = {'vstup.osvita.ua'}  # third-party: a lead, never a source
GOV = {'naqa.gov.ua', 'en.naqa.gov.ua', 'universities.studyinukraine.gov.ua', 'studyinukraine.gov.ua', 'mon.gov.ua', 'info.edbo.gov.ua'}  # tier 3 (government or regulator)
EVIDENCE_DIR = 'site/data/evidence'
STANDARD = 'UNIVERSITY_EVIDENCE_STANDARD.md'
ENTRY_KEYS = ['id', 'claimPath', 'statement', 'value', 'sourceUrl', 'sourceOrganisation', 'sourceTier', 'evidenceType', 'quotation',
              'effectiveDate', 'academicYear', 'accessed', 'captureRef', 'status', 'reviewer', 'method', 'contradicts', 'nextReview',
              'decision', 'withholdReason']
STATUSES = {'verified', 'partially-verified', 'conflicting', 'unverified', 'outdated', 'not-applicable'}
EVIDENCE_TYPES = {'web-page', 'pdf', 'owner-capture', 'official-letter'}

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


def esc(t):
    """Make free text safe inside a Markdown table cell."""
    return str(t).replace('|', '\\|').replace('\r', ' ').replace('\n', ' ')


def load_evidence(slug):
    """Read site/data/evidence/<slug>.json. Returns (evidence or None, list of problems). Never raises on bad content."""
    path = f'{EVIDENCE_DIR}/{slug}.json'
    if not os.path.exists(path):
        return None, [f'no evidence file at `{path}`']
    try:
        ev = json.load(open(path, encoding='utf-8'))
    except ValueError as e:
        return None, [f'`{path}` is not valid JSON ({e})']
    if not isinstance(ev, dict):
        return None, [f'`{path}` is not a JSON object']
    problems = []
    if ev.get('slug') != slug:
        problems.append(f'`slug` is "{ev.get("slug")}", expected "{slug}"')
    access = ev.get('access')
    if not isinstance(access, dict) or access.get('status') not in ('blocked', 'open') or not access.get('checked') or not access.get('note'):
        problems.append('`access` must have status "blocked" or "open", a checked date and a note')
    entries = ev.get('entries')
    if not isinstance(entries, list):
        problems.append('`entries` is not a list')
        ev['entries'] = entries = []
    seen = set()
    for i, e in enumerate(entries):
        if not isinstance(e, dict):
            problems.append(f'entry {i} is not an object'); continue
        eid = e.get('id', f'#{i}')
        missing = [k for k in ENTRY_KEYS if k not in e]
        if missing: problems.append(f'`{eid}`: missing {", ".join(missing)}')
        if eid in seen: problems.append(f'`{eid}`: duplicate id')
        seen.add(eid)
        if e.get('status') not in STATUSES: problems.append(f'`{eid}`: unknown status "{e.get("status")}"')
        if e.get('sourceTier') not in (1, 2, 3, 4, 5): problems.append(f'`{eid}`: sourceTier must be 1-5')
        if e.get('evidenceType') not in EVIDENCE_TYPES: problems.append(f'`{eid}`: unknown evidenceType "{e.get("evidenceType")}"')
        if e.get('decision') not in ('publish', 'withhold'): problems.append(f'`{eid}`: decision must be publish or withhold')
        if e.get('decision') == 'withhold' and not e.get('withholdReason'): problems.append(f'`{eid}`: withheld without a withholdReason')
        if not str(e.get('sourceUrl', '')).startswith('https://'): problems.append(f'`{eid}`: sourceUrl is not https')
        if e.get('claimPath') and not str(eid).startswith(f'{slug}/{e["claimPath"]}/'): problems.append(f'`{eid}`: id does not follow `<slug>/<claimPath>/<n>`')
        if e.get('decision') == 'publish' and (e.get('status') != 'verified' or not str(e.get('quotation') or '').strip()):
            problems.append(f'`{eid}`: decision publish needs status verified and a quotation')
    return ev, problems


class Evidence:
    def __init__(self, ev):
        self.ev = ev
        self.entries = [e for e in (ev or {}).get('entries', []) if isinstance(e, dict)]
        self.used = set()

    def cell(self, path, prefix=False):
        """Evidence summary for one claim row. prefix=True also matches child paths (path.<id or index>)."""
        if self.ev is None:
            return 'no evidence file'
        hits = [e for e in self.entries if e.get('claimPath') == path or (prefix and str(e.get('claimPath', '')).startswith(path + '.'))]
        if not hits:
            return 'no evidence recorded'
        parts = []
        for e in hits:
            self.used.add(id(e))
            quote = 'yes' if str(e.get('quotation') or '').strip() else 'no'
            parts.append(esc(f"`{e.get('id')}`: {e.get('status')} · tier {e.get('sourceTier')} · accessed {e.get('accessed')} · quotation {quote} · {e.get('decision')}"))
        return '<br>'.join(parts)

    def unused(self):
        return [e for e in self.entries if id(e) not in self.used]


def claim_row(path, c, what, pages, evidence, prefix=False):
    val = c.get('value')
    if isinstance(val, dict): val = ', '.join(f'{k}: {v}' for k, v in val.items()) or None
    if isinstance(val, list): val = ', '.join(map(str, val)) or None
    lead = f'LEAD: {val}' if val not in (None, '') else '— (no lead)'
    shown = f'{path}.*' if prefix else path
    return f"| `{shown}` | {c.get('status')} | {lead} | {pages} | {what} | {evidence.cell(path, prefix)} |  |  |  |"


def pages_for(refs, hints, key):
    labels = hints.get(key, [])
    chosen = [r for r in refs if any(h.lower() in r['label'].lower() for h in labels)]
    if not chosen: chosen = refs[:1]
    return '<br>'.join(f"[{r['label']}]({r['url']})" for r in chosen)


HEADER = '''| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|'''

for slug in SLUGS:
    d = json.load(open(f'site/src/content/universities/{slug}.json', encoding='utf-8'))
    ev, problems = load_evidence(slug)
    E = Evidence(ev)
    refs = [r for r in d['researchReferences'] if urlparse(r['url']).netloc not in THIRD | GOV]
    gov = [r for r in d['researchReferences'] if urlparse(r['url']).netloc in GOV]
    third = [r for r in d['researchReferences'] if urlparse(r['url']).netloc in THIRD]
    hints = PAGE_HINTS.get(slug, {})
    P = lambda key: pages_for(refs, hints, key)
    published = [e for e in E.entries if e.get('status') == 'verified' and e.get('decision') == 'publish']
    if ev is None:
        access_line = f'**Access:** no evidence file at `{EVIDENCE_DIR}/{slug}.json`. Create it as `{STANDARD}` describes before recording any evidence.'
    else:
        a = ev.get('access') if isinstance(ev.get('access'), dict) else {}
        access_line = f"**Access** (`{EVIDENCE_DIR}/{slug}.json`, checked {a.get('checked')}): **{a.get('status')}**. {a.get('note')}"
    if published:
        status_line = (f'**Status:** {len(published)} evidence entr{"y is" if len(published) == 1 else "ies are"} verified with the decision "publish" (see the evidence column). '
                       'Every other row is NOT verified; a claim is shown as fact only when its record claim is verified and a matching evidence entry exists.')
    else:
        status_line = ('**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment '
                       '(see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.')
    out = []
    w = out.append
    w(f'''# Evidence register — {d['shortName']} (`{slug}`)

{status_line}

{access_line}

**Record under verification:** `site/src/content/universities/{slug}.json` — {len(d['programmes'])} programme(s) with an official-domain lead of international admission ({', '.join(p['name'] for p in d['programmes'])}); {len(d['deferredProgrammes'])} deferred programme(s) kept unpublished until eligibility is read ({', '.join(p['name'] for p in d['deferredProgrammes']) or 'none'}).

**Evidence store:** `{EVIDENCE_DIR}/{slug}.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `{STANDARD}`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

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
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `{EVIDENCE_DIR}/{slug}.json` (status verified, decision publish, exact quotation recorded) as `{STANDARD}` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|''')
    for i, r in enumerate(refs, 1):
        note = f" *({r['note']})*" if r.get('note') else ''
        w(f"| {i} | [{r['label']}]({r['url']}) | {r['purpose']}{note} |  |  |")
    for j, t in enumerate(TO_LOCATE.get(slug, []), len(refs) + 1):
        w(f"| {j} | To locate: {t} | — |  |  |")
    if gov:
        w(f"\nGovernment or regulator pages (tier 3; acceptable only for the claim types `{STANDARD}` §7 allows): " + '; '.join(f"[{r['label']}]({r['url']})" for r in gov))
    if third:
        w(f"\nThird-party pages (leads only, never a source): " + '; '.join(f"[{r['label']}]({r['url']})" for r in third))
    w(f'''
## B. Record-level claims

{HEADER}''')
    w(claim_row('officialName', d['officialName'], 'The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation', P('identity'), E))
    w(claim_row('website', d['website'], 'The canonical domain and the international-students section', P('identity'), E))
    w(claim_row('address', d['address'], 'Postal address exactly as printed on the contacts page', P('contacts'), E))
    w(claim_row('internationalOffice', d['internationalOffice'], 'Name of the unit for foreign applicants, email, phone, page URL', P('contacts'), E))
    w(claim_row('status', d['status'], '"operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so', P('status'), E))
    w(claim_row('statusStatement', d['statusStatement'], 'The university\'s own dated statement on the organisation/format of the current academic year — VERBATIM, with its date', P('status'), E))
    w(claim_row('teachingFormat', d['teachingFormat'], 'in-person / blended / distance exactly as the statement says; otherwise not-published', P('status'), E))
    w(claim_row('founded', d['founded'], 'Founding year only from the official history page', P('identity'), E))
    w(claim_row('accreditation', d['accreditation'], 'Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country', 'NAQA register (to locate)', E))
    w(claim_row('recognition', d['recognition'], 'Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise', 'The destination country\'s recognition authority (to locate per country)', E))
    w(claim_row('accommodation', d['accommodation'], 'Hostel availability and published prices with year, or not-published', P('identity'), E))
    for p in d['programmes']:
        pp = f"programmes.{p['id']}"
        w(f'''
## C. Programme `{p['id']}` — {p['name']} (`programmes[].id = "{p['id']}"`, field {p['field']})

{HEADER}''')
        w(claim_row(f'{pp}.internationalAdmission', p['internationalAdmission'], 'The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it)', P('programmes'), E))
        w(claim_row(f'{pp}.intakeYear', p['intakeYear'], 'The intake/academic year the page refers to, exactly as printed', P('programmes'), E))
        w(claim_row(f'{pp}.level', p['level'], 'Level as the university classifies it (master\'s / single-cycle master\'s / bachelor)', P('programmes'), E))
        w(claim_row(f'{pp}.specialtyCode', p['specialtyCode'], 'Specialty code(s) exactly as printed (e.g. "222", "I2")', P('programmes'), E))
        w(claim_row(f'{pp}.qualification', p['qualification'], 'Exact award title as printed (never MBBS unless printed)', P('programmes'), E))
        w(claim_row(f'{pp}.durationText', p['durationText'], 'Duration exactly as printed (e.g. "5 years 10 months", "12 semesters")', P('programmes'), E))
        w(claim_row(f'{pp}.durationYears', p['durationYears'], 'Whole years only if the page states years', P('programmes'), E))
        w(claim_row(f'{pp}.language', p['language'], 'Languages of instruction offered to foreign applicants for this programme', P('programmes'), E))
        w(claim_row(f'{pp}.format', p['format'], 'Teaching format only from the dated statement (row statusStatement)', P('status'), E))
        w(claim_row(f'{pp}.tuition', p['tuition'], 'Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed"', P('fees'), E))
        for i, oc in enumerate(p.get('otherMandatoryCosts', [])):
            w(claim_row(f'{pp}.otherMandatoryCosts.{i}', oc['cost'], f"Other mandatory charge \"{oc['label']}\": amount, currency, period, academic year, refundable or not, as printed; never added into the tuition", P('fees'), E))
        if not p.get('otherMandatoryCosts'):
            w(claim_row(f'{pp}.otherMandatoryCosts', {'status': 'not-published', 'value': None}, 'Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total', P('fees'), E, prefix=True))
        w(claim_row(f'{pp}.deadlines', p['deadlines'], 'Application window dates with the year as printed; a committee working period is recorded as exactly that', P('dates'), E))
        w(claim_row(f'{pp}.intake', p['intake'], 'Start of studies as printed', P('dates'), E))
        for r in p['requirements']:
            w(claim_row(f"{pp}.requirements.{r['id']}", {'status': r['status'], 'value': r['summary']}, f"Entrance requirement wording verbatim ({r['type']}; subject {r.get('subject', '—')}; format {r.get('examFormat', '—')}); intake year", P('exams'), E))
        if not p['requirements']:
            w(claim_row(f'{pp}.requirements', {'status': 'not-published', 'value': None}, 'Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim', P('exams'), E, prefix=True))
        for doc in p['documents']:
            w(claim_row(f"{pp}.documents.{doc['id']}", {'status': doc['status'], 'value': doc['name'] + (f" ({doc['condition']})" if doc.get('condition') else '')}, 'Document name and any condition (translation, legalisation, format) verbatim', P('documents'), E))
        if not p['documents']:
            w(claim_row(f'{pp}.documents', {'status': 'not-published', 'value': None}, 'The full numbered document list for foreign applicants, with conditions — one row each', P('documents'), E, prefix=True))
    for r in d['preparatoryRoutes']:
        rp = f"preparatoryRoutes.{r['id']}"
        w(f'''
## D. Preparatory route `{r['id']}` — {r['name']}

{HEADER}''')
        for k, what in [('languageOfInstruction', 'Language(s) the preparatory subjects are taught in'), ('englishTrack', 'Whether an English-language preparatory track exists (quote)'), ('durationText', 'Duration exactly as printed'), ('subjects', 'Subject list as printed'), ('certificateName', 'Name of the certificate awarded, as printed'), ('progressionText', 'VERBATIM wording on what completion gives / does not give'), ('appliesToEnglishDegreeTrack', 'Whether English-track degree applicants use this route'), ('startDate', 'Start date or month as printed, with year'), ('fee', 'Fee with currency and academic year as printed; else To be confirmed'), ('eligibilityText', 'Eligibility wording verbatim')]:
            w(claim_row(f'{rp}.{k}', r[k], what, P('prep'), E))
    if d['deferredProgrammes']:
        w('''
## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|''')
        for p in d['deferredProgrammes']:
            pp = f"programmes.{p['id']}"
            cell = f"internationalAdmission: {E.cell(pp + '.internationalAdmission')}<br>language: {E.cell(pp + '.language')}"
            w(f"| `{p['id']}` — {p['name']} ({p['field']}) | `{pp}.internationalAdmission`; `{pp}.language` | {p['internationalAdmission'].get('note', '') or '—'} | {P('programmes')} | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | {cell} |  |  |  |")
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
    unused = E.unused()
    w('## H. Evidence file check (generated)\n')
    if ev is None:
        w(f'- No evidence file: `{EVIDENCE_DIR}/{slug}.json` does not exist or cannot be read. Nothing can count as verified until it exists.')
    else:
        w(f'- {len(E.entries)} evidence entr{"y" if len(E.entries) == 1 else "ies"} in `{EVIDENCE_DIR}/{slug}.json`; {len(published)} verified with the decision "publish".')
        if unused:
            w(f'- {len(unused)} entr{"y does" if len(unused) == 1 else "ies do"} not match any claim path in sections B–E (fix the `claimPath` or add the claim to the record):')
            for e in unused:
                w(f"  - `{esc(e.get('id'))}` (claimPath `{esc(e.get('claimPath'))}`): {esc(e.get('status'))} · tier {esc(e.get('sourceTier'))} · {esc(e.get('decision'))}")
        elif E.entries:
            w('- Every entry matches a claim path in sections B–E.')
    for pr in problems:
        w(f'- Problem: {esc(pr)}')
    if not problems and ev is not None:
        w('- No structural problems found in the evidence file.')
    w('')
    os.makedirs(f'research/verification/{slug}', exist_ok=True)
    open(f'research/verification/{slug}/EVIDENCE_REGISTER.md', 'w', encoding='utf-8').write('\n'.join(out))
    for pr in problems:
        print(f'warning {slug}: {pr}', file=sys.stderr)
    print('wrote', slug, 'pages', len(refs), 'to-locate', len(TO_LOCATE.get(slug, [])), 'programmes', len(d['programmes']), 'deferred', len(d['deferredProgrammes']),
          'openQ', len(d['verification']['openQuestions']), 'evidence', 'missing' if ev is None else f"{len(E.entries)} entries ({len(published)} publish, {len(unused)} unmatched)",
          'access', 'missing' if ev is None else (ev.get('access') or {}).get('status'))
