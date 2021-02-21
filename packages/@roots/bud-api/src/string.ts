import {Framework} from '@roots/bud-framework'

type Stringify = (this: Framework, string: unknown) => string

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## string
     *
     * Interpolate to string.
     *
     * ### Usage
     *
     * ```js
     * const value = bud.env.get('some_env')
     * const stringValue = bud.string(value)
     * ```
     */
    string: Stringify
  }

  namespace Framework.Api {
    export type {Stringify}
  }
}

export const string: Stringify = function (string) {
  return JSON.stringify(string)
}
