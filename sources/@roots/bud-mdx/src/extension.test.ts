import {describe, expect, it} from '@jest/globals'

import Extension from './index'

describe(`@roots/bud-mdx`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
