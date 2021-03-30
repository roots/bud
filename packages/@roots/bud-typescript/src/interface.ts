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
    namespace Loader {
      interface Definitions {
        ts: Subject
        babel: Subject
      }
    }

    namespace Item {
      interface Definitions {
        ts: Subject
        babel: Subject
      }
    }

    namespace Rule {
      interface Definitions {
        ts: Subject
      }
    }

    namespace Extension {
      interface Definitions {
        'fork-ts-checker-plugin': Subject
      }
    }
  }
}
