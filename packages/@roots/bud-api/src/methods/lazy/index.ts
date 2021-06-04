import {Api} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.lazy
     *
     * Enable experimental lazy compilation. Disabled by default.
     *
     * ### Usage
     *
     * ```js
     * bud.lazy()
     * ```
     *
     * Disable:
     *
     * ```js
     * bud.lazy(false)
     * ```
     */
    lazy: Api.Lazy
  }

  namespace Api {
    type Lazy = (enabled?: boolean) => Framework
  }
}

const lazy: Api.Lazy = function (enabled = true) {
  this.hooks.on(
    'build/experiments/lazyCompilation',
    () => enabled,
  )

  return this
}

export {lazy}
