import type {CompilerInterface} from '@roots/bud-typings'
import webpack, {
  Compiler as Webpack,
  ProgressPlugin,
} from 'webpack'

export class Compiler implements CompilerInterface {
  public bud: Framework.Bud
  public compiler: Webpack
  public watchOptions: Webpack.WatchOptions
  public watching: Webpack.Watching

  constructor(bud: Framework.Bud) {
    this.bud = bud

    this.applyPlugins = this.applyPlugins.bind(this)

    this.compile = this.compile.bind(this)
    this.run = this.run.bind(this)
    this.watch = this.watch.bind(this)
    this.getCompiler = this.getCompiler.bind(this)
  }

  public compile(): void {
    this.compiler = webpack(this.bud.build.compile())
  }

  public getCompiler(): Webpack {
    return this.compiler
  }

  public run(handler: Webpack.Handler): void {
    this.compiler.run(handler)
  }

  public watch(handler: Webpack.Handler): Webpack.Watching {
    this.watching = this.compiler.watch(
      this.watchOptions,
      handler,
    )

    return this.watching
  }

  public applyPlugins(
    progressHandler: ProgressPlugin.Handler,
  ): void {
    new ProgressPlugin(progressHandler).apply(this.compiler)
  }
}
