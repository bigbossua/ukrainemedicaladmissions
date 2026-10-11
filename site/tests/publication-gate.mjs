// Publication-gate test over BOTH builds:
//   dist/          production build  — unpublished records and samples must be entirely absent
//   dist-preview/  PREVIEW_UNPUBLISHED=1 build — drafts render as noindex, bare (no canonical / JSON-LD / sitemap), banner-marked
// Fails on any leak. Run after `npm run build` and `npm run build:preview`.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DIST = resolve('dist'), PREV = resolve('dist-preview');
const SITE = 'https://ukrainemedicaladmissions.com';
let failures = 0, checks = 0;
const fail = (m) => { console.log('FAIL', m); failures++; };
const ok = () => { checks++; };

const load = (dir) => readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')));
const real = load(resolve('src/content/universities'));
const samples = load(resolve('src/content/samples'));
const unpublished = real.filter((r) => !r.verification.publishable);
const published = real.filter((r) => r.verification.publishable);

function htmlFiles(root) {
  const out = [];
  (function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && out.push(p); } })(root);
  return out;
}
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
  else if (!rec.verification.publishable && !rule.test(htaccess)) fail(`.htaccess: unpublished ${slug} (live before the gate) needs "RedirectMatch 302 ^/universities/${slug}/?$ /universities/"`);
  else if (rec.verification.publishable && anyRule.test(htaccess)) fail(`.htaccess: ${slug} is publishable — remove its redirect rule so the page is served`);
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
  ok();
}
// The directory must not be empty of meaning: with no published records it must show the explicit empty state.
const dirPage = prodHtml.find((x) => x.p === '/universities/index.html');
if (!dirPage) fail('production /universities/ missing');
else if (published.length === 0 && !/No university profile has completed verification yet/.test(dirPage.h)) fail('/universities/: empty-state copy missing with zero published records');
ok();
// A production page must never carry the draft banner.
for (const { p, h } of prodHtml) if (h.includes('data-draft-banner')) fail(`${p}: draft banner in production build`);
ok();

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
for (const r of unpublished) checkDraftPage(`universities/${r.slug}`, r.slug, ['Draft record — not published', 'Verification queue', r.shortName]);
for (const s of samples) checkDraftPage(`preview/${s.slug}`, s.slug, ['Synthetic sample record', 'allow-verified']);
checkDraftPage('preview', 'preview index', ['Drafts and samples', 'allow-verified']);
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
