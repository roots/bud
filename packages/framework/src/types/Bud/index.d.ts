import * as pino from 'pino'
import Compiler from '@roots/bud-compiler'
import {Server} from '@roots/bud-server'
import {FileContainer, FileSystem} from '@roots/filesystem'
import {BuiltInParserName} from 'prettier'

export declare class Bud {
  /**
   * @note I'm not sure how to type something this flexible.
   */
  [key: string]: any

  /**
   * Build function.
   *
   * @description Generates webpack configuration
   * @type {Bud.Build}
   */
  build: Framework.Build

  /**
   * Compiler instance.
   *
   * @type {Compiler}
   */
  compiler: Compiler

  /**
   * Disks instance.
   *
   * @type {FileSystem}
   */
  disk: FileSystem

  /**
   * Env variables.
   *
   * @note this variable is frozen.
   *
   * @type {Bud.Env}
   */
  env: Framework.Env

  /**
   * File container.
   */
  fs: FileContainer

  /**
   * Extensions controller.
   *
   * @type {Controller}
   */
  extensions: Framework.Extensions

  /**
   * Features.
   */
  features: Framework.Features

  /**
   * Hooks system.
   *
   * @type {Hooks}
   */
  hooks: Framework.Hooks

  /**
   * WDS wrapper.
   *
   * @type {Server.Interface}
   */
  server: Server.Server

  /**
   * Logger
   *
   * @type {pino.Logger}
   */
  logger: pino.Logger

  /**
   * Mode
   *
   * @type {Framework.Mode}
   */
  mode: Framework.Mode

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
   * Initialize the instance of Bud.
   *
   * @private
   */
  init(): void

  /**
   * Make a new disk virtual disk.
   *
   * @param {string} [key=Bud.PRIMARY_DISK]
   * @param {string} [baseDir]
   * @param {string[]} [glob]
   * @returns {FileContainer}
   */
  makeDisk(
    key: string,
    baseDir?: string,
    glob?: string[],
  ): FileContainer
}
