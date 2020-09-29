/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Filesystem from '@roots/filesystem'
import * as Container from '@roots/container'

import Framework from './Framework'
import Build from './Build'
import Compiler from './Compiler'
import Plugin from './Plugin'
import Server from './Server'
import Use from './Use'
import Rule from './Rule'

import Webpack from 'webpack'
import * as Babel from '@babel/core'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import Proxy from 'http-proxy-middleware'
import Globby from 'globby'
import {TerserPluginOptions} from 'terser-webpack-plugin'
import PostCss from 'postcss-loader'

export default Bud

declare class Bud extends Framework {
  /**
   * ## bud.compiler
   *
   * The compiler interface.
   */
  compiler: Compiler

  /**
   * ## bud.webpack
   *
   * @todo unsure how to type this object.
   */
  webpack: any

  /**
   * ## bud.build
   *
   * Function that builds the final webpack configuration.
   *
   * ```js
   * bud.build(bud)
   * ```
   */
  build: Build

  /**
   * ## bud.loaders
   */
  loaders: Bud.Framework.Container

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
  fs: Bud.Framework.FileContainer

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
   *
   * ```js
   * bud.args.get('hot')
   * ```
   */
  args: Bud.Framework.Container

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
  env: Bud.Framework.Container

  /**
   * ## bud.features
   *
   * Status of features
   */
  features: Bud.Framework.Container

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
  hooks: Bud.Hooks.Hooks

  /**
   * ## bud.updateDisk
   *
   * Update the index of files maintained by bud.fs
   *
   * @deprecated
   */
  updateDisk: () => void

  /**
   * ## bud.makePluginController
   *
   * Internal method which is used during plugin registration.
   */
  makePluginController: (
    plugin: Bud.Plugin.Factory,
  ) => Bud.Plugin.Controller

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
  mode: Bud.Mode.Mode

  /**
   * ## bud.options
   *
   * Primary key value store of configuration options.
   */
  options: Bud.Framework.Container

  /**
   * ## bud.package
   *
   * Project package.json info.
   *
   * ```js
   * bud.package.get('dependencies')
   * ```
   */
  package?: Bud.Framework.Container

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
  paths: Bud.Framework.Container

  /**
   * ## bud.patterns
   *
   * RegExp stash box.
   */
  patterns: Bud.Framework.Container

  /**
   * ## bud.plugins
   *
   * Bud framework plugins and webpack adapters.
   *
   * @see Webpack.Plugin
   */
  plugins: Bud.Framework.Container

  /**
   * ## bud.plugins
   *
   * @see Webpack.RuleSetRule
   */
  rules: Bud.Framework.Container

  /**
   * ## bud.uses
   *
   * @see Webpack.RuleSetLoader
   */
  uses: Bud.Framework.Container

  /**
   * ## bud.addExtensions
   *
   * Add support for additional extensions.
   *
   * ```js
   * bud.addExtensions(['jsx', 'vue'])
   * ```
   */
  addExtensions(): Bud.Config.Fluent<{
    extensions: string | string[]
  }>

  /**
   * ## bud.addPlugin
   *
   * Add a webpack plugin.
   *
   * ```js
   * bud.addPlugin('myPlugin', bud => new MyPlugin())
   * ```
   *
   * This is a more streamlined, fluent version of calling
   * bud.plugins.set. It does not utilize Bud's
   * PluginInterface.
   */
  addPlugin:
    | Bud.Config.AddPlugin
    | Bud.Config.Fluent<{
        name: string
        plugin: Bud.Config.PluginFactory
      }>

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
  alias:
    | Bud.Config.Alias
    | Bud.Config.Fluent<{
        aliases: Bud.Framework.Repository
      }>

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
  babel: Bud.Config.Babel

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
  brotli: Bud.Config.Brotli

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
  bundle: Bud.Config.Bundle

