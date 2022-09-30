import '@roots/bud-api'

import {beforeEach, describe, expect, it, jest} from '@jest/globals'
import {Extension} from '@roots/bud-framework'

import BudPresetWordPress from './index'

const Logger = {
  error: jest.fn(),
  success: jest.fn(),
  scope: [],
  instance: {
    error: jest.fn(),
    success: jest.fn(),
    scope: () => Logger,
  },
}

describe(`@roots/bud-preset-wordpress`, () => {
  let bud: any
  let extension: BudPresetWordPress

  beforeEach(async () => {
    bud = {
      api: {trace: []},
      env: {
        has: jest.fn(() => true),
        isString: jest.fn(() => true),
        get: jest.fn(() => `https://example.com`),
      },
      isDevelopment: true,
      extensions: {add: jest.fn()},
      hooks: {async: jest.fn(), filter: jest.fn(() => false)},
      logger: Logger,
      module: {resolve: jest.fn()},
      proxy: jest.fn(),
      warn: jest.fn(),
    }

    extension = new BudPresetWordPress(bud)
  })

  it(`should be Extension`, async () => {
    expect(extension).toBeInstanceOf(Extension)
  })

  it(`should have label`, () => {
    expect(extension.label).toBe(`@roots/bud-preset-wordpress`)
  })

  it(`should have configAfter method`, async () => {
    expect(extension.configAfter).toBeInstanceOf(Function)
  })

  it(`should call bud.proxy when conditions are met`, async () => {
    extension.app.proxy = jest.fn(() => bud) as any
    await extension.configAfter()
    expect(extension.app.proxy).toHaveBeenCalled()
  })

  it(`should not call bud.proxy when isDevelopment is false`, async () => {
    // @ts-ignore
    extension.app.isDevelopment = false
    await extension.configAfter()
    expect(extension.app.proxy).not.toHaveBeenCalled()
  })

  it(`should not call bud.proxy when proxy already called`, async () => {
    extension.app.api.trace = [[`proxy`]]
    await extension.configAfter()
    expect(extension.app.proxy).not.toHaveBeenCalled()
  })

  it(`should not call bud.proxy when dev.middleware.proxy.target value is set`, async () => {
    extension.app.hooks.filter = jest.fn(() => true) as any
    await extension.configAfter()
    expect(extension.app.hooks.filter).toHaveBeenCalled()
    expect(extension.app.hooks.filter).toHaveBeenCalledWith(
      `dev.middleware.proxy.target`,
    )
    expect(extension.app.proxy).not.toHaveBeenCalled()
  })

  it(`should not call bud.proxy when WP_HOME is not set`, async () => {
    extension.app.env.has = jest.fn(() => false) as any
    await extension.configAfter()
    expect(extension.app.env.has).toHaveBeenCalled()
    expect(extension.app.env.has).toHaveBeenCalledWith(`WP_HOME`)
    expect(extension.app.proxy).not.toHaveBeenCalled()
  })

  it(`should not call bud.proxy when WP_HOME is not a string`, async () => {
    extension.app.env.isString = jest.fn(() => false) as any
    await extension.configAfter()
    expect(extension.app.env.isString).toHaveBeenCalled()
    expect(extension.app.env.isString).toHaveBeenCalledWith(`WP_HOME`)
    expect(extension.app.proxy).not.toHaveBeenCalled()
  })

  it(`should warn when proxy set call results in error`, async () => {
    extension.app.proxy = jest.fn(() => {
      throw new Error(`test`)
    }) as any

    await extension.configAfter()

    expect(extension.app.proxy).toHaveBeenCalled()
    expect(extension.app.warn).toHaveBeenCalled()
    expect(extension.app.warn).toHaveBeenCalledWith(
      `@roots/bud-preset-wordpress: tried to set proxy based on value of WP_HOME but failed\n`,
      `WP_HOME is set as: https://example.com`,
      `\n`,
      `Please check your .env file and ensure that WP_HOME is a valid URL`,
      `or call bud.proxy in your configuration file`,
    )
  })
})
