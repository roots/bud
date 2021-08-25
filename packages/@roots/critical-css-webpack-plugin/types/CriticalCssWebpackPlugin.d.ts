/// <reference types="node" />
import * as vinyl from 'vinyl'
import * as Webpack from 'webpack'
import type {Options} from './interface'
/**
 * CriticalCSSWebpackPlugin
 */
declare class CriticalCssWebpackPlugin {
  /**
   * Plugin ident
   */
  plugin: {
    name: string
    stage: number
  }
  /**
   * Webpack lifecycle events
   */
  webpack: {
    compiler: Webpack.Compiler
    compilation: Webpack.Compilation
  }
  /**
   * Options
   */
  _options: Options
  /**
   * Entrypoint css mapping
   */
  entrypoints: {
    [key: string]: any
  }
  /**
   * Constructor
   */
  constructor(options?: Options)
  /**
   * Access: get options
   */
  get options(): Options
  /**
   * Access: set options
   */
  set options(options: Options)
  /**
   * Webpack apply plugin
   */
  apply(compiler: Webpack.Compiler): Promise<void>
  /**
   * Compilation
   */
  compilation(compilation: Webpack.Compilation): void
  /**
   * Process assets
   */
  processAssets(
    assets: Webpack.Compilation['assets'],
    callback: () => any,
  ): Promise<void>
  /**
   * Critical css from aggregated entrypoint css sources
   */
  criticalEntry(
    entry: string,
    module: Webpack.Module,
  ): Promise<void>
  /**
   * Get merged css modules
   */
  getMergedCssModules(chunk: any): Webpack.Module[]
  /**
   * Returns either the entrypoint name or the entrypoint name with a hash
   */
  maybeHashName(module: Webpack.Module, name: string): string
  /**
   * Generates critical css
   */
  generateCritical(
    entry: string,
    file: string,
    contents: string,
  ): Promise<any>
  /**
   * Vinyl adapter
   */
  vfile(
    path: string,
    contents: string | Buffer,
  ): vinyl.BufferFile
  /**
   * Inline HTML webpack plugin
   */
  htmlInject(css: string): (
    data: {
      html: string
    },
    cb: (...args: any) => any,
  ) => Promise<void>
}
export {CriticalCssWebpackPlugin}
//# sourceMappingURL=CriticalCssWebpackPlugin.d.ts.map
