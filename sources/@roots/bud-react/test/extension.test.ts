import {describe, expect, it} from 'vitest'

import Extension from '../src/extension/extension.js'

describe(`@roots/bud-react`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
