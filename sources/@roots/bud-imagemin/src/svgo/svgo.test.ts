import './types.js'

import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'

import {BudImageminSvgo} from './svgo.js'

describe(`@roots/bud-imagemin`, () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
  })

  it(`should be constructable`, () => {
    expect(BudImageminSvgo).toBeInstanceOf(Function)
  })

  it(`should register bud.imagemin accessor`, async () => {
    await bud.extensions.add(BudImageminSvgo)
    expect(bud.imagemin).toBeInstanceOf(BudImageminSvgo)
  })

  it(`should have expected default minimizer`, async () => {
    await bud.extensions.add(BudImageminSvgo)
    expect(bud.imagemin.getMinimizer(`Svgo`)).toEqual(
      expect.objectContaining({
        minimizer: {
          implementation: expect.any(Function),
          options: {
            encodeOptions: {},
          },
        },
      }),
    )
  })

  it(`should have expected default generator`, async () => {
    await bud.extensions.add(BudImageminSvgo)

    expect(bud.imagemin.getGenerator(`webp`)).toEqual(
      expect.objectContaining({
        preset: `webp`,
        implementation: expect.any(Function),
        options: {
          encodeOptions: {
            webp: {},
          },
        },
      }),
    )
  })

  it(`should return a generator from getGenerator`, async () => {
    await bud.extensions.add(BudImageminSvgo)
    bud.imagemin.generators.clear()
    bud.imagemin.setGenerator(`test`, {
      options: {},
    })

    const getGeneratorReturnValue = bud.imagemin.getGenerator(`test`)

    expect(getGeneratorReturnValue).toEqual(
      expect.objectContaining({
        preset: `test`,
        implementation: expect.any(Function),
        options: {},
      }),
    )
  })

  it(`should return an array of generators from getGenerators`, async () => {
    await bud.extensions.add(BudImageminSvgo)
    bud.imagemin.generators.clear()
    bud.imagemin.setGenerator(`test`, {
      options: {},
    })

    const getGeneratorsReturnValue = bud.imagemin.getGenerators()

    expect(getGeneratorsReturnValue).toBeInstanceOf(Array)
    expect(getGeneratorsReturnValue).toHaveLength(1)
    expect(getGeneratorsReturnValue.pop()).toEqual(
      expect.objectContaining({
        preset: `test`,
        implementation: expect.any(Function),
        options: {},
      }),
    )
  })

  it(`should call build.optimization.minimizer hook from configAfter`, async () => {
    await bud.extensions.add(BudImageminSvgo)
    bud.imagemin.generators.clear()
    bud.imagemin.minimizers.clear()

    const onSpy = vi.spyOn(bud.hooks, `on`)
    await bud.imagemin.svgo.configAfter(bud)

    expect(onSpy).toHaveBeenCalledWith(
      `build.optimization.minimizer`,
      expect.any(Function),
    )
  })
})
