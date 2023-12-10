import {env} from 'node:process'

import fs from 'fs-jetpack'
import {Browser, chromium, Page} from 'playwright'
import {beforeEach, describe, expect, it} from 'vitest'

import * as fixture from './helpers'

describe(`html output of examples/swc`, () => {
  let browser: Browser
  let page: Page
  let port: number

  beforeEach(async () => {
    port = await fixture.install(`swc`)
    fixture.run(`swc`, port)

    browser = await chromium.launch({
      headless: !!env.CI,
    })
    if (!browser) throw new Error(`Browser could not be launched`)

    page = await browser.newPage()
    if (!page) throw new Error(`Page could not be created`)

    await page.waitForTimeout(5000)
  })

  it(`should rebuild on change`, async () => {
    await page.goto(fixture.url(port))

    await fs.writeAsync(
      fixture.toPath(`swc`, `src`, `index.js`),
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
