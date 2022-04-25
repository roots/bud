import {terser} from './terser.api'
import BudTerser from './terser.extension'

declare module '@roots/bud-framework' {
  interface Bud {
    terser: terser
  }

  interface Modules {
    '@roots/bud-terser': BudTerser
  }
}
