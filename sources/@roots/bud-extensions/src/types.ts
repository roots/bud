import type BudCDN from './extensions/bud-cdn/index.js'
import type BudESM from './extensions/bud-esm/index.js'
import type BudFixStyleOnlyEntrypoints from './extensions/bud-fix-style-only-entrypoints/index.js'
import type CleanWebpackPlugin from './extensions/clean-webpack-plugin/index.js'
import type CopyWebpackPlugin from './extensions/copy-webpack-plugin/index.js'
import type HtmlWebpackPlugin from './extensions/html-webpack-plugin/index.js'
import type InterpolateHtmlPlugin from './extensions/interpolate-html-webpack-plugin/index.js'
import type MiniCssExtractPlugin from './extensions/mini-css-extract-plugin/index.js'
import type WebpackDefinePlugin from './extensions/webpack-define-plugin/index.js'
import type WebpackHotModuleReplacementPlugin from './extensions/webpack-hot-module-replacement-plugin/index.js'
import type WebpackManifestPlugin from './extensions/webpack-manifest-plugin/index.js'
import type WebpackProvidePlugin from './extensions/webpack-provide-plugin/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    cdn: BudCDN
    esm: BudESM
  }

  interface Modules {
    '@roots/bud-extensions/bud-cdn': BudCDN
    '@roots/bud-extensions/bud-esm': BudESM
    '@roots/bud-extensions/bud-fix-style-only-entrypoints': BudFixStyleOnlyEntrypoints
    '@roots/bud-extensions/clean-webpack-plugin': CleanWebpackPlugin
    '@roots/bud-extensions/copy-webpack-plugin': CopyWebpackPlugin
    '@roots/bud-extensions/fix-style-only-entrypoints': BudFixStyleOnlyEntrypoints
    '@roots/bud-extensions/html-webpack-plugin': HtmlWebpackPlugin
    '@roots/bud-extensions/interpolate-html-webpack-plugin': InterpolateHtmlPlugin
    '@roots/bud-extensions/mini-css-extract-plugin': MiniCssExtractPlugin
    '@roots/bud-extensions/webpack-define-plugin': WebpackDefinePlugin
    '@roots/bud-extensions/webpack-hot-module-replacement-plugin': WebpackHotModuleReplacementPlugin
    '@roots/bud-extensions/webpack-manifest-plugin': WebpackManifestPlugin
    '@roots/bud-extensions/webpack-provide-plugin': WebpackProvidePlugin
  }
}
