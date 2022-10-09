import {describe, test} from '@jest/globals'
import {Extension} from '@roots/bud-framework'

import extensionConstructor from './index'

describe(`mini-css-extract-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(extensionConstructor).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
