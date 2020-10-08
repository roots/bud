import * as pino from 'pino'

import Compiler from '@roots/bud-compiler'
import Server from '@roots/bud-server'
import {FileContainer, FileSystem} from '@roots/filesystem'
import Webpack from 'webpack'
import Build from '../Build'
import Components from '../Components'
import corePlugins from '../Components/plugins'
import {Extensions} from '../Extend/Extensions'
import Hooks from '../Extend/Hooks'
import * as Model from '../Model'
import * as Config from '@roots/bud-config'
import Store from '../Store'
import {env} from './env'
import format from './util/format'
import logger from './util/logger'
import pretty, {Pretty} from './util/pretty'

import filesystemSetup from './bootstrap/filesystemSetup'
import parseArguments from './bootstrap/parseArguments'

/**
 * Bud core.
 *
 * @class Bud
 */
class Bud implements Framework.IBud {
  /**
   * Escape hatch
   *
   * @todo remove this once type safe.
   */
  [key: string]: unknown

  /**
   * Name of primary virtual disk (fallback for bud.disks/bud.fs)
   *
   * @private
   * @static
   * @memberof Bud
   */
  private static PRIMARY_DISK = 'project'

  /**
   * Build function.
   *
   * @description Generates webpack configuration
   * @type {Bud.Build}
   * @memberof Bud
   */
  public build: Framework.Build

  /**
   * Build components (loaders, rules, etc.)
   *
   * @type {Store}
   * @memberof Bud
   */
  public components: Framework.Store

  /**
   * Compiler instance.
   *
   * @type {Compiler}
   * @memberof Bud
   */
  public compiler: Compiler

  /**
   * Disks instance.
   *
   * @type {FileSystem}
   * @memberof Bud
   */
  public disks: FileSystem

  /**
   * Env variables.
   *
   * @note this variable is frozen.
   *
   * @type {Bud.Env}
   * @memberof Bud
   */
  public env: Framework.Env

  /**
   * Extensions controller.
   *
   * @type {Controller}
   * @memberof Bud
   */
  public extensions: Framework.Extensions

  /**
   * Filesystem.
   *
   * @type {FileContainer}
   * @memberof Bud
   */
  public fs: FileContainer

  /**
   * Hooks system.
   *
   * @type {Hooks}
   * @memberof Bud
   */
  public hooks: Framework.Hooks

  /**
   * WDS wrapper.
   *
   * @type {Server.Interface}
   * @memberof Bud
   */
  public server: Server.Interface

  /**
   * Logger
   *
   * @type {pino.Logger}
   * @memberof Bud
   */
  public logger: pino.Logger = logger

  /**
   * Mode
   *
   * @type {Framework.Mode}
   * @memberof Bud
   */
  public mode: Framework.Mode

  /**
   * Key/Value store.
   *
   * @see {Index<T>}
   * @type {Store}
   * @memberof Bud
   */
  public store: Framework.Store

  /**
   * Utilities/helpers.
   *
   * @property format - formatting util.
   * @property pretty - prettier util.
   */
  public util: {
    format: (obj: unknown, options: unknown) => string
    pretty: Pretty
  } = {
    format,
    pretty,
  }

  /**
   * API
   */
  dist: Config.dist
  distPath: Config.distPath
  srcPath: Config.srcPath
  projectPath: Config.projectPath

  /**
   * Creates an instance of Bud.
   *
   * @memberof Bud
   */
  public constructor() {
    this.hooks = Hooks(this.logger)
    this.components = new Store()
    this.store = new Store()
    this.extensions = new Extensions(this)
    this.disks = new FileSystem()
    this.fs = new FileContainer()
    this.compiler = new Compiler()
    this.server = new Server()

    this.init()
  }

  /**
   * Initialize the instance of Bud.
   *
   * @private
   * @memberof Bud
   */
  public init() {
    /**
     * Bind the build function.
     */
    this.build = Build.bind(this)

    /**
     * Bind the frozen object form of env.
     */
    this.env = env.bind(this)()

    /**
     * Load the Bud.Store with initial models.
     */
    Object.entries(Model).map(([name, model]) => {
      return this.store.create(name, model)
    })

    /**
     * Return the current compilation mode
     *
     * @todo A terrible place to instantiate Bud.mode
     *
     * @see {Webpack.Configuration['mode']}
     * @memberof Bud
     */
    this.mode = {
      is: (check: unknown) =>
        this.store['build'].is('mode', check),
      get: () => this.store['build'].get('mode'),
      set: (mode: Webpack.Configuration['mode']) => {
        this.store['build'].set('mode', mode)
        return this
      },
    }

    // Binds API
    Object.entries(Config).map(
      ([name, fn]: [string, CallableFunction]) => {
        this[name] = fn.bind(this)
      },
    )

    // Manufactures interfaces used by bud.build
    Object.entries(Components(this)).map(([name, component]) => {
      return this.components.create(name, component)
    })

    // Setup filesystem.
    filesystemSetup.bind(this)()

    // Parse CLI arguments and do early config.
    parseArguments.bind(this)()

    // Boot extensions.
    this.extensions.boot(corePlugins)
  }

  /**
   * Make a new disk virtual disk.
   *
   * @param {string} [key=Bud.PRIMARY_DISK]
   * @param {string} [baseDir]
   * @param {string[]} [glob]
   * @returns {FileContainer}
   * @memberof Bud
   */
  public makeDisk(
    key: string = Bud.PRIMARY_DISK,
    baseDir?: string,
    glob?: string[],
  ): FileContainer {
    return this.disks.set(key, {
      baseDir,
      glob,
    })
  }

  /**
   * Load a disk in place of the current one.
   *
   * @param {string} [key=Bud.PRIMARY_DISK]
   * @returns {FileContainer}
   * @memberof Bud
   */
  public useDisk(key: string = Bud.PRIMARY_DISK): FileContainer {
    return this.disks.get(key)
  }

  /**
   * Make a container.
   *
   * @param {string} baseDir
   * @returns {FileContainer}
   * @memberof Bud
   */
  public makeContainer(baseDir: string): FileContainer {
    return new FileContainer(baseDir ?? process.cwd())
  }
}

export {Bud as default}
