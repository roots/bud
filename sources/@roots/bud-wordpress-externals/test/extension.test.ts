import {describe, expect, it} from 'vitest'

import Extension from '../src/index.js'

describe(`@roots/bud-wordpress-externals`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
