import {describe, expect, it} from 'vitest'

import BudSass from './index.js'

describe(`@roots/bud-sass`, () => {
  it(`should be a function`, async () => {
    expect(BudSass).toBeInstanceOf(Function)
  })
})