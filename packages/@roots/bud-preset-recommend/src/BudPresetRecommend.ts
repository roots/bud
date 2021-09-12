import * as BudBabelExtension from '@roots/bud-babel'
import * as BudEntrypointsPlugin from '@roots/bud-entrypoints'
import type {WebpackPlugin} from '@roots/bud-framework'
import * as BudPostCssExtension from '@roots/bud-postcss'

/**
 * Recommended preset configuration for Bud.
 *
 * @remarks
 * This preset is a wrapper for the following presets:
 *
 * - {@link @roots/bud-preset-recommend#}
 *
 * - {@link @roots/bud-react#}
 *
 * - {@link @roots/bud-wordpress-dependencies#}
 *
 * - {@link @roots/bud-wordpress-externals#}
 *
 * - {@link @roots/bud-wordpress-manifests#}
 *
 * @public @config
 */
export interface BudPresetRecommend extends WebpackPlugin {}

/**
 * Recommended preset configuration for Bud.
 */
export const BudPresetRecommend: BudPresetRecommend = {
  /**
   * {@inheritDoc @roots/bud-framework#Module}
   *
   * @public
   */
  name: '@roots/bud-preset-recommend',

  /**
   * {@inheritDoc @roots/bud-framework#register}
   *
   * @public
   */
  register: app => {
    app.use([
      BudBabelExtension,
      BudPostCssExtension,
      BudEntrypointsPlugin,
    ])
  },
}
