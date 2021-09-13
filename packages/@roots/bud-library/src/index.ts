/**
 * @see https://roots.io/bud
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

  interface Modules {
    '@roots/bud-library': BudDllExtension
  }

  interface Plugins {
    'autodll-webpack-plugin': BudDllPlugin
  }
}

export const {name, api} = BudDllExtension
