/// <reference path="../../bud/lib/index.d.ts" />

import type BudWordPressExternals from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-wordpress-externals': BudWordPressExternals
  }
}
