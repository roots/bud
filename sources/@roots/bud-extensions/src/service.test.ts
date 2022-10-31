import {describe, expect, it, jest} from '@jest/globals'
import {factory} from '@repo/test-kit/bud'
import mockBud from '@repo/test-kit/mocks/bud'
import type {WebpackPluginInstance} from 'webpack'

import Extensions from './index'

jest.unstable_mockModule(
  `@roots/bud`,
  async () => await import(`@repo/test-kit/mocks/bud`),
)

describe(`@roots/bud-extensions`, () => {
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

  it(`is constructable`, async () => {
    const bud = await factory()
    const extensions: Extensions = new Extensions(() => bud)
    expect(extensions).toBeInstanceOf(Extensions)
  })

  it(`add fn registers a module`, async () => {
    const bud = await factory()
    const extensions: Extensions = new Extensions(() => bud)
    extensions.repository = {} as any

    await extensions.add(mockModule)

    expect(extensions.get(mockModule.label)?.options?.test).toEqual(
      mockModule.options.test,
    )
  })

  it(`should assign a uuid as key for extensions without names`, async () => {
    const bud = await factory()
    const extensions: Extensions = new Extensions(() => bud)
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
    const bud = await factory()
    const extensions: Extensions = new Extensions(() => bud)
    extensions.repository = {} as any

    await extensions.add(
      // @ts-ignore
      {
        register: () => {
          // noop
        },
      },
    )

    expect(
      Object.values(extensions.repository).sort().pop().label,
    ).toMatch(
      /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/,
    )
  })

  it(`[development] bud.extensions.repository options matches snapshot`, async () => {
    const bud: any = await import(`@roots/bud`).then(
      async pkg => new (pkg as any).default(),
    )
    bud.mode = `development`

    const extensions = new Extensions(() => bud)
    await extensions.register(bud)
    await extensions.booted(bud)
    expect(Object.keys(extensions.repository).sort()).toMatchSnapshot()
  })
})
