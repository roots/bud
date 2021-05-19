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
   * Webpack stats configuration
   */
  statsOptions: {
    [key: string]: string | boolean
  }

  /**
   * Formatted progress plugin
   */
  progress: Compiler.Progress

  /**
   * Compiler errors
   */
  errors: string[]

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
   * Compilation callback
   */
  callback(
    err: Webpack.StatsError,
    stats: Webpack.StatsCompilation,
  ): void
}

export namespace Compiler {
  export type Compile = (
    config?: Compiler.Config,
    cb?: CallableFunction,
  ) => Webpack.Compiler

  export type Config = Webpack.Configuration
  export type Instance = Webpack.Compiler

  export type Progress = {
    percentage: string
    message: string
    decimal: number
  }

  export namespace Progress {
    export type Handler = ProgressPlugin['handler']
  }
}
