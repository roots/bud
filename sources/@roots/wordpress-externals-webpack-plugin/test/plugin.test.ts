import Plugin from '@roots/wordpress-externals-webpack-plugin'
import {describe, expect, it} from 'vitest'

describe(`@roots/wordpress-externals-webpack-plugin`, () => {
  it(`should be constructable`, () => {
    expect(Plugin).toBeInstanceOf(Function)
  })
})
