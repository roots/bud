import {join} from 'node:path'

import {paths} from '@repo/constants'
import {execa, ExecaChildProcess} from 'execa'
import fs from 'fs-extra'
import {Browser, chromium, Page} from 'playwright'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'

import copy from './util/copy'
import install from './util/install'

const reset = async () =>
  await fs.writeFile(
    join(paths.mocks, `yarn`, `@examples`, `basic`, `src`, `index.js`),
    `\
import './styles.css'

document.querySelector('body')?.classList.add('init')

module?.hot?.accept()
`,
  )

const update = async () =>
  await fs.writeFile(
    join(paths.mocks, `yarn`, `@examples`, `basic`, `src`, `index.js`),
    `\
import './styles.css'

document.querySelector('body').classList.add('hot')

module?.hot?.accept()
`,
  )

let browser: Browser
let page: Page
let devProcess: ExecaChildProcess

describe(`html output of examples/basic`, () => {
  it(`rebuilds on change`, async () => {
    try {
      await reset()
      await copy(`basic`)
        .then(install(`basic`))
        .then(async () => {
          devProcess = execa(
            `node`,
            [`./node_modules/.bin/bud`, `dev`, `--no-cache`, `--html`],
            {
              cwd: join(paths.mocks, `yarn`, `@examples`, `basic`),
              timeout: 10000,
            },
          )
        })

      browser = await chromium.launch()
      page = await browser?.newPage()

      await page?.goto(`http://0.0.0.0:3000/`)
      const title = await page.title()
      expect(title).toBe(`%APP_TITLE%`)
      const init = await page.$(`.init`)
      expect(init).toBeTruthy()

      await update()
      await page.waitForTimeout(12000)

      const hot = await page.$(`.hot`)
      expect(hot).toBeTruthy()

      await page?.close()
      await browser?.close()
      devProcess?.kill(`SIGINT`)
    } catch (error) {
      return
    }
  })
})
