import Webpack from 'webpack'

import {externals} from './externals.js'

/**
 * WordPress Externals Webpack Plugin
 */
export default class WordPressExternals {
  /**
   * Externals plugin
   */
  public externals: Webpack.ExternalsPlugin

  /**
   * Plugin name
   */
  public name = `WordPressExternalsWebpackPlugin`

  /**
   * Plugin stage
   */
  public stage = Infinity

  /**
   * Class constructor
   */
  public constructor() {
    this.externals = new Webpack.ExternalsPlugin(`window`, externals)
  }

  /**
   * {@link Extension.apply}
   */
  public apply(compiler: Webpack.Compiler): void {
    this.externals.apply(compiler)
  }
}
