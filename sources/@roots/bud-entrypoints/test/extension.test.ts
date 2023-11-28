import Extension from '@roots/bud-entrypoints'
import {describe, expect, it} from 'vitest'

describe(`@roots/bud-entrypoints`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
