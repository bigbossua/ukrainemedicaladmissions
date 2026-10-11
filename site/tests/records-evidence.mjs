// Record tests: schema validation (with the SAME Zod schema the build uses) plus the evidence and publication
// invariants every university record must satisfy. Runs without a build. Fails on any violation.
//
// Invariants (UNIVERSITY_DATA_REGISTER.md §1, §3, §10):
//  R1  every record (real and sample) parses against src/content/schema.mjs
//  R2  a claim marked `verified` carries an https source URL and a check date
//  R3  a claim with a value but status `unverified` carries a provenance note (unverified values are always marked)
//  R4  money and deadline values are present ONLY when verified (never record a fee, deadline or intake date as a lead)
//  R5  requirements and documents marked verified carry source + checked
//  R6  a publishable record has verified identity fields, a lastReview date, and every programme's
//      internationalAdmission verified; a record with any unresolved open question is not publishable
//  R7  a synthetic sample is never publishable, is flagged `synthetic`, and every source URL it carries is on
//      example.invalid (so a sample can never pass as evidence); a real record never cites example.invalid
//  R8  research reference URLs are https; slugs match file names and are unique across real records and samples
//  R9  programmes[] holds only programmes with (at least a lead of) international admission = true; a programme without
//      that evidence lives in deferredProgrammes[] (never rendered publicly); ids are unique across both lists
import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { record } from '../src/content/schema.mjs';

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
      } else if (c.status === 'unverified' && has && !c.note) fail(file, `${path}: unverified value without a provenance note`);
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
          if (r.status === 'unverified' && !r.note) fail(file, `programmes[${pi}].${name}.${r.id}: unverified without a note`);
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
      ok();
    }
    console.log(`${failures ? '' : 'ok   '}${file}: ${d.programmes.length} programmes (+${d.deferredProgrammes.length} deferred), ${d.preparatoryRoutes.length} preparatory routes, ${d.researchReferences.length} research references, publishable=${d.verification.publishable}${synthetic ? ' (synthetic)' : ''}`);
  }
}
console.log(`records-evidence: ${slugs.size} records, ${checks} checks, ${failures} failures`);
process.exit(failures ? 1 : 0);
