import {describe, expect, it, test} from 'vitest'

import manifestExtension from '../../src/webpack-manifest-plugin/index.js'

describe(`webpack-manifest-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(manifestExtension).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
