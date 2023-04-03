import '../index.js'

import {Bud, factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import Configuration from './configuration.js'
import {File} from '../types/options/context.js'
import {BudError} from '@roots/bud-support/errors'

const testFileDescription: File = {
  name: `test.config.js`,
  local: false,
  bud: false,
  dynamic: true,
  path: `foo/test.config.js`,
  dir: false,
  file: true,
  extension: `js`,
  type: `base`,
  symlink: false,
  size: 0,
  sha1: `abcdefg`,
  mode: 0,
  module: undefined,
}

describe(`@roots/bud-framework/configuration`, function () {
  let configuration: Configuration
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
    configuration = new Configuration(bud as any)
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
    const dynamicSpy = vi.spyOn(configuration, `dynamicConfig`)
    const staticSpy = vi.spyOn(configuration, `staticConfig`)

    try {
      await configuration.run(testFileDescription)
    } catch (e) {
      expect(e).toBeInstanceOf(BudError)
    }

    expect(dynamicSpy).not.toHaveBeenCalled()
    expect(staticSpy).not.toHaveBeenCalled()
  })

  it(`calls dynamicConfig when config is a fn`, async () => {
    const logSpy = vi.spyOn(bud, `log`)
    const dynamicSpy = vi.spyOn(configuration, `dynamicConfig`)
    const staticSpy = vi.spyOn(configuration, `staticConfig`)
    const configFn = vi.fn()

    const testDynamicConfig = {
      ...testFileDescription,
      dynamic: true,
      module: async () => configFn,
    }
    await configuration.run(testDynamicConfig)

    expect(logSpy).toHaveBeenCalledWith(
      `processing as dynamic configuration:`,
      testDynamicConfig.name,
    )
    expect(dynamicSpy).toHaveBeenCalledWith(testDynamicConfig)
    expect(configFn).toHaveBeenCalledWith(bud)
    expect(staticSpy).not.toHaveBeenCalled()
  })

  it(`calls staticConfig when config is static`, async () => {
    const logSpy = vi.spyOn(bud, `log`)
    const dynamicSpy = vi.spyOn(configuration, `dynamicConfig`)
    const staticSpy = vi.spyOn(configuration, `staticConfig`)

    const testStaticConfig = {
      ...testFileDescription,
      dynamic: false,
      module: {
        foo: `bar`,
        info: [`foo`, `bar`],
      },
    }
    await configuration.run(testStaticConfig)

    expect(logSpy).toHaveBeenCalledWith(
      `processing as static configuration:`,
      testStaticConfig.name,
    )
    expect(dynamicSpy).not.toHaveBeenCalled()
    expect(staticSpy).toHaveBeenCalledWith(testStaticConfig)
  })
})
