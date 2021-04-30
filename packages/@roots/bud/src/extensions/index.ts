import {Index, Module} from '@roots/bud-framework'

import * as WebpackConfigDumpPlugin from './webpack-config-dump-plugin'
import * as CopyWebpackPlugin from './copy-webpack-plugin/index'
import * as DefineWebpackPlugin from './webpack-define-plugin'
import * as HotModuleReplacementPlugin from './webpack-hot-module-replacement-plugin'
import * as WebpackManifestPlugin from './webpack-manifest-plugin'
import * as CssMinimizerWebpackPlugin from './css-minimizer-webpack-plugin'

import CleanWebpackPlugin from './clean-webpack-plugin'
import HtmlWebpackPlugin from './html-webpack-plugin'
import HtmlHardDiskPlugin from './html-hard-disk-plugin'
import IgnoreEmitWebpackPlugin from './ignore-emit-webpack-plugin'
import InterpolateHtmlPlugin from './interpolate-html-plugin'
import MiniCssExtractPlugin from './mini-css-extract-plugin'
import WebpackProvidePlugin from './webpack-provide-plugin'

export const extensions: Index<Module> = {
  [WebpackProvidePlugin.name]: WebpackProvidePlugin,
  [CleanWebpackPlugin.name]: CleanWebpackPlugin,
  [WebpackConfigDumpPlugin.name]: WebpackConfigDumpPlugin,
  [CopyWebpackPlugin.name]: CopyWebpackPlugin,
  [CssMinimizerWebpackPlugin.name]: CssMinimizerWebpackPlugin,
  [DefineWebpackPlugin.name]: DefineWebpackPlugin,
  [HotModuleReplacementPlugin.name]: HotModuleReplacementPlugin,
  [HtmlWebpackPlugin.name]: HtmlWebpackPlugin,
  [HtmlHardDiskPlugin.name]: HtmlHardDiskPlugin,
  [IgnoreEmitWebpackPlugin.name]: IgnoreEmitWebpackPlugin,
  [InterpolateHtmlPlugin.name]: InterpolateHtmlPlugin,
  [WebpackManifestPlugin.name]: WebpackManifestPlugin,
  [MiniCssExtractPlugin.name]: MiniCssExtractPlugin,
}
