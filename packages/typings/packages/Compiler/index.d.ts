/**
 * Framework.Compiler
 *
 * @package @roots/bud-compiler
 */
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
   * Get the (activated) compiler
   */
  getCompilation: () => Framework.Webpack.Compiler


  /**
   * Set the activated compiler
   */
  setCompilation: (compiler: Framework.Webpack.Compiler) => void

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
