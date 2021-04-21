import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.hash  [💁 Fluent]
     *
     * Enable filename hashing of built assets.
     *
     * ### Usage
     *
     * ```js
     * bud.hash()
     * ```
     */
    hash: Api.Hash
  }

  namespace Api {
    export {Hash}
  }
}

type Hash = (enabled?: boolean) => Framework

export const hash: Hash = function (enabled = true) {
  this.store.set('hash', enabled)
  return this
}
