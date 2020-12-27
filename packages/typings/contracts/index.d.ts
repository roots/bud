import type Webpack from 'webpack'
import type Express from 'express'
import type {Container} from '../../container/src'
import type {GlobTask, zlib} from '@roots/bud-support'
import type CompressionPlugin from 'compression-webpack-plugin'
import type {Service} from '../../bud-support/src/Service/Service'
import type {ServiceContainer} from '../../bud-support/src/Service/ServiceContainer'
import type {
  FileContainer,
  FileSystem,
} from '../../filesystem/src'
import type {Api} from './Api'
import type {Build} from './Build'
import type {Cache} from './Cache'
import type {CLI} from './CLI'
import type {Compiler} from './Compiler'
import type {Env} from './Env'
import type {Extensions, Extension, Module} from './Extensions'
import type {Hooks} from './Hooks'
import type {Item} from './Item'
import type {Loader} from './Loader'
import type {Logger} from './Logger'
import type {Mode} from './Mode'
import type {Rule} from './Rule'
import type {Server} from './Server'
import type {
  Constructor,
  Fluent,
  Index,
  Use,
  Factory,
  MaybeCallable,
  When,
} from './utility'

/**
 * # Bud Framework
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/framework](#)
 * [📦 @roots/bud-framework](https://www.npmjs.com/package/@roots/bud-framework)
 * [🔗 Documentation](#)
 */
export declare interface Framework extends Framework.Api {
  /**
   * ## bud.args [🍱 _Container_]
   *
   * CLI arguments passed to Bud.
   *
   * [🔗 Documentation on bud.args](#)
   * [🔗 Documentation on containers](#)
   *
   * ### Usage
   *
   * #### Flags
   *
   * ```sh
   * $ bud build --html
   * ```
   *
   * ```js
   * bud.args.has('html') // => true
   * ```
   *
   * #### Values
   *
   * ```sh
   * $ bud build --html dist/index.html
   * ```
   *
   * ```js
   * bud.args.get('html') // => 'dist/index.html'
   * ```
   *
   * #### Arrayed
   *
   * ```sh
   * $ bud build --bento uni rainbow edamame
   * # or
   * $ bud build --bento uni --bento rainbow --bento edamame
   * ```
   *
   * ```js
   * bud.args.get('bento') // => ['uni', 'rainbow', 'edamame']
   * ```
   */
  args: Framework.Container

  /**
   * ## bud.config [🍱 _Container_]
   *
   * Webpack configuration settings
   *
   * [🔗 Documentation on bud.config](#)
   * [🔗 Documentation on containers](#)
   */
  config: Framework.Container

  /**
   * ## bud.features [🍱 _Container_]
   *
   * Collection of feature flags each indicating
   * whether or not a  particular feature
   * is enabled or disabled.
   *
   * [🔗 Documentation on bud.features](#)
   * [🔗 Documentation on containers](#)
   *
   * ### Usage
   *
   * **Get the features store**
   *
   * ```js
   * bud.features.all() // returns all the features as a `k => v` obj.
   * ```
   *
   * **Check if a given feature is enabled**
   *
   * ```js
   * bud.features.enabled('minify') // `true` if `minify` flag is on
   * ```
   *
   * **Toggle a feature**
   *
   * ```js
   * bud.features.set('gzip', false) // disable `gzip` feature flag
   * ```
   */
  features: Framework.Container

  /**
   * ## bud.patterns [🍱 _Container_]
   *
   * Collection of common RegExp objects.
   *
   * The advantage of using them in
   * a container object is that they can be
   * easily redefined by extensions.
   *
   * - [🔗 Documentation on bud.patterns](#)
   * - [🔗 Documentation on containers](#)
   *
   * ### Usage
   *
   * **Get a regular expression matching files with `.js` extension**
   *
   * ```js
   * bud.patterns.get('js')
   * ```
   *
   * **Redefine a regular expression**
   *
   * ```js
   * bud.patterns.set('cssModule', /\.module\.css$/)
   * ```
   */
  patterns: Framework.Container

  /**
   * ## bud.presets [🍱 _Container_]
   *
   * Preset configuration container
   */
  presets: Framework.Container

  /**
   * ## bud.serverConfig [🍱 _Container_]
   *
   * Server configuration container
   */
  serverConfig: Framework.Container

  register(): void

  boot(): void

  /**
   * ## bud.build
   *
   * Webpack configuration builder class. [🔗 Documentation](#)
   */
  build: Framework.Build

  /**
   * ## bud.cache
   */
  cache: Framework.Cache

  /**
   * ## bud.compiler
   */
  compiler: Framework.Compiler

  /**
   * ## bud.cli
   *
   * The CLI interface also exposes methods for displaying
   * configuration progress, reports and errors.
   *
   * - [🔗 Documentation](#)
   */
  cli: Framework.CLI.Runner

  /**
   * ## bud.disk
   *
   * Index of virtual filesystems. Allows for swapping
   * "disks". Each disk is the same class as `bud.fs` (which
   * is always set to the `bud.project` rootDir).
   *
   * @note disks do not index `.gitignore` matches by default
   * @note disks do not index `node_modules` by default
   *
   * [🔗 Documentation on bud.disk](#)
   *
   * ### Usage
   *
   * #### List file contents of project
   *
   * ```js
   * bud.disk.get('project').ls()
   * ```
   *
   * #### Get the absolute path of this class.
   *
   * ```js
   * bud.disk.get(`@roots`).get('bud-framework/src/Bud/index.js')
   * ```
   */
  disk: Framework.FileSystem

  /**
   * ## bud.env [🍱 _Container_]
   *
   * Container for definitions founds in the
   * application `.env` file *
   *
   * - [🔗 Documentation](#)
   *
   * ### Usage
   * ```js
   * bud.env.get('APP_NAME')
   * ```
   */
  env: Framework.Env

