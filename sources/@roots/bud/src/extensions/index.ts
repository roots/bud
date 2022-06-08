import {Config} from '@roots/bud-framework'

import BudESMExtension from './bud-esm-extension/index.js'
import BudHttpExtension from './bud-http-extension/index.js'
import CleanWebpackPlugin from './clean-webpack-plugin/index.js'
import CopyWebpackPlugin from './copy-webpack-plugin/index.js'
import MiniCssExtractPlugin from './mini-css-extract-plugin/index.js'
import DefineWebpackPlugin from './webpack-define-plugin/index.js'
import HotModuleReplacementPlugin from './webpack-hot-module-replacement-plugin/index.js'
import WebpackManifestPlugin from './webpack-manifest-plugin/index.js'
import ProvidePlugin from './webpack-provide-plugin/index.js'
import RemoveEmptyScriptsPlugin from './webpack-remove-empty-scripts/index.js'

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
