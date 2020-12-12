import Service from './Service'
import Contract from './Contract'
import webpack, {ProgressPlugin} from 'webpack'

import type Webpack from 'webpack'
import type {Instance} from 'ink'

/**
 * Stats common
 */
const commonStats = {
  all: false,
  version: true,
  hash: true,
  timings: true,
  builtAt: false,
  assets: true,
  chunks: false,
  children: false,
  errors: true,
  entrypoints: true,
}

/**
 * Stats options.
 */
const options = {
  json: {
    ...commonStats,
    cachedAssets: true,
  },
  string: {
    ...commonStats,
    colors: true,
  },
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
export class Compiler extends Service implements Contract {
  /**
   * Webpack compiler instance.
   */
  public _instance: Webpack.Compiler

  /**
   * Webpack compiler stats.
   */
  public _stats: Contract.Stats.Output

  /**
   * Webpack compiler statsOptionsed stats.
   */
  public _statsOptions: Contract.Stats.Options = options

  /**
   * Webpack compiler error
   */
  public _error: Instance

  /**
   * Class constructor
   */
  constructor(bud: Framework.Bud) {
    super(bud)
  }

  public get instance(): Webpack.Compiler {
    return this._instance
  }

  public set instance(compiler: Webpack.Compiler) {
    this._instance = compiler
  }

  public get stats(): {
    string: string
    json: Contract.Stats.Output['json']
  } {
    return this._stats
  }

  public set stats(stats: Contract.Stats.Output) {
    this._stats = this.bud.hooks.filter<Contract.Stats.Output>(
      'compiler.stats',
      stats,
    )
  }

  public get statsOptions(): Contract.Stats.Options {
    return this._statsOptions
  }

  public set statsOptions(options: Contract.Stats.Options) {
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
  public get(): Webpack.Compiler {
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
  public set(compiler: Webpack.Compiler): void {
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
  public compile(
    config?: Webpack.Configuration,
  ): Webpack.Compiler {
    this.instance = webpack(config ?? this.bud.build.make())

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
    this.instance.run((_err, stats) => {
      if (stats.hasErrors() && !this.bud.mode.ci) {
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
    new Error(err)
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
  public applyPlugins(handler: Contract.ProgressHandler): void {
    new ProgressPlugin(handler).apply(this.instance)
  }
}
