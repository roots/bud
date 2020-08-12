import {api} from './api'
import {hooks} from './hooks'
import {util, logger} from './util'
import {repositories} from './repositories'
import {babel, browserSync, postCss} from './repositories/options'
import {compiler} from './compiler'
import {bindContainer, bindExtensionContainer, bindFileContainer} from './container'

import type {Container} from './container'
import type {Configuration} from 'webpack'
import type {Hooks} from './hooks/types'
import type {Use, UsesHash} from './repositories/rulesets'
import type {Paths, Features, Options} from './repositories/types'
import type {FileContainer} from './container'
import type {Util} from './util/types'
import * as Api from './api/types'
import type {Vendor} from './api/vendor'

interface Loose {
  [key: string]: any
}

/**
 * Bud Framework Interface
 *
 * @interface
 */
interface Bud extends Loose {
  /**
   * ## bud.hooks
   *
   * Hooks
   */
  hooks: Hooks

  /**
   * ## bud.logger
   *
   * Debug logger
   */
  logger: any

  /**
   * ## bud.loaders
   *
   * Webpack loaders
   */
  loaders: any

  /**
   * ## bud.util
   *
   * Helper functions.
   */
  util: Util

  /**
   * ## bud.plugins
   *
   * Bud framework plugins and webpack adapters.
   */
  plugins: any

  /**
   * ## bud.mode
   *
   * Current build environment ('production', 'development', 'none')
   */
  mode: Configuration['mode']

  /**
   * ## bud.adapters
   *
   * Webpack plugins
   */
  adapters: any

  /**
   * ## bud.paths
   *
   * Project and framework paths.
   */
  paths: Paths

  /**
   * ## bud.inDevelopment
   *
   * Boolean returning true if in development.
   */
  inDevelopment: boolean

  /**
   * ## bud.inProduction
   *
   * Boolean returning true if in production.
   */
  inProduction: boolean

  /**
   * ## bud.configs
   *
   * Project configuration files.
   */
  configs: FileContainer

  /**
   * ## bud.features
   *
   * Status of features
   */
  features: Features

  /**
   * ## bud.options
   *
   * Primary key value store of configuration options.
   */
  options: Options

  /**
   * ## bud.compiler
   *
   * The compiler function which carries out the final build.
   */
  compiler: any

  /**
   * ## bud.patterns
   *
   * Regular expressions
   */
  patterns: Container

  /**
   * ## bud.rules
   *
   * Webpack module loader rules.
   */
  rules: Container

  /**
   * ## bud.rules
   *
   * Webpack module loader rule loaders.
   */
  uses: Container

  /**
   * ## bud.use
   *
   * Register a Bud extension.
   *
   * ```js
   * bud.use([require('@roots/bud-demo-plugin')])
   */
  use: Api.Use

  /**
   * ## bud.alias
   *
   * Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.
   *
   * Having defined this alias:
   *
   * ```js
   * bud.alias({'scripts': bud.src('scripts')})
   * ```
   *
   * You can now reference scripts against that alias in your import statements:
   *
   * ```js
   * import 'scripts/myScript' // replacing '../../myScript'
   * ```
   **/
  alias: Api.Alias

  /**
   * ## bud.auto
   *
   * Automatically load modules instead of needing to import them.
   *
   * ```js
   * bud.auto({jquery: ['$', 'window.jQuery']})
   * ```
   */
  auto: Api.Auto

  /**
   * ## bud.babel
   *
   * Configure Babel.
   *
   * If you prefer, you may utilize a `babel.config.js` file in the project root,
   * either alongside or in lieue of this configuration.
   *
   * Conflicts between supplied configs will be resolved in favor of the project config file.
   *
   * @see https://babeljs.io/docs/en/configuration
   */
  babel: Api.BabelCfg

  /**
   * ## bud.bundle
   *
   * Compile a group of assets.
   *
   * ```js
   * bud.bundle('app', [
   *   bud.src('app.js'),
   *   bud.src('app.css'),
   * ])
   * ```
   */
  bundle: Api.Bundle

  /**
   * ## bud.compile
   *
   * Compile finalized webpack configuration and run build.
   *
   * ```
   * bud.compile()
   * ```
   */
  compile: () => void

  /**
   * ## bud.copy
   *
   * Copy a file.
   *
   * ```js
   * bud.copy(
   *   bud.src('images/image.png'),
   *   bud.dist('image.png'),
   * )
   * ```
   */
  copy: Api.Copy

  /**
   * ## bud.copyAll
   *
   * Copy all files from a specified source to a specified destination.
   *
   * ```js
   * bud.copyAll(
   *  bud.src('images'),
   *  bud.dist('images')
   * )
   * ```
   */
  copyAll: Api.Copy