  /**
   * ## bud.compile
   *
   * Compile finalized webpack configuration and run build.
   *
   * ```js
   * bud.compile()
   * ```
   */
  compile: Bud.Config.Compile

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
  copy: Bud.Config.Copy

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
  copyAll: Bud.Config.CopyAll

  /**
   * ## bud.dev
   *
   * Configure Bud's built in development server.
   */
  dev: Bud.Config.Dev

  /**
   * ## bud.devtool
   *
   * Specify a devtool
   */
  devtool: Bud.Config.Devtool

  /**
   * ## bud.dist
   *
   * Yield an absolute path from a path relative to the dist dir.
   *
   * ```js
   * bud.dist('scripts/app.js')
   * ```
   */
  dist: Bud.Config.Dist

  /**
   * ## bud.distPath
   *
   * Set the project's dist directory.
   *
   *  ```js
   * bud.distPath('dist')
   * ```
   */
  distPath(): Bud.Config.DistPath

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
  extend: Bud.Config.Extend

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
  glob: Bud.Config.Glob

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
  gzip: Bud.Config.Gzip

  /**
   * ## bud.hash
   *
   * Enable or disable filename hashing of built assets.
   *
   * ```js
   * bud.hash(true)
   * ```
   */
  hash: Bud.Config.Hash

