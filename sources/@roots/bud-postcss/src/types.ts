/// <reference types="@roots/bud" />

/* eslint-disable n/no-unpublished-import */
import type {Item} from '@roots/bud-build/item'
import type {Loader} from '@roots/bud-build/loader'
import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import type {BudPostCss} from './extension.js'

interface PublicPostCssApi extends PublicExtensionApi<BudPostCss> {
  postcssOptions: BudPostCss[`postcssOptions`]
  getPluginPath: BudPostCss[`getPluginPath`]
  setPluginPath: BudPostCss[`setPluginPath`]
  getPluginOptions: BudPostCss[`getPluginOptions`]
  setPluginOptions: BudPostCss[`setPluginOptions`]
  setPlugin: BudPostCss[`setPlugin`]
  setPlugins: BudPostCss[`setPlugins`]
  unsetPlugin: BudPostCss[`unsetPlugin`]
  use: BudPostCss[`use`]
  getSyntax: BudPostCss[`getSyntax`]
  setSyntax: BudPostCss[`setSyntax`]
  getSourceMap: BudPostCss[`getSourceMap`]
  setSourceMap: BudPostCss[`setSourceMap`]
  sourceMap: BudPostCss[`sourceMap`]
  syntax: BudPostCss[`syntax`]
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
