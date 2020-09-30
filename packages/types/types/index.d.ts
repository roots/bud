/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Filesystem from '@roots/filesystem'
import * as Container from '@roots/container'

import Framework from './Framework'
import Build from './Build'
import Compiler from './Compiler'
import Plugin from './Plugin'
import Extension from './Extension'

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
   * ## bud.store
   *
   * @todo typings
   */
  store: Bud.Store

  plugins: any

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

  when: Bud.Config.When
}

declare namespace Bud {
  export type Store = {
    use(name: string): Bud.Framework.Container
    create(name: string, repo: Bud.Framework.Repository): unknown

    state: {
      [key: string]: any

      /**
       * ## bud.package
       *
       * Project package.json info.
       *
       * ```js
       * bud.package.get('dependencies')
       * ```
       */
      package: Container.ContainerInterface

      /**
       * ## bud.paths
       *
       * Project and framework paths.
       */
      paths: Container.ContainerInterface

      /**
       * ## bud.patterns
       *
       * RegExp stash box.
       */
      patterns: Container.ContainerInterface

      /**
       * ## bud.server
       *
       * Dev server
       */
      server: Container.ContainerInterface

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
       * ## bud.loaders
       */
      loaders: Bud.Framework.Container

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
    }
  }

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
      (this: Bud): Literal
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
      (this: Bud): Product
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
    export interface WebpackPlugin extends Plugin {
      make: () => Webpack.Plugin
    }

    /**
     * Function which returns a Plugin
     */
    export type Factory = (bud: Bud) => WebpackPlugin

    /**
     * Plugin lifecycle.
     */
    export class Controller {
      bud: Bud

      plugin?: Plugin

      constructor(app: Bud)

      make(plugin: Plugin.WebpackPlugin): Webpack.Plugin
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
