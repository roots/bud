import {factory} from '@repo/test-kit'
import {Extension} from '@roots/bud-framework/extension'
import webpack from '@roots/bud-support/webpack'
import {describe, expect, it, test, vi} from 'vitest'

import HmrExtension from '../../src/extensions/webpack-hot-module-replacement-plugin/index.js'

describe(`webpack-hot-module-replacement-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(HmrExtension).toBeInstanceOf(Function)
  })

  it(`is an instance of Extension`, async () => {
    const bud = await factory()
    const extension = new HmrExtension(bud)
    expect(extension).toBeInstanceOf(Extension)
  })

  it(`is not enabled in production`, async () => {
    vi.clearAllMocks()
    const bud = await factory({mode: `production`})

    // @ts-ignore
    const extension = new HmrExtension(bud)
    expect(bud.mode).toBe(`production`)
    expect(await extension.isEnabled()).toBe(false)
  })

  it(`is enabled in development`, async () => {
    vi.restoreAllMocks()

    const bud = await factory({mode: `development`})

    expect(bud.mode).toBe(`development`)
    // @ts-ignore
    const extension = new HmrExtension(bud)
    expect(await extension.isEnabled()).toBe(true)
  })

  it(`produces webpack hmr plugin`, async () => {
    const bud = await factory({mode: `development`})
    // @ts-ignore
    const extension = new HmrExtension(bud)

    expect(extension.plugin).toBe(webpack.HotModuleReplacementPlugin)
  })

  test.todo(`should be tested`)
})
