import '@roots/bud-babel'

import type * as Build from '@roots/bud-framework/types/services/build'

import BudTypeScript from './bud.extension'
import {facade} from './bud.typecheck'
import BudTypeCheckPlugin from './fork-ts-checker-webpack-plugin'

declare module '@roots/bud-framework' {
  interface Bud {
    /**
     * Enable typescript type checking
     *
     * @example
     * ```js
     * bud.typecheck()
     * ```
     *
     * @public
     */
    typecheck: facade
  }

  interface Modules {
    '@roots/bud-typescript': BudTypeScript
    'fork-ts-checker-plugin': BudTypeCheckPlugin
  }

  interface Loaders {
    ts: Build.Loader
  }

  interface Items {
    ts: Build.Item
  }

  interface Rules {
    ts: Build.Rule
  }
}
