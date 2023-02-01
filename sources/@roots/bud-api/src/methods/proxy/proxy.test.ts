/* eslint-disable n/callback-return */
import {URL} from 'node:url'

import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {disableMiddleware, enableMiddleware} from './helpers.js'
import {proxy as proxyFn} from './index.js'

describe(`bud.proxy`, () => {
  let bud
  let proxy

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory({mode: `development`})
    proxy = proxyFn.bind(bud)
  })

  it(`should call bud.hooks.on with a fn when called with a number`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await proxy(3005)

    expect(onSpy).toHaveBeenLastCalledWith(
      `dev.proxyUrl`,
      expect.any(Function),
    )
  })

  it(`should set port when called with a number`, async () => {
    await proxy(3005)
    expect(bud.hooks.filter(`dev.proxyUrl`).port).toBe(`3005`)
  })

  it(`should call bud.hooks.on with a URL when called with a URL`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    await proxy(new URL(`https://example.com`))

    expect(onSpy).toHaveBeenCalledWith(
      `dev.middleware.enabled`,
      expect.any(Function),
    )
    expect(onSpy).toHaveBeenLastCalledWith(`dev.proxyUrl`, expect.any(URL))
  })

  it(`should call bud.hooks.on with a URL when called with a string`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    await proxy(`https://example.com`)

    expect(onSpy).toHaveBeenCalledWith(`dev.proxyUrl`, expect.any(URL))
  })

  it(`should enable middleware when called with true`, () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    proxy(true)

    expect(onSpy).toHaveBeenNthCalledWith(
      1,
      `dev.middleware.enabled`,
      expect.any(Function),
    )
  })

  it(`should enable middleware when called with false`, () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    proxy(true)

    expect(onSpy).toHaveBeenNthCalledWith(
      1,
      `dev.middleware.enabled`,
      expect.any(Function),
    )
  })

  it(`should run replacements when called without replacements`, async () => {
    let onSpy = vi.spyOn(bud.hooks, `on`)

    await proxy(true)

    expect(onSpy).not.toHaveBeenLastCalledWith(
      `dev.middleware.proxy.replacements`,
      expect.any(Function),
    )
  })

  it(`should run replacements when called with replacements`, async () => {
    let onSpy = vi.spyOn(bud.hooks, `on`)

    await proxy(true, [[/foo/, `bar`]])

    expect(onSpy).toHaveBeenLastCalledWith(
      `dev.middleware.proxy.replacements`,
      [[/foo/, `bar`]],
    )
  })

  it(`should run replacements when specified as Options prop`, async () => {
    let onSpy = vi.spyOn(bud.hooks, `on`)

    await proxy({
      replacements: [[/foo/, `bar`]],
    })

    expect(onSpy).toHaveBeenLastCalledWith(
      `dev.middleware.proxy.replacements`,
      [[/foo/, `bar`]],
    )
  })

  it(`should return bud`, async () => {
    expect(await proxy({foo: [`bar`]})).toEqual(bud)
  })
})

describe(`enableMiddlewareHookCallback`, async () => {
  it(`should add middleware`, () => {
    expect(enableMiddleware([`dev`])).toEqual(
      expect.arrayContaining([`dev`, `proxy`, `cookie`]),
    )
  })
})

describe(`disableMiddlewareHookCallback`, () => {
  it(`should remove middleware`, () => {
    expect(disableMiddleware([`dev`, `proxy`, `cookie`])).toEqual(
      expect.arrayContaining([`dev`]),
    )
  })
})
