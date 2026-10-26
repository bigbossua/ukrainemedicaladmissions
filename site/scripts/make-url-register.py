#!/usr/bin/env python3
"""URL opportunity register (KEYWORD_URL_MAP.md section 20), rebuilt from the SEMrush exports and the records.

    python3 -I site/scripts/make-url-register.py        (from the repository root; rewrites section 20, the last section)

Reads research/semrush/*.csv and src/content/universities/*.json only; makes no SEMrush call. Every figure is copied
from an export line: columns are picked by header name (the files do not share one column order), the database comes
from the file name or its database column, and each figure carries its source type (exact, broad, question,
competitor-ranking lead). Types are never added together and overlapping name variants are listed, never summed.
The non-university rows hold the decisions recorded in the earlier sections; their figures were checked line by line.
"""
import csv, glob, json, re, pathlib, collections

ROOT = pathlib.Path(__file__).resolve().parents[2]
def norm(s):
    s = re.sub(r'\([^)]*\)', ' ', s.lower())
    s = re.sub(r'[‐-―\-]', ' ', s)
    s = re.sub(r'[«»"“”\'’.,]', ' ', s)
    return re.sub(r'\s+', ' ', s).strip()
def source_type(name):
    if 'phrase_organic' in name: return None
    if 'phrase_these' in name or 'phrase_all' in name: return 'exact'
    if 'phrase_fullsearch' in name or 'phrase_related' in name: return 'broad'
    if 'phrase_questions' in name: return 'question'
    if 'resource_organic' in name: return 'ranking'
    raise SystemExit('unknown export type: ' + name)
# dem[norm keyword] -> list of (type, db, volume, kd, file)
dem = collections.defaultdict(list)
files = sorted(glob.glob(str(ROOT / 'research/semrush/*.csv')))
for f in files:
    name = pathlib.Path(f).name; typ = source_type(name)
    if typ is None: continue
    with open(f, encoding='utf-8-sig') as fh:
        rows = [r for r in csv.reader(fh, delimiter=';') if r and not r[0].startswith('#')]
    hdr = [c.strip().lower() for c in rows[0]]
    ki = hdr.index('keyword')
    vi = hdr.index('volume') if 'volume' in hdr else hdr.index('search volume')
    kdi = next((hdr.index(c) for c in ('keyword_difficulty', 'keyword difficulty', 'keyword difficulty index') if c in hdr), None)
    dbi = hdr.index('database') if 'database' in hdr else None
    m = re.search(r'_(?:these|fullsearch|related|questions|organic)-([a-z]{2})-', name)
    for r in rows[1:]:
        try: v = int(r[vi])
        except (ValueError, IndexError): continue
        db = r[dbi] if dbi is not None else m.group(1)
        kd = r[kdi].split('.')[0] if kdi is not None and r[kdi] not in ('', '0', '0.00') else ''
        dem[norm(r[ki])].append((typ, db, v, kd, name))
LABEL = {'broad': 'broad', 'question': 'question', 'ranking': 'competitor-ranking lead'}
def figures(kw, typ):
    """Per database, the highest volume of this type (overlapping files never added)."""
    best = {}
    for t, db, v, kd, f in dem.get(norm(kw), []):
        if t != typ: continue
        if db not in best or v > best[db][0]: best[db] = (v, kd)
    return best
def fmt(kw, best):
    dbs = sorted(best.items(), key=lambda x: (-x[1][0], x[0]))
    shown = [x for x in dbs if x[1][0] > 0] or dbs[:1]
    parts = []
    for i, (db, (v, kd)) in enumerate(shown):
        parts.append(f'{db} {v:,}' + (f' · kd {kd}' if kd and i == 0 else ''))
    return f'"{kw}" ' + ', '.join(parts)
