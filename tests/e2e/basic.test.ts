import {env} from 'node:process'

import {ExecaReturnValue} from 'execa'
import fs from 'fs-jetpack'
import {Browser, chromium, Page} from 'playwright'
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'

import * as fixture from './helpers'

describe(`html output of examples/basic`, () => {
  let browser: Browser
  let page: Page
  let dev: Promise<ExecaReturnValue>
  let port: number

  beforeAll(async () => {
    port = await fixture.install(`basic`)
  })

  beforeEach(async () => {
    dev = fixture.run(`basic`, port)
    browser = await chromium.launch({
      headless: !!env.CI,
    })
    if (!browser) throw new Error(`Browser could not be launched`)

    page = await browser?.newPage()
    if (!page) throw new Error(`Page could not be created`)

    await page?.waitForTimeout(5000)
  })

  afterEach(async () => {
    await page?.close()
    await browser?.close()
  })

  it(`should rebuild on change`, async () => {
    await page?.goto(fixture.url(port))
    await update()
    await page.waitForTimeout(12000)

    const hot = await page.$(`.hot`)
    expect(hot).toBeTruthy()
  })
})

const update = async () =>
  await fs.writeAsync(
    fixture.toPath(`basic`, `src`, `index.js`),
    `\
import './styles.css'

document.querySelector('#root').classList.add('hot')

if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error)
`,
  )
