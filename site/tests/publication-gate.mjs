// Publication-gate test over BOTH builds of the REAL records:
//   dist/          production build  — unpublished records and samples must be entirely absent
//   dist-preview/  PREVIEW_UNPUBLISHED=1 build — drafts render as noindex, bare (no canonical / JSON-LD / sitemap), banner-marked,
//                  with the publication policy's failures in the verification queue
// "Published" is decided exactly as the build decides it (src/lib/publication.mjs): verification.publishable AND the
// publication policy passes against the record's evidence file (data/evidence/<slug>.json).
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
  else if (!isPublished(rec) && !rule.test(htaccess)) fail(`.htaccess: unpublished ${slug} (live before the gate) needs "RedirectMatch 302 ^/universities/${slug}/?$ /universities/"`);
  else if (isPublished(rec) && anyRule.test(htaccess)) fail(`.htaccess: ${slug} is publishable — remove its redirect rule so the page is served`);
  ok();
}
const sitemap = existsSync(join(DIST, 'sitemap-0.xml')) ? readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8') : '';
if (!sitemap) fail('production sitemap-0.xml missing');
if (existsSync(join(DIST, 'preview'))) fail('production build contains /preview/'); ok();

for (const r of unpublished) {
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
const dirPage = prodHtml.find((x) => x.p === '/universities/index.html');
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
  if (/whatsapp|wa\.me/i.test(h)) fail(`preview /${path}/: WhatsApp reference`);
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

console.log(`publication-gate: ${unpublished.length} unpublished, ${published.length} published, ${samples.length} samples; ${checks} checks, ${failures} failures`);
process.exit(failures ? 1 : 0);
