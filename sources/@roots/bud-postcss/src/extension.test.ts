import {Bud, factory} from '@repo/test-kit/bud'
import {describe, expect, it} from 'vitest'

import BudPostCss from './index.js'

const resetPlugins = (bud: Bud) =>
  bud.postcss
    .set(`import`, undefined)
    .set(`env`, undefined)
    .set(`nesting`, undefined)

describe(`@roots/bud-postcss`, () => {
  it(`label`, async () => {
    const bud = await factory()
    bud.extensions.repository = {} as any
    await bud.extensions.add(BudPostCss)
    expect(bud.postcss.label).toBe(`@roots/bud-postcss`)
  })

  it(`setPlugins from obj`, async () => {
    const bud = await factory()
    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    bud.postcss.setPlugins({foo: [`bar`]})

    expect(bud.postcss.get(`foo`)).toStrictEqual([`bar`])
  })

  it(`setPlugins from map`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    bud.postcss.setPlugins(new Map([[`bang`, [`bop`]]]))

    expect(bud.postcss.get(`bang`)).toStrictEqual([`bop`])
  })

  it(`getPluginOptions`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    bud.postcss.setPlugins(new Map([[`bang`, [`bop`]]]))

    const options = bud.postcss.getPluginOptions(`bang`)
    expect(options).toStrictEqual({})
  })

  it(`should have functioning setPluginOptions method`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    bud.postcss.setPlugins(new Map([[`bang`, [`bop`]]]))

    bud.postcss.setPluginOptions(`bang`, {})
    expect(bud.postcss.get(`bang`)).toStrictEqual([`bop`, {}])
  })

  it(`setPluginOptions (callback)`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

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
    resetPlugins(bud)

    bud.postcss.setPlugins(new Map([[`bang`, [`setPluginPath test`]]]))

    expect(bud.postcss.getPluginPath(`bang`)).toStrictEqual(
      `setPluginPath test`,
    )
  })

  it(`setPluginPath`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    bud.postcss.setPlugins(new Map([[`bang`, [`bop`]]]))
    bud.postcss.setPluginPath(`bang`, `newPath`)

    expect(bud.postcss.get(`bang`)?.[0]).toStrictEqual(`newPath`)
  })

  it(`unsetPlugin`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

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
    resetPlugins(bud)

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
    resetPlugins(bud)

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
    resetPlugins(bud)

    bud.postcss.setPlugin(`boop`)

    expect(bud.postcss.get(`boop`)).toEqual(
      expect.arrayContaining([expect.stringContaining(`boop`)]),
    )
  })

  it(`setPlugin (arr)`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    const signifier = `postcss-preset-env`
    bud.postcss.setPlugin(`env`, signifier)

    expect(bud.postcss.get(`env`)).toEqual(
      expect.arrayContaining([expect.stringContaining(signifier)]),
    )
  })

  it(`setPlugin (arr w/options)`, async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    resetPlugins(bud)

    const signifier = `postcss-preset-env`
    bud.postcss.setPlugin(`env`, [signifier, {option: `value`}])

    expect(bud.postcss.get(`env`)).toEqual(
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
