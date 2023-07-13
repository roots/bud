import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit'

import {Api} from './service.js'

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

  it(`should have a method bindFacade()`, () => {
    expect(api.bindFacade).toBeInstanceOf(Function)
  })

  it(`should add methods when bootstrapped`, async () => {
    await api.bootstrap?.(bud)
    expect(api.all()).toMatchSnapshot()
  })

  it(`should call bud.set when \`bindFacade\` is called`, async () => {
    const setSpy = vi.spyOn(api, `set`)
    const bindSpy = vi.spyOn(bud, `set`)
    const testFn = () => true

    api.bindFacade(`test` as any, testFn)

    expect(setSpy).toHaveBeenCalledTimes(1)
    expect(setSpy).toHaveBeenCalledWith(`test`, expect.any(Function))
    expect(bindSpy).toHaveBeenCalledTimes(1)
    expect(bindSpy).toHaveBeenCalledWith(`test`, expect.any(Function))
  })
})
