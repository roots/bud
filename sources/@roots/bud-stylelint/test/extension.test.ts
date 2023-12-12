import Extension from '@roots/bud-stylelint'
import {describe, expect, it} from 'vitest'

describe(`@roots/bud-stylelint`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
