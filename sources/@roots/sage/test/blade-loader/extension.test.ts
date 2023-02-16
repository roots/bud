import {describe, expect, it} from 'vitest'
import {BladeLoaderExtension} from '../../src/blade-loader/extension.js'

describe(`@roots/sage/blade-loader`, () => {
  it(`should be constructable`, () => {
    expect(BladeLoaderExtension).toBeInstanceOf(Function)
  })
})
