import * as Framework from '@roots/bud-framework'
import {bind, fs} from '@roots/bud-support'
import {createHash} from 'crypto'

const {readFile} = fs

/**
 * Cache service class
 *
 * @public
 */
export class Cache extends Framework.Service implements Framework.Cache {
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
  public get type(): 'memory' | 'filesystem' {
    return this.app.hooks.filter('build.cache.type')
  }
  public set type(type: 'memory' | 'filesystem') {
    this.app.hooks.on('build.cache.type', type)
  }

  /**
   * version
   *
   * @public
   */
  public get version(): string {
    return this.app.hooks.filter(`build.cache.version`)
  }
  public set version(version: string) {
    this.app.hooks.on(`build.cache.version`, version)
  }

  /**
   * Build dependencies
   *
   * @public
   */
  public get buildDependencies(): Record<string, Array<string>> {
    return {
      bud: Array.from(this.app.project.get('dependencies')),
    }
  }

  /**
   * Cache directory
   *
   * @public
   */
  public get cacheDirectory(): string {
    return this.app.hooks.filter(`build.cache.cacheDirectory`)
  }
  public set cacheDirectory(directory: string) {
    this.app.hooks.on(`build.cache.cacheDirectory`, directory)
  }

  /**
   * Managed paths
   *
   * @public
   */
  public get managedPaths(): Array<string> {
    return this.app.hooks.filter(`build.cache.managedPaths`)
  }
  public set managedPaths(paths: Array<string>) {
    this.app.hooks.on(`build.cache.managedPaths`, paths)
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

  /**
   * @public
   */
  @bind
  public async boot() {
    this.name = `${this.app.name}.${this.app.mode}`
    this.version = await this.hashFileContents()
    this.type = 'filesystem'
    this.cacheDirectory = this.app.path(`storage`, `cache`, `webpack`)
    this.managedPaths = [this.app.path(`modules`)]
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
      const strings = await Promise.all(
        this.buildDependencies.bud.map(async (path: string) =>
          readFile(path, 'utf8'),
        ),
      )
      const hash = await makeHash(
        `${strings}${JSON.stringify(process.argv)}`,
      )

      this.app.project.set('version', hash)
      return hash
    } catch (e) {
      this.app.error('error hashing file contents for cache')
      throw new Error(e)
    }
  }
}
