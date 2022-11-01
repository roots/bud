import {Bud, factory} from '@repo/test-kit/bud'
import {beforeAll, beforeEach, describe, expect, it} from 'vitest'

describe(`bud.persist`, function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  beforeEach(async () => {
    await bud.api.call(`persist`, false)
    expect(bud.cache.enabled).toBe(false)
  })

  it(`is a function`, () => {
    expect(bud.persist).toBeInstanceOf(Function)
  })

  it(`sets version`, async () => {
    await bud.api.call(`persist`, `filesystem`)
    const {version} = bud.cache.configuration as {version: string}
    expect(version).toBe(bud.cache.version)
  })

  it(`sets type`, async () => {
    expect(bud.cache.type).toBe(bud.cache.type)
  })

  it(`sets cache directory`, async () => {
    expect(bud.cache.cacheDirectory).toEqual(bud.cache.cacheDirectory)
  })

  it(`sets buildDependencies`, async () => {
    expect(bud.cache.buildDependencies.config.sort()).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/\.eslintrc\.js/),
        expect.stringMatching(/bud\.config\.mjs/),
        expect.stringMatching(/docker-compose\.yml/),
        expect.stringMatching(/package\.json/),
        expect.stringMatching(/tailwind\.config\.js/),
        expect.stringMatching(/tsconfig\.json/),
        expect.stringMatching(/webpack\.config\.mjs/),
      ]),
    )
  })

  it(`disables caching`, async () => {
    await bud.api.call(`persist`, false)
    expect(bud.cache.enabled).toBe(false)
  })

  it(`memory caching`, async () => {
    await bud.api.call(`persist`, `memory`)
    expect(bud.cache.type).toBe(`memory`)
  })
})
