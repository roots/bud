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
    join(paths.mocks, 'yarn', '@examples', 'basic', 'src', 'index.js'),
    `\
import './styles.css'

document.querySelector('body')?.classList.add('init')

module?.hot?.accept()
`,
  )

const update = async () =>
  fs.writeFile(
    join(paths.mocks, 'yarn', '@examples', 'basic', 'src', 'index.js'),
    `\
import './styles.css'

document.querySelector('body').classList.add('hot')

module?.hot?.accept()
`,
  )

export const test = () => {
  let browser: Browser
  let page: Page
  let devProcess: ExecaChildProcess
  let ready = false

  beforeAll(done => {
    logger.log('setting up')

    chromium
      .launch()
      .then(instance => {
        browser = instance
      })
      .then(async () => {
        logger.log('initializing dev process')

        devProcess = execa(
          'node',
          ['./node_modules/.bin/bud', 'dev', '--html', '--no-cache'],
          {
            cwd: join(paths.mocks, 'yarn', '@examples', 'basic'),
          },
        )

        devProcess.stdout?.on('data', data => {
          const output = data.toString()
          logger.log(output)

          if (
            output.includes('watching project sources') &&
            ready !== true
          ) {
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
      await page.goto('http://0.0.0.0:3000/')
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
    const init = await page.$('.init')
    expect(init).toBeTruthy()
  })

  it('should add new body class after updating src/index.js', async () => {
    await update()
    await page.waitForTimeout(3000)

    const hot = await page.$('.hot')
    expect(hot).toBeTruthy()
  })
}
