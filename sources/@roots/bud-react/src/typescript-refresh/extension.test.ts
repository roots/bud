import {describe, expect, it} from '@jest/globals'

import Extension from './index'

describe(`@roots/bud-react/typescript-refresh`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
