import Extension from '@roots/bud-react/react-refresh'
import {describe, expect, it} from 'vitest'

describe(`@roots/bud-react/react-refresh`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
