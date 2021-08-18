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
 * Compiles {@link Framework.build} configuration and reports on stats, progress, and errors.
 */
interface Compiler extends Service {
  /**
   * The compiler: an instance of {@link WebpackMultiCompiler}
   */
  instance: Compiler.Instance

  /**
   * `true` if compiler has already been instantiated.
   */
  isCompiled: boolean

  /**
   * Contains {@link StatsCompilation}, if available.
   */
  stats: StatsCompilation

  /**
   * Formatted progress plugin
   */
  progress: Compiler.Progress

  /**
   * Returns a {@link WebpackMultiCompiler}, given {@link Configuration}
   *
   * @remarks
   * {@link Framework} compiler should always be specified in a multi-compiler format (wrap a standard configuration in an array).
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
  compile(): Compiler.Instance

  /**
   * Callback for {@link Framework.Hooks} `before` filter
   *
   * @remarks
   * Parses {@link Framework.Build.config} instances and generates final input for {@link Compiler.compile}
   */
  before(): any

  /**
   * Compilation callback
   *
   * @remarks
   * Provides stats and error reporting
   */
  callback(err: StatsError, stats: StatsCompilation): void
}

namespace Compiler {
  export type Config = Configuration
  export type Instance = WebpackCompiler | WebpackMultiCompiler

  export type Progress = any

  export namespace Progress {
    export type Handler = ProgressPlugin['handler']
  }
}

export {Compiler}
