#!/usr/bin/env python3
"""
Ukraine Medical Admissions — logo generator (reproducible source).

Builds every SVG in brand/logo and brand/favicon from the geometry below.
Wordmark text is converted to outlined paths (Inter Display, SIL OFL 1.1)
so the SVGs have no font dependency.

Run:  python3 brand/source/generate_logo.py
Deps: fonttools, uharfbuzz (optional — used for kerning), Inter OTF files.
"""
import os, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

try:
    import uharfbuzz as hb
except ImportError:  # kerning falls back to plain advance widths
    hb = None

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT_LOGO = os.path.join(ROOT, "brand", "logo")
OUT_FAV = os.path.join(ROOT, "brand", "favicon")
FONT_DIR = "/usr/share/fonts/opentype/inter"
FONT_BOLD = os.path.join(FONT_DIR, "InterDisplay-Bold.otf")
FONT_MED = os.path.join(FONT_DIR, "InterDisplay-Medium.otf")

# ---- Brand colours (see brand/BRAND_GUIDELINES.md) -----------------------
NAVY = "#0B1F3F"      # Navy 900 — primary
BLUE = "#1A5FC8"      # Medical Blue 600 — CTA / links
YELLOW = "#F2C230"    # Ukrainian Yellow 400 — restrained accent
WHITE = "#FFFFFF"

# ---- Emblem geometry (64 x 64 grid) --------------------------------------
# A rounded tile carrying a bold "U"-shaped arch — an open gateway — standing
# on a yellow threshold bar. Blue above yellow quietly echoes the Ukrainian
# flag without drawing a flag or a map. No cross, caduceus or crest.
def emblem(tile, arch, bar, x=0, y=0, size=64, with_tile=True, heavy=False):
    """heavy=True thickens the strokes for icons rendered at <= 32 px."""
    s = size / 64.0
    sw, bh, by = (10.5, 6.5, 50.5) if heavy else (9, 5, 51)
    g = []
    if with_tile:
        g.append(f'<rect x="{x}" y="{y}" width="{size}" height="{size}" rx="{14*s:.3f}" fill="{tile}"/>')
    # Arch: stroke-based U, round caps
    g.append(
        f'<path d="M{x+20*s:.3f} {y+15*s:.3f} V{y+31*s:.3f} A{12*s:.3f} {12*s:.3f} 0 0 0 {x+44*s:.3f} {y+31*s:.3f} V{y+15*s:.3f}" '
        f'fill="none" stroke="{arch}" stroke-width="{sw*s:.3f}" stroke-linecap="round"/>'
    )
    # Threshold bar
    g.append(f'<rect x="{x+16*s:.3f}" y="{y+by*s:.3f}" width="{32*s:.3f}" height="{bh*s:.3f}" rx="{2.5*s:.3f}" fill="{bar}"/>')
    return "\n".join(g)


# ---- Text outlining ------------------------------------------------------
_font_cache = {}

def _font(path):
    if path not in _font_cache:
        tt = TTFont(path)
        data = open(path, "rb").read() if hb else None
        _font_cache[path] = (tt, data)
    return _font_cache[path]

def text_path(text, font_path, size, x, y, fill, tracking=0.0):
    """Return (<path>, advance_width) for `text` with baseline at (x, y)."""
    tt, data = _font(font_path)
    upem = tt["head"].unitsPerEm
    scale = size / upem
    glyph_set = tt.getGlyphSet()
    cmap = tt.getBestCmap()
    order = tt.getGlyphOrder()

    # Shape with HarfBuzz when available (applies kerning), else plain advances.
    items = []
    if hb:
        face = hb.Face(data); font = hb.Font(face); font.scale = (upem, upem)
        buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
        hb.shape(font, buf, {"kern": True, "liga": True})
        for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
            items.append((order[info.codepoint], pos.x_advance, pos.x_offset, pos.y_offset))
    else:
        hmtx = tt["hmtx"]
        for ch in text:
            gname = cmap.get(ord(ch), ".notdef")
            items.append((gname, hmtx[gname][0], 0, 0))

    d_parts, pen_x = [], 0.0
    for gname, adv, xo, yo in items:
        pen = SVGPathPen(glyph_set)
        # font units -> SVG: scale, flip y, translate to baseline
        tp = TransformPen(pen, (scale, 0, 0, -scale, x + (pen_x + xo) * scale, y - yo * scale))
        glyph_set[gname].draw(tp)
        if pen.getCommands():
            d_parts.append(pen.getCommands())
        pen_x += adv + tracking * upem
    width = pen_x * scale
    return f'<path fill="{fill}" d="{" ".join(d_parts)}"/>', width


def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}" width="{w:.0f}" height="{h:.0f}" role="img" aria-label="{title}">\n'
            f'<title>{title}</title>\n{body}\n</svg>\n')


def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("wrote", os.path.relpath(path, ROOT))


def build():
    title = "Ukraine Medical Admissions"
    variants = {
        # name: (tile, arch, bar, text colour, background for preview)
        "light": (NAVY, WHITE, YELLOW, NAVY),
        "dark":  (WHITE, NAVY, YELLOW, WHITE),
    }

    for name, (tile, arch, bar, text_col) in variants.items():
        # ---- Horizontal lockup: emblem 64 + gap 20 + two-line wordmark -----
        E, gap, fs = 64.0, 20.0, 27.0
        l1, w1 = text_path("Ukraine Medical", FONT_BOLD, fs, E + gap, 28.5, text_col, tracking=-0.015)
        l2, w2 = text_path("Admissions", FONT_MED, fs, E + gap, 55.5, text_col, tracking=-0.01)
        W = E + gap + max(w1, w2)
        body = emblem(tile, arch, bar) + "\n" + l1 + "\n" + l2
        write(os.path.join(OUT_LOGO, f"uma-logo-horizontal-{name}.svg"), svg(W, E, body, title))

        # ---- Stacked lockup: emblem centred over two centred lines ---------
        E2, fs2 = 88.0, 24.0
        l1, w1 = text_path("Ukraine Medical", FONT_BOLD, fs2, 0, 0, text_col, tracking=-0.015)
        l2, w2 = text_path("Admissions", FONT_MED, fs2, 0, 0, text_col, tracking=-0.01)
        W = max(w1, w2, E2) + 8
        cx = W / 2
        b1, _ = text_path("Ukraine Medical", FONT_BOLD, fs2, cx - w1/2, E2 + 36, text_col, tracking=-0.015)
        b2, _ = text_path("Admissions", FONT_MED, fs2, cx - w2/2, E2 + 64, text_col, tracking=-0.01)
        H = E2 + 72
        body = emblem(tile, arch, bar, x=cx - E2/2, y=0, size=E2) + "\n" + b1 + "\n" + b2
        write(os.path.join(OUT_LOGO, f"uma-logo-stacked-{name}.svg"), svg(W, H, body, title))

        # ---- Emblem only ---------------------------------------------------
        write(os.path.join(OUT_LOGO, f"uma-emblem-{name}.svg"),
              svg(64, 64, emblem(tile, arch, bar), title + " emblem"))

    # ---- One-colour emblem (navy on transparent, for print / embossing) ----
    write(os.path.join(OUT_LOGO, "uma-emblem-mono-navy.svg"),
          svg(64, 64, emblem(NAVY, WHITE, WHITE), title + " emblem (mono)"))

    # ---- Favicon: the light emblem, full-bleed tile ------------------------
    write(os.path.join(OUT_FAV, "favicon.svg"), svg(64, 64, emblem(NAVY, WHITE, YELLOW, heavy=True), title))


if __name__ == "__main__":
    build()
