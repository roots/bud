import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import type {WebpackPluginInstance} from 'webpack'

import Extensions from './index.js'

describe(`@roots/bud-extensions`, () => {
  let bud
  let extensions

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

  beforeEach(async () => {
    bud = await factory()
    extensions = new Extensions(() => bud)
  })

  it(`is constructable`, async () => {
    expect(extensions).toBeInstanceOf(Extensions)
  })

  it(`add fn registers a module`, async () => {
    extensions.repository = {} as any

    await extensions.add(mockModule)

    expect(extensions.get(mockModule.label)?.options?.test).toEqual(
      mockModule.options.test,
    )
  })

  it(`should assign a uuid as key for extensions without names`, async () => {
    extensions.repository = {} as any

    await extensions.add(
      // @ts-ignore
      {
        register: () => {
          // noop
        },
      },
    )

    expect(Object.keys(extensions.repository).sort().pop()).toMatch(
      /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/,
    )
  })

  it(`should assign a uuid to label for extensions without name`, async () => {
    extensions.repository = {} as Extensions[`repository`]

    await extensions.add(
      // @ts-ignore
      {
        register: () => {
          // noop
        },
      },
    )

    expect(
      // @ts-ignore
      Object.values(extensions.repository).sort().pop().label,
    ).toMatch(
      /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/,
    )
  })

  it(`[development] bud.extensions.repository options matches snapshot`, async () => {
    bud = await factory({mode: `development`})

    const extensions = new Extensions(() => bud)
    await extensions.register(bud)
    await extensions.booted(bud)
    expect(Object.keys(extensions.repository).sort()).toMatchSnapshot()
  })
})
