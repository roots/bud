import * as BudBabelExtension from '@roots/bud-babel'
import * as BudEntrypointsPlugin from '@roots/bud-entrypoints'
import {Framework} from '@roots/bud-framework'
import {Factory} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework'
import * as BudPostCssExtension from '@roots/bud-postcss'

/**
 * Recommended preset configuration for Bud.
 *
 * @remarks
 * This preset is a wrapper for the following presets:
 *
 * - {@link @roots/bud-babel# | @roots/bud-babel}
 *
 * - {@link @roots/bud-postcss# | @roots/bud-postcss}
 *
 * - {@link @roots/bud-entrypoints# | @roots/bud-entrypoints}
 *
 * @public
 */
export interface BudPresetRecommend extends Extension.Module {
  name: '@roots/bud-preset-recommend'
  register: Factory<[Framework], unknown>
}

/**
 * Recommended preset configuration for Bud.
 *
 * @public
 */
export const BudPresetRecommend: BudPresetRecommend = {
  /**
   * {@inheritDoc @roots/bud-framework#Extension.Module.name}
   *
   * @public
   */
  name: '@roots/bud-preset-recommend',

  /**
   * {@inheritDoc @roots/bud-framework#Extension.Module.register}
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
