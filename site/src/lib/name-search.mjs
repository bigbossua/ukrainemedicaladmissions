// Directory name search (src/pages/universities/index.astro). Pure functions, so tests/name-search.mjs can run them in Node.
//
// Two tiers, so that separate institutions with similar names are never presented as the same one:
// - full: every word typed is in the listed name, including "medical", "national", "state" and "university", and the
//   query is not the name of a different institution from the inventory (LOOKALIKES).
// - near: the distinctive words (place and person names, "pharmacy", ...) are in the listed name, but not every word is.
//   Near matches are shown only when there is no full match, under a caution that names no institution.
// A query made only of generic words ("medical university", "mbbs in ukraine") shows the full matches, or every card.
//
// Spelling variants cover words IN the listed names only (transliterations and word forms). Former names, other
// institutions' names and cities a name does not contain stay out of this file: the publication gate treats unverified
// alternative names and withheld cities as leaks.

const VARIANTS = [
  [/\bodessa\b/g, 'odesa'], [/\bkiev\b/g, 'kyiv'], [/\bkiyv\b/g, 'kyiv'], [/\bkharkov\b/g, 'kharkiv'], [/\blvov\b/g, 'lviv'], [/\blwow\b/g, 'lviv'],
  [/\bvinn?[iy]t?s(?:i|y)?a\b/g, 'vinnytsia'], [/\bvinnytsya\b/g, 'vinnytsia'],
  [/\bzaporo(?:zh|j)(?:y|i)?e\b/g, 'zaporizhzhia'], [/\bzaporizhia\b/g, 'zaporizhzhia'], [/\bzaporizhzh(?:y|j)a\b/g, 'zaporizhzhia'],
  [/\buzh?gorod\b/g, 'uzhhorod'], [/\buzhorod\b/g, 'uzhhorod'], [/\bternopol\b/g, 'ternopil'], [/\bfrankovsk\b/g, 'frankivsk'], [/\bdnepr\b/g, 'dnipro'],
  [/\bsumi\b/g, 'sumy'], [/\bcherkass(?:y|i)\b/g, 'cherkasy'], [/\bcherkasi\b/g, 'cherkasy'],
  [/\blugansk\b/g, 'luhansk'], [/\bzhitomir\b/g, 'zhytomyr'], [/\brovno\b/g, 'rivne'], [/\bkarazina?\b/g, 'karazin'], [/\bmechnikova?\b/g, 'mechnikov'],
  [/\b(?:pirogova?|pyrohova?)\b/g, 'pirogov'], [/\b(?:bukovina|bukovyna|bukovynian)\b/g, 'bukovinian'], [/\b(?:bogomolec|bohomolets)\b/g, 'bogomolets'],
  [/\bbogdan\b/g, 'bohdan'], [/\bkhmel(?:n)?[iy]ts?k(?:y|i|iy|yi|yy|ij)\b/g, 'khmelnytsky'],
  [/\bpetr\b/g, 'petro'], [/\bmo[hg][iy]la\b/g, 'mohyla'],
  [/\bdanilo\b/g, 'danylo'], [/\b[hg]al[iy]ts?k(?:y|i|iy|yi|yy|ij)\b/g, 'halytsky'],
  [/\bpharmaceutical\b/g, 'pharma'],
];
// Never decide a match.
const FILLER = new Set(['of', 'the', 'in', 'at', 'and', 'for', 'ukraine', 'ukrainian', 'mbbs', 'uni', 'named', 'after']);
// Generic name words: needed for a full match, ignored for a near match.
const SOFT = new Set(['medical', 'university', 'national', 'state', 'college', 'institute', 'academy', 'school']);
// Names (normalised) of separate institutions in the private inventory (research/universities/MASTER_INVENTORY.md,
// "How institutions were deduplicated") whose words all occur in a listed name, so the word test alone would call them
// full matches. Phrases only; no claim about any institution.
export const LOOKALIKES = ['lviv national university'];

