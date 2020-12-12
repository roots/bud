import {Container} from '@roots/container'
import {FileContainer, FileSystem} from '@roots/filesystem'

import {Framework} from './Framework'
import Mode from './Mode'

import * as util from './util'

import {
  Build,
  CLI,
  Compiler,
  Extensions,
  Hooks,
  MaybeCallable,
  Server,
} from '@roots/bud-typings'

/**
 * # Bud Framework
 *
 * Framework base class.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/framework](#)
 * [📦 @roots/bud-framework](https://www.npmjs.com/package/@roots/bud-framework)
 * [🔗 Documentation](#)
 */
abstract class Bud extends Framework {
  [key: string]: any

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
   * ## bud.build
   *
   * Webpack configuration builder class. [🔗 Documentation](#)
   */
  public build: Build

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
   * Collection of feature flags each indicating whether or not a
   * particular feature is enabled or disabled.
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
   * Mode
   */
  public mode: Mode

  /**
   * ## bud.server
   *
   * Express application server used for development.
   *
   * - [🔗 Documentation](#)
   */
  public server: Server.Contract

  /**
   * ## bud.patterns [🍱 _Container_]
   *
   * Collection of common RegExp objects. The advantage of using them in
   * a container object is that they can be easily redefined by extensions.
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
   * Constructor
   */
  public constructor(implementations) {
    super(implementations)
    this.callMeMaybe = this.callMeMaybe.bind(this)
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
   * const isAValue = `option value: true`
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
   * ## bud.init [🏠 Internal]
   *
   * Initializes base functions and yields the implementation class
   * if available.
   */
  public init(): this {
    this.mode = new Mode(this)

    this.api.every((name, fn) => {
      this[name] = fn.bind(this)
    })

    this.components.every((name, component) => {
      this[name] = component
    })

    this.services.every((name, Service) => {
      this[name] = new Service(this)
      this[name].init()
    })

    this.disk = new FileSystem()
    this.fs = new FileContainer(process.cwd())

    this._disks()
    this._register()
    this._boot()

    Object.defineProperty(this, 'logger', {
      enumerable: false,
    })

    Object.defineProperty(this.server, 'instance', {
      enumerable: false,
    })

    Object.defineProperties(this.fs, {
      fs: {enumerable: false},
      glob: {enumerable: false},
      path: {enumerable: false},
    })

    delete this._disks
    delete this._register
    delete this._boot
    delete this.boot
    delete this.register
    delete this.components

    return this
  }

  protected _register(): this {
    const containers = this.components.getEntries('containers')

    containers
      .filter(
        ([name]: [string, Container['repository']]) =>
          name !== 'serverConfig',
      )
      .forEach(
        ([name, repo]: [string, Container['repository']]) => {
          this[name] = this.makeContainer({...repo})
        },
      )

    this.register(containers)

    return this
  }

  protected _boot(): this {
    this.args.has('mode')
      ? this.mode.set(this.args.get('mode'))
      : this.mode.set('none')

    this.boot()

    return this
  }

  protected _disks(): void {
    this.fs.setBase(process.cwd())
    this.makeDisk('project', this.fs.base)
    this.makeDisk('@roots', '../../..')
  }
}

/**
 * Framework namespace
 */
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