  /**
   * ## bud.dev
   *
   * Development server settings
   */
  dev: Api.Dev

  /**
   * ## bud.devtool
   *
   * Specify a devtool
   */
  devtool: Api.Devtool

  /**
   * ## bud.dist
   *
   * Yield an absolute path from a path relative to the dist dir.
   *
   * ```js
   * bud.dist('scripts/app.js')
   * ```
   */
  dist: Api.Dist

  /**
   * ## bud.distPath
   *
   * Set the project's dist directory.
   *
   *  ```js
   * bud.distPath('dist')
   * ```
   */
  distPath: Api.PathSetter

  /**
   * ## bud.glob
   *
   * Compile assets into a particular directory.
   *
   * ```js
   * bud.bundlePath(
   *  bud.dist('scripts'),
   *  [bud.src('scripts')],
   * )
   * ```
   */
  glob: Api.Glob

  /**
   * ## bud.hash
   *
   * Enable or disable filename hashing of built assets.
   *
   * ```js
   * bud.hash(true)
   * ```
   */
  hash: Api.Hash

  /**
   * ## bud.hot
   *
   * Enable or disable hot module reloading
   *
   * ```js
   * bud.hot({
   *  enabled: !bud.inProduction,
   *  host: 'bud-sandbox.valet',
   *  open: true,
   *  secure: false,
   * })
   * ```
   */
  hot: Api.Hot

  /**
   * Inline common scripts.
   *
   * ```js
   * bud.inlineManifest('runtime')
   * ```
   */
  inlineManifest: Api.InlineManifest

  /**
   * ## bud.map
   *
   * Enable or disable source-maps
   *
   * ```js
   * bud.map(true)
   */
  map: Api.SourceMap

  /**
   * ## bud.mini
   *
   * Enable or disable minification
   *
   * ```js
   * bud.mini(true)
   * ```
   */
  mini: Api.Mini

  /**
   * ## bud.postCss
   *
   * Configure PostCSS.
   *
   * If you prefer, you may utilize a postcss.config.js file in the project root,
   * either alongside or in lieue of this configuration.
   *
   * Conflicts between supplied configs will be resolved in favor of the project config file.
   *
   * ```js
   * bud.postCss({
   *   plugins: [
   *    require('astroturf'),
   *   ],
   * })
   * ```
   */
  postCss: Api.PostCss

  /**
   * ## bud.presets
   *
   * Bud ships with several preset configurations for popular build tools. This function returns an object with two properties:
   * - config: the preset as an object
   * - path: the preset path
   *
   * ```js
   * bud.presets.get('babel-wp')
   * ```
   */
  presets: Container

  /**
   * ## bud.project
   *
   * Yield an absolute path from a path relative to the `bud.projectPath`.
   *
   * ```js
   * bud.project('package.json') // absolute path to package.json
   * ```
   */
  project: Api.Project

  /**
   * ## bud.projectPath
   *
   * Set the project base path.
   *
   * ```js
   * bud.projectPath(__dirname)
   * ```
   */
  projectPath: Api.PathSetter

  /**
   * ## bud.publicPath
   *
   * Set the project public path.
   *
   * ### Example
   *
   * ```js
   * bud.publicPath('dist')
   * ```
   */
  publicPath: Api.PathSetter

  /**
   * ## bud.splitting
   *
   * Enable or disable code splitting.
   *
   * ```js
   * bud.splitting(false)
   * ```
   */
  splitting: Api.Splitting

  /**
   * ## bud.src
   *
   * Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.
   *
   * ```js
   * bud.src('scripts/app.js')
   * ```
   */
  src: Api.Src

  /**
   * ## bud.srcPath
   *
   * Set the project's src directory.
   *
   *  ```js
   * bud.srcPath('src')
   * ```
   */
  srcPath: Api.PathSetter

  /**
   * ## bud.sync
   *
   * Configure BrowserSync.
   *
   * ```js
   * bud.sync({
   *   enabled: !bud.inProduction,
   *   proxy: 'http://bud.test',
   *   host: 'localhost',
   *   port: 3000,
   * })
   * ```
   */
  sync: Api.Sync

  /**
   * ## bud.target
   *
   * Set the build target. Defaults to 'web'.
   *
   * ```js
   * bud.target('web')
   * ```
   */
  target: Api.Target

  /**
   * ## bud.terser
   *
   * Optimize build with terser.
   *
   * ```js
   * bud.terser({
   *  parse: {
   *   ecma: 8,
   *  },
   *  compress: {
   *    ecma: 5,
   *    warnings: false,
   *    comparisons: false,
   *    inline: 2,
   *  },
   * })
   * ```
   */
  terser: Api.Terser

  /**
   * ## bud.vendor
   *
   * Enable bundling vendor modules separately from application code.
   *
   * ```js
   * bud.vendor()
   * ```
   */
  vendor: Vendor

