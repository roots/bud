// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds dynamic link library (DLL) support to Bud

 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {BudDllExtension} from './BudDllExtension'
import {BudDllPlugin} from './BudDllPlugin'
import {library} from './library'

declare module '@roots/bud-framework' {
  interface Bud {
    library: library
  }

  interface Modules {
    '@roots/bud-library': BudDllExtension
    'autodll-webpack-plugin': BudDllPlugin
  }
}

export const {label, register} = BudDllExtension
