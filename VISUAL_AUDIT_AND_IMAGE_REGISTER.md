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

## 9. Licensing requirements by source (2026-10-11) and the generated-imagery policy

| Source | Licence (as published by the source; to be re-read on the asset page at download time) | Our obligations | Suitable for |
|---|---|---|---|
| Pexels | Pexels License: free for commercial use, no attribution required, no selling unaltered copies, no implying endorsement by depicted people/brands | credit the photographer anyway in §8's record; avoid images where identifiable people could be read as endorsing a university; keep the download record | V1, V5, V10 generic settings |
| Unsplash (free items only) | Unsplash License: free for commercial use, no permission needed, attribution appreciated; **Unsplash+ items are paid and excluded** | check `isAccessibleForFree`/licence label per photo; credit photographer | as above |
| Pixabay | Pixabay Content License: free commercial use with restrictions on standalone sale and on identifiable people/trademarks | per-item check | as above |
| Wikimedia Commons | per file — typically CC BY-SA 3.0/4.0 (attribution + share-alike), sometimes CC BY or public domain; freedom-of-panorama and personality-rights templates may apply | reproduce the credit line and licence link next to the image; share-alike applies to the image, not the site; confirm the depicted building is the institution claimed | university profile pages only (named institutions) |
| Own SVG illustrations | ours | none | V2, V6, V7, V11 |
| Generated imagery (if the owner has a tool) | the tool's commercial-use terms (to be read) | caption/alt "Illustrative image"; never a named institution, never presented as students or facilities of any university; no logos, flags or recognisable landmarks | V1/V5 fallbacks only |

Rule restated: no image is published without a row in §8 holding its source URL, licence text, author, download date and modifications; no image may imply a named institution unless it is that institution's own, correctly identified, licensed photograph on its own profile page.

## 10. Visual register implemented 2026-10-11 (profiles and directory; no images downloaded, nothing purchased)

What changed in the build (branch `claude/university-profile-pipeline`, preview-only for drafts):

| Element | Implementation | Image needed? |
|---|---|---|
| Directory cards (`UniversityCard`) | CSS gradient tile with the university's initials and city, hue derived from the city name; chips for programme families, levels, languages (marked "pending" until verified), preparatory route; status badge | No — tiles replace photographs until licensed images exist |
| Profile header (`ProfileHeader`) | Dark band with an initials tile, status/teaching chips, counts of verified programmes, last-review date, pending banner | No |
| At-a-glance block, programme cards, requirement/document lists, preparatory-route card, comparison table | Typography, badges and the existing colour tokens; underlined in-text links (axe `link-in-text-block` clean); scrollable comparison region is keyboard-focusable and labelled | No |
| Draft banner / verification queue | High-contrast brown band and dashed yellow box so a draft can never be mistaken for a published page | No |

Image sourcing status: the §8 Pexels candidates (library/study groups for V1; skeleton and dental models for V5) remain **unopened** — image hosts are blocked by the network policy and nothing may be downloaded or purchased from this environment. When the owner downloads a candidate, the §8 row is completed (licence text as shown on the page, author, download date, modifications) and the file is added through the Astro image pipeline (TECHNICAL_REPAIR_BACKLOG N5) with alt text and dimensions (checked by `check-meta`). No image may depict or imply a named institution without that institution's own licence (§9).


## 11. In-repo SVG illustration set and honest feature claims (implemented 2026-10-11, branch `wip/visual`)

No photograph, download or purchase. Every asset below is hand-written inline SVG in the brand tokens (navy, blue, one small yellow accent), stored as Astro components in `site/src/components/illustrations/` (or inline where noted). None depicts an institution, building, landmark, flag, logo, person or "doctor" cliché, and none uses a cross or crescent of any kind (the red cross and red crescent emblems are legally protected). There is no raster image, so no `<img>`, no licence file and no `alt` attribute are involved. Where text matters it is real HTML, not SVG text, so it stays legible at 390 px and is read by screen readers and translation tools. This covers rows V2 and V6 of §4 and the course-family icons; V1, V5 and V10 still wait for licensed photographs (§8).

### 11.1 Register (one row per illustration or icon)

