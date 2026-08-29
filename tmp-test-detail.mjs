import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto('http://127.0.0.1:8765/projects/1', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
console.log(JSON.stringify({
    title: await page.title(),
    errors,
    slider: await page.locator('.project-slider').count(),
    meta: await page.locator('.project-detail-meta__title').textContent(),
    related: await page.locator('.related-card').count(),
}, null, 2));
await browser.close();