  /**
   * ## bud.watch
   *
   * Enable or disable watch mode.
   *
   * ```js
   * bud.watch({
   *  enabled: !bud.inProduction,
   *  paths: [bud.src('assets/images')],
   * })
   * ```
   */
  watch: Api.Watch
}

/**
 * Bud Extension Interface
 *
 * @interface
 */
interface ExtensionInterface extends Loose {
  /**
   * Bud container.
   */
  bud: Bud

  /**
   * Set options
   */
  setOptions?: (this: ExtensionInterface) => any[] | any

  /**
   * Merge options
   */
  mergeOptions?: (this: ExtensionInterface) => any[] | any

  /**
   * Make plugin output.
   */
  make: (this: ExtensionInterface) => any

  /**
   * Conditions that need to be met in order to engage plugin functionality.
   */
  when?: (this: ExtensionInterface) => boolean
}

/**
 * Bud Extension
 *
 * @typedef {Extension} Extension
 * @implements {ExtensionInterface}
 */
type Extension = (bud: Bud) => ExtensionInterface

/**
 * Bud framework.
 *
 * @constructor
 */
const bootstrap = function () {
  /**
   * The framework container object.
   */
  this.framework = {}

  /**
   * Logger (pino)
   */
  this.logger = logger

  /**
   * Containers
   */
  this.repositories = repositories
  this.store = bindContainer
  this.fileStore = bindFileContainer
  this.extensionStore = bindExtensionContainer

  /**
   * Utilities and dependencies.
   */
  this.framework.logger = this.logger
  this.framework.util = util
  this.framework.fs = util.fs

  /**
   * Paths container.
   */
  this.framework.paths = this.store(this.repositories.paths, 'bud.paths')

  /**
   * Project configuration files container.
   */
  this.framework.configs = this.fileStore(
    this.repositories.configs(this.framework.paths),
    'bud.configs',
  )

  /**
   * Envvar container.
   */
  this.framework.env = this.store(
    this.repositories.env(this.framework.paths),
    'bud.env',
  )

  /**
   * CLI containers.
   */
  this.framework.args = this.store(
    this.repositories.cli.args(this.framework.env),
    'bud.args',
  )
  this.framework.flags = this.store(this.repositories.cli.flags, 'bud.flags')

  /**
   * Features container.
   */
  this.framework.features = this.store(this.repositories.features, 'bud.features')

  /**
   * Options container.
   */
  this.framework.options = this.store(this.repositories.options, 'bud.options')

  /**
   * Presets container.
   */
  this.framework.presets = this.store(this.repositories.presets, 'bud.presets')

  /**
   * Framework plugins container.
   */
  this.framework.plugins = this.extensionStore(
    this.repositories.plugins,
    'bud.plugins',
  )

  /**
   * Webpack module containers.
   */
  this.framework.patterns = this.store(this.repositories.patterns, 'bud.patterns')
  this.framework.loaders = this.store(this.repositories.loaders, 'bud.loaders')
  this.framework.rules = this.store(this.repositories.rules, 'bud.rules')
  this.framework.uses = this.store(this.repositories.uses, 'bud.uses')

  /**
   * Webpack plugins.
   */
  this.framework.adapters = this.extensionStore(
    this.repositories.adapters,
    'bud.adapters',
  )

  /**
   * Hooks API and store.
   */
  this.framework.hooks = hooks(this.logger).init(this.framework)

  /**
   * Compiler.
   */
  this.framework.compiler = compiler(this.framework)

  /**
   * Set mode.
   */
  this.framework.mode = this.framework.args.get('mode')
  this.framework.inProduction = this.framework.args.is('mode', 'production')
  this.framework.inDevelopment = this.framework.args.is('mode', 'development')

  /**
   * Node process handling.
   */
  this.framework.process = util.processHandler(this.framework)

  /**
   * API methods.
   */
  Object.values(api).forEach((method: any) => {
    this.framework[method.name] = method

    this.framework.logger.info(
      {name: 'bootstrap'},
      `bootstrapped api method: bud.${method.name}`,
    )
  })

  /**
   * Enable features based on presence of configuration files.
   */
  this.framework.features.set('babel', this.framework.configs.has('babel'))
  this.framework.features.set('postCss', this.framework.configs.has('postCss'))

  /**
   * Set options based based on presence of configuration files.
   */
  this.framework.options.set('babel', babel(this.framework.configs))
  this.framework.options.set('postCss', postCss(this.framework.configs))
  this.framework.options.set('browserSync', browserSync(this.framework.flags))
}

/**
 * Bud Framework
 * @type {Bud}
 */
const bud = new bootstrap().framework

export {bud}
export {Bud, Extension, ExtensionInterface, Use, UsesHash}
