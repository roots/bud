import {describe, expect, it} from '@jest/globals'

import Plugin from './index'

describe(`@roots/wordpress-externals-webpack-plugin`, () => {
  it(`should be constructable`, () => {
    expect(Plugin).toBeInstanceOf(Function)
  })
})
