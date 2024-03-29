import type {Bud, Modules} from '@roots/bud-framework'
import type {ApplyPlugin} from '@roots/bud-framework/extension'

import {factory} from '@repo/test-kit'
import Extensions from '@roots/bud-extensions/service'
import {beforeEach, describe, expect, it, vi} from 'vitest'

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
      boot: vi.fn(async () => null),
      label: `mock_extension`,
      make: vi.fn(async () => mockWebpackPlugin),
      options: options,
      register: vi.fn(async () => null),
      when: vi.fn(async () => true),
    }

    await extensions.add(mockModule)

    const instance = extensions.get(
      `mock_extension` as `${keyof Modules & string}`,
    )
    if (!instance) throw new Error(`Extension not found`)
    if (!(`label` in instance)) throw new Error(`Label not found`)

    expect(instance.label).toBe(`mock_extension`)
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
      Object.values(extensions.repository).sort()?.pop()?.constructor.name,
    ).toBe(`PaletteWebpackPlugin`)
  })

  it(`should accept a plugin definition`, async () => {
    extensions.repository = {} as any

    const plugin = await import(`palette-webpack-plugin`)
    await extensions.add(plugin.default)

    expect(
      Object.values(extensions.repository).sort()?.pop()?.constructor.name,
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

  it(`should match snapshot in production`, async () => {
    const extensions = new Extensions(() => bud)
    if (!extensions) throw new Error(`Extensions not found`)

    if (!extensions.configBefore)
      throw new Error(`Extensions.configBefore not found`)
    await extensions.configBefore(bud)

    expect(Object.keys(extensions.repository).sort()).toMatchSnapshot()
    expect(getEnabledExtensions(extensions.repository)).toMatchSnapshot()
    expect(
      (await extensions.make()).map(i => i.constructor.name).sort(),
    ).toMatchSnapshot()
  })

  it(`should match snapshot in development`, async () => {
    bud = await factory({mode: `development`})

    const extensions = new Extensions(() => bud)
    if (!extensions) throw new Error(`Extensions not found`)

    if (!extensions.configBefore)
      throw new Error(`Extensions.configBefore not found`)
    await extensions.configBefore(bud)

    expect(Object.keys(extensions.repository).sort()).toMatchSnapshot()
    expect(getEnabledExtensions(extensions.repository)).toMatchSnapshot()
    expect(
      (await extensions.make()).map(i => i.constructor.name).sort(),
    ).toMatchSnapshot()
  })
})

const getEnabledExtensions = (repository: Extensions[`repository`]) =>
  Object.values(repository)
    .filter(i =>
      `isEnabled` in i && typeof i.isEnabled === `function`
        ? i.isEnabled()
        : true,
    )
    .map(i => (`label` in i ? i.label : undefined))
    .filter(Boolean)
    .sort()
