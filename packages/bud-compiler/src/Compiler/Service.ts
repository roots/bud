import {Service, Instance} from '@roots/bud-support'
import type {
  Compiler,
  Framework,
  Webpack,
} from '@roots/bud-typings'

/**
 * ## bud.compiler
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/compiler](https://git.io/JkCQG)
 * [📦 @roots/bud-compiler](https://www.npmjs.com/package/@roots/bud-compiler)
 * [🔗 Documentation](#)
 */
export default abstract class extends Service<Framework> {
  protected _instance: Webpack.Compiler

  protected _stats: Compiler.Stats.Output

  protected _statsOptions: Compiler.Stats.Options

  protected _error: Instance

  /**
   * Initialize Compiler
   */
  public init(): void {
    this.run = this.run.bind(this)
    this.get = this.get.bind(this)
    this.set = this.set.bind(this)

    this.compile = this.compile.bind(this)
    this.applyPlugins = this.applyPlugins.bind(this)
  }

  public abstract get(): Webpack.Compiler

  public abstract set statsOptions(
    options: Compiler.Stats.Options,
  )

  public abstract compile(): Webpack.Compiler

  public abstract set(compiler: Webpack.Compiler): void

  public abstract run(): void

  public abstract makeError(err: string): void

  public abstract applyPlugins(
    handler: Compiler.ProgressHandler,
  ): void
}
