import {describe, expect, it} from 'vitest'

import {Bud, Extension, Service, ServiceContainer} from './index.js'

describe(`@roots/bud-framework`, () => {
  it(`should have a Bud export`, () => {
    expect(Bud).toBeInstanceOf(Function)
  })

  it(`should have a Extension export`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })

  it(`should have a Service export`, () => {
    expect(Service).toBeInstanceOf(Function)
  })

  it(`should have a ServiceContainer export`, () => {
    expect(ServiceContainer).toBeInstanceOf(Function)
  })
})
