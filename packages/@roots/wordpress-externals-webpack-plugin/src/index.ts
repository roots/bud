export {WordPressExternals} from './interface'
import {externals} from './externals'
import Webpack, {ExternalsPlugin} from 'webpack'

export class Plugin {
  public name = 'WordPressExternalsWebpackPlugin'

  public stage = Infinity

  public externals: ExternalsPlugin

  public constructor() {
    this.externals = new ExternalsPlugin('window', externals)
  }

  public apply(compiler: Webpack.Compiler): void {
    this.externals.apply(compiler)
  }
}
