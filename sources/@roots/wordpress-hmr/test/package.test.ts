import {Cache} from '@roots/wordpress-hmr/cache'
import * as Editor from '@roots/wordpress-hmr/editor'
import * as Plugins from '@roots/wordpress-hmr/plugins'
import {describe, expect, it} from 'vitest'

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
