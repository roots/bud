/**
 * @module @roots/bud-framework
 */

import {Service} from './'
import {
  Configuration,
  MultiCompiler as WebpackMultiCompiler,
  Compiler as WebpackCompiler,
  ProgressPlugin,
  StatsError,
  StatsCompilation,
} from 'webpack/types'

export interface Compiler extends Service {
  /**
   * The compiler instance
   */
  instance: Compiler.Instance

  /**
   * Has already been ran
   */
  isCompiled: boolean

  /**
   * Compiler stats output
   */
  stats: any

  /**
   * Formatted progress plugin
   */
  progress: Compiler.Progress

  /**
   * ## bud.compiler.compile
   *
   * Return a compiler instance for a webpack configuration.
   *
   * ### Usage
   *
   * ```js
   * bud.compiler.compile()
   * ```
   *
   * ```js
   * bud.compiler.compile({
   *   entry: {app: 'foo.js'}
   * })
   * ```
   */
  compile(): Compiler.Instance

  /**
   * ## bud.compiler.before
   *
   * Parses configuration from bud
   */
  before(): any

  /**
   * Compilation callback
   */
  callback(err: StatsError, stats: StatsCompilation): void
}

export namespace Compiler {
  export type Config = Configuration
  export type Instance = WebpackCompiler | WebpackMultiCompiler

  export type Progress = any

  export namespace Progress {
    export type Handler = ProgressPlugin['handler']
  }
}
