import {Bud, factory} from '@repo/test-kit/bud'

describe('bud.persist', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('is a function', () => {
    expect(bud.persist).toBeInstanceOf(Function)
  })

  it('enables persistant caching', async () => {
    bud.persist()
    await bud.api.processQueue()

    expect(bud.hooks.filter('build.cache.version')).toBe(bud.cache.version)

    expect(bud.hooks.filter('build.cache.type')).toBe('filesystem')

    expect(bud.hooks.filter('build.cache.cacheDirectory')).toEqual(
      bud.path('storage', 'cache', 'webpack'),
    )

    expect(
      bud.hooks.filter('build.cache.buildDependencies'),
    ).toMatchSnapshot({
      bud: [
        expect.stringContaining('project/package.json'),
        expect.stringContaining('project/bud.config.js'),
      ],
    })

    expect(bud.hooks.filter('build.cache.managedPaths')).toEqual([
      bud.path('modules'),
    ])
  })

  it('disables caching', async () => {
    bud.persist(false)
    await bud.api.processQueue()

    expect(bud.hooks.filter('build.cache')).toBe(false)
  })

  it('memory caching', async () => {
    bud.persist('memory')
    await bud.api.processQueue()

    expect(bud.hooks.filter('build.cache').type).toBe('memory')
  })
})
