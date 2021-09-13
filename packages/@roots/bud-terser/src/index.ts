/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @extension @packageDocumentation
 */

import {BudTerserPlugin} from './BudTerserPlugin'

declare module '@roots/bud-framework' {
  interface Framework {
    terser: BudTerserPlugin['api']['terser']
  }

  namespace Framework {
    interface Extensions {
      'terser-webpack-plugin': BudTerserPlugin
    }
  }
}

export {BudTerserPlugin}
export {name, options, api, boot} from './BudTerserPlugin'
