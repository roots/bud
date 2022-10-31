import {describe, expect, it} from 'vitest'

import Extension from './extension'
import {ThemeJsonWebpackPlugin} from './plugin'

describe(`@roots/sage/wp-theme-json`, () => {
  it(`extension should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
  it(`plugin should be constructable`, () => {
    expect(ThemeJsonWebpackPlugin).toBeInstanceOf(Function)
  })
})
