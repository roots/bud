import {afterAll, beforeAll, describe, expect, it} from 'vitest'

import {close, makeSetup, page, path, update} from './runner'

describe(
  `html output of examples/watch`,
  () => {
    beforeAll(makeSetup(`watch`))

    afterAll(close)

    it(`should rebuild on change`, async () => {
      await page.evaluate(() => {
        window.reloadCalled = false
        window.bud.reload = () => {
          window.reloadCalled = true
        }
      })

      await update(path(`watched`, `foo.html`), `foo`)

      expect(await page.evaluate(() => window.reloadCalled)).toBe(true)
    })
  },
  {timeout: 100000},
)
