import {beforeEach, describe, expect, it, vi} from 'vitest'
import {factory} from '@repo/test-kit/bud'

import {Api} from './service.js'

/**
 * @unit
 */
describe(`@roots/bud-api`, () => {
  let bud
  let instance: Api

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
    instance = new Api(() => bud)
    bud.api = instance
  })

  it(`should have a method bootstrap()`, async () => {
    // await instance.bootstrap();
    expect(instance.bootstrap).toBeInstanceOf(Function)
  })

  it(`should have a method registered()`, async () => {
    // await instance.registered();
    expect(instance.registered).toBeInstanceOf(Function)
  })

  it(`should have a method call()`, async () => {
    expect(instance.call).toBeInstanceOf(Function)
  })

  it(`should have a method bindFacade()`, () => {
    expect(instance.bindFacade).toBeInstanceOf(Function)
  })

  it(`should add methods when bootstrapped`, async () => {
    await instance.bootstrap()
    expect(instance.all()).toMatchSnapshot()
  })

  it(`registered should set processQueue actions`, async () => {
    await instance.bootstrap()
    // @ts-ignore
    const processQueue = vi.spyOn(instance, `processQueue`)

    // @ts-ignore
    try {
      await instance.registered()
    } catch (e) {}

    // @ts-ignore
    expect(processQueue).toHaveBeenCalledTimes(1)
  })

  it(`should call bud.bindMethod when \`bindFacade\` is called`, async () => {
    const setSpy = vi.spyOn(instance, `set`)
    const bindSpy = vi.spyOn(bud, `bindMethod`)
    const testFn = () => true

    instance.bindFacade(`test`, testFn)

    expect(setSpy).toHaveBeenCalledTimes(1)
    expect(setSpy).toHaveBeenCalledWith(`test`, expect.any(Function))
    expect(bindSpy).toHaveBeenCalledTimes(1)
    expect(bindSpy).toHaveBeenCalledWith(`test`, expect.any(Function))
  })

  it(`should call the mapped function when \`call\` is called`, async () => {
    const mockFn = vi.fn()
    const getSpy = vi.spyOn(instance, `get`)
    const hasSpy = vi.spyOn(instance, `has`)

    instance.set(`foo`, mockFn)

    await instance.call(`foo`, `bar`)

    expect(hasSpy).toHaveBeenCalledTimes(1)
    expect(getSpy).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it(`should empty the queue and fill the trace when \`processQueue\` is called`, async () => {
    await instance.bootstrap()

    instance.queue = []
    instance.trace = []

    const callSpy = vi.spyOn(instance, `call`)
    const infoSpy = vi.spyOn(instance.logger, `info`)
    const hasSpy = vi.spyOn(instance, `has`)
    const getSpy = vi.spyOn(instance, `has`)

    bud.minimize()
    expect(instance.queue[0]).toEqual(
      expect.arrayContaining([`minimize`, []]),
    )

    await instance.processQueue()

    expect(instance.queue).toEqual([])
    expect(instance.trace).toHaveLength(1)

    expect(infoSpy).toHaveBeenCalledTimes(1)
    expect(callSpy).toHaveBeenCalledTimes(1)
    expect(hasSpy).toHaveBeenCalledTimes(1)
    expect(getSpy).toHaveBeenCalledTimes(1)
  })
})