# Keywords assigned to a record in the ledger or earlier map sections (beyond the record's own names), with caveats.
EXTRA = {
 'danylo-halytsky-lviv-national-medical-university': ['lviv national medical university', 'lviv national medical university ukraine', 'danylo halytsky', 'danylo halytsky medical university'],
 'vinnytsia-national-pirogov-memorial-medical-university': ['pirogov medical university ukraine', 'national pirogov memorial medical university', 'vinnitsa medical university ukraine'],
 'odesa-national-medical-university': ['odessa medical university', 'odessa national medical university ukraine'],
 'zaporizhzhia-state-medical-and-pharmaceutical-university': ['zaporozhye state medical university'],
 'international-european-university': ['ieu university'],
 'sumy-state-university': ['sumy state medical university', 'sumy state medical university ukraine'],
 'petro-mohyla-black-sea-national-university': ['black sea national university'],
 'karazin-kharkiv-national-university': ['kharkiv national university'],
 'taras-shevchenko-national-university-of-kyiv': ['taras shevchenko national university'],
 'kyiv-medical-university': ['kiev medical university ukraine'],
 'luhansk-state-medical-university': ['lugansk state medical university', 'lugansk medical university ukraine'],
 'kharkiv-national-medical-university': ['kharkiv national medical university ukraine ranking'],
}
CAVEAT = {
 'kyiv-medical-university': 'ambiguous: searchers may mean another Kyiv medical university; the figure cannot be split',
 'luhansk-state-medical-university': 'ambiguous: the name is shared with the institution in occupied Luhansk; the figure cannot be split',
 'taras-shevchenko-national-university-of-kyiv': 'the keyword is shorter than the name and may include other Shevchenko-named institutions',
 'karazin-kharkiv-national-university': '"kharkiv national university" may also mean other Kharkiv national universities',
 'zaporizhzhia-state-medical-and-pharmaceutical-university': 'former name',
}
SERP = {
 'bukovinian-state-medical-university': 'in SERP: bsmu.edu.ua #1/#3/#5 (not verified), Wikipedia #2, social, agencies #7–#10',
 'vinnytsia-national-pirogov-memorial-medical-university': 'in SERP ("pirogov medical university ukraine"): vnnmu.com #1, Wikipedia #2, pirogov-university.com #3, vnmu.edu.ua #6, rankings, agencies (no domain verified)',
}
recs = [json.load(open(f)) for f in sorted(glob.glob(str(ROOT / 'site/src/content/universities/*.json')))]
rows = []
def row(n, url, ptype, kw, demand, intent, competitors, evidence, priority, decision):
    rows.append(f'| {n} | `{url}` | {ptype} | {kw} | {demand} | {intent} | {competitors} | {evidence} | {priority} | {decision} |')
