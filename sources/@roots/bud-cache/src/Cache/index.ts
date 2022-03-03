import {fs} from '@roots/bud-support'
import {bind} from 'helpful-decorators'

import {Bud, createHash} from './cache.dependencies'

const {readFile} = fs

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
      this.app.api.call('persist', 'filesystem')
    }
  }

  /**
   * @public
   */
  @bind
  public async hashFileContents(): Promise<string> {
    const makeHash: (str: string) => Promise<string> = async str =>
      createHash('sha1')
        .update(str)
        .digest('base64')
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()

    try {
      const paths = this.app.project.get('dependencies')
      const strings = await Promise.all(
        paths.map(async (path: string) => readFile(path, 'utf8')),
      )

      const hash = await makeHash(
        `${strings}${JSON.stringify(this.app.project.get('cli'))}`,
      )

      this.log('info', {
        message: 'cache hash generated',
        suffix: hash,
      })

      this.app.hooks.action('event.project.write', async app => {
        app.project.set('cache.hash', hash)
      })

      return hash
    } catch (e) {
      this.app.error('error hashing file contents for cache')
      throw new Error(e)
    }
  }
}
