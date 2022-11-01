import {Bud as Core} from '@roots/bud-framework/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {Bud} from './index.js'

describe(`@roots/bud/bud`, function () {
  let bud: Bud

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = new Bud()
  })

  it(`should be instance of Framework`, () => {
    expect(bud).toBeInstanceOf(Core)
  })
})
