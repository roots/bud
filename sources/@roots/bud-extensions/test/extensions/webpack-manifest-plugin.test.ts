import {describe, expect, it, test} from 'vitest'

import manifestExtension from '@roots/bud-extensions/webpack-manifest-plugin'

describe(`webpack-manifest-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(manifestExtension).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
