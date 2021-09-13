// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Adds dynamic link library (DLL) support to Bud

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
 * @extension @packageDocumentation @betaDocumentation
 */

import {BudDllExtension} from './BudDllExtension'
import {BudDllPlugin} from './BudDllPlugin'
import {library} from './library'

declare module '@roots/bud-framework' {
  interface Framework {
    library: library
  }

  /**
   * {@inheritDoc @roots/bud-framework#Modules}
   * @public @override
   */
  interface Modules {
    '@roots/bud-library': BudDllExtension
  }

  /**
   * {@inheritDoc @roots/bud-framework#Plugins}
   * @public @override
   */
  interface Plugins {
    'autodll-webpack-plugin': BudDllPlugin
  }
}

export const {name, api} = BudDllExtension
