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
 * @public @core @container
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
   * Returns a {@link @roots/bud-framework#Compiler."instance" | Compiler instance}
   * when provided with a valid {@link Configuration}
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
  compile(): Compiler.Instance

  /**
   * Callback for {@link (Framework:namespace).Hooks | Framework.Hooks} `before` filter
   *
   * @remarks
   * Parses {@link (Framework:namespace).Build.config} instances and generates
   * final input for {@link (Compiler:interface).compile | Compiler.compile}
   *
   * @public
   */
  before(): any

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
