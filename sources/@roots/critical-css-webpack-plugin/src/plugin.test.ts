import {describe, expect, it} from 'vitest'

import Plugin from './index.js'

describe(`@roots/critical-css-webpack-plugin`, () => {
  it(`should be constructable`, () => {
    expect(Plugin).toBeInstanceOf(Function)
  })

  it(`should have default options`, () => {
    expect(new Plugin().options).toEqual(
      expect.objectContaining({
        extract: true,
        width: 1300,
        height: 900,
        request: {
          https: {
            rejectUnauthorized: false,
          },
        },
      }),
    )
  })
})
