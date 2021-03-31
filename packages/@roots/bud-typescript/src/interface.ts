import '@roots/bud-api'
import '@roots/bud-babel'
import '@roots/bud-framework'

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

  namespace Framework.Hooks {
    namespace Extension {
      interface Definitions {
        '@roots/bud-typescript': Hooks.Extension.Subject
        'fork-ts-checker-plugin': Hooks.Extension.Subject
      }
    }
    namespace Loader {
      interface Definitions {
        ts: Hooks.Loader.Subject
        babel: Hooks.Loader.Subject
      }
    }

    namespace Item {
      interface Definitions {
        ts: Hooks.Item.Subject
        babel: Hooks.Item.Subject
      }
    }

    namespace Rule {
      interface Definitions {
        ts: Framework.Hooks.Rule.Subject
      }
    }
  }
}
