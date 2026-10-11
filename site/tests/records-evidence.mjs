// Record tests: schema validation (with the SAME Zod schema the build uses) plus the evidence and publication
// invariants every university record must satisfy. Runs without a build. Fails on any violation.
//
// Invariants (UNIVERSITY_DATA_REGISTER.md §1, §3, §10):
//  R1  every record (real and sample) parses against src/content/schema.mjs
//  R2  a claim marked `verified` carries an https source URL and a check date
//  R3  a claim with a value but status `unverified` (or `partially-verified` / `conflicting`) carries a provenance note
//  R4  money and deadline values are present ONLY when verified (never record a fee, deadline or intake date as a lead)
//  R5  requirements and documents marked verified carry source + checked
//  R6  a record flagged publishable passes the publication policy (src/lib/publication.mjs evaluatePublication) against
//      its evidence file: identity fields, status, current statement and teaching format shown; lastReview within 180
//      days; no open questions; evidence file present — AND every programme in programmes[] is listable (international
//      admission, level, language, duration and intake year shown, fee page read), i.e. the "What we check" list on
//      /universities/ and DIRECTORY_VERIFICATION_PLAN.md §5. It also keeps the original explicit checks.
//  R7  a synthetic sample is never publishable, is flagged `synthetic`, and every source URL it carries is on
//      example.invalid (so a sample can never pass as evidence); a real record never cites example.invalid
//  R8  research reference URLs are https; slugs match file names and are unique across real records and samples
//  R9  programmes[] holds only programmes with (at least a lead of) international admission = true; a programme without
//      that evidence lives in deferredProgrammes[] (never rendered publicly); ids are unique across both lists
//  R10 a claim (or requirement / document item) marked `verified` in a REAL record has a matching evidence entry in
//      data/evidence/<slug>.json: same claimPath, status verified, the same value (deep-equal)
//  R11 every file in data/evidence parses against the evidence schema (src/lib/evidence.mjs), its slug matches its file
//      name and a real record, every entry's claimPath resolves to a claim in that record, and every `contradicts` id
//      names an entry in the same file. A missing evidence file is allowed: it means "nothing verified".
import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { record } from '../src/content/schema.mjs';
import { loadEvidence, listEvidenceFiles, evidenceDir } from '../src/lib/evidence.mjs';
import { evaluatePublication, listClaims, deepEqual } from '../src/lib/publication.mjs';

const dirs = { universities: resolve('src/content/universities'), samples: resolve('src/content/samples') };
let failures = 0, checks = 0;
const fail = (file, msg) => { console.log(`FAIL ${file}: ${msg}`); failures++; };
const ok = () => { checks++; };

const isClaim = (o) => o && typeof o === 'object' && !Array.isArray(o) && 'value' in o && 'status' in o && 'source' in o;
function* claims(obj, path = '') {
  if (Array.isArray(obj)) { for (let i = 0; i < obj.length; i++) yield* claims(obj[i], `${path}[${i}]`); return; }
  if (obj && typeof obj === 'object') {
    if (isClaim(obj)) yield [path, obj];
    for (const [k, v] of Object.entries(obj)) if (k !== 'value' || !isClaim(obj)) yield* claims(v, path ? `${path}.${k}` : k);
  }
}
const hasValue = (v) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0) && !(typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0);
const isMoney = (v) => v && typeof v === 'object' && 'amount' in v && 'currency' in v;
const isDeadlines = (path) => /(^|\.)deadlines$/.test(path);
const httpsUrl = (u) => typeof u === 'string' && /^https:\/\//.test(u);
const host = (u) => { try { return new URL(u).host; } catch { return ''; } };

