import Webpack from 'webpack'

/**
 * critical-css-webpack-plugin
 */
export class Plugin {
  /**
   * Plugin ident
   */
  public plugin = {
    name: 'EntrypointsManifestPlugin',
    stage: Infinity,
  }

  /**
   * Public path of emitted assets
   */
  public publicPath:
    | string
    | Webpack.Compiler['options']['output']['publicPath']

  /**
   * Emitted contents
   */
  public output = {}

  /**
   * Webpack apply plugin
   */
  apply(compiler: Webpack.Compiler): void {}
}
