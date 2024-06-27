import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import Extension from '../../src/react-refresh'

describe(`@roots/bud-react/react-refresh`, () => {
  let bud: any
  let extension: Extension

  beforeEach(async () => {
    bud = {
      context: {
        manifest: {
          type: `module`,
        },
      },
      extensions: {
        add: vi.fn(async () => ({})),
        get: vi.fn(label => ({
          label,
        })),
      },
      hooks: {
        action: vi.fn(),
      },
      isDevelopment: true,
      module: {
        resolve: vi.fn(async (...args) => `/test/path/`),
      },
      server: {
        enabledMiddleware: {
          hot: {},
        },
      },
      swc: {
        enabled: true,
      },
    }

    extension = new Extension(bud)
  })

  describe(`compilerExtension`, () => {
    it(`should be undefined`, () => {
      expect(extension.compilerExtension).toBeUndefined()
    })
  })

  describe(`configAfter()`, async () => {
    it(`should add @roots/bud-react/swc-refresh`, async () => {
      await extension.configAfter(bud)
      expect(bud.extensions.add).toHaveBeenCalledWith(
        `@roots/bud-react/swc-refresh`,
      )
    })

    it(`should return early if bud.isProduction`, async () => {
      bud.isDevelopment = false
      await extension.configAfter(bud)
      expect(bud.extensions.add).not.toHaveBeenCalled()
    })

    it(`should return early if hot middleware is not enabled`, async () => {
      bud.server.enabledMiddleware = {}
      await extension.configAfter(bud)
      expect(bud.extensions.add).not.toHaveBeenCalled()
    })

    it(`should set compilerExtension`, async () => {
      await extension.configAfter(bud)
      expect(extension.compilerExtension).toEqual({
        label: `@roots/bud-react/swc-refresh`,
      })
    })

    it(`should set typescript-refresh if babel is disabled and typescript is enabled`, async () => {
      bud.swc.enabled = false
      bud.typescript = {babel: false, enabled: true}
      await extension.configAfter(bud)

      expect(bud.extensions.add).toHaveBeenCalledWith(
        `@roots/bud-react/typescript-refresh`,
      )
    })

    it(`should set babel-refresh if typescript is disabled and babel is enabled`, async () => {
      bud.swc.enabled = false
      bud.typescript = {babel: true, enabled: true}
      await extension.configAfter(bud)

      expect(bud.extensions.add).toHaveBeenCalledWith(
        `@roots/bud-react/babel-refresh`,
      )
    })

    it(`should set babel-refresh if babel is enabled`, async () => {
      bud.swc = {enabled: false}
      bud.babel = {enabled: true}
      await extension.configAfter(bud)

      expect(bud.extensions.add).toHaveBeenCalledWith(
        `@roots/bud-react/babel-refresh`,
      )
    })

    it(`should not add an extension if compilerExtension is set`, async () => {
      extension.setCompilerExtension({
        label: `custom-compiler-extension`,
      } as any)
      await extension.configAfter(bud)

      expect(bud.extensions.add).not.toHaveBeenCalled()
    })

    it(`should not add an extension if no requirements are met`, async () => {
      bud.swc.enabled = false
      await extension.configAfter(bud)

      expect(bud.extensions.add).not.toHaveBeenCalled()
    })
  })

  describe(`make()`, async () => {
    it(`should return a new instance of RefreshPlugin`, async () => {
      const plugin = await extension.make(bud, {
        compilerExtension: {} as any,
      })

      expect(plugin).toBeInstanceOf(ReactRefreshPlugin)
    })
  })

  describe(`configure()`, async () => {
    it(`should disable plugin when called with false`, async () => {
      const spy = vi.spyOn(extension, `enable`)
      extension.configure(false)
      expect(spy).toHaveBeenCalledWith(false)
    })

    it(`should call bud.hooks.action`, async () => {
      const spy = vi.spyOn(extension, `enable`)
      const obj = {compilerExtension: {} as any}
      extension.configure(obj)
      expect(spy).toHaveBeenCalledWith(true)
      expect(bud.hooks.action).toHaveBeenCalledWith(
        `config.after`,
        expect.any(Function),
      )
    })

    it(`should set options when called with obj`, async () => {
      const setOptionsSpy = vi.spyOn(extension, `setOptions`)
      bud.hooks.action = vi.fn(async (name, cb) => {
        return await cb(bud)
      })
      const options = {foo: `bar`} as any
      extension.configure(options)
      expect(setOptionsSpy).toHaveBeenCalledWith(options)
    })
  })
})
