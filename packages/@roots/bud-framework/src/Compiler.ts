import {
  Compiler as WebpackCompiler,
  Configuration,
  MultiCompiler as WebpackMultiCompiler,
  ProgressPlugin,
  StatsCompilation,
  StatsError,
} from 'webpack'

import {Service} from './'

/**
 * Compiler service interface
 *
 * @remarks
 * Compiles {@link @roots/bud-framework#Build.config | Build config}
 * and reports on stats, progress, and errors encountered during compilation.
 *
 * @public
 */
interface Compiler extends Service {
  /**
   * The compiler instance
   *
   * @public
   */
  instance: Compiler.Instance

  /**
   * `true` if compiler has already been instantiated.
   *
   * @public
   */
  isCompiled: boolean

  /**
   * Contains compilation stats, if available.
   *
   * @public
   */
  stats: StatsCompilation

  /**
   * Contains compilation progress, if avialable
   *
   * @public
   */
  progress: Compiler.Progress

  /**
   * Runs compiler.
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
  compile(): Promise<any>

  /**
   * Make webpack configuration
   *
   * @remarks
   * Runs bud.build.make on every bud instance and generates
   * final multiconfiguration for compilation.
   *
   * @public
   */
  precompile(): any

  /**
   * Compilation callback
   *
   * @remarks
   * Provides stats and error reporting
   *
   * @public
   */
  callback(err: StatsError, stats: StatsCompilation): void
}

/**
 * Compiler namespace
 *
 * @internalRemarks
 * Todo: move out of this namespace
 *
 * @internal
 */
namespace Compiler {
  export type Config = Configuration
  export type Instance = WebpackCompiler | WebpackMultiCompiler

  export type Progress = any

  export namespace Progress {
    export type Handler = ProgressPlugin['handler']
  }
}

export {Compiler}
