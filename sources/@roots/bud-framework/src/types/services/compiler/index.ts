import type {ErrorWithSourceFile} from '@roots/bud-support/open'

import type {Contract} from '../../../service.js'
import type {
  Configuration,
  MultiCompiler,
  MultiStats,
  StatsCompilation,
  StatsError,
} from '../../config/index.js'

/**
 * Compiler service
 */
interface Service extends Contract {
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
  compile(): Promise<MultiCompiler>

  /**
   * The compiler configuration
   */
  config: Array<Configuration>

  /**
   * Compiler implementation
   */
  implementation: any

  /**
   * The compiler instance
   */
  instance: MultiCompiler

  onError(error: Error): Promise<void>

  onStats(stats: MultiStats): Promise<void>

  sourceErrors(
    errors: Array<StatsError>,
  ): Array<ErrorWithSourceFile | StatsError>

  /**
   * Contains compilation stats, if available.
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

export type {Service}
