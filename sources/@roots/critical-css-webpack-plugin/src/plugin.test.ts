import {describe, expect, it} from '@jest/globals'

import Plugin from './index'

describe(`@roots/critical-css-webpack-plugin`, () => {
  it(`should be constructable`, () => {
    expect(Plugin).toBeInstanceOf(Function)
  })
})
