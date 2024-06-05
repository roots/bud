import {describe, expect, it} from 'vitest'

import * as RootExport from '../src/index.js'

describe(`@roots/bud-framework`, () => {
  it(`should have a Bud export`, () => {
    expect(RootExport.Bud).toBeInstanceOf(Function)
  })

  it(`should have a Service export`, () => {
    expect(RootExport.Service).toBeInstanceOf(Function)
  })

  it(`should have a ServiceContainer export`, () => {
    expect(RootExport.ServiceContainer).toBeInstanceOf(Function)
  })

  it(`should have a Extension export`, () => {
    expect(RootExport.Extension).toBeInstanceOf(Function)
  })
})
