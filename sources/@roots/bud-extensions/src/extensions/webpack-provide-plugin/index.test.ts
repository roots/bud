import {describe, expect, it, test} from 'vitest'

import provideExtension from './index.js'

describe(`@roots/bud-extensions/webpack-provide-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(provideExtension).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
