// Release readiness check (npm run check:release). Changes nothing; reads three things and says, in plain words,
// everything that still blocks a release:
//
//   1. The owner's legal details (src/lib/legal.mjs): every required value still missing, every value that is only a
//      proposal from today's draft (no recorded owner approval), every value in the wrong form, and the legal-review flag.
//   2. The BUILT legal pages (dist/privacy/, dist/terms/, dist/disclosure/, dist/complaints-policy/): any "Draft for
//      legal review" banner, any "[to be supplied by the owner: …]" or proposal marker, any other bracketed placeholder,
//      and the word "draft". Build first (npm run build); a stale build of older data fails too.
//   3. The university records: any record flagged publishable that fails the publication policy (the same check a
//      production build makes, src/lib/publication.mjs; the full per-record report is npm run report:publication).
//
// Exit code: 0 only when nothing blocks a release; 1 when something does (today it always does); 2 when the check itself
// could not run. LEGAL_COMPLETION_CHECKLIST.md explains each owner item. This is not legal advice.
//
// Test overrides (tests/release-readiness.mjs; never needed in normal use): UMA_LEGAL_MODULE = path of a module exporting
// LEGAL in place of src/lib/legal.mjs (the item list and the rules always come from src/lib/legal.mjs); UMA_DIST_DIR =
// built site directory in place of dist/; UMA_UNIVERSITIES_DIR / UMA_EVIDENCE_DIR as for the build. A run with any of
// them set prints "TEST INPUTS IN USE" before and after the verdict, so its result is never mistaken for the site's.
import { existsSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { record as recordSchema } from '../src/content/schema.mjs';
import { readRecordFiles, loadEvidence, universitiesDir, evidenceDir } from '../src/lib/evidence.mjs';
import { publicationDecision } from '../src/lib/publication.mjs';
import { LEGAL_ITEMS, LEGAL_PAGES, legalStatus } from '../src/lib/legal.mjs';

const now = new Date();
const show = (/** @type {string} */ p) => { const r = relative(process.cwd(), p); return r && !r.startsWith('..') ? r : p; };
const pageNames = { privacy: 'privacy notice', terms: 'terms of use', disclosure: 'disclosure', 'complaints-policy': 'complaints policy' };

/** @type {any} */
let LEGAL;
const legalFile = resolve(process.env.UMA_LEGAL_MODULE || 'src/lib/legal.mjs');
try {
  ({ LEGAL } = await import(pathToFileURL(legalFile).href));
  if (!LEGAL || typeof LEGAL !== 'object') throw new Error('the module does not export LEGAL');
} catch (e) {
  console.log(`The release check could not read the legal details in ${show(legalFile)}: ${e instanceof Error ? e.message : e}`);
  process.exit(2);
}

/** @type {string[]} */
const blockers = [];
const block = (/** @type {string} */ m) => { blockers.push(m); };

console.log(`Release readiness check, ${now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}`);
console.log('Lists everything that still blocks a release. This is preparation, not legal advice.\n');
// A result produced with the test overrides describes those inputs, not this repository: say so at the top and in the
// verdict, so a READY from a test run can never be read as the site's own result.
const overrides = ['UMA_LEGAL_MODULE', 'UMA_DIST_DIR', 'UMA_UNIVERSITIES_DIR', 'UMA_EVIDENCE_DIR'].filter((k) => process.env[k]);
const overrideNote = overrides.length ? `TEST INPUTS IN USE (${overrides.map((k) => `${k}=${process.env[k]}`).join(', ')}): this result describes those inputs, not the site's own files.` : '';
if (overrideNote) console.log(`${overrideNote}\n`);

// ---- 1. Owner details --------------------------------------------------------------------------------------------
const status = legalStatus(LEGAL, { now });
const where = (/** @type {{ path: string, pages: string[] }} */ i) => `[${i.path}; on the ${i.pages.map((p) => pageNames[/** @type {keyof typeof pageNames} */ (p)]).join(', ')}]`;
const required = LEGAL_ITEMS.filter((i) => !i.requiredWhen || i.requiredWhen(LEGAL)).length;
const supplied = required - status.missing.length - status.proposals.length - status.invalid.length;
console.log(`1. Owner details for the legal pages (${show(legalFile)})`);
console.log(`   Supplied: ${supplied} of ${required} required items.`);
console.log(`   Already documented in the repository, not asked again: business e-mail ${LEGAL.contact?.email ?? '(missing!)'}; hosting provider ${LEGAL.processors?.hosting ?? '(missing!)'} (as labelled in HOSTING_AND_DEPLOYMENT_ASSESSMENT.md); paid services offered: ${LEGAL.paidServices?.offered === true ? 'yes' : 'no'}; referral payments: ${LEGAL.referralArrangements === true ? 'yes' : 'none'}; analytics installed: ${LEGAL.facts?.analyticsInstalled === true ? 'yes' : 'none'}.`);
if (status.missing.length) {
  console.log(`   Missing — to be supplied by the owner (${status.missing.length}):`);
  for (const i of status.missing) { console.log(`     - ${i.what} ${where(i)}`); block(`missing owner detail: ${i.path}`); }
}
if (status.proposals.length) {
  console.log(`   Proposed in today's draft but not approved by the owner (${status.proposals.length}):`);
  for (const { item, value } of status.proposals) { console.log(`     - ${item.what}: the draft says "${value}" ${where(item)}`); block(`proposal not approved: ${item.path}`); }
}
if (status.invalid.length) {
  console.log(`   Supplied in the wrong form (${status.invalid.length}):`);
  for (const { item, problem } of status.invalid) { console.log(`     - ${item.what}: ${problem} ${where(item)}`); block(`invalid owner detail: ${item.path}`); }
}
if (status.documented.length) {
  console.log(`   Documented values changed into the wrong form (${status.documented.length}):`);
  for (const m of status.documented) { console.log(`     - ${m}`); block(`documented value: ${m}`); }
}
if (status.review.length) {
  console.log('   Legal review:');
  for (const r of status.review) { console.log(`     - ${r}`); block(`legal review: ${r}`); }
} else console.log(`   Legal review: completed by ${LEGAL.reviewedBy} on ${LEGAL.reviewDate}.`);
console.log('');

// ---- 2. Built legal pages ----------------------------------------------------------------------------------------
const dist = resolve(process.env.UMA_DIST_DIR || 'dist');
console.log(`2. Built legal pages (${show(dist)})`);
const count = (/** @type {string} */ s, /** @type {RegExp} */ re) => (s.match(re) ?? []).length;
const plain = (/** @type {string} */ html) => html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&#91;|&lsqb;/g, '[').replace(/&#93;|&rsqb;/g, ']').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
for (const [name, path] of Object.entries(LEGAL_PAGES)) {
  const file = join(dist, path, 'index.html');
  const label = `${path} (${pageNames[/** @type {keyof typeof pageNames} */ (name)]})`;
  if (!existsSync(file)) { console.log(`   ${label}: not built (${show(file)} is missing). Run npm run build first.`); block(`page not built: ${path}`); continue; }
  const html = readFileSync(file, 'utf8');
  const text = plain(html);
  const found = [];
  const banner = count(text, /Draft for legal review/gi);
  if (banner) found.push(`"Draft for legal review" banner shown`);
  const markers = count(text, /\[to be supplied/gi);
  if (markers) found.push(`${markers} "[to be supplied by the owner: …]" marker${markers === 1 ? '' : 's'}`);
  const proposals = count(text, /\[proposed in the draft/gi);
  if (proposals) found.push(`${proposals} value${proposals === 1 ? '' : 's'} marked as proposed, not approved`);
  const attrs = count(html, /data-owner-value=/g);
  if (attrs && !markers && !proposals) found.push(`${attrs} owner-value marker${attrs === 1 ? '' : 's'} in the HTML`);
  const rest = text.replace(/\[to be supplied[^\]]*\]|\[proposed in the draft[^\]]*\]/gi, ' ').replace(/Draft for legal review/gi, ' ');
  const other = (rest.match(/\[[^\][]{0,200}\b(to be|insert|inserted|confirm|confirmed|tbc|todo|placeholder)\b[^\][]{0,200}\]/gi) ?? []);
  if (other.length) found.push(`other placeholder text: ${other.map((o) => `"${o.trim()}"`).join(', ')}`);
  const draftWord = count(rest, /\bdraft\b/gi);
  if (draftWord) found.push(`the word "draft" appears ${draftWord} more time${draftWord === 1 ? '' : 's'}`);
  if (found.length) { console.log(`   ${label}: ${found.join('; ')}.`); block(`built page not final: ${path}`); }
  else console.log(`   ${label}: no draft banner or placeholder found.`);
}
console.log('');

// ---- 3. University records ---------------------------------------------------------------------------------------
console.log(`3. University records (${show(universitiesDir())}; evidence in ${show(evidenceDir())})`);
// A records directory that does not exist reads as "no records", which would pass this section without checking anything.
if (!existsSync(universitiesDir())) { console.log(`   The records directory ${show(universitiesDir())} does not exist, so no record could be checked.`); block('records directory not found'); }
const rows = readRecordFiles(recordSchema, { dir: universitiesDir() });
let flagged = 0, published = 0;
for (const { file, data, error } of rows) {
  if (!data) { console.log(`   ${file}: does not match the record format, so the site cannot be built: ${error}`); block(`invalid record file: ${file}`); continue; }
  const d = publicationDecision(data, loadEvidence(data.slug), { now, preview: false });
  if (d.flagged) flagged++;
  if (d.published) published++;
  if (d.buildError) {
    console.log(`   ${data.shortName} (${data.slug}) is flagged publishable but fails the publication policy, so a production build stops:`);
    d.failures.forEach((f, n) => console.log(`     ${n + 1}. ${f.message}`));
    block(`record flagged publishable but failing the policy: ${data.slug}`);
  }
}
console.log(`   ${rows.length} record${rows.length === 1 ? '' : 's'}; ${flagged} flagged publishable; ${published} published.${flagged === published ? ' No flagged record fails the publication policy.' : ''}`);
console.log('');

if (blockers.length) {
  console.log(`NOT READY: ${blockers.length} item${blockers.length === 1 ? '' : 's'} block${blockers.length === 1 ? 's' : ''} a release. Owner items and the order to complete them: LEGAL_COMPLETION_CHECKLIST.md.`);
  process.exit(1);
}
console.log('READY: no owner detail is missing, the legal review is recorded, the built legal pages carry no draft text, and no flagged record fails the publication policy.');
console.log('This check does not cover the other release steps (SECURITY_AND_RELEASE_CHECKLIST.md), such as live mail delivery or headers.');
if (overrideNote) console.log(overrideNote);
