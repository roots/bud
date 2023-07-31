import type {Options} from '@roots/wordpress-externals-webpack-plugin'

import {window} from '@roots/wordpress-transforms'
import Webpack, {type WebpackPluginInstance} from 'webpack'

/**
 * {@link WebpackPluginInstance}
 */
export class WordPressExternalsWebpackPlugin
  implements WebpackPluginInstance
{
  /**
   * Class constructor
   */
  public constructor(public options?: Options) {}

  /**
   * {@link WebpackPluginInstance.apply}
   */
  public apply(compiler: Webpack.Compiler) {
    new Webpack.ExternalsPlugin(`window`, ({request}, callback) => {
      // evidently this can be undefined? OK.
      if (!request) return callback()

      // bail on excluded signifiers
      if (this.options?.exclude?.includes(request)) return callback()

      const lookup = window.transform(request)
      return lookup ? callback(null, lookup) : callback()
    }).apply(compiler)
  }
}
