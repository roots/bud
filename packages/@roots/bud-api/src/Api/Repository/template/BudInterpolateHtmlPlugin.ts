import type {Extension, Index} from '@roots/bud-framework'

import {HtmlWebpackPlugin} from './BudHtmlWebpackPlugin'
import {InterpolateHtmlPlugin} from './InterpolateHtmlPlugin'

/**
 * Adapter interface for {@link InterpolateHtmlPlugin}
 *
 * @public
 */
interface BudInterpolateHtmlPlugin
  extends Extension.CompilerPlugin<
    InterpolateHtmlPlugin,
    Index<RegExp>
  > {}

/**
 * Adapter for {@link InterpolateHtmlPlugin}
 *
 * @public
 */
const BudInterpolateHtmlPlugin: BudInterpolateHtmlPlugin = {
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
  options(app) {
    const env = Object.fromEntries(
      app.env
        .getEntries()
        .filter(([k]) => k.includes('APP_')) as Array<
        [string, RegExp]
      >,
    )

    const store =
      app.store.get(
        `extension.interpolate-html-plugin.replace`,
      ) ?? {}

    return {
      ...env,
      ...store,
    }
  },

  /**
   * {@inheritDoc @roots/bud-framework#Extension.CompilerPlugin.make}
   *
   * @public
   */
  make: options =>
    new InterpolateHtmlPlugin(
      HtmlWebpackPlugin as any,
      options.all(),
    ),

  /**
   * {@inheritDoc @roots/bud-framework#Extension.CompilerPlugin.when}
   *
   * @public
   */
  when: (_app, options) => options.getEntries().length > 0,
}

export const {name, options, make, when} =
  BudInterpolateHtmlPlugin
