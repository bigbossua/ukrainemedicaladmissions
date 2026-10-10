#!/usr/bin/env node
// Screenshots brand/homepage/homepage-direction.html at desktop and phone widths.
// Run from the repository root:  node brand/source/render_homepage.js
const { chromium } = require('playwright');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const page_url = 'file://' + path.join(ROOT, 'brand', 'homepage', 'homepage-direction.html');
(async () => {
  const browser = await chromium.launch();
  for (const [name, width] of [['desktop', 1440], ['mobile', 390]]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    await page.goto(page_url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const out = path.join(ROOT, 'brand', 'homepage', `homepage-direction-${name}.png`);
    await page.screenshot({ path: out, fullPage: true });
    console.log('wrote', path.relative(ROOT, out));
    await page.close();
  }
  await browser.close();
})();
