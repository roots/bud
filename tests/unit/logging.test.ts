import {Bud, factory} from '@repo/test-kit/bud'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`bud`, function () {
  describe(`logging`, () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory()
    })

    it(`log is a function`, () => {
      expect(bud.log).toBeInstanceOf(Function)
    })

    it(`info is a function`, () => {
      expect(bud.info).toBeInstanceOf(Function)
    })

    it(`warn is a function`, () => {
      expect(bud.warn).toBeInstanceOf(Function)
    })

    it(`error is a function`, () => {
      expect(bud.error).toBeInstanceOf(Function)
    })
  })
})
