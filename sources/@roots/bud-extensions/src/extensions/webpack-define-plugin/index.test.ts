import {describe, expect, it, test} from 'vitest'

import defineExtension from './index.js'

describe(`@roots/bud-extensions/webpack-define-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(defineExtension).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
