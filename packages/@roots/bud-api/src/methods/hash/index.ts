import type {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## hash
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

const hash: Framework.Api.Hash = function (enabled = true) {
  this.store.set('hash', enabled)
  return this
}

export {hash}
