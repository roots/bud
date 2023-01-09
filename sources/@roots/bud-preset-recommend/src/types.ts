/// <reference types="@roots/bud" />
/// <reference types="@roots/bud-babel" />
/// <reference types="@roots/bud-postcss" />
/// <reference types="@roots/bud-entrypoints" />
/// <reference types="@roots/bud-esbuild" />
/// <reference types="@roots/bud-swc" />

import type BudPresetRecommend from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-preset-recommend': BudPresetRecommend
  }
}
