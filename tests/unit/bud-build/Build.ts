import {factory, Framework} from '@roots/bud'
import {Item, Loader, Rule} from '@roots/bud-build'

describe('bud.build', function () {
  let bud: Framework
  let initialBuildConfig

  beforeAll(() => {
    bud = factory()
    initialBuildConfig = {...bud.build.config}
  })

  afterAll(done => {
    bud.close(done)
  })

  it('has rebuild method', () => {
    expect(bud.build.rebuild).toBeInstanceOf(Function)
  })

  it('has expected rules', () => {
    expect(bud.build.rules).toMatchSnapshot()
  })

  it('all rules are Rule instances', () => {
    Object.values(bud.build.rules).forEach(rule => {
      expect(rule).toBeInstanceOf(Rule)
    })
  })

  it('has valid items', () => {
    Object.values(bud.build.items).forEach(item => {
      expect(item).toBeInstanceOf(Item)
    })
  })

  it('has valid loaders', () => {
    Object.values(bud.build.loaders).forEach(loader => {
      expect(loader).toBeInstanceOf(Loader)
    })
  })

  it('bud.build.config matches snapshot', () => {
    expect(bud.build.config).toMatchSnapshot({
      bail: true,
      cache: {
        type: 'memory',
      },
      context: expect.any(String),
      devtool: false,
      entry: undefined,
      experiments: {
        lazyCompilation: false,
      },
      externals: undefined,
      infrastructureLogging: {
        appendOnly: true,
        level: 'none',
      },
      mode: 'production',
      module: {
        rules: [
          {
            parser: {
              requireEnsure: false,
            },
            test: /\\\\\\.\\[cm\\]\\?\\(jsx\\?\\|tsx\\?\\)\\$/,
          },
          {
            oneOf: [
              {
                exclude: /\\(node_modules\\|bower_components\\)/,
                generator: {
                  filename: 'assets/[hash][ext][query]',
                },
                test: /\\\\\\.\\(png\\|jpe\\?g\\|gif\\)\\$/,
                type: 'asset/resource',
              },
              {
                exclude: /\\(node_modules\\|bower_components\\)/,
                test: /\\\\\\.\\(ttf\\|otf\\|eot\\|woff2\\?\\|ico\\)\\$/,
                use: [
                  {
                    loader: expect.stringContaining(
                      'resolve-url-loader/index.js',
                    ),
                    options: {
                      root: expect.stringContaining('src'),
                      sourceMap: false,
                    },
                  },
                ],
              },
              {
                exclude: /\\(node_modules\\|bower_components\\)/,
                generator: {
                  filename: 'assets/[hash][ext][query]',
                },
                test: /\\\\\\.svg\\$/,
                type: 'asset/resource',
              },
              {
                test: /\\\\\\.\\(html\\?\\)\\$/,
                use: [
                  {
                    loader: expect.stringContaining(
                      'html-loader/dist/cjs.js',
                    ),
                  },
                ],
              },
              {
                test: /\\\\\\.\\(csv\\|tsv\\)\\$/,
                use: [
                  {
                    loader: expect.stringContaining(
                      'csv-loader/index.js',
                    ),
                  },
                ],
              },
              {
                test: /\\\\\\.xml\\$/,
                use: [
                  {
                    loader: expect.stringContaining(
                      'xml-loader/index.js',
                    ),
                  },
                ],
              },
              {
                parser: {
                  parse: expect.any(Function),
                },
                test: /\\\\\\.toml\\$/,
                type: 'json',
              },
              {
                parser: {
                  parse: expect.any(Function),
                },
                test: /\\\\\\.\\(yaml\\|yml\\)\\$/,
                type: 'json',
              },
              {
                parser: {
                  parse: expect.any(Function),
                },
                test: /\\\\\\.json5\\$/,
                type: 'json',
              },
              {
                exclude: /\\(node_modules\\|bower_components\\)/,
                test: /\\\\\\.css\\$/,
                use: [
                  {
                    loader: expect.stringContaining(
                      'mini-css-extract-plugin/dist/loader.js',
                    ),
                    options: {},
                  },
                  {
                    loader: expect.stringContaining(
                      'css-loader/dist/cjs.js',
                    ),
                    options: {
                      importLoaders: 1,
                      sourceMap: false,
                    },
                  },
                ],
              },
              {
                exclude: /\\(node_modules\\|bower_components\\)/,
                test: /\\\\\\.\\(js\\|jsx\\)\\$/,
                use: [],
              },
            ],
          },
        ],
      },
      name: 'bud',
      node: false,
      optimization: {
        emitOnErrors: false,
        minimize: true,
        minimizer: [
          '...',
          {
            options: {
              exclude: undefined,
              include: undefined,
              minify: expect.any(Function),
              minimizerOptions: {
                preset: [
                  'default',
                  {
                    discardComments: {
                      removeAll: true,
                    },
                  },
                ],
              },
              parallel: true,
              test: /\\\\\\.css\\(\\\\\\?\\.\\*\\)\\?\\$/i,
              warningsFilter: expect.any(Function),
            },
          },
          {
            options: {
              exclude: undefined,
              include: undefined,
              minify: expect.any(Function),
              minimizerOptions: {
                preset: [
                  'default',
                  {
                    discardComments: {
                      removeAll: true,
                    },
                  },
                ],
              },
              parallel: true,
              test: /\\\\\\.css\\(\\\\\\?\\.\\*\\)\\?\\$/i,
              warningsFilter: expect.any(Function),
            },
          },
        ],
        moduleIds: 'deterministic',
        runtimeChunk: undefined,
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: 'all',
              filename: 'vendor/[name].js',
              priority: -10,
              reuseExistingChunk: true,
              test: /\\[\\\\\\\\/\\]node_modules\\[\\\\\\\\/\\]/,
            },
          },
        },
      },
      output: {
        filename: '[name].js',
        path: expect.stringContaining('dist'),
        pathinfo: undefined,
        publicPath: '',
      },
      parallelism: undefined,
      performance: {},
      plugins: [
        {
          apply: expect.any(Function),
          cleanAfterEveryBuildPatterns: [],
          cleanOnceBeforeBuildPatterns: ['**/*', '!dll'],
          cleanStaleWebpackAssets: true,
          currentAssets: [],
          dangerouslyAllowCleanPatternsOutsideProject: false,
          dry: false,
          handleDone: expect.any(Function),
          handleInitial: expect.any(Function),
          initialClean: false,
          outputPath: '',
          protectWebpackAssets: true,
          removeFiles: expect.any(Function),
          verbose: false,
        },
        {
          depth: 8,
          includeFalseValues: false,
          keepCircularReferences: true,
          name: 'bud.webpack.config.js',
          outputPath: expect.stringContaining('.budfiles'),
          showFunctionNames: true,
        },
        {
          DEBUG: false,
          ignorePatterns: [/\\.\\?\\.map\\$/],
          options: {},
        },
        {
          options: {
            basePath: '',
            fileName: 'manifest.json',
            filter: null,
            generate: undefined,
            map: null,
            publicPath: '',
            removeKeyHash:
              /\\(\\[a-f0-9\\]\\{16,32\\}\\\\\\.\\?\\)/gi,
            seed: undefined,
            serialize: expect.any(Function),
            sort: null,
            transformExtensions: /\\^\\(gz\\|map\\)\\$/i,
            useEntryKeys: false,
            useLegacyEmit: false,
            writeToFileEmit: true,
          },
        },
        {
          _sortedModulesCache: expect.any(WeakMap),
          options: {
            chunkFilename: '[name].[id].css',
            experimentalUseImportModule: false,
            filename: '[name].css',
            ignoreOrder: false,
          },
          runtimeOptions: {
            attributes: undefined,
            insert: undefined,
            linkType: 'text/css',
          },
        },
      ],
      profile: false,
      recordsPath: expect.stringContaining(
        '.budfiles/bud-modules.json',
      ),
      resolve: {
        alias: {},
        extensions: [
          '.wasm',
          '.mjs',
          '.js',
          '.jsx',
          '.css',
          '.json',
          '.json5',
          '.toml',
          '.xml',
          '.csv',
          '.tsv',
          '.yml',
          '.yaml',
          '.xml',
        ],
        modules: [
          'src',
          'node_modules',
          expect.stringContaining('@roots/bud'),
        ],
      },
      stats: {},
      target: undefined,
      watch: false,
      watchOptions: undefined,
    })
  })

  it('bud.build.rebuild modifies bud.build.config', () => {
    const entryValue = {
      app: {
        import: ['app.js'],
      },
    }

    bud.hooks.on('build/entry', () => entryValue)

    bud.build.rebuild()

    expect(initialBuildConfig).not.toEqual(bud.build.config)
    expect(bud.build.config.entry).toEqual(entryValue)
  })
})
