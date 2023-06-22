import type Api from '@roots/bud-api'
import type Build from '@roots/bud-build'
import type Cache from '@roots/bud-cache'
import type Compiler from '@roots/bud-compiler'
import type Dashboard from '@roots/bud-dashboard'
import type Entrypoints from '@roots/bud-entrypoints'
import type Extensions from '@roots/bud-extensions'
import type BudCDN from '@roots/bud-extensions/cdn'
import type CleanWebpackPlugin from '@roots/bud-extensions/clean-webpack-plugin'
import type CopyWebpackPlugin from '@roots/bud-extensions/copy-webpack-plugin'
import type BudESM from '@roots/bud-extensions/esm'
import type BudFixStyleOnlyEntrypoints from '@roots/bud-extensions/fix-style-only-entrypoints'
import type HtmlWebpackPlugin from '@roots/bud-extensions/html-webpack-plugin'
import type BudImportMap from '@roots/bud-extensions/import-map'
import type InterpolateHtmlPlugin from '@roots/bud-extensions/interpolate-html-webpack-plugin'
import type MiniCssExtractPlugin from '@roots/bud-extensions/mini-css-extract-plugin'
import type BudTsConfigValues from '@roots/bud-extensions/tsconfig-values'
import type WebpackDefinePlugin from '@roots/bud-extensions/webpack-define-plugin'
import type WebpackHotModuleReplacementPlugin from '@roots/bud-extensions/webpack-hot-module-replacement-plugin'
import type BudWebpackLifecyclePlugin from '@roots/bud-extensions/webpack-lifecycle-plugin'
import type WebpackManifestPlugin from '@roots/bud-extensions/webpack-manifest-plugin'
import type WebpackProvidePlugin from '@roots/bud-extensions/webpack-provide-plugin'
import type Hooks from '@roots/bud-hooks'
import type Minify from '@roots/bud-minify'
import type Server from '@roots/bud-server'

import * as Framework from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Bud {
    cdn: BudCDN
    esm: BudESM
    manifest: WebpackManifestPlugin
    tsconfig: BudTsConfigValues
  }

  interface Modules {
    '@roots/bud-entrypoints': Entrypoints
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
    '@roots/bud-minify': Minify
  }

  interface Services {
    api: Api
    build: Build
    cache: Cache
    compiler: Compiler
    dashboard: Dashboard
    extensions: Extensions
    hooks: Hooks
    server: Server
  }
}

class Bud extends Framework.Bud {
  public declare api: Api

  public declare build: Build

  public declare cache: Cache

  public declare cdn: BudCDN

  public declare esm: BudESM

  public declare extensions: Extensions

  public declare hooks: Hooks

  public override implementation: new () => Framework.Bud = Bud

  public declare manifest: WebpackManifestPlugin

  public declare server: Server

  public declare tsconfig: BudTsConfigValues
}

export {Bud}
