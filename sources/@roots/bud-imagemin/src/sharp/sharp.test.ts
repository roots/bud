import '../types/index.js'

import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'
import Plugin from 'image-minimizer-webpack-plugin'

import {BudImageminSharp} from './sharp.js'

describe(`@roots/bud-imagemin/sharp`, () => {
  let bud: Bud
  let sharp: BudImageminSharp

  beforeEach(async () => {
    bud = await factory()
    sharp = new BudImageminSharp(bud)
  })

  it(`should be constructable`, () => {
    expect(sharp).toBeInstanceOf(BudImageminSharp)
    expect(sharp.implementation).not.toBeDefined()
    expect(sharp.generators).not.toBeDefined()
  })

  it(`should assign sharp.implementation on init`, async () => {
    await sharp.init()
    expect(sharp.implementation).toBe(Plugin.sharpMinify)
  })

  it(`should create sharp.generators map on init`, async () => {
    await sharp.init()
    expect(sharp.generators).toBeInstanceOf(Map)
  })

  it(`should create webp generator on init`, async () => {
    await sharp.init()

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
    await sharp.init()
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

  it(`should call build.optimization.minimizer hook from sharp.configureBudMinimizer()`, async () => {
    await sharp.init()

    const onSpy = vi.spyOn(bud.hooks, `on`)
    sharp.configureBudMinimizer(bud)

    expect(onSpy).toHaveBeenCalledWith(
      `build.optimization.minimizer`,
      expect.any(Function),
    )
  })

  it(`should call sharp.configureBudMinimizer`, async () => {
    await sharp.init()

    const configureBudMinimizer = vi.spyOn(sharp, `configureBudMinimizer`)
    await sharp.configAfter(bud)

    expect(configureBudMinimizer).toHaveBeenCalled()
  })

  it(`should not call sharp.configureBudGenerators when there are no generators`, async () => {
    await sharp.init()
    sharp.generators.clear()
    expect(sharp.generators.size).toBe(0)

    const configureBudGenerators = vi.spyOn(
      sharp,
      `configureBudGenerators`,
    )
    const configureBudMinimizer = vi.spyOn(sharp, `configureBudMinimizer`)
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await sharp.configAfter(bud)

    expect(configureBudGenerators).not.toHaveBeenCalled()
    expect(configureBudMinimizer).toHaveBeenCalledOnce()
    expect(onSpy).toHaveBeenCalledOnce()
  })

  it(`should call sharp.configureBudGenerators when there are generators`, async () => {
    await sharp.init()
    expect(sharp.generators.size).toBe(1)

    const configureBudMinimizer = vi.spyOn(sharp, `configureBudMinimizer`)
    const configureBudGenerators = vi.spyOn(
      sharp,
      `configureBudGenerators`,
    )
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await sharp.configAfter(bud)

    expect(configureBudGenerators).toHaveBeenCalledOnce()
    expect(configureBudMinimizer).toHaveBeenCalledOnce()
    expect(onSpy).toHaveBeenCalledTimes(2)
  })
})
