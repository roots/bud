import {ExecaReturnValue} from 'execa'
import fs from 'fs-extra'
import {Browser, chromium, Page} from 'playwright'
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'

import {e2eBeforeAll, runDev} from './util/install'
import {testPath} from './util/copy'

describe(`html output of examples/babel`, () => {
  let browser: Browser
  let page: Page
  let dev: Promise<ExecaReturnValue>
  let port: number

  beforeAll(async () => {
    port = await e2eBeforeAll(`babel`)
  })

  beforeEach(async () => {
    dev = runDev(`babel`, port)
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

    const title = await page.title()
    expect(title).toBe(`Create Bud App`)

    const root = await page.$(`#root`)
    expect(root).toBeTruthy()

    const color = await root?.evaluate(el => {
      return window.getComputedStyle(el).getPropertyValue(`background`)
    })
    expect(color).toMatchSnapshot(
      `rgb(88, 19, 213) none repeat scroll 0% 0% / auto padding-box border-box`,
    )

    await update()
    await page.waitForTimeout(12000)

    const color2 = await root?.evaluate(el => {
      return window.getComputedStyle(el).getPropertyValue(`background`)
    })
    expect(color2).toMatchSnapshot(
      `rgb(0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box`,
    )
  })
})

const update = async () =>
  fs.writeFile(
    testPath(`babel`, `src`, `app.css`),
    `\
html,
body {
  padding: 0;
  margin: 0;
}

#root{
  align-items: center;
  background: rgb(0,0,0);
  color: white;
  display: flex;
  font-family: sans-serif;
  height: 100vh;
  justify-content: center;
  letter-spacing: 0.2em;
  text-align: center;
  text-transform: uppercase;
  width: 100vw;
}
`,
  )
