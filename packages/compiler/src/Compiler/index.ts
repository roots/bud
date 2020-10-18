import webpack from 'webpack'

export class Compiler {
  public bud: Framework.Bud

  public compilation: Framework.Webpack.Compiler

  public watchOptions: Framework.Webpack.Options.WatchOptions

  public watching: Framework.Webpack.Watching

  constructor(bud: Framework.Bud) {
    this.bud = bud

    this.applyPlugins = this.applyPlugins.bind(this)

    this.compile = this.compile.bind(this)
    this.run = this.run.bind(this)
    this.watch = this.watch.bind(this)
    this.getCompilation = this.getCompilation.bind(this)
  }

  public compile(): void {
    this.compilation = webpack(this.bud.build.compile())
  }

  public getCompilation(): Framework.Webpack.Compiler {
    return this.compilation
  }

  public run(
    handler: Framework.Webpack.ICompiler.Handler,
  ): void {
    this.getCompilation().run(handler)
  }

  public watch(
    handler: Framework.Webpack.ICompiler.Handler,
  ): Framework.Webpack.Watching {
    this.watching = this.getCompilation().watch(
      this.watchOptions,
      handler,
    )

    return this.watching
  }

  public applyPlugins(
    progressHandler: Framework.Webpack.ProgressPlugin.Handler,
  ): void {
    new webpack.ProgressPlugin(progressHandler).apply(
      this.getCompilation(),
    )
  }
}
