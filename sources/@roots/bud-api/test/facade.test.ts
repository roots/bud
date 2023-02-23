import {describe, expect, it} from 'vitest'

import {factory} from '../src/facade/facade.factory.js'

describe(`facade`, () => {
  it(`should have a Facade class`, () => {
    expect(factory).toBeInstanceOf(Function)
  })
})
