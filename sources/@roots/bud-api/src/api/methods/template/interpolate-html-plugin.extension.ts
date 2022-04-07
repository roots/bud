import type {Bud, Plugin} from '@roots/bud-framework'

import {HtmlWebpackPlugin} from './html-webpack-plugin.plugin'
import {InterpolateHtmlPlugin} from './interpolate-html-plugin.plugin'

/**
 * Adapter interface for {@link InterpolateHtmlPlugin}
 *
 * @public
 */
export interface BudInterpolateHtmlPlugin
  extends Plugin<
    InterpolateHtmlPlugin,
    Record<string, RegExp>
  > {}

/**
 * Adapter for {@link InterpolateHtmlPlugin}
 *
 * @public
 */
export const BudInterpolateHtmlPlugin: BudInterpolateHtmlPlugin = {
  /**
   * {@inheritDoc @roots/bud-framework#Extension.Plugin.name}
   *
   * @public
   */
  name: 'interpolate-html-plugin',

  /**
   * {@inheritDoc @roots/bud-framework#Extension.Plugin.options}
   *
   * @public
   */
  options: (app: Bud) => {
    return {
      ...(app.env.getPublicEnv() ?? {}),
      ...app.extensions.get(`webpack-define-plugin`).options.all(),
    }
  },

  /**
   * {@inheritDoc @roots/bud-framework#Extension.Plugin.make}
   *
   * @public
   */
  make: (options, app) => {
    app.dump(options.all(), {
      prefix: `${app.name} interpolate-html-plugin made with options`,
    })

    return new InterpolateHtmlPlugin(
      HtmlWebpackPlugin as any,
      options.all(),
      app,
    )
  },

  /**
   * {@inheritDoc @roots/bud-framework#Extension.Plugin.when}
   *
   * @public
   */
  when: (_app, options) => options.getEntries().length > 0,
}