Source for every row: **own SVG, drawn in-repo 2026-10-11**. Licence for every row: **ours**. "Checks" refers to §11.3.

| # | File | What it depicts | Where used | Accessible text | Checks |
|---|---|---|---|---|---|
| S1 | `illustrations/HeroIllustration.astro` | Calm abstract composition: two layered document sheets with a three-row checklist (two rows ticked, one open), a small note card, a compass with a 12-dot dial and a needle with a small yellow tip, a dotted route ending in a tick in a circle, a soft radial halo | Home hero, behind the "Start your application" card, shown from 1080 px wide only (hidden on phones and tablets so the form stays prominent and mobile stays uncluttered) | Decorative: `aria-hidden="true"`, `focusable="false"` on the SVG and its wrapper; the hero text carries the meaning | C1–C5 |
| S2 | `illustrations/ApplicationJourney.astro` | The four stages of `APPLICATION_SYSTEM_SPEC.md` §1 (Enquiry; Draft application; Submitted to Ukraine Medical Admissions; Official submission to the university) as numbered icon tiles joined by dashed connectors and chevrons. Horizontal when its container is at least 760 px wide, vertical stepper otherwise (CSS container query). Each stage carries a status tag: **Open now** (stage 1) or **Planned** (stages 2 to 4) | Home "How it works" (short wording); `/admissions/#stages` (detailed wording, wider than the reading column) | Real HTML `<ol aria-label="The four stages of an application">`, one `<h3>` per stage, visible "Stage n" and status text; tiles, numbers and connectors are `aria-hidden` | C1–C5 |
| S3 | `illustrations/DocumentStates.astro` | Compact state diagram of the checklist: required → outstanding → uploaded → under review → accepted for processing, or clarification requested (upload again) | `/admissions/#checklist` | `<figure>` named by its visible caption "How the checklist will work once uploads open" plus the tag "Planned. Uploads are not available yet."; states are an ordered list with visible names and one-line meanings; icons and arrows are `aria-hidden` | C1–C5 |
| S4 | `illustrations/Icon.astro` → `medicine` | Stethoscope outline | Home course card, `/courses/` card, `/courses/medicine/` header tile | `aria-hidden`; the card heading or H1 names the course | C1–C4 |
| S5 | `Icon.astro` → `dentistry` | Tooth outline | Home, `/courses/`, `/courses/dentistry/` header | as S4 | C1–C4 |
| S6 | `Icon.astro` → `pharmacy` | Capsule and a scored round tablet | Home, `/courses/`, `/courses/pharmacy/` header | as S4 | C1–C4 |
| S7 | `Icon.astro` → `nursing` | Heart above cupped hands (care) | Home, `/courses/`, `/courses/nursing/` header | as S4 | C1–C4 |
| S8 | `Icon.astro` → `dated` | Calendar with a tick | Home "Why students use us": "Official sources, dated" (replaces the text glyph ✓) | `aria-hidden`; card heading gives the meaning | C1–C4 |
| S9 | `Icon.astro` → `compare` | Two-column table | Home card "Compare side by side" (replaces ⇄) | as S8 | C1–C4 |
| S10 | `Icon.astro` → `journey` | Route between two points | Home card "One application journey" (replaces ◎) | as S8 | C1–C4 |
| S11 | `Icon.astro` → `enquiry` | Envelope | S2, stage 1 | `aria-hidden`; stage title is text | C1–C4 |
| S12 | `Icon.astro` → `draft` | Document with a pencil | S2, stage 2 | as S11 | C1–C4 |
| S13 | `Icon.astro` → `submitted` | Tray with an incoming arrow | S2, stage 3 | as S11 | C1–C4 |
| S14 | `Icon.astro` → `official` | Paper plane (sent onwards); deliberately not a building | S2, stage 4 | as S11 | C1–C4 |
| S15 | `Icon.astro` → `required` | Bulleted list | S3 | `aria-hidden`; state name is text | C1–C4 |
| S16 | `Icon.astro` → `outstanding` | Clock | S3 | as S15 | C1–C4 |
| S17 | `Icon.astro` → `uploaded` | Arrow up out of a tray | S3 | as S15 | C1–C4 |
| S18 | `Icon.astro` → `review` | Magnifier | S3 | as S15 | C1–C4 |
| S19 | `Icon.astro` → `accepted` | Tick in a circle | S3 | as S15 | C1–C4 |
| S20 | `Icon.astro` → `clarify` | Speech bubble with a question mark | S3 | as S15 | C1–C4 |
| S21 | inline in `components/CtaBand.astro` | Three arcs from the top-right corner (one dotted) and one small yellow dot | Every page that uses the CTA band | `aria-hidden`, `focusable="false"` | C1–C4 |

