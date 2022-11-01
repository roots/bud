import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import BudPresetWordPress from './index'

describe(`@roots/bud-preset-wordpress`, () => {
  let bud: any
  let extension: BudPresetWordPress

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory({mode: `development`})
    bud.env.set(`WP_HOME`, `http://localhost:8080`)
    extension = new BudPresetWordPress(bud)
  })

  it(`should have label`, () => {
    expect(extension.label).toBe(`@roots/bud-preset-wordpress`)
  })

  it(`should have configAfter method`, async () => {
    expect(extension.configAfter).toBeInstanceOf(Function)
  })

  it(`should call bud.proxy when conditions are met`, async () => {
    const proxySpy = vi.spyOn(bud, `proxy`)
    await extension.configAfter(bud)
    expect(proxySpy).toHaveBeenCalled()
  })

  it(`should not call bud.proxy when isProduction is false`, async () => {
    const bud = await factory({mode: `production`})
    const proxySpy = vi.spyOn(bud, `proxy`)

    await extension.configAfter(bud)
    expect(proxySpy).not.toHaveBeenCalled()
  })

  it(`should not call bud.proxy when proxy already called`, async () => {
    const bud = await factory({mode: `development`})
    bud.hooks.on(`dev.middleware.proxy.target`, `http://localhost:8080`)

    const proxySpy = vi.spyOn(bud, `proxy`)

    await extension.configAfter(bud)
    expect(proxySpy).not.toHaveBeenCalled()
  })

  it(`should not call bud.proxy when dev.middleware.proxy.target value is set`, async () => {
    const filterSpy = vi.spyOn(bud.hooks, `filter`)
    const proxySpy = vi.spyOn(bud, `proxy`)
    bud.hooks.on(`dev.middleware.proxy.target`, `http://localhost:8080`)
    await extension.configAfter(bud)

    expect(filterSpy).toHaveBeenCalled()
    expect(filterSpy).toHaveBeenCalledWith(`dev.middleware.proxy.target`)
    expect(proxySpy).not.toHaveBeenCalled()
  })

  it(`should not call bud.proxy when WP_HOME is not set`, async () => {
    bud.env.set(`WP_HOME`, undefined)
    const proxySpy = vi.spyOn(bud, `proxy`)

    await extension.configAfter(bud)
    expect(proxySpy).not.toHaveBeenCalled()
  })

  it(`should not call bud.proxy when WP_HOME is not a string`, async () => {
    bud.env.set(`WP_HOME`, 0)

    const proxySpy = vi.spyOn(bud, `proxy`)
    const isStringSpy = vi.spyOn(bud.env, `isString`)

    await extension.configAfter(bud)
    expect(isStringSpy).toHaveBeenCalled()
    expect(isStringSpy).toHaveBeenCalledWith(`WP_HOME`)
    expect(proxySpy).not.toHaveBeenCalled()
  })

  it(`should warn when proxy set call results in error`, async () => {
    const bud = await factory({mode: `development`})
    bud.env.set(`WP_HOME`, `1234567890`)

    const warnSpy = vi.spyOn(bud, `warn`)
    try {
      await extension.configAfter(bud)
    } catch (e) {}
    expect(warnSpy).toHaveBeenCalled()
    expect(warnSpy).toHaveBeenCalledWith(
      `@roots/bud-preset-wordpress: tried to set proxy based on value of WP_HOME but failed\n`,
      `WP_HOME is set as: 1234567890`,
      `\n`,
      `Please check your .env file and ensure that WP_HOME is a valid URL`,
      `or call bud.proxy in your configuration file`,
    )
  })
})
