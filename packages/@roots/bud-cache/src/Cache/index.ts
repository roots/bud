import {
  bind,
  Bud,
  createHash,
  ensureFileSync,
  existsSync,
  globby,
  readFileSync,
  readJsonSync,
  removeSync,
  writeJsonSync,
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
  public data: Record<string, any> & {version: string} = {
    configFiles: [],
    dependencies: [],
    version: '',
    project: {
      name: '',
      devDependencies: {},
      dependencies: {},
    },
  }

  /**
   * @public
   */
  public valid: boolean

  /**
   * @public
   */
  public register(): void {
    this.app.hooks
      .on('build/cache', () => ({
        type: this.app.hooks.filter('build/cache/type'),
      }))
      .hooks.on('build/cache/type', () => 'memory')

    this.data.configFiles = {
      dynamic: globby.globbySync([
        this.app.path(
          'project',
          `${this.app.name}.config.{js,ts}`,
        ),
        this.app.path(
          'project',
          `${this.app.name}.${this.app.mode}.config.{js,ys}`,
        ),
      ]),
      static: globby.globbySync([
        this.app.path(
          'project',
          `${this.app.name}.config.{yml,yaml,json}`,
        ),
        this.app.path(
          'project',
          `${this.app.name}.${this.app.mode}.config.{yml,yaml,json}`,
        ),
      ]),
    }

    this.data.dependencies = [
      ...new Set(
        globby.globbySync([
          this.app.path('project', 'package.json'),
          ...(this.data.configFiles.dynamic ?? []),
          ...(this.data.configFiles.static ?? []),
        ]),
      ),
    ]
  }

  /**
   * Verify cache
   *
   * @returns {boolean}
   *
   * @public
   */
  @bind
  public verifyProfile(): boolean {
    if (!existsSync(this.cachePath)) {
      ensureFileSync(this.cachePath)
      this.valid = false
      return this.valid
    }

    const data = readJsonSync(this.cachePath)

    this.valid = data.version === this.version()

    return this.valid ? data : false
  }

  /**
   * Service boot method
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public updateProfile(): void {
    const maybeData = this.verifyProfile() as unknown as
      | Record<string, any>
      | false
    if (maybeData) {
      this.app.project.setStore((maybeData as any).project)
      this.app.project.resolveFrom = (maybeData as any).resolve
      return
    }

    this.app.project.initialize()

    this.data = {
      ...this.data,
      version: this.version(),
      dependencies: this.data.dependencies,
      configFiles: this.data.configFiles,
      project: this.app.project.all(),
      resolve: this.app.project.resolveFrom,
    }

    this.logger.log(
      `Writing cache file to ${this.cachePath}`,
      this.data,
    )
    removeSync(this.cachePath)
    writeJsonSync(this.cachePath, this.data)
  }

  /**
   * Returns sha1 hash as a version string
   *
   * @decorator `@bind`
   */
  @bind
  public version(): string {
    return createHash('sha1')
      .update(this.hash())
      .digest('base64')
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase()
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

  /**
   * Returns hash of all build dependencies and parsed CLI arguments
   *
   * @decorator `@bind`
   */
  @bind
  public hash(): string {
    return JSON.stringify(
      this.data.dependencies.reduce(
        (all, file) => all.concat(readFileSync(file, 'utf8')),
        process.argv.slice(3).join(''),
      ) ?? '{}',
    )
  }
}
