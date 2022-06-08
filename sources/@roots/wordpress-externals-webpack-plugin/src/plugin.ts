import Webpack from 'webpack'

import {externals} from './externals.js'

/**
 * WordPress Externals Webpack Plugin
 *
 * @public
 */
export class WordPressExternals {
  /**
   * Plugin name
   *
   * @public
   */
  public name = 'WordPressExternalsWebpackPlugin'

  /**
   * Plugin stage
   *
   * @public
   */
  public stage = Infinity

  /**
   * Externals plugin
   *
   * @public
   */
  public externals: Webpack.ExternalsPlugin

  /**
   * Class constructor
   *
   * @public
   */
  public constructor() {
    this.externals = new Webpack.ExternalsPlugin('window', externals)
  }

  /**
   * `apply` callback
   *
   * @public
   */
  public apply(compiler: Webpack.Compiler): void {
    this.externals.apply(compiler)
  }
}
