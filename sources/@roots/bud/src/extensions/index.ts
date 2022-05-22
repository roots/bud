import {Config} from '@roots/bud-framework'

import BudESMExtension from './bud-esm-extension'
import BudHttpExtension from './bud-http-extension'
import CleanWebpackPlugin from './clean-webpack-plugin'
import CopyWebpackPlugin from './copy-webpack-plugin'
import MiniCssExtractPlugin from './mini-css-extract-plugin'
import DefineWebpackPlugin from './webpack-define-plugin'
import HotModuleReplacementPlugin from './webpack-hot-module-replacement-plugin'
import WebpackManifestPlugin from './webpack-manifest-plugin'
import ProvidePlugin from './webpack-provide-plugin'
import RemoveEmptyScriptsPlugin from './webpack-remove-empty-scripts'

/**
 * Built-in extensions factory
 *
 * @returns Records of built-in compiler plugins
 *
 * @public
 */
export const extensions: Config.Options['extensions'] = [
  BudESMExtension,
  BudHttpExtension,
  ProvidePlugin,
  DefineWebpackPlugin,
  HotModuleReplacementPlugin,
  CleanWebpackPlugin,
  CopyWebpackPlugin,
  WebpackManifestPlugin,
  MiniCssExtractPlugin,
  RemoveEmptyScriptsPlugin,
]
