/* eslint-disable no-console */

import {expect, it} from '@jest/globals'
import {paths} from '@repo/constants'
import {logger} from '@repo/logger'
import {execa, ExecaChildProcess} from 'execa'
import fs from 'fs-extra'
import {join} from 'path'
import {Browser, chromium, Page} from 'playwright'

import copy from './util/copy'
import install from './util/install'

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

let browser: Browser
let page: Page
let devProcess: ExecaChildProcess

export const test = () => {
  beforeAll(done => {
    try {
      chromium
        .launch()
        .then(instance => {
          browser = instance
        })
        .then(copy('basic'))
        .then(install('basic'))
        .then(async () => {
          try {
            logger.log('initializing dev process')

            devProcess = execa(
              'node',
              ['./node_modules/.bin/bud', 'dev', '--html', '--no-cache'],
              {
                cwd: join(paths.mocks, 'yarn', '@examples', 'basic'),
              },
            )

            devProcess.stdout?.on('data', data => {
              const output: string = data.toString()
              logger.log(output)

              if (output.split('\n').some(ln => ln.includes('◉'))) {
                done()
              }
            })

            devProcess.stderr?.on('data', data => {
              logger.error(data.toString())
            })
          } catch (error) {
            logger.error(error)
          }
        })
    } catch (error) {
      throw new Error(error)
    }
  })

  afterAll(async () => {
    await browser?.close()
    devProcess?.kill('SIGINT')
  })

  beforeEach(async () => {
    await reset()
    page = await browser.newPage()
    await page.goto('http://0.0.0.0:3000/')
  })

  afterEach(async () => {
    await page?.close()
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
