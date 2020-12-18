import {Container} from '@roots/container'
import {FileContainer, FileSystem} from '@roots/filesystem'
import Mode from '../Mode'
import * as util from '../util'
import {resolve} from 'path'

import {
  Build,
  CLI,
  Compiler,
  Env,
  Extensions,
  Hooks,
  Logger,
  MaybeCallable,
  Server,
} from '@roots/bud-typings'

/**
 * # Bud base class
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/framework](#)
 * [📦 @roots/bud-framework](https://www.npmjs.com/package/@roots/bud-framework)
 * [🔗 Documentation](#)
 */
abstract class Bud {
  [key: string]: any

  /**
   * ## bud.args [🍱 _Container_]
   *
   * CLI arguments passed to the Framework.
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
  public args: Container

  /**
   * ## bud.build
   *
   * Webpack configuration builder class. [🔗 Documentation](#)
   */
  public build: Build

  /**
   * ## bud.cache
   *
   * Cache controller class.
   *
   * - [🔗 Documentation](#)
   */
  public cache: Container

  /**
   * ## bud.cli
   *
   * The CLI interface also exposes methods for displaying
   * configuration progress, reports and errors.
   *
   * - [🔗 Documentation](#)
   */
  public cli: CLI.Runner

  /**
   * ## bud.compiler
   *
   * Webpack compilation controller class.
   *
   * - [🔗 Documentation](#)
   */
  public compiler: Compiler

  /**
   * ## bud.config [🍱 _Container_]
   *
   * Webpack configuration settings
   *
   * [🔗 Documentation on bud.config](#)
   * [🔗 Documentation on containers](#)
   */
  public config: Container

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
  public disk: FileSystem

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
  public env: Env

  /**
   * ## bud.extensions
   *
   * Bud extension controller class.
   *
   * - [🔗 Documentation](#)
   */
  public extensions: Extensions

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
   * bud.features.getStore() // returns all the features as a `k => v` obj.
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
  public features: Container

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
  public fs: FileContainer

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
  public hooks: Hooks

  /**
   * ## bud.logger
   *
   * [pino](#) logger instance
   */
  public logger: Logger = util.logger

  /**
   * ## bud.mode
   */
  public mode: Mode

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
  public patterns: Container

  /**
   * Presets
   */
  public presets: Container

  /**
   * ## bud.server
   *
   * Express application server used for development.
   *
   * - [🔗 Documentation](#)
   */
  public server: Server.Contract

  /**
   * ## bud.services
   */
  public services: Container

  /**
   * Constructor
   */
  public constructor(implementations: {
    [key: string]: {[key: string]: unknown}
  }) {
    this.get = this.get.bind(this)
    this.makeContainer = this.makeContainer.bind(this)
    this.callMeMaybe = this.callMeMaybe.bind(this)

    this.disk = new FileSystem()
    this.fs = new FileContainer()

    Object.entries(implementations).forEach(([name, set]) => {
      this[name] = this.makeContainer(set)
    })

    this.setup()
  }

  /**
   * ## bud.setup [🏠 Internal]
   *
   * Initializes base objects.
   */
  protected setup(): void {
    this.mode = new Mode(this)

    this.fs.setBase(process.cwd())

    this.makeDisk('project', this.fs.base)
    this.makeDisk('@roots', '../../..')

    this.api.every((name, fn) => {
      this[name] = fn.bind(this)
    })

    this.components.every((name, component) => {
      this[name] = component
    })

    this.services.every((name, Service) => {
      this[name] = new Service(this)
      this[name].init && this[name].init()
    })
  }

  /**
   * Initialize class
   */
  public init(): this {
    this.register()

    this.args.has('mode')
      ? this.mode.set(this.args.get('mode'))
      : this.mode.set('none')

    this.boot()

    return this
  }

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
  public callMeMaybe: <I = unknown>(
    value: MaybeCallable<I>,
  ) => I = util.callMeMaybe

  /**
   * ## bud.get  [🏠 Internal]
   *
   * Scope binding for bud.get
   *
   * ```js
   * bud.get()
   * ```
   */
  public get(): this {
    return this
  }

  /**
   * ## bud.makeContainer
   *
   * Create a new container. May be passed an initial set of values.
   *
   * [🔗 Documentation on containers](#)
   */
  public makeContainer(repository?: {
    [key: string]: any
  }): Container {
    return new Container(repository)
  }

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
  public makeDisk(
    name: string,
    dir: string,
    glob?: string[],
  ): void {
    this.disk.set(name, {
      base: resolve(__dirname, dir),
      glob: glob ?? ['**/*'],
    })
  }

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
  public pipe(fns): this {
    fns.reduce((_val, fn) => {
      return fn(this)
    }, this)

    return this
  }
}

declare namespace Bud {
  export type Ref = () => Bud

  export type Format = (obj: unknown, options?) => string
  export type BuilderDefinition<T = any> = [
    {[key: string]: T},
    BuilderDefinition.Initializer<T>,
  ]

  export namespace BuilderDefinition {
    export interface Args<Type> {
      this: Bud
      definition: [string, Type]
    }

    export type Initializer<Type> = (
      this: Bud,
      [name, object]: [string, Type],
    ) => void
  }

  export type DiskDefinition = {
    [key: string]: {glob: string[]; baseDir: string}
  }

  export type Service<T = unknown> = T
}

export {Bud}
