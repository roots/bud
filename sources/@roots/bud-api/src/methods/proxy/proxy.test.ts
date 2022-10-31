/* eslint-disable n/callback-return */
import {URL} from 'node:url'

import mockBud from '@repo/test-kit/mocks/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {
  disableMiddlewareHookCallback,
  enableMiddlewareHookCallback,
  method as proxy,
} from './index'

vi.mock(`@roots/bud`, () => ({default: mockBud}))

describe(`bud.proxy`, () => {
  let bud
  let subject

  beforeEach(async () => {
    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
    bud.isDevelopment = true

    subject = proxy.bind(bud)
    vi.clearAllMocks()
  })

  it(`should call bud.hooks.on with a fn when called with a number`, () => {
    subject(3005)

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `dev.middleware.proxy.target`,
      expect.any(Function),
    )
  })

  it(`should set port when called with a number`, () => {
    let url = new URL(`http://example.com:8080`)
    bud.hooks.on = vi.fn((str, cb) => {
      if (str === `dev.middleware.proxy.target`) url = cb(url)

      return [`dev`]
    })

    subject(3005)

    expect(url.port).toBe(`3005`)
  })

  it(`should call bud.hooks.on with a URL when called with a URL`, () => {
    subject(new URL(`https://example.com`))

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `dev.middleware.proxy.target`,
      expect.any(URL),
    )
  })

  it(`should call bud.hooks.on with a URL when called with a string`, () => {
    subject(`https://example.com`)

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `dev.middleware.proxy.target`,
      expect.any(URL),
    )
  })

  it(`should enable middleware when called with true`, () => {
    subject(true)

    expect(bud.hooks.on).toHaveBeenNthCalledWith(
      1,
      `dev.middleware.enabled`,
      expect.any(Function),
    )
  })

  it(`should enable middleware when called with false`, () => {
    subject(true)

    expect(bud.hooks.on).toHaveBeenNthCalledWith(
      1,
      `dev.middleware.enabled`,
      expect.any(Function),
    )
  })

  it(`should run replacements when called without replacements`, () => {
    let callback

    bud.hooks.filter = vi.fn((str, cb) => {
      if (str === `dev.middleware.proxy.target`)
        return new URL(`https://example.com/`)

      callback = cb
    })
    bud.hooks.on = vi.fn((str, value) => {
      if (str === `dev.middleware.proxy.replacements`) {
        bud.hooks.filter(str, value)
      }
    })

    subject(true)

    expect(bud.hooks.on).toHaveBeenLastCalledWith(
      `dev.middleware.proxy.replacements`,
      expect.any(Function),
    )
    expect(bud.hooks.filter).toHaveBeenCalledWith(
      `dev.middleware.proxy.replacements`,
      expect.any(Function),
    )
    expect(callback([[`https://example.com/`, `/`]])).toEqual([
      [`https://example.com/`, `/`],
      [`https://example.com/`, `/`],
    ])
  })

  it(`should run replacements when called with replacements`, () => {
    subject(true, [[/foo/, `bar`]])

    expect(bud.hooks.on).toHaveBeenLastCalledWith(
      `dev.middleware.proxy.replacements`,
      expect.arrayContaining([[/foo/, `bar`]]),
    )
  })

  it(`should return bud`, () => {
    expect(subject({foo: [`bar`]})).toEqual(bud)
  })
})

describe(`enableMiddlewareHookCallback`, () => {
  it(`should add middleware`, () => {
    expect(enableMiddlewareHookCallback([`dev`])).toEqual(
      expect.arrayContaining([`dev`, `proxy`, `cookie`]),
    )
  })
})

describe(`disableMiddlewareHookCallback`, () => {
  it(`should remove middleware`, () => {
    expect(
      disableMiddlewareHookCallback([`dev`, `proxy`, `cookie`]),
    ).toEqual(expect.arrayContaining([`dev`]))
  })
})
