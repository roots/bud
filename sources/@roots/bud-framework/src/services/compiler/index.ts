import {
  Configuration,
  MultiCompiler as WebpackMultiCompiler,
  MultiStats,
  ProgressPlugin,
  Stats,
  StatsCompilation,
} from 'webpack'

import * as Bud from '../..'

/**
 * Compiler service interface
 *
 * @remarks
 * Compiles {@link @roots/bud-Bud#Build.config | Build config}
 * and reports on stats, progress, and errors encountered during compilation.
 *
 * @public
 */
interface Service extends Bud.Service {
  implementation: Implementation

  /**
   * The compiler instance
   *
   * @public
   */
  compilation: WebpackMultiCompiler

  /**
   * Contains compilation stats, if available.
   *
   * @public
   */
  stats: StatsCompilation

  errors: Array<any>

  /**
   * Returns a {@link WebpackMultiCompiler} instance
   *
   * @example
   * ```js
   * bud.compiler.compile()
   * ```
   *
   * @example
   * ```js
   * bud.compiler.compile([{
   *   entry: {app: 'foo.js'}
   * }])
   * ```
   *
   * @public
   */
  compile(): Promise<WebpackMultiCompiler>

  /**
   * Callback for {@link (Bud:namespace).Hooks | Bud.Hooks} `before` filter
   *
   * @remarks
   * Parses {@link (Bud:namespace).Build.config} instances and generates
   * final input for {@link (Compiler:interface).compile | Compiler.compile}
   *
   * @public
   */
  before(): any

  callback(error: Error, stats: Stats & MultiStats): void

  handleStats(stats: Stats & MultiStats): void

  onError(error: any): void
}

export type Config = Configuration
export type Implementation = (...params: any[]) => any

export type Progress = [number, string]

export namespace Progress {
  export type Handler = ProgressPlugin['handler']
}

export {Service}
