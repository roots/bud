/* eslint-disable n/no-unpublished-import */

/// <reference types="@roots/bud-framework" />
/// <reference types="@roots/bud-extensions" />
/// <reference types="@roots/bud-build" />

import type {Item} from '@roots/bud-build/item'
import type {Loader} from '@roots/bud-build/loader'

import type {BudPostCss} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    postcss: {
      get: BudPostCss[`get`]
      getOption: BudPostCss[`get`]
      getOptions: BudPostCss[`getOptions`]
      set: BudPostCss[`set`]
      setOption: BudPostCss[`get`]
      setOptions: BudPostCss[`setOptions`]
      setPlugin: BudPostCss[`setPlugin`]
      setPluginPath: BudPostCss[`setPluginPath`]
      setPluginOptions: BudPostCss[`setPluginOptions`]
      setPlugins: BudPostCss[`setPlugins`]
    }
  }

  interface Loaders {
    postcss: Loader
  }

  interface Items {
    postcss: Item
  }

  interface Modules {
    '@roots/bud-postcss': Bud[`postcss`]
  }
}
