import {describe, expect, it} from 'vitest'

import Extension from '../src/index.js'

describe(`@roots/bud-wordpress-dependencies`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
