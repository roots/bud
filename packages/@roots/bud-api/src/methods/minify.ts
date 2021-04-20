import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  export interface Framework {
    /**
     * ## bud.minify  [💁 Fluent]
     *
     * `bud.minify` enables minification of built assets.
     *
     * ### Usage
     *
     * Enable:
     *
     * ```js
     * bud.minify()
     * ```
     *
     * Explicitly disable:
     *
     * ```js
     * bud.minify(false)
     * ```
     *
     * Explicitly enable:
     *
     * ```js
     * bud.minify(true)
     * ```
     */
    minify: Minify
  }
}

type Minify = (enabled?: boolean) => Framework

export const minify: Minify = function (enabled = true) {
  this.hooks.on('build/optimization/minimize', () => enabled)

  return this
}
