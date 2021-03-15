import '@roots/bud-framework'
import '@roots/bud-api'

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
}
