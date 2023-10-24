import {env} from 'node:process'

import fs from 'fs-jetpack'
import {Browser, chromium, Page} from 'playwright'
import {beforeEach, describe, expect, it} from 'vitest'

import {destinationPath} from './util/copy'
import {e2eBeforeAll, runDev} from './util/install'

describe(`html output of examples/swc`, () => {
  let browser: Browser
  let page: Page
  let port: number

  beforeEach(async () => {
    port = await e2eBeforeAll(`swc`)
    runDev(`swc`, port)

    browser = await chromium.launch({
      headless: !!env.CI,
    })
    if (!browser) throw new Error(`Browser could not be launched`)

    page = await browser.newPage()
    if (!page) throw new Error(`Page could not be created`)

    await page.waitForTimeout(5000)
  })

  it(`rebuilds on change`, async () => {
    await page.goto(`http://0.0.0.0:${port}/`)

    await fs.writeAsync(
      destinationPath(`swc`, `src`, `index.js`),
      `\
import './styles.css'

document.querySelector(\`body\`).classList.add(\`hot\`)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(console.error)
}
`,
    )
    await page.waitForTimeout(12000)

    expect(await page.$(`.hot`)).toBeTruthy()

    await page.close()
    await browser.close()
  })
})
