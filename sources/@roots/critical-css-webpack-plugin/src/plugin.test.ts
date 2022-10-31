import {describe, expect, it} from 'vitest'

import Plugin from './index'

describe(`@roots/critical-css-webpack-plugin`, () => {
  it(`should be constructable`, () => {
    expect(Plugin).toBeInstanceOf(Function)
  })
})
