/**
 * ⚡️ Lightning fast frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @remarks
 * The `bud-entrypoints` package provides {@link BudEntrypointsPlugin}, an adapter
 * for `@roots/entrypoints-webpack-plugin`.
 */

import {BudEntrypointsPlugin} from './BudEntrypointsPlugin'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-entrypoints': BudEntrypointsPlugin
    }
  }
}

export const {name, make} = BudEntrypointsPlugin
