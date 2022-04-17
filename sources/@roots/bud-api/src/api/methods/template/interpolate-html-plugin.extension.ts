import type {Bud, Module} from '@roots/bud-framework'

import {HtmlWebpackPlugin} from './html-webpack-plugin.plugin'
import {InterpolateHtmlPlugin} from './interpolate-html-plugin.plugin'

/**
 * Adapter interface for {@link InterpolateHtmlPlugin}
 *
 * @public
 */
export interface BudInterpolateHtmlPlugin
  extends Module<Record<string, RegExp>, InterpolateHtmlPlugin> {}

/**
 * Adapter for {@link InterpolateHtmlPlugin}
 *
 * @public
 */
export const BudInterpolateHtmlPlugin: BudInterpolateHtmlPlugin = {
  /**
   * @public
   */
  label: 'interpolate-html-plugin',

  /**
   * @public
   */
  options: (app: Bud) => {
    return {
      ...(app.env.getPublicEnv() ?? {}),
      ...app.extensions.get(`webpack-define-plugin`).options.all(),
    }
  },

  /**
   * @public
   */
  make: options =>
    new InterpolateHtmlPlugin(HtmlWebpackPlugin as any, options.all()),

  /**
   * @public
   */
  when: (_app, options) => options.getEntries().length > 0,
}
