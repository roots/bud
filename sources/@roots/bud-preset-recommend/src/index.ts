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

import BudPresetRecommend from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-preset-recommend': BudPresetRecommend
  }
}

export default BudPresetRecommend
