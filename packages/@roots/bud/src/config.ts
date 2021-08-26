import {Configuration as BaseConfig} from '@roots/bud-framework'

interface config extends BaseConfig {}

const config: config = {
  name: 'bud',

  ci: false,
  clean: true,
  debug: true,
  discover: false,
  hash: false,
  html: false,
  install: false,
  log: false,
  manifest: true,
  minimize: true,

  fileFormat: '[name]',
  hashFormat: '[name].[contenthash:6]',

  patterns: {
    js: /\.(js|jsx)$/,
    ts: /\.(ts|tsx)$/,
    sass: /\.(scss|sass)$/,
    sassModule: /\.module\.(scss|sass)$/,
    css: /\.css$/,
    cssModule: /\.module\.css$/,
    font: /\.(ttf|otf|eot|woff2?|ico)$/,
    html: /\.(html?)$/,
    image: /\.(png|jpe?g|gif)$/,
    modules: /(node_modules|bower_components)/,
    svg: /\.svg$/,
    vue: /\.vue$/,
    md: /\.md$/,
    toml: /\.toml$/,
    yml: /\.(yaml|yml)$/,
    xml: /\.xml$/,
    csv: /\.(csv|tsv)$/,
    json: /\.json$/,
    json5: /\.json5$/,
  },

  location: {
    project: process.cwd(),
    src: 'src',
    dist: 'dist',
    modules: 'node_modules',
    publicPath: '',
    storage: '.budfiles',
  },

  build: {
    bail: true,
    devtool: false,
    infrastructureLogging: {
      level: 'none',
      appendOnly: true,
    },
    experiments: {
      lazyCompilation: false,
    },
    node: false,
    output: {
      pathinfo: false,
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
            test: /[\\/]node_modules[\\/]/,
            reuseExistingChunk: true,
            priority: -10,
            filename: `vendor/[name].js`,
          },
        },
      },
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

  extension: {
    cleanWebpackPlugin: {
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll'],
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
    webpackConfigDumpPlugin: {
      keepCircularReferences: true,
      depth: 8,
    },
    webpackDefinePlugin: {},
    webpackManifestPlugin: {
      fileName: 'manifest.json',
      writeToFileEmit: true,
    },
    webpackProvidePlugin: {},
  },

  server: {
    watch: {
      files: [],
      options: {},
    },
    middleware: {
      dev: true,
      hot: true,
      proxy: false,
    },
    browser: {
      indicator: true,
      overlay: true,
      log: true,
    },
    proxy: {
      host: 'localhost',
      port: 8000,
    },
    host: 'localhost',
    port: 3000,
    methods: ['GET', 'HEAD'],
  },

  theme: {
    spacing: 1,
    colors: {
      foreground: '#FFFFFF',
      faded: '#6C758F',
      primary: '#545DD7',
      primaryAlt: '#663399',
      error: '#dc3545',
      errorAlt: '#b22222',
      warning: '#FF611A',
      success: '#46D46A',
      accent: '#ff69b4',
      flavor: '#78C5D7',
    },
    screens: [
      [0, 40],
      [41, 60],
      [61, 80],
      [81, 200],
    ],
    columns: 12,
    maxWidth: 80,
    maxHeight: 999,
  },
}

export {config}
