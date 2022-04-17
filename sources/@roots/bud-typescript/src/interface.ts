import '@roots/bud-babel'

import type {Module} from '@roots/bud-framework/types/extension/module'
import type * as Build from '@roots/bud-framework/types/services/build'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import {TypeScript} from './bud.extension'
import {facade} from './bud.typecheck'

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
    '@roots/bud-typescript': TypeScript
    'fork-ts-checker-plugin': Module<
      any,
      typeof ForkTsCheckerWebpackPlugin
    >
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
