import type {Bud, Webpack} from '.'
import type {Instance} from 'ink'

/**
 * Compilation callback.
 */
export type Handler = Webpack.Compiler.Handler

/**
 * ProgressPlugin callback.
 */
export type ProgressHandler = Webpack.ProgressPlugin.Handler

export type Stats = {
  string: string
  json: Webpack.Stats.ToJsonOutput
}

export type StatsOptions = {
  string: Webpack.Stats.ToStringOptions
  json: Webpack.Stats.ToJsonOptions
}

export class Contract implements Interface {
  public constructor(bud: Bud)

  public compile(): Webpack.Compiler

  public get(): Webpack.Compiler

  public set(compiler: Webpack.Compiler): void

  public get instance(): Webpack.Compiler

  public set instance(compiler: Webpack.Compiler)

  public get stats(): Stats

  public set stats(stats: Stats)

  public get statsOptions(): StatsOptions

  public set statsOptions(options: StatsOptions)

  public get error(): Instance

  public set error(error: Instance)

  public run(): void

  public makeError(err: string): void

  public applyPlugins(handler: ProgressHandler): void
}

export interface Interface {
  compile(): Webpack.Compiler

  get(): Webpack.Compiler

  set(compiler: Webpack.Compiler): void

  instance: Webpack.Compiler

  stats: Stats

  statsOptions: StatsOptions

  error: Instance

  run(): void

  makeError(err: string): void

  applyPlugins(handler: ProgressHandler): void
}
