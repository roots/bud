module.exports = () => ({
  bail: true,
  cache: {
    type: 'filesystem',
    name: 'bud',
    cacheLocation: '/Users/kellymears/code/projects/cli/bud/bud/examples/sage/storage/bud',
    cacheDirectory: '/Users/kellymears/code/projects/cli/bud/bud/examples/sage/storage/bud'
  },
  context: '/Users/kellymears/code/projects/cli/bud/bud/examples/sage',
  entry: { app: [ 'styles/app.scss', 'scripts/app.js' ] },
  infrastructureLogging: { level: 'none' },
  mode: 'production',
  name: '@roots/bud',
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
    __dirname: 'mock'
  },
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        vendor: {
          enforce: true,
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          reuseExistingChunk: true
        },
        default: { reuseExistingChunk: true, minChunks: 2, priority: -20 },
        vendors: {
          automaticNamePrefix: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      },
      hidePathInfo: true,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 109,
      name: true
    },
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    flagIncludedChunks: true,
    occurrenceOrder: true,
    sideEffects: true,
    providedExports: true,
    usedExports: true,
    concatenateModules: true,
    checkWasmTypes: true,
    portableRecords: true,
    minimize: true,
    nodeEnv: 'production'
  },
  output: {
    filename: '[name].[hash].js',
    path: '/Users/kellymears/code/projects/cli/bud/bud/examples/sage/dist',
    publicPath: '/wp-content/themes/example/dist/',
    chunkFilename: '[name].[hash].js',
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
  parallelism: 1,
  recordsPath: '/Users/kellymears/code/projects/cli/bud/bud/examples/sage/storage/bud/records',
  resolve: {
    alias: {
      '@scripts': 'scripts',
      '@styles': 'styles',
      '@fonts': 'fonts',
      '@images': 'images'
    },
    extensions: [
      '.wasm', '.mjs',
      '.js',   '.css',
      '.json', '.sass',
      '.scss'
    ],
    modules: [
      '/Users/kellymears/code/projects/cli/bud/bud/examples/sage/resources/assets',
      '/Users/kellymears/code/projects/cli/bud/bud/examples/sage/node_modules',
      '/Users/kellymears/code/projects/cli/bud/bud/node_modules'
    ],
    unsafeCache: true,
    mainFiles: [ 'index' ],
    aliasFields: [ 'browser' ],
    mainFields: [ 'browser', 'module', 'main' ]
  },
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
              {
                loader: '/Users/kellymears/code/projects/cli/bud/bud/packages/bud/node_modules/css-loader/dist/cjs.js'
              }
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
              "<<Circular reference to 'config.module.rules.[0].oneOf.[1].use.[0]'>>"
            ]
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/cache-loader/dist/cjs.js',
                options: {
                  cacheDirectory: '/Users/kellymears/code/projects/cli/bud/bud/examples/sage/storage/bud'
                }
              },
              {
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/thread-loader/dist/cjs.js'
              },
              {
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/babel-loader/lib/index.js',
                options: {
                  presets: [
                    [ '@babel/preset-env' ],
                    [ '@babel/preset-react' ]
                  ],
                  plugins: [ [ '@babel/plugin-transform-runtime' ] ],
                  root: '/Users/kellymears/code/projects/cli/bud/bud/examples/sage',
                  cacheDirectory: '/Users/kellymears/code/projects/cli/bud/bud/examples/sage/storage/bud'
                }
              }
            ]
          },
          {
            test: /\.svg$/,
            use: [ { loader: 'loaders.resolve-url-loader' } ]
          },
          {
            test: /\.(scss|sass)$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              "<<Circular reference to 'config.module.rules.[0].oneOf.[0].use.[0]'>>",
              "<<Circular reference to 'config.module.rules.[0].oneOf.[0].use.[1]'>>",
              {
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/sass-loader/dist/cjs.js'
              },
              {
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/resolve-url-loader/index.js',
                options: {
                  root: '/Users/kellymears/code/projects/cli/bud/bud/examples/sage',
                  sourceMap: true
                }
              }
            ]
          }
        ]
      }
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
  plugins: [
    {
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: true,
      cleanOnceBeforeBuildPatterns: [ '**/*', '!dll' ],
      outputPath: '/Users/kellymears/code/projects/cli/bud/bud/examples/sage/dist'
    },
    {
      options: {
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 20
      }
    },
    {
      outputPath: '/Users/kellymears/code/projects/cli/bud/bud/examples/sage/storage/bud',
      name: 'webpack.debug.js',
      depth: 4,
      keepCircularReferences: true
    },
    {
      definitions: {
        APP_PROXY_PORT: '"8000"',
        APP_PROXY_HOST: '"localhost"',
        APP_PUBLIC_PATH: '"/wp-content/themes/example/dist/"'
      }
    },
    {
      opts: {
        publicPath: '/wp-content/themes/example/dist/',
        fileName: 'manifest.json',
        transformExtensions: /^(gz|map)$/i,
        writeToFileEmit: true
      }
    },
    {
      options: { filename: '[name].css', chunkFilename: '[name].css' }
    },
    {
      plugin: { name: 'EntrypointsManifestPlugin', stage: Infinity },
      hook: [ 'compilation', 'output' ],
      name: 'entrypoints.json',
      writeToFileEmit: true
    },
    {
      name: 'WordPressDependenciesWebpackPlugin',
      stage: Infinity,
      output: { name: 'wordpress.json' },
      options: { name: 'wordpress.json' }
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
      options: {
        extensions: [ 'js', 'jsx' ],
        eslintPath: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/eslint/lib/api.js',
        cache: true,
        cacheLocation: '/Users/kellymears/code/projects/cli/bud/bud/examples/sage/storage/bud',
        quiet: true,
        baseConfig: {
          extends: [ 'eslint:recommended' ],
          parser: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/babel-eslint/lib/index.js',
          env: {
            node: true,
            es6: true,
            amd: true,
            browser: true,
            jquery: true
          },
          parserOptions: {
            ecmaFeatures: { globalReturn: true },
            ecmaVersion: 2018,
            sourceType: 'module'
          },
          plugins: [ 'import' ],
          settings: {
            'import/ignore': [
              'node_modules',
              '\\.(coffee|scss|css|less|hbs|svg|json)$'
            ]
          }
        },
        overrideConfig: {
          globals: {
            APP_PROXY_PORT: true,
            wp: true,
            APP_PROXY_HOST: true,
            APP_PUBLIC_PATH: true
          }
        }
      }
    },
    {
      options: {
        test: /\.[cm]?js(\?.*)?$/i,
        cache: true,
        parallel: true,
        terserOptions: {
          parse: { ecma: 2018 },
          mangle: { safari10: true },
          output: { ecma: 5, ascii_only: true }
        }
      }
    }
  ],
  resolveLoader: {
    unsafeCache: true,
    mainFields: [ 'loader', 'main' ],
    extensions: [ '.js', '.json' ],
    mainFiles: [ 'index' ],
    roots: [ '/Users/kellymears/code/projects/cli/bud/bud/examples/sage' ]
  }
})