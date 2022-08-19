import {Service, Services} from '@roots/bud-framework'
import fs from 'fs-extra'
import {bind} from 'helpful-decorators'
import {createHash} from 'node:crypto'

import InvalidateCacheExtension from './invalidate-cache-extension/index.js'

/**
 * Cache service class
 *
 * @public
 */
export default class Cache
  extends Service
  implements Services.Cache.Service
{
  /**
   * Service label
   *
   * @public
   */
  public static label = `cache`

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
    return this.app.hooks.filter(`build.cache.name`)
  }
  public set name(name: string) {
    this.app.hooks.on(`build.cache.name`, name)
  }

  /**
   * Type
   *
   * @public
   */
  public get type(): 'memory' | 'filesystem' {
    return this.app.hooks.filter(`build.cache.type`)
  }
  public set type(type: 'memory' | 'filesystem') {
    this.app.hooks.on(`build.cache.type`, type)
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
  public get buildDependencies(): any {
    return {
      config: Object.values(this.app.context.config),
    }
  }

  public set buildDependencies(deps: Array<string>) {
    this.app.context.config.push(...deps)
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
   * Webpack configuration
   *
   * @public
   */
  public get configuration() {
    if (this.enabled === false) return this.enabled
    return this.type == `memory` ? this.memoryCache : this.filesystemCache
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
      store: `pack` as `pack`,
      allowCollectingMemory: true,
      cacheDirectory: this.cacheDirectory,
      buildDependencies: this.buildDependencies,
      idleTimeout: 10000,
      idleTimeoutForInitialStore: 0,
      profile: true,
      version: this.version,
    }
  }

  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    await this.app.extensions.add(InvalidateCacheExtension)
  }

  /**
   * `boot` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async boot() {
    this.name = `webpack`
    this.type = `filesystem`
    this.cacheDirectory = this.app.path(
      `@storage`,
      this.app.label,
      `cache`,
      this.app.mode,
    )

    const args = Object.entries(this.app.context.args)
      .filter(([k, v]) => v !== undefined)
      .map(([k, v]) => `${k}-${v}`)
      .join(`.`)

    this.version = createHash(`sha1`)
      .update(this.app.json.stringify([this.app.context.config, args]))
      .digest(`base64`)
      .replace(/[^a-z0-9]/gi, `_`)
      .toLowerCase()
  }

  @bind
  public flush() {
    fs.removeSync(this.cacheDirectory)
  }
}
