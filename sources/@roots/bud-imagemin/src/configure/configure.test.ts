import '../types.js'

import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'

import {BudImageminExtension} from '../extension.js'

describe(`@roots/bud-imagemin`, () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
    await bud.extensions.add(BudImageminExtension)
  })

  it(`should have a configure method which accepts updated options`, async () => {
    bud.imagemin.configure(`squoosh`, {options: {test: true}})

    expect(bud.imagemin.getMinimizer(`squoosh`)).toEqual(
      expect.objectContaining({
        minimizer: {
          implementation: expect.any(Function),
          options: {test: true},
        },
      }),
    )
  })

  it(`should have a configure method which accepts a callback`, async () => {
    const callback = vi.fn()
    bud.imagemin.configure(`squoosh`, callback)

    expect(callback).toHaveBeenCalledWith({
      implementation: expect.any(Function),
      options: {
        encodeOptions: {
          mozjpeg: {},
          webp: {},
          avif: {},
          oxipng: {},
          wp2: {},
          jxl: {},
        },
      },
    })
  })

  it(`should have a configure method which accepts a minimizer key and an associated callback`, async () => {
    const callback = vi.fn()
    bud.imagemin.configure(`squoosh`, `include`, callback)
    expect(callback).toHaveBeenCalledWith(undefined)
  })
})
