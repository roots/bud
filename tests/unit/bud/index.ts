import {Bud, config, factory, Framework} from '@roots/bud'

describe('factory', () => {
  let bud: Framework

  let snapshotConfig = {
    build: {
      bail: true,
      devtool: false,
      experiments: {
        lazyCompilation: false,
      },
      infrastructureLogging: {
        appendOnly: true,
        level: 'none',
      },
      optimization: {
        emitOnErrors: false,
        minimizer: ['...'],
        moduleIds: 'deterministic',
        removeEmptyChunks: true,
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
        pathinfo: false,
      },
      performance: {},
      profile: false,
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
        ],
      },
      stats: {},
    },
    cli: false,
    clean: true,
    debug: true,
    discover: false,
    extension: {
      cleanWebpackPlugin: {
        cleanOnceBeforeBuildPatterns: ['**/*', '!dll'],
        cleanStaleWebpackAssets: true,
        protectWebpackAssets: true,
      },
      cssMinimizerWebpackPlugin: {
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
      },
      'html-webpack-plugin': {
        alwaysWriteToDisk: true,
        inject: true,
        minify: {
          collapseWhitespace: false,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      },
      'interpolate-html-plugin': {
        replace: {},
      },
      miniCssExtractPlugin: {},
      'webpack-config-dump-plugin': {
        depth: 8,
        keepCircularReferences: true,
      },
      webpackDefinePlugin: {},
      webpackManifestPlugin: {
        fileName: 'manifest.json',
        writeToFileEmit: true,
      },
      webpackProvidePlugin: {},
    },
    fileFormat: '[name]',
    hash: false,
    hashFormat: '[name].[contenthash:6]',
    html: false,
    install: false,
    location: {
      dist: 'dist',
      modules: 'node_modules',
      project: expect.any(String),
      publicPath: '',
      src: 'src',
      storage: '.budfiles',
    },
    log: false,
    manifest: true,
    minimize: true,
    name: 'bud',
    patterns: {
      css: /\\\\\\.css\\$/,
      cssModule: /\\\\\\.module\\\\\\.css\\$/,
      csv: /\\\\\\.\\(csv\\|tsv\\)\\$/,
      font: /\\\\\\.\\(ttf\\|otf\\|eot\\|woff2\\?\\|ico\\)\\$/,
      html: /\\\\\\.\\(html\\?\\)\\$/,
      image: /\\\\\\.\\(png\\|jpe\\?g\\|gif\\)\\$/,
      js: /\\\\\\.\\(js\\|jsx\\)\\$/,
      json: /\\\\\\.json\\$/,
      json5: /\\\\\\.json5\\$/,
      md: /\\\\\\.md\\$/,
      modules: /\\(node_modules\\|bower_components\\)/,
      sass: /\\\\\\.\\(scss\\|sass\\)\\$/,
      sassModule: /\\\\\\.module\\\\\\.\\(scss\\|sass\\)\\$/,
      svg: /\\\\\\.svg\\$/,
      toml: /\\\\\\.toml\\$/,
      ts: /\\\\\\.\\(ts\\|tsx\\)\\$/,
      vue: /\\\\\\.vue\\$/,
      xml: /\\\\\\.xml\\$/,
      yml: /\\\\\\.\\(yaml\\|yml\\)\\$/,
    },
    server: {
      browser: {
        indicator: true,
        log: true,
        overlay: true,
      },
      host: 'localhost',
      methods: ['GET', 'HEAD'],
      middleware: {
        dev: true,
        hot: true,
        proxy: false,
      },
      port: 3000,
      proxy: {
        host: 'localhost',
        port: 8000,
      },
      watch: {
        files: [],
        options: {},
      },
    },
    theme: {
      colors: {
        accent: '#ff69b4',
        error: '#dc3545',
        errorAlt: '#b22222',
        faded: '#6C758F',
        flavor: '#78C5D7',
        foreground: '#FFFFFF',
        primary: '#545DD7',
        primaryAlt: '#663399',
        success: '#46D46A',
        warning: '#FF611A',
      },
      columns: 12,
      maxHeight: 999,
      maxWidth: 80,
      screens: [
        [0, 40],
        [41, 60],
        [61, 80],
        [81, 200],
      ],
      spacing: 1,
    },
  }

  beforeAll(() => {
    bud = factory()
  })

  afterAll(done => {
    bud.close(done)
  })

  it('is a function', () => {
    expect(factory).toBeInstanceOf(Function)
  })

  it('makes a new instace of bud', () => {
    expect(bud).toBeInstanceOf(Bud)
  })

  it('config matches snapshot', () => {
    expect(config).toMatchSnapshot(snapshotConfig)
  })

  it('bud.store matches snapshot', () => {
    expect(bud.store.all()).toMatchSnapshot({
      ...snapshotConfig,
    })
  })
})
