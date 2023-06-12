import {join} from 'node:path'
import {beforeAll, describe, expect, it, vi} from 'vitest'

import Extension from '../src/invalidate-cache/index.js'
import {Bud} from '@roots/bud-framework'

describe(`@roots/bud-cache/invalidate-cache-extension`, () => {
  let bud: Bud = {
    after: vi.fn(() => false),
    cache: {
      cacheDirectory: `/foo/cache`,
    },
    context: {
      force: false,
    },
    fs: {
      exists: vi.fn(async () => true),
      remove: vi.fn(async () => true),
    },
  } as unknown as Bud

  let extension: Extension

  beforeAll(() => {
    extension = new Extension(bud)
    extension.register(bud)
  })

  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })

  it(`should be an extension`, async () => {
    expect(extension).toHaveProperty(
      `label`,
      `@roots/bud-cache/invalidate-cache`,
    )
  })

  it(`should have an error file accessor`, async () => {
    expect(extension.invalidationFile).toBe(
      join(bud.cache.cacheDirectory, `error.json`),
    )
  })

  it(`should check if error file exists`, async () => {
    expect(extension.app.fs.exists).toBe(bud.fs.exists)
    expect(extension.app.fs.exists).toHaveBeenCalled()
  })

  it(`should call remove when bud.fs.exists returns true`, async () => {
    expect(bud.fs.remove).toHaveBeenCalled()
  })

  it(`should call bud.after`, async () => {
    expect(bud.after).toHaveBeenCalled()
  })
})
