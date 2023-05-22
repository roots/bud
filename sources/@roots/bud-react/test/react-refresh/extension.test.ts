import '@roots/bud-react/types'

import {describe, expect, it} from 'vitest'

import Extension from '../../src/extension/index.js'

describe(`@roots/bud-react/react-refresh`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
