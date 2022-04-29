import {Service, Services} from '@roots/bud-framework'
import {bind, fs} from '@roots/bud-support'
import {createHash} from 'crypto'

/**
 * Cache service class
 *
 * @public
 */
export class Cache extends Service implements Services.Cache.Service {
  /**
   * Enabled
   *
   * @public
   */
  public enabled: boolean = true

  /**
   * Type
   *
   * @public
   */
  protected _name: string
  public get name(): string {
    return this.app.hooks.filter('build.cache.name')
  }
  public set name(name: string) {
    this.app.hooks.on('build.cache.name', name)
  }

  /**
   * Type
   *
   * @public
   */
  protected _type: 'memory' | 'filesystem'
  public get type(): 'memory' | 'filesystem' {
    return this._type
  }
  public set type(type: 'memory' | 'filesystem') {
    this._type = type
  }

  /**
   * version
   *
   * @public
   */
  protected _version: string
  public get version(): string {
    return this._version
  }
  public set version(version: string) {
    this._version = version
  }

  /**
   * Build dependencies
   *
   * @public
   */
  public get buildDependencies(): Record<string, Array<string>> {
    return {
      bud: Object.values(this.app.context.disk.config),
    }
  }
  public set buildDependencies(deps: Record<string, Array<string>>) {
    this.app.context.disk.config = deps
  }

  /**
   * Cache directory
   *
   * @public
   */
  protected _cacheDirectory: string
  public get cacheDirectory(): string {
    return this._cacheDirectory
  }
  public set cacheDirectory(directory: string) {
    this._cacheDirectory = directory
  }

  /**
   * Managed paths
   *
   * @public
   */
  protected _managedPaths: Array<string>
  public get managedPaths(): Array<string> {
    return this._managedPaths
  }
  public set managedPaths(paths: Array<string>) {
    this._managedPaths = paths
  }

  /**
   * Webpack configuration
   *
   * @public
   */
  public get configuration() {
    if (this.enabled === false) return this.enabled
    return this.type === 'memory' ? this.memoryCache : this.filesystemCache
  }

  /**
   * Memory cache
   *
   * @public
   */
  public get memoryCache() {
    return {
      type: this.type,
    }
  }

  /**
   * Filesystem cache
   *
   * @public
   */
  public get filesystemCache() {
    return {
      name: this.name,
      type: this.type,
      version: this.version,
      cacheDirectory: this.cacheDirectory,
      managedPaths: this.managedPaths,
      buildDependencies: this.buildDependencies,
    }
  }

  @bind
  public async boot() {
    this.type = 'filesystem'
    this.cacheDirectory = this.app.path(`@storage/cache/webpack`)
    this.managedPaths = [this.app.path(`@modules`)]
    this.name = `${this.app.name}.${this.app.mode}`

    if (this.app.context.args.flush === true) {
      await fs.remove(this.app.path(`@storage/cache`))
    }

    const args = Object.entries(this.app.context.args)
      .filter(([k, v]) => v !== undefined)
      .map(([k, v]) => `${k}-${v}`)
      .join(`.`)

    this.version = createHash(`sha1`)
      .update(
        this.app.json.stringify([this.app.context.disk.config, args]),
      )
      .digest(`base64`)
      .replace(/[^a-z0-9]/gi, `_`)
      .toLowerCase()
  }
}
