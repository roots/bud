import type {Configuration} from 'webpack'
import type {Hooks} from './hooks/types'
import type {State} from './state/types'
import type {Util} from './util/types'
import type * as Api from './api/types'

export type Mode = Configuration['mode']
export type Production = boolean

/**
 * ## Bud - asset management framework.
 *
 * @typedef {Bud}
 */
type Bud = {
  /**
   * ## bud.hooks
   *
   * Register callback functions to be executed at various
   * stages of Bud's lifecycle.
   *
   * Register a callback:
   *
   * ```js
   * bud.hooks.on(
   *  'hookName',
   *  function(value) {
   *   doSomething(value)
   *  }
   * )
   * ```
   *
   * Invoke registered callback(s):
   *
   * ```js
   * bud.hooks.call('hookName', value)
   * ```
   *
   * @type {Hooks} hooks
   */
  hooks: Hooks

  /**
   * ## bud.util
   *
   * Helper functions.
   *
   * @type {Util} util
   */
  util: Util

  /**
   * ## bud.plugin
   *
   * Bud framework plugins and webpack adapters.
   *
   * @type {any} plugin
   */
  plugin: any

  /**
   * ## bud.mode
   *
   * Current build environment ('production', 'development', 'none')
   *
   * @type {Configuration['mode']} mode
   */
  mode: Mode

  /**
   * ## bud.inProduction
   *
   * Boolean returning true if in production.
   *
   * @type {boolean} mode
   */
  inProduction: Production

  /**
   * ## bud.state
   *
   * Contains the current state of the configuration Bud will build.
   *
   * @type {State} state
   */
  state: State

   /**
   * ## bud.compiler
   *
   * The compiler function which carries out the final build.
   *
   * @type {any} compiler
   */
  compiler: any

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
   *
   * @property {Api.Alias} alias
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
   *
   * @property {Api.Auto} auto
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
   *
   * @property {Api.Babel} babel
   */
  babel: Api.Babel

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
   *
   * @property {Api.Bundle} bundle
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
   *
   * @property {(): void} compile
   */
  compile: any

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
   *
   * @property {Api.Copy} copy
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
   *
   * @property {Api.CopyAll} copyAll
   */
  copyAll: Api.Copy

  /**
   * ## bud.dashboard
   *
   * Enable or disable the Bud dashboard.
   *
   * ```js
   * bud.dashboard(false)
   * ```
   *
   * @property {Api.Dashboard} dashboard
   */
  dashboard: Api.Dashboard

  /**
   * ## bud.dependencyManifest
   *
   * Configure @wordpress/dependency-extraction-webpack-plugin
   *
   * @see https://git.io/JJLxM
   *
   * ```js
   * bud.dependencyManifest({
   *   outputFormat: 'js',
   *   injectPolyfill: false,
   * })
   * ```
   *
   * @property {Api.DependencyManifest} dependencyManifest
   */
  dependencyManifest: Api.DependencyManifest

  /**
   * ## bud.dev
   *
   * Development server settings
   *
   * @property {Api.Dev} dev
   */
  dev: Api.Dev

  /**
   * ## bud.devtool
   *
   * Specify a devtool
   *
   * @property {Api.Devtool} devtool
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
   *
   * @property {Api.Dist} dist
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
   *
   * @property {Api.DistPath} distPath
   */
  distPath: Api.DistPath

  dump: any
  env: any
  featureEnabled: any
  features: any

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
   *
   * @property {(): Bud} glob
   */
  glob: any

  /**
   * ## bud.hash
   *
   * Enable or disable filename hashing of built assets. Unless specified, filename hashes will be created when running production builds.
   *
   * ```js
   * bud.hash(true)
   * ```
   *
   * @property {Api.Hash} hash
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
   *
   * @property {Api.Hot} hot
   */
  hot: Api.Hot

  /**
   * Inline common scripts.
   *
   * ```js
   * bud.inlineManifest({name: 'runtime'})
   * ```
   *
   * @property {Api.InlineManifest} inlineManifest
   */
  inlineManifest: Api.InlineManifest

 /**
   * ## bud.map
   *
   * Enable or disable source-maps
   *
   * ```js
   * bud.map(true)
   * ```
   *
   * @property {Api.SourceMap} map
   */
  map: Api.SourceMap

  /**
   * ## bud.mini
   *
   * Enable or disable minification
   *
   * ```js
   * bud.mini(true) // enable
   * ```
   *
   * @property {Api.Mini} mini
   */
  mini: Api.Mini

  /**
   * ## bud.option
   *
   * Get the current value of a bud option
   *
   * ```js
   * bud.option(')
   * ```
   *
   * @property {Api.Option} option
   */
  option: Api.Option

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
   *
   * @property {Api.PostCss} postCss
   */
  postCss: Api.PostCss

  /**
   * ## bud.preset
   *
   * Bud ships with several preset configurations for popular build tools. This function returns the contents
   * of a specific config as a Javascript object..
   *
   * ```js
   * bud.preset('babel/postcss')
   * ```
   *
   * ```js
   * bud.preset('babel/preset-react')
   * ```
   *
   * ```js
   * bud.preset('tsconfig')
   * ```
   *
   * @property {Api.Preset} preset
   */
  preset: Api.Preset
  project: Api.Project
  projectPath: Api.ProjectPath
  proxy: any
  publicPath: any
  purge: Api.Purge
  resolve: any
  scss: any
  splitting: any

  /**
   * ## bud.src
   *
   * Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.
   *
   * ```js
   * bud.src('scripts/app.js')
   * ```
   *
   * @property {Api.Src} src
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
   *
   * @property {Api.SrcPath} srcPath
   */
  srcPath: Api.SrcPath

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
   *
   * @property {Api.Sync} sync
   */
  sync: Api.Sync

  target: Api.Target
  terser: any
  translate: Api.Translate
  vendor: Api.Vendor

  /**
   * ## bud.watch
   *
   * Enable or disable watch mode.
   *
   * ```js
   * bud.watch(
   *  paths: [bud.src('assets/images')],
   * )
   * ```
   *
   * @property {Api.Watch} watch
   */
  watch: Api.Watch

  /**
   * ## bud.debug
   *
   * Enable or disable debug mode.
   *
   * ```js
   * bud.debug()
   * bud.debug(true)
   * ```
   *
   * ```js
   * bud.debug(false) // debug disabled
   * ```
   *
   * @property {Api.Debug}
   * @deprecated
   */
  debug: Api.Debug
}

export {Bud}
