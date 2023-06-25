import {window} from '@roots/wordpress-transforms'
import Webpack, {type ExternalItemFunctionData} from 'webpack'

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
    this.externals = new Webpack.ExternalsPlugin(
      `window`,
      ({request}: ExternalItemFunctionData, callback) => {
        const lookup = window.transform(request)
        return lookup ? callback(null, lookup) : callback()
      },
    )
  }

  /**
   * {@link Extension.apply}
   */
  public apply(compiler: Webpack.Compiler): void {
    this.externals.apply(compiler)
  }
}
