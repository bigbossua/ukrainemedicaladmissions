#!/usr/bin/env python3
"""Build the reconciled master inventory of Ukrainian institutions (research/universities/MASTER_INVENTORY.{json,md}).

Inputs (all already in the repository): the university records (site/src/content/universities/*.json), the landscape
sweep files (research/universities/2026-10-12-landscape-sweep-wave*.json, *gap-discovery*.json and *recheck-and-discovery*.json), and the SEMrush
exports (research/semrush/*.csv). Nothing is fetched and nothing is verified here: every location, ownership or programme
statement is a search-result lead unless an evidence file says otherwise (none does today).
Usage (repository root): python3 site/scripts/make-master-inventory.py
"""
import csv, glob, json, os, re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
J = lambda *p: os.path.join(ROOT, *p)

# id, canonical name (as found; a lead), group, city (lead), flags, keyword pattern (SEMrush), extra aliases
INST = [
 ('bogomolets-national-medical-university', 'Bogomolets National Medical University', 'A', 'Kyiv', '', r'bogomolets|national medical university in kiev', ['Kiev', 'NMU', 'O. O. Bogomolets']),
 ('bukovinian-state-medical-university', 'Bukovinian State Medical University', 'A', 'Chernivtsi', '', r'bukovinian', ['BSMU', 'Bukovina']),
 ('danylo-halytsky-lviv-national-medical-university', 'Danylo Halytsky Lviv National Medical University', 'A', 'Lviv', '', r'lviv national medical|danylo halytsky|medical university in lviv', ['Lvov', 'LNMU']),
 ('dnipro-state-medical-university', 'Dnipro State Medical University', 'A', 'Dnipro', '', r'dnipro state medical', ['Dnepr', 'Dnipropetrovsk Medical Academy (former name)']),
 ('ivano-frankivsk-national-medical-university', 'Ivano-Frankivsk National Medical University', 'A', 'Ivano-Frankivsk', '', r'ivano frankivsk', ['Ivano-Frankovsk', 'IFNMU']),
 ('kharkiv-national-medical-university', 'Kharkiv National Medical University', 'A', 'Kharkiv', 'front-line region', r'kharkiv national medical', ['Kharkov', 'KhNMU']),
 ('odesa-national-medical-university', 'Odesa National Medical University', 'A', 'Odesa', '', r'odessa (national )?medical university', ['Odessa', 'ONMedU']),
 ('poltava-state-medical-university', 'Poltava State Medical University', 'A', 'Poltava', '', r'poltava', ['Ukrainian Medical Stomatological Academy (former name)', 'PSMU']),
 ('ternopil-national-medical-university', 'I. Horbachevsky Ternopil National Medical University', 'A', 'Ternopil', '', r'ternopil', ['Ternopol', 'TNMU', 'TDMU']),
 ('vinnytsia-national-pirogov-memorial-medical-university', 'National Pirogov Memorial Medical University, Vinnytsya', 'A', 'Vinnytsia', '', r'vinnytsia|vinnitsa|pirogov', ['Vinnitsa', 'Pirogov']),
 ('zaporizhzhia-state-medical-and-pharmaceutical-university', 'Zaporizhzhia State Medical and Pharmaceutical University', 'A', 'Zaporizhzhia', 'teaching location question (Berehove)', r'zaporizhzhia state medical|zaporozhye state medical', ['Zaporozhye State Medical University (former name)', 'ZSMU']),
 ('national-university-of-pharmacy', 'National University of Pharmacy', 'B', 'Kharkiv', 'front-line region', r'national university of pharmacy', ['National Pharmaceutical University', 'NUPh']),
 ('uzhhorod-national-university', 'Uzhhorod National University', 'C', 'Uzhhorod', '', r'uzhhorod', ['Uzhgorod', 'UzhNU']),
 ('sumy-state-university', 'Sumy State University (Medical Institute)', 'C', 'Sumy', 'border region; reported strikes on campus', r'sumy state', ['Sumy State Medical University (agency name)', 'SumDU']),
 ('taras-shevchenko-national-university-of-kyiv', 'Taras Shevchenko National University of Kyiv (Institute of Biology and Medicine)', 'C', 'Kyiv', '', r'taras shevchenko', ['Kiev National University', 'KNU']),
 ('petro-mohyla-black-sea-national-university', 'Petro Mohyla Black Sea National University', 'C', 'Mykolaiv', '', r'black sea national|petro mohyla', ['Nikolaev', 'Mykolayiv', 'ChNU']),
 ('bohdan-khmelnytsky-national-university-of-cherkasy', 'Bohdan Khmelnytsky National University of Cherkasy', 'C', 'Cherkasy', '', r'cherkasy national', ['Cherkassy']),
 ('karazin-kharkiv-national-university', 'V. N. Karazin Kharkiv National University (School of Medicine)', 'C', 'Kharkiv', 'front-line region', r'karazin|kharkiv national university', ['Kharkov National University', 'Karazin University']),
 ('lesya-ukrainka-volyn-national-university', 'Lesya Ukrainka Volyn National University', 'C', 'Lutsk', 'no programme for foreigners shown', r'lesya ukrainka', ['Eastern European National University (former name)']),
 ('zaporizhzhia-national-university', 'Zaporizhzhia National University', 'C', 'Zaporizhzhia', 'no medical programme shown', r'zaporizhzhia national university', ['ZNU']),
 ('kherson-state-university', 'Kherson State University', 'C', 'Kherson', 'reported relocated; no medical programme for foreigners shown', r'kherson', []),
 ('donetsk-national-medical-university', 'Donetsk National Medical University', 'D', 'base unsettled (Kropyvnytskyi / Kramatorsk / Lyman reported)', 'reported relocated', r'donetsk', []),
 ('luhansk-state-medical-university', 'Luhansk State Medical University', 'D', 'Rivne (reported, temporary)', 'reported relocated; name shared with the occupied-territory institution', r'lugansk|luhansk', ['Lugansk']),
 ('shupyk-national-healthcare-university', 'Shupyk National Healthcare University of Ukraine', 'E', 'Kyiv', 'postgraduate', r'shupyk', ['P. L. Shupyk National Medical Academy of Postgraduate Education (former name)']),
 ('kharkiv-medical-academy-of-postgraduate-education', 'Kharkiv Medical Academy of Postgraduate Education', 'E', 'Kharkiv', 'postgraduate', r'medical academy of postgraduate', []),
 ('ukrainian-military-medical-academy', 'Ukrainian Military Medical Academy', 'E', 'Kyiv (third-party lead)', 'Ministry of Defence; admission rules found target Ukrainian citizens and military entrants', r'military medical academy', ['UVMA']),
 ('kyiv-medical-university', 'Kyiv Medical University', 'F', 'Kyiv (branches reported)', 'licence and accreditation questions; Polish campus', r'kyiv medical university|kiev medical university', ['Kyiv Medical University of UAFM (former name)', 'KMU']),
 ('international-european-university', 'International European University', 'F', 'Kyiv', 'licence questions; Malta campus licence reported revoked', r'international european|ieu university', ['IEU']),
 ('kharkiv-international-medical-university', 'Kharkiv International Medical University', 'F', 'Kharkiv', 'accreditation found only to 2021', r'kharkiv international medical', ['KhIMU']),
 ('odesa-international-medical-university', 'Odesa International Medical University', 'F', 'Odesa', 'domain unsettled', r'odessa international medical', ['Odessa International Medical University']),
 ('kyiv-international-university', 'Kyiv International University', 'F', 'Kyiv', 'no government listing found', r'kyiv international university', ['KyIU']),
 ('international-humanitarian-university', 'International Humanitarian University (Odesa)', 'F', 'Odesa', 'domain unsettled', r'international humanitarian', []),
 ('dnipro-medical-institute-of-conventional-and-alternative-medicine', 'Dnipro Medical Institute of Conventional and Alternative Medicine', 'F', 'Dnipro', 'domain unsettled; no government listing found', r'dnipro medical institute', []),
 ('dnipro-institute-of-medicine-and-public-health', 'Dnipro Institute of Medicine and Public Health', 'F', 'Dnipro', 'relationship to Kyiv Medical University unexplained', r'institute of medicine and public health', []),
 ('lviv-medical-institute', 'Lviv Medical University (private; formerly Lviv Medical Institute)', 'F', 'Lviv', 'legal-form change and licence continuity unverified; easily confused with the state Lviv national medical university', r'lviv medical institute|lviv medical university', ['Lviv Medical Institute (former name)']),
 ('kharkiv-institute-of-medicine-and-biomedical-sciences', 'Kharkiv Institute of Medicine and Biomedical Sciences', 'F', 'Kharkiv', 'reported renamed University of Medicine and Social Sciences; relationship to Kyiv Medical University unexplained; current programme accreditation unknown', r'kharkiv institute of medicine', ['KhIM']),
 ('international-academy-of-ecology-and-medicine', 'International Academy of Ecology and Medicine', 'F', 'Kyiv (lead)', 'domain from one publisher family; no programme for foreign applicants found', r'academy of ecology', ['MAEM']),
 ('medical-natural-university', 'Medical-Natural University (private)', 'F', 'Mykolaiv (lead)', 'nursing and public health only; no programme for foreign applicants found', r'medical natural university', []),
 ('king-danylo-university', 'King Danylo University', 'F', 'Ivano-Frankivsk', 'no medical programme shown', r'king danylo', []),
 ('lviv-medical-academy-krupynskyi', 'Lviv Medical Academy named after Andrei Krupynskyi', 'G', 'Lviv', 'communal (regional council); directory-title lead only', r'krupynsk', []),
 ('cherkasy-medical-academy', 'Cherkasy Medical Academy', 'G', 'Cherkasy', 'communal (regional council); directory-title lead only', r'cherkas+y medical academy', []),
 ('rivne-medical-academy', 'Rivne Medical Academy', 'G', 'Rivne', 'communal or state ownership unresolved; domestic nursing offers only', r'rivne medical academy', []),
 ('volyn-medical-institute', 'Volyn Medical Institute', 'G', 'Lutsk', 'communal (regional council); nursing only; domestic intake', r'volyn medical institute', []),
 ('kherson-basic-medical-college', 'Kherson Basic Medical Professional College', 'G', 'Kherson (lead)', 'communal college; professional junior bachelor level only', r'kherson.*medical college', []),
 ('nikopol-medical-college', 'Nikopol Medical College', 'G', 'Nikopol', 'communal college; professional junior bachelor level only', r'nikopol', []),
 ('bakhmut-medical-college', 'Bakhmut Medical Professional College', 'G', 'base not confirmed', 'communal college; current base not confirmed', r'bakhmut', []),
 ('kyiv-city-medical-college', 'Kyiv medical college (Study in Ukraine portal entry)', 'G', 'Kyiv', 'identity unconfirmed; college level', r'kiev medical college|kyiv medical college', []),
 ('zhytomyr-medical-institute', 'Zhytomyr Medical Institute', 'G', 'Zhytomyr', 'communal; nursing-based; no programme for foreigners shown', r'zhytomyr', []),
 ('odesa-mechnikov-national-university', 'Odesa I. I. Mechnikov National University', 'H', 'Odesa', 'pharmacy programme lead only; no medicine programme found', r'mechnikov|odess?a national university', ['Odessa National University', 'ONU']),
 ('oles-honchar-dnipro-national-university', 'Oles Honchar Dnipro National University', 'H', 'Dnipro', 'nursing and allied-health programmes only; no route for foreign applicants found', r'honchar|dnipro national university', ['DNU']),
 ('vasyl-stefanyk-carpathian-national-university', 'Vasyl Stefanyk Precarpathian National University (reported renamed Carpathian National University, 2025)', 'H', 'Ivano-Frankivsk', 'physical-therapy programme lead only; hosts relocated Kherson State University units', r'precarpath|carpathian national', ['Precarpathian National University', 'PNU']),
 ('ukrainian-catholic-university', 'Ukrainian Catholic University', 'H', 'Lviv', 'rehabilitation and allied-health programmes only; no medical faculty found', r'catholic university', ['UCU']),
 ('ivan-franko-national-university-of-lviv', 'Ivan Franko National University of Lviv', 'H', 'Lviv', 'no medical faculty found (one search)', r'ivan franko|lviv national university', ['LNU']),
 ('kharkiv-polytechnic-institute', 'National Technical University "Kharkiv Polytechnic Institute"', 'H', 'Kharkiv', 'industrial pharmacy programme lead; its medical institute is reported as postgraduate only', r'kharkiv polytechnic', ['NTU KhPI']),
 ('lviv-polytechnic-national-university', 'Lviv Polytechnic National University', 'H', 'Lviv', 'industrial pharmacy programme lead', r'lviv polytechnic', ['LPNU']),
 ('kyiv-national-university-of-technologies-and-design', 'Kyiv National University of Technologies and Design', 'H', 'Kyiv', 'industrial pharmacy programme lead', r'technologies and design', ['KNUTD']),
 ('ukrainian-state-university-of-science-and-technologies', 'Ukrainian State University of Science and Technologies', 'H', 'Dnipro', 'pharmacy programme lead (through a merged chemical-technology university)', r'science and technologies', ['USUST']),
 ('donetsk-gorky-occupied', 'Donetsk State Medical University named after M. Gorky (occupied Donetsk)', 'R', 'Donetsk (occupied territory)', 'described in the results as run by the occupying authorities; not a Ukrainian study option', r'gorky', []),
 ('crimea-georgievsky-occupied', 'Medical Academy named after S. I. Georgievsky (occupied Crimea)', 'R', 'Simferopol (occupied Crimea)', 'described in the results as run by the occupying authorities; the Ukrainian legal entity was reportedly merged into Odesa National Medical University in 2019', r'georgievsk', ['Crimea State Medical University named after S. I. Georgievsky (pre-2014 Ukrainian name)']),
 ('luhansk-st-luke-occupied', 'Luhansk State Medical University named after St. Luke', 'R', 'Luhansk (occupied territory)', 'described in results as Russian-run; no Ukrainian register listing', r'st\.? luke', []),
]
GROUPS = {
 'A': 'Dedicated state medical universities (Ministry of Health)',
 'B': 'State pharmacy university',
 'C': 'State multi-faculty universities with a medical faculty or institute (or claimed to have one)',
 'D': 'Relocated state medical universities',
 'E': 'Postgraduate and military institutions (not a first-degree route for international applicants)',
 'F': 'Private universities and institutes',
 'G': 'Colleges and communal medical academies and institutes (nursing and allied-health level)',
 'H': 'Universities with pharmacy, nursing or allied-health programmes only (no medical degree found)',
 'R': 'Rejected (institutions in occupied territory)',
}

