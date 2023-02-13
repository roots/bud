/* eslint-disable n/no-unpublished-import */

/// <reference types="@roots/bud-framework" />
/// <reference types="@roots/bud-babel" />
/// <reference types="@roots/bud-esbuild" />
/// <reference types="@roots/bud-typescript" />
/// <reference types="@roots/bud-swc" />

import type {Item} from '@roots/bud-build/item'
import type {Loader} from '@roots/bud-build/loader'
import type {Rule} from '@roots/bud-build/rule'

import type {BudMDX} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    mdx: {
      get: BudMDX[`get`]
      getOptions: BudMDX[`getOptions`]
      set: BudMDX[`set`]
      setOptions: BudMDX[`setOptions`]
    }
  }

  interface Loaders {
    mdx: Loader
  }

  interface Items {
    mdx: Item
  }

  interface Rules {
    mdx: Rule
  }

  interface Patterns {
    mdx: RegExp
  }

  interface Modules {
    '@roots/bud-mdx': BudMDX
  }
}
