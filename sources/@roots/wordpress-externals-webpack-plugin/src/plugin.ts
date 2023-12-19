import type {Options} from '@roots/wordpress-externals-webpack-plugin'

import {join} from 'node:path'

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

      /**
       * It's harder to exclude react-refresh-runtime
       * because it is often transitively included.
       *
       * So we check if the request includes the string
       * and if it does, we check if it is in the exclude
       * array.
       *
       * It is a bit of a hack, but it works.
       */
      if (
        this.options?.exclude?.includes(
          join(`react-refresh`, `runtime`),
        ) &&
        request.includes(join(`react-refresh`, `runtime`))
      ) {
        return callback()
      }

      const lookup = window.transform(request)
      return lookup ? callback(null, lookup) : callback()
    }).apply(compiler)
  }
}
