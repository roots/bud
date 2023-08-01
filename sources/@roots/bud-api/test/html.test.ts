import type HTMLPlugin from '@roots/bud-extensions/html-webpack-plugin'
import type InterpolatePlugin from '@roots/bud-extensions/interpolate-html-webpack-plugin'

import {factory} from '@repo/test-kit'
import {Bud} from '@roots/bud'
import * as source from '@roots/bud-api/methods/html'
import {beforeAll, describe, expect, it, SpyInstance, vi} from 'vitest'

describe(`bud.html`, () => {
  let bud: Bud
  let html: typeof source.html
  let htmlPlugin: HTMLPlugin
  let interpolatePlugin: InterpolatePlugin
  let htmlEnableSpy: SpyInstance<[boolean?], HTMLPlugin>
  let htmlSetSpy: SpyInstance<any[], HTMLPlugin>
  let interpolateEnableSpy: SpyInstance<[boolean?], InterpolatePlugin>
  let interpolateSetSpy: SpyInstance<any[], InterpolatePlugin>

  beforeAll(async () => {
    bud = await factory()
    html = source.html.bind(bud)

    htmlPlugin = bud.extensions.get(
      `@roots/bud-extensions/html-webpack-plugin`,
    )
    interpolatePlugin = bud.extensions.get(
      `@roots/bud-extensions/interpolate-html-webpack-plugin`,
    )
    htmlEnableSpy = vi.spyOn(htmlPlugin, `enable`)
    htmlSetSpy = vi.spyOn(htmlPlugin, `set`)
    interpolateEnableSpy = vi.spyOn(interpolatePlugin, `enable`)
    interpolateSetSpy = vi.spyOn(interpolatePlugin, `set`)
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
    expect(returned).toBe(bud)
  })

  it(`should enable extension when called with \`true\``, async () => {
    const returned = await html(true)

    expect(htmlEnableSpy).toHaveBeenCalledWith(true)
    expect(returned).toBe(bud)
  })

  it(`should enable extension when called with \`undefined\``, async () => {
    const returned = await html()

    expect(htmlEnableSpy).toHaveBeenCalledWith(true)
    expect(returned).toBe(bud)
  })

  it(`should enable extension when called with \`object\``, async () => {
    const returned = await html({})

    expect(htmlEnableSpy).toHaveBeenCalledWith(true)
    expect(returned).toBe(bud)
  })

  it(`should pass options to html-webpack-plugin extension`, async () => {
    await html({replace: {foo: `bar`}, template: `test`})

    expect(interpolateEnableSpy).toHaveBeenCalledWith(true)
    expect(interpolateSetSpy).toHaveBeenCalledWith(`foo`, `bar`)
    expect(htmlSetSpy).toHaveBeenCalledWith(`template`, bud.path(`test`))
  })
}, 60000)
