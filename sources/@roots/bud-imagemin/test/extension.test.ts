import '../src/types/index.js'

import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'

import BudImageminExtension from '../src/index.js'

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
    await imagemin.register(bud)

    vi.spyOn(imagemin.sharp, `encode`)
    imagemin.lossless()
    expect(imagemin.sharp.encode).toHaveBeenNthCalledWith(1, `jpeg`, {
      quality: 100,
    })
    expect(imagemin.sharp.encode).toHaveBeenNthCalledWith(2, `webp`, {
      lossless: true,
    })
    expect(imagemin.sharp.encode).toHaveBeenNthCalledWith(3, `avif`, {
      lossless: true,
    })
    expect(imagemin.sharp.encode).toHaveBeenNthCalledWith(4, `png`, {})
    expect(imagemin.sharp.encode).toHaveBeenNthCalledWith(5, `gif`, {})
    expect(imagemin.sharp.encode).toHaveBeenCalledTimes(5)
  })

  it(`should set encode options`, async () => {
    await bud.extensions.add(`@roots/bud-imagemin/sharp`)
    await bud.extensions.add(`@roots/bud-imagemin/svgo`)

    await imagemin.register(bud)

    imagemin.sharp.setEncodeOptions({})
    imagemin.svgo.setEncodeOptions({})

    imagemin.encode(`jpeg`, {quality: 10})

    expect(imagemin.sharp.options.encodeOptions?.jpeg).toEqual({
      quality: 10,
    })
  })
})
