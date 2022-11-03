import {factory} from '@repo/test-kit/bud'
import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {options} from '@roots/bud-framework/extension/decorators'
import {beforeAll, beforeEach, describe, expect, it} from 'vitest'

describe(`Extension`, () => {
  const resetExtensions = bud => {
    bud.extensions.repository = {}
  }

  describe(`options`, () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory()
    })

    beforeEach(async () => {
      resetExtensions(bud)
    })

    it(`adds options`, async () => {
      const mockOptions = {
        foo: `bar`,
      }

      class MockExtension extends Extension {
        public label = `mock-extension`
        public options = mockOptions
      }

      await bud.extensions.add(MockExtension)
      expect(bud.extensions.get(`mock-extension`).options).toStrictEqual(
        mockOptions,
      )
    })

    it(`adds options with function wrappers`, async () => {
      const mockOptions = {
        foo: `bar`,
        bar: () => bud.label,
      }

      class MockExtension extends Extension {
        public label = `mock-extension`
        public options = mockOptions
      }

      await bud.extensions.add(MockExtension)
      expect(bud.extensions.get(`mock-extension`).options).toStrictEqual({
        ...mockOptions,
        bar: `bud`,
      })
      expect(bud.extensions.get(`mock-extension`)._options).toStrictEqual(
        mockOptions,
      )
    })

    it(`adds options (decorated)`, async () => {
      const opts = {
        decorated: `bar`,
      }

      @options(opts)
      // @ts-ignore
      class MockDecoratedExtension extends Extension {
        public label = `mock-extension`
      }

      await bud.extensions.add(MockDecoratedExtension)
      const initializedOpts = bud.extensions.get(`mock-extension`).options
      expect(initializedOpts).toStrictEqual(opts)
    })
  })
})
