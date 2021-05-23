import {Api} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.minimize
     *
     * `bud.minimize` enables minification of built assets.
     *
     * ### Usage
     *
     * Enable:
     *
     * ```js
     * bud.minimize()
     * ```
     *
     * Explicitly disable:
     *
     * ```js
     * bud.minimize(false)
     * ```
     *
     * Explicitly enable:
     *
     * ```js
     * bud.minimize(true)
     * ```
     */
    minimize: Api.Minimize
  }

  namespace Api {
    type Minimize = (enabled?: boolean) => Framework
  }
}

const minimize: Api.Minimize = function (enabled = true) {
  this.hooks.on('build/optimization/minimize', () => enabled)

  return this
}

export {minimize}
