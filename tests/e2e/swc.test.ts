import fs from "fs-jetpack";
import { Browser, chromium, Page } from "playwright";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { e2eBeforeAll, runDev } from "./util/install";
import { destinationPath } from "./util/copy";

describe(`html output of examples/swc`, () => {
  let browser: Browser;
  let page: Page;
  let port: number;

  beforeEach(async () => {
    port = await e2eBeforeAll(`swc`);
    runDev(`swc`, port);
    browser = await chromium.launch();
    page = await browser?.newPage();
    await page?.waitForTimeout(5000);
  });

  afterEach(async () => {
    await page?.close();
    await browser?.close();
  });

  it(`rebuilds on change`, async () => {
    await page?.goto(`http://0.0.0.0:${port}/`);

    await update();
    await page.waitForTimeout(12000);

    const hot = await page.$(`.hot`);
    expect(hot).toBeTruthy();
  });
});

const update = async () =>
  await fs.writeAsync(
    destinationPath(`swc`, `src`, `index.js`),
    `\
import './styles.css'

document.querySelector('body').classList.add('hot')

module?.hot?.accept()
`
  );
