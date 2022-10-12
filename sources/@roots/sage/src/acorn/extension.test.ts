import {describe, expect, it} from '@jest/globals'

import Extension from './extension'

describe(`@roots/sage/acorn`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
