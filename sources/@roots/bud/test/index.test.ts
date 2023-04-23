import {describe, expect, it} from 'vitest'

import {Bud, factory, get} from '../src/index.js'

describe(`@roots/bud`, () => {
  it(`should have a named Bud export`, () => {
    expect(Bud).toBeInstanceOf(Function)
  })

  it(`should have a named factory export`, () => {
    expect(factory).toBeInstanceOf(Function)
  })

  it(`should have a named get export`, () => {
    expect(get).toBeInstanceOf(Function)
  })
})