export function normName(s) {
  let x = String(s ?? '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  for (const [re, to] of VARIANTS) x = x.replace(re, to);
  return x;
}

/**
 * Directory grouping by NAME only: "medical" when the commonly used English name identifies a medical or pharmacy
 * institution ("... Medical University", "National University of Pharmacy", "... Medical and Pharmaceutical
 * University", "... Institute of Medicine ..."), otherwise "other". It states nothing the name does not say: whether an "other" university has a medical
 * faculty or programme is among the facts still to be verified.
 * @param {string} name
 * @returns {'medical' | 'other'}
 */
export function nameKind(name) {
  return /\b(medical|medicine|pharmacy|pharmaceutical)\b/i.test(String(name ?? '')) ? 'medical' : 'other';
}

const hasPhrase = (text, phrase) => ` ${text} `.includes(` ${phrase} `);
const hasWord = (name, w) => name.split(' ').some((t) => t.startsWith(w));

// A query that names a specific institution can be a full match for several listed names: the words of one listed
// name can all occur in another listed name that adds "medical" (normalised examples: "<city> national university" is
// contained in "<person> <city> national university" and in "<city> national medical university"). The cards are then
// shown under the caution when the matches differ in kind: one adds only a type word such as "medical" or
// "pharmaceutical" that the query does not contain, or one is the query itself while another adds further words.
// (City and person names are kept out of this file's text: the gate's leak check reads it.)
const TYPE = new Set(['medical', 'medicine', 'pharma', 'pharmacy', 'healthcare', 'technical', 'polytechnic', 'technologies', 'design', 'international', 'european', 'catholic', 'private']);
function ambiguous(q, matches) {
  if (matches.length < 2) return false;
  const qWords = q.split(' ').filter(Boolean);
  if (qWords.every((w) => SOFT.has(w) || FILLER.has(w))) return false; // generic query: many cards is normal
  const extras = matches.map((n) => n.split(' ').filter((w) => !qWords.some((x) => w.startsWith(x))));
  const kinds = extras.map((e) => `${e.some((w) => TYPE.has(w)) ? 'T' : ''}${e.some((w) => !TYPE.has(w) && !SOFT.has(w) && !FILLER.has(w)) ? 'N' : ''}`);
  return new Set(kinds).size > 1;
}

/**
 * @param {string} query raw text typed by the visitor
 * @param {string[]} names the cards' search names (raw; normalised here)
 * @returns {{ tier: 'all' | 'full' | 'near' | 'none', show: boolean[], caution?: boolean }} which cards to show; 'near', or
 *   'full' with caution, means show the caution
 */
export function searchNames(query, names) {
  const q = normName(query);
  const norm = names.map(normName);
  // Single letters (initials such as "V. N.") never decide a match. A query word matches a name word that STARTS with
  // it ("pharma" matches "pharmacy"), never one that merely contains it ("national" must not match "international").
  const words = q.split(' ').filter((w) => w.length > 1 && !FILLER.has(w));
  if (words.length === 0) return { tier: 'all', show: norm.map(() => true) };
  const distinct = words.filter((w) => !SOFT.has(w));
  const lookalikes = LOOKALIKES.filter((p) => hasPhrase(q, p));
  const full = norm.map((n) => words.every((w) => hasWord(n, w)) && lookalikes.every((p) => hasPhrase(n, p)));
  if (full.some(Boolean)) return { tier: 'full', show: full, caution: ambiguous(q, norm.filter((_, i) => full[i])) };
  if (distinct.length === 0) return { tier: 'all', show: norm.map(() => true) }; // generic words only ("medical college")
  const near = norm.map((n) => distinct.every((w) => hasWord(n, w)));
  if (near.some(Boolean)) return { tier: 'near', show: near };
  return { tier: 'none', show: norm.map(() => false) };
}
