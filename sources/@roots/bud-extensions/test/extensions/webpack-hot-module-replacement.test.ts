import {factory} from '@repo/test-kit'
import HmrExtension from '@roots/bud-extensions/webpack-hot-module-replacement-plugin'
import {Extension} from '@roots/bud-framework/extension'
import webpack from '@roots/bud-support/webpack'
import {describe, expect, it, test, vi} from 'vitest'

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
    expect(extension.isEnabled()).toBe(false)
  })

  it(`should be enabled in development`, async () => {
    vi.restoreAllMocks()

    const bud = await factory({mode: `development`})

    expect(bud.mode).toBe(`development`)
    const extension = new HmrExtension(bud)
    expect(extension.isEnabled()).toBe(true)
  })

  it(`should produce webpack hmr plugin`, async () => {
    const bud = await factory({mode: `development`})
    // @ts-ignore
    const extension = new HmrExtension(bud)

    expect((await extension.make(bud)).constructor.name).toBe(`HotModuleReplacementPlugin`)
  })

  test.todo(`should be tested`)
})
