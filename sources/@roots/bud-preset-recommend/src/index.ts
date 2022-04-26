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

import '@roots/bud-babel/types'
import '@roots/bud-entrypoints/types'
import '@roots/bud-postcss/types'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-preset-recommend': BudPresetRecommend
  }
}

import BudPresetRecommend from './extension'
export default BudPresetRecommend
