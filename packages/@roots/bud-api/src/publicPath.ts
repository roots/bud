import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.publicPath  [💁 Fluent]
     *
     * By default it is assumed that assets are served from webroot (`/`).
     * You can use this method to replace this value for apps  served from
     * a subdirectory.
     *
     * ### Usage
     *
     * Set the default path for a [@roots/sage project](https://github.com/roots/sage):
     *
     * ```js
     * bud.publicPath('/app/themes/sage/dist')
     * ```
     */
    publicPath: PublicPath
  }
}

type PublicPath = (publicPath: string) => Framework

export const publicPath: PublicPath = function (publicPath) {
  this.hooks.on('location/publicPath', () => publicPath)
  return this
}
