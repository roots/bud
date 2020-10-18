import {BuiltInParserName} from 'prettier'

/**
 * Bud.
 */
export declare class Bud {
  /**
   * @note I'm not sure how to type something this flexible.
   */
  [key: string]: any

  /**
   * Build.
   * @description Generates webpack configuration
   */
  build: Framework.Build

  /**
   * Compiler instance.
   */
  compiler: Framework.Compiler

  /**
   * FS instance.
   */
  disk: Framework.FileSystem

  /**
   * Env variables.
   *
   * @note frozen
   */
  env: Framework.Env

  /**
   * File container.
   */
  fs: Framework.FileContainer

  /**
   * Extensions controller.
   */
  extensions: Framework.Extensions

  /**
   * Features.
   */
  features: Framework.Features

  /**
   * Hooks system.
   */
  hooks: Framework.Hooks

  /**
   * WDS wrapper.
   */
  server: Framework.Server

  /**
   * Logger
   */
  logger: Framework.Logger

  /**
   * Mode
   */
  mode: Framework.Mode

  /**
   * Utilities/helpers.
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
   */
  init(): void

  /**
   * Make a new disk virtual disk.
   */
  makeDisk(
    key: string,
    baseDir?: string,
    glob?: string[],
  ): Framework.FileContainer
}
