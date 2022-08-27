/* eslint-disable no-console */

import {describe, expect, it} from '@jest/globals'
import {paths} from '@repo/constants'
import {execa, ExecaChildProcess} from 'execa'
import fs from 'fs-extra'
import {join} from 'node:path'
import {Browser, chromium, Page} from 'playwright'

import copy from './util/copy'
import install from './util/install'

const reset = async () =>
  fs.writeFile(
    join(paths.mocks, `yarn`, `@examples`, `basic`, `src`, `index.js`),
    `\
import './styles.css'

document.querySelector('body')?.classList.add('init')

module?.hot?.accept()
`,
  )

const update = async () =>
  fs.writeFile(
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
  beforeAll(done => {
    copy(`basic`)
      .then(install(`basic`))
      .then(async () => {
        devProcess = execa(
          `node`,
          [
            join(`node_modules`, `.bin`, `bud`),
            `dev`,
            `--html`,
            `--no-cache`,
          ],
          {cwd: join(paths.mocks, `yarn`, `@examples`, `basic`)},
        )
        devProcess.stdout?.pipe(process.stdout)

        setTimeout(done, 5000)

        await devProcess.catch(err => {
          process.stderr.write(JSON.stringify(err))
        })
      })
  })

  afterAll(async () => {
    devProcess?.kill(`SIGINT`)
  })

  beforeEach(async () => {
    await reset()

    await chromium.launch().then(async instance => {
      browser = instance
      page = await browser.newPage()
      await page?.goto(`http://localhost:3000/`)
    })
  })

  afterEach(async () => {
    await page?.close()
    await browser?.close()
  })

  it(`should have page title: \`Webpack App\``, async () => {
    const title = await page.title()
    expect(title).toBe(`Webpack App`)
  })

  it(`should have expected initial markup`, async () => {
    const init = await page.$(`.init`)
    expect(init).toBeTruthy()
  })

  it(`should add new body class after updating src/index.js`, async () => {
    await update()
    await page.waitForTimeout(12000)

    const hot = await page.$(`.hot`)
    expect(hot).toBeTruthy()
  })
})
