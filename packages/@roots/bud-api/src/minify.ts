import {Framework} from '@roots/bud-framework'

type Minify = (this: Framework, enabled?: boolean) => Framework

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

export const minify: Minify = function (enabled = true) {
  this.store.set('options.minimize', enabled)

  return this
}
