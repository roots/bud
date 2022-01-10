import type {Extension, Framework} from '@roots/bud-framework'

import {HtmlWebpackPlugin} from './html-webpack-plugin.plugin'
import {InterpolateHtmlPlugin} from './interpolate-html-plugin.plugin'

/**
 * Adapter interface for {@link InterpolateHtmlPlugin}
 *
 * @public
 */
export interface BudInterpolateHtmlPlugin
  extends Extension.CompilerPlugin<
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
   * {@inheritDoc @roots/bud-framework#Extension.CompilerPlugin.name}
   *
   * @public
   */
  name: 'interpolate-html-plugin',

  /**
   * {@inheritDoc @roots/bud-framework#Extension.CompilerPlugin.options}
   *
   * @public
   */
  options: (app: Framework) => {
    return {
      ...(app.env.getPublicEnv() ?? {}),
      ...app.extensions.get(`webpack-define-plugin`).options.all(),
    }
  },

  /**
   * {@inheritDoc @roots/bud-framework#Extension.CompilerPlugin.make}
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
   * {@inheritDoc @roots/bud-framework#Extension.CompilerPlugin.when}
   *
   * @public
   */
  when: (_app, options) => options.getEntries().length > 0,
}
