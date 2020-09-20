import Container, {Loose} from '@roots/container'
import Filesystem from '@roots/filesystem'
import {FrameworkInterface, Hooks} from '@roots/bud-framework'
import {ApplicationCli} from '@roots/bud-cli'
import {WebpackBuilder} from './config'
import Server from '@roots/bud-server'
import {Mode} from './mode'
import {AddExtensions} from './api/addExtensions'
import {Alias} from './api/alias'
import {Babel} from './api/babel'
import {Brotli} from './api/brotli'
import {Bundle} from './api/bundle'
import {Compile} from './api/compile'
import {Copy} from './api/copy'
import {CopyAll} from './api/copyAll'
import {Dev} from './api/dev'
import {Devtool} from './api/devtool'
import {Dist} from './api/dist'
import {DistPath} from './api/distPath'
import {Extend} from './api/extend'
import {Hash} from './api/hash'
import {Gzip} from './api/gzip'
import {Glob} from './api/glob'
import {RuntimeManifest} from './api/runtimeManifest'
import {Mini} from './api/mini'
import {PostCss} from './api/postcss'
import {Project} from './api/project'
import {ProjectPath} from './api/projectPath'
import {Provide} from './api/provide'
import {PublicPath} from './api/publicPath'
import {Src} from './api/src'
import {SrcPath} from './api/srcPath'
import {Target} from './api/target'
import {Terser} from './api/terser'
import {Vendor} from './api/vendor'
import {When} from './api/when'

import bootstrap from './bootstrap'

/**
 * # Bud - Asset management framework.
 *
 * @see https://github.com/roots/bud
 */
export interface BudInterface extends FrameworkInterface {
  /**
   * ## bud.name
   *
   * Instance name
   */
  name: string

  /**
   * ## bud.cli
   *
   * Application CLI
   */
  cli: ApplicationCli

  /**
   * ## bud.fs
   *
   * Application filesystem.
   */
  fs: Filesystem

  /**
   * ## bud.server
   *
   * Dev server
   */
  server: Server

  /**
   * ## bud.args
   *
   * Arguments passed on invocation.
   */
  args: Container

  /**
   * ## bud.config
   *
   * Builds the webpack configuration.
   */
  config: WebpackBuilder

  /**
   * ## bud.env
   *
   * Project environment variables.
   */
  env: Container

  /**
   * ## bud.features
   *
   * Status of features
   */
  features: Container

  /**
   * ## bud.hooks
   *
   * Filters-based extension interface.
   */
  hooks: Hooks

  /**
   * ## bud.updateDisk
   */
  updateDisk: () => void

  /**
   * ## bud.loaderModules
   *
   * Webpack loader modules
   */
  loaderModules: Container

  /**
   * ## bud.loaders
   *
   * Webpack loaders
   */
  loaders: Container | Loose

  /**
   * ## bud.makeLoaders
   */
  makeLoaders: () => void

  /**
   * ## bud.options
   *
   * Primary key value store of configuration options.
   */
  options: Container

  /**
   * ## bud.package
   *
   * Project package.json info.
   */
  package?: Container

  /**
   * ## bud.paths
   *
   * Project and framework paths.
   */
  paths: Container

  /**
   * ## bud.patterns
   *
   * Regular expressions
   */
  patterns: Container

  /**
   * ## bud.plugins
   *
   * Bud framework plugins and webpack adapters.
   */
  webpackPlugins: Container

  /**
   * ## bud.rules
   *
   * Webpack module loader rules.
   */
  rules: Container

  /**
   * ## bud.addExtensions
   *
   * Add support for additional extensions.
   *
   * ```js
   * bud.addExtensions(['jsx', 'vue'])
   * ```
   */
  addExtensions: AddExtensions

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
  alias: Alias

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
  babel: Babel

  /**
   * ## bud.brotli
   *
   * Apply brotli compression to static assets.
   *
   * ```js
   * bud.brotli()
   * ```
   *
   * ```js
   * bud.brotli({
   *   compressionOptions: {
   *     level: 11,
   *   },
   *   threshold: 10240,
   *   minRatio: 0.8,
   *   deleteOriginalAssets: false,
   * })
   * ```
   */
  brotli: Brotli

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
  bundle: Bundle

  /**
   * ## bud.compile
   *
   * Compile finalized webpack configuration and run build.
   *
   * ```
   * bud.compile()
   * ```
   */
  compile: Compile

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
  copy: Copy

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
  copyAll: CopyAll

