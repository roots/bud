import type * as Webpack from 'webpack'
/**
 * Produces `entrypoints.json` artifact with compiled assets broken down
 * by entrypoint and then filetype.
 *
 * @example
 * ```
 * import {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'
 *
 * const config = {
 *   plugins: [new EntrypointsWebpackPlugin()]
 * }
 * ```
 *
 * @sealed
 */
declare class EntrypointsWebpackPlugin
  implements Entrypoints.Plugin
{
  /**
   * Plugin related properties
   */
  protected plugin: {
    name: string
    stage: number
  }
  /**
   * Artifact filename
   */
  name: string
  /**
   * Webpack compiler instance
   */
  compiler: Webpack.Compiler
  /**
   * Webpack compilation instance
   */
  compilation: Webpack.Compilation
  /**
   * Project publicPath
   */
  publicPath: string
  /**
   * Collected assets
   */
  assets: Entrypoints.Entry
  /**
   * Class constructor
   */
  constructor(options?: Entrypoints.Options)
  /**
   * Webpack plugin API's `apply` hook
   *
   * @decorator `@bind`
   */
  apply(compiler: Webpack.Compiler): void
  /**
   * Runs through each entrypoint entry and adds to the
   * manifest
   *
   * @decorator `@bind`
   */
  processAssets(): void
  /**
   * Adds an entry to the manifest
   *
   * @decorator `@bind`
   */
  addToManifest({entry, file}: {entry: any; file: any}): void
  /**
   * Get assets from an entrypoint
   *
   * @decorator `@bind`
   */
  getEntrypointFiles(entry: {chunks: Webpack.Chunk[]}): string[]
}
export {EntrypointsWebpackPlugin}
//# sourceMappingURL=EntrypointsWebpackPlugin.d.ts.map
