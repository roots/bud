import {isEqual, isUndefined} from 'lodash'

import {
  bind,
  Bud,
  createHash,
  ensureFile,
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
   * Bud cache location
   *
   * @public
   */
  public get cachePath(): string {
    return this.app.path('storage', 'bud.cache.json')
  }

  /**
   * @public
   */
  public repository: Record<string, any> & {version: string} = {
    version: null,
  }

  /**
   * @public
   */
  public valid: boolean

  /**
   * @public
   */
  @bind
  public async register(): Promise<void> {
    this.app.hooks
      .on('build/cache', () => ({
        type: this.app.hooks.filter('build/cache/type'),
      }))
      .hooks.on('build/cache/type', () => 'memory')

    const version = await this.version(this.app.project)
    const hasCache = await this.hasCache()

    this.app.project.set('version', version)

    if (hasCache) {
      try {
        const jsonData = await readJson(this.cachePath)
        this.setStore(jsonData)
      } catch (e) {
        this.valid = false
        this.app.warn(
          'The cache store seems to exist but is invalid JSON. Overwriting.',
        )
        this.setStore({})
        await ensureFile(this.cachePath)
        await writeJson(this.cachePath, this.all())
      }
    } else {
      this.valid = false
      this.app.log('The cache store is missing. Writing file.')

      this.setStore({})
      await ensureFile(this.cachePath)
      writeJson(this.cachePath, this.all())
    }

    await this.verify()
    this.logger.log('cache has been registered')
  }

  /**
   * Verify cache
   *
   * @returns boolean
   *
   * @public
   */
  @bind
  public async verify(): Promise<boolean> {
    if (!isUndefined(this.valid)) {
      this.logger.log(
        'Cache has already been checked for this build',
        'status',
        this.valid,
      )

      return this.valid
    }

    const setStatus = (status: boolean) => {
      this.valid = status
      this.logger.log('Cache profile valid', status)
      return status
    }

    const cachePresent = await this.hasCache()

    if (
      !cachePresent ||
      this.app.project.isUndefined('dependencies') ||
      !this.has('dependencies') ||
      this.isUndefined('dependencies')
    ) {
      setStatus(false)
      return this.valid
    }

    const projectVersionString = await this.version(
      this.app.project,
    )
    const cacheVersionString = await this.version(this)

    if (!isEqual(projectVersionString, cacheVersionString)) {
      setStatus(false)
    }

    setStatus(true)

    return this.valid
  }

  @bind
  public async hasCache(): Promise<boolean> {
    try {
      const hasCache = (await readFile(this.cachePath))
        ? true
        : false
      this.logger.log('has cache', hasCache)
      return hasCache
    } catch (e) {
      const hasCache = false
      this.logger.log('has cache', hasCache)
      return false
    }
  }

  /**
   * Service boot method
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async build(): Promise<void> {
    this.setStore({
      ...this.all(),
      ...this.app.project.all(),
    })

    this.logger.log(`Writing cache`, this.cachePath, this.all())

    await writeJson(this.cachePath, this.all())
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
  public async version(container): Promise<string> {
    const cliArguments = process.argv.slice(3).join('')
    const str = await container
      .get('dependencies')
      .reduce(async (promised, file) => {
        promised = await promised
        file = await readFile(file, 'utf8')
        return file.concat(file)
      }, Promise.resolve(``))

    return this.hash(str.concat(cliArguments))
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
