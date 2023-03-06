import '../index.js'

import {Bud, factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import Configuration from './configuration.js'
import {File} from '../types/options/context.js'

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
  md5: `abcdefg`,
  mode: 0,
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

  it(`bails early when there is no module`, async () => {
    const dynamicSpy = vi.spyOn(configuration, `dynamicConfig`)
    const staticSpy = vi.spyOn(configuration, `staticConfig`)

    await configuration.run(testFileDescription)

    expect(dynamicSpy).not.toHaveBeenCalled()
    expect(staticSpy).not.toHaveBeenCalled()
  })

  it(`calls dynamicConfig when config is dynamic`, async () => {
    const logSpy = vi.spyOn(bud, `log`)
    const dynamicSpy = vi.spyOn(configuration, `dynamicConfig`)
    const staticSpy = vi.spyOn(configuration, `staticConfig`)

    const testDynamicConfig = {
      ...testFileDescription,
      dynamic: true,
      module: {
        default: vi.fn(),
      },
    }
    await configuration.run(testDynamicConfig)

    expect(logSpy).toHaveBeenCalledWith(
      `processing as dynamic configuration:`,
      testDynamicConfig.name,
    )
    expect(dynamicSpy).toHaveBeenCalledWith(testDynamicConfig)
    expect(testDynamicConfig.module.default).toHaveBeenCalledWith(bud)
    expect(staticSpy).not.toHaveBeenCalled()
  })

  it(`calls dynamicConfig when config is an object (not default export)`, async () => {
    const logSpy = vi.spyOn(bud, `log`)
    const dynamicSpy = vi.spyOn(configuration, `dynamicConfig`)
    const staticSpy = vi.spyOn(configuration, `staticConfig`)

    const testDynamicConfig = {
      ...testFileDescription,
      dynamic: true,
      module: vi.fn(),
    }
    await configuration.run(testDynamicConfig)

    expect(logSpy).toHaveBeenCalledWith(
      `processing as dynamic configuration:`,
      testDynamicConfig.name,
    )
    expect(dynamicSpy).toHaveBeenCalledWith(testDynamicConfig)
    expect(testDynamicConfig.module).toHaveBeenCalledWith(bud)
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
