import webpack, {ProgressPlugin} from 'webpack'
import type {
  Configuration,
  Compiler as WebpackCompiler,
  Stats,
} from 'webpack'
import type Framework from '@roots/bud-typings'
import type {Instance} from 'ink'
import {Error} from '@roots/bud-cli'

export type StatsOptions = {
  json: Stats.ToJsonOptions
  string: Stats.ToStringOptions
}

export type StatsOutput = {
  string: string
  json: Stats.ToJsonOutput
}

const commonStatsOptions = {
  all: false,
  version: false,
  hash: false,
  timings: true,
  builtAt: false,
  assets: true,
  chunks: false,
  children: false,
  entrypoints: false,
  errors: true,
}

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
class Compiler implements Framework.Compiler.Contract {
  /**
   * Reference to bud [🏠 Internal]
   */
  public bud: Framework.Bud.Ref

  /**
   * Webpack compiler instance.
   */
  public _instance: WebpackCompiler

  /**
   * Webpack compiler stats.
   */
  public _stats: StatsOutput

  /**
   * Webpack compiler statsOptionsed stats.
   */
  public _statsOptions: StatsOptions = {
    json: commonStatsOptions,
    string: {
      ...commonStatsOptions,
      colors: true,
    },
  }

  /**
   * Webpack compiler error
   */
  public _error: Instance

  /**
   * Class constructor
   */
  constructor(bud: Framework.Bud.Bud) {
    this.bud = bud.get

    this.run = this.run.bind(this)
    this.get = this.get.bind(this)
    this.set = this.set.bind(this)

    this.compile = this.compile.bind(this)
    this.applyPlugins = this.applyPlugins.bind(this)
  }

  public get instance(): WebpackCompiler {
    return this._instance
  }

  public set instance(compiler: WebpackCompiler) {
    this._instance = compiler
  }

  public get stats(): {
    string: string
    json: Stats.ToJsonOutput
  } {
    return this._stats
  }

  public set stats(stats: StatsOutput) {
    this._stats = this.bud().hooks.filter<StatsOutput>(
      'compiler.stats',
      stats,
    )
  }

  public get statsOptions(): StatsOptions {
    return this._statsOptions
  }

  public set statsOptions(options: StatsOptions) {
    this._statsOptions = options
  }

  public get error(): Instance {
    return this._error
  }

  public set error(error: Instance) {
    this._error = error
  }

  /**
   * ## get bud.compiler.instance
   *
   * Return the current compiler instance. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.compiler.get()
   * ```
   */
  public get(): WebpackCompiler {
    return this.instance
  }

  /**
   * ## set bud.compiler.instance
   *
   * Set the stored instance. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.compiler.set(compilerInstance)
   * ```
   */
  public set(compiler: WebpackCompiler): void {
    this.instance = compiler
  }

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
  public compile(config?: Configuration): WebpackCompiler {
    this.instance = webpack(config ?? this.bud().build.make())

    return this.instance
  }

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
  public run(): void {
    this.instance.run((err, stats) => {
      if (stats.hasErrors() && !this.bud().mode.ci) {
        console.error(stats.toString(this.statsOptions.string))

        return
      }

      this.stats = {
        string: stats.toString(this.statsOptions.string),
        json: stats.toJson(this.statsOptions.json),
      }
    })
  }

  /**
   * ## bud.makeError
   */
  public makeError(err: string): void {
    this.error = new Error(err, `Compilation error\n`, false)
  }

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
  public applyPlugins(
    handler: Framework.Compiler.ProgressHandler,
  ): void {
    new ProgressPlugin(handler).apply(this.instance)
  }
}

export {Compiler}
