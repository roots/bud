/* eslint-disable no-console */
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit'
import {BudResolveUrl} from '../src/resolve-url/extension.js'

describe(`@roots/bud-sass/resolve-url`, () => {
  let bud: Bud
  let extension: BudResolveUrl

  beforeEach(async () => {
    vi.restoreAllMocks()
    bud = await factory()
    extension = new BudResolveUrl(bud)
  })

  it(`should be instantiable`, () => {
    expect(extension).toBeInstanceOf(BudResolveUrl)
  })

  it(`should call resolve util when register is called`, async () => {
    const resolveSpy = vi.spyOn(extension, `resolve`)

    try {
      await extension.register(bud)
    } catch (e) {}

    expect(resolveSpy).toHaveBeenCalledWith(
      expect.stringContaining(`resolve-url-loader`),
      expect.any(String),
    )
  })

  it(`should call setLoader when register is called`, async () => {
    const setLoaderSpy = vi.spyOn(extension.app.build, `setLoader`)
    try {
      await extension.register(bud)
    } catch (e) {
      console.error(e)
    }

    expect(setLoaderSpy).toHaveBeenCalled()
  })

  it(`should call setItem when register is called`, async () => {
    const setItemSpy = vi.spyOn(extension.app.build, `setItem`)

    try {
      await extension.register(bud)
    } catch (e) {}

    expect(setItemSpy).toHaveBeenCalledWith(
      `resolve-url`,
      expect.objectContaining({
        loader: `resolve-url`,
        options: expect.any(Function),
      }),
    )
  })
})
