import {describe, expect, it} from 'vitest'

import Default, {Bud, factory, get} from './index'

describe(`@roots/bud`, () => {
  it(`should have a default export that is Bud`, () => {
    expect(Default).toBe(Bud)
  })

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
