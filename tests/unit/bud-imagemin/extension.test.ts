import {Bud, factory} from '@repo/test-kit/bud'
import imagemin from '@roots/bud-imagemin'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`@roots/bud-imagemin`, () => {
  let bud: Bud

  describe(`module register`, () => {
    beforeAll(async () => {
      bud = await factory()
      await bud.extensions.add(imagemin)
    })

    it(`exposes class through imagemin prop`, () => {
      expect(bud.imagemin).toBeInstanceOf(imagemin)
    })
    it(`setImplementation`, () => {
      expect(bud.imagemin.setImplementation).toBeInstanceOf(Function)
    })
    it(`setImplementation`, () => {
      bud.imagemin.setImplementation(`test` as any)
      expect(bud.imagemin.getImplementation()).toBe(`test`)
    })
  })
})
