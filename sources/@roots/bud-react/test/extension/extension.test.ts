import '@roots/bud-react/types'

import {describe, expect, it} from 'vitest'

import Extension from '../../src/index'

describe(`@roots/bud-react`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
