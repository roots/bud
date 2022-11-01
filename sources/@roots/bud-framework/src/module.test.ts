import {factory} from '@repo/test-kit/bud'
import {pathToFileURL} from 'url'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {Module} from './module'

describe(`@roots/bud-framework`, () => {
  let bud
  let budModule

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
    budModule = new Module(bud)
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
    const readSpy = vi.spyOn(bud.fs.json, `read`)
    await budModule.readManifest(`@roots/bud`)
    expect(readSpy).toHaveBeenCalledWith(
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
    const successSpy = vi.spyOn(budModule.logger, `success`)

    expect(await budModule.tryImport(`@roots/bud`)).toEqual(
      expect.any(Function),
    )
    expect(successSpy).toHaveBeenCalled()
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
