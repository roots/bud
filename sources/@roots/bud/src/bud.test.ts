import {beforeEach, describe, expect, it, jest} from '@jest/globals'
import {Bud} from '@roots/bud-framework'

import budConstructor from './bud.js'

describe(`@roots/bud/bud`, function () {
  let bud

  beforeEach(async () => {
    jest.clearAllMocks()
    bud = new budConstructor()
  })

  it(`should be instance of Framework`, () => {
    expect(bud).toBeInstanceOf(Bud)
  })
})
