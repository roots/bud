import {Framework, Webpack} from './'

/**
 * ## bud.compiler
 *
 * Compiler controller for the @roots/bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 * [📦 @roots/bud-extensions](https://github.io/roots/bud-extensions)
 * [🔗 Documentation](#)
 */
export interface Compiler extends Framework.Service<Framework> {
  /**
   * The compiler instance
   */
  instance: Webpack.Compiler

  /**
   * Compiler stats output
   */
  stats: Compiler.Stats.Output

  /**
   * Webpack stats configuration
   */
  statsOptions: Compiler.Stats.Options

  /**
   * Formatted progress plugin
   */
  progress: Compiler.Progress

  /**
   * Compiler errors
   */
  errors: string[]

  /**
   * Get the compiler instance
   */
  get(): Webpack.Compiler

  /**
   * Set the compiler instance
   */
  set(compiler: Webpack.Compiler): void

  /**
   * ## bud.compiler.compile
   *
   * Return a compiler instance for a webpack configuration.
   *
   * If none is supplied the configuration will be made from `bud.build.make`.
   *
   * [🔗 Documentation](#)
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
  compile(): Webpack.Compiler

  /**
   * ## bud.compiler.run
   *
   * Run the stored instance. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.compiler.run((err, stats) => {...})
   * ```
   */
  run(): void

  /**
   * ## bud.compiler.makeError
   */
  makeError(err: string): void

  /**
   * ## bud.compiler.applyPlugins
   *
   * Applies the progress plugin. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.compiler.applyPlugin((progressArgs) => progressHandler())
   * ```
   */
  applyPlugins(handler: Compiler.ProgressHandler): void
}

export namespace Compiler {
  export type Handler = Webpack.Compiler.Handler

  export type ProgressHandler = Webpack.ProgressPlugin.Handler
  export type Progress = {
    percentage: string
    message: string
    decimal: number
  }

  export namespace Stats {
    export type Options = {
      json: Webpack.Stats.ToJsonOptions
      string: Webpack.Stats.ToStringOptions
    }

    export type Output = {
      string: string
      json: Webpack.Stats.ToJsonOutput
    }
  }
}
