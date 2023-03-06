import '../types/index.js'

import resolveConfig from 'tailwindcss/resolveConfig.js'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'

import BudTailwindCss from '@roots/bud-tailwindcss'

describe(`@roots/bud-tailwindcss extension`, () => {
  let bud: Bud
  let extension: BudTailwindCss

  beforeEach(async () => {
    bud = await factory()
    await bud.extensions.add(`@roots/bud-postcss`)
    extension = new BudTailwindCss(bud)

    if (extension.register) await extension.register(bud)
  })

  it(`basic checks`, () => {
    expect(extension.label).toBe(`@roots/bud-tailwindcss`)
    expect(extension.getOptions()).toEqual(extension.options)
    expect(extension.options.generateImports).toBe(
      extension.get(`generateImports`),
    )
  })

  it(`should not call extensions.add when generateImports is false`, async () => {
    extension.setOption(`generateImports`, false)
    const extensionsAddSpy = vi.spyOn(bud.extensions, `add`)

    await extension.boot(bud)

    expect(extension.options.generateImports).toBe(false)
    expect(extensionsAddSpy).not.toHaveBeenCalled()
  })

  it(`should attempt to resolve modules`, async () => {
    const bud = await factory()
    const extension = new BudTailwindCss(bud)
    await bud.extensions.add(`@roots/bud-postcss`)
    const resolveSpy = vi.spyOn(bud.module, `resolve`)

    if (extension.register) await extension.register(bud)
    await extension.boot(bud)

    expect(resolveSpy).toHaveBeenNthCalledWith(1, `tailwindcss`)
    expect(resolveSpy).toHaveBeenNthCalledWith(
      2,
      `tailwindcss/nesting/index.js`,
    )
  })

  it(`should return a copy of the resolved config`, async () => {
    const configInitial = resolveConfig(
      await bud.module
        .import(bud.context.config[`tailwind.config.cjs`].path)
        .then(mod => mod.default ?? mod),
    )

    expect(extension.getTheme()?.colors).not.toBe(
      configInitial?.theme?.colors,
    )
  })

  it(`should have a config prop`, async () => {
    expect(await extension.getSource()).toBe(
      await bud.module
        .import(bud.context.config[`tailwind.config.cjs`].path)
        .then(mod => mod.default ?? mod),
    )
  })

  it(`should produce a static module`, async () => {
    expect(extension.makeStaticModule(`colors`)).toMatchSnapshot()
  })

  it(`should resolve tailwind config values`, async () => {
    expect(extension.resolveThemeValue(`colors`)).toMatchSnapshot()
  })

  it(`should throw when key does not exist`, async () => {
    try {
      expect(() =>
        extension.resolveThemeValue(`foo`),
      ).toThrowErrorMatchingSnapshot()
    } catch (e) {}
  })

  it(`should resolve tailwind config values (filter extends)`, async () => {
    expect(extension.resolveThemeValue(`colors`, true)).toMatchSnapshot()
  })

  it(`should throw when key does not exist in extended config (filter extends)`, async () => {
    try {
      expect(() =>
        extension.resolveThemeValue(`lineHeight`, true),
      ).toThrowErrorMatchingSnapshot()
    } catch (e) {}
  })

  it(`should set generateImports to an array`, async () => {
    extension.set(`generateImports`, [`colors`])
    expect(extension.getOption(`generateImports`)).toStrictEqual([
      `colors`,
    ])
  })

  it(`should set importable values`, async () => {
    const importables = undefined
    extension.set(`generateImports`, importables)
    expect(extension.importableKeys).toContain(`colors`)
  })

  it(`should set importables when generateImports is called with array arg`, async () => {
    const importables = [`colors`]
    extension.set(`generateImports`, importables)
    expect(extension.importableKeys).toContain(`colors`)
    expect(extension.importableKeys).not.toContain(`lineHeight`)
  })

  it(`should set importables when generateImports is called with false arg`, async () => {
    const importables = false
    extension.set(`generateImports`, importables)
    expect(extension.importableKeys).toContain(`colors`)
  })

  it(`should set importables when generateImports is called with true arg`, async () => {
    extension.set(`generateImports`, true)
    expect(extension.getOption(`generateImports`)).toBe(true)
  })

  it(`should not call extensions.add when generatedImports is not true`, async () => {
    const addExtensionSpy = vi.spyOn(bud.extensions, `add`)

    extension.set(`generateImports`, false)
    await extension.boot(bud)

    expect(addExtensionSpy).not.toHaveBeenCalled()
  })

  it(`should call extensions.add when generateImports is not undefined`, async () => {
    const addExtensionSpy = vi.spyOn(bud.extensions, `add`)

    extension.set(`generateImports`, true)
    await extension.configAfter(bud)

    expect(addExtensionSpy).toHaveBeenCalled()
  })

  it(`should not register alias when generatedImports is not true`, async () => {
    extension.set(`generateImports`, false)

    const asyncSpy = vi.spyOn(bud.hooks, `async`)
    await extension.configAfter(bud)

    expect(asyncSpy).not.toHaveBeenCalled()
  })

  it(`should register alias when generateImports is not undefined`, async () => {
    extension.set(`generateImports`, true)

    const asyncSpy = vi.spyOn(bud.hooks, `async`)
    await extension.boot(bud)
    await extension.configAfter(bud)

    expect(asyncSpy).toHaveBeenCalledTimes(1)
    expect(asyncSpy).toHaveBeenCalledWith(
      `build.resolve.alias`,
      expect.any(Function),
    )
  })

  it(`should call postcss.setPlugins`, async () => {
    const setPluginsSpy = vi.spyOn(bud.postcss, `setPlugins`)

    await extension.boot(bud)

    expect(setPluginsSpy).toHaveBeenCalled()
  })
})