  /**
   * ## bud.extensions
   *
   * Bud extension controller class.
   *
   * - [🔗 Documentation](#)
   */
  extensions: Framework.Extensions

  /**
   * ## bud.fs
   *
   * Project filesystem. [🔗 Documentation on bud.fs](#)
   *
   * ```js
   * bud.fs.readJson('project.json')
   * ```
   *
   * ```js
   * bud.fs.has('src/index.js')
   * ```
   */
  fs: Framework.FileContainer

  /**
   * ## bud.hooks
   *
   * Bud provides a system of 'hooks' to expose values
   * for easier modification.
   *
   * - [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ####  Add a new entry to the `webpack.externals` configuration:
   *
   * ```js
   * bud.hooks.on(
   *   'webpack.externals',
   *   externals => ({
   *     ...externals,
   *     $: 'jquery',
   *   }),
   * )
   * ```
   *
   * #### Change the `webpack.output.filename` format:
   *
   * ```js
   * bud.hooks.on(
   *   'webpack.output.filename',
   *   () => '[name].[hash:4]',
   * )
   * ```
   *
   * #### Replace the regular expression used for CSS modules:
   *
   * ```js
   * bud.hooks.on(
   *   'webpack.module.rules.oneOf.css.test',
   *   () => /\.css$/,
   * )
   * ```
   */
  hooks: Framework.Hooks

  /**
   * ## bud.logger
   *
   * Logging utility
   *
   * [🔗 Documentation on bud.mode](#)
   */
  logger: Framework.Logger

  /**
   * ## bud.mode
   */
  mode: Framework.Mode

  /**
   * ## bud.server
   *
   * Express application server used for development.
   *
   * - [🔗 Documentation](#)
   */
  server: Framework.Server

  /**
   * ## bud.use [💁 Fluent]
   *
   * Register an extension or set of extensions [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.use(['@roots/bud-babel', '@roots/bud-react'])
   * ```
   */
  use: Framework.Use

  /**
   * Initialize class
   */
  init(): Framework

  /**
   * ## bud.get  [🏠 Internal]
   *
   * ```js
   * bud.get()
   * ```
   */
  get(): Framework

  /**
   * ## bud.set  [🏠 Internal]
   *
   * ```js
   * bud.set()
   * ```
   */
  set<T = any>(prop: string, value: T): void

  /**
   * ## bud.callMeMaybe
   *
   * If a value is a function it will call that
   * function and return the result.
   *
   * If the value is not a function it will return its value.
   *
   * ```js
   * const isAFunction = (option) => `option value: ${option}`
   * const isAValue = 'option value: true'
   *
   * bud.callMeMaybe(isAFunction, true)
   * // => `option value: true`
   *
   * bud.callMeMaybe(isAValue)
   * // => `option value: true`
   * ```
   */
  callMeMaybe<I = unknown>(value: Framework.MaybeCallable<I>): I

  /**
   * ## bud.makeContainer
   *
   * Create a new container. May be passed an initial set of values.
   *
   * [🔗 Documentation on containers](#)
   */
  makeContainer(
    repository?: Framework.Index<any>,
  ): Framework.Container

  /**
   * ## bud.makeDisk
   *
   * Create a new disk. Provide a name, root directory, and -- optionally --
   * a custom glob array. [🔗 Documentation on bud.disk](#)
   *
   * ### Usage
   *
   * ```js
   * bud.makeDisk(
   *   'icons',
   *   bud.project('assets/icons'),
   *   ['*.svg'],
   * )
   * ```
   */
  makeDisk(name: string, dir: string, glob?: string[]): void

  /**
   * ## bud.pipe [💁 Fluent]
   *
   * Execute an array of functions. Each will be passed a fresh
   * copy of the bud object.
   *
   * ### Usage
   *
   * ```js
   * bud.pipe([
   *   bud => bud.srcPath('resources'),
   *   bud => bud.proxy(),
   * ])
   * ```
   */
  pipe(fns: CallableFunction[]): this

  /**
   * ## bud.when  [💁 Fluent]
   *
   * Executes a function if a given test is `true`. [🔗 Documentation](#)
   *
   * - The first parameter is the conditional check.
   * - The second parameter is the function to be run if `true`.
   * - The third paramter is optional; ran if not `true`.
   *
   * ### Usage
   *
   * ```js
   * bud.when(bud.mode.is('production'), () => bud.vendor())
   * ```
   */
  when: Framework.When
}

export namespace Framework {
  export type {Api}
  export type {Build}
  export type {Cache}
  export type {CLI}
  export type {Compiler}
  export type {Container}
  export type {Env}
  export type {Extensions, Extension}
  export type {FileContainer}
  export type {FileSystem}
  export type {Item}
  export type {Mode}
  export type {Module}
  export type {Hooks}
  export type {Loader}
  export type {Logger}
  export type {Rule}
  export type {Server}
  export type {Service}
  export type {ServiceContainer}
  export type {
    CompressionPlugin,
    Constructor,
    Express,
    Factory,
    Fluent,
    GlobTask,
    Index,
    MaybeCallable,
    Use,
    When,
    Webpack,
    zlib,
  }
}

export type {
  Api,
  Build,
  Cache,
  CLI,
  Compiler,
  CompressionPlugin,
  Container,
  Constructor,
  Env,
  Extensions,
  Extension,
  Module,
  Express,
  Factory,
  FileContainer,
  FileSystem,
  Fluent,
  GlobTask,
  Hooks,
  Index,
  Item,
  Loader,
  Logger,
  MaybeCallable,
  Mode,
  Rule,
  Server,
  Service,
  ServiceContainer,
  Use,
  When,
  Webpack,
  zlib,
}
