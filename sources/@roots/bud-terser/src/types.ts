import type {BudMinimizeCss} from './css-minimizer/extension.js'
import type {BudTerser} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    minimizeCss: {
      get: BudMinimizeCss[`get`]
      getOption: BudMinimizeCss[`getOption`]
      getOptions: BudMinimizeCss[`getOptions`]
      set: BudMinimizeCss[`set`]
      setOption: BudMinimizeCss[`setOption`]
      setOptions: BudMinimizeCss[`setOptions`]
      enable: BudMinimizeCss[`enable`]
    }
    terser: {
      get: BudTerser[`get`]
      getOption: BudTerser[`getOption`]
      getOptions: BudTerser[`getOptions`]
      set: BudTerser[`set`]
      setOption: BudTerser[`setOption`]
      setOptions: BudTerser[`setOptions`]
      enable: BudTerser[`enable`]
      dropConsole: BudTerser[`dropConsole`]
      dropDebugger: BudTerser[`dropDebugger`]
      dropComments: BudTerser[`dropComments`]
      debugger: BudTerser[`debugger`]
    }
  }

  interface Modules {
    '@roots/bud-terser': Bud[`terser`]
    '@roots/bud-terser/css-minimizer': Bud[`minimizeCss`]
  }
}
