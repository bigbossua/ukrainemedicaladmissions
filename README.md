# Ukraine Medical Admissions

Independent admissions-support business and website for international students applying to medical universities in Ukraine. Production domain: https://ukrainemedicaladmissions.com/

| Folder / file | Purpose |
|---|---|
| `site/` | The website (Astro, static output + PHP enquiry handler). `npm install && npm run dev` to work locally; `npm test` builds and runs all checks. |
| `site/src/content/universities/` | **Single source of truth** for university and programme data. Every fact carries a verification status, source URL and check date. |
| `brand/` | Logo, favicon, brand guidelines, homepage design direction. |
| `*.md` at root | Project records (plan, hosting, SEMrush ledger, registers, specs, checklists). Start with `PROJECT_EXECUTION_PLAN.md`. |
| `.github/workflows/` | CI (build + tests on every push) and the manual production-branch publisher. |

Rules that never change: no invented university facts; no WhatsApp CTAs; the primary CTA is **Apply Online Now**; nothing reaches production without the release checklist and the owner's approval.
