import * as pino from 'pino'

import * as Framework from '..'
import Compiler from '@roots/bud-compiler'
import Server from '@roots/bud-server'
import {FileContainer, FileSystem} from '@roots/filesystem'
import * as Config from '@roots/bud-config'
import {BuiltInParserName} from 'prettier'

export {IBud}

/**
 * Bud core.
 *
 * @class Bud
 */
declare interface IBud {
  /**
   * Escape hatch
   *
   * @todo remove this once type safe.
   */
  [key: string]: unknown

  /**
   * Build function.
   *
   * @description Generates webpack configuration
   * @type {Bud.Build}
   * @memberof Bud
   */
  build: Framework.Build

  /**
   * Build components (loaders, rules, etc.)
   *
   * @type {Store}
   * @memberof Bud
   */
  components: Framework.Store

  /**
   * Compiler instance.
   *
   * @type {Compiler}
   * @memberof Bud
   */
  compiler: Compiler

  /**
   * Disks instance.
   *
   * @type {FileSystem}
   * @memberof Bud
   */
  disks: FileSystem

  /**
   * Env variables.
   *
   * @note this variable is frozen.
   *
   * @type {Bud.Env}
   * @memberof Bud
   */
  env: Framework.Env

  /**
   * Extensions controller.
   *
   * @type {Controller}
   * @memberof Bud
   */
  extensions: Framework.Extensions

  /**
   * Filesystem.
   *
   * @type {FileContainer}
   * @memberof Bud
   */
  fs: FileContainer

  /**
   * Hooks system.
   *
   * @type {Hooks}
   * @memberof Bud
   */
  hooks: Framework.Hooks

  /**
   * WDS wrapper.
   *
   * @type {Server.Interface}
   * @memberof Bud
   */
  server: Server.Interface

  /**
   * Logger
   *
   * @type {pino.Logger}
   * @memberof Bud
   */
  logger: pino.Logger

  /**
   * Mode
   *
   * @type {Framework.Mode}
   * @memberof Bud
   */
  mode: Framework.Mode

  /**
   * Key/Value store.
   *
   * @see {Index<T>}
   * @type {Store}
   * @memberof Bud
   */
  store: Framework.Store

  /**
   * Utilities/helpers.
   *
   * @property format - formatting util.
   * @property pretty - prettier util.
   */
  util: {
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
   * Initialize the instance of Bud.
   *
   * @private
   * @memberof Bud
   */
  init(): void

  /**
   * Make a new disk virtual disk.
   *
   * @param {string} [key=Bud.PRIMARY_DISK]
   * @param {string} [baseDir]
   * @param {string[]} [glob]
   * @returns {FileContainer}
   * @memberof Bud
   */
  makeDisk(
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
  useDisk(key: string): FileContainer

  /**
   * Make a container.
   *
   * @param {string} baseDir
   * @returns {FileContainer}
   * @memberof Bud
   */
  makeContainer(baseDir: string): FileContainer
}
