import type {Store} from '@roots/bud-framework'
import {cpus} from 'os'

/**
 * Bud configuration defaults
 *
 * @public
 */
export const seed: Partial<Store.Repository> = {
  /**
   * bud.name property
   *
   * @public
   */
  name: 'bud',

  /**
   * Compilation mode
   *
   * @public
   */
  mode: 'production',

  /**
   * Logging settings
   *
   * @public
   */
  log: {
    /**
     * Log level
     *
     * @public
     */
    level: 'vvv',
  },

  /**
   * Feature flags
   *
   * @public
   */
  features: {
    /**
     * Webpack caching enabled
     *
     * @public
     */
    cache: true,

    /**
     * Dashboard enabled
     *
     * @public
     */
    dashboard: false,

    /**
     * Clean dist directory prior to compilation
     *
     * @public
     */
    clean: true,

    /**
     * Hash emitted filenames
     *
     * @public
     */
    hash: false,

    /**
     * Emit an html file during compilation
     *
     * @public
     */
    html: false,

    /**
     * Automatically register installed extensions
     *
     * @public
     */
    inject: true,

    /**
     * Log build status informatino to the terminal
     *
     * @public
     */
    log: false,

    /**
     * Emit a manifest.json with references to emitted assets
     *
     * @public
     */
    manifest: true,

    /**
     * @public
     */
    runtimeChunk: false,

    /**
     * Enable code splitting
     *
     * @public
     */
    splitChunks: false,
  },

  /**
   * Cache settings
   *
   * @public
   */
  cache: {
    /**
     * Cache strategy
     *
     * @remarks
     * One of: 'filesystem', 'memory', or false
     *
     * @public
     */
    type: 'filesystem',
  },

  /**
   * Filename format for emitted assets when hashing is disabled
   *
   * @public
   */
  fileFormat: '[name]',

  /**
   * Filename format for emitted assets when hashing is enabled
   *
   * @public
   */
  hashFormat: '[name].[contenthash:6]',

  /**
   * Received command line arguments and flags
   *
   * @public
   */
  cli: {
    /**
     * Arguments
     *
     * @public
     */
    args: {},
    /**
     * Argv object reference
     *
     * @public
     */
    argv: [],
    /**
     * Flags
     *
     * @public
     */
    flags: {},
    /**
     * Raw data from oclif
     *
     * @public
     */
    raw: [],
    /**
     * Additional information on received CLI data
     *
     * @public
     */
    metadata: {},
  },

  /**
   * Regular expression records
   *
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

  /**
   * Project disk locations
   *
   * @public
   */
  location: {
    project: process.cwd(),
    src: 'src',
    dist: 'dist',
    modules: 'node_modules',
    storage: '.budfiles',
    publicPath: '',
  },

  /**
   * Baseline webpack configuration
   *
   * @public
   */
  build: {
    bail: true,
    devtool: false,
    infrastructureLogging: {console: false},
    node: false,
    output: {
      publicPath: 'auto',
    },
    optimization: {
      emitOnErrors: false,
      minimizer: ['...'],
      removeEmptyChunks: true,
      splitChunks: {},
    },
    parallelism: cpus().length - 1,
    performance: {
      hints: false,
    },
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
      assets: true,
      cached: true,
      chunks: false,
      chunkModules: false,
      colors: true,
      children: true,
      errors: true,
      hash: true,
      modules: false,
      outputPath: true,
      entrypoints: false,
      performance: false,
      warnings: true,
    },
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

    dev: {
      url: 'http://localhost:3000',
    },

    proxy: {
      url: 'http://localhost',
      replace: {
        href: true,
        window: true,
        publicPath: true,
      },
    },
  },

  /**
   * Terminal styling
   */
  theme: {
    spacing: 1,
    colors: {
      foreground: '#FFFFFF',
      faded: '#6C758F',
      primary: '#663399',
      primaryAlt: '#545DD7',
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
