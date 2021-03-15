module.exports = () => ({
  bail: true,
  cache: {
    type: 'filesystem',
    name: 'sage',
    cacheLocation: '/Users/kellymears/code/roots/lando-roots/bud/packages/@roots/sage/test/theme/storage/bud/cache',
    cacheDirectory: '/Users/kellymears/code/roots/lando-roots/bud/packages/@roots/sage/test/theme/storage/bud'
  },
  context: '/Users/kellymears/code/roots/lando-roots/bud/packages/@roots/sage/test/theme',
  entry: {
    app: [ 'scripts/app.js', 'styles/app.css' ],
    editor: [ 'scripts/editor.js', 'styles/editor.css' ],
    customizer: [ 'scripts/customizer.js' ]
  },
  infrastructureLogging: { level: 'none' },
  mode: 'production',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: '/Users/kellymears/code/roots/lando-roots/bud/node_modules/esbuild-loader/dist/index.js',
                options: { loader: 'jsx', target: 'es2015' }
              }
            ]
          },
          {
            test: /\.css$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: '/Users/kellymears/code/roots/lando-roots/bud/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: { publicPath: '..' }
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
                      { postcssPlugin: 'tailwindcss' },
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
                options: { name: '[name].[hash].[ext]' }
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
                options: { name: '[name].[hash].[ext]' }
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
  name: 'sage',
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
    filename: '[name].[hash].js',
    path: '/Users/kellymears/code/roots/lando-roots/bud/packages/@roots/sage/test/theme/dist',
    publicPath: '/',
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
  plugins: [
    {
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: true,
      cleanOnceBeforeBuildPatterns: [ '**/*', '!dll' ],
      outputPath: '/Users/kellymears/code/roots/lando-roots/bud/packages/@roots/sage/test/theme/dist'
    },
    {
      outputPath: '/Users/kellymears/code/roots/lando-roots/bud/packages/@roots/sage/test/theme',
      name: 'webpack.debug.js',
      depth: 4,
      keepCircularReferences: true
    },
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
        base: '/Users/kellymears/code/roots/lando-roots/bud/packages/@roots/sage/test/theme',
        title: 'Webpack App',
        alwaysWriteToDisk: true
      },
      version: 4
    },
    { outputPath: 'dist' },
    {
      opts: {
        publicPath: '/',
        fileName: 'manifest.json',
        transformExtensions: /^(gz|map)$/i,
        writeToFileEmit: true
      }
    },
    {
      options: {
        filename: '[name].[hash].css',
        chunkFilename: '[name].[hash][id].css'
      }
    },
    {
      pluginDescriptor: { name: 'OptimizeCssAssetsWebpackPlugin' },
      options: {
        assetProcessors: [
          {
            phase: 'compilation.optimize-chunk-assets',
            regExp: /\.css$/g
          }
        ],
        canPrint: true,
        assetNameRegExp: /\.css$/g,
        cssProcessorPluginOptions: {
          preset: [ 'default', { discardComments: { removeAll: true } } ]
        }
      },
      phaseAssetProcessors: {
        'compilation.optimize-chunk-assets': [
          "<<Circular reference to 'config.plugins.[7].options.assetProcessors.[0]'>>"
        ]
      }
    },
    {
      options: {
        extensions: [ 'js', 'jsx', 'ts', 'tsx', 'vue' ],
        emitError: true,
        failOnError: true,
        cache: true,
        cacheLocation: '/Users/kellymears/code/roots/lando-roots/bud/packages/@roots/sage/test/theme/storage/bud',
        quiet: true,
        context: '/Users/kellymears/code/roots/lando-roots/bud/packages/@roots/sage/test/theme/*'
      }
    },
    {
      options: {
        files: '**/*.(s(c|a)ss|css)',
        stylelintPath: 'stylelint',
        context: '/Users/kellymears/code/roots/lando-roots/bud/packages/@roots/sage/test/theme/resources'
      }
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
    }
  ],
  recordsPath: '/Users/kellymears/code/roots/lando-roots/bud/packages/@roots/sage/test/theme/storage/bud/records.json',
  resolve: {
    alias: {
      '@fonts': 'fonts',
      '@images': 'images',
      '@scripts': 'scripts',
      '@styles': 'styles'
    },
    extensions: [
      '.wasm', '.mjs',
      '.js',   '.css',
      '.json', '.ts',
      '.tsx'
    ],
    modules: [
      'resources',
      '/Users/kellymears/code/roots/lando-roots/bud/node_modules',
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
      '/Users/kellymears/code/roots/lando-roots/bud/packages/@roots/sage/test/theme'
    ]
  },
  target: 'web',
  watchOptions: { ignored: [ /(node_modules|bower_components)/ ], poll: 1000 },
  optimization: {
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
    minimize: true,
    nodeEnv: 'production'
  },
  resolveLoader: {
    unsafeCache: true,
    mainFields: [ 'loader', 'main' ],
    extensions: [ '.js', '.json' ],
    mainFiles: [ 'index' ]
  }
})