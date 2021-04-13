import Webpack, {ProgressPlugin} from 'webpack/types'
import {Service} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.compiler
     *
     * Compiler controller for the @roots/bud framework.
     *
     * [🏡 Project home](https://roots.io/bud)
     */
    compiler: Compiler
  }

  interface Compiler extends Service {
    /**
     * The compiler instance
     */
    instance: Compiler.Instance

    /**
     * Compiler stats output
     */
    stats: Compiler.Stats

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
     * ## bud.compiler.run
     *
     * Run the stored instance.
     *
     * ### Usage
     *
     * ```js
     * bud.compiler.run((err, stats) => {...})
     * ```
     */
    run(): void

    /**
     * ## bud.compiler.applyPlugins
     *
     * Applies the progress plugin.
     *
     * ### Usage
     *
     * ```js
     * bud.compiler.applyPlugin((progressArgs) => progressHandler())
     * ```
     */
    applyPlugins(handler: Compiler.Progress.Handler): void
  }

  namespace Compiler {
    type Compile = (config: Compiler.Config) => Webpack.Compiler

    type Config = Webpack.Configuration
    type Instance = Webpack.Compiler

    type Progress = {
      percentage: string
      message: string
      decimal: number
    }

    namespace Progress {
      type Handler = ProgressPlugin['handler']
    }

    interface Stats {
      string: any
      json: any
    }

    namespace Stats {
      type Options = {
        json: any
        string: any
      }
    }
  }
}
