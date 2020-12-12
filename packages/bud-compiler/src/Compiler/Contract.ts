import type {Instance} from 'ink'
import type {Webpack} from '@roots/bud-typings'

declare interface Compiler {
  compile(): Webpack.Compiler

  get(): Webpack.Compiler

  set(compiler: Webpack.Compiler): void

  instance: Webpack.Compiler

  stats: Compiler.Stats.Output

  statsOptions: Compiler.Stats.Options

  error: Compiler.Instance

  run(): void

  makeError(err: string): void

  applyPlugins(handler: Compiler.ProgressHandler): void
}

/**
 * Compiler namespace
 */
declare namespace Compiler {
  export type {Instance}

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

export default Compiler
