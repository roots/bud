/* eslint-disable no-console */
import {describe, expect, it, jest} from '@jest/globals'
import {paths} from '@repo/constants/.'
import {execa, ExecaChildProcess} from 'execa'
import fs from 'fs-extra'
import {join} from 'path'
import {Browser, chromium, Page} from 'playwright'

jest.setTimeout(100000)

describe('hmr css', () => {
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

          devProcess.stdout?.on('data', () => {
            done()
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
    await page?.close()
  })

  it('hot updates css', async () => {
    const app = await page.$('.app')
    const color = await app?.evaluate(el => {
      return window.getComputedStyle(el).getPropertyValue('background')
    })

    expect(color).toMatchSnapshot(
      'rgb(88, 19, 213) none repeat scroll 0% 0% / auto padding-box border-box',
    )

    await fs
      .writeFile(
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
      .then(async () => {
        await page.waitForTimeout(1000)
        const app = await page.$('.app')
        const color = await app?.evaluate(el => {
          return window.getComputedStyle(el).getPropertyValue('background')
        })

        expect(color).toMatchSnapshot(
          'rgb(0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box',
        )
      })
  })
})
