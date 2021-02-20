import {externals} from './externals'

import Webpack, {ExternalsPlugin} from 'webpack'

export * from './interfaces'

/**
 * Externals plugin
 */
export class Plugin {
  public name = 'WordPressExternalsWebpackPlugin'

  public stage = Infinity

  /**
   * Externals plugin
   */
  public externals: ExternalsPlugin

  /**
   * Class constructor
   */
  constructor() {
    this.externals = new ExternalsPlugin('window', externals)
  }

  /**
   * Webpack apply
   */
  apply(compiler: Webpack.Compiler): void {
    this.externals.apply(compiler)
  }
}
