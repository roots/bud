import {Compiler, ExternalsPlugin} from 'webpack/types'

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
  public externals: ExternalsPlugin

  /**
   * Class constructor
   *
   * @public
   */
  public constructor() {
    this.externals = new ExternalsPlugin('window', externals)
  }

  /**
   * `apply` callback
   *
   * @public
   */
  public apply(compiler: Compiler): void {
    this.externals.apply(compiler)
  }
}
