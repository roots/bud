export {WordPressExternals} from './interface'
import {externals} from './externals'
import Webpack, {ExternalsPlugin} from 'webpack'

export class Plugin {
  public name = 'WordPressExternalsWebpackPlugin'

  public stage = Infinity

  public externals: ExternalsPlugin

  constructor() {
    this.externals = new ExternalsPlugin('window', externals)
  }

  apply(compiler: Webpack.Compiler): void {
    this.externals.apply(compiler)
  }
}
