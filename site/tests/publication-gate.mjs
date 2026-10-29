// Publication-gate test over BOTH builds of the REAL records:
//   dist/          production build  — unpublished records and samples must be entirely absent
//   dist-preview/  PREVIEW_UNPUBLISHED=1 build — drafts render as noindex, bare (no canonical / JSON-LD / sitemap), banner-marked,
//                  with the publication policy's failures in the verification queue
// "Published" is decided exactly as the build decides it (src/lib/publication.mjs): verification.publishable AND the
// publication policy passes against the record's evidence file (data/evidence/<slug>.json).
// Research previews (N25, 2026-10-12): an unpublished record that opts in (verification.researchPreview) and passes
// researchPreviewCheck is listed in production as a labelled research preview with a noindex page built from its
// projection. For those records this test proves the page is labelled, noindex, free of structured data and absent from
// the sitemap, and that NOTHING from the record except its slug, its short name and the claims the policy shows reaches
// any production file (notes, research references and their hosts, unverified values, overview, region, alternative
// names, failure messages). Every other unpublished record must stay entirely absent, as before.
// Fails on any leak. Run after `npm run build` and `npm run build:preview`. Fixture builds: tests/publication-build.mjs.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { DISCLAIMER } from '../src/lib/readiness.mjs';
import { SYNTHETIC_MARKERS } from '../src/lib/synthetic-candidate.mjs';
import { record as recordSchema } from '../src/content/schema.mjs';
import { loadEvidence } from '../src/lib/evidence.mjs';
import { publicationDecision } from '../src/lib/publication.mjs';

const DIST = resolve('dist'), PREV = resolve('dist-preview');
const SITE = 'https://ukrainemedicaladmissions.com';
let failures = 0, checks = 0;
const fail = (m) => { console.log('FAIL', m); failures++; };
const ok = () => { checks++; };

const load = (dir) => readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')));
const real = load(resolve('src/content/universities'));
const samples = load(resolve('src/content/samples'));
const NOW = new Date();
const decision = new Map(real.map((r) => [r.slug, publicationDecision(recordSchema.parse(r), loadEvidence(r.slug), { now: NOW, preview: false })]));
const isPublished = (r) => decision.get(r.slug).published;
const unpublished = real.filter((r) => !isPublished(r));
const published = real.filter(isPublished);
const isPreview = (r) => decision.get(r.slug).researchPreview === true;
const previewed = unpublished.filter(isPreview);
const hidden = unpublished.filter((r) => !isPreview(r));
// Every note string in a record (claims, items, routes, references): internal, never on a public page.
function notesOf(obj, out = []) {
  if (Array.isArray(obj)) obj.forEach((x) => notesOf(x, out));
  else if (obj && typeof obj === 'object') for (const [k, v] of Object.entries(obj)) { if (k === 'note' && typeof v === 'string' && v.trim().length > 12) out.push(v); else notesOf(v, out); }
  return out;
}

function htmlFiles(root) {
  const out = [];
  (function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && out.push(p); } })(root);
  return out;
}
const escapeHtml = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const ldBlocks = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);

// ---------------------------------------------------------------- production
if (!existsSync(DIST)) { console.log('dist/ missing — run npm run build first'); process.exit(1); }
const prodHtml = htmlFiles(DIST).map((p) => ({ p: p.replace(DIST, ''), h: readFileSync(p, 'utf8') }));
const htaccess = readFileSync(resolve('public/.htaccess'), 'utf8');
// Profile URLs that were live BEFORE the publication gate (HOSTING_AND_DEPLOYMENT_ASSESSMENT.md §13): while such a record is
// unpublished its URL must be redirected (302) to the directory, never 404; once publishable the rule must be removed.
const LIVE_BEFORE_GATE = ['ternopil-national-medical-university'];
for (const slug of LIVE_BEFORE_GATE) {
  const rec = real.find((r) => r.slug === slug);
  const rule = new RegExp(`^RedirectMatch\\s+302\\s+\\^/universities/${slug}/\\?\\$\\s+/universities/\\s*$`, 'm');
  const anyRule = new RegExp(`^Redirect(Match)?\\s+.*${slug}`, 'm');
  if (!rec) fail(`LIVE_BEFORE_GATE slug ${slug} has no record`);
  else if (!isPublished(rec) && !isPreview(rec) && !rule.test(htaccess)) fail(`.htaccess: unpublished ${slug} (live before the gate, not a research preview) needs "RedirectMatch 302 ^/universities/${slug}/?$ /universities/"`);
  else if ((isPublished(rec) || isPreview(rec)) && anyRule.test(htaccess)) fail(`.htaccess: ${slug} has a page (${isPublished(rec) ? 'published' : 'research preview'}) — remove its redirect rule so the page is served`);
  ok();
}
const sitemap = existsSync(join(DIST, 'sitemap-0.xml')) ? readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8') : '';
if (!sitemap) fail('production sitemap-0.xml missing');
if (existsSync(join(DIST, 'preview'))) fail('production build contains /preview/'); ok();

