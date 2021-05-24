import {Api} from '@roots/bud-framework'
import {isFunction, isString} from 'lodash'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## setPublicPath
     *
     * By default it is assumed that assets are served from webroot (`/`).
     * You can use this method to replace this value for apps served from
     * a subdirectory.
     *
     * ### Usage
     *
     * Set the default path using a string
     *
     * ```js
     * app.setPublicPath('/app/themes/sage/dist')
     * ```
     *
     * Set the publicPath using a function.
     *
     * ```js
     * app.setPublicPath(publicPath => {
     *   return `web/assets/${publicPath}`
     * })
     * ```
     */
    setPublicPath: Api.SetPublicPath
  }

  namespace Api {
    type SetPublicPath = (
      publicPath: string | ((publicPath: string) => string),
    ) => Framework
  }
}

const setPublicPath: Api.SetPublicPath = function (publicPath) {
  isString(publicPath) &&
    this.hooks.on('location/publicPath', () => publicPath)

  isFunction(publicPath) &&
    this.hooks.on('location/publicPath', publicPath)

  return this
}

export {setPublicPath}
