import {beforeEach, describe, expect, it, jest} from '@jest/globals'
import {join} from 'path'
import {pathToFileURL} from 'url'

import {Module} from './module'

jest.unstable_mockModule(
  `@roots/bud`,
  async () => await import(`@repo/test-kit/mocks/bud`),
)

describe(`@roots/bud-framework`, () => {
  let bud
  let budModule

  beforeEach(async () => {
    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
    bud.root = {
      context: bud.context,
      path: jest.fn((...args) => join(bud.context.basedir, ...args)),
      relPath: jest.fn((...args) => join(bud.context.basedir, ...args)),
    }

    budModule = new Module(bud)

    bud.info = jest.fn()
    bud.success = jest.fn()
    bud.log = jest.fn()
    bud.fatal = jest.fn()
    bud.error = jest.fn()

    budModule.logger = {
      info: bud.info,
      success: bud.success,
      log: bud.log,
      fatal: bud.fatal,
      error: bud.error,
    }
  })

  it(`should be instantiable`, () => {
    expect(budModule).toBeInstanceOf(Module)
  })

  it(`should have a require fn`, () => {
    expect(budModule.require).toEqual(expect.any(Function))
  })

  it(`should have resolve fn`, () => {
    expect(budModule.resolve).toEqual(expect.any(Function))
  })

  it(`should resolve a package`, async () => {
    const path = await budModule.resolve(`@roots/bud-support`)
    expect(path).toEqual(expect.stringContaining(`@roots/bud-support`))
  })

  it(`should have a getDirectory fn that resolves by package name`, async () => {
    expect(await budModule.getDirectory(`@roots/bud-support`)).toEqual(
      expect.stringContaining(`@roots/bud-support`),
    )
  })

  it(`should have a getDirectory fn that throws when package is unresolvable`, async () => {
    try {
      expect(await budModule.getDirectory(`foo`)).toThrow()
    } catch (e) {}
  })

  it(`should have a getManifestPath fn that returns a path to a package.json`, async () => {
    expect(await budModule.getManifestPath(`@roots/bud`)).toEqual(
      expect.stringContaining(`package.json`),
    )
  })

  it(`should have a readManifest fn that returns the requested package.json object`, async () => {
    await budModule.readManifest(`@roots/bud`)
    expect(bud.fs.json.read).toHaveBeenCalledWith(
      expect.stringContaining(`@roots/bud/package.json`),
    )
  })

  it(`should have an import fn that returns the default export`, async () => {
    expect(await budModule.import(`@roots/bud`)).toEqual(
      expect.any(Function),
    )
  })

  it(`should have an import fn that throws when pkg is unresolvable`, async () => {
    try {
      expect(await budModule.import(`foo`)).toThrow()
    } catch (e) {}
  })

  it(`should have an tryImport fn that returns the default export`, async () => {
    expect(await budModule.tryImport(`@roots/bud`)).toEqual(
      expect.any(Function),
    )
    expect(budModule.logger.success).toHaveBeenCalled()
  })

  it(`should have an tryImport fn that throws when pkg is unresolvable`, async () => {
    try {
      expect(await budModule.tryImport(`foo`)).not.toThrow()
    } catch (e) {}
  })

  it(`should have a makeContextURL fn that returns a URL when passed a URL`, async () => {
    const url = pathToFileURL(bud.context.basedir)
    expect(budModule.makeContextURL(url)).toBe(url)
  })
})
