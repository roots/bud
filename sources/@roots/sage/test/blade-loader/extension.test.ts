import BladeLoaderExtension from '@roots/sage/blade-loader'
import {describe, expect, it} from 'vitest'

describe(`@roots/sage/blade-loader`, () => {
  it(`should be constructable`, () => {
    expect(BladeLoaderExtension).toBeInstanceOf(Function)
  })
})
