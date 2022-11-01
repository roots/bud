import resolveConfig from 'tailwindcss/resolveConfig'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import Extension from './extension'

vi.mock(`@roots/bud-postcss`)

const Logger = {
  error: vi.fn(),
  success: vi.fn(),
  scope: [],
  instance: {
    error: vi.fn(),
    success: vi.fn(),
    scope: () => Logger,
  },
}

const PostCSS = {
  setPlugins: vi.fn(),
}

const Bud = {
  extensions: {add: vi.fn()},
  hooks: {async: vi.fn()},
  logger: Logger,
  module: {resolve: vi.fn()},
  postcss: PostCSS,
  context: {
    config: {
      [`tailwind.config.js`]: {
        module: {
          content: [`**/*.stub`],
          theme: {
            extend: {
              colors: {
                primary: `red`,
              },
            },
          },
        },
      },
    },
  },
} as any

describe(`@roots/bud-tailwindcss extension`, () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    Bud.hooks.async = vi.fn()
    Bud.extensions.add = vi.fn()
  })

  it(`basic checks`, () => {
    const extension = new Extension(Bud)

    expect(extension.getOptions()).toEqual(extension.options)
    expect(extension.options.generateImports).toBe(
      extension.getOption(`generateImports`),
    )
  })

  it(`should have label`, () => {
    const extension = new Extension(Bud)
    expect(extension.label).toBe(`@roots/bud-tailwindcss`)
  })

  it(`should not call extensions.add when generateImports is false`, async () => {
    const extension = new Extension(Bud)
    extension.setOption(`generateImports`, false)
    extension.app.extensions.add = vi.fn() as any

    await extension.configAfter()
    expect(extension.options.generateImports).toBe(false)
    expect(extension.app.extensions.add).not.toHaveBeenCalled()
  })

  it(`should attempt to resolve modules`, async () => {
    const extension = new Extension(Bud)
    await extension.init()
    expect(Bud.module.resolve).toHaveBeenCalledTimes(4)
  })

  it(`should return a copy of the resolved config`, async () => {
    const extension = new Extension(Bud)

    const configInitial = resolveConfig(
      Bud.context.config[`tailwind.config.js`].module,
    )

    expect(extension.theme.colors).not.toBe(configInitial.theme.colors)
  })

  it(`should have a config prop`, async () => {
    const extension = new Extension(Bud)
    expect(extension.config.module).toBe(
      Bud.context.config[`tailwind.config.js`].module,
    )
  })

  it(`should produce a static module`, async () => {
    const extension = new Extension(Bud)

    expect(extension.makeStaticModule(`colors`)).toMatchSnapshot()
  })

  it(`should resolve tailwind config values`, async () => {
    const extension = new Extension(Bud)

    expect(extension.resolveThemeValue(`colors`)).toMatchSnapshot()
  })

  it(`should throw when key does not exist`, async () => {
    const extension = new Extension(Bud)

    try {
      expect(() =>
        extension.resolveThemeValue(`foo`),
      ).toThrowErrorMatchingSnapshot()
    } catch (e) {}
  })

  it(`should resolve tailwind config values (filter extends)`, async () => {
    const extension = new Extension(Bud)

    expect(extension.resolveThemeValue(`colors`, true)).toMatchSnapshot()
  })

  it(`should throw when key does not exist in extended config (filter extends)`, async () => {
    const extension = new Extension(Bud)

    try {
      expect(() =>
        extension.resolveThemeValue(`lineHeight`, true),
      ).toThrowErrorMatchingSnapshot()
    } catch (e) {}
  })

  it(`should set generateImports to an array`, async () => {
    const extension = new Extension(Bud)

    extension.generateImports([`colors`])
    expect(extension.getOption(`generateImports`)).toStrictEqual([
      `colors`,
    ])
  })

  it(`should set importable values`, async () => {
    const extension = new Extension(Bud)
    const importables = undefined
    extension.generateImports(importables)
    expect(extension.importableKeys).toMatchSnapshot()
  })

  it(`should set importables when generateImports is called with array arg`, async () => {
    const extension = new Extension(Bud)
    const importables = [`colors`]
    extension.generateImports(importables)
    expect(extension.importableKeys).toBe(importables)
  })

  it(`should set importables when generateImports is called with false arg`, async () => {
    const extension = new Extension(Bud)
    const importables = false
    extension.generateImports(importables)
    expect(extension.importableKeys).toMatchSnapshot()
  })

  it(`should set importables when generateImports is called with true arg`, async () => {
    const extension = new Extension(Bud)

    extension.generateImports(true)
    expect(extension.getOption(`generateImports`)).toBe(true)
  })

  it(`should not call extensions.add when generatedImports is not true`, async () => {
    const extension = new Extension(Bud)

    extension.generateImports(false)
    await extension.configAfter()
    expect(Bud.extensions.add).not.toHaveBeenCalled()
  })

  it(`should call extensions.add when generateImports is not undefined`, async () => {
    const extension = new Extension(Bud)

    extension.generateImports(true)
    await extension.configAfter()
    expect(Bud.extensions.add).toHaveBeenCalled()
  })

  it(`should not register alias when generatedImports is not true`, async () => {
    const extension = new Extension(Bud)

    extension.generateImports(false)
    await extension.configAfter()
    expect(Bud.hooks.async).not.toHaveBeenCalled()
  })

  it(`should register alias when generateImports is not undefined`, async () => {
    const extension = new Extension(Bud)

    extension.generateImports()
    await extension.configAfter()
    expect(Bud.hooks.async).toHaveBeenCalledTimes(1)
    expect(Bud.hooks.async).toHaveBeenCalledWith(
      `build.resolve.alias`,
      expect.any(Function),
    )
  })

  it(`should call postcss.setPlugins`, async () => {
    const extension = new Extension(Bud)

    await extension.configAfter()
    expect(PostCSS.setPlugins).toHaveBeenCalled()
  })

  it(`should log success after setting plugin`, async () => {
    const extension = new Extension(Bud)

    await extension.configAfter()
    expect(Logger.success).toHaveBeenCalledTimes(1)
  })
})
