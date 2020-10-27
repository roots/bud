module.exports = () => ({
  entry: {
    foo: [
      'webpack-hot-middleware/client.js?path=http://localhost:3000/__webpack_hmr&timeout=2000',
      'foo.js',
      'foo.scss'
    ]
  },
  mode: 'development',
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
  stats: true,
  target: 'web',
  context: '/Users/kellymears/code/projects/cli/bud/bud/lab/src',
  module: {
    rules: [
      {
        oneOf: [
          {
            exclude: /(node_modules|bower_components)/,
            test: /\.css$/,
            use: [
              {
                ident: 'style',
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/style-loader/dist/cjs.js'
              },
              {
                ident: 'css',
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/css-loader/dist/cjs.js',
                options: { importLoaders: 1 }
              },
              {
                ident: 'postcss',
                loader: '/Users/kellymears/code/projects/cli/bud/bud/packages/extension-postcss/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: true,
                  postcssOptions: {
                    plugins: [
                      'postcss-flexbugs-fixes',
                      [
                        'postcss-preset-env',
                        {
                          autoprefixer: { flexbox: 'no-2009' },
                          stage: 3
                        }
                      ]
                    ]
                  }
                }
              },
              {
                ident: 'resolveUrl',
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/resolve-url-loader/index.js',
                options: { sourceMap: true }
              }
            ]
          },
          {
            test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|ico)$/,
            use: [
              {
                ident: 'file',
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/file-loader/dist/cjs.js',
                options: { name: '[path][name].[ext]' }
              }
            ]
          },
          {
            test: /\.(html?)$/,
            use: {
              ident: 'raw',
              loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/raw-loader/dist/cjs.js'
            }
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            use: [
              {
                ident: 'file',
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/file-loader/dist/cjs.js',
                options: "<<Circular reference to 'config.module.rules.[0].oneOf.[1].use.[0].options'>>"
              }
            ]
          },
          {
            exclude: /(node_modules|bower_components)/,
            test: /\.(js|jsx)$/,
            use: [
              {
                ident: 'babel',
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/babel-loader/lib/index.js',
                options: {
                  presets: [
                    [
                      '/Users/kellymears/code/projects/cli/bud/bud/node_modules/@babel/preset-env/lib/index.js'
                    ]
                  ],
                  plugins: [
                    [
                      '/Users/kellymears/code/projects/cli/bud/bud/node_modules/@babel/plugin-transform-runtime/lib/index.js'
                    ],
                    [
                      '/Users/kellymears/code/projects/cli/bud/bud/node_modules/@babel/plugin-proposal-object-rest-spread/lib/index.js'
                    ],
                    [
                      '/Users/kellymears/code/projects/cli/bud/bud/node_modules/@babel/plugin-syntax-dynamic-import/lib/index.js'
                    ]
                  ]
                }
              }
            ]
          },
          {
            test: /\.svg$/,
            use: [
              {
                ident: 'svg',
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/resolve-url-loader/index.js'
              }
            ]
          },
          {
            exclude: /(node_modules|bower_components)/,
            test: /\.(scss|sass)$/,
            use: [
              {
                ident: 'style',
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/style-loader/dist/cjs.js'
              },
              {
                ident: 'css',
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/css-loader/dist/cjs.js',
                options: { importLoaders: 1 }
              },
              {
                ident: 'postcss',
                loader: '/Users/kellymears/code/projects/cli/bud/bud/packages/extension-postcss/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  postcssOptions: {
                    plugins: [
                      'postcss-flexbugs-fixes',
                      [
                        'postcss-preset-env',
                        {
                          autoprefixer: { flexbox: 'no-2009' },
                          stage: 3
                        }
                      ],
                      {
                        version: '7.0.35',
                        postcssPlugin: 'tailwind',
                        postcssVersion: '7.0.35'
                      }
                    ]
                  }
                }
              },
              {
                ident: 'sass',
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/sass-loader/dist/cjs.js',
                options: {
                  implementation: {
                    info: 'node-sass\t4.14.1\t(Wrapper)\t[JavaScript]\n' +
                      'libsass  \t3.5.5\t(Sass Compiler)\t[C/C++]'
                  }
                }
              },
              {
                ident: 'resolveUrl',
                loader: '/Users/kellymears/code/projects/cli/bud/bud/node_modules/resolve-url-loader/index.js',
                options: { sourceMap: true }
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
  output: {
    path: '/Users/kellymears/code/projects/cli/bud/bud/lab/dist',
    publicPath: '/',
    filename: '[name].js',
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
  plugins: [
    {
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: true,
      cleanOnceBeforeBuildPatterns: [ '**/*' ],
      outputPath: '/Users/kellymears/code/projects/cli/bud/bud/lab/dist'
    },
    { ignorePatterns: [ /\.*\.css.?\.js/, /^\.\/locale$/, /moment$/ ] },
    {
      outputPath: '/Users/kellymears/code/projects/cli/bud/bud/lab',
      name: 'webpack.config.dump',
      depth: 4,
      keepCircularReferences: true
    },
    {
      definitions: {
        env: { PUBLIC_URL: '/', APP_NAME: 'App', APP_DESCRIPTION: 'Test' }
      }
    },
    { fullBuildTimeout: 200, requestTimeout: 10000 },
    {
      options: {
        template: '/Users/kellymears/code/projects/cli/bud/bud/packages/support/publish/template.html',
        filename: 'index.html',
        publicPath: '/',
        inject: 'body',
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
    {
      replacements: {
        env: "<<Circular reference to 'config.plugins.[3].definitions.env'>>"
      }
    },
    {
      opts: {
        publicPath: '/',
        fileName: 'manifest.json',
        transformExtensions: /^(gz|map)$/i,
        writeToFileEmit: true
      }
    },
    {
      nodeModulesPath: '/Users/kellymears/code/projects/cli/bud/bud/lab/node_modules'
    },
    {
      name: 'wordpress-externals',
      options: { name: 'wordpress.json', writeToFileEmit: true },
      output: { name: 'wordpress.json' },
      plugin: { name: 'WordPressExternalsWebpackPlugin', stage: Infinity },
      externalsPlugin: { type: 'this' }
    },
    {
      options: { name: 'entrypoints.json', writeToFileEmit: true },
      output: { name: 'entrypoints.json' },
      plugin: { name: 'EntrypointsManifestPlugin', stage: Infinity }
    },
    { plugin: { name: 'MergedManifestPlugin' } }
  ],
  resolve: {
    extensions: [ 'scss', '.mjs', '.js', '.json', '.css' ],
    modules: [
      '/Users/kellymears/code/projects/cli/bud/bud/lab/src',
      '/Users/kellymears/code/projects/cli/bud/bud/packages',
      '/Users/kellymears/code/projects/cli/bud/bud/node_modules',
      'node_modules'
    ],
    unsafeCache: true,
    mainFiles: [ 'index' ],
    aliasFields: [ 'browser' ],
    mainFields: [ 'browser', 'module', 'main' ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: { reuseExistingChunk: true, minChunks: 2, priority: -20 },
        vendors: {
          automaticNamePrefix: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      },
      chunks: 'async',
      minSize: 10000,
      minChunks: 1,
      maxAsyncRequests: Infinity,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 109,
      maxInitialRequests: Infinity,
      name: true
    },
    moduleIds: 'hashed',
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    providedExports: true,
    namedModules: true,
    namedChunks: true,
    nodeEnv: 'development'
  },
  cache: true,
  resolveLoader: {
    unsafeCache: true,
    mainFields: [ 'loader', 'main' ],
    extensions: [ '.js', '.json' ],
    mainFiles: [ 'index' ],
    roots: [ '/Users/kellymears/code/projects/cli/bud/bud/lab/src' ]
  },
  infrastructureLogging: { level: 'info' }
})
