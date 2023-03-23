import type {ErrorWithSourceFile} from '@roots/bud-support/open'
import type {
  Configuration,
  MultiCompiler,
  MultiStats,
  ProgressPlugin,
  StatsCompilation,
  StatsError,
} from '@roots/bud-support/webpack'

import type {Contract} from '../../../service.js'

/**
 * Compiler service
 */
interface Service extends Contract {
  /**
   * Compiler implementation
   */
  implementation: any

  /**
   * The compiler instance
   */
  instance: MultiCompiler

  /**
   * The compiler configuration
   */
  config: Array<Configuration>

  /**
   * Contains compilation stats, if available.
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
   */
  compile(): Promise<MultiCompiler>

  onStats(stats: MultiStats): Promise<void>

  onError(error: Error): Promise<void>

  sourceErrors(
    errors: Array<StatsError>,
  ): Array<ErrorWithSourceFile | StatsError>
}

export type BudError = {
  file: string
  line: number
  column: number
  message: string
  type: 'syntax' | 'export'
}

export type Config = Configuration

export type Progress = [number, string]

export namespace Progress {
  export type Handler = ProgressPlugin['handler']
}

export {Service}