NOSERP = 'not measured (no SERP export)'
n = 0
existing = [
('/', 'home', 'brand, orientation', '—', 'navigational', '—', 'none (no university fact)', 'P2', '**Improve** (done 2026-10-25/26)'),
('/universities/', 'directory', 'ukraine medical college · list · best', 'in 2,900 · 210 ("… list") · 390 ("best …"), all broad; ng 20 exact ("medical universities in ukraine"), 20 broad ("list of …")', 'informational/mixed', 'in SERP ("ukraine medical college"): Wikipedia list #1; agencies, directories', '≥3 published profiles for a real list', 'P1', '**Improve** (redesigned 2026-10-26)'),
('/tuition-fees/', 'fees guide', 'ukraine medical college fees (for indian students) · cost of mbbs', 'in 590 · 260 · 210, all broad (trends vary; the 210 phrasing peaked in the last two months); 2,900 broad bucket', 'informational', 'in SERP ("ukraine medical college fees"): agencies, Quora', '≥1 official dated fee schedule', 'P0', '**Improve** when a fee is verified'),
('/courses/', 'course hub', '—', 'none measured', 'navigational', '—', 'general guidance', 'P3', 'Retain'),
('/courses/medicine/', 'course', 'mbbs in ukraine · ukraine mbbs college', 'in 260 · kd 18 exact ("mbbs in ukraine"); in 480 · kd 7 broad ("ukraine mbbs college")', 'informational', 'in SERP ("mbbs in ukraine"): agencies 10/10', 'verified programme rows', 'P1', '**Improve** when a programme is verified'),
('/courses/dentistry/', 'course', 'study dentistry in ukraine', 'in 30 exact (spiky trend)', 'informational', NOSERP, 'verified programme', 'P2', 'Retain'),
('/courses/nursing/', 'course', 'study nursing in ukraine', 'uk 20 exact; in 0', 'informational', NOSERP, 'verified English-taught award', 'P3', 'Retain'),
('/courses/pharmacy/', 'course', '—', 'none measured', 'informational', '—', 'verified programme', 'P3', 'Retain (fold into /courses/ if nothing is verified)'),
('/admissions/', 'guide', 'mbbs in ukraine eligibility · how to get admission', 'in 30 exact ("… eligibility"); in 10 (question)', 'informational', NOSERP, 'verified requirements', 'P1', 'Retain'),
('/faq/', 'FAQ', 'cost · years · NEET · valid in India/Germany/Canada', 'in 10–40 each (questions)', 'informational', NOSERP, 'regulator documents for recognition answers', 'P2', 'Retain (every measured question answered)'),
('/apply/', 'conversion', '—', '—', 'transactional', '—', '—', 'P0 (conversion)', 'Retain'),
('/services/', 'trust', '—', '—', 'commercial', '—', 'only existing services', 'P3', 'Retain'),
('/about/', 'trust', '—', '—', 'navigational', '—', 'owner facts', 'P3', 'Retain'),
('/contact/', 'trust', '—', '—', 'navigational', '—', '—', 'P3', 'Retain'),
('/privacy/', 'legal', '—', '—', '—', '—', 'legal review', 'P3', 'Retain (draft until sign-off)'),
('/terms/', 'legal', '—', '—', '—', '—', 'legal review', 'P3', 'Retain (draft until sign-off)'),
('/disclosure/', 'legal', '—', '—', '—', '—', 'legal review', 'P3', 'Retain (draft until sign-off)'),
('/complaints-policy/', 'legal', '—', '—', '—', '—', 'legal review', 'P3', 'Retain (draft until sign-off)')]
for e in existing:
    n += 1; row(n, *e)
pri_counts = collections.Counter(); ge100 = []
for r in recs:
    names = [r['shortName'], (r.get('officialName') or {}).get('value') or ''] + list(r.get('alternativeNames') or [])
    kws = []
    for x in names + EXTRA.get(r['slug'], []):
        k = norm(x)
        if k and k in dem and k not in kws: kws.append(k)
    exact = [(k, figures(k, 'exact')) for k in kws]
    exact = [(k, b) for k, b in exact if b]
    exact.sort(key=lambda kb: -max(v for v, _ in kb[1].values()))
    leads = []
    exact_kws = {k for k, _ in exact}
    for k in kws:
        if k in exact_kws: continue  # a lead never repeats a keyword already measured exactly
        for t in ('broad', 'ranking'):
            b = figures(k, t)
            if b and max(v for v, _ in b.values()) >= 20: leads.append((k, t, b))
    leads.sort(key=lambda x: -max(v for v, _ in x[2].values()))
    top = max((max(v for v, _ in b.values()) for _, b in exact), default=None)
    if exact:
        d = 'exact: ' + '; '.join(fmt(k, b) for k, b in exact[:3])
        if len(exact) > 1: d += ' (name variants overlap; never added)'
    else:
        d = 'exact: not measured' if r['slug'] != 'lesya-ukrainka-volyn-national-university' else 'exact: queried (in), no data returned; other databases not measured'
    if leads:
        d += '. Leads, not exact: ' + '; '.join(fmt(k, b) + f' ({LABEL[t]})' for k, t, b in leads[:3])
        if len(leads) > 1: d += ' (overlapping; never added)'
    if r['slug'] in CAVEAT: d += f'. Caveat: {CAVEAT[r["slug"]]}'
    pr = 'P0' if top is not None and top >= 100 else ('P1' if top is not None and top >= 20 else 'P2')
    pri_counts[pr] += 1
    if pr == 'P0': ge100.append(r['shortName'])
    n += 1
    row(n, f"/universities/{r['slug']}/", 'university profile', f"{r['shortName']} (admissions angle; \"<name> fees\")", d,
        'navigational/informational', SERP.get(r['slug'], NOSERP),
        'minimum viable profile: verified name, official website on a government register, address, current-year statement, teaching format, ≥1 programme open to international applicants (language, duration, intake, fee page read)',
        f'{pr} when verified', '**Create (index) on verification**; built today as a noindex research preview')
