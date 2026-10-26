#!/usr/bin/env python3
"""Verification status of every university record, for a reader who did not build the site.

    python3 -I site/scripts/make-verification-status.py        (from the repository root; writes research/verification/VERIFICATION_STATUS.md)

Reads src/content/universities/*.json and data/evidence/*.json only. Counting method (stated in the file):
  - verified fact      = a claim marked verified with an https source, a check date AND a matching verified evidence entry
                         (the publication policy shows nothing else; today: none, every official host is refused);
  - reported lead      = what the public pages print under "Reported" (type, city, programme areas, website with sources);
  - open question      = an entry in verification.openQuestions (must be closed before the record can publish);
  - evidence entries   = entries in the record's evidence file (0 means no official page has been read).
Nothing here is a fact about a university; it describes the state of our records.
"""
import json, pathlib, re, datetime

ROOT = pathlib.Path(__file__).resolve().parents[2]
REC = ROOT / 'site/src/content/universities'
EVI = ROOT / 'site/data/evidence'
OUT = ROOT / 'research/verification/VERIFICATION_STATUS.md'
DIST = ROOT / 'site/dist'
SITE = 'https://ukrainemedicaladmissions.com'
CORE = [('officialName', 'official name'), ('website', 'official website'), ('address', 'address'), ('status', 'operating status'), ('statusStatement', 'current-year statement'), ('teachingFormat', 'teaching format')]
NOT_SOURCE = re.compile(r'(^|\.)(google|bing|yahoo|yandex|baidu|duckduckgo|facebook|instagram|youtube|tiktok|twitter|linkedin|reddit|telegram|whatsapp|archive)\.')
TYPES = {'state-medical-university': 'State medical university', 'state-pharmacy-university': 'State pharmacy university', 'relocated-state-medical-university': 'State medical university, reported as relocated', 'multi-faculty-university': 'Multi-faculty university', 'private-university-or-institute': 'Private university or institute', 'communal-medical-academy-or-institute': 'Communal medical academy or institute', 'health-programmes-university': 'University with pharmacy, nursing or allied-health programmes'}

def host(u):
    m = re.match(r'https?://([^/]+)', u or '')
    return re.sub(r'^www\.', '', m.group(1).lower()) if m else None

def claims(o, path=''):
    out = []
    if isinstance(o, dict):
        if {'value', 'status', 'source', 'checked'} <= set(o): out.append((path, o))
        else:
            for k, v in o.items(): out += claims(v, f'{path}.{k}' if path else k)
    elif isinstance(o, list):
        for i, v in enumerate(o): out += claims(v, f'{path}.{i}')
    return out

rows = []
for f in sorted(REC.glob('*.json')):
    r = json.loads(f.read_text())
    ev = json.loads((EVI / f.name).read_text()) if (EVI / f.name).exists() else {}
    entries = ev.get('entries') or []
    verified_entries = {e.get('claimPath') for e in entries if e.get('status') == 'verified' and e.get('decision') == 'publish'}
    verified = [p for p, c in claims(r) if c.get('status') == 'verified' and c.get('source') and c.get('checked') and p in verified_entries]
    refs = [x for x in r.get('researchReferences') or [] if x.get('url', '').startswith('https://') and not NOT_SOURCE.search(host(x['url']) or '')]
    w = r.get('website') or {}
    wh = host(w.get('value')) if w.get('value') else None
    office = ((r.get('internationalOffice') or {}).get('value') or {}).get('url')
    plain = lambda u: re.fullmatch(r'[\x21-\x7e]+', u) and not re.search(r'%[0-9a-f]{2}', u, re.I) and not re.search(r'\.(pdf|docx?|xlsx?|pptx?)(\?|#|$)', u, re.I)
    sources = [x for x in refs if x['url'] != office and plain(x['url']) and (host(x['url']) == wh or re.match(r'^website lead\b', x.get('label', ''), re.I))][:3]
    if w.get('status') == 'conflicting': website = 'withheld: sources conflict'
    elif wh and sources: website = f'{wh} ({len(sources)} source{"s" if len(sources) != 1 else ""})'
    elif wh: website = 'not reported: no listing or official page seen'
    else: website = 'no lead'
    dates = sorted({x.get('snippetDate') for x in refs if x.get('snippetDate')})
    fields = sorted({p.get('field') for p in (r.get('programmes') or []) + (r.get('deferredProgrammes') or []) if p.get('field')})
    # Profile URL and indexing, read from the BUILT site (site/dist, run `npm run build` first) and its sitemap.
    url = f"{SITE}/universities/{r['slug']}/"
    page = DIST / 'universities' / r['slug'] / 'index.html'
    sm = (DIST / 'sitemap-0.xml').read_text() if (DIST / 'sitemap-0.xml').exists() else ''
    if page.exists():
        h = page.read_text()
        rob = (re.search(r'<meta name="robots" content="([^"]+)"', h) or [None, '?'])[1]
        can = (re.search(r'<link rel="canonical" href="([^"]+)"', h) or [None, ''])[1]
        indexable = 'noindex' not in rob and can == url
    else:
        rob, can, indexable = 'no page', '', False
    in_sitemap = f'<loc>{url}</loc>' in sm
    missing = [label for k, label in CORE if (r.get(k) or {}).get('status') != 'verified']
    if not any((p.get('internationalAdmission') or {}).get('status') == 'verified' for p in r.get('programmes') or []): missing.append('a programme open to international applicants')
    reason = '' if in_sitemap else ('research preview (noindex, follow): not verified: ' + ', '.join(missing) if missing else 'not published')
    acc = ev.get('access') or {}
    access = f"{acc.get('status', 'not recorded')} ({acc.get('checked', '-')})"
    rows.append((r['shortName'], r['slug'], TYPES.get(r.get('institutionType'), 'not recorded'), r.get('city') or '', website, dates[-1] if dates else '-', len(verified), len(entries), len(r['verification'].get('openQuestions') or []), ', '.join(fields), url, rob, 'self' if can == url else (can or 'none'), indexable, in_sitemap, reason, access))

