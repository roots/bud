import {config, factory, Framework} from '@roots/bud'

const DEFAULT_OPTIONS = {
  cacheGroups: {
    vendor: {
      chunks: 'all',
      test: /[\\/]node_modules[\\/]/,
      reuseExistingChunk: true,
      priority: -10,
      filename: `vendor/[name].js`,
    },
  },
}

describe('bud.splitChunks', function () {
  let bud: Framework

  beforeAll(() => {
    bud = factory({config: {...config, ci: true}})
  })

  afterAll(done => {
    bud.close(done)
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
      bud.build.rebuild().optimization.splitChunks,
    ).toMatchSnapshot(DEFAULT_OPTIONS)

    expect(
      bud.hooks.filter('build/optimization/splitChunks'),
    ).toMatchSnapshot(DEFAULT_OPTIONS)
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
