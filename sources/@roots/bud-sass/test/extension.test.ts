/* eslint-disable no-console */
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {factory} from '@repo/test-kit/bud'
import BudPostCSS from '@roots/bud-postcss'

import BudSass from '../src/index.js'

describe(`@roots/bud-sass/extension`, () => {
  let bud
  let postcss: BudPostCSS
  let sass: BudSass

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
    postcss = new BudPostCSS(bud)
    sass = new BudSass(bud)
    bud.sass = sass
    bud.postcss = postcss
  })

  it(`should be instantiable`, () => {
    expect(sass).toBeInstanceOf(BudSass)
  })

  it(`should call import when sass.register is called`, async () => {
    const importSpy = vi.spyOn(sass, `import`)

    try {
      await sass.register(bud)
    } catch (e) {}
    expect(importSpy).toHaveBeenCalled()
  })

  it(`should call setOptions when sass.register is called`, async () => {
    const setOptionsSpy = vi.spyOn(sass, `setOptions`)

    try {
      await sass.register(bud)
    } catch (e) {}
    expect(setOptionsSpy).toHaveBeenCalled()
  })

  it(`should call setOption when sass.registerGlobal is called`, async () => {
    const setOptionSpy = vi.spyOn(sass, `setOption`)

    try {
      sass.registerGlobal(`$primary-color: #ff0000;`)
    } catch (e) {}

    expect(setOptionSpy).toHaveBeenCalledWith(
      `additionalData`,
      expect.any(Function),
    )
  })

  it(`should call setLoader when configAfter is called`, async () => {
    const setLoaderSpy = vi.spyOn(bud.build, `setLoader`)

    try {
      await sass.configAfter(bud)
    } catch (e) {}

    expect(setLoaderSpy).toHaveBeenCalledWith(`sass-loader`)
  })

  it(`should call setItem when configAfter is called`, async () => {
    const setItemSpy = vi.spyOn(bud.build, `setItem`)

    try {
      await sass.configAfter(bud)
    } catch (e) {}

    expect(setItemSpy).toHaveBeenCalledWith(
      `sass`,
      expect.objectContaining({
        loader: `sass-loader`,
        options: {
          additionalData: `$primary-color: #ff0000;`,
          implementation: expect.any(Object),
          sourceMap: true,
        },
      }),
    )
  })

  it(`should call setRule when configAfter is called`, async () => {
    const setRuleSpy = vi.spyOn(bud.build, `setRule`)

    try {
      await sass.configAfter(bud)
    } catch (e) {}

    expect(setRuleSpy).toHaveBeenCalledWith(
      `sass`,
      expect.objectContaining({
        include: expect.arrayContaining([expect.any(Function)]),
        test: expect.any(Function),
        use: [`precss`, `css`, `postcss`, `resolveUrl`, `sass`],
      }),
    )
  })

  it(`should set postcss syntax`, async () => {
    postcss.syntax = ``

    try {
      await sass.configAfter(bud)
    } catch (e) {}

    expect(sass.app.postcss.syntax).toEqual(`postcss-scss`)
  })

  it(`should register global when importGlobal is called`, async () => {
    const registerGlobalSpy = vi.spyOn(sass, `registerGlobal`)
    sass.importGlobal(`@src/styles/global.scss`)

    expect(registerGlobalSpy).toHaveBeenCalledWith([
      `@import "@src/styles/global.scss";`,
    ])
  })

  it(`should add global to \`additionalData\``, async () => {
    const setOptionSpy = vi.spyOn(sass, `setOption`)

    sass.setOption(`additionalData`, undefined)
    sass.registerGlobal(`$foo: rgba(0, 0, 0, 1);`)
    await sass.configAfter(bud)

    expect(setOptionSpy).toHaveBeenCalledWith(
      `additionalData`,
      expect.any(Function),
    )
    expect(sass.getOption(`additionalData`)).toBe(
      `$foo: rgba(0, 0, 0, 1);`,
    )
  })

  it(`should import partials from an array`, async () => {
    sass.setOption(`additionalData`, undefined)
    sass.registerGlobal([
      `$foo: rgba(0, 0, 0, 1);`,
      `$bar: rgba(255, 255, 255, 1);`,
    ])
    await sass.configAfter(bud)
    expect(sass.getOption(`additionalData`)).toBe(
      `$foo: rgba(0, 0, 0, 1);\n$bar: rgba(255, 255, 255, 1);`,
    )
  })
})