  /**
   * ## bud.mini
   *
   * Enable or disable minification
   *
   * ```js
   * bud.mini(true)
   * ```
   */
  minify: Bud.Config.Minify

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
   * bud.postcss({
   *   plugins: [
   *    require('astroturf'),
   *   ],
   * })
   * ```
   */
  postcss: Bud.Config.PostCss

  /**
   * ## bud.postPluginAdd
   *
   * Add a plugin to the postcss configuration array.
   *
   * If you prefer, you may utilize a postcss.config.js file in the project root,
   * either alongside or in lieue of this configuration.
   *
   * Conflicts between supplied configs will be resolved in favor of the project config file.
   *
   * ```js
   * bud.postcssAddPlugin([require('astroturf')])
   * ```
   *
   * ```js
   * bud.postcssAddPlugin(
   *   [require('astroturf'),
   *   {option: 'for-your-loader},
   * ])
   * ```
   */
  postPluginAdd: Bud.Config.PostPluginAdd

  /**
   * ## bud.postPluginConfig
   *
   * Configure a postcss plugin options.
   *
   * If you prefer, you may utilize a postcss.config.js file in the project root,
   * either alongside or in lieue of this configuration.
   *
   * Conflicts between supplied configs will be resolved in favor of the project config file.
   *
   * ### Usage:
   *
   * ```js
   * bud.postcssConfigPlugin(
   *   'autoprefixer',
   *   {options: 'for-your-plugin'},
   * })
   * ```
   */
  postPluginConfig: Bud.Config.PostPluginConfig

  /**
   * ## bud.project
   *
   * Yield an absolute path from a path relative to the `bud.projectPath`.
   *
   * ```js
   * bud.project('package.json') // absolute path to package.json
   * ```
   */
  project: Bud.Config.Project

  /**
   * ## bud.projectPath
   *
   * Set the project base path.
   *
   * ```js
   * bud.projectPath(__dirname)
   * ```
   */
  projectPath: Bud.Config.ProjectPath

  /**
   * ## bud.provide
   *
   * Define variable aliases
   *
   * ```js
   * bud.provide({jquery: ['$', 'window.jQuery']})
   * ```
   */
  provide: Bud.Config.Provide

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
  publicPath: Bud.Config.PublicPath

  /**
   * Inline common scripts.
   *
   * ```js
   * bud.runtimeManifest('runtime')
   * ```
   */
  runtime: Bud.Config.Runtime

  /**
   * ## bud.src
   *
   * Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.
   *
   * ```js
   * bud.src('scripts/app.js')
   * ```
   */
  src: Bud.Config.Src

  /**
   * ## bud.srcPath
   *
   * Set the project's src directory.
   *
   *  ```js
   * bud.srcPath('src')
   * ```
   */
  srcPath: Bud.Config.SrcPath

  /**
   * ## bud.target
   *
   * Set the build target. Defaults to 'web'.
   *
   * ```js
   * bud.target('web')
   * ```
   */
  target: Bud.Config.Target

  /**
   * ## bud.template
   *
   * Add an HTML template to generate html boilerplate with.
   *
   * ```js
   * bud.template(bud.src('template.html'))
   * ```
   */
  template: Bud.Config.Template

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
  terser: Bud.Config.Terser

  /**
   * ## bud.vendor
   *
   * Enable bundling vendor modules separately from application code.
   *
   * ```js
   * bud.vendor()
   * ```
   */
  vendor: Bud.Config.Vendor

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
  when: Bud.Config.When
}

declare namespace Bud {
  export namespace Config {
    export type Dist = Config.PathGetter
    export type Project = Config.PathGetter
    export type Src = Config.PathGetter
    export type DistPath = Config.Fluent<string>
    export type ProjectPath = Config.Fluent<string>
    export type PublicPath = Config.Fluent<string>
    export type SrcPath = Config.Fluent<string>

    export type AddExtensions = Config.Fluent<string | string[]>

    export type AddPlugin = Config.Fluent<{
      name: string
      plugin: Bud.Config.PluginFactory
    }>

    export type Alias = Config.Fluent<{
      aliases: Bud.Framework.Repository
    }>

    export type Babel = Config.Fluent<{
      options: Bud.Config.Options.Babel
    }>

    export type Brotli = Config.Fluent<{
      options?: Bud.Framework.Repository
    }>

    export type Bundle = (name: string, entries: string[]) => Bud

    export type Compile = (this: Bud) => Promise<void>

    export type Copy = Config.Fluent<{from: string; to: string}>

    export type CopyAll = Config.Fluent<{
      from: string
      to: string
    }>

    export type Devtool = Config.Fluent<{
      devtool: Webpack.Options.Devtool
    }>

    export type Extend = Config.Fluent<{
      plugins: Bud.Plugin.Factory
    }>

    export type Glob = Config.Fluent<{
      options: Bud.Config.Options.Glob
    }>

    export type Gzip = (
      this: Bud,
      options?: Bud.Framework.Repository,
    ) => Bud

    export type Hash = (this: Bud) => Bud

    export type Minify = (this: Bud) => Bud

    export type PostCss = (
      this: Bud,
      options?: Bud.Config.Options.PostCss,
    ) => Bud

    export type Vendor = (
      this: Bud,
      options?: Webpack.Options.CacheGroupsOptions,
    ) => Bud

    export type When = (
      this: Bud,
      test: boolean,
      trueCase?: CallableFunction,
      falseCase?: CallableFunction | undefined,
    ) => Bud

    export type Template = (
      this: Bud,
      options: Bud.Config.Options.Template,
    ) => Bud

    export type Dev = (
      this: Bud,
      config: Bud.Server.Config,
    ) => Bud

    export type Target = (
      this: Bud,
      target: Webpack.Configuration['target'],
    ) => Bud

    export type Terser = (
      this: Bud,
      options: TerserPluginOptions,
    ) => Bud

    export type PostPluginAdd = (
      this: Bud,
      entry: Config.PostPluginStore | Config.PostPluginStore[],
    ) => Bud

    export type PostPluginConfig = (
      this: Bud,
      plugin: Bud.Config.PostPluginStore,
      options: unknown,
    ) => Bud

    export type Provide = (
      this: Bud,
      options: {
        [key: string]: string[]
      },
    ) => Bud

    export type Runtime = (
      this: Bud,
      args?: {
        name: string
      },
    ) => Bud

    export interface Fluent<P> {
      (this: Bud, ...P): Bud
    }

    export interface PathGetter {
      (this: Bud, path?: string | undefined): string
    }

    export type PluginFactory = (bud?: Bud) => Webpack.Plugin

    export interface PostPluginTuple {
      plugin: PostCss.AcceptedPlugin
      options?: unknown
    }

    export interface PostPluginStore {
      [key: string]: PostPluginTuple
    }

    export namespace Options {
      export type Babel = Babel.TransformOptions

      export type Glob = {
        name: string
        files: string | string[]
        options?: Globby.GlobbyOptions
      }

      export type Terser = TerserPluginOptions

      export type PostCss = {
        syntax?: PostCss.Syntax
        plugins?: PostPluginStore[]
        map?: PostCss.SourceMapOptions
        parser?: PostCss.Parser
        stringifier?: PostCss.Stringifier
      }

      export type Template = {
        template?: string
        replacements?: {[key: string]: string}
      }
    }
  }

  export namespace Use {
    export type Product = Webpack.RuleSetLoader

    export type Literal =
      | string
      | Webpack.RuleSetQuery
      | undefined

    export type Module = {
      [key: string]: Factory | Literal
    }

    export interface Factory {
      (this: Use): Literal
    }

    export type Property = Literal | Factory

    export type RepositoryFactory = (
      bud: unknown,
    ) => {[key: string]: Use}
  }

  export namespace Rule {
    /**
     * The most generic representation of a rule module.
     * Used for typecheck on constructor, get.
     */
    type Generic = Property<Products> | Property<Products>[]

    /**
     * Rule modules produce Webpack.RuleSetRule entries
     */
    export type Makes = Webpack.RuleSetRule

    /**
     * Rule modules can also be manipulated as keyed items.
     */
    export interface Property<Product> {
      [key: string]: Yield<Product>
    }

    /**
     * Rule properties can be defined as callable functions or as literal values.
     */
    export type Yield<Product> = Factory<Product> | Product

    /**
     * Rule property defined with a callable.
     */
    export interface Factory<Product> {
      (this: Rule): Product
    }

    /**
     * All possible final products
     */
    export type Products =
      | Rule.String
      | Rule.Type
      | Rule.Enforce
      | Rule.Bool
      | Rule.Conditional
      | Rule.Parser
      | Rule.Query
      | Rule.Resolve
      | Rule.Loader
      | Rule.OneOf

    /**
     * Product: String literal
     */
    export type String = string

    /**
     * Product: Module type to use
     */
    export type Type = Webpack.RuleSetRule['type']

    /**
     * Product: Enforce this rule as pre or post step
     */
    export type Enforce = Webpack.RuleSetRule['enforce']

    /**
     * Product: Boolean literal
     */
    export type Bool = boolean

    /**
     * Product: Boolean test
     */
    export type Conditional = Webpack.RuleSetCondition

    /**
     * Product: Options for parsing
     */
    export type Parser = Webpack.RuleSetRule['parser']

    /**
     * Product: Use query
     */
    export type Query = string | Parser

    /**
     * Product: webpack resolve (multi-compiler)
     */
    export type Resolve = Webpack.Resolve

    /**
     * Product: loader(s)
     */
    export type Loader =
      | Webpack.RuleSetLoader
      | Webpack.RuleSetLoader[]

    /**
     * Product: Multiple child rules.
     */
    export type OneOf = Rule[]
  }

  export namespace Plugin {
    export interface Extension extends Plugin {
      make: () => void
    }

    export interface WebpackPlugin extends Plugin {
      make: () => Webpack.Plugin
    }

    /**
     * Function which returns a Plugin
     */
    export type Factory = (bud: Bud) => Extension | WebpackPlugin

    /**
     * Plugin lifecycle.
     */
    export class Controller {
      bud: Bud

      plugin?: Plugin

      constructor(app: Bud)

      select(key: string): this

      make(): Webpack.Plugin | void
    }

    /**
     * Possible extension products
     */
    export type Product = Webpack.Plugin | void

    /**
     * Plugin conditional
     */
    export type Conditional = (this: Plugin) => boolean

    /**
     * Plugin options
     */
    export type Options = Bud.Framework.Repository
  }

  export namespace Server {
    export interface Config {
      /**
       * The development server host
       * @example example.test
       */
      host?: string

      /**
       * The development server port
       * @example 3000
       */
      port?: number

      /**
       * Proxy origin
       */
      from?: {
        /**
         * Proxy origin host
         * @example example.test
         */
        host?: string

        /**
         * Proxy origin port
         * @example 8080
         */
        port?: number
      }

      /**
       * Proxy destination
       */
      to?: {
        /**
         * Proxy destination host
         * @example localhost
         */
        host?: string

        /**
         * Proxy destination port
         * @example 3000
         */
        port?: number
      }

      /**
       * The index path for web server, defaults to "index.html".
       */
      index?: WebpackDevMiddleware.Options['index']

      /**
       * Should hot middleware be used?
       */
      hot?: boolean

      /**
       * Should hotOnly middleware be used?
       */
      hotOnly?: boolean

      /**
       * The public path that the middleware is bound to.
       */
      publicPath?: WebpackDevMiddleware.Options['publicPath']

      /**
       * Proxy setting: object passed to  https.createServer
       */
      ssl?: Proxy.Options['ssl']

      /**
       * Proxy setting: set to true to verify SSL certificates
       */
      secure?: Proxy.Options['secure']

      /**
       * Proxy setting: proxy websockets.
       */
      ws?: Proxy.Options['ws']

      /**
       * Proxy setting: rewrite the location host/port on (301/302/307/308) redirects based on requested host/port.
       */
      autoRewrite?: Proxy.Options['autoRewrite']

      /**
       * Proxy setting: change the origin of the host header to the target URL
       */
      changeOrigin?: Proxy.Options['changeOrigin']

      disableHostCheck?: WebpackDevMiddleware.Options[]

      /**
       * Proxy setting: specify whether you want to follow redirects
       */
      followRedirects?: Proxy.Options['followRedirects']

      /**
       * Filename to serve as index.
       */
      filename?: WebpackDevMiddleware.Options['filename']

      /**
       * This property allows a user to pass custom HTTP headers on each request. eg. { "X-Custom-Header": "yes" }
       */
      headers?: WebpackDevMiddleware.Options['headers']

      /**
       * This option instructs the module to operate in 'lazy' mode,
       * meaning that it won't recompile when files change, but rather on each request.
       */
      lazy?: WebpackDevMiddleware.Options['lazy']

      /**
       * This property allows a user to pass the list of HTTP request methods accepted by the server.
       * @default [ 'GET', 'HEAD' ]
       */
      methods?: WebpackDevMiddleware.Options['methods']

      /**
       * This property allows a user to register custom mime types or extension mappings
       * @default null
       */
      mimeTypes?:
        | WebpackDevMiddleware.MimeTypeMap
        | WebpackDevMiddleware.OverrideMimeTypeMap
        | null

      /**
       * Instructs the module to enable or disable the server-side rendering mode
       */
      serverSideRender?: WebpackDevMiddleware.Options['serverSideRender']

      /**
       * Specify polling, etc.
       */
      watchOptions?: Webpack.Options.WatchOptions

      /**
       * If true, the option will instruct the module to write files to the configured location on disk as specified in your webpack config file
       * This option also accepts a Function value, which can be used to filter which files are written to disk
       */
      writeToDisk?: WebpackDevMiddleware.Options['writeToDisk']
    }

    export interface Options {
      /**
       * Server configuration.
       */
      config: Server.Config

      /**
       * Webpack compiler.
       */
      compiler: Webpack.Compiler
    }

    export namespace Inject {
      export interface Props {
        entrypoints: Webpack.Configuration['entry']
      }

      export type InjectClient = (
        props: Server.Inject.Props,
      ) => Webpack.Configuration['entry']
    }
  }

  export namespace Mode {
    export type Modes = Webpack.Configuration['mode']
    export type Mode = {
      /**
       * Check the currently set mode.
       */
      is: (check: Mode.Modes) => boolean

      /**
       * Get the currently set mode
       */
      get: () => Mode.Modes

      /**
       * Set the mode.
       */
      set: (check: Mode.Modes) => Bud
    }
    export interface Factory {
      (bud: Bud): Mode
    }
  }

  /**
   * Framework
   */
  export namespace Framework {
    export type FS = Filesystem.Filesystem
    export type Container = Container.ContainerInterface
    export type FileContainer = Filesystem.FileContainerInterface
    export type Repository = Container.Loose
  }

  export namespace Hooks {
    export class Hooks {
      /**
       * Framework logging utility
       */
      logger: any

      /**
       * Logging
       */
      registered: {
        [name: string]: Bud.Hooks.Hook[]
      }

      /**
       * Formats a callback as registrable entry.
       */
      make: (args: any | any[]) => any

      /**
       * Returns all registered hooks.
       */
      entries: () => any[]

      /**
       * Sets a callback on a filter event.
       */
      on: (
        name: string,
        callback: (args: any | any[]) => any,
      ) => void

      /**
       * Calls registered callbacks
       */
      filter: (name: string, value: any) => any
    }

    export type Hook = {
      name: string
      fn: (...args: any | any[]) => any
      value: any
      fired: boolean
    }
  }

  export namespace Build {
    export type Configuration = Webpack.Configuration

    export type Input = any

    export namespace Product {
      export type Entry = Webpack.Entry | Webpack.EntryFunc
      export type Externals = Webpack.ExternalsObjectElement
      export type Module = Webpack.Module
      export type Resolve = Webpack.Resolve
      export type Optimization = Webpack.Options.Optimization
      export type Output = Webpack.Output
      export type Plugins = Webpack.Plugin[]
      export type General = Omit<
        Configuration,
        | 'entry'
        | 'externals'
        | 'module'
        | 'resolve'
        | 'optimization'
        | 'plugins'
        | 'output'
        | 'string'
      >
    }

    export type Entry = (this: Bud) => Product.Entry
    export type Externals = (this: Bud) => Product.Externals
    export type Module = (this: Bud) => Product.Module
    export type Resolve = (this: Bud) => Product.Resolve
    export type Optimization = (this: Bud) => Product.Optimization
    export type Plugins = (this: Bud) => Product.Plugins
    export type Output = (this: Bud) => Product.Output
    export type General = (this: Bud) => Product.General

    export type Builders =
      | Build.Entry
      | Build.Externals
      | Build.Module
      | Build.Resolve
      | Build.Optimization
      | Build.Plugins
      | Build.Output
      | Build.General

    export interface Index {
      [key: string]: Builders
    }
  }

  export namespace CLI {
    export namespace State {
      export type Mode = Webpack.Configuration['mode']
      export type Stats = Webpack.Stats.ToJsonOutput
      export type Errors = Webpack.Stats.ToJsonOutput['errors']
      export type Warnings = Webpack.Stats.ToJsonOutput['warnings']
      /**
       * @see Webpack.ProgressPlugin.Handler
       */
      export type Progress = {
        percentage: number,
        msg: string
      }
    }

    export interface UseCompilation {
      (props: CompileSources): Compilation
    }

    export interface Compilation {
      /**
       * All stats data
       */
      stats?: Bud.CLI.State.Stats

      /**
       * Formatted error messages
       */
      errors?: Bud.CLI.State.Errors

      /**
       * Formatted warning messages
       */
      warnings?: Bud.CLI.State.Warnings

      /**
       * Compile progress
       */
      progress: Bud.CLI.State.Progress

      /**
       * Is server listening?
       */
      listening: boolean

      /**
       * Is server running?
       */
      running: boolean

      /**
       * Is compiler in watch mode?
       */
      watching: boolean
    }
    export interface CompileSources {
      compiler: Compiler
      server: Server
    }
  }
}
