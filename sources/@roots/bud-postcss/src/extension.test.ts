import {factory} from '@repo/test-kit/bud'
import {describe, expect, it} from 'vitest'

import BudPostCss from './index.js'

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
    expect(bud.postcss.getPlugins()).toBe(bud.postcss.plugins)
  })

  it(`setPlugins from obj`, async () => {
    const bud = await factory()
    await bud.extensions.add(BudPostCss)
    bud.postcss.plugins.clear()

    bud.postcss.setPlugins({foo: [`bar`]})

    expect(bud.postcss.getPlugins()).toStrictEqual(
      new Map([[`foo`, [`bar`]]]),
    )
  })

  it(`setPlugins from map`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    bud.postcss.plugins.clear()

    bud.postcss.setPlugins(new Map([[`bang`, [`bop`]]]))

    expect(bud.postcss.getPlugins()).toStrictEqual(
      new Map([[`bang`, [`bop`]]]),
    )
  })

  it(`getPluginOptions`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    bud.postcss.plugins.clear()

    bud.postcss.setPlugins(new Map([[`bang`, [`bop`]]]))

    const options = bud.postcss.getPluginOptions(`bang`)
    expect(options).toStrictEqual({})
  })

  it(`setPluginOptions`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    bud.postcss.plugins.clear()

    bud.postcss.setPlugins(new Map([[`bang`, [`bop`]]]))

    bud.postcss.setPluginOptions(`bang`, {})
    expect(bud.postcss.plugins.get(`bang`)?.pop()).toStrictEqual({})
  })

  it(`setPluginOptions (callback)`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    bud.postcss.plugins.clear()

    bud.postcss.setPlugins(new Map([[`bang`, [`bop`]]]))
    bud.postcss.setPluginOptions(`bang`, {foo: `bar`})

    bud.postcss.setPluginOptions(`bang`, options => {
      expect(options).toStrictEqual({foo: `bar`})
      return options
    })
  })

  it(`getPluginPath`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    bud.postcss.plugins.clear()

    bud.postcss.setPlugins(new Map([[`bang`, [`setPluginPath test`]]]))

    expect(bud.postcss.getPluginPath(`bang`)).toStrictEqual(
      `setPluginPath test`,
    )
  })

  it(`setPluginPath`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    bud.postcss.plugins.clear()

    bud.postcss.setPlugins(new Map([[`bang`, [`bop`]]]))
    bud.postcss.setPluginPath(`bang`, `newPath`)

    expect(bud.postcss.plugins.get(`bang`)?.shift()).toStrictEqual(
      `newPath`,
    )
  })

  it(`unsetPlugin`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    bud.postcss.plugins.clear()

    bud.postcss.setPlugins(
      new Map([
        [`bang`, [`bop`]],
        [`bong`, [`gong`]],
      ]),
    )
  })

  it(`unsetPlugin return bud.postcss`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    bud.postcss.plugins.clear()

    const returnValue = bud.postcss.setPlugins(
      new Map([
        [`bang`, [`bop`]],
        [`bong`, [`gong`]],
      ]),
    )

    expect(returnValue).toBeInstanceOf(BudPostCss)
  })

  it(`setPlugins return bud.postcss`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    bud.postcss.plugins.clear()

    const returnValue = bud.postcss.setPlugins(
      new Map([
        [`bang`, [`bop`]],
        [`bong`, [`gong`]],
      ]),
    )

    expect(returnValue).toBeInstanceOf(BudPostCss)
  })

  it(`setPlugin`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    bud.postcss.plugins.clear()

    bud.postcss.setPlugin(`boop`)

    expect(bud.postcss.plugins.get(`boop`)).toEqual(
      expect.arrayContaining([expect.stringContaining(`boop`)]),
    )
  })

  it(`setPlugin (arr)`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    bud.postcss.plugins.clear()

    const signifier = `postcss-preset-env`
    bud.postcss.setPlugin(`env`, signifier)

    expect(bud.postcss.plugins.get(`env`)).toEqual(
      expect.arrayContaining([expect.stringContaining(signifier)]),
    )
  })

  it(`setPlugin (arr w/options)`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    bud.postcss.plugins.clear()

    const signifier = `postcss-preset-env`
    bud.postcss.setPlugin(`env`, [signifier, {option: `value`}])

    expect(bud.postcss.plugins.get(`env`)).toEqual(
      expect.arrayContaining([
        expect.stringContaining(signifier),
        expect.objectContaining({option: `value`}),
      ]),
    )
  })

  it(`throws when plugin doesn't exist`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)

    bud.postcss.plugins.clear()

    try {
      expect(bud.postcss.getPluginOptions(`no-exist`)).toThrow()
    } catch (err) {}
  })

  it(`registers loader`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    bud.postcss.plugins.clear()

    expect(bud.build.loaders.postcss.getSrc()).toContain(`postcss-loader`)
  })

  it(`registers item`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    bud.postcss.plugins.clear()

    expect(bud.build.items.postcss?.getLoader().getSrc()).toContain(
      `postcss-loader`,
    )
  })

  it(`added to css rule`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    bud.postcss.plugins.clear()

    expect(bud.build.rules.css?.getUse()).toContain(`postcss`)
  })
})
