# VISUAL_AUDIT_AND_IMAGE_REGISTER.md — Phase D audit, direction and image plan (2026-10-11)

Scope: the built site at `production` `b2ca3d6` (reviewed from the local build and CI screenshots at 390/820/1280 px; the live rendering is not yet observable — see `BASELINE_REPORT.md` §9). Nothing here changes the site; it is the plan for the next design iteration.

## 1. What exists (VERIFIED in the build)

| Area | Current state | Assessment |
|---|---|---|
| Design tokens | Navy/blue/yellow palette, Inter + Inter Tight (self-hosted), radii, focus ring, 1200 px max width, fluid type and spacing (`site/src/styles/global.css`, `brand/BRAND_GUIDELINES.md`) | Solid foundation; consistent across pages; contrast fixed after the axe audit |
| Components | Header (mobile menu), Footer, Breadcrumbs (with structured data), CtaBand, Fact (verification-flagged fact row) | Small but coherent; no card/grid component is shared (page-level markup repeats) |
| Imagery | **None except the logo set and favicons.** No photography, no illustration, no icons beyond numbered circles | The single biggest gap against the brief ("beautiful, carefully chosen photography… admissions-process illustrations") — every page is text-only |
| Home | Navy hero with H1, intro, inline application-start form; sections for universities, courses, process, trust; CTA band | Clear hierarchy; visually flat without imagery; the hero form competes with the CTA for attention |
| Directory and profile | Filterable card list; profile uses fact rows with verification badges and a pending banner | Honest and legible; cards have no visual anchor (no image, no crest); profile is long (≈1,380 words) with no visual rhythm |
| Course pages | Page-head + prose + cards | Readable; identical layout across four courses; no imagery |
| Admissions | Four-stage list + document list | Needs a process illustration and the readiness states |
| Fees | Table scaffold with no figures | Honest; visually empty until data exists |
| Apply | Single long form | Needs a stepped layout with a progress indicator (Stage 1 profile) |
| Accessibility and performance | axe 0 violations; Lighthouse 99–100 | Any imagery must keep LCP ≤ 2.5 s on mobile and CLS at 0 |

## 2. Design direction (decided — no choice offered)

Keep the brand system; add **three visual layers** in this order: (1) a small set of calm documentary photographs of students studying and learning environments, colour-graded to the navy/blue palette; (2) a consistent line-icon and illustration set (admissions process, document readiness, cost components) drawn in-repo as SVG in the brand colours; (3) image-led card and profile layouts (16:9 header image per university/course, crest or neutral placeholder where none is licensed). Tone: calm, factual, welcoming; no stock "smiling doctor with stethoscope" clichés, no hospital drama, no flags.

**Hard rules.** No image may depict or imply a *named* university's campus, students or facilities unless it is that institution's own authorised image with written permission recorded here. Generated images are captioned "Illustrative image" in the `alt`/caption and never show institutional branding. No hotlinking; every asset is stored in the repository with its licence record. Every `<img>` has explicit `width`/`height`, `alt`, `loading="lazy"` (hero excepted), and is served as AVIF/WebP with a JPEG fallback through Astro's image pipeline at 480/768/1200/1600 px.

## 3. Source options (free; none purchased)

| Source | Licence / basis | Status from this environment | Record to keep |
|---|---|---|---|
| Unsplash | Unsplash License (free for commercial use, no permission required; attribution appreciated and given by us) | `unsplash.com` and `images.unsplash.com` **blocked** by the network policy — the owner downloads the selected images and uploads them, or the domain is allow-listed (free) | photographer, photo URL, download date, licence name, alt text |
| Own SVG illustrations | created in-repo (MIT-style, ours) | available now | source file in `brand/illustrations/` |
| Generated imagery | tool licence must permit commercial use; labelled "Illustrative image"; never a named institution | depends on the tool available to the owner; none used yet | prompt, tool, date, label |
| University-authorised photos | written permission from the institution | none exist | permission letter, date, scope |

## 4. Image and design register

