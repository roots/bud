import {Extension} from '@roots/bud-framework'

import * as CleanWebpackPlugin from './clean-webpack-plugin'
import * as CopyWebpackPlugin from './copy-webpack-plugin'
import * as IgnoreEmitWebpackPlugin from './ignore-emit-webpack-plugin'
import * as MiniCssExtractPlugin from './mini-css-extract-plugin'
import * as DefineWebpackPlugin from './webpack-define-plugin'
import * as HotModuleReplacementPlugin from './webpack-hot-module-replacement-plugin'
import * as WebpackManifestPlugin from './webpack-manifest-plugin'
import * as WebpackProvidePlugin from './webpack-provide-plugin'

/**
 * Built-in extensions factory
 *
 * @returns Records of built-in compiler plugins
 *
 * @public
 */
export function extensions(): Record<
  string,
  Extension.CompilerPlugin
> {
  return {
    ['webpack-provide-plugin']: WebpackProvidePlugin,
    ['clean-webpack-plugin']: CleanWebpackPlugin,
    ['copy-webpack-plugin']: CopyWebpackPlugin,
    ['webpack-define-plugin']: DefineWebpackPlugin,
    ['webpack-hot-module-replacement-plugin']:
      HotModuleReplacementPlugin,
    ['ignore-emit-webpack-plugin']: IgnoreEmitWebpackPlugin,
    ['webpack-manifest-plugin']: WebpackManifestPlugin,
    ['mini-css-extract-plugin']: MiniCssExtractPlugin,
  }
}
