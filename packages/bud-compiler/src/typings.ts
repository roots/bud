import type {Bud, Webpack} from '@roots/bud-typings'
import type {Instance} from 'ink'

/**
 * Compiler
 */
declare class Compiler {
  public constructor(bud: Bud)

  public compile(): Webpack.Compiler

  public get(): Webpack.Compiler

  public set(compiler: Webpack.Compiler): void

  public get instance(): Webpack.Compiler

  public set instance(compiler: Webpack.Compiler)

  public get stats(): Compiler.Stats.Output

  public set stats(stats: Compiler.Stats.Output)

  public get statsOptions(): Compiler.Stats.Options

  public set statsOptions(options: Compiler.Stats.Options)

  public get error(): Instance

  public set error(error: Instance)

  public run(): void

  public makeError(err: string): void

  public applyPlugins(handler: Compiler.ProgressHandler): void
}

/**
 * Compiler namespace
 */
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
   * Compilation stats
   */
  export namespace Stats {
    /**
     * Compilation stats options
     */
    export type Options = {
      json: Webpack.Stats.ToJsonOptions
      string: Webpack.Stats.ToStringOptions
    }

    /**
     * Compilation stats output
     */
    export type Output = {
      string: string
      json: Webpack.Stats.ToJsonOutput
    }
  }
}

export {Compiler}
