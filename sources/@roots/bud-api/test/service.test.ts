import {Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import Api from '../src'
import * as methods from '../src/methods'

describe(`@roots/bud-api`, () => {
  let bud: Bud
  let api: Api

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
    api = new Api(() => bud)
    bud.set(`api`, api)
  })

  it(`should have a method bootstrap()`, async () => {
    expect(api.bootstrap).toBeInstanceOf(Function)
  })

  it(`should add methods when bootstrapped`, async () => {
    await api.bootstrap?.(bud)

    expect(Object.keys(bud)).toEqual(
      expect.arrayContaining(Object.keys(methods)),
    )
  })
})
