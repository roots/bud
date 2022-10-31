import mockBud from '@repo/test-kit/mocks/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import BudPresetWordPress from './index'

vi.mock(`@roots/bud`, () => ({default: mockBud}))

describe(`@roots/bud-preset-wordpress`, () => {
  let bud: any
  let extension: BudPresetWordPress

  beforeEach(async () => {
    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
    extension = new BudPresetWordPress(bud)
  })

  it(`should have label`, () => {
    expect(extension.label).toBe(`@roots/bud-preset-wordpress`)
  })

  it(`should have configAfter method`, async () => {
    expect(extension.configAfter).toBeInstanceOf(Function)
  })

  it(`should call bud.proxy when conditions are met`, async () => {
    bud.isProduction = false
    bud.env.has = vi.fn(() => true)
    bud.env.isString = vi.fn(() => true)
    bud.env.get = vi.fn(() => `http://example.com`)
    await extension.configAfter(bud)
    expect(bud.proxy).toHaveBeenCalled()
  })

  it(`should not call bud.proxy when isProduction is false`, async () => {
    // @ts-ignore
    bud.isProduction = true
    await extension.configAfter(bud)
    expect(bud.proxy).not.toHaveBeenCalled()
  })

  it(`should not call bud.proxy when proxy already called`, async () => {
    bud.isProduction = false
    bud.env.has = vi.fn(() => true)
    bud.env.isString = vi.fn(() => true)
    bud.hooks.filter = vi.fn(() => true)
    bud.env.get = vi.fn(() => `http://example.com`)
    await extension.configAfter(bud)
    expect(bud.proxy).not.toHaveBeenCalled()
  })

  it(`should not call bud.proxy when dev.middleware.proxy.target value is set`, async () => {
    bud.hooks.filter = vi.fn(() => true) as any
    await extension.configAfter(bud)
    expect(bud.hooks.filter).toHaveBeenCalled()
    expect(bud.hooks.filter).toHaveBeenCalledWith(
      `dev.middleware.proxy.target`,
    )
    expect(bud.proxy).not.toHaveBeenCalled()
  })

  it(`should not call bud.proxy when WP_HOME is not set`, async () => {
    bud.env.has = vi.fn(() => false)
    bud.env.isString = vi.fn(() => false) as any
    await extension.configAfter(bud)
    expect(bud.proxy).not.toHaveBeenCalled()
  })

  it(`should not call bud.proxy when WP_HOME is not a string`, async () => {
    bud.env.has = vi.fn(() => true)
    bud.env.isString = vi.fn(() => false)
    await extension.configAfter(bud)
    expect(bud.env.isString).toHaveBeenCalled()
    expect(bud.env.isString).toHaveBeenCalledWith(`WP_HOME`)
    expect(bud.proxy).not.toHaveBeenCalled()
  })

  it(`should warn when proxy set call results in error`, async () => {
    bud.isProduction = false
    bud.env.has = vi.fn(() => true)
    bud.env.isString = vi.fn(() => true)
    bud.env.get = vi.fn(() => `123456789`)

    try {
      await extension.configAfter(bud)
    } catch (e) {}
    expect(bud.warn).toHaveBeenCalled()
    expect(bud.warn).toHaveBeenCalledWith(
      `@roots/bud-preset-wordpress: tried to set proxy based on value of WP_HOME but failed\n`,
      `WP_HOME is set as: 123456789`,
      `\n`,
      `Please check your .env file and ensure that WP_HOME is a valid URL`,
      `or call bud.proxy in your configuration file`,
    )
  })
})
