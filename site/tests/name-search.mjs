// Directory name search (src/lib/name-search.mjs), run against the short names of the real records.
// 1. Official names, short forms and common spellings find the listed university as a full match.
// 2. A name of a different institution (the look-alikes in the private inventory) never comes back as a full match: it
//    returns nothing, or near matches that the page shows under a caution.
// 3. Generic queries show every card or the full matches, never a caution.
// 4. The variants and look-alike phrases contain no record's alternative name or withheld city in its own spelling (the
//    publication gate's leak check), and every look-alike phrase would be a false full match without the guard.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { LOOKALIKES, nameKind, normName, searchNames } from '../src/lib/name-search.mjs';

let checks = 0;
const failures = [];
const ok = (cond, msg) => { checks++; if (!cond) failures.push(msg); };

const dir = new URL('../src/content/universities/', import.meta.url).pathname;
const records = readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')));
const names = records.map((r) => r.shortName.toLowerCase());
const slugOf = (i) => records[i].slug;
const run = (q) => { const r = searchNames(q, names); return { tier: r.tier, slugs: r.show.flatMap((s, i) => (s ? [slugOf(i)] : [])) }; };
const has = (slug) => records.some((r) => r.slug === slug);

// 1. Full matches.
const finds = [
  ['Bukovinian', 'bukovinian-state-medical-university'], ['bukovina medical university', 'bukovinian-state-medical-university'],
  ['Bogomolets', 'bogomolets-national-medical-university'], ['bogomolets national medical university', 'bogomolets-national-medical-university'],
  ['kharkov medical university', 'kharkiv-national-medical-university'], ['Kharkiv National Medical University', 'kharkiv-national-medical-university'],
  ['odessa national medical university', 'odesa-national-medical-university'], ['ODESSA', 'odesa-national-medical-university'],
  ['pirogov', 'vinnytsia-national-pirogov-memorial-medical-university'], ['vinnitsa national medical university', 'vinnytsia-national-pirogov-memorial-medical-university'],
  ['pyrohov', 'vinnytsia-national-pirogov-memorial-medical-university'],
  ['zaporozhye state medical university', 'zaporizhzhia-state-medical-and-pharmaceutical-university'], ['zaporizhzhya', 'zaporizhzhia-state-medical-and-pharmaceutical-university'],
  ['uzhgorod national university', 'uzhhorod-national-university'], ['ternopol medical university', 'ternopil-national-medical-university'],
  ['ivano frankovsk', 'ivano-frankivsk-national-medical-university'], ['Ivano-Frankivsk National Medical University', 'ivano-frankivsk-national-medical-university'],
  ['danylo halytsky', 'danylo-halytsky-lviv-national-medical-university'], ['danilo galitsky', 'danylo-halytsky-lviv-national-medical-university'],
  ['lvov national medical university', 'danylo-halytsky-lviv-national-medical-university'], ['dnepr medical university', 'dnipro-state-medical-university'],
  ['poltava', 'poltava-state-medical-university'], ['sumy state university', 'sumy-state-university'], ['sumi', 'sumy-state-university'],
  ['national university of pharmacy', 'national-university-of-pharmacy'], ['national pharmaceutical university', 'national-university-of-pharmacy'],
  ['taras shevchenko', 'taras-shevchenko-national-university-of-kyiv'], ['kiev national university', 'taras-shevchenko-national-university-of-kyiv'],
  ['petro mohyla', 'petro-mohyla-black-sea-national-university'], ['petr mogila black sea university', 'petro-mohyla-black-sea-national-university'],
  ['cherkassy', 'bohdan-khmelnytsky-national-university-of-cherkasy'], ['bogdan khmelnitsky university', 'bohdan-khmelnytsky-national-university-of-cherkasy'],
  ['Bohdan Khmelnytskyi National University of Cherkasy', 'bohdan-khmelnytsky-national-university-of-cherkasy'],
  // Listed on 2026-10-24 (N27).
  ['kharkiv national university', 'karazin-kharkiv-national-university'], ['V. N. Karazin Kharkiv National University', 'karazin-kharkiv-national-university'],
  ['kyiv medical university', 'kyiv-medical-university'], ['Kiev Medical University', 'kyiv-medical-university'],
  ['lviv medical university', 'lviv-medical-institute'], ['odesa national university', 'odesa-mechnikov-national-university'], ['odessa national university', 'odesa-mechnikov-national-university'],
  ['kharkiv international medical university', 'kharkiv-international-medical-university'], ['international european university', 'international-european-university'],
  ['lugansk state medical university', 'luhansk-state-medical-university'], ['donetsk national medical university', 'donetsk-national-medical-university'],
  ['dnipro national university', 'oles-honchar-dnipro-national-university'], ['zhitomir medical institute', 'zhytomyr-medical-institute'], ['rovno medical academy', 'rivne-medical-academy'],
  ['kherson state university', 'kherson-state-university'], ['lviv polytechnic', 'lviv-polytechnic-national-university'],
];
for (const [q, slug] of finds) {
  if (!has(slug)) continue;
  const r = run(q);
  ok(r.tier === 'full' && r.slugs.includes(slug), `"${q}": expected a full match for ${slug}, got ${r.tier} ${JSON.stringify(r.slugs)}`);
}
ok(run('national pharmaceutical university').slugs.length === 1, '"national pharmaceutical university" should match the pharmacy university only');