for (const r of hidden) {
  const dir = join(DIST, 'universities', r.slug);
  if (existsSync(dir)) fail(`production build contains a page for unpublished record ${r.slug}`); ok();
  if (sitemap.includes(`/universities/${r.slug}/`)) fail(`sitemap lists unpublished record ${r.slug}`); ok();
  for (const { p, h } of prodHtml) {
    if (h.includes(`/universities/${r.slug}/`)) fail(`${p}: links to unpublished profile ${r.slug}`);
    if (h.includes(r.slug)) fail(`${p}: mentions unpublished slug ${r.slug} (form selects are gated too)`);
    for (const ld of ldBlocks(h)) if (r.officialName.value && ld.includes(r.officialName.value)) fail(`${p}: JSON-LD names unpublished record ${r.slug}`);
    ok();
  }
}
// ---- research previews (N25)
const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return null; } };
// Short names of every listed university (published or research preview), longest first, as text and HTML-escaped.
const listedNames = [...published, ...previewed].map((x) => x.shortName).filter((x) => typeof x === 'string' && x.length >= 6).sort((a, b) => b.length - a.length);
const withoutListedNames = (t) => listedNames.reduce((acc, n) => acc.split(n).join(' ').split(escapeHtml(n)).join(' '), t);
const prodText = (() => { const out = []; (function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : /\.(html|xml|txt|js|css|json|webmanifest)$/.test(f) && out.push({ p: p.replace(DIST, ''), h: readFileSync(p, 'utf8') }); } })(DIST); return out; })();
const dirPage = prodHtml.find((x) => x.p === '/universities/index.html');
const appliesPage = prodHtml.find((x) => x.p === '/apply/index.html')?.h ?? '';
const shownCount = (d) => ['officialName', 'website', 'address', 'status', 'statusStatement', 'teachingFormat', 'founded', 'internationalOffice', 'accreditation', 'recognition', 'accommodation'].filter((k) => d?.[k]?.show === true).length + (d?.programmes?.length ?? 0);
// (g) 2026-10-25: the pages and hosts every preview's REPORTED website cites (listings, registers, the university's own
// host) legitimately appear on the citing profile pages, so they are not treated as leaked research references of
// another record. Each record's own unverified website host is still confined to its own profile page (below).
const reportedSourceUrls = new Set(previewed.flatMap((x) => decision.get(x.slug).previewRecord?.reported?.website?.sources?.map((y) => y.url) ?? []));
const reportedHosts = new Set(previewed.flatMap((x) => { const w = decision.get(x.slug).previewRecord?.reported?.website; return w ? [w.host, ...w.sources.map((y) => hostOf(y.url))] : []; }));
for (const r of previewed) {
  const dec = decision.get(r.slug);
  const pr = dec.previewRecord;
  const file = join(DIST, 'universities', r.slug, 'index.html');
  if (!existsSync(file)) { fail(`research preview ${r.slug} has no production page`); continue; }
  const h = readFileSync(file, 'utf8');
  if (!h.includes('data-research-preview')) fail(`preview ${r.slug}: research-preview marker missing`);
  if (!/<meta name="robots" content="noindex, follow"/.test(h)) fail(`preview ${r.slug}: not "noindex, follow"`);
  if (ldBlocks(h).length) fail(`preview ${r.slug}: structured data on a research-preview page`);
  if (h.includes('data-draft-banner') || h.includes('data-publication-failures')) fail(`preview ${r.slug}: draft banner or verification queue in production`);
  if (!h.includes('Research preview') || !h.includes('Not yet verified')) fail(`preview ${r.slug}: the "Research preview" / "Not yet verified" labels are missing`);
  if (!h.includes(`/apply/?university=${r.slug}`)) fail(`preview ${r.slug}: no application route with the university preselected`);
  if (!h.includes('does not claim any partnership')) fail(`preview ${r.slug}: the no-partnership statement is missing`);
  const verifiedBadges = (h.match(/badge-verified">Verified</g) ?? []).length;
  if (shownCount(pr) === 0 && verifiedBadges) fail(`preview ${r.slug}: ${verifiedBadges} "Verified" badge(s) although the policy shows no claim`);
  if (sitemap.includes(`/universities/${r.slug}/`)) fail(`sitemap lists research preview ${r.slug}`);
  ok();
  // Nothing from the record beyond slug, short name and SHOWN claims may reach any production file.
  const shownValues = new Set(Object.values(pr).filter((v) => v && typeof v === 'object' && v.show === true).flatMap((v) => [v.value, v.source]).filter((x) => typeof x === 'string'));
  // (g) 2026-10-25: the REPORTED leads (pr.reported) may appear, labelled, on the preview's own page and (city, type,
  // programme areas only) on the directory, home and apply pages; the website address and its sources only on the
  // profile page. Everything else from the record is still forbidden everywhere.
  const rep = pr.reported ?? {};
  const profilePath = `/universities/${r.slug}/index.html`;
  const repSourceUrls = new Set((rep.website?.sources ?? []).map((x) => x.url));
  const forbidden = [];
  const add = (label, v, allowedIn = null) => { if (typeof v === 'string' && v.trim().length >= 4 && !r.shortName.includes(v) && !shownValues.has(v)) forbidden.push([label, v, allowedIn]); };
  for (const n of notesOf(r)) add('internal note', n);
  // Reference labels are generic ("Tuition fee"); their addresses and hosts are what must never appear, except the
  // sources the reported website cites (profile page only).
  const hostCited = (h) => !!h && [...reportedHosts].some((x) => x === h || x.endsWith(`.${h}`));
  for (const ref of r.researchReferences ?? []) { if (!repSourceUrls.has(ref.url) && !reportedSourceUrls.has(ref.url) && ref.url !== rep.website?.value) add('research reference', ref.url); if (hostOf(ref.url) !== rep.website?.host && !hostCited(hostOf(ref.url))) add('research reference host', hostOf(ref.url)); }
  for (const k of ['officialName', 'address', 'statusStatement']) { const c = r[k]; if (c && typeof c.value === 'string' && pr[k]?.show !== true) add(`unverified ${k}`, c.value); }
  if (r.website?.value && pr.website?.show !== true) { add('unverified website', r.website.value, rep.website ? profilePath : null); add('unverified website host', hostOf(r.website.value), rep.website ? profilePath : null); }
  if (rep.website) {
    const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const profileHtml = readFileSync(join(DIST, 'universities', r.slug, 'index.html'), 'utf8');
    if (!new RegExp(`<a href="${esc(rep.website.value)}"[^>]*rel="nofollow noopener noreferrer"[^>]*>${esc(rep.website.host)}</a>`).test(profileHtml)) fail(`preview ${r.slug}: reported website not printed as a nofollow link under its host`);
    if (r.website?.status === 'conflicting') fail(`preview ${r.slug}: a conflicting website is reported`);
    // Pages of a website that is not verified are never called official (audit 2026-10-28).
    if (pr.website?.show !== true && /\bOfficial page\b/.test(profileHtml)) fail(`preview ${r.slug}: a page of the unverified website is labelled "Official page"`);
  }
  // A city that is its own region (Kyiv) is printed once.
  if (rep.city && rep.region === rep.city && readFileSync(join(DIST, 'universities', r.slug, 'index.html'), 'utf8').includes(`${rep.city}, ${rep.region}`)) fail(`preview ${r.slug}: location printed as "${rep.city}, ${rep.region}"`);
  const office = r.internationalOffice?.value;
  if (office && pr.internationalOffice?.show !== true) { add('unverified office email', office.email); add('unverified office phone', office.phone); add('unverified office url', office.url); add('unverified office host', hostOf(office.url), rep.website && hostOf(office.url) === rep.website.host ? profilePath : null); }
  if (pr.overview === undefined) add('withheld overview', r.overview);
  if (pr.editorialWithheld?.city && !rep.city) add('withheld city', r.city);
  if (typeof r.verification.reviewer === 'string') add('reviewer', r.verification.reviewer);
  const evRaw = existsSync(join('data', 'evidence', `${r.slug}.json`)) ? JSON.parse(readFileSync(join('data', 'evidence', `${r.slug}.json`), 'utf8')) : null;
  if (evRaw?.access?.note) add('evidence access note', evRaw.access.note);
  for (const en of evRaw?.entries ?? []) { add('evidence quotation', en.quotation); add('evidence statement', en.statement); if (en.decision !== 'publish' || en.status !== 'verified') add('withheld evidence source', en.sourceUrl); }
  // Deferred programme and route names (names of 12+ characters: short generic words such as "Dentistry" occur in our own copy).
  for (const dp of r.deferredProgrammes ?? []) if (typeof dp.name === 'string' && dp.name.length >= 12) add('deferred programme name', dp.name);
  // Unverified money, as any page would format it ("4,500 USD").
  for (const prog of [...(r.programmes ?? []), ...(r.deferredProgrammes ?? [])]) { const m = prog.tuition?.value; if (m && typeof m.amount === 'number' && prog.tuition.status !== 'verified') add('unverified fee', `${m.amount.toLocaleString('en-GB')} ${m.currency}`); }
  if (pr.region === undefined && !rep.region) add('withheld region', r.region);
  for (const a of r.alternativeNames ?? []) add('alternative name', a);
  for (const q of r.verification.openQuestions ?? []) add('open question', q);
  for (const f of dec.failures) add('publication failure message', f.message);
  // A listed university's displayed name may contain another record's withheld city ("Kyiv" in "Taras Shevchenko National
  // University of Kyiv"); that name is public by design, so occurrences inside listed names are removed before searching.
  // Anything outside a listed name still fails (proved below with a planted sentence).
  // A host name is matched as a whole host: "kmu.edu.ua" is not found inside "dimh.kmu.edu.ua" (another record's own
  // domain, reported on its own page), but is found in "kmu.edu.ua/en/" or on its own.
  const hostHit = (text, h) => new RegExp(`(^|[^A-Za-z0-9.-])${h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![A-Za-z0-9-])`).test(text);
  for (const { p, h: text } of prodText) {
    const rest = withoutListedNames(text);
    for (const [label, v, allowedIn] of forbidden) {
      if (p === allowedIn) continue;
      // A web address is matched as a whole address too: "https://x.example/en/" is not found inside the cited source
      // "https://x.example/en/admission/" but is found when printed on its own or as an href value.
      const hit = / host$/.test(label) ? hostHit(rest, v) : /^https?:\/\//.test(v) ? [v, escapeHtml(v)].some((u) => new RegExp(`${u.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![A-Za-z0-9/._~%?#=&-])`).test(rest)) : rest.includes(v) || rest.includes(escapeHtml(v));
      if (hit) fail(`${p}: ${label} of research preview ${r.slug} leaked: "${v.slice(0, 70)}"`);
    }
  }
  ok();
  for (const { p, h: html } of prodHtml) for (const ld of ldBlocks(html)) if (ld.includes(r.shortName) || (r.officialName.value && pr.officialName?.show !== true && ld.includes(r.officialName.value))) fail(`${p}: JSON-LD names research preview ${r.slug}`);
  ok();
  if (dirPage && (!dirPage.h.includes(`/universities/${r.slug}/`) || !new RegExp(`<article[^>]*data-slug="${r.slug}"[^>]*data-status="preview"`).test(dirPage.h))) fail(`/universities/: research preview ${r.slug} not listed as a preview card`);
  if (!new RegExp(`<option value="${r.slug}"[^>]*>[^<]*\\(not yet verified\\)</option>`).test(appliesPage)) fail(`/apply/: research preview ${r.slug} not offered, labelled "not yet verified"`);
  ok();
}
// Profile URL architecture (owner brief 2026-10-26): every real record has one unique, safe slug; every listed record
// (published or research preview) has a page at /universities/<slug>/ whose canonical is exactly that URL; the
// directory links each card to its own profile; the sitemap lists exactly the PUBLISHED profiles (a preview is noindex
// and never listed, and no profile URL is listed twice).
{
  const slugs = real.map((r) => r.slug);
  if (new Set(slugs).size !== slugs.length) fail(`profile URLs: duplicate slugs ${slugs.filter((x, i) => slugs.indexOf(x) !== i).join(', ')}`);
  for (const sl of slugs) if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(sl) || sl.length > 80) fail(`profile URLs: unsafe slug "${sl}"`);
  const smProfiles = [...sitemap.matchAll(/<loc>https:\/\/ukrainemedicaladmissions\.com\/universities\/([^/<]+)\/<\/loc>/g)].map((m) => m[1]);
  if (new Set(smProfiles).size !== smProfiles.length) fail('profile URLs: a profile is listed twice in the sitemap');
  const publishedSlugs = published.map((x) => x.slug).sort();
  if (JSON.stringify([...smProfiles].sort()) !== JSON.stringify(publishedSlugs)) fail(`profile URLs: sitemap profiles [${smProfiles.join(', ')}] differ from published profiles [${publishedSlugs.join(', ')}]`);
  for (const r of [...published, ...previewed]) {
    const f = join(DIST, 'universities', r.slug, 'index.html');
    if (!existsSync(f)) { fail(`profile URLs: ${r.slug} has no page`); continue; }
    const can = /<link rel="canonical" href="([^"]+)"/.exec(readFileSync(f, 'utf8'))?.[1];
    if (can !== `https://ukrainemedicaladmissions.com/universities/${r.slug}/`) fail(`profile URLs: ${r.slug} canonical is ${can ?? 'missing'}`);
    if (dirPage && !new RegExp(`<article class="[^"]*"[^>]*data-slug="${r.slug}"[\\s\\S]*?href="/universities/${r.slug}/"[\\s\\S]*?</article>`).test(dirPage.h)) fail(`profile URLs: the directory card for ${r.slug} does not link to its own profile`);
  }
  ok();
}
// Control for the listed-name exemption: a withheld city in an ordinary sentence is still found, and only inside a name is not.
{
  const longNamed = previewed.find((x) => listedNames.some((n) => n !== x.shortName && typeof x.city === 'string' && x.city.length >= 4 && n.includes(x.city)));
  if (longNamed) {
    const city = longNamed.city;
    const host = listedNames.find((n) => n !== longNamed.shortName && n.includes(city));
    if (!withoutListedNames(`Study at ${host}.`).includes(city) && withoutListedNames(`Our office is in ${city}.`).includes(city)) ok();
    else fail(`listed-name exemption control: "${city}" handled wrongly (inside "${host}" or in a plain sentence)`);
  }
}
// Every built profile page is a published profile or a research preview; a hidden record's short name appears nowhere.
for (const d of existsSync(join(DIST, 'universities')) ? readdirSync(join(DIST, 'universities')).filter((x) => existsSync(join(DIST, 'universities', x, 'index.html'))) : []) {
  if (!published.some((r) => r.slug === d) && !previewed.some((r) => r.slug === d)) fail(`production build has /universities/${d}/, which is neither a published profile nor a research preview`);
}
for (const r of hidden) for (const { p, h } of prodHtml) if (r.shortName.length >= 6 && h.includes(r.shortName)) fail(`${p}: names hidden (unpublished, not previewed) record ${r.slug}`);
ok();
// Pages that list verified data must never list a preview: fees, courses, comparison table.
for (const { p, h } of prodHtml.filter((x) => /^\/(tuition-fees|courses)\//.test(x.p))) for (const r of previewed) if (h.includes(`/universities/${r.slug}/`)) fail(`${p}: lists research preview ${r.slug}`);
if (dirPage) for (const r of previewed) if (new RegExp(`<th scope="row"[^>]*><a href="/universities/${r.slug}/`).test(dirPage.h)) fail(`/universities/: research preview ${r.slug} in the comparison table`);
ok();

for (const s of samples) {
  for (const { p, h } of prodHtml) if (h.includes(s.slug) || h.includes(s.shortName)) fail(`${p}: production build mentions synthetic sample ${s.slug}`);
  ok();
}
for (const r of published) {
  if (!existsSync(join(DIST, 'universities', r.slug, 'index.html'))) fail(`published record ${r.slug} has no page`);
  const page = existsSync(join(DIST, 'universities', r.slug, 'index.html')) ? readFileSync(join(DIST, 'universities', r.slug, 'index.html'), 'utf8') : '';
  for (const p of r.deferredProgrammes ?? []) if (page.includes(p.name)) fail(`published ${r.slug}: deferred programme "${p.name}" rendered publicly`);
  if (!sitemap.includes(`/universities/${r.slug}/`)) fail(`published record ${r.slug} missing from sitemap`);
  // Internal notes and research references never reach any production page.
  for (const n of notesOf(r)) for (const { p, h } of prodHtml) if (h.includes(n) || h.includes(n.replace(/&/g, '&amp;'))) fail(`${p}: internal note of ${r.slug} rendered: "${n.slice(0, 60)}…"`);
  for (const ref of r.researchReferences ?? []) for (const { p, h } of prodHtml) if (h.includes(ref.url) || h.includes(ref.url.replace(/&/g, '&amp;'))) fail(`${p}: research reference of ${r.slug} rendered`);
  ok();
}
// The verification queue and its failures list exist only in preview builds.
for (const { p, h } of prodHtml) if (h.includes('data-publication-failures') || h.includes('Verification queue')) fail(`${p}: verification queue in a production page`);
ok();
// The directory must not be empty of meaning: with no published records it must show the explicit empty state.
if (!dirPage) fail('production /universities/ missing');
else if (published.length === 0 && !/No university profile has completed verification yet/.test(dirPage.h)) fail('/universities/: empty-state copy missing with zero published records');
ok();
// A production page must never carry the draft banner.
for (const { p, h } of prodHtml) if (h.includes('data-draft-banner')) fail(`${p}: draft banner in production build`);
ok();
// The readiness demo (synthetic candidate + synthetic university) is preview-only: no page, no link, no candidate data.
if (existsSync(join(DIST, 'preview', 'readiness'))) fail('production build contains /preview/readiness/'); ok();
if (sitemap.includes('/preview/')) fail('production sitemap lists a /preview/ URL'); ok();
for (const { p, h } of prodHtml) {
  for (const m of SYNTHETIC_MARKERS) if (h.includes(m)) fail(`${p}: production page contains synthetic-candidate string "${m}"`);
  if (h.includes('/preview/readiness')) fail(`${p}: production page links to the readiness demo`);
  if (h.includes('data-readiness-row') || h.includes('data-checklist-item')) fail(`${p}: production page renders readiness demo markup`);
  ok();
}

// ---------------------------------------------------------------- preview
if (!existsSync(PREV)) { console.log('dist-preview/ missing — run npm run build:preview first'); process.exit(1); }
if (existsSync(join(PREV, 'sitemap-0.xml')) || existsSync(join(PREV, 'sitemap-index.xml'))) fail('preview build emitted a sitemap'); ok();
const robots = readFileSync(join(PREV, 'robots.txt'), 'utf8');
if (/Sitemap:/.test(robots)) fail('preview robots.txt advertises a sitemap'); ok();
// Every page of the preview build lists drafts with unverified values, so every page is noindex (not only the drafts).
for (const p of htmlFiles(PREV)) if (!/<meta name="robots" content="noindex, nofollow"/.test(readFileSync(p, 'utf8'))) fail(`preview build: ${p.slice(PREV.length)} is not noindex, nofollow`);
ok();

function checkDraftPage(path, label, mustContain = []) {
  const file = join(PREV, path, 'index.html');
  if (!existsSync(file)) { fail(`preview: ${label} page missing at /${path}/`); return; }
  const h = readFileSync(file, 'utf8');
  if (!h.includes('data-draft-banner')) fail(`preview /${path}/: draft banner missing`);
  if (!/<meta name="robots" content="noindex, nofollow"/.test(h)) fail(`preview /${path}/: not noindex`);
  if (/<link rel="canonical"/.test(h)) fail(`preview /${path}/: canonical present on a draft page`);
  if (/property="og:url"/.test(h)) fail(`preview /${path}/: og:url present on a draft page`);
  if (/rel="sitemap"/.test(h)) fail(`preview /${path}/: sitemap link present on a draft page`);
  if (ldBlocks(h).length) fail(`preview /${path}/: JSON-LD present on a draft page`);
  if (/badge-verified">Verified</.test(h) && !mustContain.includes('allow-verified')) fail(`preview /${path}/: a real draft shows a "Verified" fact badge`);
  for (const m of mustContain.filter((x) => x !== 'allow-verified')) if (!h.includes(m)) fail(`preview /${path}/: expected "${m}"`);
  // WhatsApp (owner decision 2026-10-29): only the business link, whose message names this page's university.
  for (const m of h.matchAll(/https?:\/\/(?:wa\.me|api\.whatsapp\.com)\/[^"'\s<>]*/gi)) {
    const u = m[0].replace(/&amp;/g, '&');
    const t = /^https:\/\/wa\.me\/380633534065\?text=([^&]+)$/.exec(u);
    if (!t) fail(`preview /${path}/: WhatsApp link other than the business link: ${u}`);
    else if (!decodeURIComponent(t[1]).includes('ukrainemedicaladmissions.com')) fail(`preview /${path}/: WhatsApp message does not name the website`);
  }
  ok();
}
for (const r of unpublished) checkDraftPage(`universities/${r.slug}`, r.slug, ['Draft record — not published', 'Verification queue', r.shortName, 'data-publication-failures', ...decision.get(r.slug).failures.map((f) => escapeHtml(f.message))]);
for (const s of samples) checkDraftPage(`preview/${s.slug}`, s.slug, ['Synthetic sample record', 'allow-verified']);
checkDraftPage('preview', 'preview index', ['Drafts and samples', 'allow-verified', '/preview/readiness/']);
// Readiness demo: banner says both the candidate and the university are invented; disclaimer present; synthetic only.
checkDraftPage('preview/readiness', 'readiness demo', ['allow-verified', 'Synthetic demonstration', 'Both the candidate and the university on this page are invented', DISCLAIMER, 'data-disclaimer', 'data-readiness-row', 'data-checklist-item', 'How this will work for real candidates']);
{
  const file = join(PREV, 'preview', 'readiness', 'index.html');
  const h = existsSync(file) ? readFileSync(file, 'utf8') : '';
  const sample = samples.find((x) => x.slug === 'example-medical-university');
  const reqCount = sample ? sample.programmes.find((p) => p.id === 'medicine').requirements.length : -1;
  const rows = (h.match(/data-readiness-row/g) ?? []).length;
  if (rows !== reqCount) fail(`preview /preview/readiness/: ${rows} readiness rows, sample has ${reqCount} requirements`);
  if (/\b(in)?eligible\b|\bverdict\b|\bscore\b/i.test(h.replace(/<[^>]+>/g, ' '))) fail('preview /preview/readiness/: page text mentions eligibility, a verdict or a score');
  for (const r of real) if (h.includes(`/universities/${r.slug}/`) || (r.officialName.value && h.includes(r.officialName.value))) fail(`preview /preview/readiness/: real record ${r.slug} used in the synthetic demo`);
  if (!h.includes('Example-land')) fail('preview /preview/readiness/: synthetic candidate summary not rendered');
  ok();
}
// Directory in preview lists every draft and carries the preview banner.
const prevDir = readFileSync(join(PREV, 'universities', 'index.html'), 'utf8');
for (const r of unpublished) if (!prevDir.includes(`/universities/${r.slug}/`)) fail(`preview /universities/: draft ${r.slug} not listed`);
if (unpublished.length && !prevDir.includes('data-draft-banner')) fail('preview /universities/: preview banner missing');
for (const s of samples) if (prevDir.includes(s.slug)) fail(`preview /universities/: synthetic sample ${s.slug} mixed into the real directory`);
ok();
// Research references appear only on draft pages in preview, never on a sample or in production (checked above).
for (const r of unpublished) {
  const h = readFileSync(join(PREV, 'universities', r.slug, 'index.html'), 'utf8');
  for (const ref of r.researchReferences) if (!h.includes(ref.url.replace(/&/g, '&amp;')) && !h.includes(ref.url)) fail(`preview ${r.slug}: research reference "${ref.label}" not rendered`);
  ok();
}

console.log(`publication-gate: ${unpublished.length} unpublished (${previewed.length} research previews, ${hidden.length} hidden), ${published.length} published, ${samples.length} samples; ${checks} checks, ${failures} failures`);
process.exit(failures ? 1 : 0);
