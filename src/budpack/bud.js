/**
 *  @overview The Bud Asset Management API
 *
 *  @author   Kelly Mears <kelly@roots.io>
 *
 *  @requires NPM:fs-extra
 *  @requires NPM:yargs
 *  @requires NPM:@svgr/webpack
 *  @requires NPM:url-loader
 *  @requires NPM:@fullhuman/postcss-purgecss
 *  @requires NPM:@wordpress/babel-plugin-makepot
 *  @requires path/to/file:your_module_2
 */

import {existsSync} from 'fs-extra'
import {argv} from 'yargs'
import {join, resolve} from 'path'

/**
 * Current working dir.
 * @type {string}
 */
const CWD = process.cwd()

/**
 * Build mode
 * @type {string}
 */
const mode = argv?.env ? argv.env : 'production'

/**
 * @typedef {boolean.<inProduction>}
 * @description rue if production mode enabled.
 */
const inProduction = mode == 'production'

process.env.BABEL_ENV = mode
process.env.NODE_ENV = mode

/**
 * Paths
 * @typedef  {Object.<paths>}
 * @property {string} budpack - module root path
 * @property {string} project - project root path
 * @property {string} src     - project src path
 * @property {string} dist    - project dist path
 * @property {string} public  - project public path
 */
const paths = {
  budpack: resolve(__dirname, './../..'),
  project: CWD,
  src: join(CWD, 'src'),
  dist: join(CWD, 'dist'),
  public: `dist`,
}

/**
 * Default features.
 * @typedef  {Object.<features>}
 * @property {boolean.<inProduction>}
 * @property {string}  mode - current environment (development, production)
 * @property {boolean} debug - true if debug enabled
 * @property {boolean} watching - true if watch mode enabled
 * @property {boolean} hot - true if HMR enabled
 * @property {boolean} hashed - true if file hashing enabled
 * @property {boolean} minified - true if minification enabled
 * @property {boolean} wpManifest - true if @wordpress/webpack-dependency-extraction-plugin enabled
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
 * Project config files.
 *
 * @typedef  {Object.<configs>}
 * @property {string|null} babel - project babel.config.js
 * @property {string|null} eslint - project .eslintrc.js
 * @property {string|null} postcss - project postcss.config.js
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
 * Default options.
 *
 * @typedef  {Object.<options>}
 * @property {Object.<paths>}
 * @property {Object.<features>}
 * @property {Object}  babel - babel configuration
 * @property {Objecct} eslint - eslint configuration
 */
const options = {
  ...paths,
  ...features,

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
  splitting: {
    disabled: false,
    maxChunks: null,
  },
  wpManifest: {
    useDefaults: true,
    injectPolyfill: false,
    outputFormat: 'json',
  },
  vendor: true,
}

/**
 * Set directory containing compiled assets.
 *
 * @typedef     {func.<distPath>} distPath
 * @param       {string} dir
 * @return      {Object.<Bud>} bud
 */
const distPath = rel => {
  Bud.options.dist = join(Bud.options.project, rel)

  return Bud
}

/**
 * @typedef     {func.<srcPath>}
 * @description Set directory containing source assets.
 * @param       {string} dir
 * @return      {Object.<Bud>} Bud instance
 */
const srcPath = dir => {
  Bud.options.src = join(Bud.options.project, dir)

  return Bud
}

/**
 * @typedef     {func.<projectPath>}
 * @description Set the project root directory.
 * @param       {string} dir
 * @return      {Object.<Bud>} Bud instance
 */
const projectPath = dir => {
  Bud.options.project = dir

  return Bud
}

/**
 * @typedef     {func.<publicPath}
 * @description Set the project public path.
 * @param       {string} dir - relative
 * @return      {Object.<Bud>} Bud instance
 */
const publicPath = dir => {
  Bud.options.public = dir

  return Bud
}

/**
 * Retrieve the absolute path using a dist relative path.
 * @typedef     {func.<dist>} dist
 * @param       {string} dir - relative path from dist directory
 * @return      {string} absolutePath
 */
const dist = dir => join(Bud.options.dist, dir)

/**
 * Retrieve the absolute path from a project relative path.
 * @typedef {func.<project>} project
 * @param   {string}         path - relative path from project root
 * @return  {string}         absolutePath
 */
const project = rel => join(Bud.options.project, rel)

/**
 * Path to a preset configuration provided for developer convenience.
 * @see @roots/bud-support/config
 * @typedef {func.<preset>} preset
 * @param   {string} path - a bud preset config file
 * @return  {string} absolutePath
 */
const preset = rel => require(join(Bud.options.budpack, 'config', rel))

/**
 * Retrieve the absolute path from a src relative path.
 * @typedef {func.<src>} src
 * @param  {string} path
 * @return {string}
 */
const src = rel => join(Bud.options.src, rel)

