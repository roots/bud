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
    hash: Framework.Api.Hash
  }

  namespace Framework.Api {
    type Hash = (enabled?: boolean) => Framework
  }
}

export const hash: Framework.Api.Hash = function (
  enabled = true,
) {
  this.store.set('hash', enabled)
  return this
}