recs = {}
for f in glob.glob(J('site', 'src', 'content', 'universities', '*.json')):
    d = json.load(open(f)); recs[d['slug']] = d
land = []
for f in sorted(glob.glob(J('research', 'universities', '2026-10-12-landscape-sweep-wave*.json'))) + sorted(glob.glob(J('research', 'universities', '*gap-discovery*.json'))) + sorted(glob.glob(J('research', 'universities', '*recheck-and-discovery*.json'))):
    land += json.load(open(f)).get('institutions', [])
# Explicit slug -> landscape record (name prefix as recorded); the original 12 were listed under N25 before any skeptic check.
LAND_NAME = {
 'national-university-of-pharmacy': 'National University of Pharmacy', 'sumy-state-university': 'Sumy State University',
 'taras-shevchenko-national-university-of-kyiv': 'Taras Shevchenko National University of Kyiv', 'petro-mohyla-black-sea-national-university': 'Petro Mohyla Black Sea',
 'bohdan-khmelnytsky-national-university-of-cherkasy': 'Bohdan Khmelnytsky National University of Cherkasy', 'karazin-kharkiv-national-university': 'V. N. Karazin',
 'lesya-ukrainka-volyn-national-university': 'Lesya Ukrainka', 'zaporizhzhia-national-university': 'Zaporizhzhia National University', 'kherson-state-university': 'Kherson State University',
 'donetsk-national-medical-university': 'Donetsk National Medical University', 'luhansk-state-medical-university': 'State Establishment "Luhansk', 'shupyk-national-healthcare-university': 'Shupyk',
 'kharkiv-medical-academy-of-postgraduate-education': 'Kharkiv Medical Academy', 'kyiv-medical-university': 'Kyiv Medical University', 'international-european-university': 'International European University',
 'kharkiv-international-medical-university': 'Kharkiv International Medical University', 'odesa-international-medical-university': 'Odesa International Medical University',
 'kyiv-international-university': 'Private Higher Education Institution "Kyiv International', 'international-humanitarian-university': 'International Humanitarian University',
 'dnipro-medical-institute-of-conventional-and-alternative-medicine': 'Dnipro Medical Institute', 'dnipro-institute-of-medicine-and-public-health': 'Private Higher Education Institution "Dnipro Institute',
 'lviv-medical-institute': 'Lviv Medical Institute', 'king-danylo-university': 'King Danylo', 'kyiv-city-medical-college': "Higher Educational Institution 'The Kiev Medical College'",
 'zhytomyr-medical-institute': 'Zhytomyr Medical Institute', 'luhansk-st-luke-occupied': 'Luhansk State Medical University named after St. Luke',
 'kharkiv-institute-of-medicine-and-biomedical-sciences': 'Kharkiv Institute of Medicine and Biomedical Sciences', 'ukrainian-military-medical-academy': 'Ukrainian Military Medical Academy',
 'lviv-medical-academy-krupynskyi': 'Lviv Medical Academy named after', 'cherkasy-medical-academy': 'Cherkasy Medical Academy',
 'odesa-mechnikov-national-university': 'Odesa I. I. Mechnikov', 'oles-honchar-dnipro-national-university': 'Oles Honchar Dnipro', 'vasyl-stefanyk-carpathian-national-university': 'Vasyl Stefanyk',
 'ukrainian-catholic-university': 'Ukrainian Catholic University', 'ivan-franko-national-university-of-lviv': 'Ivan Franko National University of Lviv',
 'rivne-medical-academy': 'Rivnenska medychna akademiia', 'volyn-medical-institute': 'Komunalnyi zaklad vyshchoi osvity "Volynskyi', 'kherson-basic-medical-college': 'Komunalnyi zaklad "Khersonskyi',
 'nikopol-medical-college': 'Komunalnyi vyshchyi navchalnyi zaklad "Nikopolskyi', 'bakhmut-medical-college': 'Bakhmut Medical Professional College',
 'international-academy-of-ecology-and-medicine': 'International Academy of Ecology and Medicine', 'medical-natural-university': 'Medyko-Pryrodnychyi Universytet',
 'kharkiv-polytechnic-institute': 'National Technical University "Kharkiv Polytechnic', 'lviv-polytechnic-national-university': 'Lviv Polytechnic National University',
 'kyiv-national-university-of-technologies-and-design': 'Kyiv National University of Technologies and Design', 'ukrainian-state-university-of-science-and-technologies': 'Ukrainian State University of Science and Technologies',
 'donetsk-gorky-occupied': 'Donetsk State Medical University named after M. Gorky', 'crimea-georgievsky-occupied': 'Medical Academy named after S. I. Georgievsky',
}
def verdict_for(slug):
    pre = LAND_NAME.get(slug)
    if not pre: return None
    hits = [x for x in land if x['record']['name'].startswith(pre)]
    return hits[-1] if hits else None