Icon grid: 24 × 24, 1.75 px round stroke, `currentColor`, so each icon takes its tile's colour (blue on blue-50; white on blue-600 on hover or keyboard focus of a link card; blue-100 on the dark course header). The SVG sources live in the components; a separate copy under `brand/illustrations/` (§3) has not been made, to avoid two sources drifting apart.

### 11.2 Honest feature claims on these pages (blocking defects fixed)

| Location | Before | After | Why |
|---|---|---|---|
| Home hero form small print | "Save and resume anytime. No fee to start. We never share your documents without consent." | "No fee to start. Nothing is sent to a university until you confirm. Please do not send document scans at this stage." | Save-and-resume does not exist; Stage 1 collects no documents |
| `CtaBand` default text (home, `/courses/`, `/admissions/`, `/about/`, `/services/`, `/faq/`) | "Start your application in minutes. You can save your progress and come back at any time." | "Start with a short online enquiry. It costs nothing, and nothing is sent to a university until you confirm." | Save-and-resume does not exist |
| Home "How it works" | Choose / Apply online ("save and resume at any time") / Documents ("Upload securely") / Track ("Follow every status change"); H2 "From enquiry to enrolment, step by step" | S2 with the four real stages and their status (stage 1 open now, 2 to 4 planned); H2 "From enquiry to official submission" | Uploads, save-and-resume and status tracking are not built; the service's stages end at official submission, the decision is the university's |
| Home course blurbs | "Six-year programmes leading to a medical degree." / "Five-year dental programmes." / "Bachelor-level nursing routes." / "Pharmacy degrees for international students." | One-line `summary` per course from `lib/courses.ts` (each says the detail is set per university and listed only once checked) | Durations and award levels are programme-specific and unverified; consistent with the eligibility FAQ |
| Home card "Verified university data" | "Every fee, deadline and programme is checked against official university sources…" | "Official sources, dated": "We publish a fee, deadline or programme detail only after checking it against the university's official source, and we show the date we checked it. Anything not yet checked is marked as awaiting confirmation." | Zero records are verified today; stated as the publication rule |
| Home card "Compare side by side" | "Tuition, language of instruction, duration and entry requirements in one directory." | "As profiles pass verification, their programmes, languages, entry requirements, tuition and application windows appear side by side in one comparison table." | No profile is published yet; the comparison table (`CompareTable.astro`) has no duration column |
| Home card "One application journey" and hero trust line | "A clear document checklist and status updates from your first enquiry to the university's decision"; "One application journey from enquiry to decision" | "Four clear stages, from your first enquiry to official submission… A document checklist and status updates are planned."; "Four clear stages from enquiry to official submission" | Checklist and status updates are not built |
| `lib/courses.ts` intros (course pages; first sentence was also the `/courses/` card text) | "Medicine is the most sought-after programme…"; "typically six years"; "Dentistry programmes in Ukraine are typically five years."; "Pharmacy programmes are usually five years." | Each university sets its own duration and qualification title; cards use the new `summary` field | Unsourced ranking and unverified durations removed |
| `/courses/<course>/` "Not sure whether you qualify yet?" and CTA band | "Start a free candidate profile… you can finish later"; "we will confirm the current requirements with you" | A short free enquiry now; the readiness check is described as planned; CTA: "Start with a short online enquiry… Nothing is sent to a university until you confirm." | Candidate profiles and save-and-resume do not exist; no requirement is verified |
| `/admissions/#stages` | Stage 2 "complete our online application and upload documents at your own pace"; stage 3 "advise on eligibility" | S2 (detailed): stage 2 not open yet, drafts, saving and uploads planned; stage 3 "We review it and ask for anything missing" (spec §1 wording) | Uploads and online drafts do not exist; the readiness rules forbid eligibility verdicts |
| `/admissions/#readiness` | Present tense ("When you start a candidate profile… the check shows…") | Heading "…How the readiness check will work", a note that profiles and the check are planned, future tense throughout | Not built (spec §8 is PROPOSED) |
| `/admissions/#preparatory` | "usually a year of Ukrainian (sometimes English) language and science subjects, ending in a certificate" | "Some Ukrainian universities publish a preparatory (foundation) course… Each university sets its own duration, subjects, language of instruction and fee…" | Unverified generalised duration removed |
| `/admissions/#checklist` | "How your document checklist works"; note "At this stage we only ask which documents you already have and which you still need" | "…will work", S3 labelled as planned; note: no scans by e-mail, use the message box of the Apply Online form | The Stage 1 form has no have/need document field |

