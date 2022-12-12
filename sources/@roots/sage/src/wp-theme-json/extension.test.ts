import {describe, expect, it} from 'vitest'

import {WpThemeJson} from './extension.js'
import {ThemeJsonWebpackPlugin} from './plugin.js'

describe(`@roots/sage/wp-theme-json`, () => {
  it(`extension should be constructable`, () => {
    expect(WpThemeJson).toBeInstanceOf(Function)
  })
  it(`plugin should be constructable`, () => {
    expect(ThemeJsonWebpackPlugin).toBeInstanceOf(Function)
  })
})
