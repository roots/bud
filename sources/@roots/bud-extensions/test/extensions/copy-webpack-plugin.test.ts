import {describe, expect, it, test} from 'vitest'

import extensionConstructor from '@roots/bud-extensions/copy-webpack-plugin'

describe(`@roots/bud-extensions/copy-webpack-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(extensionConstructor).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
