import webpack, {ProgressPlugin} from 'webpack'
import type Webpack from 'webpack'
import type {Bud} from '@roots/bud-typings'

export type Base = Compiler.Abstract

class Compiler implements Base {
  public bud: Bud

  public compiler: Webpack.Compiler

  constructor(options: {bud: Bud}) {
    this.bud = options.bud

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
   * Constructor options
   */
  export interface Options {
    bud: Bud
  }

  /**
   * Compilation callback.
   */
  export type Handler = Webpack.Compiler.Handler

  /**
   * ProgressPlugin callback.
   */
  export type ProgressHandler = ProgressPlugin.Handler

  export class Abstract implements Interface {
    public bud: Interface['bud']

    public compiler: Webpack.Compiler

    public constructor({bud}: Options)

    public compile(): void

    public get(): Webpack.Compiler

    public set(compiler: Webpack.Compiler): void

    public run(handler: Handler): void

    public applyPlugins(handler: ProgressHandler): void
  }

  export interface Interface {
    bud: Options['bud']

    compiler: Webpack.Compiler

    compile(): void

    get(): Webpack.Compiler

    set(compiler: Webpack.Compiler): void

    run(handler: Handler): void

    applyPlugins(handler: ProgressHandler): void
  }
}

export {Compiler}
