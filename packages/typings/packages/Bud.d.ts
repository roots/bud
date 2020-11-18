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

export type Bud<T = Contract> = Partial<T>

export type Ref = () => Bud

/**
 * Bud Framework
 */
export interface Contract extends Core {
  [key: string]: any

  args: Container

  config: Container

  features: Container

  patterns: Container

  build: Build.Contract

  cache: Cache.Contract

  cli: CLI.Runner

  env: Env.Contract

  hooks: Hooks.Contract

  extensions: Extensions.Contract

  compiler: Compiler.Interface

  server: Server.Contract

  disks: () => this

  register: () => this

  boot: () => this
}

/**
 * Core unit of the Bud application.
 */
export interface Core {
  registry: Container

  config: Container

  disk: FileSystem

  fs: FileContainer

  logger: Logger.Contract

  mode: Mode.Contract

  makeContainer<T = unknown>(repository?: {
    [key: string]: T
  }): Container

  makeDisk(name: string, base: string, glob?: string[]): void

  init(): Bud

  get(): Bud
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

export type DiskDefinition = {
  [key: string]: {glob: string[]; baseDir: string}
}

export type Service<T = unknown> = T
