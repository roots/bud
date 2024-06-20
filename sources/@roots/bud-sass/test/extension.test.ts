import {beforeEach, describe, expect, it, vi} from 'vitest'

import {BudSass} from '../src/extension/index'

describe.sequential(`@roots/bud-sass`, () => {
  let bud: any
  let extension: BudSass

  beforeEach(async () => {
    bud = {
      build: {
        rules: {
          css: {
            getUse: vi.fn(() => [`precss`, `css`, `postcss`]),
          },
          'css-module': {
            getUse: vi.fn(() => [`precss`, `css-module`, `postcss`]),
          },
          sass: {
            setUse: vi.fn(),
          },
          'sass-module': {
            setUse: vi.fn(),
          },
        },
        setItem: vi.fn(),
        setLoader: vi.fn(),
        setRule: vi.fn(),
      },
      extensions: {
        add: vi.fn(),
      },
      hooks: {
        on: vi.fn(),
      },
      module: {
        import: vi.fn(async () => await import(`sass`)),
        resolve: vi.fn(async () => `sass-loader`),
      },
      postcss: {
        setSyntax: vi.fn(),
      },
    }
    bud.build.setItem = vi.fn(() => bud.build)
    bud.build.setLoader = vi.fn(() => bud.build)
    bud.build.setRule = vi.fn(() => bud.build)
    bud.hooks.on = vi.fn(() => bud)

    extension = new BudSass(bud) as any
  })

  it(`should be instantiable`, () => {
    expect(extension).toBeInstanceOf(BudSass)
  })

  it(`should log error when sass-loader is unresolvable`, async () => {
    const spy = vi.spyOn(extension.logger, `error`)
    bud.module.resolve = vi.fn(async () => false)

    await extension.register(bud)

    expect(spy).toHaveBeenCalledWith(`sass-loader not found`)
  })

  it(`should log warning when sass implementation can't be imported`, async () => {
    const spy = vi.spyOn(extension.logger, `warn`)
    extension.import = vi.fn(async () => undefined)

    await extension.register(bud)

    expect(spy).toHaveBeenCalledWith(
      `sass implementation not explicitly resolvable. falling back on default implementation.`,
    )
  })

  it(`should register sass.default when sass.info is not present`, async () => {
    const sass = {default: true} as any
    extension.import = vi.fn(async () => sass)

    await extension.register(bud)

    expect(extension.getImplementation()).toBe(sass.default)
  })

  it(`should register * from sass when sass.info is present`, async () => {
    const sass = {default: true, info: true} as any
    extension.import = vi.fn(async () => sass)

    await extension.register(bud)

    expect(extension.getImplementation()).toBe(sass)
  })

  it(`should call import`, async () => {
    const importSpy = vi.spyOn(extension, `import`)
    await extension.register(bud)

    expect(importSpy).toHaveBeenCalledWith(
      `sass`,
      expect.stringContaining(`@roots/bud-sass`),
      expect.objectContaining({
        raw: true,
      }),
    )
  })

  it(`should call set when extension.registerGlobal is called`, () => {
    extension.registerGlobal(`$primary-color: #ff0000;`)
    expect(extension.get(`additionalData`)).toBe(
      `$primary-color: #ff0000;`,
    )
  })

  it(`should register alias`, async () => {
    await extension.register(bud)

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.resolveLoader.alias`,
      extension.onBuildResolveLoaderAlias,
    )
  })

  describe(`onBuildResolveLoaderAlias`, () => {
    it(`should return aliases object`, async () => {
      await extension.register(bud)

      const aliases = extension.onBuildResolveLoaderAlias({})
      expect(aliases).toStrictEqual(
        expect.objectContaining({
          'sass-loader': extension.loaderPath,
        }),
      )
    })

    it(`should return aliases unchanged if sass-loader is unresolvable`, async () => {
      await extension.register(bud)

      const initialAliases = {}
      extension.loaderPath = false

      const aliases = extension.onBuildResolveLoaderAlias(initialAliases)

      expect(aliases).toStrictEqual(initialAliases)
    })
  })

  describe(`onBuildResolveExtensions`, () => {
    it(`should return extensions array`, async () => {
      await extension.register(bud)

      const extensions = extension.onBuildResolveExtensions()
      expect(extensions).toStrictEqual(new Set([`.sass`, `.scss`]))
    })
  })

  describe(`withSassLoader`, () => {
    it(`should return array plus sass-loader`, async () => {
      await extension.register(bud)

      const arr: Array<any> = [`precss`, `css`, `postcss`]
      const use = extension.withSassLoader(arr)
      expect(use).toStrictEqual(expect.arrayContaining([...arr, `sass`]))
    })
  })

  it(`should register extensions`, async () => {
    await extension.register(bud)

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.resolve.extensions`,
      expect.any(Function),
    )
  })

  it(`should call setLoader`, async () => {
    await extension.register(bud)

    expect(bud.build.setLoader).toHaveBeenCalledWith(
      `sass`,
      expect.stringContaining(`sass-loader`),
    )
  })

  it(`should call setItem`, async () => {
    await extension.register(bud)

    expect(bud.build.setItem).toHaveBeenCalledWith(
      `sass`,
      expect.objectContaining({
        loader: `sass`,
        options: expect.any(Function),
      }),
    )
  })

  it(`should call setRule`, async () => {
    await extension.register(bud)

    expect(bud.build.setRule).toHaveBeenCalledWith(
      `sass`,
      expect.objectContaining({
        include: expect.arrayContaining([expect.any(Function)]),
        test: expect.any(Function),
      }),
    )
    expect(bud.build.setRule).toHaveBeenCalledWith(
      `sass-module`,
      expect.objectContaining({
        include: expect.arrayContaining([expect.any(Function)]),
        test: expect.any(Function),
      }),
    )
  })

  it(`should set postcss syntax`, async () => {
    await extension.register(bud)

    expect(bud.postcss.setSyntax).toHaveBeenCalledWith(`postcss-scss`)
  })

  it(`should register global when importGlobal is called`, () => {
    const registerGlobalSpy = vi.spyOn(extension, `registerGlobal`)
    extension.importGlobal(`@src/styles/global.scss`)

    expect(registerGlobalSpy).toHaveBeenCalledWith([
      `@import "@src/styles/global.scss";`,
    ])
  })

  it(`should register global when importGlobal is called with an array`, () => {
    const registerGlobalSpy = vi.spyOn(extension, `registerGlobal`)
    extension.importGlobal([`@src/styles/global.scss`])

    expect(registerGlobalSpy).toHaveBeenCalledWith([
      `@import "@src/styles/global.scss";`,
    ])
  })

  it(`should add global to \`additionalData\``, () => {
    extension.setAdditionalData(undefined)
    extension.registerGlobal(`$foo: rgba(0, 0, 0, 1);`)

    expect(extension.getOption(`additionalData`)).toBe(
      `$foo: rgba(0, 0, 0, 1);`,
    )
    expect(extension.getAdditionalData()).toBe(`$foo: rgba(0, 0, 0, 1);`)
  })

  it(`should import partials from an array`, () => {
    const code = [
      `$foo: rgba(0, 0, 0, 1);`,
      `$bar: rgba(255, 255, 255, 1);`,
    ]

    extension.setAdditionalData(undefined)
    extension.registerGlobal(code)

    expect(extension.getAdditionalData()?.split(`\n`)).toStrictEqual(code)
  })
})
