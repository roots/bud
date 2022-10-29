import {describe, test} from '@jest/globals'
import {Extension} from '@roots/bud-framework'

import defineExtension from './index'

describe(`@roots/bud-extensions/webpack-define-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(defineExtension).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
