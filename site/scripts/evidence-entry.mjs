#!/usr/bin/env node
// Record ONE evidence entry for one university claim, correctly (UNIVERSITY_EVIDENCE_STANDARD.md, "Tools").
//
// What it does, in order:
//   1. Reads the record (src/content/universities/<slug>.json) and its evidence file (data/evidence/<slug>.json) and
//      refuses to go on if either does not match its format.
//   2. Builds the entry from the options, gives it the next id (<slug>/<claimPath>/<n>, never reused) and validates it
//      with the REAL evidence schema (src/lib/evidence.mjs). An unknown claim path is refused.
//   3. Runs the REAL publication policy (evaluateClaim and toPublicRecord in src/lib/publication.mjs) and prints whether
//      the claim would be shown (as the record stands now, and if the entry were applied to the record) and, if not,
//      the policy's reason in plain words.
//   4. Writes NOTHING unless --write is given. --write appends the entry to the evidence file. --apply-to-record also sets
//      the record claim's value, status "verified", source (= --url) and checked (= --accessed), so the record and the
//      evidence cannot drift; it does this only for an entry that is verified with the decision "publish".
//
// It never deletes or rewrites an entry. A correction is a NEW entry plus --mark-outdated <old id>, which changes only
// that entry's status (to "outdated"), decision (to "withhold") and withholdReason. Running the same command again does
// not record the same reading twice: an identical entry is refused, or, with --apply-to-record, applied as it stands.
// Every write keeps the JSON format stable (2-space indent, trailing newline) and is refused if it would break rule R10
// of tests/records-evidence.mjs (a claim marked verified needs a verified evidence entry with exactly the same value).
//
// Run as node scripts/evidence-entry.mjs <options> from site/ (npm run evidence:add -- <options> once that script entry
// is in package.json). --help lists the options.
// Exit code: 0 done (or dry run that --write would accept), 1 refused (nothing written), 2 usage error.
import { readFileSync, writeFileSync, renameSync, existsSync, unlinkSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { record as recordSchema } from '../src/content/schema.mjs';
import { parseEvidence, isIsoDate, isHttpsUrl, EVIDENCE_STATUSES } from '../src/lib/evidence.mjs';
import {
  evaluateClaim, toPublicRecord, evaluatePublication, listClaims, deepEqual, CODE_WORDS, FIELD_POLICY,
  isTimeSensitive, allowedTiers, isoDay, academicYearStart,
} from '../src/lib/publication.mjs';

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const NOW = new Date();
const TODAY = isoDay(NOW);

const USAGE = `Record one evidence entry (UNIVERSITY_EVIDENCE_STANDARD.md, "Tools"). Writes nothing without --write.

  node scripts/evidence-entry.mjs --slug <record slug> --path <claimPath> --value '<JSON>' \\
    --statement "<the claim in plain words>" --url <https URL read> --org "<publishing body>" --tier <1-5> \\
    --type <web-page|pdf|owner-capture|official-letter> --quote "<exact passage>" (or --quote-file <file>) \\
    --accessed <YYYY-MM-DD> --status <status> --reviewer "<role>" --method "<how it was read>" \\
    --decision <publish|withhold> [--withhold-reason "<why>"] [--academic-year 2026/27] [--effective <YYYY-MM-DD>] \\
    [--next-review <YYYY-MM-DD>] [--capture-ref <file name>] [--contradicts <id>[,<id>]] \\
    [--mark-outdated <old entry id> [--outdated-reason "<why>"]] [--write] [--apply-to-record] [--json]

  --value            the JSON value exactly as the record claim would hold it: strings in double quotes ('"12 semesters"'),
                     a fee as {"amount":..,"currency":"..","per":"year","academicYear":".."}, null for a silent page
  --status           ${EVIDENCE_STATUSES.join(', ')}
  --dry-run          the default: check and evaluate only, write nothing
  --write            append the entry to data/evidence/<slug>.json
  --apply-to-record  with --write: also set the record claim (value, status verified, source, checked). Only for an entry
                     that is verified with the decision publish. Without --write it shows what would change.
  --mark-outdated    mark an existing entry outdated (decision withhold). Alone it needs --outdated-reason.
  --records-dir, --evidence-dir   other directories (tests and fixtures only); also UMA_UNIVERSITIES_DIR, UMA_EVIDENCE_DIR
  --json             print the result as JSON (for scripts and tests)
`;

const VALUE_OPTS = {
  '--slug': 'slug', '--path': 'path', '--value': 'value', '--statement': 'statement', '--url': 'url', '--org': 'org',
  '--tier': 'tier', '--type': 'type', '--quote': 'quote', '--quote-file': 'quoteFile', '--accessed': 'accessed',
  '--academic-year': 'academicYear', '--effective': 'effective', '--capture-ref': 'captureRef', '--status': 'status',
  '--reviewer': 'reviewer', '--method': 'method', '--next-review': 'nextReview', '--decision': 'decision',
  '--withhold-reason': 'withholdReason', '--contradicts': 'contradicts', '--mark-outdated': 'markOutdated',
  '--outdated-reason': 'outdatedReason', '--records-dir': 'recordsDir', '--evidence-dir': 'evidenceDir',
};
const FLAG_OPTS = { '--dry-run': 'dryRun', '--write': 'write', '--apply-to-record': 'apply', '--json': 'json', '--help': 'help', '-h': 'help' };
/** Which option fills which entry field (to name the option in a schema error). */
const FIELD_OPTION = {
  statement: '--statement', value: '--value', sourceUrl: '--url', sourceOrganisation: '--org', sourceTier: '--tier',
  evidenceType: '--type', quotation: '--quote', effectiveDate: '--effective', academicYear: '--academic-year',
  accessed: '--accessed', captureRef: '--capture-ref', status: '--status', reviewer: '--reviewer', method: '--method',
  contradicts: '--contradicts', nextReview: '--next-review', decision: '--decision', withholdReason: '--withhold-reason',
};

/** Options that describe a new entry (meaningless without --path). */
const ENTRY_OPTS = ['value', 'statement', 'url', 'org', 'tier', 'type', 'quote', 'quoteFile', 'accessed', 'academicYear', 'effective', 'captureRef', 'status', 'reviewer', 'method', 'nextReview', 'decision', 'withholdReason', 'contradicts'];
/** "quoteFile" -> "--quote-file". @param {string} k */
const optName = (k) => `--${k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;

class UsageError extends Error {}

/** @param {string[]} argv */
export function parseArgs(argv) {
  /** @type {Record<string, any>} */ const o = {};
  for (let i = 0; i < argv.length; i++) {
    let a = argv[i], v;
    const eq = a.startsWith('--') ? a.indexOf('=') : -1;
    if (eq > 0) { v = a.slice(eq + 1); a = a.slice(0, eq); }
    if (a in FLAG_OPTS) { if (v !== undefined) throw new UsageError(`${a} takes no value`); o[FLAG_OPTS[a]] = true; continue; }
    if (!(a in VALUE_OPTS)) throw new UsageError(`unknown option ${JSON.stringify(a)}`);
    if (v === undefined) { if (i + 1 >= argv.length) throw new UsageError(`${a} needs a value`); v = argv[++i]; }
    const k = VALUE_OPTS[a];
    if (k in o) throw new UsageError(`${a} given twice`);
    o[k] = v;
  }
  return o;
}

// ------------------------------------------------------------------------------------------------ helpers

const clone = (/** @type {any} */ v) => (v === undefined ? undefined : JSON.parse(JSON.stringify(v)));
const fmt = (/** @type {any} */ v) => JSON.stringify(v ?? null);
const stable = (/** @type {any} */ obj) => `${JSON.stringify(obj, null, 2)}\n`;
const words = (/** @type {string} */ code) => CODE_WORDS[/** @type {keyof typeof CODE_WORDS} */ (code)] ?? code;

// Control characters (C0, DEL and C1) are never part of a passage, name or address copied from a page, and they can
// rewrite a terminal. Free text (quotation, statement, method, reasons, string values) may hold tabs and line feeds;
// every other option is one line. A carriage return is refused (a --quote-file has CRLF turned into LF first).
const CONTROL_TEXT = /[\u0000-\u0008\u000b-\u001f\u007f-\u009f]/;
const CONTROL_LINE = /[\u0000-\u001f\u007f-\u009f]/;
const MULTI_LINE_OPTS = new Set(['quote', 'statement', 'method', 'withholdReason', 'outdatedReason']);
/** The control characters in a string, written U+XXXX. @param {string} s */
const controlsIn = (s) => [...new Set([...s].filter((c) => CONTROL_LINE.test(c)).map((c) => `U+${c.codePointAt(0)?.toString(16).toUpperCase().padStart(4, '0')}`))].join(', ');
/** Every string in a JSON value, object keys included. @param {any} v @returns {string[]} */
const textLeaves = (v) => (typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(textLeaves) : v && typeof v === 'object' ? Object.entries(v).flatMap(([k, x]) => [k, ...textLeaves(x)]) : []);

// The same host rules as the policy's own hostsOf (src/lib/publication.mjs, not exported): the official host is the
// record's website value; university hosts add every host a tier 1 or 2 entry cites. Cross-checked below against
// toPublicRecord for every claim the projection exposes, so a drift between the two is reported, never hidden.
const hostOf = (/** @type {string} */ u) => { try { return new URL(u).hostname.toLowerCase().replace(/^www\./, ''); } catch { return null; } };
/** @param {any} rec @param {any[]} entries */
function hostsOf(rec, entries) {
  const official = new Set();
  const w = rec?.website?.value;
  if (typeof w === 'string' && isHttpsUrl(w)) { const h = hostOf(w); if (h) official.add(h); }
  const university = new Set(official);
  for (const e of entries) if (e.sourceTier === 1 || e.sourceTier === 2) { const h = hostOf(e.sourceUrl); if (h) university.add(h); }
  return { officialHosts: [...official], universityHosts: [...university] };
}

/** @param {string} path @param {any} rec @param {any[]} entries */
function evaluate(path, rec, entries) {
  const claim = listClaims(rec).find((c) => c.path === path)?.claim;
  const r = evaluateClaim(path, claim, entries, { now: NOW, ...hostsOf(rec, entries) });
  return { show: r.show, code: r.code, words: words(r.code), publicState: r.publicState };
}

/**
 * Rule R10 of tests/records-evidence.mjs, exactly: every claim (or item) marked verified needs an evidence entry for the
 * same claimPath that is verified and deep-equal in value. Returns the claim paths that fail.
 * @param {any} rec parsed record @param {any[]} entries
 */
export function r10Failures(rec, entries) {
  return listClaims(rec).filter(({ path, claim }) => claim.status === 'verified'
    && !entries.some((e) => e.claimPath === path && e.status === 'verified' && deepEqual(e.value, claim.value))).map((c) => c.path);
}

/**
 * Find the object a claim path points at in the RAW record JSON (the file as written, so the write keeps its keys and
 * their order). Same grammar as listClaims. Returns every match (more than one means ids that collide).
 * @param {any} raw @param {string} path
 * @returns {{ kind: 'claim' | 'requirement' | 'documentRequirement', obj: any, programme?: any, deferred?: boolean }[]}
 */
function rawTargets(raw, path) {
  const out = [];
  const isObj = (/** @type {any} */ v) => !!v && typeof v === 'object' && !Array.isArray(v);
  if (!path.includes('.')) { if (isObj(raw?.[path]) && 'value' in raw[path]) out.push({ kind: 'claim', obj: raw[path] }); return /** @type {any} */ (out); }
  for (const [list, deferred] of [[raw?.programmes, false], [raw?.deferredProgrammes, true]]) {
    for (const p of Array.isArray(list) ? list : []) {
      const base = `programmes.${p?.id}.`;
      if (!isObj(p) || !path.startsWith(base)) continue;
      const rest = path.slice(base.length);
      let m;
      if ((m = /^otherMandatoryCosts\.(\d+)$/.exec(rest))) { const c = p.otherMandatoryCosts?.[Number(m[1])]; if (isObj(c?.cost)) out.push({ kind: 'claim', obj: c.cost, programme: p, deferred }); }
      else if (rest.startsWith('requirements.')) { for (const r of p.requirements ?? []) if (`requirements.${r?.id}` === rest) out.push({ kind: 'requirement', obj: r, programme: p, deferred }); }
      else if (rest.startsWith('documents.')) { for (const d of p.documents ?? []) if (`documents.${d?.id}` === rest) out.push({ kind: 'documentRequirement', obj: d, programme: p, deferred }); }
      else if (!rest.includes('.') && isObj(p[rest]) && 'value' in p[rest]) out.push({ kind: 'claim', obj: p[rest], programme: p, deferred });
    }
  }
  for (const r of Array.isArray(raw?.preparatoryRoutes) ? raw.preparatoryRoutes : []) {
    const base = `preparatoryRoutes.${r?.id}.`;
    if (!isObj(r) || !path.startsWith(base)) continue;
    const rest = path.slice(base.length);
    if (!rest.includes('.') && isObj(r[rest]) && 'value' in r[rest]) out.push({ kind: 'claim', obj: r[rest] });
  }
  return /** @type {any} */ (out);
}

/** The public, non-source keys an item's value may carry. @param {'requirement' | 'documentRequirement'} kind */
const itemKeys = (kind) => Object.entries(FIELD_POLICY[kind]).filter(([k, cls]) => cls === 'public' && k !== 'source' && k !== 'checked').map(([k]) => k);

/**
 * Set a claim (or item) in the raw record from an entry. Mutates `raw`. Returns an error string or null.
 * @param {any} raw @param {string} path @param {any} entry @param {{ note?: boolean }} [opts]
 */
function applyToRaw(raw, path, entry, { note = true } = {}) {
  const t = rawTargets(raw, path);
  if (t.length !== 1) return t.length ? `the claim path ${path} matches ${t.length} places in the record (ids collide)` : `the claim path ${path} was not found in the record file`;
  const { kind, obj } = t[0];
  if (kind === 'claim') obj.value = clone(entry.value);
  else {
    const v = entry.value;
    if (!v || typeof v !== 'object' || Array.isArray(v)) return `a ${kind === 'requirement' ? 'requirement' : 'document'} item's value must be an object of its fields (${itemKeys(kind).join(', ')})`;
    const allowed = itemKeys(kind);
    const extra = Object.keys(v).filter((k) => !allowed.includes(k));
    if (extra.length) return `the value has field(s) the item cannot hold: ${extra.join(', ')} (allowed: ${allowed.join(', ')})`;
    for (const k of allowed) { if (k in v) obj[k] = clone(v[k]); else delete obj[k]; }
  }
  obj.status = 'verified';
  obj.source = entry.sourceUrl;
  obj.checked = entry.accessed;
  if (note) obj.note = `Evidence entry ${entry.id} (accessed ${entry.accessed}).`;
  return null;
}

