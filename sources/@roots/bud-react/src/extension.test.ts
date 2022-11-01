import {describe, expect, it} from 'vitest'

import Extension from './extension/extension.js'

describe(`@roots/bud-react`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
