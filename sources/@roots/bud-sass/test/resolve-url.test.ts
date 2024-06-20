import {beforeEach, describe, expect, it, vi} from 'vitest'

import BudResolveUrl from '../src/resolve-url'

describe(`@roots/bud-sass/resolve-url`, () => {
  let bud: any
  let extension: BudResolveUrl

  beforeEach(async () => {
    bud = {
      build: {
        rules: {
          sass: {
            setUse: vi.fn(() => [`precss`, `css`, `postcss`, `sass`]),
          },
          'sass-module': {
            setUse: vi.fn(() => [
              `precss`,
              `css-module`,
              `postcss`,
              `sass`,
            ]),
          },
        },
        setItem: vi.fn(),
        setLoader: vi.fn(),
      },
      hooks: {
        on: vi.fn(),
      },
      module: {
        import: vi.fn(async () => `resolve-url-loader`),
        resolve: vi.fn(async () => `resolve-url-loader`),
      },
      path: () => `/test/src/dir`,
    }
    bud.build.setItem = vi.fn(() => bud.build)
    bud.build.setLoader = vi.fn(() => bud.build)
    bud.build.setRule = vi.fn(() => bud.build)
    bud.hooks.on = vi.fn(() => bud)

    extension = new BudResolveUrl(bud)
  })

  it(`should be instantiable`, () => {
    expect(extension).toBeInstanceOf(BudResolveUrl)
  })

  it(`should call resolve util when register is called`, async () => {
    const resolveSpy = vi.spyOn(extension, `resolve`)

    await extension.register(bud)
    await extension.boot(bud)

    expect(resolveSpy).toHaveBeenCalledWith(
      expect.stringContaining(`resolve-url-loader`),
      expect.any(String),
    )
  })

  it(`should log when resolve-url-loader is unresolvable`, async () => {
    const spy = vi.spyOn(extension.logger, `error`)

    bud.module.resolve = vi.fn(async () => false)

    await extension.register(bud)
    await extension.boot(bud)

    expect(spy).toHaveBeenCalledWith(`resolve-url-loader not found`)
  })

  describe(`onBuildResolveLoaderAlias`, () => {
    it(`should return aliases object`, async () => {
      await extension.register(bud)
      await extension.boot(bud)

      const aliases = extension.onBuildResolveLoaderAlias({})
      expect(aliases).toStrictEqual(
        expect.objectContaining({
          'resolve-url-loader': extension.loaderPath,
        }),
      )
    })

    it(`should return aliases unchanged if resolve-url-loader is unresolvable`, async () => {
      await extension.register(bud)
      await extension.boot(bud)

      const initialAliases = {}
      extension.loaderPath = false

      const aliases = extension.onBuildResolveLoaderAlias(initialAliases)

      expect(aliases).toStrictEqual(initialAliases)
    })
  })

  describe(`withResolveLoader`, () => {
    it(`should return same array if postcss is not available`, async () => {
      await extension.register(bud)
      await extension.boot(bud)

      const arr: Array<any> = [`precss`, `css`]
      const use = extension.withResolveLoader(arr)
      expect(use).toBe(arr)
    })

    it(`should return same array if postcs object is not available`, async () => {
      await extension.register(bud)
      await extension.boot(bud)

      const arr: Array<any> = [`precss`, `css`, {ident: `foo`}]
      const use = extension.withResolveLoader(arr)
      expect(use).toBe(arr)
    })

    it(`should return same array if resolve-url-loader is not available`, async () => {
      const arr: Array<any> = [`precss`, `css`, `postcss`]
      extension.loaderPath = false

      const use = extension.withResolveLoader(arr)
      expect(use).toBe(arr)
    })

    it(`should return array plus resolve-loader if postcss is available`, async () => {
      await extension.register(bud)
      await extension.boot(bud)

      const arr: Array<any> = [`precss`, `css`, `postcss`]
      const use = extension.withResolveLoader(arr)
      expect(use).toStrictEqual(
        expect.arrayContaining([...arr, `resolve-url`]),
      )
    })
  })

  it(`should register alias when register is called`, async () => {
    await extension.register(bud)
    await extension.boot(bud)

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.resolveLoader.alias`,
      expect.any(Function),
    )
  })

  it(`should call setLoader when register is called`, async () => {
    await extension.register(bud)
    await extension.boot(bud)

    expect(bud.build.setLoader).toHaveBeenCalled()
  })

  it(`should call setItem when register is called`, async () => {
    await extension.register(bud)
    await extension.boot(bud)

    expect(bud.build.setItem).toHaveBeenCalledWith(
      `resolve-url`,
      expect.objectContaining({
        loader: `resolve-url`,
        options: expect.any(Function),
      }),
    )
  })
})
