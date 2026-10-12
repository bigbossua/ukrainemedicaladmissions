// Release readiness tests: the owner's legal details (src/lib/legal.mjs), the four legal pages that read them, and the
// release check (scripts/release-readiness.mjs).
//
//   A. Today's data is incomplete: legalStatus() lists the missing items, the proposals and the review flag.
//   B. Coverage: every key of LEGAL is an owner item or a documented fact; every owner item exists in LEGAL and appears
//      on each page LEGAL_ITEMS names; the pages use no unknown item and keep no hard-coded bracketed placeholder.
//   C. Documented facts still match the code: the business e-mail in site.ts, and the fields enquiry.php stores.
//   D. A complete SYNTHETIC legal object passes legalStatus(); each single gap (missing, proposal, wrong form, review
//      flag, reviewer, review date, a condition that switches an item on) makes it fail and names the gap.
//   E. The release check end to end, as a child process: it fails on today's data; it passes with a complete synthetic
//      legal object (UMA_LEGAL_MODULE, a temporary file), clean synthetic legal pages (UMA_DIST_DIR) and the real
//      records; it fails again for a page still carrying draft text, for a missing build and for a record flagged
//      publishable without evidence (the publication "fail" fixture).
//   F. When dist/ exists (after npm run build): every built legal page still shows the draft banner and the visible
//      markers, because today's data is incomplete.
//
// The real src/lib/legal.mjs is never written: synthetic data lives in a temporary directory, and the test checks the
// file's hash before and after.
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { LEGAL, LEGAL_ITEMS, LEGAL_DOCUMENTED_PATHS, LEGAL_PAGES, NOT_APPLICABLE, getPath, isProposal, legalStatus, legalPagesComplete, proposed } from '../src/lib/legal.mjs';
import { materialise } from './fixtures/publication/materialise.mjs';

const LEGAL_FILE = resolve('src/lib/legal.mjs');
const hash = (/** @type {string} */ f) => createHash('sha256').update(readFileSync(f)).digest('hex');
const legalHashBefore = hash(LEGAL_FILE);
const TMP = mkdtempSync(join(tmpdir(), 'uma-release-'));
const NOW = new Date();
const day = (/** @type {number} */ offset) => new Date(NOW.getTime() + offset * 86400000).toISOString().slice(0, 10);

let checks = 0, failures = 0;
const check = (/** @type {unknown} */ cond, /** @type {string} */ msg) => { checks++; if (!cond) { failures++; console.log('FAIL', msg); } return !!cond; };
const paths = (/** @type {any[]} */ list) => list.map((x) => (x.item ?? x).path);

// ---- A. Today's data -----------------------------------------------------------------------------------------------
{
  const s = legalStatus(LEGAL, { now: NOW });
  check(!s.complete && !legalPagesComplete(), 'A: today\'s legal data must be incomplete');
  for (const p of ['entity.name', 'entity.address', 'governingLaw', 'privacyAuthority', 'effectiveDate', 'retention.backups', 'under18Policy', 'processors.mailbox'])
    check(paths(s.missing).includes(p), `A: "${p}" must be listed as missing today`);
  for (const p of ['retention.enquiries', 'retention.mailboxCopies', 'lawfulBasis.enquiries', 'complaints.acknowledge', 'complaints.reviewer'])
    check(paths(s.proposals).includes(p), `A: "${p}" must be listed as a proposal (draft wording, not approved)`);
  check(s.review.length === 3, `A: the review flag, reviewer and review date must all be reported (got ${s.review.length})`);
  check(!paths(s.missing).includes('representative.details') && !paths(s.missing).includes('paidServices.terms') && !paths(s.missing).includes('referralDetails'),
    'A: conditional items (representative details, paid-service terms, referral details) must not be required today');
  check(LEGAL.legalReviewCompleted === false && LEGAL.reviewedBy === null && LEGAL.reviewDate === null, 'A: the review flag must start false with no reviewer or date');
  check(LEGAL.facts.analyticsInstalled === false && LEGAL.facts.paymentsTaken === false && LEGAL.paidServices.offered === false, 'A: documented facts: no analytics, no payments, no paid service');
}

