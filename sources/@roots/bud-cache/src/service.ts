import {createHash} from 'node:crypto'

import type {Configuration} from '@roots/bud-framework/config'
import {Service} from '@roots/bud-framework/service'
import type * as Services from '@roots/bud-framework/services'
import {bind} from '@roots/bud-support/decorators'
import isString from '@roots/bud-support/lodash/isString'
import join from '@roots/bud-support/lodash/join'

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
    return this.app.hooks.filter(
      `build.cache.name`,
      this.app.hooks.filter(`build.name`, this.app.context.label),
    )
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
    return this.app.hooks.filter(
      `build.cache.type`,
      this.app.isCLI() && isString(this.app.context.args.cache)
        ? this.app.context.args.cache
        : `filesystem`,
    )
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
    const args = this.app.fs.json.stringify(
      this.app.isCLI() ? this.app.context.args : {},
    )
    const files = Object.values(this.app.context.config ?? {}).filter(
      file => file?.bud && file.sha1,
    )

    return this.app.hooks.filter(
      `build.cache.version`,
      createHash(`sha1`)
        .update(join(args, ...files.map(({module: {sha1}}) => sha1)))
        .digest(`base64`),
    )
  }
  public set version(version: string) {
    this.app.hooks.on(`build.cache.version`, version)
  }

  /**
   * Cache directory
   *
   * @public
   */
  public get cacheDirectory(): string {
    return this.app.hooks.filter(
      `build.cache.cacheDirectory`,
      this.app.path(`@storage`, this.app.label, `cache`, this.app.mode),
    )
  }
  public set cacheDirectory(directory: string) {
    this.app.hooks.on(`build.cache.cacheDirectory`, directory)
  }

  /**
   * Webpack configuration
   *
   * @public
   */
  public get configuration(): Configuration[`cache`] {
    if (this.enabled !== true) return false
    return this.type === `memory`
      ? true
      : {
          name: this.name,
          type: this.type,
          store: `pack` as `pack`,
          allowCollectingMemory: true,
          cacheDirectory: this.cacheDirectory,
          idleTimeout: 10000,
          idleTimeoutForInitialStore: 0,
          profile: true,
          version: this.version,
        }
  }

  /**
   * `booted` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async booted?() {
    await this.app.extensions.add(InvalidateCacheExtension)
    this.app.success(`cache initialized`)
  }

  /**
   * Flush cache
   */
  @bind
  public async flush(): Promise<void> {
    await this.app.fs.remove(this.cacheDirectory)
  }
}
