import fs from 'fs-jetpack'
import {
  describe,
  expect,
  it,
} from 'vitest'

import * as fixture from './helpers'

describe(`html output of examples/babel`, () => {
  it(`should rebuild on change`, async () => {
    try {
      const {page} = await fixture.setupTest(`babel`)

      const title = await page.title()
      expect(title).toBe(`@examples/babel`)

      const root = await page.$(`#root`)
      expect(root).toBeTruthy()

      expect(
        await root?.evaluate(el =>
          window.getComputedStyle(el).getPropertyValue(`background`),
        ),
      ).toMatchSnapshot(
        `rgb(88, 19, 213) none repeat scroll 0% 0% / auto padding-box border-box`,
      )

      await updateCss()
      await page.waitForTimeout(12000)

      expect(
        await root?.evaluate(el =>
          window.getComputedStyle(el).getPropertyValue(`background`),
        ),
      ).toMatchSnapshot(
        `rgb(0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box`,
      )

      await updateJs()
      await page.waitForTimeout(12000)

      expect(await page.$(`.updated`)).toBeTruthy()
    } catch (error) {
      await fixture.close()
      throw error
    }

    await fixture.close()
  })
})

const updateCss = async () =>
  await fs.writeAsync(
    fixture.toPath(`babel`, `src`, `app.css`),
    `\
html,
body {
  padding: 0;
  margin: 0;
}

#root{
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

const updateJs = async () =>
  await fs.writeAsync(
    fixture.toPath(`babel`, `src`, `app.js`),
    `\
import '@src/app.css'

document.querySelector('.init')?.classList.add('updated')

if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error)
`,
  )
