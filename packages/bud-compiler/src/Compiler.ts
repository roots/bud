import webpack, {
  Configuration,
  Compiler as Webpack,
  ProgressPlugin,
} from 'webpack'
import {CompilerInterface} from './'

class Compiler implements CompilerInterface {
  public config: Configuration
  public compiler: Webpack
  public watchOptions: Webpack.WatchOptions
  public watching: Webpack.Watching

  constructor(config?: Configuration) {
    if (config) {
      this.config = config
    }

    this.compile = this.compile.bind(this)
    this.run = this.run.bind(this)
    this.watch = this.watch.bind(this)

    this.applyProgress = this.applyProgress.bind(this)

    this.getConfig = this.getConfig.bind(this)
    this.setConfig = this.setConfig.bind(this)

    this.getCompiler = this.getCompiler.bind(this)
    this.setCompiler = this.setCompiler.bind(this)
  }

  public getConfig(): Configuration {
    return this.config
  }

  public setConfig(config: Configuration): CompilerInterface {
    this.config = config

    return this
  }

  public compile(): CompilerInterface {
    this.compiler = webpack(this.getConfig())

    return this
  }

  public getCompiler(): Webpack {
    return this.compiler
  }

  public setCompiler(compiler: Webpack): CompilerInterface {
    this.compiler = compiler

    return this
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

  public applyProgress(
    progressHandler: ProgressPlugin.Handler,
  ): CompilerInterface {
    new ProgressPlugin(progressHandler).apply(this.compiler)

    return this
  }
}

export {Compiler as default}