const slugs = new Map();
const realClaims = new Map(); // slug -> claim paths (R11)
const NOW = new Date();
for (const [kind, dir] of Object.entries(dirs)) {
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.json'))) {
    const file = `${kind}/${f}`;
    let raw;
    try { raw = JSON.parse(readFileSync(join(dir, f), 'utf8')); } catch (e) { fail(file, `invalid JSON: ${e.message}`); continue; }
    const parsed = record.safeParse(raw);
    if (!parsed.success) { fail(file, `schema: ${parsed.error.issues.slice(0, 5).map((i) => `${i.path.join('.')}: ${i.message}`).join(' | ')}`); continue; }
    ok();
    const d = parsed.data;
    const synthetic = kind === 'samples';
    // R8 slugs
    if (d.slug !== basename(f, '.json')) fail(file, `slug "${d.slug}" does not match the file name`);
    if (slugs.has(d.slug)) fail(file, `slug "${d.slug}" duplicates ${slugs.get(d.slug)}`); slugs.set(d.slug, file); ok();
    // R7 synthetic
    if (synthetic) {
      if (!d.synthetic) fail(file, 'sample record must set synthetic: true');
      if (d.verification.publishable) fail(file, 'sample record must never be publishable');
    } else if (d.synthetic) fail(file, 'real record must not be flagged synthetic');
    ok();
    // claims
    for (const [path, c] of claims(d)) {
      const has = hasValue(c.value);
      if (c.status === 'verified') {
        if (!has) fail(file, `${path}: verified but no value`);
        if (!httpsUrl(c.source)) fail(file, `${path}: verified without an https source URL`);
        if (!c.checked) fail(file, `${path}: verified without a check date`);
      } else if (['unverified', 'partially-verified', 'conflicting'].includes(c.status) && has && !c.note) fail(file, `${path}: ${c.status} value without a provenance note`);
      if ((isMoney(c.value) || (isDeadlines(path) && has)) && c.status !== 'verified') fail(file, `${path}: money/deadline value recorded without verification`);
      if (c.source) {
        if (!httpsUrl(c.source)) fail(file, `${path}: source is not https`);
        if (synthetic && host(c.source) !== 'example.invalid') fail(file, `${path}: sample source must be on example.invalid`);
        if (!synthetic && host(c.source) === 'example.invalid') fail(file, `${path}: real record cites example.invalid`);
      }
      ok();
    }
    // R5 requirement / document objects
    for (const [pi, p] of d.programmes.entries()) {
      for (const [list, name] of [[p.requirements, 'requirements'], [p.documents, 'documents']]) {
        const ids = new Set();
        for (const r of list) {
          if (ids.has(r.id)) fail(file, `programmes[${pi}].${name}: duplicate id ${r.id}`); ids.add(r.id);
          if (r.status === 'verified' && (!httpsUrl(r.source) || !r.checked)) fail(file, `programmes[${pi}].${name}.${r.id}: verified without source+checked`);
          if (['unverified', 'partially-verified', 'conflicting'].includes(r.status) && !r.note) fail(file, `programmes[${pi}].${name}.${r.id}: ${r.status} without a note`);
          if (synthetic && r.source && host(r.source) !== 'example.invalid') fail(file, `programmes[${pi}].${name}.${r.id}: sample source must be on example.invalid`);
          ok();
        }
      }
    }
    if (new Set(d.programmes.map((p) => p.id)).size !== d.programmes.length) fail(file, 'duplicate programme ids');
    // R9 deferred programmes
    for (const p of d.programmes) if (p.internationalAdmission.value !== true) fail(file, `programme ${p.id} has no international-admission evidence (value ${p.internationalAdmission.value}) — move it to deferredProgrammes`);
    for (const p of d.deferredProgrammes) if (p.internationalAdmission.status === 'verified' && p.internationalAdmission.value === true) fail(file, `deferred programme ${p.id} is verified as open to international applicants — move it to programmes[]`);
    if (new Set([...d.programmes, ...d.deferredProgrammes].map((p) => p.id)).size !== d.programmes.length + d.deferredProgrammes.length) fail(file, 'programme ids not unique across programmes and deferredProgrammes');
    ok();
    // R8 research references
    for (const r of d.researchReferences) { if (!httpsUrl(r.url)) fail(file, `researchReferences: ${r.label} is not https`); ok(); }
    // R6 publication readiness
    if (d.verification.publishable) {
      for (const k of ['officialName', 'status', 'website', 'address']) if (d[k].status !== 'verified') fail(file, `publishable but ${k} is ${d[k].status}`);
      if (!d.verification.lastReview) fail(file, 'publishable without lastReview');
      if (d.verification.openQuestions.length) fail(file, 'publishable with open verification questions');
      for (const p of d.programmes) if (p.internationalAdmission.status !== 'verified') fail(file, `publishable but programme ${p.id} internationalAdmission is ${p.internationalAdmission.status}`);
      const policy = evaluatePublication(d, loadEvidence(d.slug), { now: NOW });
      for (const x of policy.failures) fail(file, `publishable but fails the publication policy: ${x.message}`);
      for (const x of policy.notListed) fail(file, `publishable but programmes[] is not trimmed: ${x.message} Verify it or move it to deferredProgrammes.`);
      ok();
    }
    // R10 verified claims are backed by the evidence store (real records only; samples cite example.invalid by design)
    if (!synthetic) {
      const ev = loadEvidence(d.slug);
      const entries = ev.state === 'ok' ? ev.data.entries : [];
      for (const { path, claim } of listClaims(d)) {
        if (claim.status !== 'verified') continue;
        // Exactly the recorded value (deep-equal, no extra or missing keys), as the publication policy requires.
        const match = entries.some((e) => e.claimPath === path && e.status === 'verified' && deepEqual(e.value, claim.value));
        if (!match) fail(file, `R10 ${path}: marked verified but data/evidence/${d.slug}.json has no verified entry with the same value${ev.state === 'invalid' ? ' (the evidence file is invalid)' : ev.state === 'missing' ? ' (no evidence file)' : ''}`);
        ok();
      }
      realClaims.set(d.slug, new Set(listClaims(d).map((c) => c.path)));
    }
    console.log(`${failures ? '' : 'ok   '}${file}: ${d.programmes.length} programmes (+${d.deferredProgrammes.length} deferred), ${d.preparatoryRoutes.length} preparatory routes, ${d.researchReferences.length} research references, publishable=${d.verification.publishable}${synthetic ? ' (synthetic)' : ''}`);
  }
}
// R11 every evidence file is valid and belongs to a real record
const evFiles = listEvidenceFiles();
for (const slug of evFiles) {
  const file = `evidence/${slug}.json`;
  const ev = loadEvidence(slug);
  if (ev.state !== 'ok') { fail(file, `R11 does not match the evidence schema: ${ev.state === 'invalid' ? ev.errors.slice(0, 5).join(' | ') : 'unreadable'}`); continue; }
  const paths = realClaims.get(slug);
  if (!paths) { fail(file, `R11 slug "${slug}" matches no real record in src/content/universities`); continue; }
  const ids = new Set(ev.data.entries.map((e) => e.id));
  for (const e of ev.data.entries) {
    if (!paths.has(e.claimPath)) fail(file, `R11 ${e.id}: claimPath "${e.claimPath}" does not resolve to a claim in the record`);
    for (const c of e.contradicts) if (!ids.has(c)) fail(file, `R11 ${e.id}: contradicts "${c}", which is not an entry in this file`);
    ok();
  }
  ok();
  console.log(`ok   ${file}: ${ev.data.entries.length} entries (access ${ev.data.access.status})`);
}
console.log(`records-evidence: ${slugs.size} records, ${evFiles.length} evidence files (${evidenceDir()}), ${checks} checks, ${failures} failures`);
process.exit(failures ? 1 : 0);
