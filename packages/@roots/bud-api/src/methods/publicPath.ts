import type {Api} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.publicPath
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
    publicPath: Api.PublicPath
  }

  namespace Api {
    type PublicPath = () => string
  }
}

const publicPath: Api.PublicPath = function () {
  return this.hooks.filter('build/output/publicPath')
}

export {publicPath}
