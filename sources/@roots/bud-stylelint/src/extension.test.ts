import {describe, expect, it} from 'vitest'

import Extension from './index'

describe(`@roots/bud-stylelint`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
