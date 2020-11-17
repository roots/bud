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
  MaybeCallable,
  Logger,
  Mode,
  CLI,
  Server,
} from './'

/**
 * Bud Framework
 */
export interface Contract<I = unknown> extends Core {
  [key: string]: any

  /**
   * argv
   */
  args: Container

  /**
   * Webpack Configuration
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
  hooks: Hooks.Contract<I>

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
  disks: () => Contract

  /**
   * Register
   */
  register: () => Contract

  /**
   * Boot
   */
  boot: () => Contract
}

export type Bud = Contract | Core
export type Ref = () => Bud
/**
 * Core unit of the Bud application.
 */
export interface Core {
  [key: string]: any

  registry: Container

  disk: FileSystem

  fs: FileContainer

  logger: Logger.Contract

  mode: Mode.Contract

  makeContainer<T = any>(repository?: {
    [key: string]: any
  }): Container<T>

  makeDisk(name: string, base: string, glob?: string[]): void

  init(): unknown

  get(): Framework.Bud.Bud
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
