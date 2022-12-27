import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'

import {Api} from './service.js'

describe(`@roots/bud-api`, () => {
  let bud: Bud
  let api: Api

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
    api = new Api(() => bud)
    bud.api = api
  })

  it(`should have a method bootstrap()`, async () => {
    expect(api.bootstrap).toBeInstanceOf(Function)
  })

  it(`should have a method call()`, async () => {
    expect(api.call).toBeInstanceOf(Function)
  })

  it(`should have a method bindFacade()`, () => {
    expect(api.bindFacade).toBeInstanceOf(Function)
  })

  it(`should add methods when bootstrapped`, async () => {
    await api.bootstrap(bud)
    expect(api.all()).toMatchSnapshot()
  })

  it(`should call bud.bindMethod when \`bindFacade\` is called`, async () => {
    const setSpy = vi.spyOn(api, `set`)
    const bindSpy = vi.spyOn(bud, `bindMethod`)
    const testFn = () => true

    api.bindFacade(`test`, testFn)

    expect(setSpy).toHaveBeenCalledTimes(1)
    expect(setSpy).toHaveBeenCalledWith(`test`, expect.any(Function))
    expect(bindSpy).toHaveBeenCalledTimes(1)
    expect(bindSpy).toHaveBeenCalledWith(`test`, expect.any(Function))
  })

  it(`should call the mapped function when \`call\` is called`, async () => {
    const mockFn = vi.fn()
    const getSpy = vi.spyOn(api, `get`)
    const hasSpy = vi.spyOn(api, `has`)

    api.set(`foo`, mockFn)

    // @ts-ignore
    await api.call(`foo`, `bar`)

    expect(hasSpy).toHaveBeenCalledTimes(1)
    expect(getSpy).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it(`should empty the queue and fill the trace when \`processQueue\` is called`, async () => {
    await api.bootstrap(bud)

    api.queue = []
    api.trace = []

    const callSpy = vi.spyOn(api, `call`)
    const hasSpy = vi.spyOn(api, `has`)
    const getSpy = vi.spyOn(api, `has`)

    bud.minimize()
    expect(api.queue[0]).toEqual(expect.arrayContaining([`minimize`, []]))

    await api.processQueue()

    expect(api.queue).toEqual([])
    expect(api.trace).toHaveLength(1)

    expect(callSpy).toHaveBeenCalledTimes(1)
    expect(hasSpy).toHaveBeenCalledTimes(1)
    expect(getSpy).toHaveBeenCalledTimes(1)
  })
})
