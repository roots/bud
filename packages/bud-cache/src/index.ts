import {CacheService} from './CacheService'
import type {Bud} from '@roots/bud-typings'

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
export class Cache extends CacheService {
  /**
   * Class constructor.
   */
  public constructor(bud: Bud) {
    super(bud)
    this.enabled = this.enabled.bind(this)
    this.setCache = this.setCache.bind(this)
  }

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
    const bud = this.bud()
    return (
      bud.features.enabled('buildCache') &&
      bud.fs.exists(
        bud.config.get('webpack.recordsPath') as string,
      )
    )
  }

  /**
   * ## bud.cache.setCache [🏠 Internal]
   *
   * Sets the cache object in the webpack configuration.
   */
  public setCache(): void {
    const bud = this.bud()

    this.enabled() &&
      bud.hooks.on('webpack.cache', (bud: Bud) =>
        bud.disk
          .get('project')
          .readJson(bud.config.get('webpack.recordsPath')),
      )
  }
}
