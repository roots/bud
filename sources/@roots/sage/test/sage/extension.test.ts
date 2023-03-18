import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'

import Sage from '../../src'

describe(`@roots/sage`, async () => {
  let bud: Bud
  let sage: Sage

  beforeEach(async () => {
    bud = await factory()
    sage = new Sage(bud)
  })

  it(`should register '@roots/sage/blade-loader'`, async () => {
    expect(bud.extensions.has(`@roots/sage/blade-loader`)).toBeFalsy()
    await bud.extensions.add(`@roots/sage`)
    expect(bud.extensions.has(`@roots/sage/blade-loader`)).toBeTruthy()
  })

  it(`should register '@roots/bud-preset-wordpress'`, async () => {
    expect(bud.extensions.has(`@roots/bud-preset-wordpress`)).toBeFalsy()
    await bud.extensions.add(`@roots/sage`)
    expect(bud.extensions.has(`@roots/bud-preset-wordpress`)).toBeTruthy()
  })

  it(`should register '@roots/sage/acorn'`, async () => {
    expect(bud.extensions.has(`@roots/sage/acorn`)).toBeFalsy()
    await bud.extensions.add(`@roots/sage`)
    expect(bud.extensions.has(`@roots/sage/acorn`)).toBeTruthy()
  })

  it(`should register errything`, async () => {
    const hooksSpy = vi.spyOn(bud.hooks, `on`)
    const setPathSpy = vi.spyOn(bud, `setPath`)
    const aliasSpy = vi.spyOn(bud, `alias`)

    await sage.register(bud)
    expect(hooksSpy).toHaveBeenNthCalledWith(
      1,
      `build.output.uniqueName`,
      `@roots/bud/sage/${bud.label}`,
    )

    expect(setPathSpy).toHaveBeenCalledWith({
      '@src': `resources`,
      '@fonts': `@src/fonts`,
      '@images': `@src/images`,
      '@scripts': `@src/scripts`,
      '@styles': `@src/styles`,
      '@dist': `public`,
      '@views': `@src/views`,
    })

    expect(aliasSpy).toHaveBeenCalledWith({
      '@fonts': bud.path(`@fonts`),
      '@images': bud.path(`@images`),
      '@scripts': bud.path(`@scripts`),
      '@styles': bud.path(`@styles`),
      '@views': bud.path(`@views`),
    })
  })

  it(`should call bud.hash in production`, async () => {
    const bud = await factory({mode: `production`})
    const spy = vi.spyOn(bud, `hash`)
    await sage.register(bud)
    expect(spy).toHaveBeenCalled()
  })

  it(`should call bud.minimize in production`, async () => {
    const bud = await factory({mode: `production`})
    expect(bud.isProduction).toBe(true)

    const whenSpy = vi.spyOn(bud, `when`)
    const spy = vi.spyOn(bud, `minimize`)
    await sage.register(bud)
    expect(whenSpy).toHaveBeenCalledWith(
      true,
      expect.any(Function),
      expect.any(Function),
      `set minimize, hash, splitChunks in production and devtool in development (@roots\/sage)`,
    )
    expect(spy).toHaveBeenCalled()
  })

  it(`should call bud.runtime('single') in production`, async () => {
    const bud = await factory({mode: `production`})
    expect(bud.isProduction).toBe(true)

    const whenSpy = vi.spyOn(bud, `when`)
    const spy = vi.spyOn(bud, `runtime`)
    await sage.register(bud)
    expect(whenSpy).toHaveBeenCalledWith(
      true,
      expect.any(Function),
      expect.any(Function),
      `set minimize, hash, splitChunks in production and devtool in development (@roots\/sage)`,
    )
    expect(spy).toHaveBeenCalledWith(`single`)
  })

  it(`should call bud.splitChunks in production`, async () => {
    const bud = await factory({mode: `production`})
    expect(bud.isProduction).toBe(true)

    const whenSpy = vi.spyOn(bud, `when`)
    const spy = vi.spyOn(bud, `splitChunks`)
    const devtoolSpy = vi.spyOn(bud, `devtool`)
    await sage.register(bud)
    expect(whenSpy).toHaveBeenCalledWith(
      true,
      expect.any(Function),
      expect.any(Function),
      `set minimize, hash, splitChunks in production and devtool in development (@roots\/sage)`,
    )
    expect(spy).toHaveBeenCalled()
    expect(devtoolSpy).not.toHaveBeenCalled()
  })

  it(`should call bud.devtool in development`, async () => {
    const bud = await factory({mode: `development`})
    expect(bud.isProduction).toBe(false)
    const whenSpy = vi.spyOn(bud, `when`)
    const devtoolSpy = vi.spyOn(bud, `devtool`)
    const splitChunksSpy = vi.spyOn(bud, `splitChunks`)
    await sage.register(bud)
    expect(whenSpy).toHaveBeenCalledWith(
      false,
      expect.any(Function),
      expect.any(Function),
      `set minimize, hash, splitChunks in production and devtool in development (@roots\/sage)`,
    )
    expect(devtoolSpy).toHaveBeenCalled()
    expect(splitChunksSpy).not.toHaveBeenCalled()
  })
})
