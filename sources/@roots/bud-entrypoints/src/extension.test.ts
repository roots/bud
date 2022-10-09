import {describe, expect, it} from '@jest/globals'

import Extension from './index'

describe(`@roots/bud-entrypoints`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
