import BudSass from '@roots/bud-sass'
import {describe, expect, it} from 'vitest'

describe(`@roots/bud-sass`, () => {
  it(`has @roots/bud-sass name`, () => {
    expect(BudSass).toBeInstanceOf(Function)
  })
})
