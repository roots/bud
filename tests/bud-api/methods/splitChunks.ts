import {Framework, setupBud, teardownBud} from '../../util'

const DEFAULT_OPTIONS = {
  cacheGroups: {
    defaultVendors: {
      chunks: 'all',
      test: /[\\/]node_modules[\\/]/,
      reuseExistingChunk: true,
      priority: -10,
      filename: `vendor/[name].bundle.js`,
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
        .cacheGroups.defaultVendors.filename,
    ).toBe(DEFAULT_OPTIONS.cacheGroups.defaultVendors.filename)
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
