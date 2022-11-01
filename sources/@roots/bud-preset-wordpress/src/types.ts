import type BudPresetWordPress from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    wordpress: BudPresetWordPress
  }
  interface Modules {
    '@roots/bud-preset-wordpress': BudPresetWordPress
  }
}
