import {Service} from '../Service'
import Webpack, {ProgressPlugin} from 'webpack/types'

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
  compile: Compiler.Compile

  /**
   * ## bud.compiler.before
   *
   * Parses configuration from bud
   */
  before(): any

  /**
   * Compilation callback
   */
  callback(
    err: Webpack.StatsError,
    stats: Webpack.StatsCompilation,
  ): void
}

export namespace Compiler {
  export type Compile = () => Instance

  export type Config = Webpack.Configuration
  export type Instance = Webpack.Compiler | Webpack.MultiCompiler

  export type Progress = any

  export namespace Progress {
    export type Handler = ProgressPlugin['handler']
  }
}