// ---- B. Coverage ---------------------------------------------------------------------------------------------------
/** Every leaf path of an object (a proposal counts as a leaf). @param {any} o @param {string} [prefix] @returns {string[]} */
function leaves(o, prefix = '') {
  if (o === null || typeof o !== 'object' || Array.isArray(o) || isProposal(o)) return [prefix];
  return Object.entries(o).flatMap(([k, v]) => leaves(v, prefix ? `${prefix}.${k}` : k));
}
const itemPaths = LEGAL_ITEMS.map((i) => i.path);
const covered = (/** @type {string} */ p) => itemPaths.includes(p) || LEGAL_DOCUMENTED_PATHS.some((d) => p === d || p.startsWith(`${d}.`));
const hasKey = (/** @type {any} */ o, /** @type {string} */ p) => { const ks = p.split('.'); const last = /** @type {string} */ (ks.pop()); const parent = ks.length ? getPath(o, ks.join('.')) : o; return !!parent && typeof parent === 'object' && Object.hasOwn(parent, last); };
{
  for (const p of leaves(LEGAL)) check(covered(p), `B: LEGAL.${p} is neither an owner item (LEGAL_ITEMS) nor a documented path (LEGAL_DOCUMENTED_PATHS)`);
  for (const p of itemPaths) check(hasKey(LEGAL, p), `B: LEGAL_ITEMS names "${p}", which LEGAL does not have`);
  check(new Set(itemPaths).size === itemPaths.length, 'B: LEGAL_ITEMS must not repeat a path');
  for (const i of LEGAL_ITEMS) check(i.what && i.why && i.pages.length && typeof i.review === 'boolean', `B: LEGAL_ITEMS "${i.path}" needs what, why, pages and review`);

  /** @type {Record<string, string>} */
  const sources = {};
  for (const name of Object.keys(LEGAL_PAGES)) sources[name] = readFileSync(`src/pages/${name}/index.astro`, 'utf8');
  for (const i of LEGAL_ITEMS) for (const page of i.pages) check(sources[page].includes(`<OwnerValue path="${i.path}"`), `B: "${i.path}" should appear on ${page} (LEGAL_ITEMS) but the page does not render it`);
  for (const [name, src] of Object.entries(sources)) {
    for (const m of src.matchAll(/<OwnerValue path="([^"]+)"/g)) {
      check(itemPaths.includes(m[1]), `B: ${name} renders unknown owner item "${m[1]}"`);
      check(LEGAL_ITEMS.find((i) => i.path === m[1])?.pages.includes(/** @type {any} */ (name)), `B: ${name} renders "${m[1]}" but LEGAL_ITEMS does not list ${name} for it (the checklist would be wrong)`);
    }
    check(src.includes('legalPagesComplete()') && src.includes('Draft for legal review'), `B: ${name} must keep the "Draft for legal review" banner, switched by legalPagesComplete()`);
    const template = src.replace(/^---[\s\S]*?---/, '');
    let markup = template, previous = '';
    while (markup !== previous) { previous = markup; markup = markup.replace(/\{[^{}]*\}/g, ''); } // drop every {expression}
    const bracketed = markup.match(/\[[^\]\n]*[A-Za-z][^\]\n]*\]/g) ?? [];
    check(!bracketed.length, `B: ${name} has hard-coded bracketed text (owner details belong in legal.mjs): ${bracketed.join(' | ')}`);
    check(!/info@ukrainemedicaladmissions\.com/.test(src), `B: ${name} must take the e-mail from legal.mjs, not hard-code it`);
  }
}