AMBIGUOUS = {'luhansk-state-medical-university': 'the name is shared with the occupied-territory institution; the figure cannot be split',
             'kyiv-medical-university': 'searchers may mean another Kyiv medical university (for example Bogomolets); the figure cannot be split',
             'sumy-state-university': '"sumy state medical university" is an agency name, not the official one'}
rows = []
for f in sorted(glob.glob(J('research', 'semrush', '*.csv'))):
    b = os.path.basename(f); R = list(csv.reader(open(f), delimiter=';'))
    if not R: continue
    h = [x.strip().lower() for x in R[0]]
    col = lambda *n: next((h.index(x) for x in n if x in h), None)
    k, v, kd, db = col('keyword'), col('search volume', 'volume'), col('keyword difficulty index', 'keyword difficulty', 'keyword_difficulty'), col('database')
    u = col('url')
    if k is None or v is None: continue
    m = re.search(r'-(in|uk|ng|pk|ae|za)-', b); fdb = m.group(1) if m else '?'
    rep = re.search(r'(phrase_these|phrase_all|phrase_fullsearch|phrase_related|phrase_questions|resource_organic)', b)
    for r in R[1:]:
        if len(r) > max(k, v) and re.fullmatch(r'\d+', (r[v] or '0').strip()): rows.append(dict(kw=r[k].strip().lower(), vol=int(r[v] or 0), kd=(r[kd] if kd is not None and kd < len(r) else ''), db=(r[db] if db is not None else fdb), rep=rep.group(1) if rep else '?', file=b, url=(r[u] if u is not None and u < len(r) else '')))
