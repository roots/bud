import {parse} from 'node:path'

import {Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import Configuration from '../../src/configuration/configuration.js'
import {File} from '@roots/bud-framework/context'
import {BudError} from '@roots/bud-support/errors'

const testFileDescription: File = {
  name: `test.config.js`,
  local: false,
  bud: false,
  path: `foo/test.config.js`,
  target: `base`,
  type: `module`,
  parsed: parse(`foo/test.config.js`),
  size: 0,
  sha1: `abcdefg`,
  mode: 0,
  // @ts-ignore intentionally invalid
  module: undefined,
}

describe(`@roots/bud-framework/configuration`, function () {
  let configuration: Configuration
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
    configuration = new Configuration(bud)
  })

  it(`is constructable`, () => {
    expect(configuration).toBeInstanceOf(Configuration)
  })

  it(`has a run method`, async () => {
    expect(configuration.run).toBeInstanceOf(Function)
  })

  it(`has a run method`, async () => {
    expect(configuration.bud).toBe(bud)
  })

  it(`throws when there is no module`, async () => {
    let error
    await configuration
      .run(testFileDescription)
      .catch(e => {
        error = e
      })
      .finally(() => {
        expect(error).toBeInstanceOf(BudError)
      })
  })

  it(`calls dynamicConfig when config is a fn`, async () => {
    const dynamicSpy = vi.spyOn(configuration, `dynamicConfig`)
    const configFn = vi.fn(async bud => bud)

    const testDynamicConfig = {
      ...testFileDescription,
      dynamic: true,
      module: async () => configFn,
    }
    await configuration.run(testDynamicConfig)

    expect(dynamicSpy).toHaveBeenCalledWith(configFn)
    expect(configFn).toHaveBeenCalledWith(bud)
  })

  it(`calls staticConfig when config is static`, async () => {
    const staticSpy = vi.spyOn(configuration, `staticConfig`)

    const testStaticConfig = {
      ...testFileDescription,
      dynamic: false,
      module: async () => ({
        foo: `bar`,
        info: [`foo`, `bar`],
      }),
    }
    await configuration.run(testStaticConfig)

    expect(staticSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        foo: `bar`,
        info: [`foo`, `bar`],
      }),
    )
  })
})
