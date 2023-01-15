import {Bud, factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {BladeLoaderExtension} from './extension.js'

describe(`@roots/sage/blade-loader`, () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
  })

  it(`should be constructable`, () => {
    expect(BladeLoaderExtension).toBeInstanceOf(Function)
  })

  it(`should register blade-loader (loader)`, async () => {
    const extension = new BladeLoaderExtension(bud)
    const setLoaderSpy = vi.spyOn(bud.build, `setLoader`)
    await extension.register(bud)
    expect(setLoaderSpy).toHaveBeenCalledWith(
      `@roots/blade-loader`,
      await bud.module.resolve(`@roots/blade-loader`),
    )
  })

  it(`should register blade-loader (item)`, async () => {
    const extension = new BladeLoaderExtension(bud)
    const setItemSpy = vi.spyOn(bud.build, `setItem`)
    await extension.register(bud)
    expect(setItemSpy).toHaveBeenCalledWith(`@roots/blade-loader`, {
      loader: `@roots/blade-loader`,
    })
  })

  it(`should register no-emit (item)`, async () => {
    const extension = new BladeLoaderExtension(bud)
    const setItemSpy = vi.spyOn(bud.build, `setItem`)
    await extension.register(bud)
    expect(setItemSpy).toHaveBeenCalledWith(`no-emit`, {
      loader: `file`,
      options: {emit: false},
    })
  })

  it(`should register blade-loader (rule)`, async () => {
    const extension = new BladeLoaderExtension(bud)
    const setRuleSpy = vi.spyOn(bud.build, `setRule`)
    await extension.register(bud)
    expect(setRuleSpy).toHaveBeenCalledWith(`blade`, {
      test: /\.blade\.php$/,
      use: [`no-emit`, `@roots/blade-loader`],
    })
  })
})
