import Extension from '@roots/bud-react/babel-refresh'
import {describe, expect, it} from 'vitest'

describe(`@roots/bud-react/babel-refresh`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
