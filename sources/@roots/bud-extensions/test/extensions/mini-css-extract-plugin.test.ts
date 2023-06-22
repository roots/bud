import {describe, expect, it, test} from 'vitest'

import extensionConstructor from '../../src/mini-css-extract-plugin/index.js'

describe(`mini-css-extract-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(extensionConstructor).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
