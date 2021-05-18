import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.setPublicPath  [💁 Fluent]
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
     * bud.setPublicPath('/app/themes/sage/dist')
     * ```
     */
    setPublicPath: SetPublicPath
  }
}

type SetPublicPath = (publicPath: string) => Framework

export const setPublicPath: SetPublicPath = function (
  publicPath,
) {
  this.hooks.on('location/publicPath', () => publicPath)

  return this
}
