import type BudMinimizeCss from './css-minimizer/extension.js'
import type BudTerser from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    minimizeCss: BudMinimizeCss
    terser: BudTerser
  }

  interface Modules {
    '@roots/bud-terser': BudTerser
    '@roots/bud-terser/css-minimizer': BudMinimizeCss
  }
}
