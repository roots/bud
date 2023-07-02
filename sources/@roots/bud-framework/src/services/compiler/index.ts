import type {Bud} from '@roots/bud-framework'
import type {
  Configuration,
  MultiCompiler,
  MultiStats,
  Stats,
  StatsCompilation,
} from '@roots/bud-framework/config'

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

  /**
   * Compiler error handler
   */
  onError(error: Error): void

  /**
   * Stats handler
   */
  onStats(stats: MultiStats): void

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
