import {beforeEach, describe, expect, it, vi} from 'vitest'

import Extension from '../../src/swc-refresh'

describe(`@roots/bud-react/swc-refresh`, () => {
  let bud: any
  let extension: Extension
  beforeEach(async () => {
    bud = {
      module: {
        resolve: vi.fn(async (...args) => `/test/path/`),
      },
      swc: {
        setTransform: vi.fn(),
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
        `Registering swc react-refresh transformer`,
      )
    })

    it(`should call bud.swc.setTransform`, async () => {
      await extension.registerTransform(bud)

      expect(bud.swc.setTransform).toHaveBeenCalledWith(
        expect.any(Function),
      )
    })
  })
})