/** Count shown and withheld facts in a projection (as scripts/publication-report.mjs does). @param {any} o */
function tally(o, t = { shown: 0, withheld: 0 }) {
  if (Array.isArray(o)) o.forEach((x) => tally(x, t));
  else if (o && typeof o === 'object') {
    if ('publicState' in o && 'show' in o) { if (o.show) t.shown++; else t.withheld++; return t; }
    if (o.publicState === 'verified') t.shown++;
    for (const v of Object.values(o)) tally(v, t);
  }
  return t;
}

/**
 * Where toPublicRecord exposes the claim, its projected show/state (null when the projection has no place for it:
 * deferred or unlisted programmes, internal fields, routes or items that are withheld as a whole).
 * @param {any} pub @param {string} path
 */
function projected(pub, path) {
  if (!path.includes('.')) return pub[path] && 'show' in pub[path] ? { show: pub[path].show, publicState: pub[path].publicState } : null;
  let m;
  if ((m = /^programmes\.([^.]+)\.([^.]+)$/.exec(path))) {
    const p = pub.programmes.find((/** @type {any} */ x) => x.id === m[1]);
    return p && p[m[2]] && 'show' in p[m[2]] ? { show: p[m[2]].show, publicState: p[m[2]].publicState } : null;
  }
  if ((m = /^programmes\.([^.]+)\.(requirements|documents)\.([^.]+)$/.exec(path))) {
    const p = pub.programmes.find((/** @type {any} */ x) => x.id === m[1]);
    if (!p) return null;
    return p[m[2]].some((/** @type {any} */ i) => i.id === m[3]) ? { show: true, publicState: 'verified' } : null;
  }
  return null;
}

