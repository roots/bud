import {describe, test} from '@jest/globals'

import extensionConstructor from './index'

describe(`clean-webpack-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(extensionConstructor).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
