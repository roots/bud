import {join} from 'node:path'

import {paths} from '@repo/constants'
import {execa, ExecaChildProcess} from 'execa'
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

import * as cp from './util/copy'
import install from './util/install'

const update = async () =>
  await fs.writeFile(
    join(paths.mocks, `yarn`, `@examples`, `basic`, `src`, `index.js`),
    `\
import './styles.css'

document.querySelector('body').classList.add('hot')

module?.hot?.accept()
`,
  )

describe(`html output of examples/basic`, () => {
  let browser: Browser
  let page: Page
  let devProcess: ExecaChildProcess

  beforeAll(async () => {
    await cp.example(`basic`)
    await install(`basic`)
  })

  beforeEach(async () => {
    try {
      await cp.source(`basic`)

      devProcess = execa(
        `node`,
        [`./node_modules/.bin/bud`, `dev`, `--no-cache`, `--html`],
        {
          cwd: join(paths.mocks, `yarn`, `@examples`, `basic`),
        },
      )
    } catch (error) {
      throw error
    }

    browser = await chromium.launch()
    page = await browser?.newPage()
    await page?.waitForTimeout(5000)
  })

  afterEach(async () => {
    await page?.close()
    await browser?.close()
    devProcess?.kill(`SIGINT`)
  })

  it(`rebuilds on change`, async () => {
    await page?.goto(`http://0.0.0.0:3000/`)

    const title = await page.title()
    expect(title).toBe(`%APP_TITLE%`)
    const init = await page.$(`.init`)
    expect(init).toBeTruthy()

    await update()
    await page.waitForTimeout(12000)

    const hot = await page.$(`.hot`)
    expect(hot).toBeTruthy()
  })
})
