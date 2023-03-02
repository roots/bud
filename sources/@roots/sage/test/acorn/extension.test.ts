import {describe, expect, it} from 'vitest'

import Extension from '../../src/acorn/extension.js'

describe(`@roots/sage/acorn`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
