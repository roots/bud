import '@roots/bud-babel'
import {Module} from '@roots/bud-framework'
import Webpack from 'webpack'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.checkTs
     *
     * Enable typescript type checking
     *
     * ### Usage
     *
     * ```js
     * bud.typecheck()
     * ```
     */
    typecheck: Typescript.TypeCheck
  }

  namespace Typescript {
    /**
     * Make.
     */
    type TypeCheck = (enabled?: boolean) => Framework
  }

  namespace Hooks.Extension {
    interface Definitions {
      '@roots/bud-typescript': Module
      'fork-ts-checker-plugin': Module
    }
  }

  namespace Hooks.Loader {
    interface Definitions {
      ts: string
      babel: string
    }
  }

  namespace Hooks.Item {
    interface Definitions {
      ts: any
      babel: any
    }
  }

  namespace Hooks.Rule {
    interface Definitions {
      ts: Webpack.RuleSetRule
    }
  }
}
