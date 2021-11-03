import type {Configuration} from '@roots/bud-framework'
import {cpus} from 'os'

/**
 * {@inheritDoc @roots/bud-framework#Configuration}
 *
 * @public @config
 */
export const config: Configuration = {
  /**
   * {@inheritDoc @roots/bud-framework#Configuration.name}
   * @public
   */
  name: 'bud',

  /**
   * Is webpack caching enabled?
   *
   * @public
   */
  cache: false,

  /**
   * Clear bud cache on framework initialization?
   *
   * @public
   */
  clearCache: false,

  /**
   * {@inheritDoc @roots/bud-framework#Configuration.ci}
   * @public
   */
  ci: true,

  /**
   * {@inheritDoc @roots/bud-framework#Configuration.clean}
   * @public
   */
  clean: true,

  /**
   * {@inheritDoc @roots/bud-framework#Configuration.debug}
   * @public
   */
  debug: true,

  /**
   * {@inheritDoc @roots/bud-framework#Configuration.dev}
   * @public
   */
  discover: false,

  /**
   * {@inheritDoc @roots/bud-framework#Configuration.hash}
   * @public
   */
  hash: false,

  /**
   * {@inheritDoc @roots/bud-framework#Configuration.html}
   * @public
   */
  html: false,

  /**
   * {@inheritDoc @roots/bud-framework#Configuration.install}
   * @public
   */
  install: false,

  /**
   * {@inheritDoc @roots/bud-framework#Configuration.log}
   * @public
   */
  log: false,

  /**
   * {@inheritDoc @roots/bud-framework#Configuration.manifest}
   * @public
   */
  manifest: true,

  /**
   * Split chunks?
   *
   * @public
   */
  splitChunks: false,

  /**
   * {@inheritDoc @roots/bud-framework#Configuration.fileFormat}
   * @public
   */
  fileFormat: '[name]',

  /**
   * {@inheritDoc @roots/bud-framework#Configuration.hashFormat}
   * @public
   */
  hashFormat: '[name].[contenthash:6]',

  /**
   * {@inheritDoc @roots/bud-framework#Configuration.patterns}
   * @public
   */
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
    yml: /\.ya?ml$/,
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
      console: false,
    },
    node: false,
    output: {
      publicPath: '',
    },
    optimization: {
      emitOnErrors: false,
      minimizer: ['...'],
      moduleIds: 'deterministic',
      removeEmptyChunks: true,
      splitChunks: false,
    },
    parallelism: cpus().length - 1,
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
        '.yml',
        '.yaml',
        '.xml',
      ],
    },
    stats: {
      logging: false,
    },
  },

  extension: {
    'clean-webpack-plugin': {
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll'],
    },
    'copy-webpack-plugin': {patterns: []},
    'html-webpack-plugin': {
      alwaysWriteToDisk: true,
      inject: true,
    },
    'interpolate-html-plugin': {},
    'mini-css-extract-plugin': {},
    'webpack-config-dump-plugin': {
      showFunctionNames: true,
      keepCircularReferences: true,
      depth: 8,
    },
    'webpack-define-plugin': {},
    'webpack-manifest-plugin': {
      fileName: 'manifest.json',
      writeToFileEmit: true,
    },
    'webpack-provide-plugin': {},
  },

  server: {
    watch: {
      files: [],
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
      target: 'localhost:3000',
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
    maxWidth: 140,
    maxHeight: 999,
  },
}
