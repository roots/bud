// Type definitions for Compiler
// Project: @roots/bud
// Definitions by: Kelly Mears <kelly@roots.io>

import Webpack from 'webpack'

export default Compiler

/**
 * The Bud webpack compiler.
 */
declare class Compiler {
  /**
   * Webpack configuration
   */
  public config: Webpack.Configuration

  /**
   * Core webpack compiler
   */
  public compiler: Webpack.Compiler

  /**
   * Close and invalidation methods for the watch process
   */
  public watching: Webpack.Compiler.Watching

  /**
   * Watch mode configuration
   */
  public watchOptions: Webpack.Compiler.WatchOptions

  /**
   * Class constructor
   */
  public constructor(config?: Webpack.Configuration)

  /**
   * Get the compiler configuration object
   */
  public getConfig: () => Webpack.Configuration

  /**
   * Set the compiler configuration object
   */
  public setConfig: (config: Webpack.Configuration) => Compiler

  /**
   * Create a new compilation instance
   */
  public compile: () => Compiler

  /**
   * Get the compiler configuration object
   */
  public getCompiler: () => Webpack.Compiler

  /**
   * Set the compiler configuration object
   */
  public setCompiler: (config: Webpack.Compiler) => Compiler

  /**
   * Runs the compiler.
   */
  public run: (callback: Webpack.Compiler.Handler) => void

  /**
   * Runs the compiler in watch mode.
   */
  public watch: (
    callback: Webpack.Compiler.Handler,
  ) => Webpack.Compiler.Watching

  /**
   * Apply progress handler and overlay plugins.
   */
  public applyPlugins: (
    handler: Webpack.ProgressPlugin.Handler,
  ) => Compiler
}
