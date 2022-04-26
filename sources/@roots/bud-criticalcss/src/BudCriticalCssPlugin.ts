import type {Extension} from '@roots/bud-framework'
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
export interface BudCriticalCss
  extends Extension<Partial<Options>, CriticalCssWebpackPlugin> {}

/**
 * Adds critical css webpack plugin to compilation
 *
 * @public
 */
export const BudCriticalCss: BudCriticalCss = {
  label: '@roots/bud-criticalcss',
  options: {},
  register: async (options, {api}) => api.bindFacade('critical', critical),
  plugin: CriticalCssWebpackPlugin,
  when: async (options, app) => app.isProduction,
}
