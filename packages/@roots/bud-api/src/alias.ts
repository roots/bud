import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## alias  [💁 Fluent]
     *
     * Register shorthand for resolving modules
     * using webpack aliases. Useful for
     * situations that may otherwise require
     * brittle relative paths.
     *
     * ### Usage
     *
     * ```js
     * app.alias({
     *   '@scripts': app.src('scripts'),
     * })
     * ```
     */
    alias: Framework.Api.Alias
  }

  namespace Framework.Api {
    export type {Alias}
  }
}

export type Alias = (alias: {[key: string]: string}) => Framework

export const alias: Framework.Api.Alias = function (alias) {
  !this.store.has('args.resolve.alias') &&
    this.store.merge('options.resolve.alias', alias)

  return this
}
