// Publication report: for every university record, whether it can be published and, if not, exactly what is missing,
// in plain words. Uses the same policy as the build (src/lib/publication.mjs) and the same evidence store
// (data/evidence/<slug>.json). Changes nothing.
//
//   node scripts/publication-report.mjs                          every record
//   node scripts/publication-report.mjs <slug>                   one record
//   node scripts/publication-report.mjs --overview-hash <slug>   the SHA-256 of the record's overview text as it is now,
//                                                                for verification.editorialReview.overviewSha256 (N24 a)
//
// Exit code 1 when a record is flagged publishable but fails the policy (a production build would stop), else 0.
import { record as recordSchema } from '../src/content/schema.mjs';
import { readRecordFiles, loadEvidence, universitiesDir, evidenceDir } from '../src/lib/evidence.mjs';
import { publicationDecision, evaluatePublication, currentAcademicYear, editorialTextHash } from '../src/lib/publication.mjs';
import * as SETTINGS from '../src/lib/publication-config.mjs';
import { relative } from 'node:path';

const now = new Date();
if (process.argv[2] === '--overview-hash') {
  const slug = process.argv[3];
  const row = readRecordFiles(recordSchema, { dir: universitiesDir() }).find((r) => r.file === `${slug}.json`);
  if (!slug || !row?.data) { console.error(`No valid record "${slug ?? ''}" in ${universitiesDir()}.`); process.exit(1); }
  console.log(editorialTextHash(row.data.overview));
  console.error(`SHA-256 of the overview of ${slug} exactly as it is now. Put it in verification.editorialReview.overviewSha256 with the reviewer and today's date, only after reading the overview and confirming it says nothing beyond the verified facts.`);
  process.exit(0);
}
const only = process.argv[2];
const rows = readRecordFiles(recordSchema, { dir: universitiesDir() }).filter((r) => !only || r.file === `${only}.json`);
const today = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Count shown and withheld claims in a projection. @param {any} o */
function tally(o, t = { shown: 0, withheld: 0 }) {
  if (Array.isArray(o)) o.forEach((x) => tally(x, t));
  else if (o && typeof o === 'object') {
    if ('publicState' in o && 'show' in o) { if (o.show) t.shown++; else t.withheld++; return t; }
    if (o.publicState === 'verified') t.shown++; // a projected requirement or document item
    for (const v of Object.values(o)) tally(v, t);
  }
  return t;
}

console.log(`Publication report, ${today} (academic year ${currentAcademicYear(now)})`);
const show = (/** @type {string} */ dir) => { const r = relative(process.cwd(), dir); return r && !r.startsWith('..') ? r : dir; };
console.log(`Records: ${show(universitiesDir())} · Evidence: ${show(evidenceDir())}`);
console.log('A profile is published only when its "publishable" flag is set AND every check below passes.');
// The owner settings in force (src/lib/publication-config.mjs; PUBLICATION_POLICY_DECISIONS.md explains each).
const yn = (/** @type {boolean} */ b) => (b ? 'yes' : 'no');
console.log(`Owner settings (src/lib/publication-config.mjs): overview needs an editorial review ${yn(SETTINGS.OVERVIEW_REQUIRES_EDITORIAL_REVIEW)}; programme name must appear in the admission quotation ${yn(SETTINGS.PROGRAMME_NAME_REQUIRES_QUOTATION)}; city and region must appear in the verified address ${yn(SETTINGS.CITY_AND_REGION_REQUIRE_VERIFIED_ADDRESS)}; website must be listed on a government page ${yn(SETTINGS.WEBSITE_REQUIRES_GOVERNMENT_EVIDENCE)}; recognition authorities listed: ${SETTINGS.RECOGNITION_AUTHORITY_HOSTS.length ? SETTINGS.RECOGNITION_AUTHORITY_HOSTS.join(', ') : 'none (no recognition claim is shown)'}.\n`);

let blocked = 0, published = 0;
for (const { file, data, error } of rows) {
  if (!data) { console.log(`${file}\n  This file does not match the record format, so the site cannot be built: ${error}\n`); blocked++; continue; }
  const evidence = loadEvidence(data.slug);
  const d = publicationDecision(data, evidence, { now, preview: false });
  const { publicRecord } = evaluatePublication(data, evidence, { now });
  const t = tally(publicRecord);
  if (d.published) published++;
  if (d.buildError) blocked++;
  console.log(`${data.shortName} (${data.slug})`);
  console.log(`  Publishable flag: ${d.flagged ? 'yes' : 'no'} · Passes the publication policy: ${d.policyPasses ? 'yes' : 'no'} · Published: ${d.published ? 'YES' : 'NO'}`);
  if (d.buildError) console.log('  ATTENTION: the flag is set but the checks fail, so a production build will stop until this is fixed (or the flag is set back to false).');
  console.log(`  Evidence file: ${evidence.state === 'ok' ? `${evidence.data.entries.length} entries (official sites ${evidence.data.access.status === 'open' ? 'reachable' : 'blocked'} when last checked, ${evidence.data.access.checked})` : evidence.state === 'missing' ? 'none yet, so nothing counts as verified' : 'present but INVALID, so nothing counts as verified'}`);
  console.log(`  Facts a public page would show today: ${t.shown}; withheld as "To be confirmed": ${t.withheld}.`);
  const ew = publicRecord.editorialWithheld ?? {};
  const ownText = [ew.overview && 'the overview (no editorial review matching the current text)', ew.city && 'the city (not found in the verified address)', ew.region && 'the region (not found in the verified address)'].filter(Boolean);
  if (ownText.length) console.log(`  Our own text the page would leave out: ${ownText.join('; ')}.`);
  if (d.failures.length) {
    console.log('  What still blocks publication:');
    d.failures.forEach((f, i) => console.log(`    ${i + 1}. ${f.message}`));
  } else console.log('  Every publication check passes.');
  if (d.notListed.length) {
    console.log('  Programmes that would not be listed on the profile:');
    for (const n of d.notListed) console.log(`    - ${n.message}`);
  }
  console.log('');
}
console.log(`${rows.length} record${rows.length === 1 ? '' : 's'}: ${published} published, ${rows.length - published} not published${blocked ? `, ${blocked} blocking a production build` : ''}.`);
process.exit(blocked ? 1 : 0);
