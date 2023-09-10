import '@roots/bud-react'
import Extension from '@roots/bud-react/extension'
import {describe, expect, it} from 'vitest'

describe(`@roots/bud-react`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
