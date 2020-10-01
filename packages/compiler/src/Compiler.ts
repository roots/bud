import webpack, {
  Configuration,
  Compiler as Webpack,
  ProgressPlugin,
} from 'webpack'
import {CompilerInterface} from './'

export default class Compiler implements CompilerInterface {
  public config: Configuration
  public compiler: Webpack
  public watchOptions: Webpack.WatchOptions
  public watching: Webpack.Watching

  constructor(config?: Configuration) {
    if (config) {
      this.config = config
    }

    this.applyPlugins = this.applyPlugins.bind(this)

    this.getConfig = this.getConfig.bind(this)
    this.setConfig = this.setConfig.bind(this)

    this.compile = this.compile.bind(this)
    this.run = this.run.bind(this)
    this.watch = this.watch.bind(this)
    this.getCompiler = this.getCompiler.bind(this)
  }

  public getConfig(): Configuration {
    return this.config
  }

  public setConfig(config: Configuration): void {
    this.config = config
  }

  public compile(): void {
    this.compiler = webpack(this.getConfig())
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
