import {Bud, factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import * as source from './index.js'
import * as helpers from './helpers.js'

describe(`bud.html`, () => {
  let bud
  let budPathSpy
  let html
  let htmlPlugin
  let interpolatePlugin
  let htmlEnableSpy
  let htmlSetOptionsSpy
  let interpolateEnableSpy
  let interpolateSetOptionsSpy

  beforeEach(async () => {
    bud = await factory()
    vi.clearAllMocks()

    budPathSpy = vi.spyOn(bud, `path`)
    htmlPlugin = bud.extensions.get(
      `@roots/bud-extensions/html-webpack-plugin`,
    )
    interpolatePlugin = bud.extensions.get(
      `@roots/bud-extensions/interpolate-html-webpack-plugin`,
    )
    htmlEnableSpy = vi.spyOn(htmlPlugin, `enable`)
    htmlSetOptionsSpy = vi.spyOn(htmlPlugin, `setOptions`)
    interpolateEnableSpy = vi.spyOn(interpolatePlugin, `enable`)
    interpolateSetOptionsSpy = vi.spyOn(interpolatePlugin, `setOptions`)

    html = source.html.bind(bud)
  })

  it.each([false, true, undefined, {}])(
    `should always return bud`,
    async value => {
      expect(await html(value)).toBeInstanceOf(Bud)
    },
  )

  it(`should disable extension when called with \`false\``, async () => {
    const returned = await html(false)

    expect(htmlEnableSpy).toHaveBeenCalledWith(false)
    expect(htmlSetOptionsSpy).toHaveBeenCalledWith(
      helpers.defaultHtmlPluginOptions,
    )
    expect(interpolateEnableSpy).toHaveBeenCalledWith(false)
    expect(interpolateSetOptionsSpy).toHaveBeenCalledWith({
      APP_DESCRIPTION: `test app description`,
      APP_TITLE: `bud.js test app`,
    })

    expect(returned).toBe(bud)
  })

  it(`should enable extension when called with \`true\``, async () => {
    const returned = await html(true)

    expect(htmlEnableSpy).toHaveBeenCalledWith(true)
    expect(htmlSetOptionsSpy).toHaveBeenCalledWith(
      helpers.defaultHtmlPluginOptions,
    )
    expect(interpolateEnableSpy).toHaveBeenCalledWith(true)
    expect(interpolateSetOptionsSpy).toHaveBeenCalledWith({
      APP_DESCRIPTION: `test app description`,
      APP_TITLE: `bud.js test app`,
    })

    expect(returned).toBe(bud)
  })

  it(`should enable extension when called with \`undefined\``, async () => {
    const returned = await html()

    expect(htmlEnableSpy).toHaveBeenCalledWith(true)
    expect(htmlSetOptionsSpy).toHaveBeenCalledWith(
      helpers.defaultHtmlPluginOptions,
    )
    expect(interpolateEnableSpy).toHaveBeenCalledWith(true)
    expect(interpolateSetOptionsSpy).toHaveBeenCalledWith({
      APP_DESCRIPTION: `test app description`,
      APP_TITLE: `bud.js test app`,
    })

    expect(returned).toBe(bud)
  })

  it(`should enable extension when called with \`object\``, async () => {
    const returned = await html({})

    expect(htmlEnableSpy).toHaveBeenCalledWith(true)
    expect(htmlSetOptionsSpy).toHaveBeenCalledWith(
      helpers.defaultHtmlPluginOptions,
    )
    expect(interpolateEnableSpy).toHaveBeenCalledWith(true)
    expect(interpolateSetOptionsSpy).toHaveBeenCalledWith({
      APP_DESCRIPTION: `test app description`,
      APP_TITLE: `bud.js test app`,
    })

    expect(returned).toBe(bud)
  })

  it(`should pass options to html-webpack-plugin extension`, async () => {
    await html({template: `test`, replace: {foo: `bar`}})

    expect(interpolateEnableSpy).toHaveBeenCalledWith(true)
    expect(interpolateSetOptionsSpy).toHaveBeenCalledWith({
      APP_DESCRIPTION: `test app description`,
      APP_TITLE: `bud.js test app`,
      foo: `bar`,
    })
    expect(htmlEnableSpy).toHaveBeenCalledWith(true)
    expect(budPathSpy).toHaveBeenCalledWith(`test`)
    expect(htmlSetOptionsSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        template: expect.stringMatching(/\/test$/),
      }),
    )
  })

  it(`should leave absolute paths alone when passed as options.template`, async () => {
    await html({template: `/test`, replace: {foo: `bar`}})

    expect(interpolateSetOptionsSpy).toHaveBeenCalledWith({
      APP_DESCRIPTION: `test app description`,
      APP_TITLE: `bud.js test app`,
      foo: `bar`,
    })
    expect(htmlSetOptionsSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        template: `/test`,
      }),
    )
  })

  it(`getHtmlPluginOptions returns normalized options with \`template\` when it is not included`, async () => {
    const returned = helpers.getHtmlPluginOptions(bud, {foo: `bar`})

    expect(budPathSpy).not.toHaveBeenCalled()
    expect(returned).toEqual(
      expect.objectContaining({
        foo: `bar`,
        template: helpers.defaultHtmlPluginOptions.template,
      }),
    )
  })

  it(`getHtmlPluginOptions handles undefined`, async () => {
    // @ts-ignore
    const _ = await import('@roots/bud-support/lodash-es')
    const lodashesOmitSpy = vi.spyOn(_, `omit`)

    const returned = helpers.getHtmlPluginOptions(bud, undefined)
    expect(lodashesOmitSpy).not.toHaveBeenCalled()
    expect(budPathSpy).not.toHaveBeenCalled()
    expect(returned).toEqual(helpers.defaultHtmlPluginOptions)
  })

  it(`getHtmlPluginOptions handles object with replace key`, async () => {
    // @ts-ignore
    const _ = await import('@roots/bud-support/lodash-es')
    const lodashesOmitSpy = vi.spyOn(_, `omit`)

    const returned = helpers.getHtmlPluginOptions(bud, {
      foo: `bar`,
      replace: {foo: `bar`},
    })

    expect(budPathSpy).not.toHaveBeenCalled()
    expect(lodashesOmitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        foo: `bar`,
        replace: {foo: `bar`},
      }),
      `replace`,
      `template`,
    )
    expect(returned).toEqual(
      expect.objectContaining({
        foo: `bar`,
        template: helpers.defaultHtmlPluginOptions.template,
      }),
    )
  })

  it(`getHtmlPluginOptions returns defaults when passed a boolean`, async () => {
    const returned = helpers.getHtmlPluginOptions(bud, true)

    expect(budPathSpy).not.toHaveBeenCalled()
    expect(returned).toEqual(helpers.defaultHtmlPluginOptions)
  })

  it(`getHtmlPluginOptions returns absolutized path from options.template`, async () => {
    helpers.getHtmlPluginOptions(bud, {template: `foo`})
    expect(budPathSpy).toHaveBeenCalledWith(`foo`)
  })

  it.each([true, false, undefined, {}])(
    `getInterpolatePluginOptions calls bud env`,
    async value => {
      const envSpy = vi.spyOn(bud.env, `getPublicEnv`)
      helpers.getInterpolatePluginOptions(bud, value)
      expect(envSpy).toHaveBeenCalledOnce()
    },
  )

  it(`appends options.replace values to publicEnv`, async () => {
    const envSpy = vi.spyOn(bud.env, `getPublicEnv`)
    const result = helpers.getInterpolatePluginOptions(bud, {
      replace: {foo: `bar`},
    })
    expect(envSpy).toHaveBeenCalledOnce()
    expect(result).toEqual(
      expect.objectContaining({
        foo: `bar`,
        APP_DESCRIPTION: `test app description`,
        APP_TITLE: `bud.js test app`,
      }),
    )
  })
})
