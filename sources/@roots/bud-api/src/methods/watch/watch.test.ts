import {Bud, factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {watch as subject} from './index.js'

describe(`bud.watch`, () => {
  describe(`in development`, () => {
    let bud: Bud
    let watch: subject

    beforeEach(async () => {
      bud = await factory({mode: `development`})
      watch = subject.bind(bud)
    })

    it(`adds watch files`, async () => {
      await watch(`1/*.js`)

      const value = bud.hooks.filter(`dev.watch.files`)

      if (!(value instanceof Set))
        throw new Error(`watch files should be a set`)

      expect(Array.from(value)).toMatchSnapshot(
        expect.arrayContaining([`1/*.js`]),
      )
    })

    it(`adds files even if none have ever been added`, async () => {
      let result

      // @ts-ignore
      bud.hooks.on = vi.fn((key: any, hookFn: any) => {
        result = hookFn(undefined)
        return bud
      })

      await watch(`1/*.js`)

      // @ts-ignore
      expect(Array.from(result)).toEqual(
        expect.arrayContaining([`1/*.js`]),
      )
    })
  })

  describe(`in production`, () => {
    let bud: Bud
    let watch: subject

    beforeEach(async () => {
      bud = await factory({mode: `production`})
      watch = subject.bind(bud)
    })

    it(`should not run`, async () => {
      expect(bud.mode).toBe(`production`)

      const watch = subject.bind(bud)

      await watch(`1/*.js`)

      const value = bud.hooks.filter(`dev.watch.files`)
      expect(value).toBeUndefined()
    })
  })
})
