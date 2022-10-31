/* eslint-disable no-console */

import {join} from 'node:path'

import {paths} from '@repo/constants'
import {execa, ExecaChildProcess} from 'execa'
import fs from 'fs-extra'
import {Browser, chromium, Page} from 'playwright'
import {describe, expect, it} from 'vitest'

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
  beforeAll(done => {
    copy(`react`)
      .then(install(`react`))
      .then(async () => {
        devProcess = execa(
          `node`,
          [`./node_modules/.bin/bud`, `dev`, `--no-cache`, `--html`],
          {cwd: join(paths.mocks, `yarn`, `@examples`, `react`)},
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

  it(`should add new body class after updating src/components/App.js`, async () => {
    await page?.goto(`http://0.0.0.0:3000/`)
    expect(await page.$(`.App`)).toBeTruthy()
    expect(await page.$(`.target`)).toBeFalsy()

    await update()
    await page.waitForTimeout(12000)
    expect(await page.$(`.target`)).toBeTruthy()
  })
})
