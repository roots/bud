import {beforeEach, describe, expect, it, vi} from 'vitest'

import Extension from '../../src/typescript-refresh'

describe(`@roots/bud-react/typescript-refresh`, () => {
  let bud: any
  let extension: Extension
  beforeEach(async () => {
    bud = {
      module: {
        import: vi.fn(async () => ({})),
        resolve: vi.fn(async (...args) => `/test/path/`),
      },
      typescript: {
        setGetCustomTransformers: vi.fn(),
      },
    }
    extension = new Extension(bud)
  })

  describe(`register()`, async () => {
    it(`should call registerTransform`, async () => {
      const spy = vi.spyOn(extension, `registerTransform`)
      await extension.register(bud)
      expect(spy).toHaveBeenCalledWith(bud)
    })
  })

  describe(`setTransform()`, async () => {
    it(`should call logger.log`, async () => {
      const spy = vi.spyOn(extension.logger, `log`)
      await extension.registerTransform(bud)

      expect(spy).toHaveBeenCalledWith(
        `Registering react-refresh-typescript transformer`,
      )
    })

    it(`should call bud.typescript.setGetCustomTransformers`, async () => {
      await extension.registerTransform(bud)

      expect(bud.typescript.setGetCustomTransformers).toHaveBeenCalledWith(
        expect.any(Function),
      )
    })
  })
})
