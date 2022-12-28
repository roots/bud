/* eslint-disable no-console */

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

describe(`html output of examples/react`, () => {
  let browser: Browser
  let page: Page
  let devProcess: ExecaChildProcess

  beforeAll(async () => {
    await cp.example(`react`)
    await install(`react`)
  })

  beforeEach(async () => {
    try {
      await cp.source(`react`)

      devProcess = execa(
        `node`,
        [`./node_modules/.bin/bud`, `dev`, `--no-cache`],
        {
          cwd: join(paths.mocks, `yarn`, `@examples`, `react`),
        },
      )
    } catch (error) {
      throw error
    }

    browser = await chromium.launch()
    page = await browser?.newPage()
    await page.waitForTimeout(5000)
  })

  afterEach(async () => {
    await page?.close()
    await browser?.close()
    devProcess?.kill(`SIGINT`)
  })

  it(`rebuilds on change`, async () => {
    await page?.goto(`http://0.0.0.0:3015/`)

    expect(await page.$(`.App`)).toBeTruthy()
    expect(await page.$(`.target`)).toBeFalsy()

    await update()
    await page.waitForTimeout(12000)
    expect(await page.$(`.target`)).toBeTruthy()
  })
})
