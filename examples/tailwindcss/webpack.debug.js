module.exports = () => ({
  bail: true,
  cache: {
    type: 'filesystem',
    name: 'bud',
    cacheLocation:
      '/Users/kellymears/code/roots/lando-roots/bud/examples/tailwindcss/.bud',
    cacheDirectory:
      '/Users/kellymears/code/roots/lando-roots/bud/examples/tailwindcss/.bud',
  },
  context:
    '/Users/kellymears/code/roots/lando-roots/bud/examples/tailwindcss',
  devtool: 'nosources-source-map',
  entry: {'bud-tailwind': ['app.css', 'app.js']},
  infrastructureLogging: {level: 'none'},
  mode: 'production',
  name: 'bud',
  node: {
    module: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
    process: true,
    global: true,
    Buffer: true,
    setImmediate: true,
    __filename: 'mock',
    __dirname: 'mock',
  },
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    flagIncludedChunks: true,
    occurrenceOrder: true,
    sideEffects: true,
    providedExports: true,
    usedExports: true,
    concatenateModules: true,
    splitChunks: {
      hidePathInfo: true,
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 109,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          reuseExistingChunk: true,
          minChunks: 2,
          priority: -20,
        },
        vendors: {
          automaticNamePrefix: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
    checkWasmTypes: true,
    portableRecords: true,
    minimize: true,
    nodeEnv: 'production',
  },
  output: {
    filename: '[name].js',
    path:
      '/Users/kellymears/code/roots/lando-roots/bud/examples/tailwindcss/dist',
    publicPath: '/',
    chunkFilename: '[name].js',
    webassemblyModuleFilename: '[modulehash].module.wasm',
    hotUpdateFunction: 'webpackHotUpdate',
    jsonpFunction: 'webpackJsonp',
    chunkCallbackName: 'webpackChunk',
    globalObject: 'window',
    libraryTarget: 'var',
    sourceMapFilename: '[file].map[query]',
    hotUpdateChunkFilename: '[id].[hash].hot-update.js',
    hotUpdateMainFilename: '[hash].hot-update.json',
    chunkLoadTimeout: 120000,
    hashFunction: 'md4',
    hashDigest: 'hex',
    hashDigestLength: 20,
  },
  performance: {
    maxAssetSize: 250000,
    maxEntrypointSize: 250000,
    hints: 'warning',
  },
  parallelism: 1,
  recordsPath:
    '/Users/kellymears/code/roots/lando-roots/bud/examples/tailwindcss/.bud/records.json',
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.css', '.json'],
    modules: ['src', 'node_modules'],
    unsafeCache: true,
    mainFiles: ['index'],
    aliasFields: ['browser'],
    mainFields: ['browser', 'module', 'main'],
    preferAbsolute: true,
    ignoreRootsErrors: true,
    roots: [
      '/Users/kellymears/code/roots/lando-roots/bud/examples/tailwindcss',
    ],
  },
  target: 'web',
  watchOptions: {
    ignored: [/(node_modules|bower_components)/],
    poll: 1000,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader:
                  '/Users/kellymears/code/roots/lando-roots/bud/node_modules/mini-css-extract-plugin/dist/loader.js',
              },
              {
                loader:
                  '/Users/kellymears/code/roots/lando-roots/bud/node_modules/css-loader/dist/cjs.js',
              },
              {
                loader:
                  '/Users/kellymears/code/roots/lando-roots/bud/packages/@roots/bud-postcss/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  postcssOptions: {
                    plugins: [
                      {postcssPlugin: 'postcss-import'},
                      {postcssPlugin: 'tailwindcss'},
                    ],
                  },
                  sourceMap: true,
                },
              },
              {
                loader:
                  '/Users/kellymears/code/roots/lando-roots/bud/node_modules/resolve-url-loader/index.js',
              },
            ],
          },
          {
            test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|ico)$/,
            use: [
              {
                loader:
                  '/Users/kellymears/code/roots/lando-roots/bud/node_modules/file-loader/dist/cjs.js',
                options: {name: '[name].[ext]'},
              },
            ],
          },
          {
            test: /\.(html?)$/,
            use: [
              {
                loader:
                  '/Users/kellymears/code/roots/lando-roots/bud/node_modules/raw-loader/dist/cjs.js',
              },
            ],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            use: [
              {
                loader:
                  '/Users/kellymears/code/roots/lando-roots/bud/node_modules/file-loader/dist/cjs.js',
                options: {name: '[name].[ext]'},
              },
            ],
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader:
                  '/Users/kellymears/code/roots/lando-roots/bud/node_modules/cache-loader/dist/cjs.js',
                options: {
                  cacheDirectory:
                    '/Users/kellymears/code/roots/lando-roots/bud/examples/tailwindcss/.bud',
                },
              },
              {
                loader:
                  '/Users/kellymears/code/roots/lando-roots/bud/node_modules/thread-loader/dist/cjs.js',
              },
              {
                loader:
                  '/Users/kellymears/code/roots/lando-roots/bud/node_modules/babel-loader/lib/index.js',
                options: {
                  presets: [['@babel/preset-env']],
                  plugins: [['@babel/plugin-transform-runtime']],
                  root:
                    '/Users/kellymears/code/roots/lando-roots/bud/examples/tailwindcss',
                  cacheDirectory:
                    '/Users/kellymears/code/roots/lando-roots/bud/examples/tailwindcss/.bud',
                },
              },
            ],
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader:
                  '/Users/kellymears/code/roots/lando-roots/bud/node_modules/resolve-url-loader/index.js',
              },
            ],
          },
        ],
      },
    ],
    unknownContextRequest: '.',
    unknownContextRecursive: true,
    unknownContextCritical: true,
    exprContextRequest: '.',
    exprContextRecursive: true,
    exprContextCritical: true,
    wrappedContextRegExp: /.*/,
    wrappedContextRecursive: true,
    unsafeCache: true,
    defaultRules: [
      {type: 'javascript/auto'},
      {
        test: /\.mjs$/i,
        type: 'javascript/esm',
        resolve: {mainFields: ['browser', 'main']},
      },
      {test: /\.json$/i, type: 'json'},
      {test: /\.wasm$/i, type: 'webassembly/experimental'},
    ],
  },
  plugins: [
    {
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll'],
      outputPath:
        '/Users/kellymears/code/roots/lando-roots/bud/examples/tailwindcss/dist',
    },
    {
      outputPath: './',
      name: 'webpack.debug.js',
      depth: 4,
      keepCircularReferences: true,
    },
    {
      definitions: {
        APP_TITLE: '"Create Bud App"',
        APP_DESCRIPTION: '"Project description"',
        APP_COLOR: '"#fff"',
      },
    },
    {
      opts: {
        fileName: 'manifest.json',
        transformExtensions: /^(gz|map)$/i,
        writeToFileEmit: true,
      },
    },
    {
      options: {
        filename: '[name].css',
        chunkFilename: '[name].[id].css',
      },
    },
    {
      pluginDescriptor: {name: 'OptimizeCssAssetsWebpackPlugin'},
      options: {
        assetProcessors: [
          {
            phase: 'compilation.optimize-chunk-assets',
            regExp: /\.css$/g,
          },
        ],
        canPrint: true,
        assetNameRegExp: /\.css$/g,
        cssProcessorPluginOptions: {
          preset: [
            'default',
            {discardComments: {removeAll: true}},
          ],
        },
      },
      phaseAssetProcessors: {
        'compilation.optimize-chunk-assets': [
          "<<Circular reference to 'config.plugins.[6].options.assetProcessors.[0]'>>",
        ],
      },
    },
    {
      plugin: {
        name: 'EntrypointsManifestPlugin',
        stage: Infinity,
      },
      hook: ['compilation', 'output'],
      name: 'entrypoints.json',
      writeToFileEmit: true,
    },
  ],
  resolveLoader: {
    unsafeCache: true,
    mainFields: ['loader', 'main'],
    extensions: ['.js', '.json'],
    mainFiles: ['index'],
  },
})