// ---- C. Documented facts still match the code --------------------------------------------------------------------
{
  const site = readFileSync('src/lib/site.ts', 'utf8');
  check(new RegExp(`email:\\s*'${LEGAL.contact.email.replace(/\./g, '\\.')}'`).test(site), 'C: LEGAL.contact.email must equal SITE.email in src/lib/site.ts');
  const php = readFileSync('public/api/enquiry.php', 'utf8');
  check(php.includes(`'notify_to' => '${LEGAL.contact.email}'`), 'C: enquiry.php must still notify the documented business e-mail');
  const block = (/** @type {string} */ start) => { const i = php.indexOf(start); if (i < 0) return ''; const j = php.indexOf('];\n', i); return php.slice(i, j); };
  const keys = (/** @type {string} */ s) => [...s.matchAll(/^\s*'([A-Za-z_]+)'\s*=>/gm)].map((m) => m[1]);
  const recordKeys = keys(block('$record = ['));
  if (php.includes("$record['profile'] = $profile")) recordKeys.push('profile');
  check(JSON.stringify([...recordKeys].sort()) === JSON.stringify([...LEGAL.facts.storedRecordFields].sort()),
    `C: enquiry.php stores ${JSON.stringify(recordKeys)}; legal.mjs facts.storedRecordFields says ${JSON.stringify(LEGAL.facts.storedRecordFields)}. Update the privacy notice and legal.mjs together.`);
  const profile = block('$profile = [');
  const documentedProfile = Object.entries(LEGAL.facts.storedProfileFields).flatMap(([group, fields]) => [group, ...fields.filter((f) => !['type', 'state'].includes(f))]);
  check(JSON.stringify([...new Set(keys(profile))].sort()) === JSON.stringify([...new Set(documentedProfile)].sort()),
    `C: enquiry.php profile fields ${JSON.stringify([...new Set(keys(profile))].sort())} differ from legal.mjs facts.storedProfileFields ${JSON.stringify([...new Set(documentedProfile)].sort())}`);
  check(/\$documents\[\] = \['type' => \$d, 'state' => \$state\]/.test(php), 'C: enquiry.php document entries must still be { type, state }');
  check(/'ip_hash'\s*=>\s*!empty\(\$config\['ip_hash_key'\]\)/.test(php) && LEGAL.facts.ipHashOnlyWithKey === true, 'C: the IP code must still be stored only when ip_hash_key is set');
}

// ---- D. Synthetic complete object --------------------------------------------------------------------------------
/** A complete synthetic legal object: every owner item filled with obviously fake test values. */
function syntheticComplete() {
  const l = structuredClone(LEGAL);
  const set = (/** @type {string} */ p, /** @type {unknown} */ v) => { const ks = p.split('.'); const last = /** @type {string} */ (ks.pop()); const parent = ks.reduce((o, k) => o[k], /** @type {any} */ (l)); parent[last] = v; };
  for (const i of LEGAL_ITEMS) set(i.path, i.kind === 'date' ? day(-1) : i.kind === 'boolean' ? false : `Synthetic ${i.path} (test only)`);
  l.legalReviewCompleted = true; l.reviewedBy = 'Synthetic Reviewer (test only)'; l.reviewDate = day(-1);
  return l;
}
{
  const ok = syntheticComplete();
  const s = legalStatus(ok, { now: NOW });
  check(s.complete, `D: a complete synthetic object must pass (missing ${paths(s.missing)}, proposals ${paths(s.proposals)}, invalid ${paths(s.invalid)}, review ${s.review})`);
  const variant = (/** @type {string} */ label, /** @type {(l: any) => void} */ change, /** @type {(s: ReturnType<typeof legalStatus>) => boolean} */ expect) => {
    const l = syntheticComplete(); change(l); const r = legalStatus(l, { now: NOW });
    check(!r.complete && expect(r), `D: ${label} must make the legal data incomplete and be named`);
  };
  variant('a missing entity name', (l) => { l.entity.name = null; }, (r) => paths(r.missing).includes('entity.name'));
  variant('an empty string', (l) => { l.governingLaw = '  '; }, (r) => paths(r.missing).includes('governingLaw'));
  variant('a proposal', (l) => { l.retention.enquiries = proposed('up to 12 months after our last contact', 'test'); }, (r) => paths(r.proposals).includes('retention.enquiries'));
  variant('NOT_APPLICABLE where it is not allowed', (l) => { l.entity.name = NOT_APPLICABLE; }, (r) => paths(r.invalid).includes('entity.name'));
  variant('an effective date in the wrong form', (l) => { l.effectiveDate = '1 November 2026'; }, (r) => paths(r.invalid).includes('effectiveDate'));
  variant('a yes/no answer given as text', (l) => { l.representative.needed = 'no'; }, (r) => paths(r.invalid).includes('representative.needed'));
  variant('representative needed without details', (l) => { l.representative.needed = true; l.representative.details = null; }, (r) => paths(r.missing).includes('representative.details'));
  variant('a paid service without terms', (l) => { l.paidServices.offered = true; l.paidServices.terms = null; }, (r) => paths(r.missing).includes('paidServices.terms'));
  variant('a referral arrangement without details', (l) => { l.referralArrangements = true; l.referralDetails = null; }, (r) => paths(r.missing).includes('referralDetails'));
  variant('legalReviewCompleted false', (l) => { l.legalReviewCompleted = false; }, (r) => r.review.length === 1);
  variant('no reviewer', (l) => { l.reviewedBy = null; }, (r) => r.review.some((x) => /reviewer/.test(x)));
  variant('a review date in the future', (l) => { l.reviewDate = day(30); }, (r) => r.review.some((x) => /future/.test(x)));
  const na = syntheticComplete(); na.entity.registrationNumber = NOT_APPLICABLE; na.complaintsBody = NOT_APPLICABLE;
  check(legalStatus(na, { now: NOW }).complete, 'D: NOT_APPLICABLE must be accepted where LEGAL_ITEMS allows it');
}

