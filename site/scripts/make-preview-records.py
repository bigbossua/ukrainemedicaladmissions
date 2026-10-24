#!/usr/bin/env python3
"""Generate name-only research-preview records (N25/N27) from a research-results file.

Input: a JSON array of objects {research: {...}, verdict: {...}} as produced by the directory-expansion research workflow
(2026-10-24): search-result LEADS about an institution plus an independent skeptic's verdict. Only entries whose verdict
says listable=true and names no duplicate are written. Every claim in the record is `unverified` (with a provenance note)
or `not-published`; nothing is `verified`, no fee, deadline or intake date is recorded, and the record opts in to a
research preview only (publishable: false). The evidence file carries the access block (blocked) and no entries.

Run from the repository root:  python3 -I site/scripts/make-preview-records.py <results.json> <probe.json> [--dry-run]
<probe.json> is the output of `node site/scripts/probe-access.mjs --list <hosts> --json <probe.json>` for the new hosts,
so the access note states what was actually tested. Existing record files are never overwritten.
"""
import json, os, re, sys, pathlib

ROOT = str(pathlib.Path(__file__).resolve().parents[2])
os.chdir(ROOT)
RECORDS = 'site/src/content/universities'
EVIDENCE = 'site/data/evidence'
TODAY = '2026-10-24'
GOV_HOSTS = ['universities.studyinukraine.gov.ua', 'mon.gov.ua', 'registry.edbo.gov.ua', 'vstup.edbo.gov.ua', 'naqa.gov.ua', 'en.naqa.gov.ua']
FIELD_MAP = {'medicine': 'medicine', 'dentistry': 'dentistry', 'pharmacy': 'pharmacy', 'nursing': 'nursing'}

def claim(value=None, status='not-published', note=''):
    return {'value': value, 'status': status, 'source': None, 'checked': None, 'note': note}

def lead(value, what, src=''):
    return claim(value, 'unverified', f'Search-snippet lead ({what}, {TODAY}) — NOT verified; read the official page before publishing.' + (f' Source seen: {src}.' if src else ''))

def level_of(text):
    t = (text or '').lower()
    if 'junior' in t: return 'junior_bachelor'
    if 'integrated' in t or 'single-cycle' in t: return 'integrated_master'
    if 'master' in t or 'doctor of medicine' in t or 'specialist' in t: return 'master'
    if 'bachelor' in t: return 'bachelor'
    if 'phd' in t or 'doctor of philosophy' in t: return 'phd'
    return None

def programme(p, idx):
    field = FIELD_MAP.get(p.get('field'), 'other')
    # Ids are used as page anchors and CSS selectors: letters first, so "222 Medicine" becomes "medicine-222".
    pid = re.sub(r'[^a-z0-9]+', '-', (p.get('name') or field).lower()).strip('-') or f'programme-{idx}'
    if not re.match(r'^[a-z]', pid): pid = f'{field}-{pid}'
    lvl = level_of(p.get('level'))
    src = p.get('source') or ''
    foreign = bool(p.get('foreignApplicantsLead'))
    langs = ['English', 'Ukrainian'] if p.get('englishMediumLead') else None
    return {
        'id': pid, 'name': p.get('name') or field.capitalize(), 'field': field,
        'level': lead(lvl, 'level as described in the result', src) if lvl else claim(None, 'not-published', 'Level not stated in the returned text; read the programme page.'),
        'specialtyCode': claim(None, 'not-published', 'Record the specialty code only from the official programme page or the licence register.'),
        'qualification': claim(None, 'not-published', 'Record the exact award title as the university prints it; never "MBBS" unless the university uses it.'),
        'durationYears': claim(None, 'not-published', 'Not recorded; read the programme page.'),
        'durationText': claim(None, 'not-published', 'Record the duration exactly as published.'),
        'language': lead(langs, 'language of instruction as described in the result', src) if langs else claim(None, 'not-published', 'Language of instruction not stated in the returned text.'),
        'format': claim(None, 'not-published', 'Teaching format for the current year must come from a dated official statement.'),
        'internationalAdmission': lead(True, 'admission of foreign applicants as described in the result', src) if foreign else claim(None, 'not-published', 'No lead that this programme admits foreign applicants; verify on the official admissions page.'),
        'intakeYear': claim(None, 'not-published', 'No year in the returned text.'),
        'tuition': claim(None, 'not-published', 'No fee recorded: fees are recorded only from the official fee page with their academic year.'),
        'otherMandatoryCosts': [],
        'entryRequirements': claim(None, 'not-published', 'Not recorded; read the official admission rules for foreign applicants.'),
        'requirements': [],
        'requiredDocuments': claim(None, 'not-published', 'Not recorded; read the official document list for foreign applicants.'),
        'documents': [],
        'deadlines': claim(None, 'not-published', 'No date is recorded.'),
        'intake': claim(None, 'not-published', 'Start of studies for the current intake not found.'),
    }

