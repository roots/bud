import {createHash} from 'node:crypto'

import {Service} from '@roots/bud-framework/service'
import type * as Services from '@roots/bud-framework/services'
import {bind} from '@roots/bud-support/decorators'
import {isUndefined} from '@roots/bud-support/lodash-es'

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
      config: Object.values(this.app.context.config).map(({path}) => path),
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
   * Webpack configuration
   *
   * @public
   */
  public get configuration() {
    if (this.enabled !== true) return false
    return this.type == `memory` ? this.memoryCache : this.filesystemCache
  }

  /**
   * Memory cache
   *
   * @public
   */
  public get memoryCache() {
    return true
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
   * `boot` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async booted() {
    await this.app.extensions.add(InvalidateCacheExtension)

    this.enabled =
      isUndefined(this.app.context.args.cache) ||
      this.app.context.args.cache !== false

    switch (this.app.context.args.cache) {
      case `memory`:
        this.type = `memory`
        break
      case `filesystem`:
        this.type = `filesystem`
        break
      case undefined:
        this.type = `filesystem`
        break
      case false:
        this.enabled = false
        break
    }

    this.name = `webpack`
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
      .update(this.app.fs.json.stringify([this.app.context.config, args]))
      .digest(`base64`)
      .replace(/[^a-z0-9]/gi, `_`)
      .toLowerCase()

    this.app.success(`cache initialized`)

    if (this.app.context.args.cache === false) {
      this.app.log(`cache is disabled with a contextual argument`)
    }
  }

  /**
   * Flush cache
   */
  @bind
  public async flush() {
    await this.app.fs.remove(this.cacheDirectory)
  }
}
