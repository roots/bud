import {Api} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.hash
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
    type Hash = (enabled?: boolean) => Framework
  }
}

const hash: Api.Hash = function (enabled = true) {
  this.store.set('hash', enabled)
  return this
}

export {hash}
