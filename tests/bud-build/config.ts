import {Bud, config, services} from '@roots/bud'

describe('bud.build.config', function () {
  beforeAll(() => {
    this.bud = new Bud(config).bootstrap(services).lifecycle()
  })

  it('has expected bail default', () => {
    expect(this.bud.build.config.bail).toEqual(true)
  })

  it('has expected cache default', () => {
    expect(this.bud.build.config.cache).toEqual({
      type: 'memory',
    })
  })

  it('has expected context default', () => {
    expect(this.bud.build.config.context).toEqual(
      this.bud.path('project'),
    )
  })

  it('has expected devtool default', () => {
    expect(this.bud.build.config.devtool).toEqual(false)
  })

  it('has expected devServer default', () => {
    expect(this.bud.build.config.devServer).toEqual(undefined)
  })

  it('has expected entry default', () => {
    expect(this.bud.build.config.entry).toEqual(undefined)
  })

  it('has expected experiments default', () => {
    expect(this.bud.build.config.experiments).toEqual({
      lazyCompilation: false,
    })
  })

  it('has expected infrastructureLogging default', () => {
    expect(this.bud.build.config.infrastructureLogging).toEqual({
      console: this.bud.logger.instance,
    })
  })

  it('has expected mode default', () => {
    expect(this.bud.build.config.mode).toEqual('production')
  })

  it('has expected unsafeCache default', () => {
    expect(this.bud.build.config.unsafeCache).toEqual(undefined)
  })

  it('has expected name default', () => {
    expect(this.bud.build.config.name).toEqual('bud')
  })

  it('has expected node default', () => {
    expect(this.bud.build.config.node).toEqual(false)
  })

  it('has expected optimization.minimize default', () => {
    expect(this.bud.build.config.optimization.minimize).toEqual(
      true,
    )
  })

  it('has expected optimization.emitOnErrors default', () => {
    expect(
      this.bud.build.config.optimization.emitOnErrors,
    ).toEqual(false)
  })

  it('has expected optimization.runtimeChunk default', () => {
    expect(
      this.bud.build.config.optimization.runtimeChunk,
    ).toEqual(undefined)
  })

  it('has expected profile default', () => {
    expect(this.bud.build.config.profile).toEqual(true)
  })

  it('has expected resolve.alias default', () => {
    expect(this.bud.build.config.resolve.alias).toEqual({})
  })

  it('has expected resolve.extensions default', () => {
    expect(this.bud.build.config.resolve.extensions).toEqual([
      '.wasm',
      '.mjs',
      '.js',
      '.css',
      '.json',
    ])
  })

  it('has expected resolve.modules default', () => {
    expect(this.bud.build.config.resolve.modules).toEqual([
      'src',
      'node_modules',
    ])
  })

  it('has expected stats default', () => {
    expect(this.bud.build.config.stats).toEqual({})
  })

  it('has expected target default', () => {
    expect(this.bud.build.config.target).toEqual('web')
  })

  it('has expected watch default', () => {
    expect(this.bud.build.config.watch).toEqual(false)
  })

  it('has expected watchOptions default', () => {
    expect(this.bud.build.config.watchOptions).toEqual(undefined)
  })

  it('has expected module default', () => {
    expect(this.bud.build.config.module).toEqual({
      rules: [
        {
          oneOf: [
            {
              exclude: /(node_modules|bower_components)/,
              test: /\.css$/,
              use: [
                {
                  loader: this.bud.path(
                    'project',
                    '/node_modules/mini-css-extract-plugin/dist/loader.js',
                  ),
                  options: {
                    publicPath: '.',
                  },
                },
                {
                  loader: this.bud.path(
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
              use: [
                {
                  loader: this.bud.path(
                    'project',
                    'node_modules/raw-loader/dist/cjs.js',
                  ),
                },
              ],
            },
            {
              exclude: /(node_modules|bower_components)/,
              test: /\.(png|jpe?g|gif)$/,
              use: [
                {
                  loader: this.bud.path(
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
                  loader: this.bud.path(
                    'project',
                    'node_modules/resolve-url-loader/index.js',
                  ),
                  options: {
                    root: this.bud.path('project', 'src'),
                    sourceMap: false,
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
              exclude: /(node_modules|bower_components)/,
              test: /\.(html?)$/,
              use: [
                {
                  loader: this.bud.path(
                    'project',
                    'node_modules/raw-loader/dist/cjs.js',
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

/*
      `"node": false, "optimization": {"emitOnErrors": false, "minimize": false, "minimizer": ["...", {"options": {"exclude": undefined, "include": undefined, "minify": [Function cssnanoMinify], "minimizerOptions": {"preset": ["default", {"discardComments": {"removeAll": true}}]}, "parallel": true, "test": /\.css(\?.*)?$/i, "warningsFilter": [Function warningsFilter]}}], "moduleIds": "deterministic", "runtimeChunk": undefined, "splitChunks": undefined}, "output": {"filename": "[name].js", "path": "[context]/dist", "pathinfo": false, "publicPath": "/"}, "parallelism": 15, "performance": {}, "plugins": [{"apply": [Function bound apply], "cleanAfterEveryBuildPatterns": [], "cleanOnceBeforeBuildPatterns": ["], "cleanStaleWebpackAssets": true, "currentAssets": [], "dangerouslyAllowCleanPatternsOutsideProject": false, "dry": false, "handleDone": [Function bound handleDone], "handleInitial": [Function bound handleInitial], "initialClean": false, "outputPath": "", "protectWebpackAssets": true, "removeFiles": [Function bound removeFiles], "verbose": false}, {"DEBUG": false, "ignorePatterns": [/.?.map$/], "options": {}}, {"options": {"basePath": "", "fileName": "manifest.json", "filter": null, "generate": undefined, "map": null, "publicPath": "/", "removeKeyHash": /([a-f0-9]{16,32}\.?)/gi, "seed": undefined, "serialize": [Function serialize], "sort": null, "transformExtensions": /^(gz|map)$/i, "useEntryKeys": false, "writeToFileEmit": true}}], "profile": true, "recordsPath": "[context]/.budfiles/records.json", "resolve": {"alias": {}, "extensions": [".wasm", ".mjs", ".js", ".css", ".json"], "modules": ["src", "node_modules"]}, "stats": {}, "target": "web", "watch": false, "watchOptions": undefined}`, */

export {}
