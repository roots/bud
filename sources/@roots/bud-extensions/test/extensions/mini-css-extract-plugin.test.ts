import {describe, expect, it, test} from 'vitest'

import extensionConstructor from '@roots/bud-extensions/mini-css-extract-plugin'

describe(`mini-css-extract-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(extensionConstructor).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
