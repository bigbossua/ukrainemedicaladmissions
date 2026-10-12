#!/usr/bin/env python3
"""Route B capture intake (UNIVERSITY_EVIDENCE_STANDARD.md §11.3 and "Tools").

    python3 -I site/scripts/capture-intake.py <captures-dir> <slug> [--find "phrase" ...] [--register <file>]

Reads a folder of captures the owner made in an ordinary browser (PDF prints, HTML saves, screenshots) and:
  1. refuses a folder inside this repository, a folder that contains it, or a folder inside any other git working tree
     (captures stay OUTSIDE every repository while this one is public);
  2. lists each file with its size and SHA-256 (symbolic links and hidden files are skipped, never followed);
  3. extracts the text of PDFs (with pdftotext, if installed; otherwise it says so) and of HTML and .txt files (tags,
     scripts and styles removed) into a new temporary directory OUTSIDE the repository, one .txt per capture, pages
     separated by form feeds;
  4. matches the file names to section A of the record's register (research/verification/<slug>/EVIDENCE_REGISTER.md,
     names <slug>--NN--short-name.ext where NN is the row number) and lists the rows that have a capture and the rows
     still missing one;
  5. with --find, prints every match of each phrase with the file and page number, so the reviewer can copy the exact
     quotation (and then checks it word for word against the capture itself).

It writes nothing into the repository and never runs anything found in the captures. Exit code: 0 done, 2 refused.
"""
import argparse
import hashlib
import os
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parents[2]
SLUG = re.compile(r'^[a-z0-9]+(?:-[a-z0-9]+)*$')
TEXT_EXT = {'.html', '.htm', '.txt'}
IMAGE_EXT = {'.png', '.jpg', '.jpeg', '.webp', '.gif', '.tif', '.tiff', '.bmp'}
CONTROL = re.compile(r'[\x00-\x08\x0b-\x1f\x7f-\x9f]')


def safe(s):
    """Text from a capture or a file name, made safe to print in a terminal (no control characters)."""
    return CONTROL.sub(' ', str(s))


class Refused(Exception):
    pass


def inside(child, parent):
    try:
        child.relative_to(parent)
        return True
    except ValueError:
        return False


def git_tree_of(path):
    """The nearest folder at or above `path` holding a .git entry, found by looking at the file system only (no git
    command is run, so nothing configured inside an untrusted folder can execute)."""
    for p in [path, *path.parents]:
        if os.path.lexists(p / '.git'):
            return p
    return None


def check_captures_dir(arg):
    cap = pathlib.Path(arg).expanduser()
    if not cap.exists():
        raise Refused(f'no such folder: {safe(arg)}')
    cap = cap.resolve(strict=True)
    if not cap.is_dir():
        raise Refused(f'not a folder: {safe(cap)}')
    if inside(cap, ROOT):
        raise Refused(f'{safe(cap)} is inside the repository ({ROOT}). Captures stay OUTSIDE the repository while it is public '
                      '(UNIVERSITY_EVIDENCE_STANDARD.md §2): move the folder elsewhere and run again.')
    if inside(ROOT, cap):
        raise Refused(f'{safe(cap)} contains the repository ({ROOT}). Give the folder that holds only the captures.')
    tree = git_tree_of(cap)
    if tree is not None:
        raise Refused(f'{safe(cap)} is inside a git working tree ({safe(tree)}). Captures must stay outside every repository.')
    return cap


def sha256(path):
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(1 << 16), b''):
            h.update(chunk)
    return h.hexdigest()


class TextOnly(HTMLParser):
    """Visible text of an HTML document: script, style, template and noscript content dropped; entities decoded."""
    SKIP = {'script', 'style', 'template', 'noscript'}
    BLOCK = {'p', 'div', 'br', 'li', 'tr', 'td', 'th', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'section', 'article', 'table', 'ul', 'ol', 'dt', 'dd', 'title'}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts, self.skip = [], 0

    def handle_starttag(self, tag, attrs):
        if tag in self.SKIP:
            self.skip += 1
        elif tag in self.BLOCK:
            self.parts.append('\n')

    def handle_endtag(self, tag):
        if tag in self.SKIP:
            self.skip = max(0, self.skip - 1)
        elif tag in self.BLOCK:
            self.parts.append('\n')

    def handle_data(self, data):
        if not self.skip:
            self.parts.append(data)

    def text(self):
        return ''.join(self.parts)  # entities are already decoded (convert_charrefs)


