import webpack from 'webpack'

/**
 * Framework.Compiler
 */
export class Compiler {
  public bud: Framework.Bud

  public compilation: Framework.Webpack.Compiler

  constructor(params?: Framework.Index<Framework.Bud>) {
    this.bud = params.bud

    this.applyPlugins = this.applyPlugins.bind(this)

    this.compile = this.compile.bind(this)
    this.run = this.run.bind(this)
    this.getCompilation = this.getCompilation.bind(this)
    this.setCompilation = this.setCompilation.bind(this)
  }

  public compile(): void {
    this.setCompilation(webpack(this.bud.build.make()))
  }

  public getCompilation(): Framework.Webpack.Compiler {
    return this.compilation
  }

  public setCompilation(
    compilation: Framework.Webpack.Compiler,
  ): void {
    this.compilation = compilation
  }

  public run(
    handler: Framework.Webpack.ICompiler.Handler,
  ): void {
    this.getCompilation().run(handler)
  }

  public applyPlugins(
    progressHandler: Framework.Webpack.ProgressPlugin.Handler,
  ): void {
    new webpack.ProgressPlugin(progressHandler).apply(
      this.getCompilation(),
    )
  }
}
