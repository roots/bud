import {Bud, Webpack} from '@roots/bud-typings'
import Compiler from './Contract'

/**
 * Compiler
 */
export default abstract class {
  protected _bud: Bud.Ref

  /**
   * Class constructor
   */
  public constructor(bud: Bud) {
    this._bud = bud.get

    this.run = this.run.bind(this)
    this.get = this.get.bind(this)
    this.set = this.set.bind(this)

    this.compile = this.compile.bind(this)
    this.applyPlugins = this.applyPlugins.bind(this)
  }

  public get bud(): Bud {
    return this._bud()
  }

  public init(): void {
    return
  }

  public abstract compile(): Webpack.Compiler

  public abstract get(): Webpack.Compiler

  public abstract set(compiler: Webpack.Compiler): void

  public abstract get instance(): Webpack.Compiler

  public abstract set instance(compiler: Webpack.Compiler)

  public abstract get stats(): Compiler.Stats.Output

  public abstract set stats(stats: Compiler.Stats.Output)

  public abstract get statsOptions(): Compiler.Stats.Options

  public abstract set statsOptions(
    options: Compiler.Stats.Options,
  )

  public abstract get error(): Compiler.Instance

  public abstract set error(error: Compiler.Instance)

  public abstract run(): void

  public abstract makeError(err: string): void

  public abstract applyPlugins(
    handler: Compiler.ProgressHandler,
  ): void
}
