import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it} from 'vitest'

import {assets} from './index.js'

describe(`bud.assets`, () => {
  let bud
  let assetsFn: typeof assets

  beforeEach(async () => {
    bud = await factory()
    assetsFn = assets.bind(bud)
    bud.extensions
      .get(`@roots/bud-extensions/copy-webpack-plugin`)
      .setOption(`patterns`, [])
  })

  it(`should be a function`, () => {
    expect(assets).toBeInstanceOf(Function)
  })

  it(`should have copy-webpack-plugin available`, () => {
    expect(
      bud.extensions.has(`@roots/bud-extensions/copy-webpack-plugin`),
    ).toBeTruthy()
  })

  it(`should add job when passed an array of strings`, async () => {
    await assetsFn([`images`])
    expect(
      bud.extensions.get(`@roots/bud-extensions/copy-webpack-plugin`)
        .options.patterns,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          from: expect.stringContaining(`images`),
          to: expect.stringMatching(/\[path\]\[name\]\[ext\]$/),
          context: expect.stringContaining(`src`),
          noErrorOnMissing: true,
        }),
      ]),
    )
  })

  it(`should add jobs when passed an array of tuples`, async () => {
    await assetsFn([
      [bud.path(`@src`, `images`), bud.path(`@dist`, `images`)],
      [
        bud.path(`@src`, `fonts`, `font.woff`),
        bud.path(`@dist`, `fonts`, `font.woff`),
      ],
    ])

    const [patterna, patternb] = bud.extensions.get(
      `@roots/bud-extensions/copy-webpack-plugin`,
    ).options.patterns as any

    expect(patterna).toEqual(
      expect.objectContaining({
        from: `images`,
        to: `images/[path][name][ext]`,
        context: expect.stringMatching(/src$/),
        noErrorOnMissing: true,
      }),
    )

    expect(patternb).toEqual(
      expect.objectContaining({
        from: `fonts/font.woff`,
        to: `fonts/font.woff`,
        context: expect.stringContaining(`src`),
        noErrorOnMissing: true,
      }),
    )
  })

  it(`should add jobs when passed an object`, async () => {
    const input = {
      from: bud.path(`@src`, `images`),
      to: bud.path(`@dist`, `images`),
    }

    await assetsFn(input)

    const patterns = bud.extensions
      .get(`@roots/bud-extensions/copy-webpack-plugin`)
      .getOption(`patterns`)

    expect(patterns?.pop()).toEqual(
      expect.objectContaining({
        from: expect.stringMatching(/tests\/util\/project\/src\/images$/),
        to: expect.stringMatching(/tests\/util\/project\/dist\/images$/),
      }),
    )
  })

  it(`should apply options overrides`, async () => {
    const input = {
      from: bud.path(`@src`, `images`),
      to: bud.path(`@dist`, `images`),
    }
    const overrides = {toType: `file`}
    await assetsFn(input, overrides as any)

    const patterns = bud.extensions.get(
      `@roots/bud-extensions/copy-webpack-plugin`,
    ).options.patterns

    expect(patterns?.pop()).toEqual(
      expect.objectContaining({
        from: expect.stringMatching(/tests\/util\/project\/src\/images$/),
        to: expect.stringMatching(/tests\/util\/project\/dist\/images$/),
        toType: `file`,
      }),
    )
  })
})
