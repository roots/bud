import '@roots/bud-babel'
import '@roots/bud-framework'
import {Webpack} from '@roots/bud-support'

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
     * bud.checkTs()
     * ```
     */
    typecheck: Framework.Typescript.TypeCheck
  }

  namespace Framework.Typescript {
    /**
     * Make.
     */
    type TypeCheck = (enabled?: boolean) => Framework
  }

  namespace Framework.Hooks.Extension {
    interface Definitions {
      '@roots/bud-typescript': Hooks.Extension.Subject
      'fork-ts-checker-plugin': Hooks.Extension.Subject
    }
  }
  namespace Framework.Hooks.Loader {
    interface Definitions {
      ts: Hooks.Loader.Subject
      babel: Hooks.Loader.Subject
    }
  }

  namespace Framework.Hooks.Item {
    interface Definitions {
      ts: Hooks.Item.Subject
      babel: Hooks.Item.Subject
    }
  }

  namespace Framework.Hooks.Rule {
    interface Definitions {
      ts: Webpack.RuleSetRule
    }
  }
}
