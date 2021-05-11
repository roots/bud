import Service from './Service'
import crypto from 'crypto'
import {readFileSync, mkdirSync, pathExistsSync} from 'fs-extra'
import {boundMethod as bind} from 'autobind-decorator'
import {sync} from 'globby'

/**
 * # bud.cache
 *
 * Cache utlity for Webpack modules.
 */
export class Cache extends Service {
  public name = '@roots/bud-cache'

  public booted() {
    this.enabled() &&
      !pathExistsSync(this.app.path('storage')) &&
      mkdirSync(this.app.path('storage'))
  }

  /**
   * ## bud.cache.enabled
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
  @bind
  public enabled(): boolean {
    return (
      this.app.store.isTrue('cache') &&
      this.app.hooks.filter('build/cache/type') === 'filesystem'
    )
  }

  /**
   * Version
   *
   * A hash created from the stringified contents of the project config
   * and package.json
   */
  public get version() {
    const conf =
      JSON.stringify(
        sync(
          this.app.path('project', `\.?${this.app.name}*`),
        ).reduce(
          (a: string, c: string) =>
            `${a}${readFileSync(c, 'utf8')}`,
          '',
        ),
      ) ?? ''

    return crypto
      .createHash('md4')
      .update(`${conf}${this.json}`)
      .digest('hex')
  }

  /**
   * Source as json
   */
  public get json() {
    return JSON.stringify(
      readFileSync(
        this.app.disk.get('project').get('package.json'),
        'utf8',
      ) ?? '',
    )
  }
}
