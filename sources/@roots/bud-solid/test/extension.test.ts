import Extension from '@roots/bud-solid'
import {describe, expect, it} from 'vitest'

describe(`@roots/bud-solid`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
