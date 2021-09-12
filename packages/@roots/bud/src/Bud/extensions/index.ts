import * as CleanWebpackPlugin from './clean-webpack-plugin'
import * as CopyWebpackPlugin from './copy-webpack-plugin'
import * as CssMinimizerWebpackPlugin from './css-minimizer-webpack-plugin'
import * as IgnoreEmitWebpackPlugin from './ignore-emit-webpack-plugin'
import * as MiniCssExtractPlugin from './mini-css-extract-plugin'
import * as WebpackConfigDumpPlugin from './webpack-config-dump-plugin'
import * as DefineWebpackPlugin from './webpack-define-plugin'
import * as HotModuleReplacementPlugin from './webpack-hot-module-replacement-plugin'
import * as WebpackManifestPlugin from './webpack-manifest-plugin'
import * as WebpackProvidePlugin from './webpack-provide-plugin'

export const extensions = {
  ['webpack-provide-plugin']: WebpackProvidePlugin,
  ['clean-webpack-plugin']: CleanWebpackPlugin,
  ['webpack-config-dump-plugin']: WebpackConfigDumpPlugin,
  ['copy-webpack-plugin']: CopyWebpackPlugin,
  ['css-minimizer-webpack-plugin']: CssMinimizerWebpackPlugin,
  ['webpack-define-plugin']: DefineWebpackPlugin,
  ['webpack-hot-module-replacement-plugin']:
    HotModuleReplacementPlugin,
  ['ignore-emit-webpack-plugin']: IgnoreEmitWebpackPlugin,
  ['webpack-manifest-plugin']: WebpackManifestPlugin,
  ['mini-css-extract-plugin']: MiniCssExtractPlugin,
}
