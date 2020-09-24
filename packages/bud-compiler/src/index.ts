import {
  Configuration,
  Compiler as Webpack,
  ProgressPlugin,
} from 'webpack'
import Compiler from './Compiler'

/**
 * The Bud webpack compiler.
 */
export default Compiler
export interface CompilerInterface {
  /**
   * Webpack configuration
   */
  config: Configuration

  /**
   * Get the compiler configuration object
   */
  getConfig: () => Configuration

  /**
   * Set the compiler configuration object
   */
  setConfig: (config: Configuration) => CompilerInterface

  /**
   * Core webpack compiler
   */
  compiler: Webpack

  /**
   * Create a new compilation instance
   */
  compile: () => CompilerInterface

  /**
   * Get the compiler configuration object
   */
  getCompiler: () => Webpack

  /**
   * Set the compiler configuration object
   */
  setCompiler: (config: Webpack) => CompilerInterface

  /**
   * Runs the compiler.
   */
  run: (callback: Webpack.Handler) => void

  /**
   * Runs the compiler in watch mode.
   */
  watch: (callback: Webpack.Handler) => Webpack.Watching

  /**
   * Close and invalidation methods for the watch process
   */
  watching: Webpack.Watching

  /**
   * Watch mode configuration
   */
  watchOptions: Webpack.WatchOptions

  /**
   * Apply progress handler and overlay plugins.
   */
  applyPlugins: (
    handler: ProgressPlugin.Handler,
  ) => CompilerInterface
}
