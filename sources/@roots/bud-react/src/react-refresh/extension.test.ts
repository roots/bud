import {describe, expect, it} from 'vitest'

import Extension from './extension.js'

describe(`@roots/bud-react/react-refresh`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
