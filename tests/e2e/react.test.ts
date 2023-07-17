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

import {destinationPath} from './util/copy'
import {e2eBeforeAll, runDev} from './util/install'

describe(`html output of examples/react`, () => {
  let browser: Browser
  let page: Page
  let dev: Promise<ExecaReturnValue>
  let port: number

  beforeAll(async () => {
    port = await e2eBeforeAll(`react`)
  })

  beforeEach(async () => {
    dev = runDev(`react`, port)
    browser = await chromium.launch()
    page = await browser?.newPage()
    await page?.waitForTimeout(5000)
  })

  afterEach(async () => {
    await page?.close()
    await browser?.close()
  })

  it(`rebuilds on change`, async () => {
    await page?.goto(`http://0.0.0.0:${port}/`)

    expect(await page.$(`#root`)).toBeTruthy()
    expect(await page.$(`#App`)).toBeFalsy()

    await update()
    await page.waitForTimeout(12000)

    const target = await page.$(`.target`)
    const text = await target?.textContent()
    expect(text).toBe(`Noice.`)
  })
})

const update = async () =>
  await fs.writeAsync(
    destinationPath(`react`, `src`, `components`, `App.js`),
    `\
import React from 'react'

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
}
`,
  )