out = []
for slug, name, grp, city, flags, pat, aliases in INST:
    rec = recs.get(slug)
    v = verdict_for(slug)
    kws = [r for r in rows if re.search(pat, r['kw']) and not re.search(r'fees|cost|admission|ranking', r['kw'])]
    exact = [r for r in kws if r['rep'] == 'phrase_these' and r['vol'] > 0]
    best = {}
    for r in exact:
        if r['vol'] > best.get(r['db'], (0, ''))[0]: best[r['db']] = (r['vol'], r['kw'], r['file'])
    leads = sorted({(r['kw'], r['vol'], r['file']) for r in kws if r['rep'] in ('resource_organic', 'phrase_related', 'phrase_fullsearch') and r['vol'] > 0}, key=lambda x: (-x[1], x[0], x[2]))[:3]
    comp = sorted({r['url'] for r in rows if r['rep'] == 'resource_organic' and re.search(pat, r['kw']) and r['url'] and not r['url'].rstrip('/').endswith('mbbs-in-ukraine')})
    alt = sorted({a for a in aliases + ((rec or {}).get('alternativeNames') or []) + ((v or {}).get('record', {}).get('altNames') or []) if not re.match(r'(NOT |DO NOT|Identification code|abitly|vstup\.osvita)', a)})
    state = 'research preview (name only, noindex)' if rec and rec['verification'].get('researchPreview') else ('rejected' if grp == 'R' else 'private register only')
    checks = None
    if v and not v.get('verdict'): checks = 'not re-checked'
    if v and v.get('verdict'):
        vv = v['verdict']; checks = ''.join(['N' if vv['nameAndDomainConsistent'] else '–', 'G' if vv['authorityListingFound'] else '–', 'P' if vv['officialProgrammeForForeignersLead'] else '–', 'Q' if vv['unresolvedStatusQuestion'] else '–'])
    out.append(dict(slug=slug, name=name, group=grp, groupName=GROUPS[grp], city=city, flags=flags, aliases=alt, directory=state, skepticChecks=checks,
                    evidence='search-result leads only; no official page read (official hosts refused by the network policy)',
                    verifiedClaims=0, demandExact={d: {'volume': x[0], 'keyword': x[1], 'file': x[2]} for d, x in sorted(best.items())},
                    demandLeads=[{'keyword': a, 'volume': b, 'file': c} for a, b, c in leads], demandNote=AMBIGUOUS.get(slug, ''), competitorPages=comp, recordPrograms=len((rec or {}).get('programmes') or []) if rec else None))