// ---- E. The release check end to end -----------------------------------------------------------------------------
const SCRIPT = resolve('scripts/release-readiness.mjs');
function run(/** @type {Record<string, string | undefined>} */ env) {
  const e = { ...process.env, ...env };
  for (const [k, v] of Object.entries(env)) if (v === undefined) delete e[k];
  const r = spawnSync(process.execPath, [SCRIPT], { cwd: resolve('.'), env: e, encoding: 'utf8' });
  return { status: r.status, out: `${r.stdout}${r.stderr}` };
}
const completeModule = join(TMP, 'legal-complete.mjs');
writeFileSync(completeModule, `export const LEGAL = ${JSON.stringify(syntheticComplete(), null, 2)};\n`);
/** Write four synthetic built legal pages; `extra` goes into the named page. */
function syntheticDist(/** @type {string} */ name, /** @type {Record<string, string>} */ extra = {}) {
  const dir = join(TMP, name);
  for (const [page, path] of Object.entries(LEGAL_PAGES)) {
    mkdirSync(join(dir, path), { recursive: true });
    writeFileSync(join(dir, path, 'index.html'), `<!doctype html><html lang="en"><head><title>${page}</title><script type="application/ld+json">{"name":"x"}</script></head><body><main><h1>${page}</h1><p>Effective date: ${day(-1)}.</p><p>Legal entity: Synthetic entity (test only)</p>${extra[page] ?? ''}</main></body></html>`);
  }
  return dir;
}
const clean = syntheticDist('dist-clean');
const realRecords = { UMA_UNIVERSITIES_DIR: undefined, UMA_EVIDENCE_DIR: undefined };
{
  const today = run({ UMA_LEGAL_MODULE: undefined, UMA_DIST_DIR: clean, ...realRecords });
  check(today.status === 1, `E: the check must fail on today's legal data (exit ${today.status})`);
  check(/NOT READY/.test(today.out) && today.out.includes('the legal name of the person or company that runs this service [entity.name'), 'E: today\'s output must name the missing entity name');
  check(/draft says "up to 12 months after our last contact"/.test(today.out), 'E: today\'s output must list the 12-month retention as a proposal, not a fact');
  check(/legal review is not recorded as completed/.test(today.out), 'E: today\'s output must report the review flag');

  const pass = run({ UMA_LEGAL_MODULE: completeModule, UMA_DIST_DIR: clean, ...realRecords });
  check(pass.status === 0 && /READY: no owner detail is missing/.test(pass.out), `E: complete synthetic data, clean pages and today's records must pass (exit ${pass.status})\n${pass.out}`);

  for (const [label, page, html, expect] of [
    ['the draft banner', 'terms', '<p>Draft for legal review — effective date: x.</p>', /\/terms\/ \(terms of use\): "Draft for legal review" banner shown/],
    ['a missing-value marker', 'privacy', '<span class="tbc" data-owner-value="missing">[to be supplied by the owner: the law]</span>', /\/privacy\/ \(privacy notice\): 1 "\[to be supplied by the owner: …\]" marker/],
    ['a proposal marker', 'complaints-policy', '<span data-owner-value="proposed">3 working days <span class="tbc">[proposed in the draft, not yet approved by the owner]</span></span>', /1 value marked as proposed, not approved/],
    ['an old hard-coded placeholder', 'disclosure', '<p>[Legal entity name to be inserted.]</p>', /other placeholder text: "\[Legal entity name to be inserted\.\]"/],
    ['leftover draft wording', 'disclosure', '<p>No such arrangement exists at the date of this draft.</p>', /the word "draft" appears 1 more time/],
    ['a bare marker attribute', 'privacy', '<span data-owner-value="missing"></span>', /1 owner-value marker in the HTML/],
  ]) {
    const r = run({ UMA_LEGAL_MODULE: completeModule, UMA_DIST_DIR: syntheticDist(`dist-${page}-${checks}`, { [String(page)]: String(html) }), ...realRecords });
    check(r.status === 1 && /** @type {RegExp} */ (expect).test(r.out), `E: a built page carrying ${label} must fail the check and be named (exit ${r.status})\n${r.out}`);
  }

  const noBuild = run({ UMA_LEGAL_MODULE: completeModule, UMA_DIST_DIR: join(TMP, 'no-such-dist'), ...realRecords });
  check(noBuild.status === 1 && /not built/.test(noBuild.out), 'E: a missing build must fail the check');

  const dirs = materialise('fail', join(TMP, 'records-fail'), NOW);
  const flagged = run({ UMA_LEGAL_MODULE: completeModule, UMA_DIST_DIR: clean, UMA_UNIVERSITIES_DIR: dirs.universities, UMA_EVIDENCE_DIR: dirs.evidence });
  check(flagged.status === 1 && /\(fixture-flagged-no-evidence\) is flagged publishable but fails the publication policy/.test(flagged.out), `E: a record flagged publishable without evidence must fail the check (exit ${flagged.status})\n${flagged.out}`);

  const broken = join(TMP, 'legal-broken.mjs'); writeFileSync(broken, 'export const NOTHING = 1;\n');
  check(run({ UMA_LEGAL_MODULE: broken, UMA_DIST_DIR: clean, ...realRecords }).status === 2, 'E: a legal module without LEGAL must stop the check with exit 2');
}

