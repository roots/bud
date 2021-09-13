import type {Framework} from '@roots/bud-framework'

/**
 * @public @config
 */
interface publicPath {
  (this: Framework): string
}

/**
 * By default it is assumed that assets are served from webroot (`/`).
 * You can use this method to replace this value for apps  served from
 * a subdirectory.
 *
 * @example
 * Set the default path for a Sage project:
 *
 * ```js
 * bud.publicPath('/app/themes/sage/dist')
 * ```
 *
 * @public @config
 */
const publicPath: publicPath = function () {
  return this.hooks.filter('build/output/publicPath')
}

export {publicPath as default}