def build(r, v, probe_note):
    slug = r['slug']
    short = (v.get('correctedShortName') or r['shortName']).strip()
    domain = (v.get('correctedDomain') or r.get('officialDomain') or '').strip().lower().rstrip('/')
    website = f'https://{domain}/' if domain else None
    status_lead = r.get('operatingStatusLead') or 'unknown'
    status_value = status_lead if status_lead in ('operating', 'relocated') else 'unknown'
    programmes = [programme(p, i) for i, p in enumerate(r.get('programmes') or [])]
    listed = [p for p in programmes if p['internationalAdmission']['value'] is True]
    deferred = [p for p in programmes if p['internationalAdmission']['value'] is not True]
    # Unique ids across both lists.
    seen = set()
    for p in listed + deferred:
        base = p['id']; n = 2
        while p['id'] in seen: p['id'] = f'{base}-{n}'; n += 1
        seen.add(p['id'])
    refs = []
    for s in r.get('sources') or []:
        url = (s.get('url') or '').strip()
        if not url.startswith('https://') or any(x['url'] == url for x in refs): continue
        refs.append({'label': (s.get('what') or 'Source')[:80], 'url': url, 'purpose': (s.get('what') or 'Lead')[:200], 'snippetDate': TODAY, 'note': f"Result date as shown: {s.get('date') or 'undated'}. Search-result lead, not read in full."})
    # Aliases: never the card title itself, nor a part of it (the preview page prints the title, and the gate's leak check
    # looks for every alternative name in the built page).
    alts = [a.strip() for a in dict.fromkeys([r.get('officialNameEn'), r.get('officialNameUk'), *(r.get('aliases') or [])]) if a and a.strip() and a.strip().lower() not in short.lower()]
    # City: the town name only; a long "reported base" note from the research goes to the open questions.
    city_raw = (r.get('city') or '').strip()
    city = re.split(r'[,(;]', city_raw)[0].strip() or 'Ukraine'
    city_note = city_raw if city_raw != city else ''
    fields = sorted({p['field'] for p in programmes} - {'other'})
    kind = {'medical-university': 'a medical university', 'multi-faculty-university': 'a multi-faculty university', 'medical-academy-or-institute': 'a medical academy or institute'}.get(r.get('institutionType'), 'an institution')
    own = r.get('ownership') if r.get('ownership') in ('state', 'communal', 'private') else 'unknown ownership'
    overview = (f"Research draft record, unpublished: every statement below is an unverified lead, not a verified fact. Described in search results as {kind} ({own}) in {r.get('city') or 'a city still to be confirmed'}, Ukraine"
                + (f", with leads for {', '.join(fields)} programmes" if fields else '')
                + f". Draft record built from search-result leads on {TODAY}; no official page was opened (official hosts are refused by this environment's network policy). "
                + ("The institution is reported as relocated; its current base is unconfirmed. " if status_lead == 'relocated' else '')
                + "No fee, deadline or intake date is recorded. Every field is awaiting verification against the official pages listed under research references, and nothing here is presented as a current fact.")
    open_q = ['Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.',
              'Dated official statement for the current academic year on whether, where and how foreign students are taught.',
              'State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.',
              'Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.']
    if city_note: open_q.append(f'Location lead as found (unverified): {city_note}')
    if r.get('relocationNote'): open_q.append(f'Relocation lead (unverified): {r["relocationNote"]}')
    open_q += [f'Red flag to resolve before any fact is shown: {f}' for f in (r.get('redFlags') or [])]
    open_q += [f'Missing evidence: {m}' for m in (r.get('missingEvidence') or [])]
    open_q += [f"Skeptic's note: {p}" for p in (v.get('problems') or [])]
    record = {
        'slug': slug, 'synthetic': False,
        'officialName': lead(r.get('officialNameEn') or short, 'official name as it appears in the results'),
        'shortName': short, 'alternativeNames': alts,
        'status': lead(status_value, 'operating status as described in the results') if status_value != 'unknown' else claim('unknown', 'unverified', f'No clear lead on operating status ({TODAY}); read a dated official statement.'),
        'statusStatement': claim(None, 'not-published', 'No current-year official statement found.'),
        'teachingFormat': claim(None, 'not-published', 'Read from a dated official statement for the current academic year.'),
        'city': city,
        'address': claim(None, 'not-published', 'Record the postal address only from the official contacts page or the EDEBO register.'),
        'website': lead(website, f'official domain, confidence {r.get("domainConfidence", "low")}') if website else claim(None, 'not-published', 'Official domain unsettled; confirm against the EDEBO register before linking.'),
        'internationalOffice': lead({'url': r['internationalOfficeUrl']}, 'international-applicants page') if (r.get('internationalOfficeUrl') or '').startswith('https://') else claim(None, 'not-published', 'International office page not found.'),
        'founded': claim(None, 'not-published', 'Record the founding year from the official history page.'),
        'overview': overview,
        'accreditation': claim(None, 'not-published', 'Record accreditation only from a NAQA register entry or the official certificate; registration, licence and accreditation are separate claims.'),
        'recognition': claim(None, 'not-published', 'Recognition is decided separately by each destination country\'s regulator; record only from a listed tier-4 source.'),
        'accommodation': claim(None, 'not-published', 'Record only published hostel details.'),
        'programmes': listed, 'deferredProgrammes': deferred, 'preparatoryRoutes': [], 'researchReferences': refs, 'faqs': [], 'images': [],
        'verification': {'publishable': False, 'researchPreview': True, 'lastReview': None, 'openQuestions': open_q},
    }
    hosts = [domain] if domain else []
    evidence = {'slug': slug, 'access': {'status': 'blocked', 'checked': TODAY, 'note': probe_note(hosts)}, 'entries': []}
    return record, evidence

