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

  beforeAll(done => {
    chromium
      .launch()
      .then(async instance => {
        browser = instance
      })
      .then(() => {
        try {
          devProcess = execa(
            'node',
            ['./node_modules/.bin/bud', 'dev', '--html'],
            {
              cwd: join(paths.mocks, 'yarn', 'basic'),
            },
          )

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

  beforeEach(async () => {
    page = await browser.newPage()
    await page.goto('http://0.0.0.0:3000/')
  })

  afterEach(reset)

  afterAll(async () => {
    devProcess.kill('SIGQUIT')
    await reset()

    await page.close()
    await browser.close()
  })

  it('is accessible, has intiial body classes and adds new body classes after updating src/index.js', async () => {
    const title = await page.title()
    expect(title).toBe('Webpack App')

    const init = await page.$('.init')
    expect(init).toBeTruthy()

    await update()
    await page.waitForTimeout(3000)

    const hot = await page.$('.hot')
    expect(hot).toBeTruthy()
  })
}
