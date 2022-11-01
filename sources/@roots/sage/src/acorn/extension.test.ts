import {describe, expect, it} from 'vitest'

import Extension from './extension'

describe(`@roots/sage/acorn`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
