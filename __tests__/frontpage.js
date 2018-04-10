/**
 * @name Jarokelo frontpage
 * @desc Check frontpage functionality
 */

const puppeteer = require('puppeteer');

const url = 'https://jarokelo.hu/';

let browser;
let page;

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(url, { waitUntil: 'networkidle0' });
})

describe('Jarokelo frontpage', () => {
  test('Check title', async () => {
    const title = await page.title();
    expect(title).toBe('Járókelő.hu. Ha megosztod, megoldod. - Járókelő.hu');
  });

  test('Check hero text', async () => {
    const heroText = await page.$eval('.hero--default .heading', e => e.innerHTML);
    expect(heroText).toBe('Ha megosztod, megoldod.');
  });

  test('Check new report button', async () => {
    await page.click('.hero__button .button');
    const newReportPage = await page.evaluate('location.href');
    expect(newReportPage).toBe(url + 'uj-bejelentes');
  });

  test('Check how it works link in hero', async () => {
    await page.click('.hero--default .hero__link');
    const howItWorksPage = await page.evaluate('location.href');
    expect(howItWorksPage).toBe(url + 'rolunk/hogyan-mukodik');
  });

  test('Support box - title', async () => {
    const supportBoxTitle = await page.$eval('.support-box .support-box__title', e => e.innerHTML);
    expect(supportBoxTitle).toBe('Támogasd a Járókelő működését');
  });

  test('Support box - button', async () => {
    await page.click('.support-box .button');
    const supportPage = await page.evaluate('location.href');
    expect(supportPage).toBe(url + 'rolunk/tamogasd');
  });

  test('Mobile app box - title', async () => {
    const appBoxTitle = await page.$eval('.application-box .heading', e => e.innerHTML);
    expect(appBoxTitle).toBe('Járókelő a mobilodon');
  });

  afterEach(async () => {
    await browser.close();
  });
});
