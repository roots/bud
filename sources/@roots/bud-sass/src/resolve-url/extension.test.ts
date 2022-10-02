/* eslint-disable no-console */
import {beforeEach, describe, expect, it, jest} from '@jest/globals'

import ResolveUrlExtension from './index'

jest.unstable_mockModule(
  `@roots/bud`,
  async () => await import(`@repo/test-kit/mocks/bud`),
)

describe(`@roots/bud-sass`, () => {
  let bud

  beforeEach(async () => {
    jest.clearAllMocks()
    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
  })

  it(`should be instantiable`, () => {
    expect(new ResolveUrlExtension(bud)).toBeInstanceOf(
      ResolveUrlExtension,
    )
  })

  it(`should call resolve util when register is called`, async () => {
    const extension = new ResolveUrlExtension(bud)

    const resolveSpy = jest.spyOn(extension, `resolve`)

    try {
      await extension.register()
    } catch (e) {}

    expect(resolveSpy).toHaveBeenCalledWith(`resolve-url-loader`)
  })

  it(`should call setLoader when register is called`, async () => {
    const extension = new ResolveUrlExtension(bud)

    try {
      await extension.register()
    } catch (e) {
      console.error(e)
    }

    expect(extension.app.build.setLoader).toHaveBeenCalled()
  })

  it(`should call setItem when register is called`, async () => {
    const extension = new ResolveUrlExtension(bud)

    try {
      await extension.register()
    } catch (e) {
      console.error(e)
    }

    expect(extension.app.build.setItem).toHaveBeenCalledWith(
      `resolveUrl`,
      expect.objectContaining({
        loader: `resolveUrl`,
        options: expect.any(Function),
      }),
    )
  })
})
