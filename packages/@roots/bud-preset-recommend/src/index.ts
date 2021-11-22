// Copyright (c) Roots Foundation, LLC. All rights reserved.
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
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @packageDocumentation @betaDocumentation
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
