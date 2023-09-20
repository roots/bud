import Extension from '@roots/bud-react/swc-refresh'
import {describe, expect, it} from 'vitest'

describe(`@roots/bud-react/swc-refresh`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
