import {describe, expect, it, jest} from '@jest/globals'
import type {Bud} from '@roots/bud'

import {Api} from './service'

const mockBud = {
  bindMethod: jest.fn(() => null),
  hooks: {
    action: jest.fn(() => null),
  },
  log: jest.fn(() => null),
  error: jest.fn(() => null),
  fatal: jest.fn(() => null),
} as unknown as Bud

describe(`Api`, () => {
  let instance: Api

  beforeAll(async () => {
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

  it(`should have a method bindFacade()`, () => {
    // instance.bindFacade(name,fn);
    expect(instance.bindFacade).toBeInstanceOf(Function)
  })

  it(`should have a method call()`, async () => {
    // await instance.call(name,args);
    expect(instance.call).toBeInstanceOf(Function)
  })

  it(`should have a method processQueue()`, async () => {
    // await instance.processQueue();
    expect(instance.processQueue).toBeInstanceOf(Function)
  })
})