def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    dry = '--dry-run' in sys.argv
    results = json.load(open(args[0]))
    probe = json.load(open(args[1])) if len(args) > 1 else None
    def probe_note(hosts):
        tested = ', '.join(hosts + GOV_HOSTS)
        if probe is None:
            status = "Every host was refused at the environment's proxy under its network policy (403 to CONNECT)."
        else:
            res = probe.get('results') or []
            blocked = [x for x in res if str(x.get('result', '')).upper().startswith('BLOCK')]
            opened = [x for x in res if str(x.get('result', '')).upper().startswith('OPEN')]
            status = (f"Probe on {probe.get('checked', TODAY)} over the fourth host list (research/verification/ALLOWLIST_P4.txt, {len(res)} hosts): "
                      f"{len(blocked)} refused at the environment's proxy under its network policy (403 to CONNECT), {len(opened)} open.")
        return (f"Tested on {TODAY} from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: {tested}. {status} "
                "No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. "
                "A refused request is an access limitation, never evidence about the institution.")
    written, skipped = [], []
    for item in results:
        if not item or not item.get('research') or not item.get('verdict'): continue
        r, v = item['research'], item['verdict']
        if not v.get('listable') or (v.get('isDuplicateOf') or '').strip():
            skipped.append((r['slug'], 'not listable' if not v.get('listable') else f"duplicate of {v['isDuplicateOf']}")); continue
        rec, ev = build(r, v, probe_note)
        rp, ep = f"{RECORDS}/{rec['slug']}.json", f"{EVIDENCE}/{rec['slug']}.json"
        if os.path.exists(rp): skipped.append((rec['slug'], 'record exists')); continue
        if not dry:
            json.dump(rec, open(rp, 'w', encoding='utf-8'), ensure_ascii=False, indent=2); open(rp, 'a').write('\n')
            json.dump(ev, open(ep, 'w', encoding='utf-8'), ensure_ascii=False, indent=2); open(ep, 'a').write('\n')
        written.append(rec['slug'])
    print(f"written {len(written)}: {', '.join(written)}")
    for s, why in skipped: print(f"skipped {s}: {why}")

if __name__ == '__main__':
    main()
