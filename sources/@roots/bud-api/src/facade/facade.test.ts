import {describe, expect, it} from 'vitest'

import {factory} from './facade.factory.js'

describe(`facade`, () => {
  it(`should have a Facade class`, () => {
    expect(factory).toBeInstanceOf(Function)
  })
})
