import {describe, expect, it} from 'vitest'

import Extension from './extension.js'

describe(`@roots/sage/acorn`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
