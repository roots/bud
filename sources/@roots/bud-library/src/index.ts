// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Adds dynamic link library (DLL) support to Bud

 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
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
