import {beforeEach, describe, expect, it, vi} from 'vitest'

import {Api} from './service'

const mockBud = {
  bindMethod: vi.fn(() => null),
  fs: {
    json: {
      read: vi.fn(() => null),
      write: vi.fn(),
      stringify: vi.fn(),
      parse: vi.fn(),
    },
    yml: {
      read: vi.fn(),
      write: vi.fn(),
      parse: vi.fn(),
    },
  },
  hooks: {
    action: vi.fn(() => null),
  },
  logger: {
    scope: [`@test`],
    instance: {
      scope: vi.fn(() => null),
    },
  },
  json: {
    stringify: vi.fn(),
  },
  log: vi.fn(() => null),
  error: vi.fn(() => null),
  fatal: vi.fn(() => null),
}

describe(`Api`, () => {
  // @ts-ignore
  let instance: Api = {}

  beforeEach(async () => {
    vi.clearAllMocks()
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
    const processQueue = vi.spyOn(instance, `processQueue`)

    // @ts-ignore
    await instance.registered()

    // @ts-ignore
    expect(processQueue).toHaveBeenCalledTimes(1)
  })

  it(`should have a method bindFacade()`, () => {
    // instance.bindFacade(name,fn);
    expect(instance.bindFacade).toBeInstanceOf(Function)
  })

  it(`bindFacade should call bud.bindMethod`, async () => {
    const set = vi.fn(() => true)
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
    const mockFn = vi.fn(() => null)
    const has = vi.fn(() => true)
    const get = vi.fn((...args) => ({call: mockFn}))

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

  it(`processQueue() should empty the queue and fill the trace`, async () => {
    // @ts-ignore
    instance = new Api(mockBud)
    // @ts-ignore
    const call = vi.spyOn(instance, `call`)
    // @ts-ignore
    instance.logger = {
      info: vi.fn(),
    }
    instance.has = vi.fn(() => true)
    // @ts-ignore
    instance.get = vi.fn(() => () => {})
    instance.queue = [[`minimize`, []]]

    await instance.processQueue()
    expect(instance.logger.info).toHaveBeenCalled()
    expect(instance.has).toHaveBeenCalled()
    expect(instance.get).toHaveBeenCalled()
    expect(instance.queue).toHaveLength(0)
    expect(call).toHaveBeenCalled()
    expect(instance.trace).toHaveLength(1)
  })
})
