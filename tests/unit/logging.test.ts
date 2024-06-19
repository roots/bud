import {Bud, factory} from '@repo/test-kit'
import {beforeAll, describe, expect, it, vi} from 'vitest'

describe(`bud`, function () {
  describe(`logging`, () => {
    describe(`log`, () => {
      let bud: Bud

      beforeAll(async () => {
        bud = await factory({log: true})
      })

      it(`should be a function`, () => {
        expect(bud.log).toBeInstanceOf(Function)
      })
    })

    describe(`info`, () => {
      let bud: Bud

      beforeAll(async () => {
        bud = await factory({log: true})
      })

      it(`should be a function`, () => {
        expect(bud.info).toBeInstanceOf(Function)
      })
    })

    describe(`warn`, () => {
      let bud: Bud

      beforeAll(async () => {
        bud = await factory({log: true})
      })

      it(`should be a function`, () => {
        expect(bud.warn).toBeInstanceOf(Function)
      })
    })

    describe(`error`, () => {
      let bud: Bud

      beforeAll(async () => {
        bud = await factory({log: true})
      })

      it(`should be a function`, () => {
        expect(bud.error).toBeInstanceOf(Function)
      })
    })
  })
})