today = datetime.date.today().isoformat()
n = len(rows); v = sum(1 for x in rows if x[6] > 0); wsites = sum(1 for x in rows if '(' in x[4])
lines = [f'# Verification status of the university records ({today})', '',
         f'Generated by `site/scripts/make-verification-status.py` from `site/src/content/universities/` and `site/data/evidence/`. Regenerate after any record change.', '',
         '**Counting method.** A record is *verified* only for a claim marked verified with an https source, a check date and a matching verified evidence entry; the public pages show nothing else as fact. A *reported lead* is what the pages print under "Reported" (institution type, city, programme areas, and the website address with the public pages it was seen on). *Open questions* must be closed before a record can publish. *Evidence entries* are readings of official pages; 0 means none has been read (every official host, the government registers and the web archive are refused by the build environment; see `UNIVERSITY_EVIDENCE_STANDARD.md`).', '',
         f'**Totals.** Records: {n}. Records with at least one verified fact: {v}. Verified programme records: 0. Published profiles: 0. Research previews (listed, noindex, outside the sitemap): {n}. Previews reporting a website: {wsites}. Previews awaiting any official-source verification: {n}.', '',
         '| University | Type (reported) | City (reported) | Website (reported) | Latest lead | Verified facts | Evidence entries | Official-source access | Open questions | Programme areas (reported) |', '|---|---|---|---|---|---|---|---|---|---|']
for x in rows:
    lines.append(f'| [{x[0]}](../../site/src/content/universities/{x[1]}.json) | {x[2]} | {x[3]} | {x[4]} | {x[5]} | {x[6]} | {x[7]} | {x[16]} | {x[8]} | {x[9]} |')
routes = sum(1 for x in rows if x[11] != 'no page'); idx = sum(1 for x in rows if x[13]); smn = sum(1 for x in rows if x[14])
sm_total = len(re.findall(r'<loc>', (DIST / 'sitemap-0.xml').read_text())) if (DIST / 'sitemap-0.xml').exists() else 0
lines += ['', '## Profile URLs and indexing', '',
          f'Read from the built site (`site/dist`) and its sitemap. Profile routes built: {routes} of {n}. Self-canonical: {sum(1 for x in rows if x[12] == "self")}. Indexable: {idx}. Profile URLs in the sitemap: {smn}. Sitemap URLs in total: {sm_total}. A profile enters the sitemap automatically once its record is published under the publication policy (verified core facts and at least one verified programme); until then it is a research preview: reachable, linked from the directory, `noindex, follow`, outside the sitemap.', '',
          '| Profile URL | Robots | Canonical | In sitemap | Reason excluded |', '|---|---|---|---|---|']
for x in rows:
    lines.append(f'| {x[10]} | {x[11]} | {x[12]} | {"yes" if x[14] else "no"} | {x[15] or "-"} |')
lines += ['', 'Per-record detail: `research/verification/<slug>/EVIDENCE_REGISTER.md` (pages to capture) and `npm run report:publication` in `site/` (every claim and why it is withheld).', '']
OUT.write_text('\n'.join(lines))
print(f'wrote {OUT.relative_to(ROOT)}: {n} records, {v} with a verified fact, {wsites} reporting a website')
