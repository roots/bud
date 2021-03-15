import {Framework} from '@roots/bud-typings'
import * as CleanWebpackPlugin from './clean-webpack-plugin'
import * as WebpackConfigDumpPlugin from './webpack-config-dump-plugin'
import * as CopyWebpackPlugin from './copy-webpack-plugin'
import * as DefineWebpackPlugin from './define-webpack-plugin'
import * as HashedModuleIdsPlugin from './hashed-module-ids-plugin'
import * as HotModuleReplacementPlugin from './webpack-hot-module-replacement-plugin'
import * as HtmlWebpackPlugin from './html-webpack-plugin'
import * as HtmlHardDiskPlugin from './html-hard-disk-plugin'
import * as InterpolateHtmlPlugin from './interpolate-html-plugin'
import * as IgnoreEmitWebpackPlugin from './ignore-emit-webpack-plugin'
import * as WebpackManifestPlugin from './manifest'
import * as MiniCssExtractPlugin from './mini-css-extract-plugin'
import * as OptimizeCssAssetsPlugin from './optimize-css-assets-webpack-plugin'
import * as WebpackProvidePlugin from './webpack-provide-plugin'
import * as WriteFileWebpackPlugin from './write-file-webpack-plugin'

export const extensions: Framework.Index<Framework.Module> = {
  [WebpackProvidePlugin.name]: WebpackProvidePlugin,
  [CleanWebpackPlugin.name]: CleanWebpackPlugin,
  [HashedModuleIdsPlugin.name]: HashedModuleIdsPlugin,
  [WebpackConfigDumpPlugin.name]: WebpackConfigDumpPlugin,
  [CopyWebpackPlugin.name]: CopyWebpackPlugin,
  [DefineWebpackPlugin.name]: DefineWebpackPlugin,
  [HotModuleReplacementPlugin.name]: HotModuleReplacementPlugin,
  [HtmlWebpackPlugin.name]: HtmlWebpackPlugin,
  [HtmlHardDiskPlugin.name]: HtmlHardDiskPlugin,
  [IgnoreEmitWebpackPlugin.name]: IgnoreEmitWebpackPlugin,
  [InterpolateHtmlPlugin.name]: InterpolateHtmlPlugin,
  [WebpackManifestPlugin.name]: WebpackManifestPlugin,
  [MiniCssExtractPlugin.name]: MiniCssExtractPlugin,
  [OptimizeCssAssetsPlugin.name]: OptimizeCssAssetsPlugin,
  [WriteFileWebpackPlugin.name]: WriteFileWebpackPlugin,
}
