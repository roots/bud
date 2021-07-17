import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## minimize
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
    minimize: Framework.Api.Minimize
  }

  namespace Framework.Api {
    type Minimize = (enabled?: boolean) => Framework
  }
}

const minimize: Framework.Api.Minimize = function (
  enabled = true,
) {
  this.hooks.on('build/optimization/minimize', () => enabled)

  return this
}

export {minimize}
