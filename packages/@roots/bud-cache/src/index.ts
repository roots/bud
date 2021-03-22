import Service from './Service'
import memoizer from 'memoize-fs'
import serialize from 'serialize-javascript'
import crypto from 'crypto'

/**
 * ## bud.cache [🏠 Internal]
 *
 * Cache utlity for Webpack modules.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](#)
 */
export class Cache extends Service {
  /**
   * Service name
   */
  public name = 'cache'

  /**
   * serialize js
   */
  public get serialize() {
    return serialize
  }

  public get memoizer() {
    return memoizer({
      cachePath: this.path.posix.join(
        this.app.subscribe(
          'location/project',
          '@roots/bud-cache/memoize',
        ),
        this.app.subscribe(
          'location/storage',
          '@roots/bud-cache/memoize',
        ),
      ),
    })
  }

  public get config() {
    const conf = JSON.stringify(
      this.fs.readFileSync(
        this.app.disk
          .get('project')
          .get(`${this.app.name}.config.js`),
        'utf8',
      ),
    )

    const json = JSON.stringify(
      this.fs.readFileSync(
        this.app.disk.get('project').get('package.json'),
        'utf8',
      ),
    )

    return crypto
      .createHash('md4')
      .update(`${conf}${json}`)
      .digest('hex')
  }

  /**
   * Deserialize
   */
  public deserialize(serializedStr) {
    return eval(`(${serializedStr})`)
  }

  /**
   * Memoize
   */
  public async memoize(fn: CallableFunction, ...args: any[]) {
    return await this.memoizer.fn(fn(...args), {
      salt: this.config,
    })
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
    return (
      this.app.subscribe(
        'location/storage',
        '@roots/bud-cache',
      ) &&
      this.disk('project').exists(
        this.app.subscribe(
          'location/records',
          '@roots/bud-cache',
        ),
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
      this.app.publish({
        'build/cache': () =>
          this.readJson(
            this.subscribe(
              'location/records',
              '@roots/bud-cache',
            ),
          ),
      })
  }
}
