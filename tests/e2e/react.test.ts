/* eslint-disable no-console */

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
  fs.writeFile(
    join(
      paths.mocks,
      `yarn`,
      `@examples`,
      `react`,
      `src`,
      `components`,
      `App.js`,
    ),
    `\
import React from 'react'

import logo from './logo.svg'

export const App = () => {
  return (
    <div className="App">
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
        Edit <code>src/components/App.js</code> and save to
        reload
      </div>
    </div>
  )
}
`,
  )

const update = async () =>
  fs.writeFile(
    join(
      paths.mocks,
      `yarn`,
      `@examples`,
      `react`,
      `src`,
      `components`,
      `App.js`,
    ),
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

let browser: Browser
let page: Page
let devProcess: ExecaChildProcess

describe(`html output of examples/react`, () => {
  it(`rebuilds on change`, async () => {
    try {
      await reset()
      await copy(`react`)
        .then(install(`react`))
        .then(async () => {
          devProcess = execa(
            `node`,
            [`./node_modules/.bin/bud`, `dev`, `--no-cache`, `--html`],
            {
              cwd: join(paths.mocks, `yarn`, `@examples`, `react`),
              timeout: 10000,
            },
          )
        })

      devProcess.stdout?.pipe(process.stdout)
      browser = await chromium.launch()
      page = await browser?.newPage()

      await page?.goto(`http://0.0.0.0:3000/`)
      expect(await page.$(`.App`)).toBeTruthy()
      expect(await page.$(`.target`)).toBeFalsy()

      await update()
      await page.waitForTimeout(12000)
      expect(await page.$(`.target`)).toBeTruthy()

      await page?.close()
      await browser?.close()

      devProcess?.kill(`SIGINT`)
    } catch (error) {
      return
    }
  })
})
