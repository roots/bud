import Container, {Loose} from '@roots/container'
import {FileContainerInterface} from '@roots/filesystem'
import {FrameworkInterface, Hooks} from '@roots/bud-framework'
import {CompilerInterface} from '@roots/bud-compiler'
import {ServerInterface} from '@roots/bud-server'
import {ConfigBuilder} from './config'
import {Mode} from './mode'
import {PluginController} from './Plugin'
import {Plugin as WebpackPlugin} from 'webpack'

import * as Api from './api'

import bud from './bootstrap'

export declare interface BudInterface
  extends FrameworkInterface {
  /**
   * ## bud.compiler
   *
   * The compiler interface.
   */
  compiler: CompilerInterface

  /**
   * ## bud.fs
   *
   * Application filesystem.
   *
   * ```js
   * bud.fs.get('package.json')
   * ```
   *
   * ```js
   * bud.fs.set('exmaple.md', `
   *  # Writing to a file.
   *
   *  Few cares given.
   * `)
   * ```
   */
  fs: FileContainerInterface

  /**
   * ## bud.server
   *
   * Dev server
   */
  server: ServerInterface

  /**
   * ## bud.args
   *
   * Arguments passed on invocation.
   *
   * ```js
   * bud.args.get('hot')
   * ```
   */
  args: Container

  /**
   * ## bud.config
   *
   * Internal method which builds the final webpack configuration.
   *
   * ```js
   * bud.config(bud)
   * ```
   */
  config: ConfigBuilder

  /**
   * ## bud.env
   *
   * Project environment variables.
   *
   * ```js
   * bud.env.get('APP_NAME')
   * ```
   *
   * ```js
   * bud.env.get('APP_SECRET')
   * ```
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
   *
   * Filter values:
   *
   * ```js
   * bud.hooks.on('webpack.output.filename', valueWhichWouldHaveBeen => '[name].hooked.js')
   * ```
   *
   * Register your own event:
   *
   * ```js
   * bud.hooks.call('my-hookable-event', valueToPassToSubscribers)
   * ```
   */
  hooks: Hooks

  /**
   * ## bud.updateDisk
   *
   * Update the index of files maintained by bud.fs
   *
   * @deprecated
   */
  updateDisk: () => void

  /**
   * ## bud.loaderModules
   *
   * Repository for loader modules. Makes it easier for extensions
   * to swap a loader implementations without changing every rule
   * that uses the loader..
   *
   * ```js
   * bud.loaderModules.set('css', require('my-alternative-css-loader))
   * ```
   */
  loaderModules: Container

  /**
   * ## bud.loaders
   *
   * Webpack loaders.
   *
   * ```js
   * bud.loaders.set('cool', {
   *  loader: require.resolve('cool-loader'),
   *   options: {
   *     very: 'nice',
   *   },
   *  }))
   */
  loaders: Container

  /**
   * ## bud.makePluginController
   *
   * Internal method which is used during plugin registration.
   */
  makePluginController: (plugin: Plugin) => PluginController

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
   * ## bud.options
   *
   * Primary key value store of configuration options.
   */
  options: Container

  /**
   * ## bud.package
   *
   * Project package.json info.
   *
   * ```js
   * bud.package.get('dependencies')
   * ```
   */
  package?: Container

  /**
   * ## bud.update
   *
   * Information about available updates for the framework.
   */
  update?: any

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
  addExtensions: Api.addExtensions.Fluent

  /**
   * ## bud.addPlugin
   *
   * Add a webpack plugin.
   *
   * ```js
   * bud.addPlugin('myPlugin', bud => new MyPlugin())
   * ```
   *
   * This is just a streamlined, fluent version of calling
   * bud.webpackPlugins.set. It does not utilize Bud's
   * PluginInterface.
   *
   * @param name
   * @param webpack.plugin
   * @returns bud
   */
  addPlugin: Api.AddPlugin

  /**
   * ## bud.alias
   *
   * Resolve modules through webpack aliases. Useful for situations that may otherwise
   * require brittle relative paths.
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
   * ## bud.babel
   *
   * Configure Babel.
   *
   * If you prefer, you may utilize a `babel.config.js` file in the project root,
   * either alongside or in lieue of this configuration.
   *
   * You can also pass the contents of that config file directly to Bud:
   *
   * ```js
   * bud.babel(bud.fs.readJson('babel.config.js'))
   *
   * // Or, perhaps more usefully:
   * bud.babel({
   *   plugins: {
   *     ...bud.fs.readJson('babel.config.js').plugins,
   *     [pluginToAdd, {option: value}],
   *   },
   * })
   * ```
   *
   * Conflicts between supplied configs will be resolved in favor of the project config file.
   *
   * @see https://babeljs.io/docs/en/configuration
   */
  babel: Api.Babel

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
  brotli: Api.Brotli

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
   * ```js
   * bud.compile()
   * ```
   */
  compile: Api.Compile

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
  copyAll: Api.CopyAll

  /**
   * ## bud.dev
   *
   * Configure Bud's built in development server.
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
  distPath: Api.DistPath

  /**
   * ## bud.extend
   *
   * Register a Bud extension.
   *
   * ```js
   * bud.extend([
   *   require('@roots/killer-bud-extension')
   * ])
   * ```
   */
  extend: Api.Extend

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
  gzip: Api.Gzip

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
   * ## bud.mini
   *
   * Enable or disable minification
   *
   * ```js
   * bud.mini(true)
   * ```
   */
  minify: Api.Minify

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
  postcss: Api.PostCss

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
  projectPath: Api.ProjectPath

  /**
   * ## bud.provide
   *
   * Define variable aliases
   *
   * ```js
   * bud.provide({jquery: ['$', 'window.jQuery']})
   * ```
   */
  provide: Api.Provide

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
  publicPath: Api.PublicPath

  /**
   * Inline common scripts.
   *
   * ```js
   * bud.runtimeManifest('runtime')
   * ```
   */
  runtimeManifest: Api.RuntimeManifest

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
  srcPath: Api.SrcPath

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
   * ## bud.template
   *
   * Add an HTML template to generate html boilerplate with.
   *
   * ```js
   * bud.template(bud.src('template.html'))
   * ```
   */
  template: Api.Template

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
  vendor: Api.Vendor

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
   * ```
   */
  when: Api.When
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
 *
 * Plugins are passed a single parameter -- the Bud object after all configuration
 * is complete, during the build phase just prior to compilation.
 *
 * They are required to have a single member function -- `make`. Bud extensions which
 * add webpack plugins to the compiler can return the instantiated plugin from the
 * make function for registration.
 *
 * Extensions which return `false` from `when` will not have their `make` method called.
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
  make: () => WebpackPlugin | void

  /**
   * Whether or not to call `make`.
   */
  when?: PluginConditional
}

/**
 * Plugin
 */
export declare type Plugin = (
  app: BudInterface,
) => PluginInterface

export declare type Bud = BudInterface

const instance: BudInterface = bud

/**
 * @name Bud
 * @description Asset management framework
 * @type {BudInterface} instance
 */
export default instance
module.exports = instance
