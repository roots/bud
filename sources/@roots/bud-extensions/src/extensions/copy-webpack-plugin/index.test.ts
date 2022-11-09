import {describe, expect, it, test} from 'vitest'

import extensionConstructor from './index.js'

describe(`copy-webpack-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(extensionConstructor).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
