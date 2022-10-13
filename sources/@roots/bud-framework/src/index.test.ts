import {describe, expect, it} from '@jest/globals'

import {Bud, Extension, Logger, Service} from './index'

describe(`@roots/bud-framework`, () => {
  it(`should have a Bud export`, () => {
    expect(Bud).toBeInstanceOf(Function)
  })

  it(`should have a Extension export`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })

  it(`should have a Logger export`, () => {
    expect(Logger).toBeInstanceOf(Function)
  })

  it(`should have a Service export`, () => {
    expect(Service.Service).toBeInstanceOf(Function)
  })

  it(`should have a ServiceContainer export`, () => {
    expect(Service.ServiceContainer).toBeInstanceOf(Function)
  })
})
