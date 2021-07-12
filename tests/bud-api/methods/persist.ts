import {Framework, setupBud, teardownBud} from '../../util'

describe('bud.persist', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud()
    return
  })

  afterAll(() => {
    teardownBud(bud)
    return
  })

  it('is a function', () => {
    expect(bud.persist).toBeInstanceOf(Function)
  })

  it('enables persistant caching', () => {
    bud.persist()

    expect(bud.hooks.filter('build/cache/version')).toBe(
      bud.cache.version(),
    )

    expect(bud.hooks.filter('build/cache/type')).toBe(
      'filesystem',
    )

    expect(
      bud.hooks.filter('build/cache/cacheDirectory'),
    ).toEqual(bud.cache.directory())

    expect(
      bud.hooks.filter('build/cache/buildDependencies').bud,
    ).toEqual(bud.cache.buildDependencies())

    expect(bud.hooks.filter('build/cache/managedPaths')).toEqual(
      [bud.path('modules')],
    )
  })

  it('disables persistant caching', () => {
    bud.persist(false)

    expect(bud.hooks.filter('build/cache/version')).toBe(
      undefined,
    )

    expect(bud.hooks.filter('build/cache/type')).toBe('memory')

    expect(
      bud.hooks.filter('build/cache/cacheDirectory'),
    ).toEqual(undefined)

    expect(
      bud.hooks.filter('build/cache/buildDependencies'),
    ).toBe(undefined)

    expect(bud.hooks.filter('build/cache/managedPaths')).toBe(
      undefined,
    )
  })
})
