import {Bud, factory} from '@repo/test-kit'
import Cache from '@roots/bud-cache/service'
import {Service} from '@roots/bud-framework/service'
import {beforeEach, describe, expect, it} from 'vitest'

describe(`@roots/bud-cache`, () => {
  let bud: Bud
  let cache: Cache

  beforeEach(async () => {
    bud = await factory({cache: true})
    cache = new Cache(() => bud)
  })

  it(`should be a Service`, async () => {
    expect(cache).toBeInstanceOf(Service)
  })

  it(`should have a boot method`, async () => {
    expect(cache.boot).toBeDefined()
    expect(cache.boot).toBeInstanceOf(Function)
  })

  it(`should have a register method`, async () => {
    expect(cache.register).toBeDefined()
    expect(cache.register).toBeInstanceOf(Function)
  })


  it(`should have a buildDependencies accessor interface`, async () => {
    expect(cache.buildDependencies).toBeDefined()
    expect(cache.buildDependencies).toBeInstanceOf(Object)
  })

  it(`should have a cacheDirectory accessor interface`, async () => {
    await cache.register?.(bud)
    await cache.boot?.(bud)
    expect(cache.cacheDirectory).toBeDefined()
    expect(cache.cacheDirectory).toMatch(/@tests\/project\/cache$/)
  })

  it(`should have a configuration getter`, async () => {
    await cache.register?.(bud)
    await cache.boot?.(bud)
    expect(cache.configuration).toBeDefined()
    expect(cache.configuration).toMatchInlineSnapshot(`
      {
        "allowCollectingMemory": true,
        "buildDependencies": {
          "bud": [
            "${bud.path()}/package.json",
            "${bud.path()}/config/bud.config.js",
          ],
          "tailwind": [
            "${bud.path()}/config/tailwind.config.js",
          ],
        },
        "cacheDirectory": "${bud.context.paths?.[`os-cache`]}/@tests/project/cache",
        "compression": "brotli",
        "hashAlgorithm": "xxhash64",
        "idleTimeout": 100,
        "idleTimeoutForInitialStore": 0,
        "managedPaths": [
          "${bud.context.paths?.[`os-cache`]}/@tests/project/cache",
          "${bud.path()}/node_modules",
        ],
        "name": "production",
        "profile": false,
        "store": "pack",
        "type": "filesystem",
      }
    `)
  })
})
