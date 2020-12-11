import type {Bud, Webpack} from '@roots/bud-typings'
import type {Instance} from 'ink'
import type {CompilerInterface} from './CompilerInterface'

/**
 * Compiler
 */
abstract class CompilerService {
  public bud: Bud.Ref

  public constructor(bud: Bud) {
    this.bud = bud.ref
  }

  public abstract compile(): Webpack.Compiler

  public abstract get(): Webpack.Compiler

  public abstract set(compiler: Webpack.Compiler): void

  public abstract get instance(): Webpack.Compiler

  public abstract set instance(compiler: Webpack.Compiler)

  public abstract get stats(): CompilerInterface.Stats.Output

  public abstract set stats(
    stats: CompilerInterface.Stats.Output,
  )

  public abstract get statsOptions(): CompilerInterface.Stats.Options

  public abstract set statsOptions(
    options: CompilerInterface.Stats.Options,
  )

  public abstract get error(): Instance

  public abstract set error(error: Instance)

  public abstract run(): void

  public abstract makeError(err: string): void

  public abstract applyPlugins(
    handler: CompilerInterface.ProgressHandler,
  ): void
}

export {CompilerService}
