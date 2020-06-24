import {existsSync} from 'fs-extra'
import {argv} from 'yargs'
import {join, resolve} from 'path'

/**
 * Budpack: Public API
 *
 * The bud object is imported by the the project configuration file
 * before being re-imported during by the build command.
 */

/**
 * Mode
 */
const inProduction =
  argv?.env !== 'development' ? true : false

/**
 * Redefine path to compiled assets
 *
 * @param  {string} path
 * @return {object} bud
 */
const distPath = rel => {
  bud.options.dist = join(bud.options.project, rel)

  return bud
}

/**
 * Redfine path to src assets
 */
const srcPath = rel => {
  bud.options.src = join(bud.options.project, rel)

  return bud
}

/**
 * Redefine project context
 *
 * @param  {string} path
 * @return {object} bud
 */
const projectPath = path => {
  bud.options.project = path

  return bud
}

const publicPath = rel => {
  bud.options.public = rel

  return bud
}

/**
 * Absolute path from a dist relative path.
 *
 * @param  {string} path
 * @return {object} bud
 */
const dist = rel => join(bud.options.dist, rel)

/**
 * Absolute path from a project relative path.
 *
 * @param  {string} path
 * @return {object} bud
 */
const project = rel => join(bud.options.project, rel)

/**
 * Absolute path from a project relative path.
 *
 * @param  {string} path
 * @return {object} bud
 */
const src = rel => join(bud.options.src, rel)

/**
 * Produce an absolute path from a project relative path
 *
 * @param  {string} relPath
 * @return {string}
 */
const copy = assetsPath => {
  bud.options.copy.patterns.push({
    from: assetsPath,
    to: bud.options.dist,
  })

  return bud
}

/**
 * Define webpack aliases.
 *
 * @param  {object} alias
 * @return {object} bud
 */
const alias = alias => {
  bud.options.alias = alias

  return bud
}

/**
 * Development mode
 *
 * @param  {object} options
 * @return {object} bud
 */
const dev = options => {
  bud.options.dev = {
    ...bud.options.dev,
    ...options,
  }

  return bud
}

/**
 * Browsersync
 *
 * @param  {object} options
 * @return {object} bud
 */
const browserSync = options => {
  bud.options.browserSync = {
    enabled: options?.enabled ? options.enabled : true,
    host: options?.host ? options.host : 'localhost',
    port: options?.port ? options.port : 3000,
    proxy: options?.proxy ? options.proxy : null,
  }

  return bud
}

/**
 * Watch mode timeout
 *
 * @param  {number} timeout in ms
 * @return {object} bud
 */
const watchTimeout = timeout => {
  bud.options.dev.watchOptions.aggregateTimeout = timeout

  return bud
}

/**
 * Entrypoints
 *
 * @param  {string} chunk
 * @param  {array}  entries
 * @return {object} bud
 */
const entry = (chunk, entries) => {
  bud.options.entry = {
    ...bud.options.entry,
    [`${chunk}`]: entries,
  }

  return bud
}

/**
 * Configure @wordpress/dependency-extraction-webpack-plugin
 *
 * @param  {object} settings
 * @return {object} bud
 */
const wpManifest = settings => {
  bud.options.wpManifest = {
    ...bud.options.wpManifest,
    ...settings,
  }

  return bud
}

/**
 * Set vendor options
 *
 * @param  {bool}   state
 * @return {object} bud
 */
const vendor = state => {
  bud.options.vendor.disabled = state

  return bud
}

/**
 * Set maxChunks for code splitting
 *
 * @param  {bool}   state
 * @return {object} bud
 */
const maxChunks = chunkCount => {
  bud.options.splitting.maxChunks = chunkCount

  return bud
}

/**
 * Set code splitting options
 *
 * @param  {bool}   state
 * @return {object} bud
 */
const splitting = state => {
  bud.options.splitting.disabled = state

  return bud
}

/**
 * Enable or dispable hashing
 *
 * @param  {bool}   state
 * @return {object} bud
 */
const hash = state => {
  bud.options.hashed = state

  return bud
}

/**
 * Enable or dispable source-maps
 *
 * @param  {bool}   state
 * @return {object} bud
 */
const maps = state => {
  bud.options.mapped = state

  return bud
}

/**
 * Enable or dispable minification
 *
 * @param  {bool}   state
 * @return {object} bud
 */
const mini = state => {
  bud.options.minified = state

  return bud
}

/**
 * Enable or dispable hot module reloading
 *
 * @param  {bool}   state
 * @return {object} bud
 */
const hot = state => {
  bud.options.hot = state

  return bud
}

/**
 * Enable or dispable watch mode
 *
 * @param  {bool}   state
 * @return {object} bud
 */
const watch = state => {
  bud.options.watching = state

  return bud
}

/**
 * Default paths
 */
const paths = {
  budpack: resolve(__dirname, './../..'),
  project: process.cwd(),
  assets: 'resources/assets',
  src: join(process.cwd(), 'src'),
  dist: join(process.cwd(), 'dist'),
  public: `dist`,
}

/**
 * Default options
 */
const options = {
  ...paths,
  babel: {
    enabled: existsSync(
      join(paths.project, 'babel.config.js'),
    ),
    configFile:
      existsSync(join(paths.project, 'babel.config.js')) &&
      join(paths.project, '.eslintrc.js'),
  },
  eslint: {
    enabled: existsSync(
      join(paths.project, '.eslintrc.js'),
    ),
    configFile:
      existsSync(join(paths.project, '.eslintrc.js')) &&
      join(paths.project, '.eslintrc.js'),
  },
  postcss: {
    enabled: existsSync(
      join(paths.project, 'postcss.config.js'),
    ),
    configFile:
      existsSync(
        join(paths.project, 'postcss.config.js'),
      ) && join(paths.project, 'postcss.config.js'),
  },
  browserSync: {
    enabled: false,
    host: 'localhost',
    port: '3000',
    proxy: '',
  },
  dev: {
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
    },
  },
  mode: argv.development ? 'development' : 'production',
  copy: {
    patterns: [],
  },
  entry: {},
  splitting: {
    disabled: false,
    maxChunks: null,
  },
  svg: {
    use: [
      require.resolve('@svgr/webpack'),
      require.resolve('url-loader'),
    ],
  },
  vendor: {
    disabled: false,
  },
  wpManifest: {
    useDefaults: true,
    injectPolyfill: false,
    outputFormat: 'json',
  },
  inProduction,
  watching: !inProduction,
  hot: !inProduction,
  mapped: !inProduction,
  hashed: inProduction,
  minified: inProduction,
}

/**
 * The exported configuration tool.
 */
const bud = {
  /** Options container */
  options,

  /** Statuses */
  inProduction,

  /** Pathing */
  project,
  projectPath,
  src,
  srcPath,
  dist,
  distPath,
  publicPath,

  /** API */
  alias,
  browserSync,
  copy,
  dev,
  entry,
  hash,
  hot,
  maps,
  maxChunks,
  mini,
  splitting,
  vendor,
  watch,
  watchTimeout,
  wpManifest,
}

module.exports = bud
