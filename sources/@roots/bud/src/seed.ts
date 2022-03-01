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
    dashboard: true,

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
    webp: /\.webp$/,
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
    module: {
      unsafeCache: false,
    },
    node: false,
    output: {
      pathinfo: false,
      publicPath: 'auto',
    },
    optimization: {
      emitOnErrors: false,
      enable: false,
      minimizer: ['...'],
      removeEmptyChunks: true,
      splitChunks: {},
    },
    parallelism: Math.max(cpus().length - 1, 1),
    performance: {
      hints: false,
    },
    resolve: {
      alias: {},
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
      preset: 'normal',
    },
  },
}
