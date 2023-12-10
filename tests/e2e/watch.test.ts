import {env} from 'node:process'

import fs from 'fs-jetpack'
import {Browser, chromium, Page} from 'playwright'
import {beforeEach, describe, expect, it} from 'vitest'

import * as fixture from './helpers'

describe(`bud.watch functionality`, () => {
  let browser: Browser
  let page: Page
  let port: number

  beforeEach(async () => {
    port = await fixture.install(`watch`)
    fixture.run(`watch`, port)

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

    await page.evaluate(() => {
      window.reloadCalled = false
      window.bud.reload = () => {
        window.reloadCalled = true
      }
    })

    await fs.writeAsync(
      fixture.toPath(`watch`, `watched`, `foo.html`),
      `foo`,
    )

    await page.waitForTimeout(12000)

    expect(
      await page.evaluate(() => window.reloadCalled),
    ).toBe(true)

    await page.close()
    await browser.close()
  })
})
