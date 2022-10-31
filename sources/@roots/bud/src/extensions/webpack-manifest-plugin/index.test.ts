import {Extension} from '@roots/bud-framework'
import {describe, expect, it, test} from 'vitest'

import manifestExtension from './index'

describe(`webpack-manifest-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(manifestExtension).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
