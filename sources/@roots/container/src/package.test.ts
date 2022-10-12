import {describe, expect, it} from '@jest/globals'

import Container from './index'

describe(`@roots/container`, () => {
  it(`should be constructable`, () => {
    expect(Container).toBeInstanceOf(Function)
  })
})