countries = [
('india', 'India', 'mbbs in ukraine for indian students · fees for indian students · NEET · valid in India', 'in 20 exact ("mbbs in ukraine for indian students"); fees cluster 170–2,900 broad; NEET 20 (question); validity 10–30 (questions; one phrasing also 20 exact)', 'informational', 'in SERP ("mbbs in ukraine", "… fees"): agency hubs', '≥1 verified fee; the National Medical Commission\'s own regulation text read on its site', 'P1', '**Defer**: create when both gates are met (decision of 2026-10-12 stands)'),
('nigeria', 'Nigeria', 'medical school in ukraine for international students · list · names', 'ng university names 10–30 exact; "list of …" and "… for international students" 20 broad; top broad figure 40 (a Kyiv city query)', 'informational', NOSERP, 'demand above the list queries; MDCN rules read on its site', 'P3', '**Defer** (list intent served by /universities/)'),
('pakistan', 'Pakistan', 'ukraine medical college · names', 'pk university names 10–30 exact; "ukraine medical college" 40 · kd 27 broad', 'informational', NOSERP, 'more demand; PMDC rules', 'P3', '**Reject** for now'),
('uae', 'UAE', 'university names', 'ae 10–40', 'navigational', NOSERP, 'more demand', 'P3', '**Reject** for now'),
('south-africa', 'South Africa', 'study medicine in ukraine', 'za 30; MBBS 0', 'informational', NOSERP, 'more demand; HPCSA rules', 'P3', '**Reject** for now'),
('uk', 'United Kingdom', 'study medicine in ukraine · names', 'uk 20–90', 'informational', NOSERP, 'GMC rules; more demand', 'P3', '**Reject** for now'),
]
for code, slug, name, lang in [('eg', 'egypt', 'Egypt', 'Arabic'), ('ma', 'morocco', 'Morocco', 'French and Arabic'), ('az', 'azerbaijan', 'Azerbaijan', 'Azerbaijani and Russian'), ('ge', 'georgia', 'Georgia', 'Georgian'), ('tr', 'turkey', 'Turkey', 'Turkish'), ('bd', 'bangladesh', 'Bangladesh', 'Bengali'), ('gh', 'ghana', 'Ghana', 'other English')]:
    v = figures('study medicine in ukraine', 'exact').get(code)
    if v is None: raise SystemExit('missing phrase_all figure for ' + code)
    countries.append((slug, name, f'study medicine in ukraine · ({lang} phrasings)', f'{code} {v[0]} exact (English head term, phrase_all); {lang} phrasings not measured', 'informational', NOSERP, f'SEMrush {code} database for local phrasings (API units needed)', '—', '**Defer**: local-language demand unmeasured'))
for slug, name, kw, d, intent, comp, ev, pr, dec in countries:
    n += 1; row(n, f'/guides/study-medicine-in-ukraine-from-{slug}/', 'country guide', kw, d, intent, comp, ev, pr, dec)
