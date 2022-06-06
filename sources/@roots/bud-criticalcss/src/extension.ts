import type {Extension} from '@roots/bud-framework'
import {
  CriticalCssWebpackPlugin,
  Options,
} from '@roots/critical-css-webpack-plugin'

import {critical} from './critical.js'

/**
 * Extends bud with critical css
 *
 * @public
 */
export interface BudCriticalCss
  extends Extension<Options, CriticalCssWebpackPlugin> {}

/**
 * Adds critical css webpack plugin to compilation
 *
 * @public
 */
export const BudCriticalCss: BudCriticalCss = {
  label: '@roots/bud-criticalcss',
  options: {},
  register: async (_, {api}) => api.bindFacade('critical', critical),
  plugin: CriticalCssWebpackPlugin,
  when: async (_, app) => app.isProduction,
}

export {BudCriticalCss as default}
