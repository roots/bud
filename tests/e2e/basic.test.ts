import fs from 'fs-jetpack'
import {
  describe,
  expect,
  it,
} from 'vitest'

import * as fixture from './helpers'

describe(`html output of examples/basic`, () => {
  it(`should rebuild on change`, async () => {
    try {
      const {page} = await fixture.setupTest(`basic`)

      await update()
      await page.waitForTimeout(12000)

      expect(await page.$(`.hot`)).toBeTruthy()
    } catch (error) {
      await fixture.close()
      throw error
    }

    await fixture.close()
  })
})

const update = async () =>
  await fs.writeAsync(
    fixture.toPath(`basic`, `src`, `index.js`),
    `\
import './styles.css'

document.querySelector('#root').classList.add('hot')

if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error)
`,
  )
