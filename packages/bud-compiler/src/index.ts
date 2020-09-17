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
  run: () => void

  /**
   * Runs the compiler in watch mode.
   */
  watch: () => void

  /**
   * Apply the progress plugin to the compiler.
   */
  applyProgressPlugin: (handler: ProgressPlugin.Handler) => void
}

class Compiler implements CompilerInterface {
  public name = '@roots/bud'
  public config: WebpackConfig

  public compiler: WebpackCompiler
  public handler: WebpackCompiler.Handler

  public watching: WebpackWatching
  public watchOptions: WebpackCompiler.WatchOptions = {
    aggregateTimeout: 300,
  }

  constructor(
    name: string,
    config: WebpackConfig,
    handler: WebpackCompiler.Handler,
  ) {
    this.name = name
    this.config = config
    this.handler = handler

    this.run = this.run.bind(this)
    this.watch = this.watch.bind(this)
    this.applyProgressPlugin = this.applyProgressPlugin.bind(
      this,
    )

    this.compiler = webpack(this.config)
  }

  public run(): void {
    this.compiler.run(this.handler)
  }

  public watch(): void {
    this.watching = this.compiler.watch(
      this.watchOptions,
      this.handler,
    )
  }

  public applyProgressPlugin(
    progressHandler: ProgressPlugin.Handler,
  ): void {
    new ProgressPlugin(progressHandler).apply(this.compiler)
  }
}

export {Compiler as default, CompilerInterface}
