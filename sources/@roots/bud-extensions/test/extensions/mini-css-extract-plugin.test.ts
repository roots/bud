import {describe, expect, it, test} from 'vitest'

import extensionConstructor from '../../src/extensions/mini-css-extract-plugin/index.js'

describe(`mini-css-extract-plugin`, () => {
  it(`should be an instance of Extension`, () => {
    expect(extensionConstructor).toBeInstanceOf(Function)
  })

  test.todo(`should be tested`)
})