/** @param {string} path @param {any} rec */
function placeNote(path, rec) {
  let m;
  if ((m = /^programmes\.([^.]+)\.([^.]+)/.exec(path))) {
    if ((rec.deferredProgrammes ?? []).some((/** @type {any} */ p) => p.id === m[1])) return `programme "${m[1]}" is in deferredProgrammes: none of its facts appears on a page until an official page shows that international applicants are admitted and it moves to programmes[] (rule R9)`;
    if (FIELD_POLICY.programme[/** @type {keyof typeof FIELD_POLICY.programme} */ (m[2])] === 'internal') return `the field ${m[2]} is internal: it never appears on a page, whatever the evidence`;
  }
  return null;
}

// ------------------------------------------------------------------------------------------------ main

/**
 * Run the tool. Returns { code, result, lines } (no process exit, so tests can import it if they want).
 * @param {string[]} argv
 */
export function run(argv) {
  /** @type {string[]} */ const lines = [];
  const out = (/** @type {string} */ s = '') => lines.push(s);
  const result = {
    ok: false, dryRun: true, refused: /** @type {string[]} */ ([]), warnings: /** @type {string[]} */ ([]), id: /** @type {string | null} */ (null),
    entry: /** @type {any} */ (null), evaluation: /** @type {any} */ ({ now: null, ifApplied: null, asPublish: null }),
    profile: /** @type {any} */ (null), r10: { before: /** @type {string[]} */ ([]), after: /** @type {string[]} */ ([]) },
    recordChange: /** @type {any} */ (null), markedOutdated: /** @type {string | null} */ (null), reused: /** @type {string | null} */ (null), wrote: { evidence: false, record: false },
  };
  const refuse = (/** @type {string} */ s) => { result.refused.push(s); };
  const warn = (/** @type {string} */ s) => { result.warnings.push(s); };
  const finish = (/** @type {number} */ code) => ({ code, result, lines });

  /** @type {Record<string, any>} */ let o;
  try { o = parseArgs(argv); } catch (e) { if (e instanceof UsageError) { refuse(`usage: ${e.message} (see --help)`); return finish(2); } throw e; }
  if (o.help) { out(USAGE); result.ok = true; return finish(0); }
  const usage = (/** @type {string} */ s) => { refuse(`usage: ${s} (see --help)`); return finish(2); };
  if (o.dryRun && o.write) return usage('--dry-run and --write contradict each other');
  if (!o.slug) return usage('--slug is required');
  if (!o.path && !o.markOutdated) return usage('nothing to do: give --path (a new entry) and/or --mark-outdated <id>');
  if (o.apply && !o.path) return usage('--apply-to-record needs a new entry (--path ...)');
  if (o.outdatedReason !== undefined && !o.markOutdated) return usage('--outdated-reason goes with --mark-outdated');
  const entryOnly = ENTRY_OPTS.filter((k) => o[k] !== undefined);
  if (!o.path && entryOnly.length) return usage(`${entryOnly.map(optName).join(', ')} only make${entryOnly.length === 1 ? 's' : ''} sense with --path (a new entry)`);
  result.dryRun = !o.write;
  for (const [k, v] of Object.entries(o)) {
    if (typeof v !== 'string' || k === 'value') continue; // --value is JSON: its strings are checked once it is parsed
    if ((MULTI_LINE_OPTS.has(k) ? CONTROL_TEXT : CONTROL_LINE).test(v)) refuse(`${optName(k)} contains a control character (${controlsIn(v)}${MULTI_LINE_OPTS.has(k) ? '; only tabs and line feeds are kept in free text' : ''}): retype it, or copy it again from the source`);
  }
  if (result.refused.length) return report(finish(1), out);
  if (!SLUG.test(o.slug)) { refuse(`the slug "${o.slug}" is not a lower-case slug`); return finish(1); }

  const recordsDir = resolve(o.recordsDir ?? process.env.UMA_UNIVERSITIES_DIR ?? join(SITE, 'src/content/universities'));
  const evDir = resolve(o.evidenceDir ?? process.env.UMA_EVIDENCE_DIR ?? join(SITE, 'data/evidence'));
  const recordFile = join(recordsDir, `${o.slug}.json`);
  const evFile = join(evDir, `${o.slug}.json`);

  // ---- the record
  if (!existsSync(recordFile)) { refuse(`no record file ${recordFile}`); return finish(1); }
  const recordText = readFileSync(recordFile, 'utf8');
  let rawRecord;
  try { rawRecord = JSON.parse(recordText); } catch (e) { refuse(`the record file is not valid JSON: ${/** @type {Error} */ (e).message}`); return finish(1); }
  const parsedRecord = recordSchema.safeParse(rawRecord);
  if (!parsedRecord.success) { refuse(`the record file does not match the record format: ${parsedRecord.error.issues.slice(0, 5).map((i) => `${i.path.join('.')}: ${i.message}`).join(' | ')}`); return finish(1); }
  const rec = parsedRecord.data;
  if (rec.slug !== o.slug) { refuse(`the record file ${o.slug}.json carries the slug "${rec.slug}"`); return finish(1); }

  // ---- the evidence file
  if (!existsSync(evFile)) { refuse(`no evidence file ${evFile}: create it with its access block first (UNIVERSITY_EVIDENCE_STANDARD.md §3); this tool never invents an access block`); return finish(1); }
  const evText = readFileSync(evFile, 'utf8');
  let evRaw;
  try { evRaw = JSON.parse(evText); } catch (e) { refuse(`the evidence file is not valid JSON: ${/** @type {Error} */ (e).message}`); return finish(1); }
  const evParsed = parseEvidence(evRaw);
  if (evParsed.state !== 'ok') { refuse(`the evidence file does not match the evidence format; fix it first: ${evParsed.errors.slice(0, 5).join(' | ')}`); return finish(1); }
  if (evParsed.data.slug !== o.slug) { refuse(`the evidence file ${o.slug}.json carries the slug "${evParsed.data.slug}"`); return finish(1); }
  if (stable(evRaw) !== evText) { refuse('the evidence file is not in the standard JSON layout (2-space indent, trailing newline); writing would reformat it, so reformat it in a separate change first'); return finish(1); }
  if (o.apply && stable(rawRecord) !== recordText) { refuse('the record file is not in the standard JSON layout (2-space indent, trailing newline); writing would reformat it, so reformat it in a separate change first'); return finish(1); }
  const oldEntries = evParsed.data.entries;
  const access = evParsed.data.access;
  result.r10.before = r10Failures(rec, oldEntries);

  out(`Evidence entry tool: ${o.slug}${result.dryRun ? ' (DRY RUN: nothing is written; add --write to record it)' : ''}`);
  out(`  Record:   ${recordFile}`);
  out(`  Evidence: ${evFile} (${oldEntries.length} entr${oldEntries.length === 1 ? 'y' : 'ies'}; access ${access.status}, checked ${access.checked})`);
  out(`  Policy evaluated on ${TODAY}.`);

  const finalEntries = clone(evRaw.entries);
  let finalRaw = clone(rawRecord);
  /** @type {any} */ let entry = null;

  /**
   * Mark an existing entry outdated (status outdated, decision withhold, the reason): the ONLY change this tool ever makes
   * to an existing entry. Done before a new entry is evaluated, so a correction is judged against the corrected file.
   * @param {string | null} newId
   */
  const markOutdated = (newId) => {
    const i = finalEntries.findIndex((/** @type {any} */ e) => e.id === o.markOutdated);
    if (i < 0) { refuse(`--mark-outdated: "${o.markOutdated}" is not an existing entry in this file`); return; }
    if (finalEntries[i].status === 'outdated') { refuse(`--mark-outdated: ${o.markOutdated} is already outdated`); return; }
    const reason = o.outdatedReason ?? (newId ? `Superseded by ${newId} (recorded ${TODAY}).` : undefined);
    if (!reason || !String(reason).trim()) { refuse('--mark-outdated without a new entry needs --outdated-reason "<why>"'); return; }
    finalEntries[i] = { ...finalEntries[i], status: 'outdated', decision: 'withhold', withholdReason: reason };
    result.markedOutdated = o.markOutdated;
    out(`  Mark outdated: ${o.markOutdated} (claim ${finalEntries[i].claimPath}): status outdated, decision withhold, reason ${fmt(reason)}`);
  };

  // ---- a new entry
  if (o.path) {
    const path = String(o.path);
    const claims = listClaims(rec);
    const claim = claims.find((c) => c.path === path);
    if (!claim) {
      const head = path.split('.').slice(0, -1).join('.');
      const near = claims.map((c) => c.path).filter((p) => (head ? p.startsWith(`${head}.`) : !p.includes('.'))).slice(0, 15);
      refuse(`unknown claim path "${path}": it does not resolve to a claim in the record. ${near.length ? `Claim paths ${head ? `under ${head}` : 'at record level'}: ${near.join(', ')}` : 'The first column of the register (research/verification/<slug>/EVIDENCE_REGISTER.md) lists every claim path.'}`);
      return report(finish(1), out);
    }
    out('');
    out(`Claim ${path}`);
    out(`  Record now: status ${claim.claim.status}, value ${fmt(claim.claim.value)}, source ${claim.claim.source ?? '-'}, checked ${claim.claim.checked ?? '-'}`);
    const same = oldEntries.filter((e) => e.claimPath === path);
    out(same.length ? `  Entries already recorded for it: ${same.map((e) => `${e.id} (${e.status}, ${e.decision}${e.status === 'verified' ? `, value ${fmt(e.value)}` : ''})`).join('; ')}` : '  Entries already recorded for it: none');

    // options present?
    const missing = ['value', 'statement', 'url', 'org', 'tier', 'type', 'accessed', 'status', 'reviewer', 'method', 'decision'].filter((k) => o[k] === undefined);
    if (o.quote === undefined && o.quoteFile === undefined) missing.push('quote');
    if (missing.length) { refuse(`missing: ${missing.map(optName).join(', ')} (use --quote "" only to record a page that is silent, UNIVERSITY_EVIDENCE_STANDARD.md §5.1)`); return report(finish(1), out); }
    if (o.quote !== undefined && o.quoteFile !== undefined) { refuse('give --quote or --quote-file, not both'); return report(finish(1), out); }
    let value;
    try { value = JSON.parse(o.value); } catch { refuse(`--value is not valid JSON: ${o.value}. Strings need double quotes inside the shell quotes, e.g. --value '"12 semesters"'; use null for a silent page`); return report(finish(1), out); }
    const badLeaf = textLeaves(value).find((s) => CONTROL_TEXT.test(s));
    if (badLeaf !== undefined) { refuse(`--value contains a control character (${controlsIn(badLeaf)}): retype it, or copy it again from the source`); return report(finish(1), out); }
    let quotation = o.quote;
    if (o.quoteFile !== undefined) {
      // A byte-order mark and Windows line endings come from the editor, not the source: drop the mark, CRLF -> LF.
      try { quotation = readFileSync(resolve(o.quoteFile), 'utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').replace(/\n+$/, ''); } catch (e) { refuse(`cannot read --quote-file: ${/** @type {Error} */ (e).message}`); return report(finish(1), out); }
      if (CONTROL_TEXT.test(quotation)) { refuse(`--quote-file contains a control character (${controlsIn(quotation)}; only tabs and line feeds are kept): copy the passage again from the capture`); return report(finish(1), out); }
    }
    if (!/^[1-5]$/.test(String(o.tier))) { refuse('--tier must be 1, 2, 3, 4 or 5 (UNIVERSITY_EVIDENCE_STANDARD.md §6)'); return report(finish(1), out); }
    const contradicts = o.contradicts === undefined ? [] : String(o.contradicts).split(',').map((s) => s.trim()).filter(Boolean);
    const n = 1 + oldEntries.filter((e) => e.claimPath === path).reduce((mx, e) => Math.max(mx, Number(e.id.slice(`${o.slug}/${path}/`.length)) || 0), 0);
    const id = `${o.slug}/${path}/${n}`;
    entry = {
      id, claimPath: path, statement: o.statement, value, sourceUrl: o.url, sourceOrganisation: o.org, sourceTier: Number(o.tier),
      evidenceType: o.type, quotation, effectiveDate: o.effective ?? null, academicYear: o.academicYear ?? null, accessed: o.accessed,
      captureRef: o.captureRef ?? null, status: o.status, reviewer: o.reviewer, method: o.method, contradicts,
      nextReview: o.nextReview ?? null, decision: o.decision, withholdReason: o.withholdReason ?? null,
    };
    // Running the same command twice must not record the same reading twice: an identical live entry is reused by
    // --apply-to-record (nothing appended) and refused otherwise.
    const dup = oldEntries.find((e) => e.status !== 'outdated' && deepEqual({ ...e, id: '' }, { ...entry, id: '' }));
    if (dup && !o.apply) { refuse(`an identical entry is already recorded as ${dup.id}: nothing to add. To apply it to the record, run the same command with --apply-to-record`); return report(finish(1), out); }
    if (dup) { entry = clone(dup); result.reused = dup.id; out(`  Identical to the recorded entry ${dup.id}: nothing is appended; --apply-to-record applies that entry.`); }
    else out(`  New entry id: ${id}`);
    result.id = entry.id; result.entry = entry;
    if (o.markOutdated) markOutdated(entry.id);

    // the evidence schema (the real one), on the whole file with the entry appended
    const idx = finalEntries.length;
    if (!dup) finalEntries.push(entry);
    const schema = parseEvidence({ ...evRaw, entries: finalEntries });
    if (schema.state !== 'ok') {
      for (const err of schema.errors) {
        const m = /^entries\.(\d+)\.([A-Za-z]+)(?:\.\d+)?: (.*)$/.exec(err);
        if (m && Number(m[1]) === idx) refuse(`${FIELD_OPTION[/** @type {keyof typeof FIELD_OPTION} */ (m[2])] ?? m[2]}: ${m[3]}`);
        else refuse(`evidence format: ${err}`);
      }
    }
    // the tool's own rules (each one restates a POLICY rule of UNIVERSITY_EVIDENCE_STANDARD.md)
    for (const c of contradicts) if (!oldEntries.some((e) => e.id === c)) refuse(`--contradicts: "${c}" is not an entry in this file`);
    if (isIsoDate(o.accessed) && o.accessed > TODAY) refuse(`--accessed ${o.accessed} is in the future`);
    if (o.decision === 'publish' && o.status !== 'verified') refuse('a publish decision needs --status verified (§3.1, §5)');
    if (o.decision === 'publish' && !String(quotation ?? '').trim()) refuse('a publish decision needs the exact quotation from the source (§4 point 2)');
    if (o.decision === 'publish' && o.withholdReason !== undefined) refuse('--withhold-reason is only for --decision withhold (it is null when publishing)');
    if (o.type === 'owner-capture' && !String(o.captureRef ?? '').trim()) refuse('--type owner-capture needs --capture-ref (the capture file name; the file stays outside the repository)');
    if (o.captureRef !== undefined && /[\\/]/.test(o.captureRef)) refuse('--capture-ref is a file name only, never a path: captures stay outside the repository (§2)');
    if (access.status !== 'open' && (o.type === 'web-page' || o.type === 'pdf')) refuse(`the evidence file's access block says "${access.status}" (checked ${access.checked}): a ${o.type} entry means the page was read directly (Route A), which needs the fetch test first (§11.2 step 1: set the access block to "open" with the date and the hosts). Record a capture made in an ordinary browser as --type owner-capture (Route B)`);
    if (o.captureRef && !o.captureRef.startsWith(`${o.slug}--`)) warn(`--capture-ref does not follow the register's naming convention ${o.slug}--NN--short-name.ext`);
    if (!allowedTiers(path).includes(Number(o.tier))) warn(`tier ${o.tier} is not accepted for ${path} (accepted: ${allowedTiers(path).join(', ')}); the policy will not show the claim from this entry`);
    const ayStart = academicYearStart(entry.academicYear);
    if (isIsoDate(entry.nextReview) && !Number.isNaN(ayStart) && entry.nextReview > `${ayStart + 1}-06-30`) warn(`--next-review ${entry.nextReview} is later than 30 June ${ayStart + 1}, the proposed default end of the ${entry.academicYear} academic year (§10.2-10.3; the default date is TO CONFIRM by the owner)`);
    if (isIsoDate(entry.nextReview) && isIsoDate(entry.accessed) && !isTimeSensitive(path) && Date.parse(entry.nextReview) - Date.parse(entry.accessed) > 366 * 86400000) warn('--next-review is more than 12 months after --accessed (proposed ceiling for claims that are not time-sensitive, §10.4, TO CONFIRM)');
    if (isTimeSensitive(path) && entry.nextReview === null) warn(`${path} is time-sensitive: without --next-review the policy will not show it (§10)`);

    // does the value fit the record field? (an entry whose value the record cannot hold can never match it)
    const hypRaw = clone(rawRecord);
    let hypRec = null;
    if (value === null && rawTargets(rawRecord, path)[0]?.kind !== 'claim') { /* a silent page for an item: nothing to apply */ }
    else {
      const err = applyToRaw(hypRaw, path, entry, { note: false });
      if (err) refuse(`--value: ${err}`);
      else {
        const p = recordSchema.safeParse(hypRaw);
        if (!p.success) refuse(`--value does not fit the record field ${path}: ${p.error.issues.slice(0, 4).map((i) => `${i.path.join('.')}: ${i.message}`).join(' | ')}`);
        else hypRec = p.data;
      }
    }

    // the real policy
    if (schema.state === 'ok') {
      const entries = schema.data.entries;
      result.evaluation.now = evaluate(path, rec, entries);
      if (hypRec) {
        result.evaluation.ifApplied = evaluate(path, hypRec, entries);
        const pub = toPublicRecord(hypRec, { slug: o.slug, access, entries }, { now: NOW });
        const pj = projected(pub, path);
        if (pj && (pj.show !== result.evaluation.ifApplied.show || pj.publicState !== result.evaluation.ifApplied.publicState)) refuse(`internal check failed: evaluateClaim and toPublicRecord disagree for ${path} (tool out of step with src/lib/publication.mjs)`);
        const before = tally(toPublicRecord(rec, { slug: o.slug, access, entries: oldEntries }, { now: NOW }));
        const after = tally(pub);
        const pubEval = evaluatePublication(hypRec, { slug: o.slug, access, entries }, { now: NOW });
        const pid = /^programmes\.([^.]+)\./.exec(path)?.[1];
        const nl = pid ? pubEval.notListed.find((x) => x.id === pid) : undefined;
        result.profile = { shownBefore: before.shown, shownAfter: after.shown, publishable: pubEval.publishable, failures: pubEval.failures.length, programmeListed: pid ? (rec.programmes.some((p) => p.id === pid) ? !nl : false) : null, programmeNote: nl?.message ?? null };
      }
      if (!(entry.status === 'verified' && entry.decision === 'publish') && hypRec) {
        const asP = entries.map((e) => (e.id === id ? { ...e, status: 'verified', decision: 'publish', withholdReason: null } : e));
        result.evaluation.asPublish = evaluate(path, hypRec, asP);
      }
      // a publish decision is the reviewer's statement that §4 holds: refuse one the real policy would not show
      if (entry.decision === 'publish' && result.evaluation.ifApplied && !result.evaluation.ifApplied.show) refuse(`the decision is publish, but the publication policy would not show this claim from it (${result.evaluation.ifApplied.code}: ${result.evaluation.ifApplied.words}). Fix the entry, or record what was read with --decision withhold and a --withhold-reason`);
    }

    // apply to the record
    if (o.apply) {
      if (!(entry.status === 'verified' && entry.decision === 'publish')) refuse(`--apply-to-record applies only an entry that is verified with the decision publish; this one is ${entry.status} / ${entry.decision}, so the record is not touched`);
      const t = rawTargets(rawRecord, path)[0];
      if (!t) refuse(`--apply-to-record: the claim path ${path} was not found in the record file`);
      else if (t.deferred && /\.internationalAdmission$/.test(path) && value === true) refuse(`programme "${t.programme.id}" is in deferredProgrammes: move it to programmes[] first (rule R9), then apply this entry`);
      else if (t.programme && !t.deferred && /^programmes\.[^.]+\.internationalAdmission$/.test(path) && value !== true) refuse(`programme "${t.programme.id}" is in programmes[], which holds only programmes open to international applicants (rule R9); an entry saying ${fmt(value)} means it moves to deferredProgrammes[] first (by hand, in its own commit), then apply this entry`);
      if (!result.refused.length) {
        const before = clone(t.obj);
        const err = applyToRaw(finalRaw, path, entry);
        if (err) refuse(`--apply-to-record: ${err}`);
        else result.recordChange = { path, before, after: clone(rawTargets(finalRaw, path)[0].obj) };
      }
    }
  }

  // ---- mark an older entry outdated (no new entry)
  if (o.markOutdated && !o.path) { out(''); markOutdated(null); }

  // ---- final checks on exactly what would be written
  const finalEv = { ...evRaw, entries: finalEntries };
  const finalParsed = parseEvidence(finalEv);
  const finalRec = recordSchema.safeParse(finalRaw);
  if (!result.refused.length) {
    if (finalParsed.state !== 'ok') refuse(`the evidence file would not match the evidence format: ${finalParsed.errors.slice(0, 3).join(' | ')}`);
    if (!finalRec.success) refuse('the record would not match the record format');
  }
  if (finalParsed.state === 'ok' && finalRec.success) {
    result.r10.after = r10Failures(finalRec.data, finalParsed.data.entries);
    const added = result.r10.after.filter((p) => !result.r10.before.includes(p));
    if (added.length) refuse(`this change would break rule R10 (a claim marked verified needs a verified evidence entry with exactly the same value) for: ${added.join(', ')}. ${result.markedOutdated && !o.apply ? 'Set that record claim to "outdated" (with a note) first, or record the replacement entry with --apply-to-record in the same command' : 'Nothing was changed'}`);
    if (result.recordChange) {
      const c = listClaims(finalRec.data).find((x) => x.path === entry.claimPath)?.claim;
      if (!(c && c.status === 'verified' && deepEqual(c.value, entry.value) && c.source === entry.sourceUrl && c.checked === entry.accessed)) refuse('internal check failed: the record claim does not equal the entry after applying it');
    }
    if (result.markedOutdated) {
      const p = finalParsed.data.entries.find((e) => e.id === result.markedOutdated)?.claimPath;
      if (p) result.evaluation.outdatedClaim = { path: p, ...evaluate(p, finalRec.data, finalParsed.data.entries) };
    }
  }

  // ---- print
  if (entry) {
    out('');
    out('Entry:');
    for (const l of JSON.stringify(entry, null, 2).split('\n')) out(`  ${l}`);
    const ev = result.evaluation;
    out('');
    out(`Publication policy (src/lib/publication.mjs) for ${entry.claimPath}:`);
    const line = (/** @type {any} */ r) => (r.show ? 'WOULD BE SHOWN' : `would NOT be shown (${r.code}): ${r.words}`);
    if (ev.now) out(`  As the record stands now, with this entry: ${line(ev.now)}`);
    if (ev.ifApplied) out(`  If applied to the record (--apply-to-record): ${line(ev.ifApplied)}`);
    if (ev.asPublish) out(`  If it were recorded as verified with the decision publish: ${line(ev.asPublish)}`);
    const pn = placeNote(entry.claimPath, rec);
    if (pn) out(`  Note: ${pn}.`);
    if (result.profile) {
      out(`  Public profile if applied: ${result.profile.shownAfter} fact(s) shown on the page (now ${result.profile.shownBefore}); the profile ${result.profile.publishable ? 'passes' : `still fails ${result.profile.failures} publication check(s) (npm run report:publication)`}.`);
      if (result.profile.programmeNote) out(`  ${result.profile.programmeNote}`);
    }
  }
  if (result.evaluation.outdatedClaim) { const r = result.evaluation.outdatedClaim; out(`  After marking outdated, ${r.path}: ${r.show ? 'WOULD BE SHOWN' : `would NOT be shown (${r.code}): ${r.words}`}`); }
  if (result.recordChange) {
    out('');
    out(`Record change (${entry.claimPath}):`);
    out(`  before: ${fmt(result.recordChange.before)}`);
    out(`  after:  ${fmt(result.recordChange.after)}`);
  }
  out('');
  out(`R10 (verified record claims backed by an equal verified entry): ${result.r10.after.length ? `failing for ${result.r10.after.join(', ')}` : 'holds'}${result.r10.before.length ? ` (already failing before this change: ${result.r10.before.join(', ')})` : ''}`);
  if (result.refused.length) return report(finish(1), out);

  // ---- write (only with --write)
  if (o.write) {
    writeStable(evFile, finalEv);
    result.wrote.evidence = true;
    if (result.recordChange) { writeStable(recordFile, finalRaw); result.wrote.record = true; }
    out('');
    out(`Written: ${evFile}${result.wrote.record ? ` and ${recordFile}` : ''}.`);
    out('Next: regenerate the register (python3 -I site/scripts/make-evidence-register.py <slug>, from the repository root), then npm run test:records and npm run report:publication.');
  } else {
    out('');
    out(`Dry run: nothing written. ${o.apply ? 'Add --write to record the entry and apply it to the record.' : 'Add --write to record it.'}`);
  }
  result.ok = true;
  return report(finish(0), out);
}

/** Append warnings and refusals to the printed lines. @param {{ code: number, result: any, lines: string[] }} r @param {(s?: string) => void} out */
function report(r, out) {
  if (r.result.warnings.length) { out(''); for (const w of r.result.warnings) out(`WARNING: ${w}`); }
  if (r.result.refused.length) { out(''); for (const x of r.result.refused) out(`REFUSED: ${x}`); out('Nothing was written.'); }
  return r;
}

/** Write JSON with 2-space indent and a trailing newline, through a temporary file and a rename. @param {string} file @param {any} obj */
function writeStable(file, obj) {
  const tmp = `${file}.tmp-${process.pid}`;
  try { writeFileSync(tmp, stable(obj)); renameSync(tmp, file); } catch (e) { try { unlinkSync(tmp); } catch { /* none */ } throw e; }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const json = process.argv.includes('--json');
  const r = run(process.argv.slice(2));
  if (json) console.log(JSON.stringify(r.result, null, 2));
  else {
    console.log(r.lines.join('\n'));
    if (r.code === 2) console.error(r.result.refused.join('\n'));
  }
  process.exit(r.code);
}