// 2. Names of different institutions: never a full match.
const distinct = [
  ['lviv national university', 'danylo-halytsky-lviv-national-medical-university'],
  ['lviv medical institute', 'danylo-halytsky-lviv-national-medical-university'],
  ['zaporizhzhia national university', 'zaporizhzhia-state-medical-and-pharmaceutical-university'], ['sumy state medical university', 'sumy-state-university'],
  ['kyiv medical college', 'taras-shevchenko-national-university-of-kyiv'],
  ['ivan franko national university of lviv', null], ['ukrainian catholic university', null],
  ['king daniel university', null], ['zzqx university', null],
];
for (const [q, nearSlug] of distinct) {
  const r = run(q);
  if (nearSlug && has(nearSlug)) ok(r.tier === 'near' && r.slugs.includes(nearSlug), `"${q}": expected near matches (with the caution) including ${nearSlug}, got ${r.tier} ${JSON.stringify(r.slugs)}`);
  else ok(r.tier === 'none' || r.tier === 'near', `"${q}": must not be a full match, got ${r.tier} ${JSON.stringify(r.slugs)}`);
  ok(r.tier !== 'full', `"${q}": a different institution's name came back as a full match: ${JSON.stringify(r.slugs)}`);
}
ok(run('lviv national university').slugs.every((s) => s !== 'national-university-of-pharmacy'), 'a near match must still share the distinctive words');

// 2b. One specific name contained in several listed names: all are shown, under the caution; an exact or generic query shows none.
const cautionOn = ['kharkiv national university', 'lviv medical university', 'odesa national university', 'kiev national university', 'kharkov medical university', 'kyiv university'];
const cautionOff = ['kharkiv national medical university', 'bukovinian', 'kyiv medical university', 'medical university', 'mbbs in ukraine', 'national university of pharmacy', 'lviv polytechnic'];
for (const q of cautionOn) { const r = searchNames(q, names); ok(r.tier === 'full' && r.caution === true && r.show.filter(Boolean).length >= 2, `"${q}": expected several full matches under the caution, got ${r.tier} caution=${r.caution} n=${r.show.filter(Boolean).length}`); }
for (const q of cautionOff) { const r = searchNames(q, names); ok(!r.caution, `"${q}": no caution expected, got caution=${r.caution} (${r.tier})`); }
ok(run('kharkiv national university').slugs.includes('karazin-kharkiv-national-university') && run('kharkiv national university').slugs.includes('kharkiv-national-medical-university'), '"kharkiv national university" shows both Kharkiv institutions under the caution');
ok(run('lviv medical university').slugs.includes('lviv-medical-institute') && run('lviv medical university').slugs.includes('danylo-halytsky-lviv-national-medical-university'), '"lviv medical university" shows both Lviv institutions under the caution');

// 3. Generic queries.
for (const q of ['', '   ', 'mbbs in ukraine', 'Ukraine medical college', 'medical college', 'university', 'uni']) {
  const r = run(q);
  ok(r.tier === 'all' || r.tier === 'full', `generic "${q}": got ${r.tier}`);
}
ok(run('mbbs in ukraine').slugs.length === names.length, '"mbbs in ukraine" shows every card');
ok(run('medical university').slugs.length === names.filter((n) => n.includes('medical') && n.includes('university')).length, '"medical university" shows the names with both words');

// 4. Gate safety and guard necessity.
const src = readFileSync(new URL('../src/lib/name-search.mjs', import.meta.url), 'utf8');
for (const r of records) {
  for (const a of r.alternativeNames ?? []) if (a.trim().length >= 4 && !r.shortName.includes(a)) ok(!src.includes(a), `name-search.mjs contains the alternative name "${a}" of ${r.slug}`);
  if (r.city && !r.shortName.includes(r.city)) ok(!src.includes(r.city), `name-search.mjs contains the city "${r.city}" of ${r.slug} in its own spelling`);
}
for (const p of LOOKALIKES) {
  ok(p === normName(p), `look-alike "${p}" is not normalised`);
  const words = p.split(' ');
  ok(names.map(normName).some((n) => words.every((w) => n.includes(w))), `look-alike "${p}" is not needed: no listed name contains all its words`);
}

// 5. Grouping by name: only names that say "medical" or "pharmacy/pharmaceutical" are grouped as medical.
for (const r of records) {
  const expect = /\b(medical|medicine|pharmacy|pharmaceutical)\b/i.test(r.shortName) ? 'medical' : 'other';
  ok(nameKind(r.shortName) === expect, `nameKind("${r.shortName}") = ${nameKind(r.shortName)}, expected ${expect}`);
}
ok(nameKind('Sumy State University') === 'other' && nameKind('National University of Pharmacy') === 'medical' && nameKind('Zaporizhzhia State Medical and Pharmaceutical University') === 'medical', 'nameKind on the known edge cases');
ok(nameKind('Biomedical Institute') === 'other', 'nameKind does not match "medical" inside another word');

for (const f of failures) console.log(`FAIL  ${f}`);
console.log(`name-search: ${checks} checks, ${failures.length} failures`);
process.exit(failures.length ? 1 : 0);
