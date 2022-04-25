import {Config} from '@roots/bud-framework'

import CleanWebpackPlugin from './clean-webpack-plugin'
import CopyWebpackPlugin from './copy-webpack-plugin'
import MiniCssExtractPlugin from './mini-css-extract-plugin'
import DefineWebpackPlugin from './webpack-define-plugin'
import * as HotModuleReplacementPlugin from './webpack-hot-module-replacement-plugin'
import WebpackManifestPlugin from './webpack-manifest-plugin'
import BudProvide from './webpack-provide-plugin'

/**
 * Built-in extensions factory
 *
 * @returns Records of built-in compiler plugins
 *
 * @public
 */
export const extensions: Config.Options['extensions'] = [
  BudProvide,
  DefineWebpackPlugin,
  HotModuleReplacementPlugin,
  CleanWebpackPlugin,
  CopyWebpackPlugin,
  WebpackManifestPlugin,
  MiniCssExtractPlugin,
]
