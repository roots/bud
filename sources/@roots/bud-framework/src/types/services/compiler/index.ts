import type {
  Configuration,
  MultiCompiler,
  MultiStats,
  ProgressPlugin,
  Stats,
  StatsCompilation,
} from '@roots/bud-support/webpack'

import type {Service as BaseService} from '../../../service.js'

/**
 * Compiler service interface
 *
 * @remarks
 * Compiles {@link @roots/bud-Bud#Build.config | Build config}
 * and reports on stats, progress, and errors encountered during compilation.
 */
interface Service extends BaseService {
  implementation: any

  /**
   * The compiler instance
   *
   * @public
   */
  instance: MultiCompiler

  config: Array<Configuration>

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
  compile(): Promise<MultiCompiler>

  onStats(stats: Stats & MultiStats): Promise<void>

  onError(error: any): void
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
