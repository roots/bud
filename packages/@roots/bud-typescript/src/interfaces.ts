import '@roots/bud-framework'
import '@roots/bud-api'
import '@roots/bud-babel'

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
    export type TypeCheck = (enabled?: boolean) => Framework
  }

  namespace Framework.Hooks {
    namespace Loader {
      interface Base {
        ts: Subject
      }
    }

    namespace Item {
      interface Base {
        babel: Subject
        ts: Subject
      }
    }

    namespace Rule {
      interface Base {
        ts: Subject
      }
    }
  }
}
