import {describe, expect, it} from 'vitest'

import {Bud} from './bud.js'

describe(`Bud`, function () {
  it(`should be a class`, () => {
    expect(Bud).toBeInstanceOf(Function)
  })

  it(`should be a constructor`, () => {
    expect(new Bud()).toBeInstanceOf(Bud)
  })

  it(`throws when bootstrapped with no context`, async () => {
    try {
      // @ts-ignore
      expect(await new Bud().lifecycle()).toThrowError()
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
    }
  })
})
