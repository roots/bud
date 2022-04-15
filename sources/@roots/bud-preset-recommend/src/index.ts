// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Recommended preset configuration for Bud.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {Extension} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-preset-recommend': BudPresetRecommend
  }
}

export interface BudPresetRecommend extends Extension.Module {
  label: '@roots/bud-preset-recommend'
}

/**
 * Recommended preset configuration for Bud.
 *
 * @public
 */
export const label = '@roots/bud-preset-recommend'