json.dump(out, open(J('research', 'universities', 'MASTER_INVENTORY.json'), 'w'), indent=1, ensure_ascii=False)
print(len(out), 'institutions;', sum(1 for o in out if o['directory'].startswith('research preview')), 'previews')

# ---------------------------------------------------------------------------------------------- Markdown
def next_action(o):
    c = o['skepticChecks'] or ''
    if o['group'] == 'R': return 'Never list'
    if o['directory'].startswith('research preview'): return 'Capture the P1 official pages, then record evidence'
    if o['group'] in ('E',): return 'Out of scope for first-degree applicants unless new evidence'
    if o['group'] == 'D': return 'Read a dated official notice of the current base (relocated-institution rule, register §12), then decide listing'
    if o['group'] in ('H',): return 'Deferred: revisit only if an official page or EDEBO shows a health programme open to foreign applicants'
    if o['group'] in ('G',) and c in ('', 'not re-checked'): return 'Confirm identity and programmes from EDEBO; check for any route for foreign applicants'
    if 'Q' in c: return 'Settle the open status question with a dated official or government notice'
    if 'G' not in c: return 'Find a government listing (EDEBO or the Study in Ukraine portal)'
    if 'P' not in c: return 'Find an official page showing a programme for foreign applicants'
    if 'N' not in c: return 'Confirm the official domain from an independent source'
    return 'Meets the preview criteria: decide listing'
