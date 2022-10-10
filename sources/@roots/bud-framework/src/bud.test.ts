import {describe, expect, it, jest} from '@jest/globals'
import Hooks from '@repo/test-kit/mocks/hooks'

import {Bud} from './bud.js'

jest.unstable_mockModule(`@roots/bud-hooks`, () => {
  return {default: Hooks}
})

describe(`Bud`, function () {
  it(`is a class`, () => {
    expect(Bud).toBeInstanceOf(Function)
  })

  it(`is a constructor`, () => {
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

  it(`is bootstrappable with only context.basedir`, async () => {
    const bud = new Bud()
    const hooks = await import(`@roots/bud-hooks`).then(
      // @ts-ignore
      pkg => new pkg.default(),
    )
    // @ts-ignore
    bud.hooks = hooks
    bud.hooks.on = jest.fn(() => bud)
    bud.hooks.fromAsyncMap = jest.fn(() => bud)
    bud.hooks.fromMap = jest.fn(() => bud)
    // @ts-ignore
    bud.hooks.filter = jest.fn()
    bud.hooks.fire = jest.fn(async () => bud)
    bud.hooks.action = jest.fn(() => bud)

    expect(
      await bud.lifecycle({
        basedir: `/foo/`,
        label: `foo`,
        services: [`@roots/bud-hooks`],
      }),
    ).toBeInstanceOf(Bud)
  })
})
