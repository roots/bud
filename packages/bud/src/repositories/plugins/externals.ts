import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import {CleanWebpackPlugin} from 'clean-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import {
  DefinePlugin,
  HotModuleReplacementPlugin,
  optimize,
  ProvidePlugin,
} from 'webpack'
import WriteFilePlugin from 'write-file-webpack-plugin'

const {LimitChunkCountPlugin} = optimize
export {
  CleanWebpackPlugin,
  CopyWebpackPlugin,
  DefinePlugin,
  FixStyleOnlyEntriesPlugin,
  HotModuleReplacementPlugin,
  LimitChunkCountPlugin,
  ManifestPlugin,
  MiniCssExtractPlugin,
  ProvidePlugin,
  TerserPlugin,
  WriteFilePlugin,
}
