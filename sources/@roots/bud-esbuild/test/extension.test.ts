import {Bud, factory} from '@repo/test-kit/bud'
import esbuild from '@roots/bud-esbuild'
import isArray from 'lodash/isArray.js'
import isUndefined from 'lodash/isUndefined.js'
import {beforeEach, describe, expect, it} from 'vitest'

import Extension from '../src/index.js'

describe(`@roots/bud-esbuild`, () => {
  let bud: Bud
  let extension: any

  beforeEach(async () => {
    bud = await factory()

    await bud.extensions.add(esbuild)
    extension = bud.extensions.get(`@roots/bud-esbuild`)
    await extension.register(bud)
    await extension.boot(bud)
  })

  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })

  it(`should have a label prop`, () => {
    expect(extension.label).toBe(`@roots/bud-esbuild`)
  })

  it(`should register js ruleset item`, () => {
    if (isUndefined(bud.build.rules.js)) {
      throw new Error()
    }
    expect(bud.build.rules.js.getUse()).toEqual([
      expect.stringContaining(`esbuild-js`),
    ])
  })

  it(`should register js ruleset item options`, () => {
    if (isUndefined(bud.build.items[`esbuild-js`])) {
      throw new Error()
    }
    expect(bud.build.items[`esbuild-js`].getOptions()).toEqual(
      extension.getOption(`js`),
    )
  })

  it(`should resolve the esbuild loader`, () => {
    if (isUndefined(bud.build.items[`esbuild-js`])) {
      throw new Error()
    }

    expect(bud.build.items[`esbuild-js`].getLoader()).toBeDefined()
  })

  it(`should register the ts ruleset item`, () => {
    if (isUndefined(bud.build.rules[`ts`])) {
      throw new Error()
    }
    expect(bud.build.rules.ts.getUse()).toEqual([
      expect.stringContaining(`esbuild-ts`),
    ])
  })

  it(`should register the ts ruleset item options`, () => {
    if (isUndefined(bud.build.items[`esbuild-ts`])) {
      throw new Error()
    }
    expect(bud.build.items[`esbuild-ts`].getOptions()).toEqual(
      extension.options.ts,
    )
  })

  it(`should resolve the esbuild loader`, () => {
    if (isUndefined(bud.build.items[`esbuild-ts`])) {
      throw new Error()
    }
    expect(bud.build.items[`esbuild-ts`].getLoader()).toBeDefined()
  })

  it(`should register the esbuild loader`, () => {
    expect(bud.build.loaders.esbuild).toBeDefined()
  })

  describe(`module options`, () => {
    let bud
    let extension: any

    beforeEach(async () => {
      bud = await factory()
      await bud.extensions.add(esbuild)
      extension = bud.extensions.get(`@roots/bud-esbuild`)
      await bud.build.make()
    })

    it(`should be a method`, () => {
      expect(extension.options).toBeDefined()
    })

    it(`should have expected values`, async () => {
      expect(extension.options).toEqual({
        minify: {
          css: true,
          include: [
            expect.any(RegExp),
            expect.any(RegExp),
            expect.any(RegExp),
          ],
          exclude: expect.any(RegExp),
        },
        js: {
          loader: `jsx`,
          target: `es2015`,
        },
        ts: {
          loader: `tsx`,
          target: `es2015`,
          tsconfigRaw: expect.any(Object),
        },
      })
    })
  })

  describe(`should do its job`, () => {
    let bud: Bud

    beforeEach(async () => {
      bud = await factory()
      await bud.extensions.add(esbuild)
      await bud.build.make()
    })

    it(`single minifier`, () => {
      if (isUndefined(bud.build.config.optimization)) throw new Error()
      expect(bud.build.config.optimization.minimizer).toHaveLength(1)
    })

    it.skip(`registers loader`, () => {
      if (isUndefined(bud.build.config.module)) throw new Error()
      if (!isArray(bud.build.config.module.rules)) throw new Error()

      expect(
        (bud.build.config.module.rules[1] as any).oneOf[0].use[0].loader,
      ).toEqual(expect.stringContaining(`esbuild-loader`))
    })
  })
})
