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
    expect(cache.configuration).toBeInstanceOf(Object)

    // @ts-ignore
    expect(cache.configuration?.allowCollectingMemory).toEqual(true)
    // @ts-ignore
    expect(cache.configuration?.buildDependencies?.bud).toEqual(
      expect.arrayContaining([
        bud.path(`package.json`),
        bud.path(`config/bud.config.js`),
        bud.path(`tsconfig.json`),
      ]),
    )
    // @ts-ignore
    expect(cache.configuration?.buildDependencies?.tailwind).toEqual(
      expect.arrayContaining([bud.path(`config/tailwind.config.js`)]),
    )
    // @ts-ignore
    expect(cache.configuration?.cacheDirectory).toMatch(
      /@tests\/project\/cache$/,
    )
    // @ts-ignore
    expect(cache.configuration?.compression).toEqual(`brotli`)
    // @ts-ignore
    expect(cache.configuration?.hashAlgorithm).toEqual(`xxhash64`)
    // @ts-ignore
    expect(cache.configuration?.idleTimeout).toEqual(100)
    // @ts-ignore
    expect(cache.configuration?.idleTimeoutForInitialStore).toEqual(0)
    // @ts-ignore
    expect(cache.configuration?.managedPaths).toEqual(
      expect.arrayContaining([
        bud.context.paths?.[`os-cache`] + `/@tests/project/cache`,
        bud.path(`@modules`),
      ]),
    )
    // @ts-ignore
    expect(cache.configuration?.name).toEqual(`production`)
    // @ts-ignore
    expect(cache.configuration?.profile).toEqual(false)
    // @ts-ignore
    expect(cache.configuration?.store).toEqual(`pack`)
    // @ts-ignore
    expect(cache.configuration?.type).toEqual(`filesystem`)
  })
})
