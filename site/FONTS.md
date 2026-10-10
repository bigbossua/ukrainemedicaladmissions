# Self-hosted fonts

| File | Family | Weights | Subset | Licence |
|---|---|---|---|---|
| `inter-latin.woff2`, `inter-latin-ext.woff2` | Inter (variable) | 400–600 | latin, latin-ext | SIL OFL 1.1 |
| `inter-tight-latin.woff2`, `inter-tight-latin-ext.woff2` | Inter Tight (variable) | 600–700 | latin, latin-ext | SIL OFL 1.1 |

Source: Google Fonts static CSS endpoint (Inter v20 / Inter Tight), retrieved 2026-10-10; the woff2 files are the upstream variable fonts, unmodified.
Licence text: https://openfontlicense.org — fonts may be bundled and served freely; attribution kept here.

Why self-host: no third-party request on page load (privacy, GDPR), one fewer DNS/TLS round-trip, and a stricter Content-Security-Policy (`font-src 'self'`).

To refresh: fetch `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@600;700&display=swap` with a modern-browser User-Agent, download the latin and latin-ext `woff2` URLs, and regenerate `fonts.css` keeping the `unicode-range` values.
