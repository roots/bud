import {describe, expect, it} from '@jest/globals'

import {Bud} from './bud.js'

describe(`Bud`, function () {
  it(`is a class`, () => {
    expect(Bud).toBeInstanceOf(Function)
  })

  it(`is a constructor`, () => {
    expect(new Bud()).toBeInstanceOf(Bud)
  })

  it(`has bud.json`, () => {
    expect(new Bud().json.read).toBeInstanceOf(Function)
    expect(new Bud().json.write).toBeInstanceOf(Function)
  })

  it(`has bud.yml`, () => {
    expect(new Bud().yml.read).toBeInstanceOf(Function)
    expect(new Bud().yml.write).toBeInstanceOf(Function)
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
