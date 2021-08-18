module.exports = () => ({
  bail: true,
  cache: { type: 'memory' },
  context: '/Volumes/Samsung/Code/roots/bud/examples/react',
  entry: { app: { import: [ 'app.css', 'app.js' ] } },
  infrastructureLogging: {
    level: 'none',
    appendOnly: true,
    stream: {
      _readableState: {
        highWaterMark: 16384,
        constructed: true,
        sync: true,
        autoDestroy: true,
        defaultEncoding: 'utf8'
      },
      _eventsCount: 1,
      _writableState: {
        highWaterMark: 16384,
        defaultEncoding: 'utf8',
        sync: true,
        allBuffers: true,
        allNoop: true,
        constructed: true,
        autoDestroy: true
      },
      _type: 'pipe',
      fd: 2,
      _isStdio: true
    }
  },
  mode: 'production',
  module: {
    rules: [
      { test: /\.[cm]?(jsx?|tsx?)$/ },
      {
        oneOf: [
          {
            test: /\.(png|jpe?g|gif)$/,
            exclude: /(node_modules|bower_components)/,
            type: 'asset/resource',
            generator: { filename: 'assets/[hash][ext][query]' }
          },
          {
            test: /\.(ttf|otf|eot|woff2?|ico)$/,
            use: [
              {
                loader: '/Volumes/Samsung/Code/roots/bud/node_modules/resolve-url-loader/index.js',
                options: {
                  root: '/Volumes/Samsung/Code/roots/bud/examples/react/src'
                }
              }
            ],
            exclude: /(node_modules|bower_components)/
          },
          {
            test: /\.svg$/,
            exclude: /(node_modules|bower_components)/,
            type: 'asset/resource',
            generator: { filename: 'assets/[hash][ext][query]' }
          },
          {
            test: /\.(html?)$/,
            use: [
              {
                loader: '/Volumes/Samsung/Code/roots/bud/node_modules/html-loader/dist/cjs.js'
              }
            ]
          },
          {
            test: /\.(csv|tsv)$/,
            use: [
              {
                loader: '/Volumes/Samsung/Code/roots/bud/node_modules/csv-loader/index.js'
              }
            ]
          },
          {
            test: /\.xml$/,
            use: [
              {
                loader: '/Volumes/Samsung/Code/roots/bud/node_modules/xml-loader/index.js'
              }
            ]
          },
          { test: /\.toml$/, type: 'json' },
          { test: /\.(yaml|yml)$/, type: 'json' },
          { test: /\.json5$/, type: 'json' },
          {
            test: /\.css$/,
            use: [
              {
                loader: '/Volumes/Samsung/Code/roots/bud/node_modules/mini-css-extract-plugin/dist/loader.js'
              },
              {
                loader: '/Volumes/Samsung/Code/roots/bud/node_modules/css-loader/dist/cjs.js',
                options: { importLoaders: 1 }
              },
              {
                loader: '/Volumes/Samsung/Code/roots/bud/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  postcssOptions: {
                    plugins: [
                      { postcssPlugin: 'postcss-import' },
                      { postcssPlugin: 'postcss-nested' }
                    ]
                  },
                  sourceMap: true
                }
              }
            ],
            exclude: /(node_modules|bower_components)/
          },
          {
            test: /\.(js|jsx)$/,
            use: [
              {
                loader: '/Volumes/Samsung/Code/roots/bud/node_modules/babel-loader/lib/index.js',
                options: {
                  cacheDirectory: '/Volumes/Samsung/Code/roots/bud/examples/react/.budfiles/cache/babel',
                  root: '/Volumes/Samsung/Code/roots/bud/examples/react/src',
                  presets: [
                    [ '@babel/preset-env' ],
                    [ '@babel/preset-react' ]
                  ],
                  plugins: [
                    [ '@babel/plugin-transform-runtime' ],
                    [ '@babel/plugin-proposal-object-rest-spread' ],
                    [ '@babel/plugin-syntax-dynamic-import' ],
                    [ '@babel/plugin-proposal-class-properties' ]
                  ]
                }
              }
            ],
            exclude: /(node_modules|bower_components)/
          }
        ]
      }
    ]
  },
  name: 'bud',
  optimization: {
    minimize: true,
    minimizer: [
      '...',
      {
        options: {
          test: /\.css(\?.*)?$/i,
          parallel: true,
          minimizerOptions: {
            preset: [ 'default', { discardComments: { removeAll: true } } ]
          }
        }
      },
      {
        options: {
          test: /\.css(\?.*)?$/i,
          parallel: true,
          minimizerOptions: "<<Circular reference to 'config.optimization.minimizer.[1].options.minimizerOptions'>>"
        }
      }
    ],
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true,
          priority: -10,
          filename: 'vendor/[name].js'
        }
      },
      defaultSizeTypes: [ '...' ]
    }
  },
  output: {
    enabledChunkLoadingTypes: [ '...' ],
    enabledLibraryTypes: [ '...' ],
    enabledWasmLoadingTypes: [ '...' ],
    filename: '[name].js',
    path: '/Volumes/Samsung/Code/roots/bud/examples/react/dist'
  },
  plugins: [
    {
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: true,
      cleanOnceBeforeBuildPatterns: [ '**/*', '!dll' ],
      outputPath: '/Volumes/Samsung/Code/roots/bud/examples/react/dist'
    },
    {
      outputPath: '/Volumes/Samsung/Code/roots/bud/examples/react/.budfiles',
      name: 'bud.webpack.config.js',
      depth: 8,
      keepCircularReferences: true
    },
    { ignorePatterns: [ /.?.map$/ ] },
    {
      options: {
        fileName: 'manifest.json',
        removeKeyHash: /([a-f0-9]{16,32}\.?)/gi,
        transformExtensions: /^(gz|map)$/i,
        writeToFileEmit: true
      }
    },
    {
      options: { filename: '[name].css', chunkFilename: '[name].[id].css' },
      runtimeOptions: { linkType: 'text/css' }
    },
    {
      userOptions: {
        template: 'public/index.html',
        alwaysWriteToDisk: true,
        inject: true,
        minify: {
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
      },
      version: 5
    },
    {
      name: 'interpolate-html-plugin',
      replacements: {
        APP_TITLE: 'Create Bud App',
        APP_DESCRIPTION: 'Project description',
        APP_COLOR: '#fff'
      }
    }
  ],
  recordsInputPath: '/Volumes/Samsung/Code/roots/bud/examples/react/.budfiles/bud-modules.json',
  recordsOutputPath: '/Volumes/Samsung/Code/roots/bud/examples/react/.budfiles/bud-modules.json',
  resolve: {
    extensions: [
      '.wasm',  '.mjs',
      '.js',    '.jsx',
      '.css',   '.json',
      '.json5', '.toml',
      '.xml',   '.csv',
      '.tsv',   '.yml',
      '.yaml',  '.xml'
    ],
    modules: [
      'src',
      'node_modules',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud-babel',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud-postcss',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud-react'
    ]
  }
})