topics = [
('/guides/is-a-ukrainian-medical-degree-recognised-in-india/', 'recognition (India)', 'is ukraine mbbs valid in india (several phrasings)', 'in 10–30 each (questions)', 'informational', NOSERP, 'the regulator\'s own document', 'P2', '**Consolidate** into /faq/ (answered there)'),
('/guides/recognition-germany/', 'recognition (Germany)', 'is ukraine mbbs valid in germany', 'in 20 (question)', 'informational', NOSERP, 'the German authority\'s own pages', 'P3', '**Consolidate** into /faq/'),
('/guides/recognition-canada/', 'recognition (Canada)', 'is ukraine mbbs valid in canada', 'in 10 (question)', 'informational', NOSERP, 'the Canadian authority\'s own pages', 'P3', '**Consolidate** into /faq/'),
('/guides/neet-for-mbbs-in-ukraine/', 'eligibility (India)', 'is neet required for mbbs in ukraine', 'in 20 (question, spike)', 'informational', NOSERP, 'NMC regulation text', 'P3', '**Consolidate** into /faq/ and /admissions/'),
('/guides/how-many-years-mbbs-ukraine/', 'duration', 'how many years for mbbs in ukraine', 'in 30 (question, spike)', 'informational', NOSERP, 'verified programme durations', 'P3', '**Consolidate** into /faq/ and /courses/medicine/'),
('/guides/why-study-medicine-in-ukraine/', 'motivation', 'why indian students go to ukraine for medical studies · why students go to ukraine for mbbs', 'in 170 broad (spike); in 140 competitor-ranking lead ("why students go to ukraine for mbbs")', 'informational', NOSERP, 'claims about cost or quality need sources we cannot check', 'P3', '**Reject** (no claim we can evidence)'),
('/guides/documents-checklist/', 'documents', 'documents required for mbbs / medical admission in ukraine', 'queried, no data returned (uk seeds; R1 in, uk, ng, pk, za, ae)', 'informational', '—', 'measurable demand in a new export; university document lists', '—', '**Defer**: no measured demand (served by /admissions/#documents)'),
('/guides/apostille-and-legalisation/', 'documents', '—', 'not measured', 'informational', '—', 'SEMrush; official legalisation rules', '—', '**Defer**: unmeasured'),
('/guides/invitation-letter/', 'process', '—', 'not measured', 'informational', '—', 'SEMrush; official invitation procedure', '—', '**Defer**: unmeasured'),
('/guides/student-visa-ukraine/', 'visa', '—', 'not measured', 'informational', '—', 'SEMrush; Ukrainian consular source', '—', '**Defer**: unmeasured'),
('/guides/preparatory-course-ukraine/', 'preparatory route', 'preparatory course ukraine medicine · foundation year ukraine medical', 'queried, not returned (R1, six databases)', 'informational', '—', 'demand', '—', '**Reject** (no demand measured; stays a section of /admissions/)'),
('/guides/medicine-in-english-in-ukraine/', 'language', 'medical school in ukraine in english', 'ng 20 (broad lead)', 'informational', '—', 'verified English-taught programmes', 'P3', '**Defer** (needs verified programmes; served by /courses/medicine/)'),
('/guides/cost-of-living-in-ukraine-for-students/', 'living costs', '—', 'not measured', 'informational', '—', 'SEMrush; dated cost sources', '—', '**Defer**: unmeasured'),
('/guides/student-accommodation-ukraine/', 'accommodation', '—', 'not measured', 'informational', '—', 'SEMrush; university hostel pages', '—', '**Defer**: unmeasured'),
('/guides/teaching-in-ukraine-this-year/', 'operating status', '—', 'not measured', 'informational', '—', 'dated official statements per university', '—', '**Defer**: unmeasured; per-university statements belong on profiles'),
('/guides/transfer-to-a-ukrainian-medical-university/', 'transfer', '—', 'not measured', 'informational', '—', 'SEMrush; official transfer rules', '—', '**Defer**: unmeasured'),
('/guides/fmge-and-next/', 'licensing exam (India)', '—', 'not measured (returnee/NMC rows excluded as news)', 'informational', '—', 'NMC/NBEMS documents', '—', '**Defer**: unmeasured'),
('/guides/nostrification/', 'recognition', '—', 'not measured', 'informational', '—', 'SEMrush; regulator sources', '—', '**Defer**: unmeasured'),
('/guides/how-to-apply/', 'process', 'how to get admission in mbbs in ukraine · how to study mbbs in ukraine', 'in 10 · 10 (questions)', 'informational', NOSERP, '—', 'P3', '**Consolidate** into /admissions/'),
('/guides/ukraine-medical-students/', 'news', 'ukraine medical students · returned medical students', 'in 1,000 · kd 30 broad; in 2,900 · kd 22 broad (news)', 'news', NOSERP, '—', '—', '**Reject** (news intent)')]
for t in topics:
    n += 1; row(n, *t)