/**
 * Define webpack aliases.
 * @typedef {func.<alias>} alias
 * @param  {object} alias
 * @return {Object.<Bud>} Bud instance
 */
const alias = alias => {
  Bud.options.alias = alias

  return Bud
}

/**
 * Automatically load modules instead of needing to import them.
 * @typedef {func.<auto>}            auto
 * @param   {Object.<string, array>} identifier - modules
 * @return  {Object.<Bud>}           Bud instance
 */
const auto = auto => {
  Object.entries(auto).forEach(([key, value]) => {
    value.forEach(handle => {
      Bud.options.auto = {
        ...Bud.options.auto,
        [handle]: key,
      }
    })
  })

  return Bud
}

/**
 * Configure Babel.
 *
 * If you prefer, you may utilize a babel.config.js file in the project root,
 * either alongside or in lieue of this configuration.
 *
 * Conflicts between supplied configs will be resolved in favor of bud.config.js.
 *
 * @typedef {func.<babel>}          babel
 * @param   {Object.<array, array>} {@link https://babeljs.io/docs/en/configuration}
 * @return  {Object.<Bud>}          Bud instance
 */
const babel = config => {
  Bud.options.babel.options = {
    ...Bud.options.babel.options,
    presets: [
      ...Bud.options.babel.options.presets,
      ...(config.presets ? config.presets : []),
    ],
    plugins: [
      ...Bud.options.babel.options.plugins,
      ...(config.plugins ? config.plugins : []),
    ],
  }

  return Bud
}

/**
 * Configure BrowserSync live reload.
 *
 * @typedef  {func.<sync>} sync
 * @param    {string}  [host='localhost']
 * @param    {number}  [port=3000]
 * @param    {boolean} [enabled=!bud.inProduction]
 * @param    {string}  [proxy='']
 * @return   {Object.<Bud>} Bud instance
 */
const sync = ({proxy, port, host}) => {
  Bud.options.browserSync = {
    enabled: !Bud.inProduction,
    host: host ? host : 'localhost',
    port: port ? port : 3000,
    proxy: proxy ? proxy : null,
  }

  return Bud
}

/**
 * Bundle assets
 *
 * @typedef {func.<bundle>} bundle
 * @param  {string}         name    - output name.
 * @param  {array}          entries - array of src assets to include in the bundle.
 * @return {Object.<Bud>}   Bud instance
 */
const bundle = (to, from) => {
  const assets = from.map(asset => src(asset))

  Bud.options.entry = {
    ...Bud.options.entry,
    [`${to}`]: assets,
  }

  return Bud
}

/**
 * Copy a file from a src to dist.
 * @typedef {func.<copy>}  copy
 * @param   {string}       src - copy from
 * @param   {string}       dist - copy to
 * @return  {Object.<Bud>} Bud instance
 */
const copy = (from, to = null) => {
  Bud.options.copy.patterns.push({from, to})

  return Bud
}

/**
 * Copy all files within a source directory to a dist directory.
 * @typedef {func.<copyAll>} copyAll
 * @param   {string}         src  - copy from
 * @param   {string}         dist - copy to
 * @return  {Object.<Bud>}   Bud instance
 */
const copyAll = (from, to = null) => {
  Bud.options.copy.patterns.push({
    from: '**/*',
    context: src(from),
    to: to ? dist(to) : Bud.options.dist,
    globOptions: {
      ignore: '.*',
    },
    noErrorOnMissing: true,
  })

  return Bud
}

/**
 * Debug mode
 * @typedef {func.<debug>} debug
 * @param   {boolean}      enabled - true to enable debug mode
 * @return  {Object.<Bud>} Bud instance
 */
const debug = debug => {
  Bud.options.debug = debug

  return Bud
}

/**
 * Development mode
 * @typedef {func.<dev>}   dev
 * @param   {Object}       options
 * @return  {Object.<Bud>} Bud instance
 */
const dev = options => {
  Bud.options.dev = {
    ...Bud.options.dev,
    ...options,
  }

  return Bud
}

/**
 * Specify webpack devtool
 * @typedef {func.<devtool>} devtool
 * @param   {string}         devtool - webpack devtool to utilize
 * @return  {Object.<Bud>}   Bud instance
 */
const devtool = devtool => {
  Bud.options.devtool = devtool

  return Bud
}

/**
 * Enable or disable filename hashing on compiled assets.
 * @typedef {func.<hash>}  hash
 * @param   {boolean}      hashingEnabled - true to enable filename hashing. default: !Bud.inProduction.
 * @return  {Object.<Bud>} Bud instance
 */
const hash = hashingEnabled => {
  Bud.options.hashed = hashingEnabled

  return Bud
}

/**
 * Enable or disable hot module reloading
 * @typedef {func.<hot>}   hot
 * @param   {boolean}      hmrEnabled - true to enable hot module reloading. default: !Bud.inProduction.
 * @return  {Object.<Bud>} Bud instance
 */
