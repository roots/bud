import {
  Bud as Abstract,
  Build,
  Hooks,
  Logger,
  MaybeCallable,
} from '@roots/bud-typings'
import {FileContainer, FileSystem} from '@roots/filesystem'
import {Container} from '@roots/container'
import {Mode} from './Mode'
import * as util from './util'

export {Bud, Bud as default}

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
class Bud implements Abstract.Core {
  /**
   * ## bud.registry [🍱 _Container_]
   *
   * Registry for services to be held before initialization.
   *
   * Implementation should be provided by extending class.
   */
  public registry

  /**
   * ## bud.config  [🍱 _Container_]
   *
   * Implementation should be provided by extending class.
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

  public build: Build.Contract

  public hooks: Hooks.Contract

  public mode: Mode

  /**
   * ## bud.logger
   *
   * [pino](#) logger instance
   */
  public logger: Logger.Contract = util.logger

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
  public callMeMaybe: MaybeCallable = util.callMeMaybe

  /**
   * Class constructor
   */
  public constructor(registrables: {[key: string]: unknown}) {
    this.makeContainer = this.makeContainer.bind(this)
    this.get = this.get.bind(this)

    this.registry = this.makeContainer(registrables)
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
  public get(): Abstract.Bud {
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
  }): Framework.Container {
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
   * ## bud.init [🏠 Internal]
   *
   * Initializes base functions and yields the implementation class
   * if available.
   */
  public init(this: Framework.Bud.Contract): Abstract.Bud {
    this.mode = new Mode(this)

    this.disk = new FileSystem()

    this.fs = new FileContainer(process.cwd())

    if (this.disks) {
      this.disks()
      delete this.disks
    }

    if (this.register) {
      this.register()
      delete this.register
    }

    if (this.boot) {
      this.boot()
      delete this.boot
    }

    if (this.registry) {
      delete this.registry
    }

    this.logger &&
      Object.defineProperty(this, 'logger', {
        enumerable: false,
      })

    this.server.instance &&
      Object.defineProperty(this.server, 'instance', {
        enumerable: false,
      })

    this.fs.fs &&
      Object.defineProperties(this.fs, {
        fs: {enumerable: false},
        glob: {enumerable: false},
        path: {enumerable: false},
      })

    return this
  }
}
