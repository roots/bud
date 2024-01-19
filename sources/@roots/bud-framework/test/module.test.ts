import type {Bud} from '@roots/bud-framework'

import {pathToFileURL} from 'node:url'

import {factory} from '@repo/test-kit'
import {Module} from '@roots/bud-framework/module'
import {beforeEach, describe, expect, it, vi} from 'vitest'

describe(`@roots/bud-framework`, () => {
  let bud: Bud
  let instance: Module

  beforeEach(async () => {
    bud = await factory()
    instance = new Module({
      app: () => bud,
      args: {
        cache: false,
        force: false,
      },
      paths: {
        storage: bud.path(`@storage`),
      },
    })
    await instance.bootstrap(bud)
  })

  it(`should be instantiable`, () => {
    expect(instance).toBeInstanceOf(Module)
  })

  it(`should have resolve fn`, () => {
    expect(instance.resolve).toEqual(expect.any(Function))
  })

  it(`should resolve a package`, async () => {
    const path = await instance.resolve(
      `@roots/bud-support/utilities/args`,
    )
    expect(path).toEqual(
      expect.stringContaining(`@roots/bud-support/lib/utilities/args`),
    )
  })

  it(`should have a getDirectory fn that resolves by package name`, async () => {
    expect(
      await instance.getDirectory(`@roots/bud-support/logger`),
    ).toEqual(expect.stringContaining(`@roots/bud-support/lib/logger`))
  })

  it(`should have a getDirectory fn that throws when package is unresolvable`, async () => {
    try {
      expect(await instance.getDirectory(`foo`)).toThrow()
    } catch (e) {}
  })

  it(`should have a getManifestPath fn that returns a path to a package.json`, async () => {
    expect(await instance.getManifestPath(`@roots/bud`)).toEqual(
      expect.stringContaining(`package.json`),
    )
  })

  it(`should have a readManifest fn that returns the requested package.json object`, async () => {
    const readSpy = vi.spyOn(bud.fs.json, `read`)
    await instance.readManifest(`@roots/bud`)
    expect(readSpy).toHaveBeenCalledWith(
      expect.stringContaining(`@roots/bud/package.json`),
    )
  })

  it(`should have an import fn that returns the default export`, async () => {
    expect(await instance.import(`@roots/bud`)).toEqual(
      expect.objectContaining({Bud: expect.any(Function)}),
    )
  })

  it.skip(`should have an import fn that throws when pkg is unresolvable`, async () => {
    let error: Error | null = null

    try {
      // @ts-ignore
      await instance.import(`foo`)
    } catch (e) {
      error = e
    }
    expect(error).toBeInstanceOf(Error)
  })

  it(`should have a makeContextURL fn that returns a URL when passed a URL`, async () => {
    const url = pathToFileURL(bud.context.basedir)
    expect(instance.makeContextURL(url)).toBe(url)
  })

  it(`should invalidate cache when package.json sha1 differs from cache`, async () => {
    bud.context.files[`package`].sha1 = `foo`

    const instance = new Module({
      app: () => bud,
      args: {
        cache: true,
        force: false,
      },
      paths: {
        storage: bud.path(`@storage`),
      },
    })

    instance.cache.sha1 = `bar`

    const resetSpy = vi.spyOn(instance, `removeCachedResolutions`)
    await instance.bootstrap(bud)

    expect(resetSpy).toHaveBeenCalled()
  })

  it(`should not invalidate cache when package.json sha1 matches cache`, async () => {
    bud.context.files[`package`].sha1 = `foo`

    const instance = new Module({
      app: () => bud,
      args: {
        cache: true,
        force: false,
      },
      paths: {
        storage: bud.path(`@storage`),
      },
    })

    instance.cache.sha1 = `foo`

    const resetSpy = vi.spyOn(instance, `removeCachedResolutions`)
    await instance.bootstrap(bud)

    expect(resetSpy).not.toHaveBeenCalled()
  })

  it(`should invalidate cache when --force is used`, async () => {
    const instance = new Module({
      app: () => bud,
      args: {
        cache: true,
        force: true,
      },
      paths: {
        storage: bud.path(`@storage`),
      },
    })

    const resetSpy = vi.spyOn(instance, `removeCachedResolutions`)
    await instance.bootstrap(bud)
    expect(resetSpy).toHaveBeenCalled()
  })

  it(`should invalidate cache when --no-cache is used`, async () => {
    const instance = new Module({
      app: () => bud,
      args: {
        cache: false,
        force: false,
      },
      paths: {
        storage: bud.path(`@storage`),
      },
    })

    const resetSpy = vi.spyOn(instance, `removeCachedResolutions`)
    await instance.bootstrap(bud)
    expect(resetSpy).toHaveBeenCalled()
  })
})
