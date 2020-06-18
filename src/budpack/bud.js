/**
 * bud public api
 *
 * imported by project bud.config.js to be configured
 * the end result is exported from bud.config.js for use in the main build process
 */

const api = require('./api')
const { join, resolve } = require('path')

/**
 * Mode
 */
const inProduction = true

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
const projectPath = rel => {
  bud.options.project = rel

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
 * Babel options
 *
 * @param  {object} options
 * @return {object} bud
 */
const babel = options => {
  bud.options.babel = api.babel(options)

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
 * PostCSS options
 *
 * @prop   {bool}   enabled
 * @return {object} bud
 */
const postcss = ({enabled}) => {
  bud.options.postcss = api.postcss({
    budpack: bud.options.budpack,
    project: bud.options.project,
    enabled: enabled,
  })

  return bud
}

/**
 * Eslint options
 *
 * @prop   {bool}   enabled
 * @return {object} bud
 */
const eslint = ({enabled}) => {
  bud.options.eslint = api.eslint({
    budpack: bud.options.budpack,
    project: bud.options.project,
    enabled: enabled,
  })

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
  public: 'dist'
}

/**
 * Default options
 */
const options = {
  ...paths,
  babel: api.babel({
    react: false,
    dynamicImport: true,
    cacheDirectory: true,
    transformRuntime: true,
  }),
  copy: {
    patterns: [],
  },
  dev: {
    host: 'localhost',
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    disableHostCheck: true,
    hot,
    watchOptions: {
      aggregateTimeout: 300,
    },
  },
  entry: {},
  eslint: api.eslint({
    ...paths,
    enabled: true,
  }),
  postcss: api.postcss({
    ...paths,
    enabled: true,
  }),
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
  babel,
  copy,
  dev,
  entry,
  eslint,
  hash,
  hot,
  maps,
  maxChunks,
  mini,
  postcss,
  splitting,
  vendor,
  watch,
  watchTimeout,
  wpManifest,
}

module.exports = bud
