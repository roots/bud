import {Item, Loader, Rule} from '@roots/bud-build'
import {Module, WebpackPlugin} from '@roots/bud-framework'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import {typecheck} from './api'
import {BudTypeScriptExtension} from './BudTypeScriptExtension'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Enable typescript type checking
     *
     * @usage
     * ```js
     * bud.typecheck()
     * ```
     */
    typecheck: typecheck
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-typescript': Module
      'fork-ts-checker-plugin': WebpackPlugin<
        typeof ForkTsCheckerWebpackPlugin
      >
    }

    interface Loaders {
      ts: Loader
    }

    interface Items {
      ts: Item
    }

    interface Rules {
      ts: Rule
    }
  }
}

export const {name, boot, api} = BudTypeScriptExtension
