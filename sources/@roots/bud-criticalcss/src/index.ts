// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * This extension wraps {@link @roots/critical-css-webpack-plugin#CriticalCSSPlugin | @roots/critical-css-webpack-plugin}
 * and provides criticalcss support.
 *
 * @beta
 * This extension is under active development. But it should not be considered stable and there may be breaking changes.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {BudCriticalCssPlugin} from './BudCriticalCssPlugin'
import {critical} from './critical'

declare module '@roots/bud-framework' {
  interface Bud {
    critical: critical
  }

  interface Plugins {
    '@roots/bud-criticalcss': BudCriticalCssPlugin
  }
}

export default BudCriticalCssPlugin
