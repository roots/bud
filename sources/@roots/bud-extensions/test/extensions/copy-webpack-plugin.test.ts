import {describe, expect, it, test} from 'vitest'

import extensionConstructor from '../../src/copy-webpack-plugin/index.js'

describe(`@roots/bud-extensions/copy-webpack-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(extensionConstructor).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
