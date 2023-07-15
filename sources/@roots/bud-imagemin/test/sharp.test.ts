import '@roots/bud-imagemin/types'

import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit'
import Plugin from 'image-minimizer-webpack-plugin'

import BudImageminSharp from '@roots/bud-imagemin/sharp'

describe(`@roots/bud-imagemin/sharp`, () => {
  let bud: Bud
  let sharp: BudImageminSharp

  beforeEach(async () => {
    bud = await factory()
    sharp = new BudImageminSharp(bud)
  })

  it(`should be constructable`, () => {
    expect(sharp).toBeInstanceOf(BudImageminSharp)
  })

  it(`should create sharp.generators map on init`, async () => {
    await sharp.register()
    expect(sharp.generators).toBeInstanceOf(Map)
  })

  it(`should create webp generator during registration`, async () => {
    await sharp.register()

    expect(sharp.generators.get(`webp`)).toStrictEqual({
      filename: `[path]generated.[name]@[width]x[height][ext]`,
      implementation: Plugin.sharpGenerate,
      preset: `webp`,
      options: {
        encodeOptions: {
          webp: {},
        },
      },
    })
  })

  it(`should set generator with sharp.setGenerator`, async () => {
    await sharp.register()
    sharp.generators.clear()
    const definition = {
      options: {
        encodeOptions: {
          foo: `bar`,
        },
      },
    }
    const result = sharp.setGenerator(`foo`, definition)
    expect(sharp.generators.get(`foo`)).toStrictEqual({
      preset: `foo`,
      implementation: expect.any(Function),
      filename: `[path]generated.[name]@[width]x[height][ext]`,
      options: definition.options,
    })
    expect(result).toBe(sharp)
  })
})
