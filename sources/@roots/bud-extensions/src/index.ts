// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * @roots/bud-extensions
 *
 * @see {@link https://bud.js.org}
 * @see {@link https://github.com/roots/bud}
 */

import {Extensions} from '@roots/bud-extensions/service'

import type BudCDN from './cdn/index.js'
import type CleanWebpackPlugin from './clean-webpack-plugin/index.js'
import type CopyWebpackPlugin from './copy-webpack-plugin/index.js'
import type BudESM from './esm/index.js'
import type BudFixStyleOnlyEntrypoints from './fix-style-only-entrypoints/index.js'
import type HtmlWebpackPlugin from './html-webpack-plugin/index.js'
import type BudImportMap from './import-map/index.js'
import type InterpolateHtmlPlugin from './interpolate-html-webpack-plugin/index.js'
import type MiniCssExtractPlugin from './mini-css-extract-plugin/index.js'
import type BudTsConfigValues from './tsconfig-values/index.js'
import type WebpackDefinePlugin from './webpack-define-plugin/index.js'
import type WebpackHotModuleReplacementPlugin from './webpack-hot-module-replacement-plugin/index.js'
import type BudWebpackLifecyclePlugin from './webpack-lifecycle-plugin/index.js'
import type WebpackManifestPlugin from './webpack-manifest-plugin/index.js'
import type WebpackProvidePlugin from './webpack-provide-plugin/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    cdn: BudCDN
    esm: BudESM
    manifest: WebpackManifestPlugin
    tsconfig: BudTsConfigValues
  }

  interface Modules {
    '@roots/bud-extensions/cdn': BudCDN
    '@roots/bud-extensions/clean-webpack-plugin': CleanWebpackPlugin
    '@roots/bud-extensions/copy-webpack-plugin': CopyWebpackPlugin
    '@roots/bud-extensions/esm': BudESM
    '@roots/bud-extensions/fix-style-only-entrypoints': BudFixStyleOnlyEntrypoints
    '@roots/bud-extensions/html-webpack-plugin': HtmlWebpackPlugin
    '@roots/bud-extensions/import-map': BudImportMap
    '@roots/bud-extensions/interpolate-html-webpack-plugin': InterpolateHtmlPlugin
    '@roots/bud-extensions/mini-css-extract-plugin': MiniCssExtractPlugin
    '@roots/bud-extensions/tsconfig-values': BudTsConfigValues
    '@roots/bud-extensions/webpack-define-plugin': WebpackDefinePlugin
    '@roots/bud-extensions/webpack-hot-module-replacement-plugin': WebpackHotModuleReplacementPlugin
    '@roots/bud-extensions/webpack-lifecycle-plugin': BudWebpackLifecyclePlugin
    '@roots/bud-extensions/webpack-manifest-plugin': WebpackManifestPlugin
    '@roots/bud-extensions/webpack-provide-plugin': WebpackProvidePlugin
  }

  interface Services {
    extensions: Extensions
  }
}

export default Extensions
