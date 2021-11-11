import {bind} from 'helpful-decorators'
import {isUndefined} from 'lodash'

import {Bud, createHash, readFile} from './cache.dependencies'

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
      this.log(
        'info',
        'cache enabled via --cache flag',
        this.app.store.get('cli.flags.cache'),
      )
      return this.app.store.get('cli.flags.cache')
    }

    if (this.app.store.is('features.cache', true)) {
      this.log(
        'info',
        'cache enabled via config store setting',
        this.app.store.get('features.cache'),
      )
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
      this.log(
        'info',
        'cache type set from cli:',
        `"${flags['cache.type']}"`,
      )
      return flags['cache.type']
    }

    if (!isUndefined(cache.type)) {
      this.log(
        'info',
        'cache type set from config store:',
        `"${cache.type}"`,
      )
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
  public async register() {
    this.version = await this.hashFileContents([
      this.app.path('project', 'package.json'),
      this.app.path('project', 'bud.config.js'),
    ])

    if (this.enabled) this.app.persist(this.type)
  }

  /**
   * @public
   */
  @bind
  public async hashFileContents(
    filePaths: Array<string>,
  ): Promise<string> {
    const hash: (str: string) => Promise<string> = async str =>
      createHash('sha1')
        .update(str)
        .digest('base64')
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()

    try {
      const project = JSON.stringify(this.app.store.get('cli'))
      const str = await Promise.all(
        filePaths.map(async filePath => {
          return await readFile(filePath, 'utf8')
        }),
      )
      const finalHash = await hash(
        str.join('').concat(project) ?? '',
      )

      return finalHash
    } catch (e) {
      this.app.error('error hashing file contents for cache')
      throw new Error(e)
    }
  }
}
