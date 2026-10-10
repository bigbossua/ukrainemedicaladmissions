# Ukraine Medical Admissions — Brand Guidelines

**Version 1.0 — 2026-10-10.** Final identity for ukrainemedicaladmissions.com. All assets in this folder are production-ready and reproducible from `brand/source/`.

---

## 1. The emblem — "The Gateway"

A rounded navy tile carrying a bold white **U**-shaped arch standing on a yellow threshold bar.

- The **arch** reads as an open gateway — admission is the doorway to a medical career — and doubles as the **U** of Ukraine / University.
- The **threshold bar** in restrained Ukrainian yellow sits *beneath* the blue, a quiet echo of the national flag's blue-over-yellow without drawing a flag, a map or a trident.
- Deliberately absent: crosses, caduceus/rod of Asclepius, crests, laurels, map outlines. The mark makes no medical-authority, governmental or university claim.
- Geometry is three primitives (rounded rect, one stroke path, one bar), so it survives 16 × 16 px. The favicon build uses a slightly heavier stroke (`heavy=True` in the generator) for crispness below 32 px.

## 2. Logo system

| Asset | File | Use |
|---|---|---|
| Primary horizontal, light backgrounds | `logo/uma-logo-horizontal-light.svg` (+ PNG 600/1200) | Header, documents, email signature |
| Primary horizontal, dark backgrounds | `logo/uma-logo-horizontal-dark.svg` (+ PNG) | Footer, navy sections, dark mode |
| Stacked, light | `logo/uma-logo-stacked-light.svg` (+ PNG) | Square placements, social avatars with text, print |
| Stacked, dark | `logo/uma-logo-stacked-dark.svg` (+ PNG) | As above on navy |
| Emblem only, light / dark | `logo/uma-emblem-light.svg`, `logo/uma-emblem-dark.svg` (+ PNG 512) | App icons, avatars, watermarks |
| Emblem mono navy | `logo/uma-emblem-mono-navy.svg` | Single-colour print, embossing |

Wordmark: **"Ukraine Medical"** in Inter Display Bold over **"Admissions"** in Inter Display Medium, tracking −1.5 % / −1 %. Text is outlined to paths in every SVG — no font needed to render.

**Clear space:** keep a margin equal to the emblem's threshold-bar width (half the emblem height) on all sides.
**Minimum size:** horizontal 120 px wide (32 px emblem); stacked 72 px wide; emblem alone 16 px.
**Dark variant rule:** on dark backgrounds the tile becomes white and the arch navy; the yellow bar never changes.

**Do not:** recolour the arch or bar; place the light tile on navy (use the dark variant); stretch; add drop shadows or gradients to the emblem; set the wordmark in another typeface; pair the mark with any university or ministry logo in a way that implies partnership.

## 3. Colour

| Token | Hex | Role |
|---|---|---|
| `navy-900` | `#0B1F3F` | Primary brand colour; headings; emblem tile; footer |
| `navy-800` | `#0F2A52` | Hero gradient mid-tone |
| `navy-700` | `#15325F` | Hover state for primary buttons on light; secondary surfaces |
| `blue-600` | `#1A5FC8` | **Primary CTA** ("Apply Online Now"), links, interactive accents |
| `blue-500` | `#2F7BE5` | Large-text accents, icons, charts — **not** body text on white |
| `blue-100` | `#DCE8FA` | Card tints, illustration fills |
| `blue-50` | `#EEF4FC` | Section backgrounds, icon chips |
| `yellow-400` | `#F2C230` | Threshold bar; eyebrow ticks; highlight — **decorative only, ≤ 5 % of any page** |
| `yellow-600` | `#B98A05` | Yellow at large text sizes only (≥ 24 px) |
| `ink` | `#111827` | Body text |
| `slate` | `#4B5563` | Secondary text, captions |
| `line` | `#E3E8EF` | Borders, dividers |
| `mist` | `#F5F7FA` | Alternate section background |
| `white` | `#FFFFFF` | Base |

**Measured contrast (WCAG 2.1):**

