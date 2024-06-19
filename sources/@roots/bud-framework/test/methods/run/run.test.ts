import {describe, expect, it} from 'vitest'

import {run} from '../../../src/methods/run/index'

describe(`bud.run`, () => {
  it(`is a function`, async () => {
    expect(run).toBeInstanceOf(Function)
  })
})
