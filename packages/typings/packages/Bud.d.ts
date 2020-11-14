import {
  Build,
  Cache,
  Compiler,
  Container,
  Extensions,
  FileSystem,
  FileContainer,
  Env,
  Hooks,
  Index,
  Logger,
  Mode,
  CLI,
  Server,
} from './'

export interface App extends Contract {
  /**
   * argv
   */
  args: Container

  /**
   * webpack configuration
   */
  config: Container

  /**
   * feature flags
   */
  features: Container

  /**
   * shared regular expressions
   */
  patterns: Container

  /**
   * Builds webpack config.
   */
  build: Build.Contract

  /**
   * Cache
   */
  cache: Cache.Contract

  /**
   * CLI
   */
  cli: CLI.Runner

  /**
   * env
   */
  env: Env.Contract

  /**
   * Hooks
   */
  hooks: Hooks.Contract

  /**
   * Extensions controller instance.
   */
  extensions: Extensions.Contract

  /**
   * Compiler controller instance.
   */
  compiler: Compiler.Contract

  /**
   * Server controller instance.
   */
  server: Server.Contract

  /**
   * Initialize disks
   */
  disks: () => this

  /**
   * Register
   */
  register: () => this

  /**
   * Boot
   */
  boot: () => this
}

/**
 * Core unit of the Bud application.
 */
export interface Contract {
  [key: string]: any

  /**
   * Services registered to the framework.
   */
  registry: Container

  /**
   * Disks.
   */
  disk: FileSystem

  /**
   * Project files.
   */
  fs: FileContainer

  /**
   * Logger
   */
  logger: Logger.Contract

  /**
   * ## Mode
   *
   * Simple container interface for querying and
   * modifying Webpack mode.
   */
  mode: Mode.Contract

  /**
   * Make a new container.
   */
  makeContainer(repository?: {[key: string]: any}): Container

  /**
   * Make a new container.
   */
  init(): this
}

export type Format = (obj: unknown, options?) => string

export type BuilderDefinition<T = any> = [
  Index<T>,
  BuilderDefinition.Initializer<T>,
]

export namespace BuilderDefinition {
  export interface Args<Type> {
    this: Contract
    definition: [string, Type]
  }

  export type Initializer<Type> = (
    this: Contract,
    [name, object]: [string, Type],
  ) => void
}

export type When = (
  this: Contract,
  test: boolean,
  isTrue: (bud: Contract) => unknown,
  isFalse?: (bud: Contract) => unknown,
) => Contract

export type Bootstrap = (
  initFn: (this: Contract) => void,
) => Contract

export interface ConstructorParameters {
  [key: string]: any
}

export type DiskDefinition = {
  [key: string]: {glob: string[]; baseDir: string}
}

export type Service<T = unknown> = T
