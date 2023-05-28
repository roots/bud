import type BudMinimizeCss from './css-minimizer/index.js'
import type {BudTerser} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    terser: BudTerser
    minimizeCss: BudMinimizeCss
  }
}

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-terser': BudTerser
  }
}
