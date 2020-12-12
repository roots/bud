import {Env, Logger} from '@roots/bud-typings'

import {FileSystem} from '@roots/filesystem'
import {Container} from '@roots/container'

import {resolve} from 'path'
import * as util from './util'

/**
 * Framework.
 */
export abstract class Framework {
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
  public args: Container

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
   * Container for definitions founds in the application `.env` file *
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
   * ## bud.logger
   *
   * [pino](#) logger instance
   */
  public abstract logger: Logger = util.logger

  /**
   * ## bud.options
   */
  public abstract options: Container

  /**
   * ## bud.services
   */
  public services: Container

  protected abstract init(): void

  protected abstract _disks(): void

  protected abstract _register(): void

  protected abstract _boot(): void

  protected abstract boot(): void

  protected abstract register(containers: any[]): void

  /**
   * Class constructor
   */
  public constructor(implementations: {[key: string]: any}) {
    this.get = this.get.bind(this)
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
