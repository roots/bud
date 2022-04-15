import type {Bud, Extensions} from '@roots/bud-framework'
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
export interface BudCriticalCssPlugin
  extends Extensions.Module<Partial<Options>, CriticalCssWebpackPlugin> {
  label: '@roots/bud-criticalcss'
  options: Partial<Options>
  make: (
    options: Container<Partial<Options>>,
    app: Bud,
  ) => CriticalCssWebpackPlugin
}

/**
 * Adds critical css webpack plugin to compilation
 *
 * @public
 */
export const BudCriticalCssPlugin: BudCriticalCssPlugin = {
  /**
   * @public
   */
  label: '@roots/bud-criticalcss',

  /**
   * @public
   */
  options: {},

  /**
   * @public
   */
  register: async ({api}) => api.bindFacade('critical', critical),

  /**
   * @public
   */
  make(options): CriticalCssWebpackPlugin {
    return new CriticalCssWebpackPlugin(options.all())
  },

  /**
   * @public
   */
  when: app => app.isProduction,
}
