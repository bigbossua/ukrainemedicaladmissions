#!/usr/bin/env node
/**
 * Renders the brand SVGs to PNG with headless Chromium (Playwright).
 * Run from the repository root:  node brand/source/render_png.js
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const LOGO = path.join(ROOT, 'brand', 'logo');
const FAV = path.join(ROOT, 'brand', 'favicon');

// [svg file, output file, target width in px]  (height follows the viewBox)
const JOBS = [
  ['logo/uma-logo-horizontal-light.svg', 'logo/png/uma-logo-horizontal-light-600.png', 600],
  ['logo/uma-logo-horizontal-light.svg', 'logo/png/uma-logo-horizontal-light-1200.png', 1200],
  ['logo/uma-logo-horizontal-dark.svg',  'logo/png/uma-logo-horizontal-dark-600.png', 600],
  ['logo/uma-logo-horizontal-dark.svg',  'logo/png/uma-logo-horizontal-dark-1200.png', 1200],
  ['logo/uma-logo-stacked-light.svg',    'logo/png/uma-logo-stacked-light-600.png', 600],
  ['logo/uma-logo-stacked-light.svg',    'logo/png/uma-logo-stacked-light-1200.png', 1200],
  ['logo/uma-logo-stacked-dark.svg',     'logo/png/uma-logo-stacked-dark-600.png', 600],
  ['logo/uma-logo-stacked-dark.svg',     'logo/png/uma-logo-stacked-dark-1200.png', 1200],
  ['logo/uma-emblem-light.svg',          'logo/png/uma-emblem-light-512.png', 512],
  ['logo/uma-emblem-dark.svg',           'logo/png/uma-emblem-dark-512.png', 512],
  ['favicon/favicon.svg',                'favicon/favicon-16x16.png', 16],
  ['favicon/favicon.svg',                'favicon/favicon-32x32.png', 32],
  ['favicon/favicon.svg',                'favicon/favicon-48x48.png', 48],
  ['favicon/favicon.svg',                'favicon/apple-touch-icon.png', 180],
  ['favicon/favicon.svg',                'favicon/android-chrome-192x192.png', 192],
  ['favicon/favicon.svg',                'favicon/android-chrome-512x512.png', 512],
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  for (const [src, out, width] of JOBS) {
    const svg = fs.readFileSync(path.join(ROOT, 'brand', src), 'utf8');
    const vb = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
    const h = Math.round(width * (parseFloat(vb[2]) / parseFloat(vb[1])));
    await page.setViewportSize({ width, height: h });
    const dark = /-dark/.test(src);
    // Transparent background; dark variants are previewed on navy separately.
    await page.setContent(
      `<!doctype html><html><body style="margin:0;background:transparent">` +
      `<img src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}" ` +
      `style="display:block;width:${width}px;height:${h}px"></body></html>`);
    const outPath = path.join(ROOT, 'brand', out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    await page.screenshot({ path: outPath, omitBackground: true, clip: { x: 0, y: 0, width, height: h } });
    console.log('wrote', path.relative(ROOT, outPath), `${width}x${h}`, dark ? '(dark variant)' : '');
  }
  await browser.close();
})();
