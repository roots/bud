import {window} from '@roots/wordpress-transforms'
import Webpack, {type ExternalItemFunctionData} from 'webpack'

/**
 * WordPress Externals Webpack Plugin
 */
class WordPressExternalsWebpackPlugin {
  /**
   * {@link Extension.apply}
   */
  public apply(compiler: Webpack.Compiler): void {
    new Webpack.ExternalsPlugin(
      `window`,
      ({request}: ExternalItemFunctionData, callback) => {
        const lookup = window.transform(request)
        return lookup ? callback(null, lookup) : callback()
      },
    ).apply(compiler)
  }
}

export {WordPressExternalsWebpackPlugin}
