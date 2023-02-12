import {describe, expect, it, test} from 'vitest'

import extensionConstructor from '../../src/extensions/fix-style-only-entrypoints/index.js'

describe(`bud-esm`, () => {
  it(`is an instance of Extension`, () => {
    expect(extensionConstructor).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
