import * as Webpack from 'webpack'

/**
 * MergedManifestWebpackPlugin
 *
 * @public
 */
declare class MergedManifestWebpackPlugin {
  /**
   * Plugin ident
   *
   * @public
   */
  plugin: {
    name: string
  }
  /**
   * Directory where the manifest will be written.
   *
   * @public
   */
  dir: string
  path: string
  file: string
  entrypointsName: string
  wordpressName: string
  /**
   * Plugin constructor
   *
   * @public
   */
  constructor(options?: {
    entrypointsName?: string
    wordpressName?: string
    file?: string
  })
  apply(compiler: Webpack.Compiler): void
  done(
    _compilation: any,
    callback: any,
  ): Promise<CallableFunction>
  format(object: {
    [key: string]: {
      [key: string]: string[]
    }
  }): string
  isBuildable(): boolean
  manifestPath(file: string): string
  manifestExists(file: string): boolean
  manifestContent(file: string): Promise<any>
}
export {MergedManifestWebpackPlugin}
export default MergedManifestWebpackPlugin

export {}
