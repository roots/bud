/* eslint-disable no-console */

import {expect, it} from '@jest/globals'
import {paths} from '@repo/constants'
import * as repoLogger from '@repo/logger'
import {execa, ExecaChildProcess} from 'execa'
import fs from 'fs-extra'
import {join} from 'path'
import {Browser, chromium, Page} from 'playwright'

const logger = repoLogger.make({interactive: false}).scope('e2e', 'basic')

const reset = async () =>
  fs.writeFile(
    join(paths.mocks, 'yarn', 'basic', 'src', 'index.js'),
    `\
import './styles.css'

document.querySelector('body')?.classList.add('init')

module?.hot?.accept()
`,
  )

const update = async () =>
  fs.writeFile(
    join(paths.mocks, 'yarn', 'basic', 'src', 'index.js'),
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
    logger.await('initializing dev process')

    try {
      chromium
        .launch()
        .then(instance => {
          browser = instance
        })
        .then(async () => {
          try {
            devProcess = execa(
              'node',
              ['./node_modules/.bin/bud', 'dev', '--html', '--log'],
              {
                cwd: join(paths.mocks, 'yarn', 'basic'),
              },
            )

            devProcess.stdout?.on('data', data => {
              const output = data.toString()

              output.includes(`[http]`) &&
                logger.log(output.replace('\n', ''))

              if (output.includes('duration') && ready !== true) {
                logger.success('dev process ready')
                ready = true
                done()
              }
            })

            devProcess.stderr?.on('data', data => {
              logger.error(data.toString())
            })
          } catch (e) {
            throw new Error(e)
          }
        })
    } catch (e) {
      logger.error(e)
    }
  })

  afterAll(async () => {
    try {
      devProcess.kill('SIGQUIT')
      await page.close()
      await browser.close()
    } catch (e) {
      logger.error(e)
    }

    await reset()
  })

  beforeEach(async () => {
    try {
      page = await browser.newPage()
      await page.goto('http://0.0.0.0:3000/')
    } catch (e) {
      logger.error(e)
    }

    await reset()
  })

  afterEach(async () => {
    try {
      await page.close()
    } catch (e) {
      logger.error(e)
    }

    await reset()
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