const hot = hmrEnabled => {
  Bud.options.hot = hmrEnabled

  return Bud
}

/**
 * Enable or disable source-maps
 * @typedef {func.<maps>}  maps
 * @param   {boolean}      mapsEnabled - true to enable source-maps. default: !Bud.inProduction.
 * @return  {Object.<Bud>} Bud instance
 */
const maps = enabled => {
  Bud.options.mapped = enabled

  return Bud
}

/**
 * Set maxChunks for code splitting
 * @typedef {func.<maxChunks>} maxChunks
 * @param   {number|string}    chunkCount - maximum number of chunks. default: 'Infinity'.
 * @return  {Object.<Bud>}     Bud instance
 */
const maxChunks = chunkCount => {
  Bud.options.splitting.maxChunks = chunkCount

  return Bud
}

/**
 * Enable or disable minification
 *
 * @param  {bool} [Bud.inProduction] true to enable CSS/JS minification.
 * @return {Object.<Bud>} Bud instance
 */
const mini = enable => {
  Bud.options.minified = enable

  return Bud
}

/**
 * Configure PostCSS.
 *
 * If you prefer, you may utilize a postcss.config.js file in the project root,
 * either alongside or in lieue of this configuration.
 *
 * Conflicts between supplied configs will be resolved in favor of bud.config.js.
 *
 * @param  {Object.<array, array>} {@link https://github.com/postcss/postcss#options}
 * @return {Object.<Bud>} Bud instance
 */
const postcss = config => {
  Bud.options.postcss.options = {
    ...Bud.options.postcss.options,
    ...(config ? config : []),
    plugins: [
      ...Bud.options.postcss.options.plugins,
      ...(config.plugins ? config.plugins : []),
    ],
  }

  return Bud
}

/**
 * Purge unused CSS from bundles.
 *
 * @see   {@link https://purgecss.com/guides/wordpress.html}
 * @param {Object} - purgecss config {@link https://purgecss.com/configuration.html}
 * @return {Object.<Bud>} Bud instance
 */
const purge = config => {
  Bud.options.postcss.options = {
    ...Bud.options.postcss.options,
    plugins: [
      ...Bud.options.postcss.options.plugins,
      require('@fullhuman/postcss-purgecss')({...config}),
    ],
  }

  return Bud
}

/**
 * Enable or disable code splitting.
 *
 * @param  {bool} [true]  enabled
 * @return {Object.<Bud>} Bud instance
 */
const splitting = enabled => {
  Bud.options.splitting.disabled = enabled

  return Bud
}

/**
 * Process @wordpress/i18n strings from JS source assets.
 *
 * If you are already translating strings with `yarn translate` then
 * there is no reason to run this separately.
 *
 * @param {string} file - project relative path to translation .pot file
 * @return {Object.<Bud>} Bud instance
 */

const translate = translation => {
  Bud.options.babel.options = {
    ...Bud.options.babel.options,
    plugins: [
      ...Bud.options.babel.options.plugins,
      [require('@wordpress/babel-plugin-makepot'),
        {output: Bud.project(translation)},
      ],
    ],
  }

  return Bud
}

/**
 * Enable or disable vendor bundles.
 *
 * @param  {bool}  [true] true if enabled
 * @return {Object.<Bud>} Bud instance
 */
const vendor = enabled => {
  Bud.options.vendor = enabled

  return Bud
}

/**
 * Enable or disable watch mode.
 * @typedef {func.<watch>} watch
 * @param   {bool}         true - if enabled
 * @return  {Object.<Bud>} Bud instance
 */
const watch = enabled => {
  Bud.options.watching = enabled

  return Bud
}

/**
 * Watch mode timeout
 * @typedef {func.<watchTimeout} watchTimeout
 * @param   {number}             timeout - in ms
 * @return  {Object.<Bud>}       Bud instance
 */
const watchTimeout = timeout => {
  Bud.options.dev.watchOptions.aggregateTimeout = timeout

  return Bud
}

/**
 * Configure @wordpress/dependency-extraction-webpack-plugin
 * @typedef {func.<wpManifest>} wpManifest
 * @param   {object} settings
 * @return  {Object.<Bud>} Bud instance
 */
const wpManifest = settings => {
  settings !== false
    ? Bud.options.wpManifest = {
      ...Bud.options.wpManifest,
      ...settings,
    }
    : Bud.options.wpManifest.enabled == false

  return Bud
}

/**
 * Bud - asset compilation framework.
 * @typedef {Object.<Bud>} Bud
 */
const Bud = {
  options,
  inProduction,
  paths,
  project,
  src,
  dist,
  preset,
  projectPath,
  srcPath,
  distPath,
  publicPath,
  alias,
  auto,
  babel,
  sync,
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
  splitting,
  translate,
  vendor,
  watch,
  watchTimeout,
  wpManifest,
}

/**
 * Bud asset manager.
 * @module Bud
 */
module.exports = Bud