import {bind} from 'helpful-decorators'

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
    this.version = await this.hashFileContents(
      this.app.project.get('dependencies'),
    )

    this.app.hooks
      .on('build.cache', () => ({
        type: this.app.hooks.filter('build.cache.type'),
      }))
      .hooks.on('build.cache.type', () => 'memory')
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
      const project = JSON.stringify(this.app.project.all())
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
      throw new Error(e)
    }
  }
}
