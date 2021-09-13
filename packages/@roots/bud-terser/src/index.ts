// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Adds terser minification support to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional web applications using a modular, hackable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import {BudTerserPlugin} from './BudTerserPlugin'

declare module '@roots/bud-framework' {
  interface Framework {
    terser: BudTerserPlugin['api']['terser']
  }

  interface Modules {
    'terser-webpack-plugin': BudTerserPlugin
  }
}

export {BudTerserPlugin}
export {name, options, api, boot} from './BudTerserPlugin'
