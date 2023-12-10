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

describe(`html output of examples/react`, () => {
  let browser: Browser
  let page: Page
  let dev: Promise<ExecaReturnValue>
  let port: number

  beforeAll(async () => {
    port = await fixture.install(`react`)
  })

  beforeEach(async () => {
    dev = fixture.run(`react`, port)

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

    expect(await page.$(`#root`)).toBeTruthy()

    await fs.writeAsync(
      fixture.toPath(`react`, `src`, `components`, `App.js`),
      `\
import logo from './logo.svg'

export const App = () => {
  return (
    <div className="App">
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
        <div className="target">Noice.</div>
      </div>
    </div>
  )
}`,
    )
    await page.waitForTimeout(12000)

    expect(await page.$(`.target`)).toBeTruthy()
  })
})
