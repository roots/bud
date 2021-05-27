import {Bud, config, services} from '@roots/bud'
import RemarkHTML from 'remark-html'

describe('bud.build.config', function () {
  beforeAll(() => {
    this.bud = new Bud(config).bootstrap(services).lifecycle()
    this.config = this.bud.build.config
    this.path = this.bud.path
  })

  it('has expected bail default', () => {
    expect(this.config.bail).toEqual(true)
  })

  it('has expected cache default', () => {
    expect(this.config.cache).toEqual({
      type: 'memory',
    })
  })

  it('has expected context default', () => {
    expect(this.config.context).toEqual(this.path('project'))
  })

  it('has expected devtool default', () => {
    expect(this.config.devtool).toEqual(false)
  })

  it('has expected devServer default', () => {
    expect(this.config.devServer).toEqual(undefined)
  })

  it('has expected entry default', () => {
    expect(this.config.entry).toEqual(undefined)
  })

  it('has expected experiments default', () => {
    expect(this.config.experiments).toEqual({
      lazyCompilation: false,
    })
  })

  it('has expected infrastructureLogging default', () => {
    expect(this.config.infrastructureLogging).toEqual({
      console: this.bud.logger.instance,
    })
  })

  it('has expected mode default', () => {
    expect(this.config.mode).toEqual('production')
  })

  it('has expected unsafeCache default', () => {
    expect(this.config.unsafeCache).toEqual(undefined)
  })

  it('has expected name default', () => {
    expect(this.config.name).toEqual('bud')
  })

  it('has expected node default', () => {
    expect(this.config.node).toEqual(false)
  })

  it('has expected optimization.minimize default', () => {
    expect(this.config.optimization.minimize).toEqual(true)
  })

  it('has expected optimization.emitOnErrors default', () => {
    expect(this.config.optimization.emitOnErrors).toEqual(false)
  })

  it('has expected optimization.runtimeChunk default', () => {
    expect(this.config.optimization.runtimeChunk).toEqual(
      undefined,
    )
  })

  it('has expected profile default', () => {
    expect(this.config.profile).toEqual(true)
  })

  it('has expected resolve.alias default', () => {
    expect(this.config.resolve.alias).toEqual({})
  })

  it('has expected resolve.extensions default', () => {
    expect(this.config.resolve.extensions).toEqual([
      '.wasm',
      '.mjs',
      '.js',
      '.css',
      '.json',
    ])
  })

  it('has expected resolve.modules default', () => {
    expect(this.config.resolve.modules).toEqual([
      'src',
      'node_modules',
    ])
  })

  it('has expected stats default', () => {
    expect(this.config.stats).toEqual({})
  })

  it('has expected target default', () => {
    expect(this.config.target).toEqual('web')
  })

  it('has expected watch default', () => {
    expect(this.config.watch).toEqual(false)
  })

  it('has expected watchOptions default', () => {
    expect(this.config.watchOptions).toEqual(undefined)
  })

  it('has expected number of plugins', () => {
    expect(this.config.plugins.length).toBe(4)
  })

  it('has valid plugins', () => {
    this.config.plugins.filter(plugin => {
      expect(plugin).toHaveProperty('apply')
    })
  })

  it('has expected module.rules default', () => {
    expect(this.config.module).toEqual({
      rules: [
        {
          oneOf: [
            {
              exclude: /(node_modules|bower_components)/,
              test: /\.css$/,
              use: [
                {
                  loader: this.path(
                    'project',
                    '/node_modules/mini-css-extract-plugin/dist/loader.js',
                  ),
                  options: {
                    publicPath: '.',
                  },
                },
                {
                  loader: this.path(
                    'project',
                    'node_modules/css-loader/dist/cjs.js',
                  ),
                  options: {
                    importLoaders: 1,
                    sourceMap: false,
                  },
                },
              ],
            },
            {
              exclude: /(node_modules|bower_components)/,
              test: /\.(js|jsx)$/,
              use: [],
            },
            {
              exclude: /(node_modules|bower_components)/,
              test: /\.(png|jpe?g|gif)$/,
              use: [
                {
                  loader: this.path(
                    'project',
                    'node_modules/file-loader/dist/cjs.js',
                  ),
                  options: {name: 'assets/[name].[ext]'},
                },
              ],
            },
            {
              exclude: /(node_modules|bower_components)/,
              test: /\.(ttf|otf|eot|woff2?|ico)$/,
              use: [
                {
                  loader: this.path(
                    'project',
                    'node_modules/resolve-url-loader/index.js',
                  ),
                  options: {
                    root: this.path('project', 'src'),
                    sourceMap: false,
                  },
                },
              ],
            },
            {
              exclude: /(node_modules|bower_components)/,
              test: /\.md$/,
              use: [
                {
                  loader: this.path(
                    'project',
                    'node_modules/html-loader/dist/cjs.js',
                  ),
                },
                {
                  loader: this.path(
                    'project',
                    'node_modules/remark-loader/dist/cjs.js',
                  ),
                  options: {
                    remarkOptions: {
                      plugins: [RemarkHTML],
                    },
                  },
                },
              ],
            },
            {
              exclude: /(node_modules|bower_components)/,
              test: /\.svg$/,
              type: 'asset/resource',
            },
            {
              test: /\.(html?)$/,
              use: [
                {
                  loader: this.path(
                    'project',
                    'node_modules/html-loader/dist/cjs.js',
                  ),
                },
              ],
            },
          ],
          parser: {requireEnsure: false},
        },
      ],
    })
  })
})

export {}