Unchanged by design: every H1, page title and meta description (none states something false). The home hero paragraph was left as the 2026-10-11 strategic review set it.

### 11.3 Checks run (VERIFIED-IN-REPO, local runs on 2026-10-11 in `/home/user/wt/visual/site`)

- **C1** `node tests/a11y.mjs`: 20 pages × 2 widths, 0 blocking, 0 minor violations. `node tests/preview-ui.mjs`: 10 pages × 3 widths, 0 failures, 0 blocking a11y violations.
- **C2** `node tests/ui-smoke.mjs`: 20 pages × 390/820/1440 px, 0 failures (includes the horizontal-overflow check).
- **C3** Keyboard and motion (scratch Playwright script, not committed): Tab reaches all seven link cards on the home page in reading order; the focused card shows the yellow link outline plus a blue border ring; with `prefers-reduced-motion: reduce` the card transition duration computes to 0.01 ms and the hover lift is removed.
- **C4** Screenshots inspected by eye at 390, 820 and 1440 px (and the hero at 960 and 1100 px), see §11.4.
- **C5** `node tests/perf.mjs` (Lighthouse, mobile emulation), final run: `/` perf 99, total 187 KB; `/universities/` 99; `/tuition-fees/` 99; `/apply/` 99 (100 in an earlier run the same day); 0 below budget. Baseline for comparison, built from `50376e3` in a scratch copy and measured with the same script: `/` perf 99, total 167 KB. The home page grew by about 20 KB uncompressed (inline SVG and component CSS); LCP and CLS stay inside the budget.
- Also run: `npx astro check` 0 errors; `npm run test:records`; `check-links`, `check-meta`, `check-redirects`; `npm run build:preview` + `publication-gate` (0 failures); full `npm test` chain exit 0. Exact final lines are in the branch's report to the orchestrator.

### 11.4 Screenshots (in `site/tests/output/`, which `site/.gitignore` excludes; not committed)

Before (baseline `50376e3`) and after, at 390, 820 and 1440 px, for the home page, `/admissions/`, `/courses/` and `/courses/medicine/`:

- `before-390_home.png`, `before-820_home.png`, `before-1440_home.png`, and the same pattern for `_admissions`, `_courses`, `_courses_medicine` (12 files)
- `after-390_home.png`, `after-820_home.png`, `after-1440_home.png`, and the same pattern for `_admissions`, `_courses`, `_courses_medicine` (12 files)
- `after-960_home-hero.png`, `after-1100_home-hero.png` (hero composition at the breakpoint), `after-focus-card-1440.png`, `after-hover-card-1440.png`

### 11.5 Design-system changes (`site/src/styles/global.css`)

Icon tiles (`.ico`, 48 px, SVG sized at 26 px); link cards (`.card-link`: whole card is the target of its single link, lift and shadow on hover, blue ring on keyboard focus); `.section-head` for a consistent gap under every section heading; hero radial highlight with `overflow: hidden`; breadcrumbs keep the `.wrap` side gutters (they previously lost them, so the trail sat flush with the screen edge at 390 px and out of line with the page at 1440 px); the CTA band no longer doubles the white gap after a white section; a global `prefers-reduced-motion` rule. No new fonts, no external resources, no inline scripts or event handlers (the CSP is unchanged).
