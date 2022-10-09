import {describe, test} from '@jest/globals'
import {Extension} from '@roots/bud-framework'

import manifestExtension from './index'

describe(`webpack-manifest-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(manifestExtension).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
