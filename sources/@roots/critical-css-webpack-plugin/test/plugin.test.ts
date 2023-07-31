import Plugin from '@roots/critical-css-webpack-plugin'
import {describe, expect, it} from 'vitest'

describe(`@roots/critical-css-webpack-plugin`, () => {
  it(`should be constructable`, () => {
    expect(Plugin).toBeInstanceOf(Function)
  })

  it(`should have default options`, () => {
    expect(new Plugin().options).toEqual(
      expect.objectContaining({
        extract: true,
        height: 900,
        request: {
          https: {
            rejectUnauthorized: false,
          },
        },
        width: 1300,
      }),
    )
  })
})
