import Framework from '@roots/bud-typings'
import {FileContainer, FileSystem} from '@roots/filesystem'
import {Container} from '@roots/container'
import {Mode} from './Mode'
import * as util from './util'

export {Bud, Bud as default}

/**
 * # Bud Framework
 *
 * Framework class intended to be extended by a
 * more concrete initializing class.
 *
 *
 */
class Bud implements Framework.Bud.Core {
  /**
   * ## bud.registry [🍱 _Container_]
   *
   * Registry for services to be held before initialization.
   */
  public registry: Framework.Container

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
  public disk: Framework.FileSystem

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
  public fs: Framework.FileContainer

  public build: Framework.Build.Contract

  public hooks: Framework.Hooks.Contract<Framework.Bud.Core>

  public mode: Framework.Mode.Contract

  /**
   * ## bud.logger
   *
   * [pino](#) logger instance
   */
  public logger: Framework.Logger.Contract = util.logger

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
  public callMeMaybe: Framework.MaybeCallable = util.callMeMaybe

  /**
   * Class constructor
   */
  public constructor(
    registrables: Framework.Bud.ConstructorParameters,
  ) {
    this.makeContainer = this.makeContainer.bind(this)
    this.get = this.get.bind(this)

    this.registry = this.makeContainer(registrables)
  }

  /**
   * ## bud.makeContainer
   *
   * Create a new container. May be passed an initial set of values.
   *
   * [🔗 Documentation on containers](#)
   */
  public makeContainer<T = any>(
    repository?: Framework.Index<T>,
  ): Framework.Container<T> {
    return new Container<T>(repository ?? {})
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
  public init(
    this: Framework.Bud.Contract,
  ): Framework.Bud.Contract {
    this.mode = new Mode(this)

    this.disk = new FileSystem()

    this.fs = new FileContainer(process.cwd())

    // Fallback if class hasn't been extended.
    const value =
      this.disks && this.register && this.boot
        ? this.disks().register().boot()
        : this

    /**
     * Cleanup
     */
    delete this.disks
    delete this.register
    delete this.boot
    delete this.registry

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

    /**
     * Return initialized object
     */
    return value
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
  public get(): Framework.Bud.Bud {
    return this
  }
}
