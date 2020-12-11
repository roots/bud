import type {Webpack} from '@roots/bud-typings'

/**
 * Compiler namespace
 */
export declare namespace CompilerInterface {
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
