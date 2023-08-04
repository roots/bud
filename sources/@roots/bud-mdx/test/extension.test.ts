import {default as BudMDX} from '@roots/bud-mdx'
import {describe, expect, it} from 'vitest'

describe(`@roots/bud-mdx`, () => {
  it(`should be constructable`, () => {
    expect(BudMDX).toBeInstanceOf(Function)
  })
})
