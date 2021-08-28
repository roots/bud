import {factory, Framework} from '@roots/bud'

describe('bud.build.config', function () {
  let bud: Framework

  beforeAll(() => {
    bud = factory({
      mode: 'development',
    })
  })

  afterAll(done => {
    bud.close(done)
  })

  it('[development] bud.build.config matches snapshot', () => {
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
      mode: 'development',
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
                      'style-loader/dist/cjs.js',
                    ),
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
        minimize: false,
        minimizer: ['...'],
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
          showFunctionNames: false,
        },
        {
          options: {},
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
      ],
      profile: false,
      recordsPath: expect.any(String),
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
        modules: ['src', 'node_modules'],
      },
      stats: {},
      target: undefined,
      watch: false,
      watchOptions: undefined,
    })
  })
})
