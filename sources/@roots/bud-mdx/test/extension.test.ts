import {describe, expect, it} from 'vitest'

import {BudMDX} from '../src/extension.js'

describe(`@roots/bud-mdx`, () => {
  it(`should be constructable`, () => {
    expect(BudMDX).toBeInstanceOf(Function)
  })
})
