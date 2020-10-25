import {BuiltInParserName} from 'prettier'

export {Bud}

/**
 * Core unit of the Bud application.
 */
declare class Bud {
  /**
   * @note I'm not sure how to type something this flexible.
   */
  [key: string]: any

  private static PRIMARY_DISK: string

  /**
   * Builds webpack configuration.
   */
  public build: Framework.Build

  /**
   * CLI controller interface.
   *
   * Gateway to Ink application instance for build and
   * development reporting.
   */
  public cli: Framework.CLI.Controller

  /**
   * Interface wrapping the webpack compiler.
   */
  public compiler: Framework.Compiler

  /**
   * FS instance.
   */
  public disk: Framework.FileSystem

  /**
   * Env variables.
   *
   * @note frozen
   */
  public env: Framework.Env

  /**
   * Features (boolean flags)
   */
  public features: Framework.Features

  /**
   * Filesystem interface.
   *
   * Used for interacting with project, framework and extension files.
   */
  public fs: Framework.FileContainer

  /**
   * Extensions controller.
   */
  public extensions: Framework.Extensions

  /**
   * Features.
   */
  public features: Framework.Features

  /**
   * Hooks system.
   */
  public hooks: Framework.Hooks

  /**
   * Logger
   */
  public logger: Framework.Logger

  /**
   * Simple container interface for querying and
   * modifying Webpack mode.
   *
   * @see {Webpack.Mode}
   */
  public mode: Framework.Mode

  /**
   * WDS wrapper.
   */
  public server: Framework.Server

  /**
   * Simple utilities.
   * @deprecated
   */
  public util: Framework.Util

  /**
   * Register services, functions, on Bud.
   */
  register({
    api,
    builders,
  }: {
    api: any
    builders: any
  }): void

  /**
   * Make a new disk virtual disk.
   */
  makeDisk(
    key: string,
    baseDir?: string,
    glob?: string[],
  ): Framework.FileContainer

  /**
   * Bind and assign functions to Bud.
   */
  mapCallables(
    callables: Framework.Index<CallableFunction>,
  ): void
}



export type Util = {
  format: Format,
  pretty: Pretty,
}

export type Pretty = (
  contents: string,
  parser: BuiltInParserName,
) => string

export type Format = (
  obj: unknown,
  options?
) => string
