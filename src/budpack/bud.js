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
  wpManifest: true,
}

/**
 * Config files
 */
const configs = {
  babel: existsSync(join(paths.project, 'babel.config.js'))
    ? join(paths.project, 'babel.config.js')
    : null,
  eslint: existsSync(join(paths.project, '.eslintrc.js'))
    ? join(paths.project, '.eslintrc.js')
    : null,
  postcss: existsSync(join(paths.project, 'postcss.config.js'))
    ? join(paths.project, 'postcss.config.js')
    : null,
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
    configFile: configs.babel,
    options: configs.babel
      ? require(configs.babel)
      : {presets: [], plugins: []},
  },
  eslint: {
    enabled: configs.eslint ? true : false,
    configFile: configs.eslint,
    options: {},
  },
  postcss: {
    configFile: configs.postcss,
    options: configs.postcss
      ? require(configs.postcss)
      : {plugins: []},
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
  auto: {},
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
  groups: [],
  share: {},
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
  vendor: true,
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
 * Absolute path from a project relative path to a budpack file
 *
 * @param  {string} path
 * @return {object}
 */
const preset = rel => require(join(bud.options.budpack, 'config', rel))

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
 * Autoload (ProvidePlugin)
 *
 * @param  {object} autoload
 * @return {object}
 */
const auto = auto => {
  Object.entries(auto).forEach(([key, value]) => {
    value.forEach(handle => {
      bud.options.auto = {
        ...bud.options.auto,
        [handle]: key,
      }
    })
  })

  return bud
}

/**
 * Babel
 *
 * @param  {object} config babel config
 * @return {object}
 */
const babel = config => {
  bud.options.babel.options = {
    ...bud.options.babel.options,
    presets: [
      ...bud.options.babel.options.presets,
      ...(config.presets ? config.presets : []),
    ],
    plugins: [
      ...bud.options.babel.options.plugins,
      ...(config.plugins ? config.plugins : []),
    ],
  }

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
 * Bundle
 *
 * @param  {string} chunk
 * @param  {array}  entries
 * @return {object}
 */
const bundle = (to, from) => {
  const assets = from.map(asset => src(asset))

  bud.options.entry = {
    ...bud.options.entry,
    [`${to}`]: assets,
  }

  return bud
}

/**
 * Copy a file
 *
 * @param  {string} relPath
 * @return {string}
 */
const copy = (from, to = null) => {
  bud.options.copy.patterns.push({from, to})

  return bud
}

/**
 * Copy all files within a dir
 *
 * @param  {string} relPath
 * @return {string}
 */
const copyAll = (from, to = null) => {
  bud.options.copy.patterns.push({
    from: '**/*',
    context: src(from),
    to: to ? dist(to) : bud.options.dist,
    globOptions: {
      ignore: '.*',
    },
    noErrorOnMissing: true,
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
 * Babel
 *
 * @param  {object} config babel config
 * @return {object}
 */
const postcss = config => {
  bud.options.postcss.options = {
    ...bud.options.postcss.options,
    ...(config ? config : []),
    plugins: [
      ...bud.options.postcss.options.plugins,
      ...(config.plugins ? config.plugins : []),
    ],
  }

  return bud
}

/**
 * Purge
 *
 * @param  {object} config babel config
 * @return {object}
 */
const purge = config => {
  bud.options.postcss.options = {
    ...bud.options.postcss.options,
    plugins: [
      ...bud.options.postcss.options.plugins,
      require('@fullhuman/postcss-purgecss')({...config}),
    ],
  }

  return bud
}

/**
 * Babel
 *
 * @param  {object} config babel config
 * @return {object}
 */
const share = config => {
  bud.options.share = {
    ...bud.options.share,
    ...config,
  }

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
 * Babel
 *
 * @param  {object} config babel config
 * @return {object}
 */
const translate = translation => {
  bud.options.babel.options = {
    ...bud.options.babel.options,
    plugins: [
      ...bud.options.babel.options.plugins,
      [require('@wordpress/babel-plugin-makepot'),
        {output: bud.project(translation)},
      ],
    ],
  }

  return bud
}

/**
 * Set vendor options
 *
 * @param  {bool}   state
 * @return {object}
 */
const vendor = state => {
  bud.options.vendor = state

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
  settings !== false
    ? bud.options.wpManifest = {
      ...bud.options.wpManifest,
      ...settings,
    }
    : bud.options.wpManifest.enabled == false

  return bud
}

/**
 * The exported configuration tool.
 */
const bud = {
  /** Options container */
  options,

  /** Statuses */
  inProduction,

  /** Paths */
  paths,
  /** Getters */
  project,
  src,
  dist,
  preset,

  /** Setters */
  projectPath,
  srcPath,
  distPath,
  publicPath,

  /** Config API */
  alias,
  auto,
  babel,
  browserSync,
  bundle,
  copy,
  copyAll,
  debug,
  dev,
  devtool,
  hash,
  hot,
  maps,
  maxChunks,
  mini,
  postcss,
  purge,
  share,
  splitting,
  translate,
  vendor,
  watch,
  watchTimeout,
  wpManifest,
}

module.exports = bud
