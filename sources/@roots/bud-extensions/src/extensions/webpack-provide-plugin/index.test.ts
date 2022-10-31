import {describe, test} from '@jest/globals'
import {Extension} from '@roots/bud-framework'

import provideExtension from './index'

describe(`@roots/bud-extensions/webpack-provide-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(provideExtension).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
