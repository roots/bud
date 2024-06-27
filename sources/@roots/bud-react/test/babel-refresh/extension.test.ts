import {beforeEach, describe, expect, it, vi} from 'vitest'

import Extension from '../../src/babel-refresh'

describe(`@roots/bud-react/babel-refresh`, () => {
  let bud: any
  let extension: Extension
  beforeEach(async () => {
    bud = {
      babel: {
        setPlugin: vi.fn(),
      },
      module: {
        resolve: vi.fn(async (...args) => `/test/path/`),
      },
    }
    extension = new Extension(bud)
  })
  describe(`register()`, async () => {
    it(`should call logger.log`, async () => {
      const spy = vi.spyOn(extension.logger, `log`)
      await extension.register(bud)

      expect(spy).toHaveBeenCalledWith(
        `Registering react-refresh-babel transformer`,
      )
    })

    it(`should interface with bud.babel`, async () => {
      await extension.register(bud)

      expect(bud.babel.setPlugin).toHaveBeenCalledWith(
        `react-refresh/babel`,
        expect.arrayContaining([
          `/test/path/`,
          {
            skipEnvCheck: true,
          },
        ]),
      )
    })
  })
})
