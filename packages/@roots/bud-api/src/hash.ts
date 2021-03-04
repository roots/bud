import {Framework} from '@roots/bud-framework'

let hash: Framework.Api.Hash
export {hash}

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.hash  [💁 Fluent]
     *
     * Enable filename hashing of built assets. [🔗 Documentation](#)
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

hash = function (enabled) {
  this.store.set(
    'options.hash',
    enabled === false ? false : true,
  )

  return this
}
