import type {Extension, Framework} from '@roots/bud-framework'
import type {Container} from '@roots/container'
import {
  CriticalCssWebpackPlugin,
  Options,
} from '@roots/critical-css-webpack-plugin'

import {critical} from './critical'

/**
 * Extends bud with critical css
 *
 * @public
 */
interface BudCriticalCssPlugin
  extends Extension.CompilerPlugin<
    CriticalCssWebpackPlugin,
    Partial<Options>
  > {
  name: '@roots/bud-criticalcss'
  options: Partial<Options>
  api: {critical: critical}
  make: (
    options: Container<Partial<Options>>,
    app: Framework,
  ) => CriticalCssWebpackPlugin
}

const BudCriticalCssPlugin: BudCriticalCssPlugin = {
  name: '@roots/bud-criticalcss',

  api: {critical},

  options: {},

  make(options): CriticalCssWebpackPlugin {
    return new CriticalCssWebpackPlugin(options.all())
  },

  when: app => app.isProduction,
}

export {BudCriticalCssPlugin}
