import {bind} from 'helpful-decorators'
import {isUndefined} from 'lodash'

import {Bud, createHash} from './cache.dependencies'

/**
 * Cache service class
 *
 * @public
 */
export class Cache
  extends Bud.Cache.Abstract
  implements Bud.Cache.Interface
{
  /**
   * True if cache is enabled
   *
   * @public
   */
  public get enabled(): boolean {
    if (this.app.store.is('cli.flags.cache', true)) {
      this.log('info', {
        message: '--cache',
        suffix: this.app.store.get('cli.flags.cache'),
      })

      return this.app.store.get('cli.flags.cache')
    }

    if (this.app.store.is('features.cache', true)) {
      this.log('info', {
        message: 'bud.store',
        suffix: this.app.store.get('features.cache'),
      })

      return this.app.store.get('features.cache')
    }

    return false
  }

  /**
   * Type
   *
   * @public
   */
  public get type(): 'memory' | 'filesystem' | false {
    const flags = this.app.store.get('cli.flags')
    const cache = this.app.store.get('cache')

    if (!isUndefined(flags['cache.type'])) {
      this.log('info', {
        message: '--cache.type flag',
        suffix: flags['cache.type'],
      })

      return flags['cache.type']
    }

    if (!isUndefined(cache.type)) {
      this.log('info', {
        message: 'bud.store',
        suffix: cache.type,
      })

      return cache.type
    }

    this.log(
      'warn',
      'no cache setting was passed from cli flags or from settings',
    )
    return false
  }

  /**
   * @public
   */
  public directory: string

  /**
   * @public
   */
  public version: string

  /**
   * @public
   */
  @bind
  public async boot() {
    this.version = await this.hashFileContents()
    if (this.enabled) {
      this.app.api.call('persist', this.type)
    }
  }

  /**
   * @public
   */
  @bind
  public async hashFileContents(): Promise<string> {
    const hash: (str: string) => Promise<string> = async str =>
      createHash('sha1')
        .update(str)
        .digest('base64')
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()

    try {
      return await hash(
        JSON.stringify({
          checks: [
            this.app.mode,
            this.app.store.get('cli.flags.features'),
            this.app.store.get('cli.flags.location'),
            this.app.project.get('manifest'),
            this.app.project.get('configs'),
            this.app.project.get('resolve'),
            this.app.project.get('dependencies'),
          ],
        }),
      )
    } catch (e) {
      this.app.error('error hashing file contents for cache')
      throw new Error(e)
    }
  }
}
