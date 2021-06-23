import {Framework, setupBud, teardownBud} from '../../util'

const DEFAULT_OPTIONS = {
  cacheGroups: {
    chunks: 'all',
    vendors: {
      chunks: 'all',
      enforce: true,
      test: /[\\/]node_modules[\\/]/,
      reuseExistingChunk: true,
      priority: -10,
      name: function (
        module: any,
        _chunks: any,
        cacheGroupKey: any,
      ) {
        const moduleFileNameParts = module
          .identifier()
          .split('/')
          .reduceRight(item => item)
          .split('.')

        const file = moduleFileNameParts
          .slice(0, moduleFileNameParts.length - 1)
          .join('.')

        return `${cacheGroupKey}/${file}`
      },
    },
  },
}

describe('bud.splitChunks', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud()
    return
  })

  afterAll(() => {
    bud = teardownBud(bud)
    return
  })

  beforeEach(() => {
    bud.hooks.on('build/optimization/splitChunks', undefined)
  })

  it('is disabled by default', () => {
    expect(bud.build.config.optimization.splitChunks).toEqual(
      undefined,
    )
  })

  it('sets default options when called', () => {
    bud.splitChunks()

    expect(
      JSON.stringify(bud.build.config.optimization.splitChunks),
    ).toStrictEqual(JSON.stringify(DEFAULT_OPTIONS))

    expect(
      bud.hooks.filter('build/optimization/splitChunks')
        .cacheGroups.vendors.name,
    ).toBeInstanceOf(Function)
  })

  it('sets options when passed as parameters', () => {
    const param = {
      cacheGroups: {
        chunks: 'all',
      },
    }

    bud.splitChunks(param)

    expect(
      bud.hooks.filter('build/optimization/splitChunks'),
    ).toBe(param)
  })
})
