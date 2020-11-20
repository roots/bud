import webpack, {ProgressPlugin} from 'webpack'
import type Framework from '@roots/bud-typings'

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
   * ## bud.compiler.instance
   *
   * Webpack compiler instance.
   *
   * @see {Webpack.Compiler}
   */
  public instance: Framework.Webpack.Compiler

  /**
   * Class constructor
   */
  constructor(bud: Framework.Bud.Bud) {
    this.bud = bud.get

    this.get = this.get.bind(this)

    this.set = this.set.bind(this)

    this.run = this.run.bind(this)

    this.compile = this.compile.bind(this)

    this.applyPlugins = this.applyPlugins.bind(this)
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
   * bud.compiler.compile({entry: {app: 'foo.js'}})
   * ```
   */
  public compile(
    config?: Framework.Webpack.Configuration,
  ): Framework.Webpack.Compiler {
    this.set(webpack(config ?? this.bud().build.make()))

    return this.instance
  }

  /**
   * ## bud.compiler.get
   *
   * Return the current compiler instance. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.compiler.get()
   * ```
   */
  public get(): Framework.Webpack.Compiler {
    return this.instance
  }

  /**
   * ## bud.compiler.set
   *
   * Set the stored instance. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.compiler.set(compilerInstance)
   * ```
   */
  public set(compiler: Framework.Webpack.Compiler): void {
    this.instance = compiler
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
  public run(handler: Framework.Compiler.Handler): void {
    this.instance.run(handler)
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
