// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Recommended preset configuration for Bud.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * This preset is a wrapper for the following presets:
 *
 * - {@link @roots/bud-babel# | @roots/bud-babel}
 *
 * - {@link @roots/bud-postcss# | @roots/bud-postcss}
 *
 * - {@link @roots/bud-entrypoints# | @roots/bud-entrypoints}
 * @packageDocumentation
 */

import {Extension} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-preset-recommend': BudPresetRecommend
  }
}

export interface BudPresetRecommend extends Extension.Module {
  name: '@roots/bud-preset-recommend'
}

/**
 * Recommended preset configuration for Bud.
 *
 * @public
 */
export const name = '@roots/bud-preset-recommend'
