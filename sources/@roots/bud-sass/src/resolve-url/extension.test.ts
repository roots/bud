/* eslint-disable no-console */
import {beforeEach, describe, expect, it, vi} from 'vitest'

import ResolveUrlExtension from './index'

describe(`@roots/bud-sass`, () => {
  let bud
  let extension

  beforeEach(async () => {
    vi.restoreAllMocks()
    bud = await import(`@repo/test-kit/bud`).then(
      async ({factory}) => await factory(),
    )
    extension = new ResolveUrlExtension(bud)
  })

  it(`should be instantiable`, () => {
    expect(extension).toBeInstanceOf(ResolveUrlExtension)
  })

  it(`should call resolve util when register is called`, async () => {
    const resolveSpy = vi.spyOn(extension, `resolve`)

    try {
      await extension.register(bud)
    } catch (e) {}

    expect(resolveSpy).toHaveBeenCalledWith(`resolve-url-loader`)
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
      `resolveUrl`,
      expect.objectContaining({
        loader: `resolveUrl`,
        options: expect.any(Function),
      }),
    )
  })
})