| Pair | Ratio | Result |
|---|---|---|
| white on navy-900 | 16.4 : 1 | AAA |
| white on navy-700 | 12.7 : 1 | AAA |
| white on blue-600 (CTA) | 5.97 : 1 | AA (all sizes) |
| white on blue-500 | 4.13 : 1 | Large text only |
| blue-600 on white (links) | 5.97 : 1 | AA |
| blue-600 on blue-50 | 5.40 : 1 | AA |
| ink on white | 17.7 : 1 | AAA |
| slate on white | 7.56 : 1 | AAA |
| navy-900 on yellow-400 | 9.78 : 1 | AAA |
| yellow-600 on white | 3.13 : 1 | Large text only — never body copy |

Rule of thumb: **navy and blue carry meaning; yellow is punctuation.** Yellow is never used as a text colour at body size, never as a button fill, and never covers large areas.

## 4. Typography

| Role | Face | Weight | Notes |
|---|---|---|---|
| Display / headings | **Inter Tight** (Google Fonts) | 600–700 | Tracking −0.02 em; line-height 1.1 |
| Body / UI | **Inter** (Google Fonts) | 400–600 | 16 px base, line-height 1.55 |
| Logo wordmark | Inter Display (outlined) | 700 / 500 | Never re-typeset |

Both faces are open source (SIL OFL 1.1), free for commercial use, and can be self-hosted (recommended for performance and GDPR — no third-party font requests).

Type scale (fluid): H1 `clamp(2rem, 5vw, 3.5rem)` · H2 `clamp(1.5rem, 3vw, 2.125rem)` · H3 1.125 rem · body 1 rem · small 0.875 rem · eyebrow 0.8 rem uppercase, +0.08 em tracking.

## 5. Favicon and app icons

| File | Size | Use |
|---|---|---|
| `favicon/favicon.svg` | vector | Modern browsers (`<link rel="icon" type="image/svg+xml">`) |
| `favicon/favicon.ico` | 16 + 32 + 48 | Legacy fallback (`<link rel="icon" href="/favicon.ico" sizes="any">`) |
| `favicon/favicon-16x16.png`, `-32x32.png`, `-48x48.png` | PNG | Explicit sizes |
| `favicon/apple-touch-icon.png` | 180 × 180 | iOS home screen |
| `favicon/android-chrome-192x192.png`, `-512x512.png` | PNG | Web app manifest / Android |

Recommended `<head>` snippet:

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="theme-color" content="#0B1F3F">
```

## 6. Voice and imagery

- **Tone:** precise, calm, factual. Say what is verified and when. No superlatives ("best", "top-ranked", "guaranteed").
- **Imagery:** real campus photography from official university sources where licensed; otherwise Unsplash images of study, laboratories and lecture halls — never captioned as a specific campus. Record source, photographer, date and licence for every image.
- **Mandatory disclaimer wherever universities are named:** independent service, not affiliated with or endorsed by any university or government body; admission decisions rest with the university.
- **CTA:** the only primary button label is **Apply Online Now**. No WhatsApp buttons, icons or links.

## 7. Homepage design direction

See `homepage/homepage-direction.html` (self-contained, no build) and the rendered `homepage-direction-desktop.png` / `homepage-direction-mobile.png`.

Structure: sticky white header with horizontal logo and a single primary CTA → navy gradient hero with headline, supporting copy, CTA pair and an **application-start card** (course / university / certificate country) → three proof cards (verified data, comparison, one journey) → featured universities on mist → four course cards → four-step process with the non-guarantee note → navy CTA band → navy footer with the dark logo and the independence disclaimer.

Layout rules: 1200 px max width, `clamp(16px, 4vw, 40px)` gutters, single column below 700 px, two/three/four-column grids above; 14 px card radius; pill buttons; yellow appears only as eyebrow ticks and the note rule. Every figure in the mock-up is a **[TBC] placeholder** until verified.

## 8. Reproducing the assets

```bash
pip install fonttools uharfbuzz          # Inter OTFs must be installed (fonts-inter)
python3 brand/source/generate_logo.py    # → brand/logo/*.svg, brand/favicon/favicon.svg
node brand/source/render_png.js          # → PNG exports (Playwright + Chromium)
convert favicon-16x16.png favicon-32x32.png favicon-48x48.png favicon.ico   # ImageMagick
node brand/source/render_homepage.js     # → homepage screenshots
```

Licences: Inter / Inter Tight — SIL Open Font License 1.1. Logo artwork — © Ukraine Medical Admissions, all rights reserved.
