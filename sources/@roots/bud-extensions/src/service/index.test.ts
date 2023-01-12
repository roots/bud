import {factory} from '@repo/test-kit/bud'
import type {Bud} from '@roots/bud-framework/bud'
import type {Modules} from '@roots/bud-framework'
import type {ApplyPlugin} from '@roots/bud-framework/extension'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import Extensions from './index.js'

describe(`@roots/bud-extensions`, () => {
  let bud: Bud
  let extensions: Extensions

  beforeEach(async () => {
    bud = await factory()
    extensions = new Extensions(() => bud)
  })

  it(`is constructable`, async () => {
    expect(extensions).toBeInstanceOf(Extensions)
  })

  it(`add fn registers a module`, async () => {
    extensions.repository = {} as any

    const options = {test: `foo`}

    const mockWebpackPlugin: ApplyPlugin = {apply: vi.fn()}

    const mockModule: any = {
      label: `mock_extension`,
      register: vi.fn(async () => null),
      boot: vi.fn(async () => null),
      options: options,
      make: vi.fn(async () => mockWebpackPlugin),
      when: vi.fn(async () => true),
    }

    await extensions.add(mockModule)

    const instance = extensions.get(`mock_extension` as keyof Modules)
    if (!instance) throw new Error(`mock extension not returned`)

    expect(instance.label).toBe(`mock_extension`)

    expect(extensions.get(mockModule.label)?.options?.test).toEqual(
      mockModule.options.test,
    )
  })

  it(`should assign a uuid as key for extensions without names`, async () => {
    extensions.repository = {} as any

    const mockExtension = {
      register: async () => {
        /*noop*/
      },
    }

    await extensions.add(mockExtension)

    expect(Object.keys(extensions.repository).sort().pop()).toMatch(
      /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/,
    )
  })

  it(`should accept a plugin signifier`, async () => {
    extensions.repository = {} as any

    // @ts-ignore
    await extensions.add(`palette-webpack-plugin`)

    expect(
      Object.values(extensions.repository).sort().pop().constructor.name,
    ).toBe(`PaletteWebpackPlugin`)
  })

  it(`should accept a plugin definition`, async () => {
    extensions.repository = {} as any

    const plugin = await import(`palette-webpack-plugin`)
    await extensions.add(plugin.default)

    expect(
      Object.values(extensions.repository).sort().pop().constructor.name,
    ).toBe(`PaletteWebpackPlugin`)
  })

  it(`should accept a plugin instance`, async () => {
    extensions.repository = {} as any

    const plugin = await import(`palette-webpack-plugin`)
    // @ts-ignore
    const instance = new plugin.default()
    await extensions.add(instance)

    expect(Object.values(extensions.repository).sort().pop()).toBe(
      instance,
    )
  })

  it(`should assign a uuid to label for extensions without name`, async () => {
    extensions.repository = {} as Extensions[`repository`]

    await extensions.add(
      // @ts-ignore
      {
        register: async () => {
          // noop
        },
      },
    )

    expect(
      // @ts-ignore
      Object.keys(extensions.repository).sort().pop(),
    ).toMatch(
      /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/,
    )
  })

  it(`bud.extensions.repository options should match snapshot in development`, async () => {
    bud = await factory({mode: `development`})

    const extensions = new Extensions(() => bud)
    await extensions.register(bud)
    await extensions.booted(bud)
    expect(Object.keys(extensions.repository).sort()).toMatchSnapshot()
  })
})
