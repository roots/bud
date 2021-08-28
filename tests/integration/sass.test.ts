import {readFile, readJson} from 'fs-extra'
import {join} from 'path'

import {Assets, helper} from '../util/integration'

const suite = helper('sass', 'examples/sass')

jest.setTimeout(60000)

describe(suite.name, () => {
  let assets: Assets

  beforeAll(async () => {
    assets = await suite.setup()
  })

  it('package.json is unchanged', async () => {
    const artifact = await readJson(
      join(process.cwd(), 'examples/sass/package.json'),
    )

    expect(artifact).toMatchSnapshot()
  })

  it('manifest.yml is unchanged', async () => {
    const artifact = await readFile(
      join(process.cwd(), 'examples/sass/bud.config.yml'),
    )

    expect(artifact.toString()).toMatchSnapshot()
  })

  it('src/app.scss is unchanged', async () => {
    const artifact = await readFile(
      join(process.cwd(), 'examples/sass/src/app.scss'),
    )

    expect(artifact.toString()).toMatchSnapshot()
  })

  it('scss is transpiled', () => {
    expect(assets['app.css']).toMatchSnapshot()
  })

  it('.budfiles/bud.webpack.config.js', async () => {
    const artifact = await import(
      join(
        process.cwd(),
        'examples/sass/.budfiles/bud.webpack.config.js',
      )
    ).then(({default: artifact}) => artifact())

    expect(artifact).toMatchSnapshot({
      bail: true,
      cache: {
        type: 'memory',
      },
      context: expect.stringContaining('examples/sass'),
      entry: {
        app: {
          import: ['app.scss'],
        },
      },
      infrastructureLogging: {
        appendOnly: true,
        level: 'none',
        stream: {
          _eventsCount: 1,
          _isStdio: true,
          _readableState: {
            autoDestroy: true,
            constructed: true,
            defaultEncoding: 'utf8',
            highWaterMark: 16384,
            sync: true,
          },
          _type: 'pipe',
          _writableState: {
            allBuffers: true,
            allNoop: true,
            autoDestroy: true,
            constructed: true,
            defaultEncoding: 'utf8',
            highWaterMark: 16384,
            sync: true,
          },
          fd: 2,
        },
      },
      mode: 'production',
      module: {
        rules: [
          {
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
                      root: expect.stringContaining(
                        'examples/sass/src',
                      ),
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
                test: /\\\\\\.toml\\$/,
                type: 'json',
              },
              {
                test: /\\\\\\.\\(yaml\\|yml\\)\\$/,
                type: 'json',
              },
              {
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
                  },
                  {
                    loader: expect.stringContaining(
                      'css-loader/dist/cjs.js',
                    ),
                    options: {
                      importLoaders: 1,
                    },
                  },
                ],
              },
              {
                exclude: /\\(node_modules\\|bower_components\\)/,
                test: /\\\\\\.\\(js\\|jsx\\)\\$/,
              },
              {
                exclude: /\\(node_modules\\|bower_components\\)/,
                test: /\\\\\\.\\(scss\\|sass\\)\\$/,
                use: [
                  {
                    loader: expect.stringContaining(
                      'mini-css-extract-plugin/dist/loader.js',
                    ),
                  },
                  {
                    loader: expect.stringContaining(
                      'css-loader/dist/cjs.js',
                    ),
                    options: {
                      importLoaders: 1,
                    },
                  },
                  {
                    loader: expect.stringContaining(
                      'sass-loader/dist/cjs.js',
                    ),
                    options: {
                      implementation: {
                        TRUE: {
                          value: true,
                        },
                        info: expect.stringContaining(
                          'dart-sass',
                        ),
                      },
                      sourceMap: true,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      name: 'bud',
      optimization: {
        minimize: true,
        minimizer: [
          '...',
          {
            options: {
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
            },
          },
          {
            options: {
              minimizerOptions:
                "<<Circular reference to 'config.optimization.minimizer.[1].options.minimizerOptions'>>",
              parallel: true,
              test: /\\\\\\.css\\(\\\\\\?\\.\\*\\)\\?\\$/i,
            },
          },
        ],
        moduleIds: 'deterministic',
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
          defaultSizeTypes: ['...'],
        },
      },
      output: {
        enabledChunkLoadingTypes: ['...'],
        enabledLibraryTypes: ['...'],
        enabledWasmLoadingTypes: ['...'],
        filename: '[name].js',
        path: expect.stringContaining('examples/sass/dist'),
      },
      plugins: [
        {
          cleanOnceBeforeBuildPatterns: ['**/*', '!dll'],
          cleanStaleWebpackAssets: true,
          outputPath: expect.stringContaining(
            'examples/sass/dist',
          ),
          protectWebpackAssets: true,
        },
        {
          depth: 8,
          keepCircularReferences: true,
          name: 'bud.webpack.config.js',
          outputPath: expect.stringContaining(
            'examples/sass/.budfiles',
          ),
        },
        {
          ignorePatterns: [/\\.\\?\\.map\\$/],
        },
        {
          options: {
            fileName: 'manifest.json',
            removeKeyHash:
              /\\(\\[a-f0-9\\]\\{16,32\\}\\\\\\.\\?\\)/gi,
            transformExtensions: /\\^\\(gz\\|map\\)\\$/i,
            writeToFileEmit: true,
          },
        },
        {
          options: {
            chunkFilename: '[name].[id].css',
            filename: '[name].css',
          },
          runtimeOptions: {
            linkType: 'text/css',
          },
        },
      ],
      recordsInputPath: expect.stringContaining(
        'examples/sass/.budfiles/bud-modules.json',
      ),
      recordsOutputPath: expect.stringContaining(
        'examples/sass/.budfiles/bud-modules.json',
      ),
      resolve: {
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
          '.scss',
        ],
        modules: [
          'src',
          'node_modules',
          expect.stringContaining('packages/@roots/bud'),
          expect.stringContaining('packages/@roots/bud-sass'),
        ],
      },
    })
  })
})
