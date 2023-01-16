import '../types/index.js'

import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'

import {BudImageminExtension} from './extension.js'

describe(`@roots/bud-imagemin`, () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
  })

  it(`should be constructable`, () => {
    expect(BudImageminExtension).toBeInstanceOf(Function)
  })

  it(`should register bud.imagemin accessor`, async () => {
    await bud.extensions.add(BudImageminExtension)
    expect(bud.imagemin).toBeInstanceOf(BudImageminExtension)
  })

  it(`should enable lossless compression when calling bud.imagemin.lossless()`, async () => {
    const imagemin = new BudImageminExtension(bud)
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
})
