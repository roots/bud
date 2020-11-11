import webpack, {ProgressPlugin} from 'webpack'
import type Webpack from 'webpack'
import type {Bud} from '@roots/bud-typings'

class Compiler implements Compiler.Contract {
  public bud: Bud

  public compiler: Webpack.Compiler

  constructor(bud: Bud) {
    this.bud = bud

    this.get = this.get.bind(this)
    this.set = this.set.bind(this)
    this.run = this.run.bind(this)
    this.compile = this.compile.bind(this)
    this.applyPlugins = this.applyPlugins.bind(this)
  }

  public compile(): void {
    this.set(webpack(this.bud.build.make()))
  }

  public get(): Webpack.Compiler {
    return this.compiler
  }

  public set(compiler: Webpack.Compiler): void {
    this.compiler = compiler
  }

  public run(handler: Compiler.Handler): void {
    this.get().run(handler)
  }

  public applyPlugins(handler: Compiler.ProgressHandler): void {
    new ProgressPlugin(handler).apply(this.get())
  }
}

declare namespace Compiler {
  /**
   * Compilation callback.
   */
  export type Handler = Webpack.Compiler.Handler

  /**
   * ProgressPlugin callback.
   */
  export type ProgressHandler = ProgressPlugin.Handler

  export class Contract implements Interface {
    public compiler: Webpack.Compiler

    public constructor(bud: Bud)

    public compile(): void

    public get(): Webpack.Compiler

    public set(compiler: Webpack.Compiler): void

    public run(handler: Handler): void

    public applyPlugins(handler: ProgressHandler): void
  }

  export interface Interface {
    compiler: Webpack.Compiler

    compile(): void

    get(): Webpack.Compiler

    set(compiler: Webpack.Compiler): void

    run(handler: Handler): void

    applyPlugins(handler: ProgressHandler): void
  }
}

export {Compiler}
