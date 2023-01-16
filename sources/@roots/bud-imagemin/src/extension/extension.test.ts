import '../types/index.js'

import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'

import {BudImageminExtension} from './extension.js'

describe(`@roots/bud-imagemin`, () => {
  let bud: Bud
  let imagemin: BudImageminExtension

  beforeEach(async () => {
    bud = await factory()
    imagemin = new BudImageminExtension(bud)
  })

  it(`should be constructable`, () => {
    expect(BudImageminExtension).toBeInstanceOf(Function)
  })

  it(`should register bud.imagemin accessor`, async () => {
    expect(imagemin).toBeInstanceOf(BudImageminExtension)
  })

  it(`should enable lossless compression when calling bud.imagemin.lossless()`, async () => {
    await bud.extensions.add(`@roots/bud-imagemin/sharp`)
    await bud.extensions.add(`@roots/bud-imagemin/svgo`)
    await imagemin.init(bud)

    vi.spyOn(imagemin.sharp, `setEncodeOptions`)
    imagemin.lossless()
    expect(imagemin.sharp.setEncodeOptions).toHaveBeenCalledWith({
      jpeg: {
        quality: 100,
      },
      webp: {
        lossless: true,
      },
      avif: {
        lossless: true,
      },
      png: {},
      gif: {},
    })
  })

  it(`should set encode options`, async () => {
    await bud.extensions.add(`@roots/bud-imagemin/sharp`)
    await bud.extensions.add(`@roots/bud-imagemin/svgo`)
    await imagemin.init(bud)
    imagemin.sharp.setOptions({})
    imagemin.svgo.setOptions({})
    imagemin.encode(`jpeg`, {quality: 10})
    expect(imagemin.sharp.options.encodeOptions).toEqual({
      jpeg: {quality: 10},
    })
  })
})
