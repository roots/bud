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
  extends Extensions.Plugin<CriticalCssWebpackPlugin, Partial<Options>> {
  label: '@roots/bud-criticalcss'
  options: Partial<Options>
  api: {critical: critical}
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
   * Extension identifier
   *
   * @public
   */
  label: '@roots/bud-criticalcss',

  /**
   * Extension api functions
   *
   * @public
   */
  api: {critical},

  /**
   * Extension options
   *
   * @public
   */
  options: {},

  /**
   * Makes compiler plugin
   *
   * @public
   */
  make(options): CriticalCssWebpackPlugin {
    return new CriticalCssWebpackPlugin(options.all())
  },

  /**
   * Prerequiste criteria for plugin usage
   *
   * @public
   */
  when: app => app.isProduction,
}
