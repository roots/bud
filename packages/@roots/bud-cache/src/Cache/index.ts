import {readFile} from 'fs-extra'
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
   * Type
   *
   * @public
   */
  public get type(): 'memory' | 'filesystem' | false {
    const flags = this.app.store.get('cli.flags')
    const cache = this.app.store.get('cache')

    if (!isUndefined(flags['cache.type'])) {
      this.log('log', {
        message: '--cache.type flag',
        suffix: flags['cache.type'],
      })

      return flags['cache.type']
    }

    if (!isUndefined(cache.type)) {
      this.log('log', {
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

    if (this.app.store.get('features.cache')) {
      this.app.api.call('persist', this.type)
    }
  }

  /**
   * @public
   */
  @bind
  public async hashFileContents(): Promise<string> {
    const makeHash: (
      str: string,
    ) => Promise<string> = async str =>
      createHash('sha1')
        .update(str)
        .digest('base64')
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()

    try {
      const paths = this.app.project.get('dependencies')
      const strings = await Promise.all(
        paths.map(async (path: string) =>
          readFile(path, 'utf8'),
        ),
      )

      const hash = await makeHash(
        `${strings}${JSON.stringify(
          this.app.project.get('cli'),
        )}`,
      )

      this.log('info', {
        message: 'cache hash generated',
        suffix: hash,
      })

      this.app.hooks.async(
        'event.project.write',
        async project => {
          project.set('cache.hash', hash)
          return project
        },
      )

      return hash
    } catch (e) {
      this.app.error('error hashing file contents for cache')
      throw new Error(e)
    }
  }
}
