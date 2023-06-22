import type {Bud} from '@roots/bud-framework'
import type {
  Configuration,
  MultiCompiler,
  MultiStats,
  Stats,
  StatsCompilation,
  StatsError,
} from '@roots/bud-framework/config'
import type {ErrorWithSourceFile} from '@roots/bud-support/open'

/**
 * Compiler service
 */
export interface Compiler {
  /**
   * Compilation stats
   */
  compilationStats: StatsCompilation

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
   */
  compile(bud: Bud): Promise<MultiCompiler>

  /**
   * The compiler configuration
   */
  config: Array<Configuration> & {parallelism?: number}

  /**
   * Compiler implementation
   */
  implementation: any

  /**
   * The compiler instance
   */
  instance: MultiCompiler

  label: string

  /**
   * Compiler error handler
   */
  onError(error: Error): Promise<void>

  /**
   * Stats handler
   */
  onStats(stats: MultiStats): Promise<void>

  /**
   * Determine source of module errors
   */
  sourceErrors(
    errors: Array<StatsError>,
  ): Array<ErrorWithSourceFile | StatsError>

  /**
   * Raw stats
   */
  stats: Stats & MultiStats
}

export type BudError = {
  column: number
  file: string
  line: number
  message: string
  type: 'export' | 'syntax'
}

export type Config = Configuration
