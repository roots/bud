import * as pino from 'pino'

import * as Framework from '..'
import Compiler from '@roots/bud-compiler'
import Server from '@roots/bud-server'
import {FileContainer, FileSystem} from '@roots/filesystem'
import * as Config from '@roots/bud-config'
import {BuiltInParserName} from 'prettier'

export {Bud}

/**
 * Bud core.
 *
 * @class Bud
 */
declare class Bud {
  /**
   * Name of primary virtual disk (fallback for bud.disks/bud.fs)
   *
   * @private
   * @static
   * @memberof Bud
   */
  private static PRIMARY_DISK: string

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
  public logger: pino.Logger

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
    pretty: (
      contents: string,
      parser: BuiltInParserName,
    ) => string
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
  public constructor()

  /**
   * Initialize the instance of Bud.
   *
   * @private
   * @memberof Bud
   */
  private init(): void

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
    key: string,
    baseDir?: string,
    glob?: string[],
  ): FileContainer

  /**
   * Load a disk in place of the current one.
   *
   * @param {string} [key=Bud.PRIMARY_DISK]
   * @returns {FileContainer}
   * @memberof Bud
   */
  public useDisk(key: string): FileContainer

  /**
   * Make a container.
   *
   * @param {string} baseDir
   * @returns {FileContainer}
   * @memberof Bud
   */
  public makeContainer(baseDir: string): FileContainer
}
