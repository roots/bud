import {describe, expect, it} from 'vitest'

import Extension from './index.js'

describe(`@roots/bud-react/babel-refresh`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