fees = [
('/tuition-fees/<university>/', 'per-university fee page', '"<name> fees"', 'in 10–30 each (9 names, exact); ng 30 · 20 (Bogomolets, Kharkiv), 0 for 4 other names', 'transactional', NOSERP, 'verified fee schedule', '—', '**Consolidate** into each profile'),
('/tuition-fees/for-indian-students/', 'fees (India)', 'ukraine medical college fees for indian students', 'in 2,900 broad bucket; 170 broad ("mbbs in ukraine for indian students fees") · 210 broad ("cost of mbbs in ukraine for indian students")', 'informational', 'in SERP ("ukraine medical college fees"): agencies, Quora', 'verified fees', 'P1', '**Consolidate** into /tuition-fees/ (H2 there)'),
('/tuition-fees/mbbs/', 'fees (MBBS)', 'mbbs in ukraine fees · ukraine mbbs fees · cost of mbbs in ukraine', 'in 260 · kd 7 exact ("mbbs in ukraine fees"); 260 broad ("ukraine mbbs fees", identical metrics); 260 · kd 11 broad ("cost of mbbs in ukraine"); never added', 'informational', 'in SERP ("ukraine medical college fees"): agencies, Quora', 'verified fees', 'P1', '**Consolidate** into /tuition-fees/'),
('/compare/state-vs-private-medical-universities/', 'comparison', '—', 'not measured', 'informational', '—', 'verified facts for both sides; SEMrush', '—', '**Defer**: unmeasured, needs verified profiles'),
('/compare/medical-universities-in-kyiv/', 'city list', 'medical universities in kiev ukraine', 'ng 40 broad; in none', 'informational', NOSERP, '—', 'P3', '**Reject** (city pages rejected; directory city filter)'),
('/compare/medical-universities-in-lviv/', 'city list', 'medical university in lviv', 'uk 20', 'informational', NOSERP, '—', 'P3', '**Reject** (city pages rejected)'),
('/best-medical-universities-in-ukraine/', 'ranking', 'best medical college in ukraine · top medical schools in ukraine', 'in 390 broad; pk 20 broad ("top medical schools in ukraine")', 'mixed', 'in SERP ("best medical college in ukraine"): agencies, Wikipedia, ranking sites, YouTube', '—', '—', '**Reject** (we never rank; answered on /universities/#best)'),
('/courses/public-health/', 'course', 'public health in ukraine', 'uk 10; in 0 (exact)', 'informational', '—', 'an English-taught programme open to international applicants', '—', '**Defer** (near-zero demand; decision #12 / M11 / O8 stands)'),
('/courses/physical-therapy/', 'course', 'physiotherapy in ukraine', 'queried, not returned (R1, six databases)', 'informational', '—', 'measured demand; English-taught supply; recognition route', '—', '**Defer** (no measured demand; decision #13 / M12 / O9 stands)'),
('/mbbs-in-ukraine-2026/', 'MBBS variant', 'mbbs in ukraine 2026', 'queried, not returned (R1, six databases)', 'informational', '—', '—', '—', '**Reject** (duplicate of /courses/medicine/)'),
('/universities/zaporizhzhia-national-university/', 'university profile', 'zaporizhzhia national university', 'in 20 exact', 'navigational', NOSERP, 'the institution is not in the directory: medical programmes for international applicants not researched', '—', '**Defer**: research the institution before any profile'),
('/clinics/american-medical-center-ukraine/', 'off-topic', 'american medical center ukraine', 'ng 20 broad', 'navigational (clinic)', NOSERP, '—', '—', '**Reject** (a clinic, not admissions)')]
for t in fees:
    n += 1; row(n, *t)
