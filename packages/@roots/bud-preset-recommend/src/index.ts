// Copyright (c) Roots Foundation, LLC. All rights reserved. Licensed under the MIT license.

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
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import {BudPresetRecommend} from './BudPresetRecommend'

declare module '@roots/bud-framework' {
  /**
   * {@inheritDoc @roots/bud-framework#Extensions}
   *
   * @public @override
   */
  interface Extensions {
    /**
     * {@inheritDoc @roots/bud-preset-recommend#BudPresetRecommend}
     *
     * @public
     */
    '@roots/bud-preset-recommend': BudPresetRecommend
  }
}

export const {name, register} = BudPresetRecommend

export type {BudPresetRecommend}
