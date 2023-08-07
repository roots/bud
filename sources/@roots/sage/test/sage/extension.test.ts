import {dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

import {Bud, factory} from '@repo/test-kit'
import Sage from '@roots/sage'
import {beforeEach, describe, expect, it, vi} from 'vitest'

describe(`@roots/sage`, async () => {
  let bud: Bud
  let sage: Sage

  beforeEach(async () => {
    bud = await factory({
      basedir: dirname(fileURLToPath(import.meta.url)),
    })
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

    await sage.register(bud)

    expect(setPathSpy).toHaveBeenCalledWith({
      '@dist': `public`,
      '@fonts': `@src/fonts`,
      '@images': `@src/images`,
      '@scripts': `@src/scripts`,
      '@src': `resources`,
      '@styles': `@src/styles`,
      '@views': `@src/views`,
    })

    expect(hooksSpy).toHaveBeenCalledWith(
      `build.output.uniqueName`,
      `@roots/bud/sage/${bud.label}`,
    )
  })

  it(`should call bud.hash in production`, async () => {
    const bud = await factory({mode: `production`})
    const spy = vi.spyOn(bud, `hash`)
    await sage.register(bud)
    expect(spy).toHaveBeenCalled()
  })

  it(`should call bud.hash in production`, async () => {
    const bud = await factory({mode: `production`})
    expect(bud.isProduction).toBe(true)

    const whenSpy = vi.spyOn(bud, `when`)
    const devtoolSpy = vi.spyOn(bud, `devtool`)
    const hashSpy = vi.spyOn(bud, `hash`)
    await sage.register(bud)
    expect(whenSpy).toHaveBeenCalledWith(
      true,
      expect.any(Function),
      expect.any(Function),
    )
    expect(hashSpy).toHaveBeenCalled()
    expect(devtoolSpy).not.toHaveBeenCalled()
  })

  it(`should call bud.devtool in development`, async () => {
    const bud = await factory({mode: `development`})
    expect(bud.isProduction).toBe(false)
    const whenSpy = vi.spyOn(bud, `when`)
    const devtoolSpy = vi.spyOn(bud, `devtool`)
    const hashSpy = vi.spyOn(bud, `hash`)
    await sage.register(bud)
    expect(whenSpy).toHaveBeenCalledWith(
      false,
      expect.any(Function),
      expect.any(Function),
    )
    expect(devtoolSpy).toHaveBeenCalled()
    expect(hashSpy).not.toHaveBeenCalled()
  })
})
