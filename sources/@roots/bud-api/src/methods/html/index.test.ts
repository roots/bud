import {Bud, factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {html as func} from './index.js'

describe(`bud.html`, () => {
  let bud: Bud
  let html: func
  let htmlPlugin
  let interpolatePlugin

  beforeEach(async () => {
    bud = await factory()
    htmlPlugin = bud.extensions.get(
      `@roots/bud-extensions/html-webpack-plugin`,
    )
    interpolatePlugin = bud.extensions.get(
      `@roots/bud-extensions/interpolate-html-webpack-plugin`,
    )

    html = func.bind(bud)
  })

  it.each([false, true, undefined, {}])(
    `should always return bud`,
    async value => {
      expect(await html(value)).toBeInstanceOf(Bud)
    },
  )

  it(`should disable extension when called with \`false\``, async () => {
    const htmlEnableSpy = vi.spyOn(htmlPlugin, `enable`)
    const interpolateEnableSpy = vi.spyOn(interpolatePlugin, `enable`)
    html(false)
    expect(htmlEnableSpy).toHaveBeenCalledWith(false)
    expect(interpolateEnableSpy).toHaveBeenCalledWith(false)
  })

  it(`should enable extension when called with \`true\``, async () => {
    const htmlEnableSpy = vi.spyOn(htmlPlugin, `enable`)
    const interpolateEnableSpy = vi.spyOn(interpolatePlugin, `enable`)
    html(true)
    expect(htmlEnableSpy).toHaveBeenCalledWith(true)
    expect(interpolateEnableSpy).toHaveBeenCalledWith(true)
  })

  it(`should enable extension when called with \`undefined\``, async () => {
    const htmlEnableSpy = vi.spyOn(htmlPlugin, `enable`)
    const interpolateEnableSpy = vi.spyOn(interpolatePlugin, `enable`)
    html()
    expect(htmlEnableSpy).toHaveBeenCalledWith(true)
    expect(interpolateEnableSpy).toHaveBeenCalledWith(true)
  })

  it(`should enable extension when called with \`object\``, async () => {
    const htmlEnableSpy = vi.spyOn(htmlPlugin, `enable`)
    const interpolateEnableSpy = vi.spyOn(interpolatePlugin, `enable`)
    html({})
    expect(htmlEnableSpy).toHaveBeenCalledWith(true)
    expect(interpolateEnableSpy).toHaveBeenCalledWith(true)
  })

  it(`should pass public env values to interpolate-html-plugin`, async () => {
    const setOptionsSpy = vi.spyOn(interpolatePlugin, `setOptions`)
    html()
    expect(setOptionsSpy).toHaveBeenCalledWith(expect.any(Function))
  })

  it(`should pass options to html-webpack-plugin extension`, async () => {
    const setOptionsSpy = vi.spyOn(htmlPlugin, `setOptions`)
    const interpolateSetOptionsSpy = vi.spyOn(
      interpolatePlugin,
      `setOptions`,
    )

    html({template: `test`, replace: {foo: `bar`}})
    expect(setOptionsSpy).toHaveBeenCalledWith(expect.any(Function))
    expect(interpolateSetOptionsSpy).toHaveBeenCalledWith(
      expect.any(Function),
    )
  })
})
