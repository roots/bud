import {bind} from 'helpful-decorators'

import {Bud, createHash, readFile} from './cache.dependencies'

/**
 * Cache service class
 *
 * @remarks
 * Interfaces with:
 *
 *  - {@link @roots/bud-framework#Project} to determine project dependencies for snapshotting/validation.
 *
 *  - {@link @roots/bud-framework#Build} via {@link @roots/bud-framework#Hooks} to update config.
 *
 * Facades:
 *
 *  - {@link @roots/bud-framework#Api} can toggle cache settings with {@link Bud.Persist}
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
  public version: string

  /**
   * @public
   */
  @bind
  public async register(): Promise<void> {
    const version = await this.hashFileContents(
      this.app.project.get('dependencies'),
    )
    this.version = version
  }

  @bind
  public booted() {
    this.app.hooks
      .on('build/cache', () => ({
        type: this.app.hooks.filter('build/cache/type'),
      }))
      .hooks.on('build/cache/type', () => 'memory')
  }

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
      const argv = await hash(process.argv.slice(3).join(''))
      const str = await filePaths.reduce(
        async (promised, filePath) => {
          await promised

          const file = await readFile(filePath, 'utf8')
          return `${promised}${file}`
        },
        Promise.resolve(``),
      )
      return hash(str.concat(argv) ?? '')
    } catch (e) {
      throw new Error(e)
    }
  }
}
