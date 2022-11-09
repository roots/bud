import {describe, expect, it} from 'vitest'

import Plugin from './index.js'

describe(`@roots/wordpress-externals-webpack-plugin`, () => {
  it(`should be constructable`, () => {
    expect(Plugin).toBeInstanceOf(Function)
  })
})
