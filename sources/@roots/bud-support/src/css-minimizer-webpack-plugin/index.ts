import type {
  Asset,
  BasePluginOptions,
  BasicMinimizerImplementation,
  Compilation,
  CssNanoOptions,
  CssNanoOptionsExtended,
} from 'css-minimizer-webpack-plugin'
import Plugin from 'css-minimizer-webpack-plugin'

const {swcMinify} = Plugin

export {Plugin, swcMinify}
export type {
  Asset,
  BasePluginOptions,
  BasicMinimizerImplementation,
  Compilation,
  CssNanoOptions,
  CssNanoOptionsExtended,
}
