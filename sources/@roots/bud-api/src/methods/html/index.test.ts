import {factory} from '@repo/test-kit'
import {Bud} from '@roots/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import * as source from './index.js'
import * as helpers from './helpers.js'

vi.mock(`@roots/bud-support/lodash/omit`)

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
    vi.clearAllMocks()

    bud = await factory()

    budPathSpy = vi.spyOn(bud, `path`)
    htmlPlugin = bud.extensions.get(
      `@roots/bud-extensions/html-webpack-plugin`,
    )
    interpolatePlugin = bud.extensions.get(
      `@roots/bud-extensions/interpolate-html-webpack-plugin`,
    )
    htmlEnableSpy = vi.spyOn(htmlPlugin, `enable`)
    htmlSetOptionsSpy = vi.spyOn(htmlPlugin, `set`)
    interpolateEnableSpy = vi.spyOn(interpolatePlugin, `enable`)
    interpolateSetOptionsSpy = vi.spyOn(interpolatePlugin, `set`)

    html = source.html.bind(bud)
  })

  it.each([false, true, undefined, {}])(
    `should always return bud`,
    async value => {
      expect(await html(value)).toBeInstanceOf(Bud)
    },
    60000,
  )

  it(`should disable extension when called with \`false\``, async () => {
    const returned = await html(false)

    expect(htmlEnableSpy).toHaveBeenCalledWith(false)
    Object.entries(helpers.defaultHtmlPluginOptions).forEach(v =>
      expect(htmlSetOptionsSpy).toHaveBeenCalledWith(...v),
    )

    expect(returned).toBe(bud)
  })

  it(`should enable extension when called with \`true\``, async () => {
    const returned = await html(true)

    expect(htmlEnableSpy).toHaveBeenCalledWith(true)
    Object.entries(helpers.defaultHtmlPluginOptions).forEach(v =>
      expect(htmlSetOptionsSpy).toHaveBeenCalledWith(...v),
    )

    expect(returned).toBe(bud)
  })

  it(`should enable extension when called with \`undefined\``, async () => {
    const returned = await html()

    expect(htmlEnableSpy).toHaveBeenCalledWith(true)
    Object.entries(helpers.defaultHtmlPluginOptions).forEach(v =>
      expect(htmlSetOptionsSpy).toHaveBeenCalledWith(...v),
    )

    expect(returned).toBe(bud)
  })

  it(`should enable extension when called with \`object\``, async () => {
    const returned = await html({})

    expect(htmlEnableSpy).toHaveBeenCalledWith(true)
    Object.entries(helpers.defaultHtmlPluginOptions).forEach(v =>
      expect(htmlSetOptionsSpy).toHaveBeenCalledWith(...v),
    )

    expect(returned).toBe(bud)
  })

  it(`should pass options to html-webpack-plugin extension`, async () => {
    await html({template: `test`, replace: {foo: `bar`}})

    expect(interpolateEnableSpy).toHaveBeenCalledWith(true)
    expect(interpolateSetOptionsSpy).toHaveBeenCalledWith(`foo`, `bar`)
    expect(htmlEnableSpy).toHaveBeenCalledWith(true)
    expect(budPathSpy).toHaveBeenCalledWith(`test`)
    expect(htmlSetOptionsSpy).toHaveBeenCalledWith(
      `template`,
      bud.path(`test`),
    )
  })

  it(`should leave absolute paths alone when passed as options.template`, async () => {
    await html({template: `/test`, replace: {foo: `bar`}})

    expect(interpolateSetOptionsSpy).toHaveBeenCalledWith(`foo`, `bar`)
    expect(htmlSetOptionsSpy).toHaveBeenCalledWith(`template`, `/test`)
  })

  it(`getHtmlPluginOptions returns normalized options with \`template\` when it is not included`, async () => {
    const returned = helpers.getHtmlPluginOptions(bud, {foo: `bar`})

    expect(returned).toEqual(
      expect.objectContaining({
        template: helpers.defaultHtmlPluginOptions.template,
      }),
    )
  })

  it(`getHtmlPluginOptions handles undefined`, async () => {
    const returned = helpers.getHtmlPluginOptions(bud, undefined)
    expect(returned).toBe(helpers.defaultHtmlPluginOptions)
  })

  it(`getHtmlPluginOptions returns expected options from undefined props`, async () => {
    const returned = helpers.getHtmlPluginOptions(bud, undefined)
    expect(returned).toEqual(helpers.defaultHtmlPluginOptions)
  })

  it(`getHtmlPluginOptions handles object with replace key`, async () => {
    const omit = await import(`@roots/bud-support/lodash/omit`)

    // @ts-ignore
    helpers.getHtmlPluginOptions(bud, {
      foo: `bar`,
      replace: {foo: `bar`},
    })

    expect(omit.default).toHaveBeenCalledWith(
      expect.objectContaining({
        foo: `bar`,
        replace: {foo: `bar`},
      }),
      `replace`,
      `template`,
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
}, 60000)