total = n
dec = collections.Counter()
for r_ in rows:
    d = r_.split('|')[-2]
    for k in ['Create', 'Improve', 'Retain', 'Consolidate', 'Defer', 'Reject']:
        if k in d: dec[k] += 1; break
nfiles = len(files)
header = f"""## 20. URL opportunity register for the 100+ URL mandate (2026-10-26)

**Inputs:** the {nfiles} existing SEMrush exports (CSV) in `research/semrush/` only. A new research programme was refused on 2026-10-26 because the SEMrush account has no API units (`SEMRUSH_API_LEDGER.md`, programme 5), so local-language demand in every market without an export is marked *not measured*. Figures are copied from the exports as database · volume · kd (kd shown only where SEMrush computed it), with the source type stated: **exact** (`phrase_these`, `phrase_all`), **broad** (`phrase_fullsearch`, `phrase_related`), **question** (`phrase_questions`) or **competitor-ranking lead** (`resource_organic`: a keyword a competitor page ranks for). Types are never mixed or added, and overlapping name variants are listed, never summed. University demand is the exact match of the record's names (case, hyphens and punctuation normalised) plus the keywords the ledger or earlier sections assign to the record, with a caveat where a keyword is ambiguous. Profile priority uses exact demand only: P0 at 100 or more in any database, P1 at 20–99, P2 below 20 or not measured. Generated from the records and exports by `site/scripts/make-url-register.py`; corrected on 2026-10-26 after a row-by-row check of every figure against the CSV lines (earlier version: KD read from the intent column for four names, a ranking position read as volume, three measured names marked "not measured", Vinnytsia's two largest exact figures missing, broad and question figures without a label, measured head-term figures for seven markets shown as "not measured", two measured keywords not mapped (now rows 107–108), and public health and physiotherapy marked Reject although the earlier decisions #12/#13 are Defer).

**Totals:** {total} URL opportunities. Decisions: {dec['Retain']} retain and {dec['Improve']} improve (the 18 indexable URLs), {dec['Create']} create on verification (the university profiles, each already built as a noindex research preview: {pri_counts['P0']} P0, {pri_counts['P1']} P1, {pri_counts['P2']} P2), {dec['Consolidate']} consolidate into an existing URL, {dec['Defer']} defer (unmeasured, no measured demand, or evidence first), {dec['Reject']} reject. **Indexable URLs that can be published today without new evidence: 18** (unchanged). Every measured question already has an answer on an indexable page (`/faq/`, `/admissions/`, `/tuition-fees/`, `/courses/medicine/`), so a new page for it would compete with the page that owns it.

**What unlocks growth, in order of value:** (1) official-source access, so university profiles can be verified and indexed (45 URLs; {pri_counts['P0']} names have exact demand of 100 or more in at least one database: {', '.join(ge100)}); (2) a verified fee schedule, which also meets half of the India guide's gate; (3) SEMrush API units, to measure local-language demand in Egypt, Morocco, Azerbaijan, Georgia, Turkey, Bangladesh and Ghana (the English head term is measured there: 0–20) and the unmeasured topic guides before any of them is built.

| # | URL | Page type | Primary keyword(s) | Demand (exports) | Intent | Competitors seen | Evidence required before publication | Priority | Decision |
|---|---|---|---|---|---|---|---|---|---|
"""
p = ROOT / 'KEYWORD_URL_MAP.md'
txt = p.read_text(encoding='utf-8')
i = txt.index('## 20. URL opportunity register')
assert txt.count('\n## ', i) == 0, 'section 20 must be the last section'
p.write_text(txt[:i] + header + '\n'.join(rows) + '\n', encoding='utf-8')
print('rows', total, dict(dec), dict(pri_counts), 'P0:', ge100, 'files', nfiles)
