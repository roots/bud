import type {Bud} from '@roots/bud-framework'
import type {
  Configuration,
  MultiCompiler,
  MultiStats,
  StatsCompilation,
  StatsError,
} from '@roots/bud-framework/config'

/**
 * Compiler service
 */
export interface Compiler {
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
  config: {parallelism?: number} & Array<Partial<Configuration>>

  /**
   * Format errors
   */
  formatErrors(
    errors: Array<StatsError> | undefined,
  ): Array<({file: string} & Error) | StatsError>

  /**
   * Compiler implementation
   */
  implementation: any

  /**
   * The compiler instance
   */
  instance: MultiCompiler

  /**
   * Stats handler
   */
  onStats(stats: MultiStats): void

  /**
   * Raw stats
   */
  stats: StatsCompilation
}

export type BudError = {
  column: number
  file: string
  line: number
  message: string
  type: 'export' | 'syntax'
}

export type Config = Configuration