def demand(o):
    e = o['demandExact']
    if not e: return 'not measured' if not o['demandLeads'] else 'leads only: ' + '; '.join(f"\"{l['keyword']}\" {l['volume']}" for l in o['demandLeads'][:2])
    parts = [f"{d} {v['volume']}" for d, v in sorted(e.items(), key=lambda x: -x[1]['volume'])]
    return ', '.join(parts) + (f" ({o['demandNote']})" if o['demandNote'] else '')
L = []
L.append('# Master inventory of Ukrainian institutions (reconciled)\n')
L.append(f'**Generated by** `site/scripts/make-master-inventory.py` from the university records, the landscape and gap-discovery files in `research/universities/` and the SEMrush exports in `research/semrush/`. **Machine-readable copy:** `research/universities/MASTER_INVENTORY.json`.\n')
n_prev = sum(1 for o in out if o['directory'].startswith('research preview'))
L.append(f'**Totals:** {len(out)} institutions; {n_prev} listed in the working directory as "Not yet verified" research previews (names only, noindex, outside the sitemap); {sum(1 for o in out if o["directory"] == "private register only")} in the private register only; {sum(1 for o in out if o["group"] == "R")} rejected. **Verified institutions: 0; verified claims: 0.** All 17 listed universities are unverified research previews and every other entry is an unverified candidate in the private register. Every city, ownership, programme and status statement below is a search-result lead: no official page has been read, because the official hosts are refused by the network policy.\n')
L.append('**How institutions were deduplicated:** by official name, then former names and transliterations (Odessa/Odesa, Kharkov/Kharkiv, Kiev/Kyiv, Lvov/Lviv, Zaporozhye/Zaporizhzhia, Vinnitsa/Vinnytsia, Uzhgorod/Uzhhorod, Lugansk/Luhansk, Cherkassy/Cherkasy), then official domain. Two names that look alike but are different institutions stay separate: Kharkiv National Medical University and V. N. Karazin Kharkiv National University; Zaporizhzhia State Medical and Pharmaceutical University and Zaporizhzhia National University; Kyiv Medical University (private), Bogomolets National Medical University and Taras Shevchenko National University of Kyiv; the Ukrainian Luhansk State Medical University (reported in Rivne) and the institution in occupied Luhansk; the private Lviv Medical University (formerly Lviv Medical Institute) and Danylo Halytsky Lviv National Medical University; Kharkiv Institute of Medicine and Biomedical Sciences and Kharkiv International Medical University; Odesa I. I. Mechnikov National University ("Odesa National University") and Odesa National Medical University; Oles Honchar Dnipro National University and Dnipro State Medical University.\n')
L.append('**Checks** (an independent skeptic\'s re-check of the leads, where one was done): **N** name and domain agree across two independent results; **G** a government or authority result lists it; **P** an official page shows a programme for foreign applicants; **Q** an unresolved relocation, occupation, closure, merger or licence question. "listed earlier" = one of the original 12, listed under N25 before checks existed; "not re-checked" = researched, but the skeptic re-check did not run (verifier usage limit) or the entry is a single directory-title lead. **Demand:** SEMrush exact match (`phrase_these`), highest variant per database (in = India, uk, ng, pk, ae, za); not additive across spellings.\n')
for g, gname in GROUPS.items():
    items = [o for o in out if o['group'] == g]
    if not items: continue
    L.append(f'## {g}. {gname} ({len(items)})\n')
    L.append('| Institution (as found) | Spellings and former names (leads) | City (lead) | Flags (leads) | Directory | Checks | Demand (SEMrush exact) | Competitor page | Next evidence action |')
    L.append('|---|---|---|---|---|---|---|---|---|')
    for o in items:
        L.append('| ' + ' | '.join(str(x).replace('|', '/') for x in [o['name'], '; '.join(o['aliases'][:6]) or '—', o['city'], o['flags'] or '—', o['directory'], o['skepticChecks'] or ('listed earlier' if o['group'] in 'ABC' and o['directory'].startswith('research') else '—'), demand(o), 'yes' if o['competitorPages'] else '—', next_action(o)]) + ' |')
    L.append('')