def extract(path, pdftotext):
    """Return (pages, message). pages is a list of page texts, or None when no text could be extracted."""
    ext = path.suffix.lower()
    if ext == '.pdf':
        if not pdftotext:
            return None, 'PDF text not extracted: pdftotext is not installed (install poppler-utils, or read the PDF by eye)'
        try:
            r = subprocess.run([pdftotext, '-enc', 'UTF-8', str(path), '-'], capture_output=True, timeout=120, check=False)
        except subprocess.TimeoutExpired:
            return None, 'PDF text not extracted: pdftotext took more than 120 seconds'
        if r.returncode != 0:
            return None, f'PDF text not extracted: pdftotext failed ({safe(r.stderr.decode("utf-8", "replace").strip()[:200])})'
        pages = r.stdout.decode('utf-8', 'replace').split('\f')
        if pages and not pages[-1].strip():
            pages = pages[:-1]
        if not any(p.strip() for p in pages):
            return pages, 'the PDF has no text layer (a scanned image?): read it by eye'
        return pages, f'{len(pages)} page(s) of text'
    if ext in ('.html', '.htm'):
        p = TextOnly()
        p.feed(path.read_bytes().decode('utf-8', 'replace'))
        p.close()
        return [p.text()], 'HTML text (tags, scripts and styles removed)'
    if ext == '.txt':
        pages = path.read_bytes().decode('utf-8', 'replace').split('\f')
        return pages, 'plain text (a text file shows no address or date: use it to find passages, never as the capture itself)'
    if ext in IMAGE_EXT:
        return None, 'image: no text extracted (read it by eye)'
    return None, 'not a PDF, HTML, text or image file: no text extracted'


def register_rows(register):
    """Section A rows of an evidence register: {row number: label}."""
    rows, in_a = {}, False
    for line in register.read_text(encoding='utf-8').splitlines():
        if line.startswith('## '):
            in_a = line.startswith('## A.')
            continue
        m = re.match(r'^\|\s*(\d+)\s*\|\s*(.*?)\s*\|', line) if in_a else None
        if m:
            cell = m.group(2)
            link = re.match(r'^\[(.*?)\]\((.*?)\)', cell)
            rows[int(m.group(1))] = link.group(1) if link else cell
    return rows


def normalise(text):
    """Case-folded text with every run of white space made one space, plus a map from each position back to the original."""
    out, idx, space = [], [], True
    for i, ch in enumerate(text):
        if ch.isspace():
            if not space:
                out.append(' ')
                idx.append(i)
            space = True
            continue
        space = False
        for c in ch.casefold():
            out.append(c)
            idx.append(i)
    return ''.join(out), idx


def find_all(text, phrase):
    """Every (start, end) of `phrase` in `text`, ignoring case and differences in white space; positions in `text`."""
    norm, idx = normalise(text)
    needle, _ = normalise(phrase)
    needle = needle.strip()
    hits, start = [], 0
    if not needle:
        return hits
    while True:
        k = norm.find(needle, start)
        if k < 0:
            return hits
        hits.append((idx[k], idx[k + len(needle) - 1] + 1))
        start = k + 1


def one_line(s):
    return safe(re.sub(r'\s+', ' ', s)).strip()


