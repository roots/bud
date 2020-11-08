import {BuiltInParserName} from 'prettier'
import type {Compiler} from '../../../bud-compiler/src/Compiler'

export {Bud}

/**
 * Core unit of the Bud application.
 */
declare class Bud {
  /**
   * @note I'm not sure how to type something this flexible.
   */
  [key: string]: any

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
  public compiler: Compiler.Abstract

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
   * Run the build.
   */
  public run: () => void

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
   * Construct
   */
  public constructor(params?: {
    api?: Framework.Index<[string, CallableFunction]>
    builders?: any
    containers?: Framework.Index<Framework.Index<any>>
    services?: any
  })

  /**
   * Bind and assign functions to Bud.
   */
  public mapCallables(
    callables: Framework.Index<CallableFunction>,
  ): void
}

export type Util = {
  format: Format
  pretty: Pretty
}

export type Pretty = (
  contents: string,
  parser: BuiltInParserName,
) => string

export type Format = (obj: unknown, options?) => string

export type Builders = Array<
  [
    Framework.Index<any>,
    (
      this: Bud,
      [name, loader]: [
        string,
        (
          | Framework.Build.Loader
          | Framework.Item.Module
          | Framework.Rule.Module
        ),
      ],
    ) => void,
  ]
>

export interface Services {
  (this: Framework.Bud): {
    [key: string]: [
      service: NewableFunction,
      dependenies?: Framework.Index<any>,
    ]
  }
}
