import Service from './Service'
import {Framework} from '@roots/bud-typings'

/**
 * ## bud.cache [🏠 Internal]
 *
 * Cache utlity for Webpack modules.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](#)
 * [📦 @roots/bud-cache](#)
 * [🔗 Documentation](#)
 */
export class Cache extends Service {
  /**
   * Service ident
   */
  public name = 'cache'

  /**
   * ## bud.cache.enabled [🏠 Internal]
   *
   * Returns boolean true if cache is enabled
   *
   * Cache is enabled when there is a cache record to read on disk and
   * the buildCache feature is enabled.
   *
   * ```js
   * bud.cache.enabled()
   * // => true if cache is enabled
   * ```
   */
  public enabled(): boolean {
    return (
      this.service('options').get('storage') &&
      this.disk('project').exists(
        this.service('options').get('webpack.recordsPath'),
      )
    )
  }

  /**
   * ## bud.cache.setCache [🏠 Internal]
   *
   * Sets the cache object in the webpack configuration.
   */
  public setCache(): void {
    this.enabled() &&
      this.app.hooks.on('webpack.cache', (bud: Framework) =>
        this.disk('project').readJson(
          this.service('options').get('webpack.recordsPath'),
        ),
      )
  }
}
