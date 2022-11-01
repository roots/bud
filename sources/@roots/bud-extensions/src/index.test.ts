import {describe, expect, it} from 'vitest'

import * as Extensions from './index.js'

describe(`@roots/bud-extensions`, () => {
  it(`exports extensions service`, async () => {
    expect(Extensions.default).toBeInstanceOf(Function)
  })
})
