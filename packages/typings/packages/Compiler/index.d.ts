export declare class Compiler {
  /**
   * Bud instance.
   */
  bud: Framework.Bud

  /**
   * Core webpack compiler
   */
  compilation: Framework.Webpack.Compiler

  /**
   * Create a new compilation instance
   */
  compile: () => void

  /**
   * Get the compiler configuration object
   */
  getCompilation: () => Framework.Webpack.Compiler

  /**
   * Runs the compiler.
   */
  run: (callback: Framework.Webpack.ICompiler.Handler) => void

  /**
   * Runs the compiler in watch mode.
   */
  watch: (callback: Framework.Webpack.ICompiler.Handler) => Framework.Webpack.Watching

  /**
   * Close and invalidation methods for the watch process
   */
  watching: Framework.Webpack.Watching

  /**
   * Watch mode configuration
   */
  watchOptions: Framework.Webpack.Options.WatchOptions

  /**
   * Apply progress handler and overlay plugins.
   */
  applyPlugins: (handler: Framework.Webpack.ProgressPlugin.Handler) => void
}
