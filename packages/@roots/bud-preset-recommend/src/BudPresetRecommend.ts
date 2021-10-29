import {Extension} from '@roots/bud-framework'

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
}

/**
 * Recommended preset configuration for Bud.
 *
 * @public
 */
export const BudPresetRecommend: BudPresetRecommend = {
  name: '@roots/bud-preset-recommend',
}
