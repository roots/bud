import '@roots/bud-babel'

import {Module, Plugin} from '@roots/bud-framework'

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * bud.typecheck
     *
     * Enable typescript type checking
     *
     * @usage
     *
     * ```js
     * bud.typecheck()
     * ```
     *
     * {@link Typescript.Typecheck}
     */
    typecheck: Typescript.TypeCheck
  }

  namespace Typescript {
    type TypeCheck = (enabled?: boolean) => Framework
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-typescript': Module
      'fork-ts-checker-plugin': Plugin<
        typeof ForkTsCheckerWebpackPlugin
      >
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
      ts: any
    }
  }
}