| # | Location / component | Existing problem | Proposed improvement | Image subject and purpose | Source / licence / method | Mobile · desktop treatment | Performance · accessibility |
|---|---|---|---|---|---|---|---|
| V1 | Home hero (`/`) | Text-only navy block; hero form and CTA compete | Split hero: left headline + single primary CTA **Apply Online Now** and a secondary "Check your readiness"; right a photograph; move the inline form to a compact "Start in 2 minutes" card below | Students studying together in a library or seminar room, no identifiable institution; purpose: warmth and credibility | Unsplash (owner-downloaded) or generated with label | mobile: image 4:5 under the headline, 480–768 px; desktop: 3:2 at 1200 px | hero image is the LCP element: ≤ 120 KB AVIF at 768 px; `fetchpriority="high"`; no lazy loading; explicit dimensions |
| V2 | Home "How it works" | Numbered circles only | Four-step illustrated process strip (profile → readiness → documents → application) | In-repo SVG line illustrations in brand colours | own SVG | stacked on mobile, row on desktop | inline SVG, `role="img"` with `aria-label`, ≤ 8 KB each |
| V3 | `/universities/` cards | No visual anchor; cards look alike | 16:9 header per card: crest/wordmark only with written permission, otherwise a neutral city-skyline-free gradient tile with the city name; verification badge visible | Neutral tiles; purpose: scannability without implying campus photos | own SVG/CSS tiles | 1 column → 2 → 3 | no raster images needed; zero weight |
| V4 | `/universities/<slug>/` profile head | Long fact list, no rhythm | Header band with name, city, status badges and a "last verified" date; sticky programme list on desktop; fact groups with icons | Icons only (no campus photos unless authorised) | own SVG icons | tabs/accordion on mobile | icons inline; keep profile ≤ 170 KB |
| V5 | `/courses/*` page heads | Identical text heads | One photograph per course family: medicine (anatomy/study materials), dentistry (dental training models), pharmacy (laboratory glassware), nursing (clinical-skills classroom) — generic settings, no people identifiable as patients | Unsplash or generated with label | 16:9 at 768/1200 px, under the H1 | lazy; ≤ 90 KB each |
| V6 | `/admissions/` | Four-stage list; document list plain | Process diagram (SVG) + document-readiness state legend (not requested → required → outstanding → uploaded → under review → accepted for processing) | SVG | own SVG | vertical stepper on mobile | inline SVG; text remains real text for screen readers |
| V7 | `/tuition-fees/` | Empty table | "What a year costs" component: cost components as icon tiles (tuition · accommodation · living · insurance · documents) with "verified / not published" tags — no invented figures | SVG icons | own SVG | 2 → 5 tiles | zero raster weight |
| V8 | `/apply/` | One long form | Stepped form with progress indicator (5 stages), save-and-resume promise, document "have / need" checklist (Stage 1 profile) | UI design, no imagery | — | single column | focus order and error summary per step; axe re-run |
| V9 | Candidate dashboard (future Stage 2) | does not exist | Progress ring, outstanding items list, readiness panel with met / not met / unknown / pending-evidence states, next best action | UI design | — | mobile-first | states conveyed by text + icon, never colour alone |
| V10 | `/about/` | Text-only | One photograph of a student-support setting (advising conversation, no faces required) and the verification-method illustration | Unsplash/generated with label; SVG | — | — | lazy; ≤ 90 KB |
| V11 | 404 and thank-you | Plain | Small SVG illustration consistent with V2 | own SVG | — | — | inline |
| V12 | Open Graph image | One default 1200×630 | Per-page-type OG images (home, course, university, fees) generated at build from the brand template | own template | — | — | PNG ≤ 200 KB each |

## 5. Highest-impact UX improvements (conversion)

1. **One primary CTA per screen** — "Apply Online Now" — with a secondary low-commitment action ("Check your readiness" → profile Stage 1). Today the hero form, nav button and CTA band all ask for the same commitment.
2. **Readiness before commitment:** the profile flow (§APPLICATION_SYSTEM_SPEC §8) replaces the single long form; candidates see value (a gap list) before being asked for anything sensitive.
3. **Verification visible, not shouted:** "Verified · source · date" chips on every fact; "Not published by the university" instead of blanks.
4. **Directory comparison table** on `/universities/` driven by verified fields only, with "unavailable" shown honestly.
5. **Trust strip** limited to real, verifiable statements (independence, no commissions, how we verify, complaints route) — no logos, badges or numbers we cannot source.

## 6. Checks that gate every visual change

axe (0 serious/critical), Lighthouse mobile performance ≥ 90 with the new LCP image, CLS 0, UI smoke at 3 widths, `check-meta` (alt text present on every `<img>`, to be added to the checker), image licence record present for every raster asset, no WhatsApp strings, no image implying a named institution.

## 7. Refinement 2026-10-11 — sourcing status and subject briefs

**Sourcing reality from this environment (VERIFIED today):** Unsplash, Pexels, Pixabay, Wikimedia Commons, Openverse and Wikipedia are all denied by the network policy; no image file can be downloaded here. Candidate images can still be *identified* from search-result metadata (file page URL, licence text, author as shown) for the owner to download, or the domains can be allow-listed (free). No image-generation tool is available in this session; generated visuals, if the owner has a tool, must follow the labelling rule in §2. In-repo SVG illustrations (V2, V6, V7, V11) need no external source and are the first assets to build.

**Subject briefs and alt-text drafts (for whichever source is used):**

