import {Bud, factory} from '@repo/test-kit/bud'
import {beforeAll, describe, expect, it, vi} from 'vitest'
import type {WebpackPluginInstance} from 'webpack'

import Extensions from './index'

describe(`@roots/bud-extensions`, function () {
  describe(`service`, function () {
    let bud: Bud

    let mockWebpackPlugin: WebpackPluginInstance = {
      apply: vi.fn(),
    }

    let options = {
      test: `foo`,
    }

    let mockModule: any = {
      label: `mock_extension`,
      register: vi.fn(async () => null),
      boot: vi.fn(async () => null),
      options: options,
      make: vi.fn(async () => mockWebpackPlugin),
      when: vi.fn(async () => true),
    }

    beforeAll(async () => {
      bud = await factory()
    })

    it(`is constructable`, () => {
      const extensions: Extensions = new Extensions(
        // @ts-ignore
        bud,
      )
      expect(extensions).toBeInstanceOf(Extensions)
    })

    it(`add fn registers a module`, async () => {
      const extensions: Extensions = new Extensions(
        // @ts-ignore
        bud,
      )
      extensions.repository = {} as any

      await extensions.add(mockModule)

      expect(extensions.get(mockModule.label).options?.test).toEqual(
        mockModule.options.test,
      )
    })
  })

  describe(`in development`, () => {
    let bud: Bud
    let extensions

    beforeAll(async () => {
      bud = await factory({mode: `development`})
      expect(bud.mode).toBe(`development`)
      extensions = new Extensions(
        //@ts-ignore
        bud,
      )
      await extensions.booted()
    })

    it(`[development] bud.extensions.repository options matches snapshot`, () => {
      expect(Object.keys(extensions.repository).sort()).toMatchSnapshot()
    })
  })
})
