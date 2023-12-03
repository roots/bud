import type {Bud} from '@roots/bud-framework'

import {factory} from '@repo/test-kit'
import BudPostCSS from '@roots/bud-postcss'
import BudSass from '@roots/bud-sass'
import isObject from '@roots/bud-support/lodash/isObject'
import {beforeEach, describe, expect, it, vi} from 'vitest'

describe(`@roots/bud-sass/extension`, () => {
  let bud: Bud
  let postcss: BudPostCSS
  let sass: BudSass

  beforeEach(async () => {
    vi.clearAllMocks()

    bud = await factory()

    postcss = new BudPostCSS(bud) as any
    bud.postcss = postcss as any

    sass = new BudSass(bud) as any
    bud.sass = sass as any
  })

  it(`should be instantiable`, () => {
    expect(sass).toBeInstanceOf(BudSass)
  })

  it(`should call import when sass.register is called`, async () => {
    const importSpy = vi.spyOn(sass, `import`)
    await sass.register(bud)
    expect(importSpy).toHaveBeenCalled()
  })

  it(`should call set when sass.registerGlobal is called`, () => {
    const setSpy = vi.spyOn(sass, `set`)

    sass.registerGlobal(`$primary-color: #ff0000;`)
    expect(sass.get(`additionalData`)).toBe(`$primary-color: #ff0000;`)
  })

  it(`should call setLoader`, async () => {
    const setLoaderSpy = vi.spyOn(bud.build, `setLoader`)
    await sass.register(bud)

    expect(setLoaderSpy).toHaveBeenCalledWith(
      `sass`,
      expect.stringContaining(`sass-loader`),
    )
  })

  it(`should call setItem`, async () => {
    const setItemSpy = vi.spyOn(bud.build, `setItem`)

    await sass.register(bud)

    expect(setItemSpy).toHaveBeenCalledWith(
      `sass`,
      expect.objectContaining({
        loader: `sass`,
        options: expect.any(Function),
      }),
    )
  })

  it(`should call setRule`, async () => {
    const setRuleSpy = vi.spyOn(bud.build, `setRule`)

    await sass.register(bud)
    await sass.boot(bud)

    expect(setRuleSpy).toHaveBeenCalledWith(
      `sass`,
      expect.objectContaining({
        include: expect.arrayContaining([expect.any(Function)]),
        test: expect.any(Function),
      }),
    )
  })

  it(`should set postcss syntax`, async () => {
    vi.clearAllMocks()
    postcss.setSyntax(``)
    await sass.register(bud)
    await sass.boot(bud)

    expect(sass.app.postcss.syntax).toEqual(`postcss-scss`)
  })

  it(`should register global when importGlobal is called`, () => {
    const registerGlobalSpy = vi.spyOn(sass, `registerGlobal`)
    sass.importGlobal(`@src/styles/global.scss`)

    expect(registerGlobalSpy).toHaveBeenCalledWith([
      `@import "@src/styles/global.scss";`,
    ])
  })

  it(`should add global to \`additionalData\``, () => {
    sass.set(`additionalData`, undefined)

    sass.registerGlobal(`$foo: rgba(0, 0, 0, 1);`)

    expect(sass.getOption(`additionalData`)).toBe(
      `$foo: rgba(0, 0, 0, 1);`,
    )
    expect(sass.options.additionalData).toBe(`$foo: rgba(0, 0, 0, 1);`)
  })

  it(`should import partials from an array`, () => {
    const code = [
      `$foo: rgba(0, 0, 0, 1);`,
      `$bar: rgba(255, 255, 255, 1);`,
    ]

    sass.set(`additionalData`, undefined)
    sass.registerGlobal(code)

    sass.additionalData

    expect(sass.options.additionalData?.split(`\n`)).toStrictEqual(code)
  })

  it(`should register issuer rules`, async () => {
    await sass.register(bud)

    const config = await bud.build.make()
    const mainRuleSet = config.module?.rules?.[1]

    if (!isObject(mainRuleSet)) throw new Error(`mainRuleSet is not an object`)
    if (!Array.isArray(mainRuleSet.oneOf)) throw new Error(`mainRuleSet.oneOf is not an array`)
    if (!isObject(mainRuleSet.oneOf[0]) ) throw new Error(`mainRuleSet[0].oneOf is not an object`)
    if (!isObject(mainRuleSet.oneOf[1]) ) throw new Error(`mainRuleSet[1].oneOf is not an object`)

    expect(mainRuleSet.oneOf[0].issuer).toStrictEqual({not: bud.hooks.filter(`pattern.sassModule`)})
    expect(mainRuleSet.oneOf[0].test).toStrictEqual(bud.hooks.filter(`pattern.sassModule`))
    expect(mainRuleSet.oneOf[1].issuer).toStrictEqual({not: bud.hooks.filter(`pattern.sass`)})
    expect(mainRuleSet.oneOf[1].test).toStrictEqual(bud.hooks.filter(`pattern.sass`))
  })
})
