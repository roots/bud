import {Build, Env, Logger, Mode, Index} from '..'
import type {Compiler} from '../../../bud-compiler/src/Compiler'
import type {FileContainer, FileSystem} from '@roots/filesystem'
import type {Hooks} from '../../../bud-hooks/src/Hooks'
import type {Extensions} from '../../../bud-extensions/src/Extensions'
import {Extension} from '../../../bud-extensions/src/Extension'
import {BuiltInParserName} from 'prettier'
import {Indexed} from '@roots/container'
import {Server} from '../../../bud-server/src'

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
  public build: Build

  /**
   * Interface wrapping the webpack compiler.
   */
  public compiler: Compiler.Contract

  /**
   * FS instance.
   */
  public disk: FileSystem

  /**
   * Env variables.
   *
   * @note frozen
   */
  public env: Env

  /**
   * Filesystem interface.
   *
   * Used for interacting with project, framework and extension files.
   */
  public fs: FileContainer

  /**
   * Extensions controller.
   */
  public extensions: Extensions.Contract

  /**
   * Hooks system.
   */
  public hooks: Hooks.Contract

  /**
   * Logger
   */
  public logger: Logger

  /**
   * Simple container interface for querying and
   * modifying Webpack mode.
   *
   * @see {Webpack.Mode}
   */
  public mode: Mode

  /**
   * Preset configuration items.
   */
  public presets: Indexed

  /**
   * Run the build.
   */
  public run(): void

  /**
   * WDS wrapper.
   */
  public server: Server

  /**
   * Simple utilities.
   * @deprecated
   */
  public util: Util

  /**
   * Construct
   */
  public constructor(params?: ConstructorOptions)

  /**
   * Returns a proxy of this class.
   * Allows running functions calls, accessors and setters through the logger.
   */
  public getInstance(this: Bud): Bud

  /**
   * Bind and assign functions to Bud.
   */
  public mapCallables(callables: Index<CallableFunction>): void

  /**
   * When
   */
  public when: When

  /**
   * Make a new container.
   */
  public makeContainer(
    repository?: Container.Repository,
  ): Indexed

  public when: When

  /**
   * Run the build.
   */
  public run: () => void

  /**
   * Map containers.
   */
  public mapContainers(containers: Index<Index<unknown>>): void

  /**
   * Map builders.
   */
  public mapBuilders(builders: Index<BuilderDefinition>): void

  /**
   * Map services.
   */
  public mapServices(services: Index<Service>): void
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

export type Service = {
  (bud?: Bud): unknown
}

export type BuilderDefinition<T = any> = [
  Index<T>,
  BuilderDefinition.Initializer<T>,
]

export namespace BuilderDefinition {
  export interface Args<Type> {
    this: Bud
    definition: [string, Type]
  }

  export type Initializer<Type> = (
    this: Bud,
    [name, object]: [string, Type],
  ) => void
}

export declare type When = (
  this: Bud,
  testCase: boolean,
  trueCase: (bud: Bud) => unknown,
  falseCase?: (bud: Bud) => unknown,
) => Bud

export declare interface ConstructorOptions {
  api?: Index<CallableFunction>
  containers?: Index<Index<any>>
  builders?: Index<BuilderDefinition>
  plugins?: Index<Extension.Interface>
  services?: Index<Service>
}

export {Bud}
