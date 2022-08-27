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
          [`./node_modules/.bin/bud`, `dev`, `--no-cache`, `--html`],
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

    browser = await chromium.launch()
    page = await browser?.newPage()
  })

  afterEach(async () => {
    await page?.close()
    await browser?.close()
  })

  it(`should have page title: \`Webpack App\``, async () => {
    await page?.goto(`http://0.0.0.0:3000/`)
    const title = await page.title()
    expect(title).toBe(`Webpack App`)
  })

  it(`should add new body class after updating src/index.js`, async () => {
    await page?.goto(`http://0.0.0.0:3000/`)
    const init = await page.$(`.init`)
    expect(init).toBeTruthy()

    await update()
    await page.waitForTimeout(12000)

    const hot = await page.$(`.hot`)
    expect(hot).toBeTruthy()
  })
})
