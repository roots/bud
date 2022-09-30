import {describe, expect, it, jest} from '@jest/globals'
import type Bud from '@roots/bud'

import {Api} from './service'

const mockBud = {
  bindMethod: jest.fn(() => null),
  hooks: {
    action: jest.fn(() => null),
  },
  logger: {
    scope: [`@test`],
    instance: {
      scope: jest.fn(() => null),
    },
  },
  json: {
    stringify: jest.fn(),
  },
  log: jest.fn(() => null),
  error: jest.fn(() => null),
  fatal: jest.fn(() => null),
}

describe(`Api`, () => {
  // @ts-ignore
  let instance: Api = {}

  beforeEach(async () => {
    jest.clearAllMocks()
    // @ts-ignore
    instance = new Api(mockBud)
  })

  it(`should have a method bootstrap()`, async () => {
    // await instance.bootstrap();
    expect(instance.bootstrap).toBeInstanceOf(Function)
  })

  it(`should have a method registered()`, async () => {
    // await instance.registered();
    expect(instance.registered).toBeInstanceOf(Function)
  })

  it(`registered should set processQueue actions`, async () => {
    // @ts-ignore
    const processQueue = jest.spyOn(instance, `processQueue`)

    // @ts-ignore
    await instance.registered()

    // @ts-ignore
    expect(processQueue).toHaveBeenCalledTimes(1)
    expect(mockBud.hooks.action).toHaveBeenCalledTimes(2)
  })

  it(`should have a method bindFacade()`, () => {
    // instance.bindFacade(name,fn);
    expect(instance.bindFacade).toBeInstanceOf(Function)
  })

  it(`bindFacade should call bud.bindMethod`, async () => {
    const set = jest.fn(() => true)
    const testFn = () => true

    // @ts-ignore
    instance.set = set

    instance.bindFacade(`test`, testFn)

    // @ts-ignore
    expect(set).toHaveBeenCalledTimes(1)
    expect(mockBud.bindMethod).toHaveBeenCalledTimes(1)
  })

  it(`should have a method call()`, async () => {
    expect(instance.call).toBeInstanceOf(Function)
  })

  it(`call() should call a function`, async () => {
    const mockFn = jest.fn(() => null)
    const has = jest.fn(() => true)
    const get = jest.fn((...args) => ({call: mockFn}))

    // @ts-ignore
    instance.get = get
    instance.has = has

    await instance.call(`foo`, `bar`)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})

describe(`processQueue`, () => {
  // @ts-ignore
  let instance: Api = {}

  beforeEach(async () => {
    jest.clearAllMocks()
    // @ts-ignore
    instance = new Api(mockBud)
  })

  it(`processQueue() should empty the queue and fill the trace`, async () => {
    // @ts-ignore
    const call = jest.spyOn(instance, `call`)
    instance.queue = [[`minimize`, []]]

    try {
      await instance.processQueue()
    } catch (e) {}

    expect(call).toHaveBeenCalled()
    expect(instance.trace).toHaveLength(1)
  })
})