def main(argv):
    ap = argparse.ArgumentParser(prog='capture-intake.py', description='Route B capture intake. Writes nothing into the repository.')
    ap.add_argument('captures', help='folder holding the captures (outside the repository)')
    ap.add_argument('slug', help='record slug, e.g. vinnytsia-national-pirogov-memorial-medical-university')
    ap.add_argument('--find', action='append', default=[], metavar='PHRASE', help='phrase to look for (repeat for several)')
    ap.add_argument('--register', help='evidence register to match against (default research/verification/<slug>/EVIDENCE_REGISTER.md)')
    a = ap.parse_args(argv)
    if not SLUG.match(a.slug):
        raise Refused(f'"{safe(a.slug)}" is not a lower-case record slug')
    cap = check_captures_dir(a.captures)

    work = pathlib.Path(tempfile.mkdtemp(prefix=f'capture-intake-{a.slug}-')).resolve()
    if inside(work, ROOT):
        shutil.rmtree(work, ignore_errors=True)
        raise Refused(f'the temporary directory would be inside the repository ({work}); set TMPDIR to a folder outside it')
    pdftotext = shutil.which('pdftotext')

    print(f'Capture intake for {a.slug}')
    print(f'  Captures: {safe(cap)} (outside the repository)')
    print(f'  Extracted text: {work} (temporary, outside the repository; delete it when done)')
    if not pdftotext:
        print('  pdftotext is not installed: PDF text will not be extracted (the files are still listed and matched).')

    files, skipped = [], []
    for dirpath, dirnames, filenames in os.walk(cap, followlinks=False):
        dirnames[:] = sorted(d for d in dirnames if not d.startswith('.') and not os.path.islink(os.path.join(dirpath, d)))
        for name in sorted(filenames):
            p = pathlib.Path(dirpath, name)
            if name.startswith('.'):
                continue
            if p.is_symlink() or not p.is_file():
                skipped.append(p)
                continue
            files.append(p)

    print(f'\nFiles ({len(files)}):')
    print('| File | Size (bytes) | SHA-256 | Text |')
    print('|---|---|---|---|')
    texts = {}
    for n, p in enumerate(files, 1):
        rel = p.relative_to(cap)
        pages, msg = extract(p, pdftotext)
        if pages is not None:
            texts[rel] = pages
            (work / f'{n:03d}-{re.sub(r"[^A-Za-z0-9._-]", "_", p.name)}.txt').write_text('\f'.join(pages), encoding='utf-8')
        print(f'| {safe(rel)} | {p.stat().st_size} | {sha256(p)} | {msg} |')
    for p in skipped:
        print(f'  skipped (symbolic link or not a regular file, never followed): {safe(p.relative_to(cap))}')

    register = pathlib.Path(a.register) if a.register else ROOT / 'research' / 'verification' / a.slug / 'EVIDENCE_REGISTER.md'
    print(f'\nRegister: {safe(register)}')
    if not register.is_file():
        print('  no register found, so file names are not matched to rows.')
    else:
        rows = register_rows(register)
        name_re = re.compile(rf'^{re.escape(a.slug)}--(\d+)--(.+)\.([A-Za-z0-9]+)$')
        by_row, odd = {}, []
        for p in files:
            m = name_re.match(p.name)
            if m and int(m.group(1)) in rows:
                by_row.setdefault(int(m.group(1)), []).append(p.relative_to(cap))
            else:
                odd.append((p.relative_to(cap), 'row %s is not in section A of the register' % int(m.group(1)) if m else f'does not follow {a.slug}--NN--short-name.ext'))
        have = [r for r in sorted(rows) if r in by_row]
        missing = [r for r in sorted(rows) if r not in by_row]
        print(f'  Section A rows: {len(rows)}; with a capture: {len(have)}; still missing: {len(missing)}.')
        print('  Rows with a capture:')
        for r in have:
            print(f'    {r:>2}. {safe(rows[r])}: {", ".join(safe(x) for x in by_row[r])}')
        if not have:
            print('    none')
        print('  Rows still missing a capture (a row may instead be closed as NOT FOUND or SILENT in the register):')
        for r in missing:
            print(f'    {r:>2}. {safe(rows[r])}')
        if not missing:
            print('    none')
        if odd:
            print('  Files not matched to a row:')
            for rel, why in odd:
                print(f'    {safe(rel)}: {why}')

    for phrase in a.find:
        hits = []
        for rel, pages in texts.items():
            for pn, page in enumerate(pages, 1):
                for s, e in find_all(page, phrase):
                    hits.append((rel, pn, page, s, e))
        print(f'\nPhrase "{safe(phrase)}": {len(hits)} match(es)')
        for rel, pn, page, s, e in hits:
            before, match, after = page[max(0, s - 80):s], page[s:e], page[e:e + 80]
            print(f'  {safe(rel)}, page {pn}: ...{one_line(before)} [[{one_line(match)}]] {one_line(after)}...')
            print(f'    extracted text: "{one_line(match)}"')
        if not hits:
            print('  no match. Extracted text can differ from the page (ligatures, hyphenation, line breaks, scanned pages): read the capture itself.')
    if a.find:
        print('\nCopy each quotation from the capture itself and check it word for word: extracted text is only a finding aid (UNIVERSITY_EVIDENCE_STANDARD.md §3.1, quotation).')
    print('\nNothing was written into the repository.')
    return 0


if __name__ == '__main__':
    try:
        sys.exit(main(sys.argv[1:]))
    except Refused as e:
        print(f'REFUSED: {e}', file=sys.stderr)
        print('Nothing was read or written.', file=sys.stderr)
        sys.exit(2)
