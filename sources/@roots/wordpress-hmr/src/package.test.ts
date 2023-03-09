import {describe, expect, it} from 'vitest'

import {Cache} from './cache.js'
import * as Editor from './editor.js'
import * as Plugins from './plugins.js'

describe(`@roots/wordpress-hmr`, () => {
  it(`cache should be constructable`, () => {
    expect(Cache).toBeInstanceOf(Function)
  })

  it(`editor should be constructable`, () => {
    expect(Editor.load).toBeInstanceOf(Function)
  })

  it(`plugin should be constructable`, () => {
    expect(Plugins.register).toBeInstanceOf(Function)
  })
})
