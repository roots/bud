import webpack, {ProgressPlugin} from 'webpack'
import type Framework from '@roots/bud-typings'

class Compiler implements Framework.Compiler.Contract {
  public bud: Framework.Bud.Contract

  public compiler: Framework.Webpack.Compiler

  constructor(bud: Framework.Bud.Contract) {
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

  public get(): Framework.Webpack.Compiler {
    return this.compiler
  }

  public set(compiler: Framework.Webpack.Compiler): void {
    this.compiler = compiler
  }

  public run(handler: Framework.Compiler.Handler): void {
    this.get().run(handler)
  }

  public applyPlugins(
    handler: Framework.Compiler.ProgressHandler,
  ): void {
    new ProgressPlugin(handler).apply(this.get())
  }
}

export {Compiler}
