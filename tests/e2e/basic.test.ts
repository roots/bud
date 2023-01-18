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

describe(`html output of examples/basic`, () => {
  let browser: Browser
  let page: Page
  let dev: Promise<ExecaReturnValue>
  let port: number

  beforeAll(async () => {
    port = await e2eBeforeAll(`basic`)
  })

  beforeEach(async () => {
    dev = runDev(`basic`, port)
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
    await update()
    await page.waitForTimeout(12000)

    const hot = await page.$(`.hot`)
    expect(hot).toBeTruthy()
  })
})

const update = async () =>
  await fs.writeFile(
    testPath(`basic`, `src`, `index.js`),
    `\
import './styles.css'

document.querySelector('#root').classList.add('hot')

module?.hot?.accept()
`,
  )
