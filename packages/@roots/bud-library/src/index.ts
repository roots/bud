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

  interface Extensions {
    '@roots/bud-library': BudDllExtension
    'autodll-webpack-plugin': BudDllPlugin
  }
}

export const {name, api} = BudDllExtension
