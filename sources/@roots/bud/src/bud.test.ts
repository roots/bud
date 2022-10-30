import {beforeEach, describe, expect, it, jest} from '@jest/globals'

import Bud from './bud'

describe(`@roots/bud/bud`, function () {
  let bud: Bud

  beforeEach(async () => {
    jest.clearAllMocks()
    bud = new Bud()
  })

  it(`should be instance of Framework`, () => {
    expect(bud).toBeInstanceOf(Bud)
  })
})
