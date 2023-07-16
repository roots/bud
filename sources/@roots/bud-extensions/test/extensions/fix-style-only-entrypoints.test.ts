import {describe, expect, it, test} from 'vitest'

import extensionConstructor from '@roots/bud-extensions/fix-style-only-entrypoints'

describe(`bud-esm`, () => {
  it(`is an instance of Extension`, () => {
    expect(extensionConstructor).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
