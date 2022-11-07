/// <reference path="../../bud/lib/index.d.ts" />
/// <reference path="../../bud-babel/lib/index.d.ts" />
/// <reference path="../../bud-postcss/lib/index.d.ts" />
/// <reference path="../../bud-entrypoints/lib/index.d.ts" />

/// <reference path="../../bud-esbuild/lib/index.d.ts" />
/// <reference path="../../bud-swc/lib/index.d.ts" />

import type BudPresetRecommend from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-preset-recommend': BudPresetRecommend
  }
}
