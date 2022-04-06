import {Extension} from './'
import {terser} from './terser.api'

declare module '@roots/bud-framework' {
  interface Bud {
    terser: terser
  }

  interface Modules {
    '@roots/bud-terser': Extension
  }
}
