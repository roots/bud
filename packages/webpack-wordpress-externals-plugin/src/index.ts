import {externals} from './externals'

import Webpack, {ExternalsPlugin} from 'webpack'

export * from './interfaces'
export class Plugin {
  public name = 'WordPressExternalsWebpackPlugin'

  public stage = Infinity

  public externals: ExternalsPlugin

  /**
   * Class constructor
   */
  constructor() {
    this.externals = new ExternalsPlugin(
      'this',
      externals.bind(this),
    )
  }

  apply(compiler: Webpack.Compiler): void {
    this.externals.apply(compiler)
  }
}
