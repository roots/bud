import type {Bud} from '@roots/bud-framework'

import {beforeEach, describe, expect, it, vi} from 'vitest'

import * as module from '../../../src/methods/setPublicPath'

describe(`@roots/bud-framework/methods/setPublicPath`, () => {
  let bud: any
  let setPublicPath: module.setPublicPath

  beforeEach(async () => {
    bud = {
      hooks: {
        on: vi.fn(),
      },
    } as unknown as Bud

    setPublicPath = module.setPublicPath.bind(bud)
  })

  it(`should be a function`, () => {
    expect(setPublicPath).toBeInstanceOf(Function)
  })

  it(`should return Bud`, () => {
    expect(setPublicPath()).toBe(bud)
  })

  it(`should set publicPath with a string`, () => {
    setPublicPath(`/foo/`)
    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.output.publicPath`,
      `/foo/`,
    )
  })

  it(`should append trailing slash to strings`, () => {
    setPublicPath(`/foo`)
    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.output.publicPath`,
      `/foo/`,
    )
  })

  it(`should set publicPath with a function`, () => {
    const publicPathSetter = vi.fn(() => `/bar`)

    setPublicPath(publicPathSetter)

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.output.publicPath`,
      publicPathSetter,
    )
  })

  it(`should set publicPath with undefined`, () => {
    setPublicPath(undefined)
    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.output.publicPath`,
      undefined,
    )
  })

  it(`should throw if publicPath is not a string or function`, () => {
    // @ts-ignore
    expect(() => setPublicPath(null)).toThrow()
    // @ts-ignore
    expect(() => setPublicPath(1)).toThrow()
    // @ts-ignore
    expect(() => setPublicPath({})).toThrow()
    // @ts-ignore
    expect(() => setPublicPath([])).toThrow()
    // @ts-ignore
    expect(() => setPublicPath(true)).toThrow()
    // @ts-ignore
    expect(() => setPublicPath(Symbol())).toThrow()
  })
})
