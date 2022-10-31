import {Bud} from '@roots/bud-framework'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import budConstructor from './bud.js'

describe(`@roots/bud/bud`, function () {
  let bud

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = new budConstructor()
  })

  it(`should be instance of Framework`, () => {
    expect(bud).toBeInstanceOf(Bud)
  })
})