L.append('**Coverage limits.** This inventory is as complete as search results allow, not a full register extract. No complete Ministry of Health roster or Ministry of Education list of institutions licensed for Medicine (222/I2), Dentistry (221), Pharmacy (226/I8) or Nursing (223/I5) came back from search; group G in particular holds only the communal academies that surfaced, and there are more. The authoritative enumeration is EDEBO (`registry.edbo.gov.ua`, already in the 20-host access request) filtered by specialty, cross-checked with the annexes of MoH order No. 1329 of 29.07.2024. A second discovery pass on 2026-10-16 (six angles: nursing, dentistry, pharmacy, the Study in Ukraine portal, agency lists, relocated and occupied-territory institutions; `research/universities/2026-10-16-recheck-and-discovery.json`) added 13 institutions and re-checked eight; four further candidates were not researched in that pass (listed in the file). Search results summarise pages; no official page was opened.\n')
L.append('**Competitor page** = the leading competitor (rmcedu.com) has a university page that ranks for the name in the India database (`research/semrush/2026-10-12-resource_organic-in-rmcedu-ukraine-urls.csv`, `2026-10-11-P3-resource_organic-in-rmcedu-mbbs-in-ukraine.csv`).\n')
open(J('research', 'universities', 'MASTER_INVENTORY.md'), 'w').write('\n'.join(L))
print('wrote MASTER_INVENTORY.md')
