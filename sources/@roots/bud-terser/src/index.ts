// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds terser minification support to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional web applications using a modular, hackable build system
 *
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 *
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @packageDocumentation
 */

import type {terser} from './terser.api'
import type {Extension} from './terser.interface'

declare module '@roots/bud-framework' {
  interface Framework {
    terser: terser
  }

  interface Modules {
    'terser-webpack-plugin': Extension
  }
}

export {name, api, options, boot} from './terser.extension'
