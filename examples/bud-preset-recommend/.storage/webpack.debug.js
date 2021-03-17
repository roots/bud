module.exports = () => ({
  bail: true,
  cache: {
    type: 'filesystem',
    name: 'application',
    cacheLocation: '/Users/kellymears/code/roots/lando-roots/bud/examples/bud-preset-recommend/.storage',
    cacheDirectory: '/Users/kellymears/code/roots/lando-roots/bud/examples/bud-preset-recommend/.storage',
    config: [
      '/Users/kellymears/code/roots/lando-roots/bud/examples/bud-preset-recommend/bud.config.js',
      '/Users/kellymears/code/roots/lando-roots/bud/examples/bud-preset-recommend/package.json'
    ]
  },
  context: '/Users/kellymears/code/roots/lando-roots/bud/examples/bud-preset-recommend',
  entry: {
    app: [
      '/Users/kellymears/code/roots/lando-roots/bud/packages/@roots/bud-server/lib/cjs/client/index.js',
      'styles/app.css',
      'scripts/app.js'
    ]
  },
  infrastructureLogging: { level: 'none' },
  mode: 'development',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: '/Users/kellymears/code/roots/lando-roots/bud/node_modules/cache-loader/dist/cjs.js',
                options: {
                  cacheDirectory: '/Users/kellymears/code/roots/lando-roots/bud/examples/bud-preset-recommend/.storage'
                }
              },
              {
                loader: '/Users/kellymears/code/roots/lando-roots/bud/node_modules/thread-loader/dist/cjs.js'
              },
              {
                loader: '/Users/kellymears/code/roots/lando-roots/bud/node_modules/babel-loader/lib/index.js',
                options: {
                  cacheDirectory: '/Users/kellymears/code/roots/lando-roots/bud/examples/bud-preset-recommend/.storage',
                  root: '/Users/kellymears/code/roots/lando-roots/bud/examples/bud-preset-recommend',
                  presets: [ [ '@babel/preset-env' ] ],
                  plugins: [
                    [ '@babel/plugin-transform-runtime' ],
                    [ '@babel/plugin-proposal-object-rest-spread' ],
                    [ '@babel/plugin-syntax-dynamic-import' ]
                  ]
                }
              }
            ]
          },
          {
            test: /\.css$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: '/Users/kellymears/code/roots/lando-roots/bud/node_modules/style-loader/dist/cjs.js'
              },
              {
                loader: '/Users/kellymears/code/roots/lando-roots/bud/node_modules/css-loader/dist/cjs.js',
                options: { sourceMap: true }
              },
              {
                loader: '/Users/kellymears/code/roots/lando-roots/bud/packages/@roots/bud-postcss/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  postcssOptions: {
                    plugins: [
                      { postcssPlugin: 'postcss-import' },
                      { postcssPlugin: 'postcss-nested' },
                      { postcssPlugin: 'postcss-custom-properties' }
                    ]
                  },
                  sourceMap: true
                }
              }
            ]
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            use: [
              {
                loader: '/Users/kellymears/code/roots/lando-roots/bud/node_modules/file-loader/dist/cjs.js',
                options: { name: '[name].[ext]' }
              }
            ]
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: '/Users/kellymears/code/roots/lando-roots/bud/node_modules/resolve-url-loader/index.js'
              }
            ]
          },
          {
            test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|ico)$/,
            use: [
              {
                loader: '/Users/kellymears/code/roots/lando-roots/bud/node_modules/file-loader/dist/cjs.js',
                options: { name: '[name].[ext]' }
              }
            ]
          },
          {
            test: /\.(html?)$/,
            use: [
              {
                loader: '/Users/kellymears/code/roots/lando-roots/bud/node_modules/raw-loader/dist/cjs.js'
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
    __dirname: 'mock'
  },
  output: {
    filename: '[name].js',
    path: '/Users/kellymears/code/roots/lando-roots/bud/examples/bud-preset-recommend/dist',
    publicPath: '/',
    chunkFilename: '[name].js',
    webassemblyModuleFilename: '[modulehash].module.wasm',
    hotUpdateFunction: 'webpackHotUpdate',
    jsonpFunction: 'webpackJsonp',
    chunkCallbackName: 'webpackChunk',
    globalObject: 'window',
    libraryTarget: 'var',
    pathinfo: true,
    sourceMapFilename: '[file].map[query]',
    hotUpdateChunkFilename: '[id].[hash].hot-update.js',
    hotUpdateMainFilename: '[hash].hot-update.json',
    chunkLoadTimeout: 120000,
    hashFunction: 'md4',
    hashDigest: 'hex',
    hashDigestLength: 20
  },
  parallelism: 1,
  plugins: [
    {
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: true,
      cleanOnceBeforeBuildPatterns: [ '**/*', '!dll' ],
      outputPath: '/Users/kellymears/code/roots/lando-roots/bud/examples/bud-preset-recommend/dist'
    },
    {
      outputPath: '/Users/kellymears/code/roots/lando-roots/bud/examples/bud-preset-recommend/.storage',
      name: 'webpack.debug.js',
      depth: 4,
      keepCircularReferences: true
    },
    { fullBuildTimeout: 200, requestTimeout: 10000 },
    {
      options: {
        template: '/Users/kellymears/code/roots/lando-roots/bud/packages/@roots/bud-support/publish/template.html',
        filename: 'index.html',
        publicPath: 'auto',
        inject: true,
        scriptLoading: 'blocking',
        compile: true,
        minify: 'auto',
        cache: true,
        showErrors: true,
        chunks: 'all',
        chunksSortMode: 'auto',
        title: 'Webpack App',
        alwaysWriteToDisk: true
      },
      version: 4
    },
    { outputPath: 'dist' },
    { replacements: { APP_TITLE: 'Bud Preset Demo' } },
    {
      opts: {
        publicPath: '/',
        fileName: 'manifest.json',
        transformExtensions: /^(gz|map)$/i,
        writeToFileEmit: true
      }
    },
    {
      plugin: { name: 'EntrypointsManifestPlugin', stage: Infinity },
      hook: [ 'compilation', 'output' ],
      name: 'entrypoints.json',
      writeToFileEmit: true
    }
  ],
  recordsPath: '/Users/kellymears/code/roots/lando-roots/bud/examples/bud-preset-recommend/.storage/records.json',
  resolve: {
    alias: { '@images': 'images', '@scripts': 'scripts', '@styles': 'styles' },
    extensions: [ '.wasm', '.mjs', '.js', '.css', '.json' ],
    modules: [
      'src',
      '../../node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-babel/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-compress/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-emotion/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-entrypoints/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-esbuild/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-eslint/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-imagemin/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-library/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-mdx/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-postcss/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-prettier/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-purgecss/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-react/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-sass/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-stylelint/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-tailwindcss/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-terser/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-typescript/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-vue/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-wordpress-dependencies/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-wordpress-externals/node_modules',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules/@roots/bud-wordpress-manifests/node_modules'
    ],
    unsafeCache: true,
    mainFiles: [ 'index' ],
    aliasFields: [ 'browser' ],
    mainFields: [ 'browser', 'module', 'main' ],
    preferAbsolute: true,
    ignoreRootsErrors: true,
    roots: [
      '/Users/kellymears/code/roots/lando-roots/bud/examples/bud-preset-recommend'
    ]
  },
  target: 'web',
  watch: true,
  watchOptions: { ignored: [ /(node_modules|bower_components)/ ], poll: 1000 },
  optimization: {
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    providedExports: true,
    splitChunks: {
      chunks: 'async',
      minSize: 10000,
      minChunks: 1,
      maxAsyncRequests: Infinity,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 109,
      maxInitialRequests: Infinity,
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
    namedModules: true,
    namedChunks: true,
    portableRecords: true,
    nodeEnv: 'development'
  },
  resolveLoader: {
    unsafeCache: true,
    mainFields: [ 'loader', 'main' ],
    extensions: [ '.js', '.json' ],
    mainFiles: [ 'index' ]
  }
})