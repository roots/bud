import {beforeAll, describe, expect, it, jest} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'
import type {WebpackPluginInstance} from 'webpack'

import Extensions from './index'

describe(`@roots/bud-extensions`, function () {
  describe(`service`, function () {
    let bud: Bud

    let mockWebpackPlugin: WebpackPluginInstance = {
      apply: jest.fn(),
    }

    let options = {
      test: `foo`,
    }

    let mockModule: any = {
      label: `mock_extension`,
      register: jest.fn(async () => null),
      boot: jest.fn(async () => null),
      options: options,
      make: jest.fn(async () => mockWebpackPlugin),
      when: jest.fn(async () => true),
    }

    beforeAll(async () => {
      bud = await factory()
    })

    it(`is constructable`, () => {
      const extensions: Extensions = new Extensions(() => bud)
      expect(extensions).toBeInstanceOf(Extensions)
    })

    it(`add fn registers a module`, async () => {
      const extensions: Extensions = new Extensions(() => bud)
      extensions.repository = {} as any

      await extensions.add(mockModule)

      expect(extensions.get(mockModule.label)?.options?.test).toEqual(
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
      extensions = new Extensions(() => bud)
      await extensions.booted(bud)
    })

    it(`[development] bud.extensions.repository options matches snapshot`, () => {
      expect(Object.keys(extensions.repository).sort()).toMatchSnapshot()
    })
  })
})
