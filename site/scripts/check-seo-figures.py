#!/usr/bin/env python3
"""Check that keyword figures quoted in an SEO document exist in the SEMrush exports (research/semrush/*.csv).

Usage (from the repository root):  python3 site/scripts/check-seo-figures.py SEO_PAGE_PLAN.md [more.md ...]

Builds an index of every (keyword, database) row in the exports with its search volume and keyword difficulty, then, for
every keyword from the exports that appears in the document (quoted, backticked or in a table cell), reads the numbers on
the same line right after it and checks that at least one of them is that keyword's recorded volume or difficulty in some
database. Also lists quoted phrases followed by a volume-like number that occur in no export at all. Exit 1 if any figure
does not match. It cannot judge prose claims; it only proves that the quoted numbers come from the exports.
"""
import csv, glob, io, os, re, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
DBS = ('in', 'uk', 'ng', 'pk', 'ae', 'za', 'us')

def db_of(name):
    m = re.search(r'-(in|uk|ng|pk|ae|za|us)-', os.path.basename(name))
    return m.group(1) if m else '?'

index = {}  # keyword -> list of (db, volume, kd, file)
for path in sorted(glob.glob(os.path.join(ROOT, 'research', 'semrush', '*.csv'))):
    text = open(path, encoding='utf-8').read()
    rows = list(csv.reader(io.StringIO(text), delimiter=';'))
    if not rows: continue
    head = [h.strip().lower() for h in rows[0]]
    def col(*names):
        for n in names:
            if n in head: return head.index(n)
        return None
    k, v, kd, dbc = col('keyword'), col('search volume', 'volume'), col('keyword difficulty index', 'keyword difficulty', 'keyword_difficulty'), col('database')
    extra = [c for c in (col('traffic'), col('position')) if c is not None]  # resource_organic exports
    if k is None or v is None: continue
    for r in rows[1:]:
        if len(r) <= max(k, v): continue
        kw = r[k].strip().lower()
        if not kw: continue
        db = r[dbc].strip() if dbc is not None and dbc < len(r) else db_of(path)
        index.setdefault(kw, []).append((db, r[v].strip(), (r[kd].strip() if kd is not None and kd < len(r) else ''), os.path.basename(path), [r[c].strip() for c in extra if c < len(r)]))

def num(s):
    s = s.replace(',', '')
    try: return float(s)
    except ValueError: return None

problems, checked = [], 0
for doc in sys.argv[1:]:
    lines = open(doc, encoding='utf-8').read().split('\n')
    for i, line in enumerate(lines, 1):
        low = line.lower()
        taken = []  # spans of longer keywords already matched on this line; a shorter keyword inside one is skipped
        for kw in sorted(index, key=len, reverse=True):
            for m in re.finditer(r'(?<![a-z0-9])' + re.escape(kw) + r'(?![a-z0-9])', low):
                if any(a <= m.start() and m.end() <= b for a, b in taken): continue
                taken.append((m.start(), m.end()))
                # only the figure directly after the keyword: closing quote/backtick, then punctuation or a few linking words
                tail = line[m.end():m.end() + 40]
                mm = re.match(r'["”`\']?\*{0,2}\s*(?:[:=(|,—–-]\s*|\s)*(?:(?:exact|volume|vol\.?|in|uk|ng|pk|ae|za|india|search volume|monthly|is|at|of|was|has|with|kd|position|pos\.?)\s+){0,3}[:=(]?\s*\*{0,2}(\d[\d,]*(?:\.\d+)?)\b', tail, re.I)
                if not mm: continue
                x = num(mm.group(1))
                if x is None or x < 10 or 2000 <= x <= 2100: continue
                checked += 1
                known = {num(e[1]) for e in index[kw]} | {num(e[2]) for e in index[kw] if e[2]} | {num(t) for e in index[kw] for t in e[4] if t}
                nums = [x]
                if not any(x in known for x in nums):
                    problems.append(f'{os.path.basename(doc)}:{i}: "{kw}" followed by {nums[:3]}, exports have ' + ', '.join(f'{e[0]} {e[1]} (kd {e[2] or "-"}; {e[3]})' for e in index[kw][:4]))
        for m in re.finditer(r'["“`]([a-z][a-z0-9 \'-]{5,80})["”`]\s*[:(]?\s*(?:in\s+)?(\d[\d,]*)\b', low):
            phrase, n = m.group(1).strip(), num(m.group(2))
            if n is None or n < 10 or (2000 <= n <= 2100) or phrase in index: continue
            if any(t in phrase for t in ('.md', '.csv', '/', 'http')): continue
            problems.append(f'{os.path.basename(doc)}:{i}: quoted phrase "{phrase}" with {int(n)} is in no SEMrush export')
print(f'check-seo-figures: {len(index)} keywords indexed from {len(glob.glob(os.path.join(ROOT, "research", "semrush", "*.csv")))} exports; {checked} keyword figures checked; {len(problems)} problem(s)')
for p in problems: print('  ' + p)
sys.exit(1 if problems else 0)
