/* eslint-disable n/callback-return */
import {URL} from 'node:url'

import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {
  disableMiddlewareHookCallback,
  enableMiddlewareHookCallback,
  method as proxy,
} from './index.js'

describe(`bud.proxy`, () => {
  let bud
  let subject

  beforeEach(async () => {
    bud = await factory({mode: `development`})

    subject = proxy.bind(bud)
  })

  it(`should call bud.hooks.on with a fn when called with a number`, () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    subject(3005)

    expect(onSpy).toHaveBeenCalledWith(
      `dev.middleware.proxy.target`,
      expect.any(Function),
    )
  })

  it(`should set port when called with a number`, () => {
    subject(3005)
    expect(bud.hooks.filter(`dev.middleware.proxy.target`).port).toBe(
      `3005`,
    )
  })

  it(`should call bud.hooks.on with a URL when called with a URL`, () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    subject(new URL(`https://example.com`))

    expect(onSpy).toHaveBeenCalledWith(
      `dev.middleware.proxy.target`,
      expect.any(URL),
    )
  })

  it(`should call bud.hooks.on with a URL when called with a string`, () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    subject(`https://example.com`)

    expect(onSpy).toHaveBeenCalledWith(
      `dev.middleware.proxy.target`,
      expect.any(URL),
    )
  })

  it(`should enable middleware when called with true`, () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    subject(true)

    expect(onSpy).toHaveBeenNthCalledWith(
      1,
      `dev.middleware.enabled`,
      expect.any(Function),
    )
  })

  it(`should enable middleware when called with false`, () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    subject(true)

    expect(onSpy).toHaveBeenNthCalledWith(
      1,
      `dev.middleware.enabled`,
      expect.any(Function),
    )
  })

  it(`should run replacements when called without replacements`, () => {
    let onSpy = vi.spyOn(bud.hooks, `on`)

    subject(true)

    expect(onSpy).toHaveBeenLastCalledWith(
      `dev.middleware.proxy.replacements`,
      expect.any(Function),
    )
  })

  it(`should run replacements when called with replacements`, () => {
    let onSpy = vi.spyOn(bud.hooks, `on`)

    subject(true, [[/foo/, `bar`]])

    expect(onSpy).toHaveBeenLastCalledWith(
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
