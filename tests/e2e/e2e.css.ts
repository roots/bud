/* eslint-disable no-console */

import {expect, it} from '@jest/globals'
import {paths} from '@repo/constants'
import * as repoLogger from '@repo/logger'
import {execa, ExecaChildProcess} from 'execa'
import fs from 'fs-extra'
import {join} from 'path'
import {Browser, chromium, Page} from 'playwright'

const logger = repoLogger.make({interactive: false}).scope('e2e', 'babel')
logger.enable()

const reset = async () =>
  fs.writeFile(
    join(paths.mocks, 'yarn', '@examples', 'babel', 'src', 'global.css'),
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
    join(paths.mocks, 'yarn', '@examples', 'babel', 'src', 'global.css'),
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
  let ready = false

  beforeAll(done => {
    logger.await('initializing dev process')

    chromium
      .launch()
      .then(instance => {
        browser = instance
      })
      .then(async () => {
        devProcess = execa(
          'node',
          ['./node_modules/.bin/bud', 'dev', '--no-cache'],
          {
            cwd: join(paths.mocks, 'yarn', '@examples', 'babel'),
          },
        )

        devProcess.stdout?.on('data', data => {
          const output = data.toString()
          logger.log(output)

          if (
            output.includes('watching project sources') &&
            ready !== true
          ) {
            logger.success('dev process ready')
            ready = true
            done()
          }
        })

        devProcess.stderr?.on('data', data => {
          logger.error(data.toString())
        })
      })
  })

  afterAll(async () => {
    try {
      await reset()
      await page?.close()
      await browser?.close()
      devProcess.kill('SIGQUIT')
    } catch (e) {
      logger.error(e)
    }
  })

  beforeEach(async () => {
    try {
      await reset()
      page = await browser.newPage()
      await page.goto('http://0.0.0.0:3005/')
    } catch (e) {
      logger.error(e)
    }
  })

  afterEach(async () => {
    try {
      await reset()
      await page?.close()
    } catch (e) {
      logger.error(e)
    }
  })

  it('should have page title: `Webpack App`', async () => {
    const title = await page.title()
    expect(title).toBe('Webpack App')
  })

  it('should have expected initial markup', async () => {
    const app = await page.$('.app')
    expect(app).toBeTruthy()

    const color = await app?.evaluate(el => {
      return window.getComputedStyle(el).getPropertyValue('background')
    })
    expect(color).toMatchSnapshot(
      'rgb(88, 19, 213) none repeat scroll 0% 0% / auto padding-box border-box',
    )
  })

  it('should hot update when src/global.css is modified', async () => {
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