  /**
   * ## bud.dev
   *
   * Configure Bud's built in development server.
   */
  dev: Dev

  /**
   * ## bud.devtool
   *
   * Specify a devtool
   */
  devtool: Devtool

  /**
   * ## bud.dist
   *
   * Yield an absolute path from a path relative to the dist dir.
   *
   * ```js
   * bud.dist('scripts/app.js')
   * ```
   */
  dist: Dist

  /**
   * ## bud.distPath
   *
   * Set the project's dist directory.
   *
   *  ```js
   * bud.distPath('dist')
   * ```
   */
  distPath: DistPath

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
  glob: Glob

  /**
   * ## bud.gzip
   *
   * Apply gzip compression to static assets.
   *
   * ```js
   * bud.gzip()
   * ```
   *
   * ```js
   * bud.gzip({
   *  test: /\.js$|\.css$|\.html$/,
   *  minRatio: 0.8,
   * })
   * ```
   */
  gzip: Gzip

  /**
   * ## bud.hash
   *
   * Enable or disable filename hashing of built assets.
   *
   * ```js
   * bud.hash(true)
   * ```
   */
  hash: Hash

  /**
   * ## bud.mini
   *
   * Enable or disable minification
   *
   * ```js
   * bud.mini(true)
   * ```
   */
  mini: Mini

  /**
   * ## bud.mode
   *
   * Get, set and check the webpack build mode.
   *
   * ```js
   * bud.mode.get()
   * ```
   *
   * ```js
   * bud.mode.is('production')
   * ```
   *
   * ```js
   * bud.mode.set('production')
   * ```
   */
  mode: Mode

  /**
   * ## bud.postcss
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
  postcss: PostCss

  /**
   * ## bud.project
   *
   * Yield an absolute path from a path relative to the `bud.projectPath`.
   *
   * ```js
   * bud.project('package.json') // absolute path to package.json
   * ```
   */
  project: Project

  /**
   * ## bud.projectPath
   *
   * Set the project base path.
   *
   * ```js
   * bud.projectPath(__dirname)
   * ```
   */
  projectPath: ProjectPath

  /**
   * ## bud.provide
   *
   * Define variable aliases
   *
   * ```js
   * bud.provide({jquery: ['$', 'window.jQuery']})
   * ```
   */
  provide: Provide

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
  publicPath: PublicPath

  /**
   * Inline common scripts.
   *
   * ```js
   * bud.runtimeManifest('runtime')
   * ```
   */
  runtimeManifest: RuntimeManifest

  /**
   * ## bud.src
   *
   * Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.
   *
   * ```js
   * bud.src('scripts/app.js')
   * ```
   */
  src: Src

  /**
   * ## bud.srcPath
   *
   * Set the project's src directory.
   *
   *  ```js
   * bud.srcPath('src')
   * ```
   */
  srcPath: SrcPath

  /**
   * ## bud.target
   *
   * Set the build target. Defaults to 'web'.
   *
   * ```js
   * bud.target('web')
   * ```
   */
  target: Target

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
  terser: Terser

  /**
   * ## bud.extend
   *
   * Register a Bud extension.
   *
   * ```js
   * bud.extend([require('@roots/bud-demo-plugin')])
   */
  extend: Extend

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
   * ## bud.when
   *
   * Define build steps to be carried out under certain conditions
   *
   * ```js
   * bud.when(bud.mode.is('production'), bud => {
   *  bud.mini()
   *  bud.vendor()
   *  // ...
   * })
   */
  when: When
}

/**
 * Conditional check determining whether to engage plugin functionality.
 */
export type PluginConditional = (
  this: PluginInterface,
) => boolean

/**
 * Plugin method handling options
 */
export type PluginOptions = (this: PluginInterface) => Loose

/**
 * Plugin interface
 */
export interface PluginInterface extends Loose {
  /**
   * Framework
   */
  bud?: BudInterface

  /**
   * Plugin options.
   */
  options?: Loose

  /**
   * Set plugin options
   */
  setOptions?: PluginOptions

  /**
   * Merge plugin options
   */
  mergeOptions?: PluginOptions

  /**
   * Primary action of plugin.
   */
  make: () => unknown | void

  /**
   * Plugin is utilized when true.
   */
  when?: PluginConditional
}

/**
 * BudInterface Plugin
 */
export type Plugin = (app: BudInterface) => PluginInterface

/**
 * Bud - Webpack build framework
 */
const bud: BudInterface = bootstrap()

module.exports = bud
export {bud as default}