// ---- F. The real build (when present) ---------------------------------------------------------------------------
if (existsSync('dist/privacy/index.html')) {
  for (const path of Object.values(LEGAL_PAGES)) {
    const html = readFileSync(join('dist', path, 'index.html'), 'utf8');
    check(html.includes('Draft for legal review'), `F: dist${path} must still show "Draft for legal review" (today's data is incomplete)`);
    check(/<span class="tbc" data-owner-value="missing">\[to be supplied by the owner: [^\]]+\]<\/span>/.test(html), `F: dist${path} must show at least one visible "[to be supplied by the owner: …]" marker`);
  }
  const privacy = readFileSync('dist/privacy/index.html', 'utf8');
  check(privacy.includes('[to be supplied by the owner: the legal name of the person or company that runs this service]'), 'F: the privacy notice must show the missing entity name as a visible marker');
  check(/up to 12 months after our last contact <span class="tbc">\[proposed in the draft, not yet approved by the owner\]<\/span>/.test(privacy), 'F: the 12-month retention must be shown as a proposal, not as a fact');
  const real = run({ UMA_LEGAL_MODULE: undefined, UMA_DIST_DIR: undefined, ...realRecords });
  check(real.status === 1 && /\/privacy\/ \(privacy notice\): "Draft for legal review" banner shown/.test(real.out), 'F: the check must fail on today\'s real build');
} else console.log('NOTE: dist/ not built, so part F (the real built pages) was not run. Run npm run build first for the full test.');

// ---- Clean-up and result ----------------------------------------------------------------------------------------
check(hash(LEGAL_FILE) === legalHashBefore, 'the real src/lib/legal.mjs must not be changed by the test');
rmSync(TMP, { recursive: true, force: true });
console.log(`release-readiness: ${checks} checks, ${failures} failed`);
process.exit(failures ? 1 : 0);
