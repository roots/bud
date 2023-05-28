/// <reference types="@roots/bud" />

/* eslint-disable n/no-unpublished-import */
import type {Item} from '@roots/bud-build/item'
import type {Loader} from '@roots/bud-build/loader'
import type {StrictPublicExtensionApi as PublicExtensionApi} from '@roots/bud-framework/extension'

import type {BudPostCss, Options} from './extension.js'

interface PublicPostCssApi
  extends PublicExtensionApi<BudPostCss, Options> {
  postcssOptions: BudPostCss[`postcssOptions`]
  config: BudPostCss[`config`]
  plugins: BudPostCss[`plugins`]
  syntax: BudPostCss[`syntax`]
  sourceMap: BudPostCss[`sourceMap`]
  getConfig: BudPostCss[`getConfig`]
  setConfig: BudPostCss[`setConfig`]
  getPlugin: BudPostCss[`getPlugin`]
  setPlugin: BudPostCss[`setPlugin`]
  getPluginPath: BudPostCss[`getPluginPath`]
  setPluginPath: BudPostCss[`setPluginPath`]
  getPluginOptions: BudPostCss[`getPluginOptions`]
  setPluginOptions: BudPostCss[`setPluginOptions`]
  getPlugins: BudPostCss[`getPlugins`]
  setPlugins: BudPostCss[`setPlugins`]
  unsetPlugin: BudPostCss[`unsetPlugin`]
  use: BudPostCss[`use`]
  getSyntax: BudPostCss[`getSyntax`]
  setSyntax: BudPostCss[`setSyntax`]
  getSourceMap: BudPostCss[`getSourceMap`]
  setSourceMap: BudPostCss[`setSourceMap`]
}

declare module '@roots/bud-framework' {
  interface Bud {
    postcss: PublicPostCssApi
  }

  interface Loaders {
    postcss: Loader
  }

  interface Items {
    postcss: Item
  }

  interface Modules {
    '@roots/bud-postcss': PublicPostCssApi
  }
}
