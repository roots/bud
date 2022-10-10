import type {
  MultiCompiler as WebpackMultiCompiler,
  MultiStats,
  Stats,
  StatsCompilation,
} from 'webpack'

import type {Service as BaseService} from '../../service'

/**
 * Compiler service interface
 *
 * @remarks
 * Compiles the configuration provided by bud.build
 * and reports compilation results and errors
 *
 * @public
 */
interface Service extends BaseService {
  /**
   * Compiler function
   *
   * @public
   */
  implementation: (...params: Array<any>) => any

  /**
   * The compilation
   *
   * @public
   */
  instance: any

  /**
   * The final configuration
   *
   * @public
   */
  config: Array<any>

  /**
   * Contains compilation stats, if available.
   *
   * @public
   */
  stats: StatsCompilation

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
   * Handle compilation results and errors
   *
   * @public
   */
  callback(error: Error, stats: Stats & MultiStats): void

  /**
   * Handle compiler results
   *
   * @public
   */
  handleStats(stats: Stats & MultiStats): void

  /**
   * Handle compiler errors
   *
   * @public
   */
  onError(error: any): void
}

export {Service}
