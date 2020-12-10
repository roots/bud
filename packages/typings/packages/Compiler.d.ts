import type {Bud, Webpack} from '.'
import type {Instance} from 'ink'

declare class Compiler {
  public constructor(bud: Bud)

  public compile(): Webpack.Compiler

  public get(): Webpack.Compiler

  public set(compiler: Webpack.Compiler): void

  public get instance(): Webpack.Compiler

  public set instance(compiler: Webpack.Compiler)

  public get stats(): Compiler.Stats

  public set stats(stats: Compiler.Stats)

  public get statsOptions(): Compiler.StatsOptions

  public set statsOptions(options: Compiler.StatsOptions)

  public get error(): Instance

  public set error(error: Instance)

  public run(): void

  public makeError(err: string): void

  public applyPlugins(handler: Compiler.ProgressHandler): void
}

declare namespace Compiler {
  /**
   * Compilation callback.
   */
  export type Handler = Webpack.Compiler.Handler

  /**
   * ProgressPlugin callback.
   */
  export type ProgressHandler = Webpack.ProgressPlugin.Handler

  /**
   * Compiler stats.
   */
  export type Stats = {
    string: string
    json: Webpack.Stats.ToJsonOutput
  }

  /**
   * Compiler stats options.
   */
  export type StatsOptions = {
    string: Webpack.Stats.ToStringOptions
    json: Webpack.Stats.ToJsonOptions
  }
}

export {Compiler}
