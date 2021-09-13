// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Recommended preset configuration for Bud.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build boss web applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 *
 * - 🌱 Easy - Low bundle size and fast build times
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
 * @extension @packageDocumentation @betaDocumentation
 */

import {BudPresetRecommend} from './BudPresetRecommend'

declare module '@roots/bud-framework' {
  /**
   * {@inheritDoc @roots/bud-framework#Modules}
   * @public @override
   */
  interface Modules {
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
