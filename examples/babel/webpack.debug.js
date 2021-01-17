module.exports = () => ({
  entry: { 'create-bud-app': [ 'app.js', 'global.css' ] },
  bail: true,
  context: '/Users/kellymears/code/projects/cli/bud/bud/examples/babel',
  devtool: 'source-map',
  mode: 'production',
  name: '@roots/bud',
  recordsPath: '/Users/kellymears/code/projects/cli/bud/bud/examples/babel/.bud',
  stats: 'none',
  target: 'web',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/mini-css-extract-plugin/dist/loader.js'
              },
              { ident: 'css', loader: 'css-loader' }
            ]
          },
          {
            test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|ico)$/,
            use: [
              {
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/file-loader/dist/cjs.js'
              }
            ]
          },
          {
            test: /\.(html?)$/,
            use: [
              {
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/raw-loader/dist/cjs.js'
              }
            ]
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            use: [
              "<<Circular reference to 'config.module.rules.[1].oneOf.[1].use.[0]'>>"
            ]
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/cache-loader/dist/cjs.js'
              },
              {
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/thread-loader/dist/cjs.js',
                options: { importLoaders: 2 }
              },
              {
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/babel-loader/lib/index.js',
                options: {
                  presets: [
                    [
                      '/Users/kellymears/code/projects/cli/bud/bud/node_modules/@babel/preset-env/lib/index.js',
                      { targets: 'defaults' }
                    ]
                  ],
                  plugins: [
                    [
                      '/Users/kellymears/code/projects/cli/bud/bud/node_modules/@babel/plugin-transform-runtime/lib/index.js'
                    ]
                  ]
                }
              }
            ]
          },
          {
            test: /\.svg$/,
            use: [ { loader: 'loaders.resolve-url-loader' } ]
          }
        ]
      }
    ],
    noParse: /jquery|lodash|moment|react|vue/,
    unknownContextRequest: '.',
    unknownContextRecursive: true,
    unknownContextCritical: true,
    exprContextRequest: '.',
    exprContextRecursive: true,
    exprContextCritical: true,
    wrappedContextRegExp: /.*/,
    wrappedContextRecursive: true,
    defaultRules: [
      { type: 'javascript/auto' },
      {
        test: /\.mjs$/i,
        type: 'javascript/esm',
        resolve: { mainFields: [ 'browser', 'main' ] }
      },
      { test: /\.json$/i, type: 'json' },
      { test: /\.wasm$/i, type: 'webassembly/experimental' }
    ]
  },
  output: {
    path: '/Users/kellymears/code/projects/cli/bud/bud/examples/babel/dist',
    publicPath: '/',
    filename: '[name].js',
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
    hashDigestLength: 20
  },
  plugins: [
    {
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: true,
      cleanOnceBeforeBuildPatterns: [ '**/*', '!dll/*' ],
      outputPath: '/Users/kellymears/code/projects/cli/bud/bud/examples/babel/dist'
    },
    {
      outputPath: '/Users/kellymears/code/projects/cli/bud/bud/examples/babel',
      name: 'webpack.debug.js',
      depth: 4,
      keepCircularReferences: true
    },
    {
      definitions: {
        APP_TITLE: 'Create Bud App',
        APP_DESCRIPTION: 'Project description',
        APP_COLOR: '#fff'
      }
    },
    {
      opts: {
        fileName: 'manifest.json',
        transformExtensions: /^(gz|map)$/i,
        writeToFileEmit: true
      }
    },
    {
      options: { filename: '[name].css', chunkFilename: '[name].css' }
    }
  ],
  resolve: {
    extensions: [ '.wasm', '.mjs', '.js', '.json' ],
    modules: [
      '/Users/kellymears/code/projects/cli/bud/bud/examples/babel/src',
      '/Users/kellymears/code/projects/cli/bud/bud/examples/babel/node_modules',
      '/Users/kellymears/code/projects/cli/bud/bud/node_modules'
    ],
    unsafeCache: true,
    mainFiles: [ 'index' ],
    aliasFields: [ 'browser' ],
    mainFields: [ 'browser', 'module', 'main' ]
  },
  optimization: {
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
        default: { reuseExistingChunk: true, minChunks: 2, priority: -20 },
        vendors: {
          automaticNamePrefix: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    },
    noEmitOnErrors: true,
    checkWasmTypes: true,
    portableRecords: true,
    nodeEnv: 'production'
  },
  node: {
    process: true,
    global: true,
    Buffer: true,
    setImmediate: true,
    __filename: 'mock',
    __dirname: 'mock'
  },
  performance: { maxAssetSize: 250000, maxEntrypointSize: 250000, hints: 'warning' },
  resolveLoader: {
    unsafeCache: true,
    mainFields: [ 'loader', 'main' ],
    extensions: [ '.js', '.json' ],
    mainFiles: [ 'index' ],
    roots: [ '/Users/kellymears/code/projects/cli/bud/bud/examples/babel' ]
  },
  infrastructureLogging: { level: 'info' }
})