import {Framework} from '@roots/bud-framework'

type Minify = (this: Framework) => Framework

declare module '@roots/bud-framework' {
  export interface Framework {
    /**
     * ## bud.minify  [💁 Fluent]
     *
     * `bud.minify` enables minification of static assets. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * bud.minify()
     * ```
     */
    minify: Minify
  }
}

export const minify: Minify = function () {
  this.options.enable('minify')

  return this
}
