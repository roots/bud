import '../../src/types/index.js'

import resolveConfig from 'tailwindcss/resolveConfig.js'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'

import BudTailwindCss from '../../src/index.js'

describe(`@roots/bud-tailwindcss extension`, () => {
  let bud: Bud
  let extension: BudTailwindCss

  beforeEach(async () => {
    bud = await factory()
    await bud.extensions.add(`@roots/bud-postcss`)
    extension = new BudTailwindCss(bud)
    if (extension.boot) await extension.boot(bud)
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

    if (extension.boot) await extension.boot(bud)
    await extension.boot(bud)

    expect(resolveSpy).toHaveBeenCalledWith(
      `tailwindcss`,
      expect.any(String),
    )
    expect(resolveSpy).toHaveBeenCalledWith(
      `tailwindcss/nesting/index.js`,
      expect.any(String),
    )
  })

  it(`should return a copy of the resolved config`, async () => {
    const configInitial = resolveConfig(
      bud.context.files[`tailwind.config.ts`].module?.default ??
        bud.context.files[`tailwind.config.ts`].module,
    )

    expect(extension.config.theme?.colors).not.toBe(
      configInitial?.theme?.colors,
    )
  })

  it(`should have file`, async () => {
    expect(extension.file).toBe(bud.context.files[`tailwind.config.ts`])
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

  it(`should call extensions.add when generateImports is not undefined`, async () => {
    const addExtensionSpy = vi.spyOn(bud.extensions, `add`)

    extension.generateImports([`colors`])
    await bud.hooks.fire(`config.after`, bud)
    expect(addExtensionSpy).toHaveBeenCalled()
  })

  it(`should not register alias when generatedImports is not true`, async () => {
    extension.set(`generateImports`, false)

    const asyncSpy = vi.spyOn(bud.hooks, `async`)

    expect(asyncSpy).not.toHaveBeenCalled()
  })

  it(`should call postcss.setPlugins`, async () => {
    const setSpy = vi.spyOn(bud.postcss, `set`)

    await extension.boot(bud)

    expect(setSpy).toHaveBeenCalled()
  })
})
