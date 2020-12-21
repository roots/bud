import {Service, Instance} from '@roots/bud-support'
import {Framework, Webpack} from '@roots/bud-typings'
import Compiler from './Contract'

/**
 * ## bud.compiler
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/compiler](https://git.io/JkCQG)
 * [📦 @roots/bud-compiler](https://www.npmjs.com/package/@roots/bud-compiler)
 * [🔗 Documentation](#)
 */
export default abstract class extends Service<Framework> {
  /**
   * Webpack compiler instance.
   */
  public _instance: Webpack.Compiler

  /**
   * Webpack compiler stats.
   */
  public _stats: Compiler.Stats.Output

  /**
   * Webpack compiler statsOptionsed stats.
   */
  public _statsOptions: Compiler.Stats.Options

  /**
   * Webpack compiler error
   */
  public _error: Instance

  /**
   * Class constructor
   */
  public init(): void {
    this.run = this.run.bind(this)
    this.get = this.get.bind(this)
    this.set = this.set.bind(this)

    this.compile = this.compile.bind(this)
    this.applyPlugins = this.applyPlugins.bind(this)
  }

  public abstract compile(): Webpack.Compiler

  public abstract get(): Webpack.Compiler

  public abstract set(compiler: Webpack.Compiler): void

  public abstract set statsOptions(
    options: Compiler.Stats.Options,
  )

  public abstract run(): void

  public abstract makeError(err: string): void

  public abstract applyPlugins(
    handler: Compiler.ProgressHandler,
  ): void
}
