import {describe, expect, it} from 'vitest'

import {Bud, Extension, Service, ServiceContainer} from '../src/index.js'

describe(`@roots/bud-framework`, () => {
  it(`should have a Service export`, () => {
    expect(Service).toBeInstanceOf(Function)
  })

  it(`should have a ServiceContainer export`, () => {
    expect(ServiceContainer).toBeInstanceOf(Function)
  })
})
