import {beforeEach, describe, expect, it} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'

import {Api} from './service'

describe(`Api`, () => {
  let bud: Bud
  let instance: Api

  beforeEach(async () => {
    bud = await factory()
    instance = new Api(bud)
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
