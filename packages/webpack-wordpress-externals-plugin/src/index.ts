import externalsPlugin from './externalsPlugin'

import Webpack, {ExternalsPlugin} from 'webpack'

export * from './interfaces'
export class Plugin {
  public name = 'WordPressExternalsWebpackPlugin'

  public stage = Infinity

  public externalsPlugin: ExternalsPlugin

  /**
   * Class constructor
   */
  constructor() {
    this.externalsPlugin = new ExternalsPlugin(
      'this',
      externalsPlugin.bind(this),
    )
  }

  apply(compiler: Webpack.Compiler): void {
    this.externalsPlugin.apply(compiler)
  }
}
