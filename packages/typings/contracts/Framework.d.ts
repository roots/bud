import {
  Api,
  Build,
  Cache,
  CLI,
  Compiler,
  CompressionPlugin,
  Constructor,
  Container,
  Env,
  Express,
  Extensions,
  Extension,
  Factory,
  Disk,
  Fluent,
  GlobTask,
  Module,
  Hooks,
  Index,
  Item,
  Loader,
  Logger,
  MaybeCallable,
  Mode,
  Providers,
  Rule,
  Server,
  Service,
  ServiceContainer,
  Store,
  Use,
  Webpack,
  When,
  zlib,
} from './'

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
   * ## bud.store [🍱 _Container_]
   *
   * Meta container for configs, data, etc.
   *
   * [🔗 Documentation on bud.config](#)
   * [🔗 Documentation on containers](#)
   */
  store: Framework.Container<Framework.Store.Source>

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
  cli: Framework.CLI

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
   * #### Get the absolute path of Framework class.
   *
   * ```js
   * bud.disk.get(`@roots`).get('bud-framework/src/Bud/index.js')
   * ```
   */
  disk: Framework.Disk

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
   * ## bud.services
   */
  services: Container<Framework.Service>

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
  init(): this

  /**
   * ## bud.get  [🏠 Internal]
   *
   * ```js
   * bud.get()
   * ```
   */
  get(): this

  /**
   * ## bud.access
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
   * bud.access(isAFunction, true)
   * // => `option value: true`
   *
   * bud.access(isAValue)
   * // => `option value: true`
   * ```
   */
  access<I = unknown>(value: Framework.MaybeCallable<I>): I

  /**
   * ## bud.makeContainer
   *
   * Create a new container. May be passed an initial set of values.
   *
   * [🔗 Documentation on containers](#)
   */
  makeContainer<I>(repository?: Index<I>): Framework.Container<I>

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

export declare namespace Framework {
  export {Api}
  export {Build}
  export {Cache}
  export {CLI}
  export {Compiler}
  export {Container}
  export {Disk}
  export {Env}
  export {Extensions, Extension}
  export {Item}
  export {Mode}
  export {Module}
  export {Hooks}
  export {Loader}
  export {Logger}
  export {Providers}
  export {Rule}
  export {Server}
  export {Service}
  export {Store}
  export {ServiceContainer}
  export {
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
