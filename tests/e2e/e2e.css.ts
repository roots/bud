/* eslint-disable no-console */

import {expect, it} from '@jest/globals'
import {paths} from '@repo/constants'
import * as logger from '@repo/logger'
import {execa, ExecaChildProcess} from 'execa'
import fs from 'fs-extra'
import {join} from 'path'
import {Browser, chromium, Page} from 'playwright'

const reset = async () =>
  fs.writeFile(
    join(paths.mocks, 'yarn', 'babel', 'src', 'global.css'),
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
    join(paths.mocks, 'yarn', 'babel', 'src', 'global.css'),
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

export const test = () => {
  let browser: Browser
  let page: Page
  let devProcess: ExecaChildProcess

  beforeAll(done => {
    chromium
      .launch()
      .then(instance => {
        browser = instance
      })
      .then(async () => {
        try {
          devProcess = execa('node', ['./node_modules/.bin/bud', 'dev'], {
            cwd: join(paths.mocks, 'yarn', 'babel'),
          })

          devProcess.stdout?.on('data', data => {
            data.toString().includes('webpack built bud') && done()
          })
          devProcess.stderr?.on('data', data => {
            logger.error(data.toString())
            throw new Error(data.toString())
          })
        } catch (e) {
          console.error(e)
        }
      })
  })

  afterAll(async () => {
    devProcess.kill('SIGQUIT')
    await page.close()
    await browser.close()
    await reset()
  })

  beforeEach(async () => {
    page = await browser.newPage()
    await page.goto('http://0.0.0.0:3005/')
  })

  afterEach(async () => {
    await page.close()
    await reset()
  })

  it('has page title: `Webpack App`', async () => {
    const title = await page.title()
    expect(title).toBe('Webpack App')
  })

  it('has expected baseline', async () => {
    const app = await page.$('.app')
    expect(app).toBeTruthy()

    const color = await app?.evaluate(el => {
      return window.getComputedStyle(el).getPropertyValue('background')
    })
    expect(color).toMatchSnapshot(
      'rgb(88, 19, 213) none repeat scroll 0% 0% / auto padding-box border-box',
    )
  })

  it('hot update css', async () => {
    await update()
    await page.waitForTimeout(3000)

    const app = await page.$('.app')
    expect(app).toBeTruthy()

    const color = await app?.evaluate(el => {
      return window.getComputedStyle(el).getPropertyValue('background')
    })
    expect(color).toMatchSnapshot(
      'rgb(0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box',
    )
  })
}
