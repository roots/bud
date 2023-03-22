/// <reference types="@roots/bud-esbuild" />
/// <reference types="@roots/bud-swc" />
/// <reference types="@roots/bud-typescript" />

import '@roots/bud/types'
import '@roots/bud-babel/types'
import '@roots/bud-postcss/types'

import type BudPresetRecommend from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-preset-recommend': BudPresetRecommend
  }
}
