import type {Bud} from '@roots/bud-framework'

import {beforeEach, describe, expect, it, vi} from 'vitest'

import DefaultExport from '../src'
import Extension from '../src/extension'

describe(`@roots/bud-react`, async () => {
  let bud: any
  let extension: Extension

  beforeEach(async () => {
    bud = {
      extensions: {
        add: vi.fn(),
        get: vi.fn(),
      },
      module: {
        resolve: vi.fn(async (...args) => `/test/path/`),
      },
      provide: vi.fn(),
    } as unknown as Bud

    extension = new Extension(bud)
  })

  it(`should re-export @roots/bud-react/extension`, async () => {
    const module = await import(`../src`)
    expect(module.default).toBe(DefaultExport)
  })

  describe(`boot()`, async () => {
    it(`should be a function`, () => {
      expect(extension.boot).toBeInstanceOf(Function)
    })

    it(`should resolve react`, async () => {
      const spy = vi.spyOn(extension, `resolve`)
      await extension.boot(bud)

      expect(spy).toHaveBeenCalledWith(
        `react`,
        expect.stringMatching(/@roots\/bud-react\/src\/extension\/index/),
      )
    })

    it(`should call bud.provide`, async () => {
      await extension.boot(bud)
      expect(bud.provide).toHaveBeenCalledWith(
        `/test/path/`,
        expect.arrayContaining([`React`]),
      )
    })

    it(`should interface with swc if available`, async () => {
      bud.swc = {
        jsc: {},
        setJsc: vi.fn(),
        setTransform: vi.fn(),
      }

      await extension.boot(bud)

      expect(bud.swc.setJsc).toHaveBeenCalledWith(
        expect.objectContaining({
          transform: {
            react: {
              runtime: `automatic`,
            },
          },
        }),
      )

      expect(bud.swc.setTransform).toHaveBeenCalledWith(
        expect.any(Function),
      )
    })

    it(`should interface with babel if available`, async () => {
      bud.babel = {
        setPreset: vi.fn(),
      }

      await extension.boot(bud)

      expect(bud.babel.setPreset).toHaveBeenCalledWith(
        `@babel/preset-react`,
        `/test/path/`,
      )
    })
  })

  describe(`get refresh()`, async () => {
    it(`should call bud.extensions.get when referenced`, () => {
      extension.refresh

      expect(bud.extensions.get).toHaveBeenCalledWith(
        `@roots/bud-react/react-refresh`,
      )
    })
  })
})
