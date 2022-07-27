/* eslint-disable no-console */
import {describe, expect, it, jest} from '@jest/globals'
import {paths} from '@repo/constants'
import {execa, ExecaChildProcess} from 'execa'
import fs from 'fs-extra'
import {join} from 'path'
import {Browser, chromium, Page} from 'playwright'

jest.setTimeout(100000)

describe('hmr js', () => {
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
          devProcess = execa(
            'node',
            ['./node_modules/.bin/bud', 'dev', '--html'],
            {
              cwd: join(paths.mocks, 'yarn', 'basic'),
            },
          )

          devProcess.stdout?.on('data', () => {
            setTimeout(done, 2000).unref()
          })
        } catch (e) {
          console.error(e)
        }
      })
  })

  afterAll(async () => {
    devProcess.kill()
    await browser.close()
  })

  beforeEach(async () => {
    page = await browser.newPage()
    await page.goto('http://0.0.0.0:3000/')
  })

  afterEach(async () => {
    await page.close()
  })

  it('readied up', async () => {
    const title = await page.title()
    expect(title).toBe('Webpack App')
  })

  it('has indicator component', async () => {
    const indicator = await page.$('bud-activity-indicator')
    expect(indicator).toBeTruthy()
    const html = await page?.innerHTML('bud-activity-indicator')
    expect(html).toMatchSnapshot()
  })

  it('hot updates js', async () => {
    await page.waitForTimeout(1000)

    const body = await page.$('body')
    const classList = await body?.getProperty('classList')
    const classes = await classList?.jsonValue()

    expect(Object.values(classes)).toContain('init')
    expect(Object.values(classes)).toMatchSnapshot()

    await fs
      .writeFile(
        join(paths.mocks, 'yarn', 'basic', 'src', 'index.js'),
        `\
import './styles.css'

document.querySelector('body')?.classList.add('hot')

module?.hot?.accept()
`,
      )
      .then(async () => {
        await page.waitForTimeout(1000)

        const body = await page.$('body')
        const classList = await body?.getProperty('classList')
        const classes = await classList?.jsonValue()
        expect(Object.values(classes)).toContain('hot')
        expect(Object.values(classes)).toMatchSnapshot()
      })
  })
})
