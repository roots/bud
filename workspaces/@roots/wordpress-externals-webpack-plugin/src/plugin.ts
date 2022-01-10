import {Compiler, ExternalsPlugin} from 'webpack'

import {externals} from './externals'

/**
 * WordPress Externals Webpack Plugin
 *
 * @public
 */
export class WordPressExternals {
  /**
   * @public
   */
  public name = 'WordPressExternalsWebpackPlugin'

  /**
   * @public
   */
  public stage = Infinity

  /**
   * @public
   */
  public externals: ExternalsPlugin

  /**
   * @public
   */
  public constructor() {
    this.externals = new ExternalsPlugin('window', externals)
  }

  /**
   * @public
   */
  public apply(compiler: Compiler): void {
    this.externals.apply(compiler)
  }
}
