import {existsSync} from 'fs-extra'
import {argv} from 'yargs'
import {join, resolve} from 'path'

const CWD = process.cwd()

/**
 * Process handling
 */
const mode = argv?.env ? argv.env : 'production'
const inProduction = mode == 'production'
process.env.BABEL_ENV = mode
process.env.NODE_ENV = mode

/**
 * Default paths
 */
const paths = {
  budpack: resolve(__dirname, './../..'),
  project: CWD,
  src: join(CWD, 'src'),
  dist: join(CWD, 'dist'),
  public: `dist`,
}

/**
 * Default features
 */
const features = {
  inProduction,
  mode,
  debug: false,
  watching: !inProduction,
  hot: !inProduction,
  mapped: !inProduction,
  hashed: inProduction,
  minified: inProduction,
}

/**
 * Budpack: Public API
 *
 * The bud object is imported by the the project configuration file
 * before being re-imported during by the build command.
 */

/**
 * Redefine path to compiled assets
 *
 * @param  {string} path
 * @return {object}
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
 * @return {object}
 */
const projectPath = path => {
  bud.options.project = path

  return bud
}

/**
 * Redefine project public path.
 *
 * @param  {string} rel
 * @return {object}
 */
const publicPath = rel => {
  bud.options.public = rel

  return bud
}

/**
 * Absolute path from a dist relative path.
 *
 * @param  {string} path
 * @return {object}
 */
const dist = rel => join(bud.options.dist, rel)

/**
 * Absolute path from a project relative path.
 *
 * @param  {string} path
 * @return {object}
 */
const project = rel => join(bud.options.project, rel)

/**
 * Absolute path from a project relative path.
 *
 * @param  {string} path
 * @return {object}
 */
const src = rel => join(bud.options.src, rel)

/**
 * Define webpack aliases.
 *
 * @param  {object} alias
 * @return {object}
 */
const alias = alias => {
  bud.options.alias = alias

  return bud
}

/**
 * Browsersync
 *
 * @param  {object} options
 * @return {object}
 */
const browserSync = ({proxy, port, host}) => {
  bud.options.browserSync = {
    enabled: !bud.inProduction,
    host: host ? host : 'localhost',
    port: port ? port : 3000,
    proxy: proxy ? proxy : null,
  }

  return bud
}

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
 * Debug mode
 *
 * @param  {bool} true to enable
 * @return {object}
 */
const debug = debug => {
  bud.options.debug = debug

  return bud
}

/**
 * Development mode
 *
 * @param  {object} options
 * @return {object}
 */
const dev = options => {
  bud.options.dev = {
    ...bud.options.dev,
    ...options,
  }

  return bud
}

/**
 * Specify a devtool to use
 *
 * @param  {string} devtool
 * @return {object}
 */
const devtool = devtool => {
  bud.options.devtool = devtool

  return bud
}

/**
 * Entrypoints
 *
 * @param  {string} chunk
 * @param  {array}  entries
 * @return {object}
 */
const entry = (chunk, entries) => {
  bud.options.entry = {
    ...bud.options.entry,
    [`${chunk}`]: entries,
  }

  return bud
}

/**
 * Enable or dispable hashing
 *
 * @param  {bool}   state
 * @return {object}
 */
const hash = state => {
  bud.options.hashed = state

  return bud
}

/**
 * Enable or dispable hot module reloading
 *
 * @param  {bool}   state
 * @return {object}
 */
const hot = state => {
  bud.options.hot = state

  return bud
}

/**
 * Enable or dispable source-maps
 *
 * @param  {bool}   state
 * @return {object}
 */
const maps = state => {
  bud.options.mapped = state

  return bud
}

/**
 * Set maxChunks for code splitting
 *
 * @param  {bool}   state
 * @return {object}
 */
const maxChunks = chunkCount => {
  bud.options.splitting.maxChunks = chunkCount

  return bud
}

/**
 * Enable or dispable minification
 *
 * @param  {bool}   state
 * @return {object}
 */
const mini = state => {
  bud.options.minified = state

  return bud
}

/**
 * Set code splitting options
 *
 * @param  {bool}   state
 * @return {object}
 */
const splitting = state => {
  bud.options.splitting.disabled = state

  return bud
}

/**
 * Set vendor options
 *
 * @param  {bool}   state
 * @return {object}
 */
const vendor = state => {
  bud.options.vendor.disabled = state

  return bud
}

/**
 * Enable or dispable watch mode
 *
 * @param  {bool}   state
 * @return {object}
 */
const watch = state => {
  bud.options.watching = state

  return bud
}

/**
 * Watch mode timeout
 *
 * @param  {number} timeout in ms
 * @return {object}
 */
const watchTimeout = timeout => {
  bud.options.dev.watchOptions.aggregateTimeout = timeout

  return bud
}

/**
 * Configure @wordpress/dependency-extraction-webpack-plugin
 *
 * @param  {object} settings
 * @return {object}
 */
const wpManifest = settings => {
  bud.options.wpManifest = {
    ...bud.options.wpManifest,
    ...settings,
  }

  return bud
}

/**
 * Default options
 */
const options = {
  ...paths,
  ...features,

  /**
   * Loaders
   */
  babel: {
    enabled: existsSync(
      join(paths.project, 'babel.config.js'),
    ),
    configFile:
      existsSync(join(paths.project, 'babel.config.js')) &&
      join(paths.project, 'babel.config.js'),
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
  svg: {
    use: [
      require.resolve('@svgr/webpack'),
      require.resolve('url-loader'),
    ],
  },

  /**
   * Additional config
   */
  browserSync: {
    enabled: false,
    host: 'localhost',
    port: '3000',
    proxy: '',
  },

  /** Copy Webpack Plugin globs */
  copy: {
    patterns: [],
  },

  /** WDS */
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
  devtool: 'cheap-module-source-map',
  entry: {},
  splitting: {
    disabled: false,
    maxChunks: null,
  },
  /** @see WebpackDependencyManifestPlugin */
  wpManifest: {
    useDefaults: true,
    injectPolyfill: false,
    outputFormat: 'json',
  },

  /**
   * Disabled
   * @todo
   */
  vendor: {
    disabled: true,
  },
}

/**
 * The exported configuration tool.
 */
const bud = {
  /** Options container */
  options,

  /** Statuses */
  inProduction,

  /** Pathing API */
  project,
  projectPath,
  src,
  srcPath,
  dist,
  distPath,
  publicPath,

  /** Config API */
  alias,
  browserSync,
  copy,
  debug,
  dev,
  devtool,
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
