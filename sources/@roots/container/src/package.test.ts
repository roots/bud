import {describe, expect, it} from 'vitest'

import Container from './index.js'

describe(`@roots/container`, () => {
  it(`should be constructable`, () => {
    expect(Container).toBeInstanceOf(Function)
  })
})
