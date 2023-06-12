import {Bud} from '@roots/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

describe(`@roots/bud/bud`, function () {
  let bud: Bud

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = new Bud()
  })

  it(`should be instance of Framework`, () => {
    expect(bud).toBeInstanceOf(Bud)
  })
})
