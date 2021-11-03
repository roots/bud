import {config, factory, Framework} from '@roots/bud'

describe('bud.persist', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({
      config: {
        ...config,
        ci: true,
        log: false,
      },
    })
  })

  afterAll(done => {
    bud.close(done)
  })

  it('is a function', () => {
    expect(bud.persist).toBeInstanceOf(Function)
  })

  it('enables persistant caching', () => {
    bud.persist()

    expect(bud.hooks.filter('build/cache/version')).toBe(
      bud.cache.version,
    )

    expect(bud.hooks.filter('build/cache/type')).toBe(
      'filesystem',
    )

    expect(
      bud.hooks.filter('build/cache/cacheDirectory'),
    ).toEqual(bud.project.get('cache.directory'))

    expect(
      bud.hooks.filter('build/cache/buildDependencies').bud,
    ).toEqual(bud.project.get('dependencies'))

    expect(bud.hooks.filter('build/cache/managedPaths')).toEqual(
      [bud.path('modules')],
    )
  })

  it('disables caching', () => {
    bud.persist(false)

    expect(bud.hooks.filter('build/cache')).toBe(false)
  })

  it('memory caching', () => {
    bud.persist('memory')

    expect(bud.hooks.filter('build/cache').type).toBe('memory')
  })
})
