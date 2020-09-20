import webpack, {
  Configuration as WebpackConfig,
  Compiler as WebpackCompiler,
  Watching as WebpackWatching,
  ProgressPlugin,
} from 'webpack'

/**
 * The Bud webpack compiler.
 */
interface CompilerInterface {
  /**
   * Identifies compilation
   */
  name: string

  /**
   * Webpack configuration
   */
  config: WebpackConfig

  /**
   * Core webpack compiler
   */
  compiler: WebpackCompiler

  /**
   * Close and invalidation methods for the watch process
   */
  watching: WebpackWatching

  /**
   * Watch mode configuration
   */
  watchOptions: WebpackCompiler.WatchOptions

  /**
   * Runs the compiler.
   */
  run: (callback: WebpackCompiler.Handler) => void

  /**
   * Runs the compiler in watch mode.
   */
  watch: (
    callback: WebpackCompiler.Handler,
  ) => WebpackCompiler.Watching

  /**
   * Apply the progress plugin to the compiler.
   */
  applyProgressPlugin: (handler: ProgressPlugin.Handler) => void
}

class Compiler implements CompilerInterface {
  public name = '@roots/bud'
  public config: WebpackConfig
  public compiler: WebpackCompiler
  public watching: WebpackWatching
  public watchOptions: WebpackCompiler.WatchOptions = {
    aggregateTimeout: 300,
  }

  constructor(name: string, config: WebpackConfig) {
    this.name = name
    this.config = config

    this.run = this.run.bind(this)
    this.watch = this.watch.bind(this)
    this.applyProgressPlugin = this.applyProgressPlugin.bind(
      this,
    )

    this.compiler = webpack(this.config)
  }

  public run(handler: WebpackCompiler.Handler): void {
    this.compiler.run(handler)
  }

  public watch(
    handler: WebpackCompiler.Handler,
  ): WebpackCompiler.Watching {
    return (this.watching = this.compiler.watch(
      this.watchOptions,
      handler,
    ))
  }

  public applyProgressPlugin(
    progressHandler: ProgressPlugin.Handler,
  ): void {
    new ProgressPlugin(progressHandler).apply(this.compiler)
  }
}

export {Compiler as default, CompilerInterface}
