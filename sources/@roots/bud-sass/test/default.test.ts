import {describe, expect, it, vi} from 'vitest'

import defaultExport from '../src'
import {BudSass} from '../src/extension/index'

describe(`@roots/bud-sass`, () => {
  it(`should re-export @roots/bud-sass/extension`, () => {
    expect(defaultExport.name).toBe(BudSass.name)
  })
})
