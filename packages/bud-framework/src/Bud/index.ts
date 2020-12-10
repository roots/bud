import {Container} from '@roots/container'
import {FileContainer, FileSystem} from '@roots/filesystem'
import * as util from './util'
import {Mode} from './Mode'
import {Framework} from './Framework'

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
class Bud extends Framework {
  [key: string]: any

  /**
   * ## bud.args [🍱 _Container_]
   *
   * Collection of the arguments passed to the Framework and their values.
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
  public args: Framework['args']

  /**
   * ## bud.cache
   *
   * Cache controller class.
   *
   * - [🔗 Documentation](#)
   */
  public cache: Framework['cache']

  /**
   * ## bud.cli
   *
   * The CLI interface also exposes methods for displaying
   * configuration progress, reports and errors.
   *
   * - [🔗 Documentation](#)
   */
  public cli: Framework['cli']

  /**
   * ## bud.compiler
   *
   * Webpack compilation controller class.
   *
   * - [🔗 Documentation](#)
   */
  public compiler: Framework['compiler']

  /**
   * ## bud.config [🍱 _Container_]
   *
   * Webpack configuration settings
   *
   * [🔗 Documentation on bud.config](#)
   * [🔗 Documentation on containers](#)
   */
  public config: Framework['config']

  /**
   * ## bud.build
   *
   * Webpack configuration builder class. [🔗 Documentation](#)
   */
  public build: Framework['build']

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
  public disk: Framework['disk']

  /**
   * ## bud.env [🍱 _Container_]
   *
   * Container for definitions founds in the application `.env` file *
   *
   * - [🔗 Documentation](#)
   *
   * ### Usage
   * ```js
   * bud.env.get('APP_NAME')
   * ```
   */
  public env: Framework['env']

  /**
   * ## bud.extensions
   *
   * Bud extension controller class.
   *
   * - [🔗 Documentation](#)
   */
  public extensions: Framework['extensions']

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
  public fs: Framework['fs']

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
  public hooks: Framework['hooks']

  /**
   * ## bud.logger
   *
   * [pino](#) logger instance
   */
  public logger: Framework['logger'] = util.logger

  /**
   * Mode
   */
  public mode: Framework['mode']

  /**
   * ## bud.server
   *
   * Express application server used for development.
   *
   * - [🔗 Documentation](#)
   */
  public server: Framework['server']

  /**
   * Bud options.
   */
  public options: Container

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

  public presets: Container

  /**
   * ## bud.components [🍱 _Container_]
   *
   * Registry for services to be held before initialization.
   */
  public api: Container
  public components: Container
  public services: Container

  /**
   * Class constructor
   */
  public constructor(implementations: {
    api: {[key: string]: CallableFunction}
    components: {[key: string]: unknown}
    presets: {[key: string]: unknown}
    services: {[key: string]: unknown}
  }) {
    super()

    this.get = this.get.bind(this)
    this.callMeMaybe = this.callMeMaybe.bind(this)
    this.makeContainer = this.makeContainer.bind(this)

    Object.entries(implementations).forEach(([name, set]) => {
      this[name] = this.makeContainer(set)
    })
  }

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
  public callMeMaybe: Framework['callMeMaybe'] = util.callMeMaybe

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
      base: this.fs.path.resolve(__dirname, dir),
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

  protected register(containers: [string, any][]): void {
    // implement in extending class
  }

  protected _boot(): this {
    this.args.has('mode')
      ? this.mode.set(this.args.get('mode'))
      : this.mode.set('none')

    this.boot()

    return this
  }

  protected boot(): void {
    // implement in extending class
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

  export type Bootstrap = (initFn: (this: Bud) => void) => Bud

  export type DiskDefinition = {
    [key: string]: {glob: string[]; baseDir: string}
  }

  export type Service<T = unknown> = T
}

export {Bud}
