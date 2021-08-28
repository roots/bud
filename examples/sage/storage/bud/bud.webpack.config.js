module.exports = () => ({
  bail: true,
  cache: { type: 'memory' },
  context: '/Volumes/Samsung/Code/roots/bud/examples/sage',
  entry: {
    app: { import: [ 'scripts/app.js', 'styles/app.css' ] },
    editor: { import: [ 'scripts/editor.js', 'styles/editor.css' ] },
    customizer: { import: [ 'scripts/customizer.js' ] }
  },
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
                  root: '/Volumes/Samsung/Code/roots/bud/examples/sage/resources'
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
                      [
                        '/Volumes/Samsung/Code/roots/bud/node_modules/postcss-import/index.js'
                      ],
                      [
                        '/Volumes/Samsung/Code/roots/bud/node_modules/tailwindcss/lib/index.js',
                        '/Volumes/Samsung/Code/roots/bud/examples/sage/tailwind.config.js'
                      ],
                      [
                        '/Volumes/Samsung/Code/roots/bud/node_modules/postcss-nested/index.js'
                      ],
                      [
                        '/Volumes/Samsung/Code/roots/bud/node_modules/postcss-preset-env/index.js',
                        { stage: 1 }
                      ]
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
                  cacheDirectory: '/Volumes/Samsung/Code/roots/bud/examples/sage/storage/bud/cache/babel',
                  root: '/Volumes/Samsung/Code/roots/bud/examples/sage/resources',
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
    filename: '[name].[contenthash:6].js',
    path: '/Volumes/Samsung/Code/roots/bud/examples/sage/public'
  },
  plugins: [
    { definitions: { '$': 'jquery', jQuery: 'jquery' } },
    {
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: true,
      cleanOnceBeforeBuildPatterns: [ '**/*', '!dll' ],
      outputPath: '/Volumes/Samsung/Code/roots/bud/examples/sage/public'
    },
    {
      outputPath: '/Volumes/Samsung/Code/roots/bud/examples/sage/storage/bud',
      name: 'bud.webpack.config.js',
      depth: 8,
      keepCircularReferences: true
    },
    {
      patterns: [
        {
          from: 'resources/images/image.jpeg',
          to: 'images/[name].[contenthash:6][ext]',
          noErrorOnMissing: true
        }
      ]
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
      options: {
        filename: '[name].[contenthash:6].css',
        chunkFilename: '[name].[contenthash:6].[id].css'
      },
      runtimeOptions: { linkType: 'text/css' }
    },
    {
      plugin: { name: 'EntrypointsManifestPlugin', stage: Infinity },
      name: 'entrypoints.json'
    },
    {
      plugin: { name: 'WordPressDependenciesWebpackPlugin', stage: Infinity },
      fileName: 'wordpress.json'
    },
    {
      name: 'WordPressExternalsWebpackPlugin',
      stage: Infinity,
      externals: { type: 'window' }
    },
    {
      plugin: { name: 'MergedManifestPlugin' },
      file: 'entrypoints.json',
      entrypointsName: 'entrypoints.json',
      wordpressName: 'wordpress.json'
    },
    {
      key: 'ESLintWebpackPlugin',
      options: {
        extensions: [ 'js', 'jsx', 'ts', 'tsx', 'vue' ],
        emitError: true,
        emitWarning: true,
        failOnError: true,
        cache: true,
        cacheLocation: '/Volumes/Samsung/Code/roots/bud/examples/sage/storage/bud/cache/eslint.json',
        context: '/Volumes/Samsung/Code/roots/bud/examples/sage/resources',
        cwd: '/Volumes/Samsung/Code/roots/bud/examples/sage'
      }
    },
    {
      key: 'StylelintWebpackPlugin',
      options: {
        extensions: [ 'css', 'scss', 'sass' ],
        emitError: true,
        emitWarning: true,
        failOnError: true,
        context: '/Volumes/Samsung/Code/roots/bud/examples/sage/resources'
      },
      startTime: 1630139668959
    }
  ],
  recordsInputPath: '/Volumes/Samsung/Code/roots/bud/examples/sage/storage/bud/bud-modules.json',
  recordsOutputPath: '/Volumes/Samsung/Code/roots/bud/examples/sage/storage/bud/bud-modules.json',
  resolve: {
    alias: {
      '@fonts': '/Volumes/Samsung/Code/roots/bud/examples/sage/resources/fonts',
      '@images': '/Volumes/Samsung/Code/roots/bud/examples/sage/resources/images',
      '@scripts': '/Volumes/Samsung/Code/roots/bud/examples/sage/resources/scripts',
      '@styles': '/Volumes/Samsung/Code/roots/bud/examples/sage/resources/styles'
    },
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
      'resources',
      'node_modules',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/sage',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud-preset-wordpress',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud-preset-recommend',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud-babel',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud-entrypoints',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud-postcss',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud-react',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud-wordpress-externals',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud-wordpress-dependencies',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud-wordpress-manifests',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud-eslint',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud-prettier',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud-stylelint',
      '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud-tailwindcss'
    ]
  }
})