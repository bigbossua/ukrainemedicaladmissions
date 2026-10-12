// Fixture materialiser for the publication tests (tests/publication-policy.mjs, tests/publication-build.mjs).
//
// The fixture JSON files carry DATE TOKENS instead of fixed dates, so they never go stale and no clock override is
// needed anywhere in the site code. A string that is exactly one of these tokens is replaced:
//   "@today"    today's date (UTC, YYYY-MM-DD);  "@today-5" / "@today+120"  that many days before / after
//   "@ay"       the current academic year (starts 1 September), e.g. "2026/27";  "@ay-1" / "@ay+1"  the year before / after
// Nothing else in the files is changed. This file computes dates on its own (it does NOT import src/lib/publication.mjs),
// so a bug in the policy's date logic cannot hide itself in the fixtures.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const FIXTURE_ROOT = dirname(fileURLToPath(import.meta.url));

/** @param {Date} d */
export const isoDay = (d) => d.toISOString().slice(0, 10);

/** @param {Date} now @param {number} [offset] */
export function academicYear(now, offset = 0) {
  const start = (now.getUTCMonth() >= 8 ? now.getUTCFullYear() : now.getUTCFullYear() - 1) + offset;
  return `${start}/${String((start + 1) % 100).padStart(2, '0')}`;
}

/** Replace every date token in a JSON value (deep). @param {unknown} v @param {Date} now @returns {any} */
export function resolveTokens(v, now) {
  if (typeof v === 'string') {
    let m = /^@today(?:([+-])(\d+))?$/.exec(v);
    if (m) return isoDay(new Date(now.getTime() + (m[1] === '-' ? -1 : 1) * Number(m[2] ?? 0) * 86400000));
    m = /^@ay(?:([+-])(\d+))?$/.exec(v);
    if (m) return academicYear(now, (m[1] === '-' ? -1 : 1) * Number(m[2] ?? 0));
    return v;
  }
  if (Array.isArray(v)) return v.map((x) => resolveTokens(x, now));
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, resolveTokens(x, now)]));
  return v;
}

/** Read one fixture file with its tokens resolved. @param {string} file @param {Date} now */
export const readFixture = (file, now) => resolveTokens(JSON.parse(readFileSync(file, 'utf8')), now);

/**
 * Write fixture set `name` ("pass" or "fail") into `dest`/universities and `dest`/evidence with the tokens resolved.
 * Subdirectories are copied too (the "pass" set carries a record in universities/nested/, which the build must ignore:
 * backlog N24 f). The evidence directory is always created (an empty one means "no evidence file for any record").
 * @param {string} name @param {string} dest @param {Date} now
 */
export function materialise(name, dest, now) {
  const out = { universities: join(dest, 'universities'), evidence: join(dest, 'evidence') };
  /** @param {string} src @param {string} to */
  const copy = (src, to) => {
    mkdirSync(to, { recursive: true });
    for (const f of readdirSync(src, { withFileTypes: true })) {
      if (f.isDirectory()) copy(join(src, f.name), join(to, f.name));
      else if (f.name.endsWith('.json')) writeFileSync(join(to, f.name), JSON.stringify(readFixture(join(src, f.name), now), null, 2));
    }
  };
  for (const kind of /** @type {const} */ (['universities', 'evidence'])) {
    mkdirSync(out[kind], { recursive: true });
    const src = join(FIXTURE_ROOT, name, kind);
    if (existsSync(src)) copy(src, out[kind]);
  }
  return out;
}
