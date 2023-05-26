import type {
  PublicExtensionApi,
  WithOptions,
} from '@roots/bud-framework/extension'

import type {
  BudMinimizeCss,
  Options as CssOptions,
} from './css-minimizer/extension.js'
import type {BudTerser, Options} from './extension.js'

interface TerserExtension
  extends PublicExtensionApi<BudTerser>,
    WithOptions<BudTerser, Options> {
  dropConsole: BudTerser[`dropConsole`]
  dropDebugger: BudTerser[`dropDebugger`]
  dropComments: BudTerser[`dropComments`]
  debugger: BudTerser[`debugger`] // @deprecated
}

interface TerserStylesExtension
  extends PublicExtensionApi<BudMinimizeCss>,
    WithOptions<BudMinimizeCss, CssOptions> {}

declare module '@roots/bud-framework' {
  interface Bud {
    minimizeCss: TerserStylesExtension
    terser: TerserExtension
  }

  interface Modules {
    '@roots/bud-terser': TerserExtension
    '@roots/bud-terser/css-minimizer': TerserStylesExtension
  }
}
