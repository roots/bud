import {Bud, factory} from '@repo/test-kit'
import {describe, expect, it} from 'vitest'

import BudPostCss from '../src/index.js'

const resetPlugins = (bud: Bud) => bud.postcss.set(`plugins`, {})

describe(`@roots/bud-postcss`, () => {
  it(`label`, async () => {
    const bud = await factory()
    bud.extensions.repository = {} as any
    await bud.extensions.add(BudPostCss)
    expect(bud.postcss.label).toBe(`@roots/bud-postcss`)
  })

  it(`getPlugins`, async () => {
    const bud = await factory()
    await bud.extensions.add(BudPostCss)
    expect(bud.postcss.getPlugins()).toBe(bud.postcss.get(`plugins`))
  })

  it(`setPlugins from obj`, async () => {
    const bud = await factory()
    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    bud.postcss.setPlugins({foo: [`bar`]})

    expect(bud.postcss.get(`plugins.foo`)).toStrictEqual([`bar`])
  })

  it(`setPlugins from map`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    bud.postcss.setPlugins({bang: [`bop`]})

    expect(bud.postcss.get(`plugins.bang`)).toStrictEqual([`bop`])
  })

  it(`setPluginPath`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    bud.postcss.setPlugins({bang: [`bop`]})
    bud.postcss.setPluginPath(`bang`, `newPath`)

    expect(bud.postcss.get(`plugins.bang`)?.[0]).toStrictEqual(`newPath`)
  })

  it(`unsetPlugin`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    bud.postcss.setPlugins({bang: [`bop`], bong: [`gong`]})
  })

  it(`unsetPlugin return bud.postcss`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    const returnValue = bud.postcss.setPlugins({
      bang: [`bop`],
      bong: [`gong`],
    })

    expect(returnValue).toBeInstanceOf(BudPostCss)
  })

  it(`setPlugins return bud.postcss`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    const returnValue = bud.postcss.setPlugins({
      bang: [`bop`],
      bong: [`gong`],
    })

    expect(returnValue).toBeInstanceOf(BudPostCss)
  })

  it(`setPlugin`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    bud.postcss.setPlugin(`boop`)

    expect(bud.postcss.get(`plugins.boop`)).toEqual(
      expect.arrayContaining([expect.stringContaining(`boop`)]),
    )
  })

  it(`setPlugin (arr)`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    const signifier = `postcss-preset-env`
    bud.postcss.setPlugin(`env`, signifier)

    expect(bud.postcss.get(`plugins.env`)).toEqual(
      expect.arrayContaining([expect.stringContaining(signifier)]),
    )
  })

  it(`setPlugin (arr w/options)`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    const signifier = `postcss-preset-env`
    bud.postcss.setPlugin(`env`, [signifier, {option: `value`}])

    expect(bud.postcss.get(`plugins.env`)).toEqual(
      expect.arrayContaining([
        expect.stringContaining(signifier),
        expect.objectContaining({option: `value`}),
      ]),
    )
  })

  it(`throws when plugin doesn't exist`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)

    resetPlugins(bud)

    try {
      expect(bud.postcss.getPluginOptions(`no-exist`)).toThrow()
    } catch (err) {}
  })

  it(`registers loader`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    expect(bud.build.loaders.postcss.getSrc()).toContain(`postcss-loader`)
  })

  it(`registers item`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    expect(bud.build.items.postcss?.getLoader().getSrc()).toContain(
      `postcss-loader`,
    )
  })

  it(`added to css rule`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    expect(bud.build.rules.css?.getUse()).toContain(`postcss`)
  })

  it(`should set the order with bud.postcss.use`, async () => {
    const bud = await factory()
    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)
    bud.postcss.use([`foo`, `bar`])
    expect(bud.postcss.get(`order`)).toStrictEqual([`foo`, `bar`])

    bud.postcss.use(plugins => plugins.map(plugin => `${plugin}!`))
    expect(bud.postcss.get(`order`)).toStrictEqual([`foo!`, `bar!`])
  })
})
