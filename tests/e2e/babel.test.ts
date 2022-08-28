/* eslint-disable no-console */

import {describe, expect, it} from '@jest/globals'
import {paths} from '@repo/constants'
import {execa, ExecaChildProcess} from 'execa'
import fs from 'fs-extra'
import {join} from 'path'
import {Browser, chromium, Page} from 'playwright'

import copy from './util/copy'
import install from './util/install'

const reset = async () =>
  fs.writeFile(
    join(paths.mocks, `yarn`, `@examples`, `babel`, `src`, `global.css`),
    `\
html,
body {
  padding: 0;
  margin: 0;
}

.app {
  align-items: center;
  background: rgb(88, 19, 213);
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

const update = async () =>
  fs.writeFile(
    join(paths.mocks, `yarn`, `@examples`, `babel`, `src`, `global.css`),
    `\
html,
body {
  padding: 0;
  margin: 0;
}

.app {
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

describe(`html output of examples/babel`, () => {
  let browser: Browser
  let page: Page
  let devProcess: ExecaChildProcess

  beforeAll(done => {
    copy(`babel`)
      .then(install(`babel`))
      .then(async () => {
        devProcess = execa(
          `node`,
          [`./node_modules/.bin/bud`, `dev`, `--no-cache`],
          {cwd: join(paths.mocks, `yarn`, `@examples`, `babel`)},
        )
        devProcess.stdout?.pipe(process.stdout)

        setTimeout(done, 10000)

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

  it(`should hot update when src/global.css is modified`, async () => {
    await page?.goto(`http://0.0.0.0:3005/`)

    const title = await page.title()
    expect(title).toBe(`Webpack App`)

    const app = await page.$(`.app`)
    expect(app).toBeTruthy()

    const color = await app?.evaluate(el => {
      return window.getComputedStyle(el).getPropertyValue(`background`)
    })
    expect(color).toMatchSnapshot(
      `rgb(88, 19, 213) none repeat scroll 0% 0% / auto padding-box border-box`,
    )

    await update()
    await page.waitForTimeout(12000)

    const color2 = await app?.evaluate(el => {
      return window.getComputedStyle(el).getPropertyValue(`background`)
    })
    expect(color2).toMatchSnapshot(
      `rgb(0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box`,
    )
  })
})