| Row | Subject brief | Must not show | Alt text draft |
|---|---|---|---|
| V1 | Two or three students at a library table with open textbooks or a laptop; natural light; calm; no logos, no uniforms with institutional badges | hospital wards, stethoscope clichés, flags, any readable institution name | "Students studying together at a library table" |
| V5 medicine | Anatomy atlas, model or study notes on a desk | real patients, surgery | "Anatomy study materials on a desk" |
| V5 dentistry | Dental training model (typodont) in a teaching setting | a patient in a chair | "Dental training model used in teaching" |
| V5 pharmacy | Laboratory glassware or a pharmacy teaching lab, no people's faces required | hazard scenes, branded products | "Laboratory glassware in a teaching laboratory" |
| V5 nursing | Clinical-skills classroom with a training mannequin | real patients | "Clinical-skills training classroom with a mannequin" |
| V10 | Advising conversation across a table, documents in hand; faces optional | anything implying a university office | "An adviser and a student reviewing documents together" |
| University profiles | Only a Wikimedia Commons photograph of that institution's own main building, licence and author recorded, used solely on that institution's profile with attribution | any other institution's building; interiors implying facilities we have not verified | "Main building of <official name>, <city>" |

**Licence record format (one row per asset, kept in this file §8 once assets exist):** file name · subject · source page URL · licence (exact text) · author · date downloaded · modifications (crop, colour grade) · pages used on · depicts named institution (yes/no).

## 8. Candidate images identified 2026-10-11 (search-snippet metadata only; no file opened or downloaded; licences to be confirmed on the page before use)

| Row | Candidate (page) | Shown as | Author as shown | Named institution? | Status |
|---|---|---|---|---|---|
| V1 | Pexels 9572700 "Students Studying Together in a Library" · alternates 16420457, 6684506 | "Free Stock Photo" (Pexels licence expected: free commercial use, no attribution required) | not in snippet | no | candidate — confirm licence line and author on the page |
| V1 (rejected) | Unsplash JGdKrxbg9eY "Happy young university students…" | **Unsplash+ (paid)**, `isAccessibleForFree: false` | Getty Images | no | **rejected — not free** |
| V5 medicine | Pexels 28442518 "Anatomical Skeleton Model in Educational Setting" · 5428151 "Human Skeleton Model" (Tima Miroshnichenko) | Free Stock Photo | partly shown | no | candidate |
| V5 dentistry | Pexels 6627715 "Jaw Models with Teeth" · 4269698 "Teeth Model and Dental Scaler" · 6502305 "Dental Implant Model" | Free Stock Photo | not in snippet | no | candidate |
| V5 pharmacy | Pexels 1366944 "Several Laboratory Glasses" · 8539752 "Laboratory Equipment on Table" (Kindel Media) · 8442647 "Colored Liquid on Laboratory Glassware" | Free Stock Photo | partly shown | no | candidate |
| V5 nursing | Pexels 35645532 "Medical Training Simulation with Mannequin and Student" (Sahil Singh) · 34912731 "Person Performing CPR Training on Manikin" (NOAM K LNA) · 11655091 "Hands … CPR on Training Dummy" | Free Stock Photo | shown | no | candidate — people depicted: prefer the hands-only frame or check model-release wording |
| V10 about | Pexels 5306434 "A Professor Talking to Her Student" · 9159066 "Professor and Student at a Desk" | Free Stock Photo | not in snippet | no | candidate |
| Profile — Vinnytsia | Commons "Вінниця, вул. Пирогова, 56. Медичний університет.jpg" (July 2024, Shev.vl.vas) · "Вінниця, Медуніверситет (Головний корпус)" (2015, Prymasal) · "Vinnytsia National Medical University-2.jpg" | licence not in snippet (Wiki Loves Monuments uploads are usually CC BY-SA 3.0/4.0 — share-alike + attribution) | shown | **yes** — profile page only | candidate |
| Profile — Bogomolets | Commons category "Bogomolets National Medical University of Kyiv": "Нацмедуниверситет Богомольца главный вход.jpg" | not in snippet | not in snippet | yes | candidate — open file page |
| Profile — Bukovinian | Commons "Буковинський державний медичний університет.Jpg" (2010, Edward_Tur; 2,749 × 2,095) · "Cernauti - Universitatea de medicina.JPG" (2009, Gabriel Todica) | not in snippet | shown | yes | candidate |
| Profile — Ternopil | Commons "Тернопіль, Адмінкорпус медичного університету" (Maidan Voli 1) · morphology building files under Category:12 Ruska Street, Ternopil | not in snippet | not in snippet | yes | candidate — confirm which building is the main one |
| Profile — Ivano-Frankivsk | Commons "Ivano-Frankivsk National Medical University.jpg" (Category:2 Halytska Street) | not in snippet | not in snippet | yes | candidate |
| Profile — Lviv | Commons Category:52 Pekarska Street, Lviv — **the category snippet ties the address to the veterinary university; identity must be confirmed** | — | — | uncertain | hold |
| Profile — Odesa, Poltava | no building photograph surfaced (Odesa: logo SVG only, CC BY-SA 4.0 — trademark restrictions; not usable as imagery) | — | — | — | open Commons categories when reachable |

**Before any of these is used:** open the page; record exact licence tag, author string, upload date, modifications; keep a screenshot of the licence; for Commons files check personality-rights and freedom-of-panorama templates; CC BY-SA requires attribution and share-alike on the image (acceptable for a photograph displayed with its credit). Pexels items need no attribution but we will still credit the photographer. Nothing generated is proposed for institution profiles.
