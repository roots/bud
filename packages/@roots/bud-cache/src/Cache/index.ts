import {Repository} from '@roots/container'
import {bind, once} from 'helpful-decorators'
import {isEqual, isUndefined} from 'lodash'

import {
  Bud,
  createHash,
  readFile,
  readJson,
  writeJson,
} from './cache.dependencies'

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
  public repository: Repository = {}

  /**
   * @public
   */
  public valid: boolean

  /**
   * @public
   */
  @bind
  public async register(): Promise<void> {
    try {
      const data = await readJson(
        this.app.project.get('cache.file'),
      )
      this.setStore(data)
      this.app.success(
        `cache loaded from ${this.get('cache.file')}`,
      )
    } catch (e) {
      this.valid = false
      this.app.error('cache either not present or invalid')
    }

    if (this.valid !== false)
      await this.verify(
        this.app.project.get('version'),
        this.get('version'),
      )
  }

  @bind
  public booted() {
    this.app.hooks.on('run', async val => {
      await this.write()
      return val
    })

    this.app.hooks
      .on('build/cache', () => ({
        type: this.app.hooks.filter('build/cache/type'),
      }))
      .hooks.on('build/cache/type', () => 'memory')
  }

  @bind
  public async write(): Promise<boolean> {
    try {
      this.setStore(this.app.project.all())
      await writeJson(this.get('cache.file'), this.all())

      this.app.success(
        `cache successfully written to ${this.get(
          'cache.file',
        )}`,
      )

      return true
    } catch (e) {
      this.app.error(e)
      return false
    }
  }

  /**
   * Verify cache
   *
   * @returns boolean
   *
   * @public
   */
  @bind
  @once
  public async verify(
    projectHash: string,
    cacheHash: string,
  ): Promise<boolean> {
    if (!isUndefined(this.valid)) return this.valid

    if (!isEqual(projectHash, cacheHash)) {
      this.valid = false
      this.app.error(
        `cache hash does not match project's hash. cache is invalid and project must be rebuilt.`,
      )
      return this.valid
    }

    this.valid = true
    this.app.success(`cache hash is a match`)
  }

  /**
   * Returns sha1 hash as a version string
   *
   * @decorator `@bind`
   */
  @bind
  public hash(str: string): string {
    return createHash('sha1')
      .update(str)
      .digest('base64')
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase()
  }

  @bind
  public static async version(
    filePaths: Array<string>,
  ): Promise<string> {
    const hash: (str: string) => Promise<string> = async str =>
      createHash('sha1')
        .update(str)
        .digest('base64')
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()

    try {
      const cliSalt = await hash(process.argv.slice(3).join(''))
      const str = await filePaths.reduce(
        async (promised, filePath) => {
          await promised

          const file = await readFile(filePath, 'utf8')
          return `${promised}${file}`
        },
        Promise.resolve(``),
      )
      return hash(str.concat(cliSalt) ?? '')
    } catch (e) {
      throw new Error(`${e.message}`)
    }
  }

  /**
   * Returns cache storage directory
   *
   * @decorator `@bind`
   */
  @bind
  public directory(): string {
    return this.app.path('storage', 'cache')
  }
}
