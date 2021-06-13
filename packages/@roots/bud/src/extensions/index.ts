import * as WebpackConfigDumpPlugin from './webpack-config-dump-plugin'
import * as DefineWebpackPlugin from './webpack-define-plugin'
import * as HotModuleReplacementPlugin from './webpack-hot-module-replacement-plugin'
import * as WebpackManifestPlugin from './webpack-manifest-plugin'
import * as CleanWebpackPlugin from './clean-webpack-plugin'
import * as CopyWebpackPlugin from './copy-webpack-plugin'
import * as CssMinimizerWebpackPlugin from './css-minimizer-webpack-plugin'
import * as IgnoreEmitWebpackPlugin from './ignore-emit-webpack-plugin'
import * as MiniCssExtractPlugin from './mini-css-extract-plugin'
import * as WebpackProvidePlugin from './webpack-provide-plugin'

export const extensions = {
  [WebpackProvidePlugin.name]: WebpackProvidePlugin,
  [CleanWebpackPlugin.name]: CleanWebpackPlugin,
  [WebpackConfigDumpPlugin.name]: WebpackConfigDumpPlugin,
  [CopyWebpackPlugin.name]: CopyWebpackPlugin,
  [CssMinimizerWebpackPlugin.name]: CssMinimizerWebpackPlugin,
  [DefineWebpackPlugin.name]: DefineWebpackPlugin,
  [HotModuleReplacementPlugin.name]: HotModuleReplacementPlugin,
  [IgnoreEmitWebpackPlugin.name]: IgnoreEmitWebpackPlugin,
  [WebpackManifestPlugin.name]: WebpackManifestPlugin,
  [MiniCssExtractPlugin.name]: MiniCssExtractPlugin,
}
