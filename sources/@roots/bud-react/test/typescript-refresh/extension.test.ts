import '@roots/bud-react/types'
import '@roots/bud-typescript/types'

import {describe, expect, it} from 'vitest'

import Extension from '../../src/index.js'

describe(`@roots/bud-react/typescript-refresh`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
